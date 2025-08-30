// AgriSense AI Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const loginForm = document.querySelector('.login-form');
    const usernameInput = document.querySelector('input[type="text"]');
    const passwordInput = document.querySelector('input[type="password"]');
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.signup-btn');

    // Form validation and submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            // We prevent default to show a message, but in production,
            // the form action="/dashboard" will handle navigation.
            // For this demo, we can show the message then redirect.
            e.preventDefault(); 
            
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();
            
            // Basic validation
            if (!username || !password) {
                showMessage('Please fill in all fields', 'error');
                return;
            }
            
            // Simulate login process
            showMessage('Logging in...', 'info');
            loginBtn.disabled = true;
            loginBtn.textContent = 'Logging in...';
            
            // Simulate API call delay
            setTimeout(() => {
                showMessage('Login successful! Redirecting...', 'success');
                // Redirect to the dashboard after a short delay
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 1000);
            }, 1500);
        });
    }

    // Input focus effects
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });

    // Sign up button functionality
    if (signupBtn) {
        signupBtn.addEventListener('click', function() {
            showMessage('This would redirect to a sign up page.', 'info');
            // In a real app, this would be: window.location.href = '/signup';
        });
    }

    // Forgot password functionality
    const forgotLink = document.querySelector('.forgot-link');
    if (forgotLink) {
        forgotLink.addEventListener('click', function(e) {
            e.preventDefault();
            showMessage('Password reset functionality coming soon!', 'info');
        });
    }

    // Message display function
    function showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${type}`;
        messageDiv.textContent = message;
        
        // Style the message
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            font-family: 'Space Grotesk', sans-serif;
            font-weight: 500;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
        `;

        // Set background color based on message type
        switch(type) {
            case 'success':
                messageDiv.style.backgroundColor = '#A3ED12';
                messageDiv.style.color = '#121712';
                break;
            case 'error':
                messageDiv.style.backgroundColor = '#FF6B6B';
                break;
            case 'info':
                messageDiv.style.backgroundColor = '#638766';
                break;
            default:
                messageDiv.style.backgroundColor = '#638766';
        }

        // Add to page
        document.body.appendChild(messageDiv);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentElement) {
                messageDiv.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    if (messageDiv.parentElement) {
                        messageDiv.remove();
                    }
                }, 300);
            }
        }, 5000);
    }

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
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
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});