// Particle Animation System
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.particleCount = 50;
        this.init();
    }

    init() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        // Create particles container
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        hero.appendChild(particlesContainer);

        // Create particles
        for (let i = 0; i < this.particleCount; i++) {
            this.createParticle(particlesContainer);
        }
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 1-4px
        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random animation duration
        const duration = Math.random() * 10 + 10; // 10-20 seconds
        particle.style.animationDuration = `${duration}s`;
        
        // Random delay
        const delay = Math.random() * 5;
        particle.style.animationDelay = `${delay}s`;
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.8 + 0.2;
        
        container.appendChild(particle);
        
        // Remove and recreate particle when animation ends
        particle.addEventListener('animationiteration', () => {
            particle.style.left = `${Math.random() * 100}%`;
        });
    }
}

// Typewriter Effect
class TypewriterEffect {
    constructor(element, texts, speed = 100) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.start();
    }

    start() {
        this.type();
    }

    type() {
        const currentText = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let typeSpeed = this.speed;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeSpeed = 500; // Pause before typing next text
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Navigation Scroll Effect
function initNavigationEffect() {
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// Scroll Reveal Animation
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Add staggered animation for grid items
                if (entry.target.classList.contains('experience-grid') || 
                    entry.target.classList.contains('projects-grid') || 
                    entry.target.classList.contains('skills-grid')) {
                    
                    const items = entry.target.children;
                    Array.from(items).forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('reveal');
        observer.observe(section);
    });

    // Observe grid containers
    document.querySelectorAll('.experience-grid, .projects-grid, .skills-grid').forEach(grid => {
        const items = grid.children;
        Array.from(items).forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        observer.observe(grid);
    });
}

// Enhanced Hover Effects
function initHoverEffects() {
    // Project cards tilt effect
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });

    // Skill cards magnetic effect
    document.querySelectorAll('.skill-category').forEach(skill => {
        skill.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) translateY(-10px) scale(1.05)`;
        });
        
        skill.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0) translateY(0) scale(1)';
        });
    });
}

// Cursor Trail Effect
function initCursorEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(102, 126, 234, 0.6), rgba(118, 75, 162, 0.6));
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: all 0.1s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Hide cursor on touch devices
    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
    }
}

// Parallax Effect
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        const heroBackground = document.querySelector('.hero::before');
        if (heroBackground) {
            document.querySelector('.hero').style.backgroundPosition = `center ${rate}px`;
        }
    });
}

// Loading Animation
function initLoadingAnimation() {
    // Animate hero elements on load
    window.addEventListener('load', () => {
        const heroTitle = document.querySelector('.hero-content h1');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const profileImage = document.querySelector('.profile-image');
        
        if (heroTitle) {
            heroTitle.style.animation = 'fadeInUp 1s ease 0.2s both';
        }
        if (heroSubtitle) {
            heroSubtitle.style.animation = 'fadeInUp 1s ease 0.4s both';
        }
        if (profileImage) {
            profileImage.style.animation = 'fadeInUp 1s ease 0.6s both, float 6s ease-in-out infinite';
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particle system
    new ParticleSystem();
    
    // Initialize typewriter effect
    const typewriterElement = document.querySelector('.typewriter-text');
    if (typewriterElement) {
        const texts = [
            'Software Engineer',
            'Full-Stack Developer', 
            'Problem Solver',
            'Unity Developer',
            'Machine Learning Enthusiast'
        ];
        new TypewriterEffect(typewriterElement, texts, 150);
    }
    
    // Initialize all other effects
    initSmoothScrolling();
    initNavigationEffect();
    initScrollReveal();
    initHoverEffects();
    initCursorEffect();
    initParallaxEffect();
    initLoadingAnimation();
    
    // Add some interactive elements
    addInteractiveElements();
});

// Additional Interactive Elements
function addInteractiveElements() {
    // Add floating icons in the background
    createFloatingIcons();
    
    // Add tech stack animations
    animateTechTags();
    
    // Add button ripple effects
    addRippleEffect();
}

function createFloatingIcons() {
    const icons = ['💻', '🚀', '⚡', '🎯', '💡', '🔧'];
    const body = document.body;
    
    setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance every interval
            const icon = document.createElement('div');
            icon.textContent = icons[Math.floor(Math.random() * icons.length)];
            icon.style.cssText = `
                position: fixed;
                font-size: 2rem;
                opacity: 0.1;
                pointer-events: none;
                z-index: 1;
                left: ${Math.random() * 100}vw;
                top: 100vh;
                animation: floatUp 8s linear forwards;
            `;
            
            body.appendChild(icon);
            
            // Remove after animation
            setTimeout(() => {
                if (icon.parentNode) {
                    icon.parentNode.removeChild(icon);
                }
            }, 8000);
        }
    }, 3000);
    
    // Add CSS for floating animation
    if (!document.querySelector('#floating-animation-style')) {
        const style = document.createElement('style');
        style.id = 'floating-animation-style';
        style.textContent = `
            @keyframes floatUp {
                from {
                    transform: translateY(0) rotate(0deg);
                    opacity: 0.1;
                }
                10% {
                    opacity: 0.3;
                }
                90% {
                    opacity: 0.1;
                }
                to {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function animateTechTags() {
    const techTags = document.querySelectorAll('.tech-tag');
    techTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;
        tag.classList.add('tech-animate');
    });
}

function addRippleEffect() {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation CSS
    if (!document.querySelector('#ripple-animation-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}