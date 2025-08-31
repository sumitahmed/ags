// AgriSense AI Settings Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
});

function initializeApp() {
    // Add smooth scrolling for navigation links
    setupNavigation();
    
    // Add interactive effects for setting cards
    setupSettingCards();
    
    // Add activity timeline animations
    setupActivityTimeline();
    
    // Add responsive navigation toggle for mobile
    setupMobileNavigation();
    
    // Add loading animations
    addLoadingAnimations();
}

// ... (all other functions are fine) ...

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // === FIX ===
            // Only prevent default for placeholder links, not real navigation links.
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
            }
        });
    });
}

// ... (all other functions are fine) ...

function setupSettingCards() {
    const settingCards = document.querySelectorAll('.setting-card');
    
    settingCards.forEach(card => {
        // Add click functionality
        card.addEventListener('click', function() {
            const settingTitle = this.querySelector('.setting-title').textContent;
            openSettingModal(settingTitle);
        });
        
        // Add keyboard navigation
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const settingTitle = this.querySelector('.setting-title').textContent;
                openSettingModal(settingTitle);
            }
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 8px 25px rgba(89, 150, 79, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

function setupActivityTimeline() {
    const activityItems = document.querySelectorAll('.activity-item');
    
    // Add staggered animation for activity items
    activityItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 200);
    });
}

function setupMobileNavigation() {
    // Create mobile menu toggle button
    const header = document.querySelector('.header-content');
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-toggle';
    mobileMenuBtn.innerHTML = `
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
    `;
    
    // Add mobile menu styles
    const mobileStyles = document.createElement('style');
    mobileStyles.textContent = `
        .mobile-menu-toggle {
            display: none;
            background: none;
            border: none;
            cursor: pointer;
            padding: 8px;
            flex-direction: column;
            gap: 4px;
        }
        
        .hamburger-line {
            width: 24px;
            height: 2px;
            background-color: #0F1C0D;
            transition: all 0.3s ease;
        }
        
        @media (max-width: 768px) {
            .mobile-menu-toggle {
                display: flex;
            }
            
            .navigation {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background-color: #FAFCF7;
                flex-direction: column;
                padding: 20px;
                border-bottom: 1px solid #E5E8EB;
                gap: 16px;
            }
            
            .navigation.active {
                display: flex;
            }
        }
    `;
    document.head.appendChild(mobileStyles);
    
    // Insert mobile menu button
    header.insertBefore(mobileMenuBtn, header.lastElementChild);
    
    // Add toggle functionality
    mobileMenuBtn.addEventListener('click', function() {
        const navigation = document.querySelector('.navigation');
        navigation.classList.toggle('active');
        
        // Animate hamburger
        const lines = this.querySelectorAll('.hamburger-line');
        if (navigation.classList.contains('active')) {
            lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            lines[1].style.opacity = '0';
            lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            lines[0].style.transform = 'none';
            lines[1].style.opacity = '1';
            lines[2].style.transform = 'none';
        }
    });
}

function addLoadingAnimations() {
    // Add fade-in animation for main content
    const mainContent = document.querySelector('.main-content');
    mainContent.style.opacity = '0';
    mainContent.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        mainContent.style.transition = 'all 0.8s ease';
        mainContent.style.opacity = '1';
        mainContent.style.transform = 'translateY(0)';
    }, 300);
    
    // Add staggered animation for setting cards
    const settingCards = document.querySelectorAll('.setting-card');
    settingCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 600 + (index * 100));
    });
}

function openSettingModal(settingTitle) {
    // Create modal for settings
    const modal = document.createElement('div');
    modal.className = 'settings-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${settingTitle}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>This is a placeholder for the ${settingTitle} settings. In a real application, this would contain the actual settings interface.</p>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .settings-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-overlay {
            background-color: rgba(0, 0, 0, 0.5);
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        
        .modal-content {
            background-color: #FFFFFF;
            border-radius: 12px;
            max-width: 500px;
            width: 100%;
            max-height: 80vh;
            overflow-y: auto;
            animation: slideUp 0.3s ease;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 24px;
            border-bottom: 1px solid #E5E8EB;
        }
        
        .modal-header h3 {
            font-family: 'Space Grotesk', sans-serif;
            font-weight: 700;
            font-size: 20px;
            color: #0F1C0D;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #59964F;
            padding: 0;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background-color 0.3s ease;
        }
        
        .modal-close:hover {
            background-color: #E8F2E8;
        }
        
        .modal-body {
            padding: 24px;
        }
        
        .modal-body p {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 16px;
            line-height: 1.6;
            color: #0F1C0D;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from { 
                opacity: 0;
                transform: translateY(30px);
            }
            to { 
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(modalStyles);
    
    // Add modal to page
    document.body.appendChild(modal);
    
    // Add close functionality
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    closeBtn.addEventListener('click', () => closeModal(modal));
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal(modal);
        }
    });
    
    // Add escape key functionality
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal(modal);
        }
    });
}

function closeModal(modal) {
    modal.style.animation = 'fadeOut 0.3s ease';
    modal.querySelector('.modal-content').style.animation = 'slideDown 0.3s ease';
    
    setTimeout(() => {
        document.body.removeChild(modal);
    }, 300);
}

// Add fadeOut and slideDown animations to existing styles
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes slideDown {
        from { 
            opacity: 1;
            transform: translateY(0);
        }
        to { 
            opacity: 0;
            transform: translateY(30px);
        }
    }
`;
document.head.appendChild(additionalStyles);

// Add smooth scrolling for the entire page
document.documentElement.style.scrollBehavior = 'smooth';

// Add performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScrollHandler = debounce(function() {
    // Add scroll-based animations if needed
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);
