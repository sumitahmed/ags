// Chart creation and interactivity for AgriSense AI dashboard

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the health chart
    createHealthChart();
    
    // Add search functionality
    initializeSearch();
    
    // Add navigation interactions
    initializeNavigation();
    
    // Add card hover effects
    initializeCardEffects();
});


// Create the health chart using Canvas API
function createHealthChart() {
    const canvas = document.getElementById('healthChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(43, 54, 43, 1)');
    gradient.addColorStop(0.5, 'rgba(43, 54, 43, 0)');
    
    // Fill background
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Draw chart line
    ctx.strokeStyle = '#A1B5A1';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    // Chart data points (simulating crop health over 4 weeks)
    const dataPoints = [
        { x: 0, y: height * 0.3 },      // Week 1: 70% health
        { x: width * 0.33, y: height * 0.25 }, // Week 2: 75% health
        { x: width * 0.66, y: height * 0.2 },  // Week 3: 80% health
        { x: width, y: height * 0.15 }          // Week 4: 85% health
    ];
    
    // Draw the line
    ctx.moveTo(dataPoints[0].x, dataPoints[0].y);
    for (let i = 1; i < dataPoints.length; i++) {
        ctx.lineTo(dataPoints[i].x, dataPoints[i].y);
    }
    ctx.stroke();
    
    // Draw data points
    ctx.fillStyle = '#FFFFFF';
    dataPoints.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
        ctx.fill();
    });
}

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;
    
    searchInput.addEventListener('focus', function() {
        this.parentElement.style.boxShadow = '0 0 0 2px rgba(163, 237, 18, 0.3)';
    });
    
    searchInput.addEventListener('blur', function() {
        this.parentElement.style.boxShadow = 'none';
    });
    
    searchInput.addEventListener('input', function() {
        // Add search logic here
        console.log('Searching for:', this.value);
    });
}

// ... (all other functions are fine) ...

// Initialize navigation interactions
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // === FIX ===
            // Only prevent default for placeholder links, not real navigation links.
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
            }
            console.log('Navigating to:', this.textContent);
        });
    });
}

// ... (all other functions are fine) ...

/**
 * this part has been changed above
 * 
 */
// Initialize navigation interactions
// function initializeNavigation() {
//     const navLinks = document.querySelectorAll('.nav-link');
    
//     navLinks.forEach(link => {
//         link.addEventListener('click', function(e) {
//             e.preventDefault();
            
//             // Remove active class from all links
//             navLinks.forEach(l => l.classList.remove('active'));
            
//             // Add active class to clicked link
//             this.classList.add('active');
            
//             // Add navigation logic here
//             console.log('Navigating to:', this.textContent);
//         });
//     });
// }

// Initialize card hover effects
function initializeCardEffects() {
    const storyboardCards = document.querySelectorAll('.storyboard-card');
    const dataCards = document.querySelectorAll('.data-card');
    
    // Storyboard cards hover effect
    storyboardCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Data cards hover effect
    dataCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
}

// Add smooth scrolling for navigation
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add loading animation for images
function initializeImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transition = 'opacity 0.3s ease';
        });
        
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.error('Failed to load image:', this.src);
        });
    });
}

// Add responsive chart resizing
function handleChartResize() {
    const canvas = document.getElementById('healthChart');
    if (!canvas) return;
    
    // Maintain aspect ratio
    const container = canvas.parentElement;
    const containerWidth = container.offsetWidth;
    const aspectRatio = 299 / 148;
    
    canvas.style.width = '100%';
    canvas.style.height = 'auto';
    canvas.style.maxWidth = '299px';
}

// Initialize all functionality
function initializeDashboard() {
    // Add window resize listener for responsive chart
    window.addEventListener('resize', handleChartResize);
    
    // Initialize image loading
    initializeImageLoading();
    
    // Add some sample data updates
    setInterval(() => {
        // Simulate real-time data updates
        updateMetrics();
    }, 5000);
}

// Update metrics with sample data
function updateMetrics() {
    const healthValue = document.querySelector('.data-card:nth-child(1) .data-value');
    const growthValue = document.querySelector('.data-card:nth-child(2) .data-value');
    const yieldValue = document.querySelector('.data-card:nth-child(3) .data-value');
    
    if (healthValue) {
        const currentHealth = parseInt(healthValue.textContent);
        const newHealth = Math.min(100, Math.max(85, currentHealth + (Math.random() - 0.5) * 2));
        healthValue.textContent = Math.round(newHealth) + '%';
    }
    
    if (growthValue) {
        const currentGrowth = parseInt(growthValue.textContent);
        const newGrowth = Math.min(100, Math.max(70, currentGrowth + (Math.random() - 0.5) * 3));
        growthValue.textContent = Math.round(newGrowth) + '%';
    }
    
    if (yieldValue) {
        const currentYield = parseInt(yieldValue.textContent);
        const newYield = Math.max(1000, Math.min(1400, currentYield + (Math.random() - 0.5) * 50));
        yieldValue.textContent = Math.round(newYield) + ' tons';
    }
}

// Initialize dashboard when page loads
window.addEventListener('load', function() {
    initializeDashboard();
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        // Add focus indicators for accessibility
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    // Remove keyboard navigation indicators on mouse use
    document.body.classList.remove('keyboard-navigation');
});

// Export functions for potential external use
window.AgriSenseDashboard = {
    createHealthChart,
    updateMetrics,
    smoothScrollTo,
    initializeDashboard
};
