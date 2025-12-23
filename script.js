/**
 * Real Madrid Gift Page - Interactive Script
 * ==========================================
 */

// Configuration
const CONFIG = {
    // Match date: April 12, 2026 at 21:00 (typical evening kickoff)
    matchDate: new Date('2026-04-12T21:00:00'),
    
    // Animation timings (ms)
    revealDelay: 2000,        // 2 second delay before reveal starts (builds anticipation)
    confettiDuration: 8000,
    
    // Confetti settings
    confettiCount: 250,       // More confetti for dramatic effect
    confettiColors: ['#FFFFFF', '#FEBE10', '#00529F', '#f5d742', '#FFD700']
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
    initParticles();
    initRevealButton();
    initContinueButton();
    
    // Always start from intro - user must click to reveal
    // No auto-skip based on localStorage
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
    
    // Add button press animation
    elements.revealBtn.style.transform = 'scale(0.9)';
    elements.revealBtn.textContent = '✨ Načítám... ✨';
    
    // Transition to reveal phase after suspenseful delay
    setTimeout(() => {
        switchPhase('reveal');
        triggerRevealAnimations();
        createConfetti();
        playSound();
        
        // Show continue button after logo animation completes
        setTimeout(() => {
            showContinueButton();
        }, 2500);
        
        // NO auto-transition - user must click continue button
    }, CONFIG.revealDelay);
}

function initContinueButton() {
    const continueBtn = document.getElementById('continue-btn');
    if (continueBtn) {
        continueBtn.addEventListener('click', () => {
            switchPhase('main');
            startCountdown();
        });
    }
}

function showContinueButton() {
    const continueBtn = document.getElementById('continue-btn');
    if (continueBtn) {
        continueBtn.style.opacity = '1';
        continueBtn.style.transform = 'translateY(0)';
        continueBtn.style.pointerEvents = 'auto';
    }
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

