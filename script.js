// ===================================
// LANNA ARTS & CULTURE WEBSITE
// JavaScript for Interactivity
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    initHamburger();
    initGalleryFilters();
    initFormValidation();
    initSmoothScroll();
});

// ===================================
// HAMBURGER MENU FUNCTIONALITY
// ===================================

function initHamburger() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (!hamburger) return;

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-container')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// ===================================
// GALLERY FILTER FUNCTIONALITY
// ===================================

function initGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterButtons.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 10);
                } else if (item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 10);
                } else {
                    item.style.display = 'none';
                    item.style.opacity = '0';
                }
            });
        });
    });
}

// ===================================
// FORM VALIDATION
// ===================================

function initFormValidation() {
    const contactForm = document.querySelector('.contact-form');

    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validate inputs
        if (!name) {
            showAlert('โปรดกรอกชื่อของคุณ', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showAlert('โปรดกรอกอีเมลที่ถูกต้อง', 'error');
            return;
        }

        if (!subject) {
            showAlert('โปรดกรอกหัวข้อ', 'error');
            return;
        }

        if (!message) {
            showAlert('โปรดกรอกข้อความ', 'error');
            return;
        }

        // If validation passes, show success message
        showAlert('ส่งข้อความสำเร็จ! ขอบคุณที่ติดต่อเรา', 'success');

        // Reset form
        contactForm.reset();

        // Here you would typically send the form data to a server
        // Example: sendFormData({name, email, subject, message});
    });
}

// ===================================
// EMAIL VALIDATION HELPER
// ===================================

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===================================
// ALERT NOTIFICATION
// ===================================

function showAlert(message, type = 'info') {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;

    // Style the alert
    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(alertDiv);

    // Remove alert after 3 seconds
    setTimeout(() => {
        alertDiv.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            alertDiv.remove();
        }, 300);
    }, 3000);
}

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

// ===================================
// SCROLL ANIMATIONS
// ===================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all article cards and featured cards
    document.querySelectorAll('.article-card, .featured-card, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize scroll animations when page loads
window.addEventListener('load', initScrollAnimations);

// ===================================
// ACTIVE NAV LINK HIGHLIGHTING
// ===================================

function highlightActiveNavLink() {
    const currentLocation = location.pathname;
    const links = document.querySelectorAll('.nav-links a');

    links.forEach(link => {
        if (link.pathname === currentLocation) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

highlightActiveNavLink();

// ===================================
// BREADCRUMB NAVIGATION (Optional)
// ===================================

function generateBreadcrumbs() {
    const path = window.location.pathname;
    const fileName = path.split('/').pop() || 'index.html';

    const pageNames = {
        'index.html': 'หน้าแรก',
        'architecture.html': 'สถาปัตยกรรม',
        'handicraft.html': 'หัตถศิลป์',
        'festivals.html': 'เทศกาล',
        'gallery.html': 'แกลเลอรี่',
        'about.html': 'เกี่ยวกับเรา'
    };

    // You can use this function to add breadcrumb navigation if needed
    return pageNames[fileName] || 'หน้า';
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Add CSS animations
const styles = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .nav-links.active {
        display: flex;
    }

    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// ===================================
// PERFORMANCE: LAZY LOADING (for future images)
// ===================================

function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

initLazyLoading();

// ===================================
// LOG INITIALIZATION
// ===================================

console.log('🏛️ Lanna Arts & Culture Website - Initialized Successfully');
console.log('📱 Responsive design enabled for all devices');
console.log('🎨 Interactive features loaded');
