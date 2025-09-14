/**
 * Academic Research Project - GIF Control with Sim/Real/Trajectory Toggle
 */

// Task data with GIF files and descriptions
const taskData = {
    'ar_action_stabilize': {
        name: 'AR Action Stabilize',
        simGif: 'gifs/sim1.gif',
        realGif: 'gifs/real1.gif',
        trajectoryGif: 'gifs/traj1.gif',
        description: 'Stabilization task using action-based augmented reality control. Success Rate: 98%, Convergence Time: 2.3s'
    },
    'ar_action_stabilize2': {
        name: 'AR Action Stabilize 2',
        simGif: 'gifs/sim2.gif',
        realGif: 'gifs/real2.gif',
        trajectoryGif: 'gifs/traj2.gif',
        description: 'Enhanced stabilization task with improved action control. Success Rate: 96%, Convergence Time: 2.5s'
    },
    'ar_obs_stabilize': {
        name: 'AR Observation Stabilize',
        simGif: 'gifs/sim3.gif',
        realGif: 'gifs/real3.gif',
        trajectoryGif: 'gifs/traj3.gif',
        description: 'Observation-based stabilization using augmented reality feedback. Success Rate: 97%, Convergence Time: 2.1s'
    },
    'circle_following': {
        name: 'Circle Following',
        simGif: 'gifs/sim4.gif',
        realGif: 'gifs/real4.gif',
        trajectoryGif: 'gifs/traj4.gif',
        description: 'Circular trajectory following task. Tracking Error: 0.03m, Speed: 1.2m/s'
    },
    'spiral_following': {
        name: 'Spiral Following',
        simGif: 'gifs/sim5.gif',
        realGif: 'gifs/real5.gif',
        trajectoryGif: 'gifs/traj5.gif',
        description: 'Spiral trajectory following with increasing radius. Tracking Error: 0.04m, Speed: 0.8m/s'
    },
    'figure8_following': {
        name: 'Figure-8 Following',
        simGif: 'gifs/sim6.gif',
        realGif: 'gifs/real6.gif',
        trajectoryGif: 'gifs/traj6.gif',
        description: 'Complex figure-8 pattern following. Tracking Error: 0.05m, Pattern Complexity: High'
    }
};

// Current state variables
let currentTask = 'ar_action_stabilize';
let currentStatus = 'simulation'; // 'simulation', 'real', or 'trajectory'

// Function to update GIF based on current task and status
function updateGif() {
    const task = taskData[currentTask];
    if (!task) {
        console.error('Task not found:', currentTask);
        return;
    }
    
    const gif = document.getElementById('main-gif');
    const gifLabel = document.getElementById('video-label');
    
    if (gif) {
        // Update GIF source based on status
        if (currentStatus === 'simulation') {
            gif.src = task.simGif;
            if (gifLabel) gifLabel.textContent = 'Simulation';
            console.log('Loading simulation GIF:', task.simGif);
        } else if (currentStatus === 'real') {
            gif.src = task.realGif;
            if (gifLabel) gifLabel.textContent = 'Real World';
            console.log('Loading real world GIF:', task.realGif);
        } else if (currentStatus === 'trajectory') {
            gif.src = task.trajectoryGif;
            if (gifLabel) gifLabel.textContent = 'Trajectory';
            console.log('Loading trajectory GIF:', task.trajectoryGif);
        }
    } else {
        console.error('GIF element not found!');
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
    console.log('Changing task to:', taskId);
    currentTask = taskId;
    updateGif();
}

// Function to show simulation
function showSimulation() {
    console.log('showSimulation function called!');
    currentStatus = 'simulation';
    
    // Update button styles
    const simBtn = document.getElementById('sim-btn');
    const realBtn = document.getElementById('real-btn');
    const trajBtn = document.getElementById('traj-btn');
    
    if (simBtn && realBtn && trajBtn) {
        simBtn.style.background = '#2c5aa0';
        simBtn.style.color = 'white';
        realBtn.style.background = 'white';
        realBtn.style.color = '#333';
        trajBtn.style.background = 'white';
        trajBtn.style.color = '#333';
    }
    
    updateGif();
}

// Function to show real world
function showRealWorld() {
    console.log('showRealWorld function called!');
    currentStatus = 'real';
    
    // Update button styles
    const simBtn = document.getElementById('sim-btn');
    const realBtn = document.getElementById('real-btn');
    const trajBtn = document.getElementById('traj-btn');
    
    if (simBtn && realBtn && trajBtn) {
        simBtn.style.background = 'white';
        simBtn.style.color = '#333';
        realBtn.style.background = '#2c5aa0';
        realBtn.style.color = 'white';
        trajBtn.style.background = 'white';
        trajBtn.style.color = '#333';
    }
    
    updateGif();
}

// Function to show trajectory
function showTrajectory() {
    console.log('showTrajectory function called!');
    currentStatus = 'trajectory';
    
    // Update button styles
    const simBtn = document.getElementById('sim-btn');
    const realBtn = document.getElementById('real-btn');
    const trajBtn = document.getElementById('traj-btn');
    
    console.log('Buttons found:', {simBtn: !!simBtn, realBtn: !!realBtn, trajBtn: !!trajBtn});
    
    if (simBtn && realBtn && trajBtn) {
        simBtn.style.background = 'white';
        simBtn.style.color = '#333';
        realBtn.style.background = 'white';
        realBtn.style.color = '#333';
        trajBtn.style.background = '#2c5aa0';
        trajBtn.style.color = 'white';
        console.log('Button styles updated for trajectory');
    } else {
        console.error('One or more buttons not found!');
    }
    
    updateGif();
}

// Make functions globally accessible for inline onclick handlers
window.changeTask = changeTask;
window.showSimulation = showSimulation;
window.showRealWorld = showRealWorld;
window.showTrajectory = showTrajectory;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, initializing...');
    
    // Set initial state
    updateGif();
    
    // Navigation smooth scrolling
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const navBar = document.querySelector('.nav-bar');
                    const navHeight = navBar ? navBar.offsetHeight : 0;
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
    // Press 'S' to cycle through Sim/Real/Trajectory
    if (e.key === 's' && !e.ctrlKey && !e.metaKey) {
        if (document.activeElement.tagName !== 'INPUT' && 
            document.activeElement.tagName !== 'TEXTAREA' &&
            document.activeElement.tagName !== 'SELECT') {
            if (currentStatus === 'simulation') {
                showRealWorld();
            } else if (currentStatus === 'real') {
                showTrajectory();
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

// Log initial state for debugging
console.log('KAUST Robotics Research Project - JavaScript Loaded');
console.log('Available tasks:', Object.keys(taskData));
console.log('Keyboard shortcuts: S = toggle Sim/Real/Trajectory, T = go to top');
console.log('For questions, contact: robotics@kaust.edu.sa');