// Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    body.appendChild(overlay);

    // Toggle menu
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        overlay.classList.toggle('active');
        body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking overlay
    overlay.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // Close menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = '';
        }
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll Animation
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card, .rewards-content, .founder-content').forEach(el => {
    observer.observe(el);
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(74, 44, 42, 0.95)';
    } else {
        navbar.style.background = 'rgba(74, 44, 42, 0.95)';
    }
});

// Product card hover effect
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Form validation for order page
if (document.querySelector('.order-form')) {
    const form = document.querySelector('.order-form');
    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const addressInput = document.querySelector('#address');
    const addonsInput = document.querySelector('#addons');
    const totalPriceInput = document.querySelector('#total-price');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Name validation
        if (nameInput.value.trim().length < 3) {
            showError(nameInput, 'Name must be at least 3 characters long');
            isValid = false;
        } else {
            removeError(nameInput);
        }

        // Email validation
        if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        } else {
            removeError(emailInput);
        }

        // Address validation
        if (addressInput.value.trim().length < 10) {
            showError(addressInput, 'Please enter a complete address');
            isValid = false;
        } else {
            removeError(addressInput);
        }

        // Add-ons validation
        if (addonsInput.value.trim().length === 0) {
            showError(addonsInput, 'Please select at least one add-on');
            isValid = false;
        } else {
            removeError(addonsInput);
        }

        // Total price validation
        if (isNaN(totalPriceInput.value) || totalPriceInput.value <= 0) {
            showError(totalPriceInput, 'Please enter a valid total price');
            isValid = false;
        } else {
            removeError(totalPriceInput);
        }

        if (isValid) {
            // Submit form
            form.submit();
        }
    });
}

// Helper functions for form validation
function showError(input, message) {
    const formControl = input.parentElement;
    const errorMessage = formControl.querySelector('.error-message') || document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    if (!formControl.querySelector('.error-message')) {
        formControl.appendChild(errorMessage);
    }
    input.classList.add('error');
}

function removeError(input) {
    const formControl = input.parentElement;
    const errorMessage = formControl.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
    input.classList.remove('error');
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
} 