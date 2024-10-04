document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Sending POST request to the Flask backend
    fetch('/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('formStatus').textContent = 'Thank you! We will get back to you shortly.';
        document.getElementById('contactForm').reset();
    })
    .catch(error => {
        document.getElementById('formStatus').textContent = 'There was an error submitting your form.';
    });
});
