// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
});

// Initialize the application
function initializeApp() {
    // Initialize tabs
    initializeTabs();
    
    // Initialize search functionality
    initializeSearch();
    
    // Initialize action buttons
    initializeActionButtons();
    
    // Add smooth scrolling and animations
    addSmoothAnimations();
}

// Initialize tab functionality
function initializeTabs() {
    const tabs = document.querySelectorAll('.tab');
    
    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // You can add logic here to show/hide different content panels
            console.log(`Switched to tab: ${tab.textContent}`);
        });
    });
}

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchContainer = document.querySelector('.search-container');
    
    if (searchInput) {
        // Add focus effects
        searchInput.addEventListener('focus', () => {
            searchContainer.style.boxShadow = '0 0 0 2px rgba(163, 237, 18, 0.3)';
        });
        
        searchInput.addEventListener('blur', () => {
            searchContainer.style.boxShadow = 'none';
        });
        
        // Add search functionality
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            console.log(`Searching for: ${query}`);
        });
    }
}

// Initialize action buttons
function initializeActionButtons() {
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach((button) => {
        button.addEventListener('click', () => {
            // Add click animation
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
            
            const icon = button.querySelector('img');
            if (icon) {
                const altText = icon.alt;
                console.log(`Clicked: ${altText}`);
                showNotification(`Action: ${altText}`);
            }
        });
    });
}

// Add smooth animations
function addSmoothAnimations() {
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'translateY(20px)';
        mainContent.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
        }, 100);
    }
}

// Show notification (simple implementation)
function showNotification(message) {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #1C261C;
        color: #FFFFFF;
        padding: 12px 20px;
        border-radius: 8px;
        border: 1px solid #404F40;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        font-family: 'Space Grotesk', sans-serif;
        font-size: 14px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}