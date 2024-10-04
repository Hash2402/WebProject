// Form validation
document.getElementById('contactForm').addEventListener('submit', function(event) {
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    
    if (!name || !email) {
        alert('Please fill out all fields.');
        event.preventDefault();
    } else {
        alert('Form submitted successfully!');
    }
});

// Navigation Bar Realignment for Mobile View
window.addEventListener('resize', function() {
    const navbar = document.querySelector('.navbar');
    
    if (window.innerWidth < 768) { // Example threshold for mobile
        navbar.classList.add('navbar-expand'); // Add class for mobile styling
    } else {
        navbar.classList.remove('navbar-expand'); // Remove class for desktop styling
    }
});
