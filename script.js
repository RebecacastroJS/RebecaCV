// Mobile menu toggle
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            document.querySelector('.nav-links').classList.remove('active');
        }
    });
});

// Form submission removed - now using FormSubmit service
// The form will submit directly to FormSubmit via HTML action attribute

// CV download tracking (now in About section)
let lastScroll = 0;
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.backgroundColor = 'rgba(44, 62, 80, 0.98)';
        header.style.padding = '0.5rem 0';
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.backgroundColor = 'var(--secondary-color)';
        header.style.padding = '1rem 0';
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Animate elements when they come into view
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate skill bars
            if (entry.target.classList.contains('skills')) {
                const skillBars = entry.target.querySelectorAll('.skill-level');
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width') || bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.transition = 'width 1.5s ease-in-out';
                        bar.style.width = width;
                    }, 300);
                });
            }
            
            // Animate cards with stagger effect
            if (entry.target.classList.contains('projects')) {
                const cards = entry.target.querySelectorAll('.card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate');
                    }, index * 150);
                });
            }
            
            // Animate skill categories
            if (entry.target.classList.contains('skills')) {
                const categories = entry.target.querySelectorAll('.skill-category');
                categories.forEach((category, index) => {
                    setTimeout(() => {
                        category.classList.add('animate');
                    }, index * 200);
                });
            }
            
            // Animate about section
            if (entry.target.classList.contains('about')) {
                const aboutImg = entry.target.querySelector('.about-img');
                const aboutText = entry.target.querySelector('.about-text');
                
                if (aboutImg) aboutImg.classList.add('animate');
                if (aboutText) aboutText.classList.add('animate');
            }
            
            // Once animated, unobserve
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections for animation
const sectionsToObserve = document.querySelectorAll('section');
sectionsToObserve.forEach(section => {
    observer.observe(section);
});

// Set initial width for skill bars
document.querySelectorAll('.skill-level').forEach(bar => {
    const width = bar.style.width;
    bar.setAttribute('data-width', width);
    bar.style.width = '0';
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
    }
});

// Video card interaction
document.querySelectorAll('.card-video video').forEach(video => {
    video.addEventListener('play', function() {
        const overlay = this.parentElement.querySelector('.video-overlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
    });
    
    video.addEventListener('pause', function() {
        const overlay = this.parentElement.querySelector('.video-overlay');
        if (overlay) {
            overlay.style.display = 'flex';
        }
    });
});

// CV download tracking (now in About section)
document.querySelector('.btn-cv')?.addEventListener('click', function(e) {
    // Create a temporary status message
    const statusMsg = document.createElement('div');
    statusMsg.className = 'download-status';
    statusMsg.innerHTML = '<i class="fas fa-check-circle"></i> CV download started!';
    statusMsg.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #3498db, #2c3e50);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
    `;
    
    document.body.appendChild(statusMsg);
    
    setTimeout(() => {
        statusMsg.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => statusMsg.remove(), 300);
    }, 3000);
});

// Scroll indicator click
document.querySelector('.scroll-indicator')?.addEventListener('click', function() {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        window.scrollTo({
            top: aboutSection.offsetTop - 80,
            behavior: 'smooth'
        });
    }
});

// Add hover effect to cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// Form validation enhancement
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() === '' && this.hasAttribute('required')) {
            this.style.borderColor = '#e74c3c';
        } else {
            this.style.borderColor = '#e0e0e0';
        }
    });
    
    input.addEventListener('focus', function() {
        this.style.borderColor = '#3498db';
    });
});

// Prevent form double submission - removed since FormSubmit handles this

console.log('Portfolio loaded successfully!');