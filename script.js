/**
 * Academic Research Project - GIF Control with Sim/Real Toggle
 */

// Task data with GIF files and descriptions
const taskData = {
    'ar_action_stabilize': {
        name: 'AR Action Stabilize',
        simGif: 'gifs/sim1.gif',
        realGif: 'gifs/ar_action_stabilize.gif',
        description: 'Stabilization task using action-based augmented reality control. Success Rate: 98%, Convergence Time: 2.3s'
    },
    'ar_action_stabilize2': {
        name: 'AR Action Stabilize 2',
        simGif: 'gifs/sim2.gif',
        realGif: 'gifs/ar_action_stabilize2.gif',
        description: 'Enhanced stabilization task with improved action control. Success Rate: 96%, Convergence Time: 2.5s'
    },
    'ar_obs_stabilize': {
        name: 'AR Observation Stabilize',
        simGif: 'gifs/sim3.gif',
        realGif: 'gifs/ar_action_ar_obs_stabilize.gif',
        description: 'Observation-based stabilization using augmented reality feedback. Success Rate: 97%, Convergence Time: 2.1s'
    },
    'circle_following': {
        name: 'Circle Following',
        simGif: 'gifs/sim4.gif',
        realGif: 'gifs/circle_following.gif',
        description: 'Circular trajectory following task. Tracking Error: 0.03m, Speed: 1.2m/s'
    },
    'spiral_following': {
        name: 'Spiral Following',
        simGif: 'gifs/sim5.gif',
        realGif: 'gifs/spiral_following.gif',
        description: 'Spiral trajectory following with increasing radius. Tracking Error: 0.04m, Speed: 0.8m/s'
    },
    'figure8_following': {
        name: 'Figure-8 Following',
        simGif: 'gifs/sim6.gif',
        realGif: 'gifs/figure8_following.gif',
        description: 'Complex figure-8 pattern following. Tracking Error: 0.05m, Pattern Complexity: High'
    }
};

// Current state
let currentTask = 'ar_action_stabilize';
let currentStatus = 'simulation'; // 'simulation' or 'real'

// Function to update GIF based on current task and status
function updateGif() {
    const task = taskData[currentTask];
    if (!task) return;
    
    const gif = document.getElementById('main-gif');
    const gifLabel = document.getElementById('video-label');
    
    if (gif) {
        // Update GIF source based on status
        if (currentStatus === 'simulation') {
            gif.src = task.simGif;
            if (gifLabel) gifLabel.textContent = 'Simulation';
        } else {
            gif.src = task.realGif;
            if (gifLabel) gifLabel.textContent = 'Real World';
        }
    }
    
    // Update task description
    const descriptionElement = document.getElementById('task-description');
    if (descriptionElement) {
        descriptionElement.innerHTML = `
            <h4 style="font-size: 16px; font-weight: 600; color: #2c5aa0; margin-bottom: 8px;">${task.name}</h4>
            <p style="font-size: 14px; color: #555; margin: 0; line-height: 1.5;">${task.description}</p>
        `;
    }
    
    console.log(`Updated: ${task.name} - ${currentStatus}`);
}

// Function to change task
function changeTask(taskId) {
    currentTask = taskId;
    updateGif();
}

// Function to show simulation
function showSimulation() {
    currentStatus = 'simulation';
    
    // Update button styles
    const simBtn = document.getElementById('sim-btn');
    const realBtn = document.getElementById('real-btn');
    
    if (simBtn && realBtn) {
        simBtn.style.background = '#2c5aa0';
        simBtn.style.color = 'white';
        realBtn.style.background = 'white';
        realBtn.style.color = '#333';
    }
    
    updateGif();
}

// Function to show real world
function showRealWorld() {
    currentStatus = 'real';
    
    // Update button styles
    const simBtn = document.getElementById('sim-btn');
    const realBtn = document.getElementById('real-btn');
    
    if (simBtn && realBtn) {
        simBtn.style.background = 'white';
        simBtn.style.color = '#333';
        realBtn.style.background = '#2c5aa0';
        realBtn.style.color = 'white';
    }
    
    updateGif();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Set initial state
    updateGif();
    
    // Navigation smooth scrolling
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const navHeight = document.querySelector('.nav-bar') ? 
                                    document.querySelector('.nav-bar').offsetHeight : 0;
                    const targetPosition = targetSection.offsetTop - navHeight - 10;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Highlight active section in navigation
    const sections = document.querySelectorAll('section[id]');
    const navigationLinks = document.querySelectorAll('.nav-links a');
    
    function highlightNavigation() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navigationLinks.forEach(link => {
                    link.style.color = '#555';
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.style.color = '#2c5aa0';
                    }
                });
            }
        });
    }
    
    if (navigationLinks.length > 0) {
        window.addEventListener('scroll', highlightNavigation);
        highlightNavigation();
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Press 'S' to toggle between Sim and Real
    if (e.key === 's' && !e.ctrlKey && !e.metaKey) {
        if (document.activeElement.tagName !== 'INPUT' && 
            document.activeElement.tagName !== 'TEXTAREA' &&
            document.activeElement.tagName !== 'SELECT') {
            if (currentStatus === 'simulation') {
                showRealWorld();
            } else {
                showSimulation();
            }
        }
    }
    
    // Press 'P' to print
    if (e.key === 'p' && e.ctrlKey) {
        e.preventDefault();
        window.print();
    }
    
    // Press 'T' to go to top
    if (e.key === 't' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        if (document.activeElement.tagName !== 'INPUT' && 
            document.activeElement.tagName !== 'TEXTAREA' &&
            document.activeElement.tagName !== 'SELECT') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }
});

console.log('KAUST Robotics Research Project - Page Loaded');
console.log('Keyboard shortcuts: S = toggle Sim/Real, T = go to top');
console.log('For questions, contact: robotics@kaust.edu.sa');