/**
 * Position-Drone Research Page
 * GIF carousel slider — adapted from FlashSAC slideVideos() pattern.
 * Three independent infinite-loop carousels: sim, real, traj.
 */

// ─── Slider state registry ──────────────────────────────────────────────────
const gifSliderStates = {
    sim:  { currentIndex: 0, totalItems: 0, clonesToAdd: 0, isTransitioning: false },
    real: { currentIndex: 0, totalItems: 0, clonesToAdd: 0, isTransitioning: false },
    traj: { currentIndex: 0, totalItems: 0, clonesToAdd: 0, isTransitioning: false },
};

// ─── Responsive visible count ────────────────────────────────────────────────
function getVisibleCount() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    return 3;
}

// ─── Initialize a single carousel ───────────────────────────────────────────
function initGifSlider(category) {
    const slider = document.getElementById(category + '-slider');
    if (!slider) return;

    // Remove any existing clones from a previous init (resize case)
    slider.querySelectorAll('.video-wrapper.clone').forEach(el => el.remove());

    const originals = Array.from(slider.querySelectorAll('.video-wrapper:not(.clone)'));
    const total = originals.length;
    const visible = getVisibleCount();
    const state = gifSliderStates[category];

    // Locate buttons through the DOM (container > wrapper > slider)
    const sliderContainer = slider.parentElement.parentElement;
    const prevBtn = sliderContainer.querySelector('.slider-btn.prev');
    const nextBtn = sliderContainer.querySelector('.slider-btn.next');

    if (total <= visible) {
        // All items fit — no scrolling needed
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        slider.style.transition = 'none';
        slider.style.transform = 'translateX(0)';
        state.totalItems = total;
        state.clonesToAdd = 0;
        state.currentIndex = 0;
        return;
    }

    // Show buttons
    if (prevBtn) prevBtn.style.display = 'flex';
    if (nextBtn) nextBtn.style.display = 'flex';

    const clonesToAdd = Math.min(visible, total);

    // Append clones of first N items (for forward loop)
    for (let i = 0; i < clonesToAdd; i++) {
        const clone = originals[i].cloneNode(true);
        clone.classList.add('clone');
        clone.setAttribute('data-original-index', i);
        slider.appendChild(clone);
    }

    // Prepend clones of last N items (for backward loop)
    for (let i = total - 1; i >= total - clonesToAdd; i--) {
        const clone = originals[i].cloneNode(true);
        clone.classList.add('clone');
        clone.setAttribute('data-original-index', i);
        slider.insertBefore(clone, slider.firstChild);
    }

    // Start positioned at first real item (after leading clones)
    state.totalItems   = total;
    state.clonesToAdd  = clonesToAdd;
    state.currentIndex = clonesToAdd;
    state.isTransitioning = false;

    updateGifSliderPosition(category, false);
}

// ─── Compute and apply translateX ───────────────────────────────────────────
function updateGifSliderPosition(category, animate) {
    const slider = document.getElementById(category + '-slider');
    if (!slider) return;

    const wrappers = slider.querySelectorAll('.video-wrapper');
    if (!wrappers.length) return;

    const gap = parseFloat(window.getComputedStyle(slider).gap) || 15;
    const itemWidth = wrappers[0].getBoundingClientRect().width;
    const translateX = -gifSliderStates[category].currentIndex * (itemWidth + gap);

    slider.style.transition = animate ? 'transform 0.4s ease' : 'none';
    slider.style.transform  = `translateX(${translateX}px)`;
}

// ─── Public slide function (called by prev/next buttons) ─────────────────────
function slideGifs(category, direction) {
    const slider = document.getElementById(category + '-slider');
    if (!slider) return;

    const state = gifSliderStates[category];
    if (state.clonesToAdd === 0) return;   // no scrolling needed
    if (state.isTransitioning) return;     // debounce rapid clicks

    state.isTransitioning = true;
    state.currentIndex += direction;

    updateGifSliderPosition(category, true);

    const handleTransitionEnd = () => {
        slider.removeEventListener('transitionend', handleTransitionEnd);

        // Jumped past the leading clones → warp to real end
        if (state.currentIndex < state.clonesToAdd) {
            state.currentIndex += state.totalItems;
            updateGifSliderPosition(category, false);
        }
        // Jumped past the trailing clones → warp to real start
        else if (state.currentIndex >= state.clonesToAdd + state.totalItems) {
            state.currentIndex -= state.totalItems;
            updateGifSliderPosition(category, false);
        }

        state.isTransitioning = false;
    };

    slider.addEventListener('transitionend', handleTransitionEnd);
}

// Make slideGifs accessible from inline onclick
window.slideGifs = slideGifs;

// ─── Navigation smooth scrolling ─────────────────────────────────────────────
function initNavScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.getElementById(href.substring(1));
                if (target) {
                    const navBar = document.querySelector('.nav-bar');
                    const offset = navBar ? navBar.offsetHeight : 0;
                    window.scrollTo({
                        top: target.offsetTop - offset - 10,
                        behavior: 'smooth',
                    });
                }
            }
        });
    });
}

// ─── Active nav highlight on scroll ──────────────────────────────────────────
function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    if (!navLinks.length) return;

    function highlight() {
        const scrollY = window.scrollY + 120;
        sections.forEach(section => {
            if (
                scrollY >= section.offsetTop &&
                scrollY < section.offsetTop + section.offsetHeight
            ) {
                const id = section.getAttribute('id');
                navLinks.forEach(link => {
                    const isActive = link.getAttribute('href') === `#${id}`;
                    link.style.backgroundColor = isActive ? '#1F8B2E' : '';
                });
            }
        });
    }

    window.addEventListener('scroll', highlight, { passive: true });
    highlight();
}

// ─── Re-init on resize (handles breakpoint changes in visible count) ──────────
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ['sim', 'real', 'traj'].forEach(cat => initGifSlider(cat));
    }, 200);
});

// ─── Keyboard shortcut: arrow keys scroll focused carousel ───────────────────
document.addEventListener('keydown', function (e) {
    const active = document.activeElement;
    const inInput = active && ['INPUT', 'TEXTAREA', 'SELECT'].includes(active.tagName);
    if (inInput) return;

    if (e.key === 'ArrowLeft')  slideGifs('sim', -1);
    if (e.key === 'ArrowRight') slideGifs('sim',  1);

    // T = scroll to top
    if (e.key === 't' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// ─── Bootstrap ───────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
    ['sim', 'real', 'traj'].forEach(cat => initGifSlider(cat));
    initNavScrolling();
    initNavHighlight();

    console.log('Position-Drone page loaded. Carousels: sim, real, traj.');
});
