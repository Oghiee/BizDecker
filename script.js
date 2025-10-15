// Smooth scrolling improvements
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation links
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
    
    // Mobile dropdown functionality
    const dropdownToggles = document.querySelectorAll('.has-dropdown > a');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            // Only handle on mobile and medium screens
            if (window.innerWidth <= 992) {
                e.preventDefault();
                const dropdown = this.nextElementSibling;
                if (dropdown && dropdown.classList.contains('dropdown')) {
                    dropdown.classList.toggle('active');
                }
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        
        if (window.innerWidth <= 992) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    });

    // Improved scroll performance with throttling
    let ticking = false;
    
    function updateScrollProgress() {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollProgress);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });

    // Improved intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for smooth animations
    document.querySelectorAll('.service-card, .step, .about-content, .contact-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Improved mobile navigation
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });

        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // Prevent scroll when modal is open
    function preventScroll() {
        document.body.style.overflow = 'hidden';
    }

    function allowScroll() {
        document.body.style.overflow = '';
    }

    // Enhanced modal functionality
    const modalMappings = [
        { cardId: 'vam-card', modalId: 'vam-modal' },
        { cardId: 'marketing-card', modalId: 'marketing-modal' },
        { cardId: 'process-card', modalId: 'process-modal' },
        { cardId: 'business-card', modalId: 'business-modal' },
        { cardId: 'strategy-step', modalId: 'strategy-modal' },
        { cardId: 'implementation-step', modalId: 'implementation-modal' },
        { cardId: 'optimization-step', modalId: 'optimization-modal' }
    ];

    modalMappings.forEach(({ cardId, modalId }) => {
        const card = document.getElementById(cardId);
        const modal = document.getElementById(modalId);
        if (!card || !modal) return;

        const closeBtn = modal.querySelector('.modal-close');

        const openModal = () => {
            modal.classList.add('show');
            preventScroll();
        };

        const closeModal = () => {
            modal.classList.remove('show');
            allowScroll();
        };

        card.addEventListener('click', openModal);
        if (closeBtn) closeBtn.addEventListener('click', closeModal);

        // Close when clicking outside the modal content
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        });
    });

    // Enhanced show more functionality
    const showMoreBtn = document.querySelector('.show-more-btn');
    const aboutExpanded = document.querySelector('.about-expanded');
    const btnIcon = document.querySelector('.btn-icon');

    if (showMoreBtn && aboutExpanded && btnIcon) {
        showMoreBtn.addEventListener('click', () => {
            const isExpanded = aboutExpanded.classList.contains('show');
            
            if (isExpanded) {
                aboutExpanded.classList.remove('show');
                showMoreBtn.classList.remove('expanded');
                showMoreBtn.textContent = 'Show More';
            } else {
                aboutExpanded.classList.add('show');
                showMoreBtn.classList.add('expanded');
                showMoreBtn.textContent = 'Show Less';
            }
        });
    }
});

// Improved scroll performance
window.addEventListener('load', () => {
    // Preload critical resources
    const criticalImages = document.querySelectorAll('img[src*="logo"]');
    criticalImages.forEach(img => {
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .step, .stat');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        // Get form data
        const name = contactForm.querySelector('input[name="name"]').value;
        const email = contactForm.querySelector('input[name="email"]').value;
        const company = contactForm.querySelector('input[name="company"]').value;
        const message = contactForm.querySelector('textarea[name="message"]').value;
        
        // Simple validation
        if (!name || !email || !message) {
            e.preventDefault();
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            e.preventDefault();
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show sending notification
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Submit form to Formspree and handle redirect
        fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                showNotification('Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
            } else {
                showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
            }
        })
        .catch(error => {
            showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
        })
        .finally(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
        
        // Prevent default form submission
        e.preventDefault();
    });
}



// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#8558EC'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Button click effects
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
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
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat h3');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add loading animation for page
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 1000);
    }
});

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #8558EC, #F1D65E);
    z-index: 10001;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

// Show More functionality for About section
document.addEventListener('DOMContentLoaded', () => {
    const showMoreBtn = document.getElementById('showMoreBtn');
    const aboutExpanded = document.querySelector('.about-expanded');
    const btnText = showMoreBtn ? showMoreBtn.querySelector('.btn-text') : null;
    const btnIcon = showMoreBtn ? showMoreBtn.querySelector('.btn-icon') : null;

    if (showMoreBtn && aboutExpanded) {
        showMoreBtn.addEventListener('click', () => {
            const isExpanded = aboutExpanded.style.display !== 'none';
            
            if (isExpanded) {
                // Collapse
                aboutExpanded.classList.remove('show');
                setTimeout(() => {
                    aboutExpanded.style.display = 'none';
                }, 500);
                
                showMoreBtn.classList.remove('expanded');
                if (btnText) btnText.textContent = 'Show More';
            } else {
                // Expand
                aboutExpanded.style.display = 'block';
                setTimeout(() => {
                    aboutExpanded.classList.add('show');
                }, 10);
                
                showMoreBtn.classList.add('expanded');
                if (btnText) btnText.textContent = 'Show Less';
            }
        });
    }
}); 

// Calendly integration
function openCalendly() {
    const calendlyModal = document.getElementById('calendly-modal');
    calendlyModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeCalendly() {
    const calendlyModal = document.getElementById('calendly-modal');
    calendlyModal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Scroll to About section
function scrollToAbout() {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        aboutSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}