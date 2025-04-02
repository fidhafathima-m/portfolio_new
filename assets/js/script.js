// Initialize AOS animation library
AOS.init();
        
// Loading Screen
window.addEventListener('load', function() {
    setTimeout(function() {
        document.querySelector('.loading-screen').classList.add('loaded');
    }, 1000);
});

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        document.querySelector('.navbar').classList.add('navbar-scrolled');
    } else {
        document.querySelector('.navbar').classList.remove('navbar-scrolled');
    }
});

// Mobile Menu Toggle
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.navbar-menu').classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (document.querySelector('.navbar-menu').classList.contains('active')) {
            document.querySelector('.navbar-menu').classList.remove('active');
        }
    });
});

// Portfolio Filter
const filterItems = document.querySelectorAll('.filter-item');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterItems.forEach(item => {
    item.addEventListener('click', function() {
        // Remove active class from all filter items
        filterItems.forEach(filter => filter.classList.remove('active'));
        
        // Add active class to clicked filter item
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        portfolioItems.forEach(portfolioItem => {
            if (filterValue === 'all' || portfolioItem.getAttribute('data-category') === filterValue) {
                portfolioItem.style.display = 'block';
            } else {
                portfolioItem.style.display = 'none';
            }
        });
    });
});

// Skill Bar Animation
const skillItems = document.querySelectorAll('.skill-item');

const animateSkillBars = () => {
    skillItems.forEach(item => {
        const bar = item.querySelector('.skill-bar-fill');
        const percentage = bar.getAttribute('data-percentage');
        bar.style.width = percentage;
    });
};

// Observe skill section for animation
const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
    if (entry.isIntersecting) {
        animateSkillBars();
        observer.unobserve(entry.target);
        }
    });
});

const skillsSection = document.querySelector('#skills');
if (skillsSection) {
    observer.observe(skillsSection);
}

// Create stars
const particles = document.getElementById('particles');

for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    
    // Random position
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    
    // Random size
    const size = Math.random() * 3;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    
    // Random animation duration
    star.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);
    
    particles.appendChild(star);
}

// Form Submission
document.addEventListener('DOMContentLoaded', function() {
// Initialize EmailJS with your user ID (you'll need to sign up at emailjs.com)
emailjs.init("olm474x-ruV5RxaDA"); // Replace with your actual EmailJS user ID

document.getElementById('contactForm').addEventListener('submit', function(e) {
e.preventDefault();

// Show sending indicator
const formStatus = document.getElementById('form-status');
formStatus.innerHTML = '<p style="color: #4286f4;">Sending message...</p>';

// Prepare template parameters
const templateParams = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value,
    to_email: 'fidhumusthafa3549@gmail.com'
};

// Send email using EmailJS
emailjs.send('service_mjnnu8k', 'template_25xfuyq', templateParams)
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        formStatus.innerHTML = '<p style="color: #28a745;">Thank you for your message! I will get back to you soon.</p>';
        document.getElementById('contactForm').reset();
    }, function(error) {
        console.log('FAILED...', error);
        formStatus.innerHTML = '<p style="color: #dc3545;">Something went wrong. Please try again later.</p>';
    });
});
});