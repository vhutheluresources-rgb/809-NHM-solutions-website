document.addEventListener("DOMContentLoaded", function () {
    const whatsappIndicator = document.getElementById("whatsappIndicator");

    if (whatsappIndicator) {
        const whatsappNumber = "27820531703"; // International format without '+'
        const defaultMessage = "Hello! I would like to know more about your services.";
        const message = encodeURIComponent(defaultMessage);

        const openChat = () => {
            window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
        };

        whatsappIndicator.addEventListener("click", openChat);
        whatsappIndicator.addEventListener("keydown", function (event) {
            if (event.key === "Enter") openChat();
        });
    } else {
        console.warn("WhatsApp indicator element not found.");
    }
});





// Initialize EmailJS - Place this near the top of your new section
(function() {
    // Replace with your EmailJS Public Key
    emailjs.init("C6QS6upEFp4HTzr0Z");
    
    console.log("EmailJS initialized");
})();

// Wait for DOM to be fully loaded before attaching form listener
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) {
        console.warn("Contact form not found. Email functionality disabled.");
        return;
    }
    
    // Attach submit event listener
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Initialize modal
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'none';
    }
    
    // Set up modal close functionality
    setupModal();
});

// Form submission handler
async function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('.submit-button');
    const statusMessage = document.getElementById('form-status');
    
    // Validation
    if (!validateForm(form)) {
        return;
    }
    
    // Set loading state
    setLoadingState(submitButton, statusMessage, true);
    
    try {
        // Prepare form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim(),
            timestamp: new Date().toLocaleString(),
            page: window.location.href
        };
        
        // Send email using EmailJS
        // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual IDs
        const response = await emailjs.send(
            'service_x6pksp8', 
            'template_fc0mqtq', 
            formData
        );
        
        // Success handling
        handleSuccess(form, submitButton, statusMessage);
        
    } catch (error) {
        // Error handling
        handleError(error, submitButton, statusMessage);
    }
}

// Form validation
function validateForm(form) {
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const statusMessage = document.getElementById('form-status');
    
    // Clear previous messages
    statusMessage.textContent = '';
    statusMessage.className = 'status-message';
    
    // Name validation: only letters and spaces allowed
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
        statusMessage.textContent = 'Name should only contain letters (no numbers).';
        statusMessage.className = 'status-message error';
        return false;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        statusMessage.textContent = 'Please enter a valid email address.';
        statusMessage.className = 'status-message error';
        return false;
    }
    
    return true;
}

// Set loading state
function setLoadingState(button, statusElement, isLoading) {
    if (isLoading) {
        button.disabled = true;
        button.textContent = 'Sending...';
        statusElement.textContent = '';
        statusElement.className = 'status-message';
    } else {
        button.disabled = false;
        button.textContent = 'Send Message';
    }
}

// Success handler
function handleSuccess(form, button, statusElement) {
    // Show success modal
    showSuccessModal();
    
    // Reset form
    form.reset();
    
    // Update status message
    statusElement.textContent = 'Message sent successfully!';
    statusElement.className = 'status-message success';
    
    // Reset button state
    setLoadingState(button, statusElement, false);
}

// Error handler
function handleError(error, button, statusElement) {
    console.error('Email sending failed:', error);
    
    let errorMessage = 'Failed to send message. Please try again.';
    
    // Provide more specific error messages if available
    if (error.text) {
        errorMessage += ` (${error.text})`;
    }
    
    statusElement.textContent = errorMessage;
    statusElement.className = 'status-message error';
    
    // Reset button state
    setLoadingState(button, statusElement, false);
}

// Modal functions
function setupModal() {
    const modal = document.getElementById('successModal');
    if (!modal) return;
    
    // Close modal when clicking X
    const closeButton = modal.querySelector('.close-button');
    if (closeButton) {
        closeButton.onclick = () => hideModal(modal);
    }
    
    // Close modal when clicking OK button
    const okButton = modal.querySelector('.ok-button');
    if (okButton) {
        okButton.onclick = () => hideModal(modal);
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            hideModal(modal);
        }
    });
}

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'block';
        // Add animation class if you have CSS animations
        modal.classList.add('show');
    }
}

function hideModal(modal) {
    modal.style.display = 'none';
    modal.classList.remove('show');
}

// Optional: Add this if you want to prevent form submission on Enter key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && event.target.tagName !== 'TEXTAREA') {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.form && activeElement.form.id === 'contactForm') {
            event.preventDefault();
        }
    }
});



