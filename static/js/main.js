console.log('main.js loaded'); // Check if the file is loaded

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('Form submission initiated'); // Log when form is submitted
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Validation
    if (!name || !email || !message) {
        document.getElementById('formStatus').textContent = 'Please fill in all fields.';
        return;
    }

    console.log('Form data:', { name, email, message }); // Log the form data

    const submitButton = document.querySelector('.contact-form-button');
    submitButton.disabled = true; // Disable the button
    const statusMessage = document.getElementById('formStatus');
    statusMessage.textContent = 'Submitting...'; // Indicate loading

    // Sending POST request to the Flask backend
    fetch('/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
    })
    .then(response => {
        console.log('Response received:', response); // Log the response
        return response.json();
    })
    .then(data => {
        console.log('Response data:', data); // Log the response data
        if (data.status === 'success') {
            statusMessage.textContent = 'Thank you! We will get back to you shortly.';
            statusMessage.style.color = '#28a745'; // Green for success
            document.getElementById('contactForm').reset();
        } else {
            statusMessage.textContent = 'There was an error submitting your form.';
            statusMessage.style.color = '#dc3545'; // Red for error
        }
    })
    .catch(error => {
        console.error('Fetch Error:', error); // Log fetch errors
        document.getElementById('formStatus').textContent = 'There was an error submitting your form.';
        document.getElementById('formStatus').style.color = '#dc3545'; // Red for error
    })
    .finally(() => {
        submitButton.disabled = false; // Re-enable the button
    });
});
