/**
 * Real Madrid Gift Page - Interactive Script
 * ==========================================
 */

// Configuration
const CONFIG = {
    // Match date: April 12, 2026 at 21:00 (typical evening kickoff)
    matchDate: new Date('2026-04-12T21:00:00'),
    
    // Animation timings (ms)
    revealDelay: 500,
    confettiDuration: 5000,
    phaseTransitionDelay: 4000,
    
    // Confetti settings
    confettiCount: 150,
    confettiColors: ['#FFFFFF', '#FEBE10', '#00529F', '#f5d742']
};

// DOM Elements
const elements = {
    intro: document.getElementById('intro'),
    reveal: document.getElementById('reveal'),
    main: document.getElementById('main'),
    revealBtn: document.getElementById('reveal-btn'),
    particles: document.getElementById('particles'),
    confetti: document.getElementById('confetti'),
    rmLogo: document.getElementById('rm-logo'),
    revealTitle: document.getElementById('reveal-title'),
    crowdSound: document.getElementById('crowd-sound'),
    countdown: {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    }
};

// ==========================================
// Initialization
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // #region agent log
    fetch('http://127.0.0.1:7245/ingest/6152cf98-ecb0-4326-8b5d-e3fc2e8c61c9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'script.js:init',message:'DOM Content Loaded',data:{revealed:localStorage.getItem('rm-gift-revealed')},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    
    // Check if stars overlap button
    const btn = document.getElementById('reveal-btn');
    if (btn) {
        const rect = btn.getBoundingClientRect();
        const elAtPoint = document.elementFromPoint(rect.left + rect.width/2, rect.top + rect.height/2);
        // #region agent log
        fetch('http://127.0.0.1:7245/ingest/6152cf98-ecb0-4326-8b5d-e3fc2e8c61c9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'script.js:overlap-check',message:'Overlap check',data:{buttonId:btn.id, elementAtCenter: elAtPoint ? elAtPoint.tagName + '.' + elAtPoint.className : 'none'},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'B'})}).catch(()=>{});
        // #endregion
    }

    initParticles();
    initRevealButton();
    
    // Track player images
    document.querySelectorAll('.player-img, .intro-star').forEach(img => {
        img.addEventListener('load', () => {
            // #region agent log
            fetch('http://127.0.0.1:7245/ingest/6152cf98-ecb0-4326-8b5d-e3fc2e8c61c9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'script.js:img-load',message:'Image loaded',data:{src:img.src, alt:img.alt},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'A'})}).catch(()=>{});
            // #endregion
        });
        img.addEventListener('error', () => {
            // #region agent log
            fetch('http://127.0.0.1:7245/ingest/6152cf98-ecb0-4326-8b5d-e3fc2e8c61c9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'script.js:img-error',message:'Image failed to load',data:{src:img.src, alt:img.alt},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'A'})}).catch(()=>{});
            // #endregion
        });
    });

    // Check if user has already seen the reveal (optional persistence)
    if (localStorage.getItem('rm-gift-revealed') === 'true') {
        skipToMain();
    }
});

// ==========================================
// Phase 1: Intro Particles
// ==========================================

function initParticles() {
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 8}s`;
        particle.style.animationDuration = `${6 + Math.random() * 4}s`;
        elements.particles.appendChild(particle);
    }
}

// ==========================================
// Phase 2: Reveal Animation
// ==========================================

function initRevealButton() {
    elements.revealBtn.addEventListener('click', startReveal);
}

function startReveal() {
    // Disable button
    elements.revealBtn.disabled = true;
    elements.revealBtn.style.pointerEvents = 'none';
    
    // Transition to reveal phase
    setTimeout(() => {
        switchPhase('reveal');
        triggerRevealAnimations();
        createConfetti();
        playSound();
        
        // After reveal animation, transition to main
        setTimeout(() => {
            switchPhase('main');
            startCountdown();
            localStorage.setItem('rm-gift-revealed', 'true');
        }, CONFIG.phaseTransitionDelay);
    }, CONFIG.revealDelay);
}

function switchPhase(phase) {
    // Remove active from all phases
    elements.intro.classList.remove('active');
    elements.reveal.classList.remove('active');
    elements.main.classList.remove('active');
    
    // Add active to target phase
    switch(phase) {
        case 'intro':
            elements.intro.classList.add('active');
            break;
        case 'reveal':
            elements.reveal.classList.add('active');
            break;
        case 'main':
            elements.main.classList.add('active');
            document.body.style.overflow = 'auto';
            break;
    }
}

function triggerRevealAnimations() {
    // Trigger logo animation
    elements.rmLogo.classList.add('animate');
    
    // Trigger title animation
    elements.revealTitle.classList.add('animate');
    
    // Trigger subtitle animation
    const subtitle = document.querySelector('.reveal-subtitle');
    if (subtitle) {
        subtitle.classList.add('animate');
    }
}

function skipToMain() {
    elements.intro.classList.remove('active');
    elements.reveal.classList.remove('active');
    elements.main.classList.add('active');
    document.body.style.overflow = 'auto';
    startCountdown();
}

// ==========================================
// Confetti Animation
// ==========================================

function createConfetti() {
    for (let i = 0; i < CONFIG.confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Random properties
            const color = CONFIG.confettiColors[Math.floor(Math.random() * CONFIG.confettiColors.length)];
            const size = 5 + Math.random() * 10;
            const startX = Math.random() * 100;
            const rotation = Math.random() * 360;
            const duration = 3 + Math.random() * 2;
            
            // Shape variation
            const shapes = ['square', 'rectangle', 'circle'];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            
            confetti.style.cssText = `
                position: absolute;
                left: ${startX}%;
                top: -20px;
                width: ${size}px;
                height: ${shape === 'rectangle' ? size * 2 : size}px;
                background: ${color};
                border-radius: ${shape === 'circle' ? '50%' : '2px'};
                transform: rotate(${rotation}deg);
                animation: confetti-fall ${duration}s linear forwards;
                opacity: 1;
            `;
            
            elements.confetti.appendChild(confetti);
            
            // Remove after animation
            setTimeout(() => {
                confetti.remove();
            }, duration * 1000);
            
        }, i * 20); // Stagger confetti creation
    }
}

// Add confetti animation keyframes dynamically
const confettiStyles = document.createElement('style');
confettiStyles.textContent = `
    @keyframes confetti-fall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(${360 + Math.random() * 360}deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyles);

// ==========================================
// Sound Effects
// ==========================================

function playSound() {
    if (elements.crowdSound) {
        elements.crowdSound.volume = 0.5;
        elements.crowdSound.play().catch(() => {
            // Audio autoplay blocked - that's okay
            console.log('Audio autoplay was blocked by browser');
        });
    }
}

// ==========================================
// Countdown Timer
// ==========================================

function startCountdown() {
    updateCountdown(); // Initial update
    setInterval(updateCountdown, 1000); // Update every second
}

function updateCountdown() {
    const now = new Date();
    const difference = CONFIG.matchDate - now;
    
    if (difference <= 0) {
        // Match has started or passed
        elements.countdown.days.textContent = '0';
        elements.countdown.hours.textContent = '00';
        elements.countdown.minutes.textContent = '00';
        elements.countdown.seconds.textContent = '00';
        
        // Update label if match is happening
        const label = document.querySelector('.countdown-label');
        if (label) {
            label.textContent = '¡Hala Madrid!';
        }
        return;
    }
    
    // Calculate time units
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    // Update display with animation
    animateValue(elements.countdown.days, days);
    animateValue(elements.countdown.hours, hours.toString().padStart(2, '0'));
    animateValue(elements.countdown.minutes, minutes.toString().padStart(2, '0'));
    animateValue(elements.countdown.seconds, seconds.toString().padStart(2, '0'));
}

function animateValue(element, newValue) {
    const currentValue = element.textContent;
    const newValueStr = newValue.toString();
    
    if (currentValue !== newValueStr) {
        element.style.transform = 'scale(1.1)';
        element.textContent = newValueStr;
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 150);
    }
}

// ==========================================
// Additional Effects
// ==========================================

// Parallax effect on scroll for main section
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking && elements.main.classList.contains('active')) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const stadiumBg = document.querySelector('.stadium-bg');
            if (stadiumBg) {
                stadiumBg.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
            ticking = false;
        });
        ticking = true;
    }
});

// Add hover effects to timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transition = 'all 0.3s ease';
    });
});

// Easter egg: Click logo 5 times for surprise
let logoClicks = 0;
const headerLogo = document.querySelector('.header-logo');
if (headerLogo) {
    headerLogo.addEventListener('click', () => {
        logoClicks++;
        if (logoClicks >= 5) {
            headerLogo.style.animation = 'shake 0.5s ease, bounce 0.5s ease 0.5s';
            createConfetti();
            logoClicks = 0;
            setTimeout(() => {
                headerLogo.style.animation = '';
            }, 1000);
        }
    });
}

// Debug: Reset reveal state (uncomment for testing)
// localStorage.removeItem('rm-gift-revealed');

