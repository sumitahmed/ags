// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the growth chart
    initGrowthChart();
    
    // Add download button functionality
    initDownloadButton();
    
    // Add smooth scrolling for navigation
    initSmoothScrolling();
});

// Initialize the growth chart
function initGrowthChart() {
    const canvas = document.getElementById('growthChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(240, 245, 240, 1)');
    gradient.addColorStop(0.5, 'rgba(240, 245, 240, 0)');
    
    // Fill background
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Draw growth line chart
    drawGrowthLine(ctx, width, height);
    
    // Draw grid lines
    drawGridLines(ctx, width, height);
}

// Draw the growth line chart
function drawGrowthLine(ctx, width, height) {
    // Sample growth data (7 months: Jan to Jul)
    const data = [65, 68, 72, 75, 78, 82, 85]; // Growth percentages
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    
    // Calculate scaling
    const minValue = Math.min(...data);
    const maxValue = Math.max(...data);
    const range = maxValue - minValue;
    
    // Set line style
    ctx.strokeStyle = '#638763';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Start drawing the line
    ctx.beginPath();
    
    data.forEach((value, index) => {
        const x = (index / (data.length - 1)) * (width - 40) + 20;
        const y = height - 20 - ((value - minValue) / range) * (height - 40);
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Draw data points
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#638763';
    ctx.lineWidth = 2;
    
    data.forEach((value, index) => {
        const x = (index / (data.length - 1)) * (width - 40) + 20;
        const y = height - 20 - ((value - minValue) / range) * (height - 40);
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    });
}

// Draw grid lines
function drawGridLines(ctx, width, height) {
    ctx.strokeStyle = '#E5E8EB';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 4; i++) {
        const y = 20 + (i * (height - 40)) / 4;
        ctx.beginPath();
        ctx.moveTo(20, y);
        ctx.lineTo(width - 20, y);
        ctx.stroke();
    }
    
    // Vertical grid lines
    for (let i = 0; i <= 6; i++) {
        const x = 20 + (i * (width - 40)) / 6;
        ctx.beginPath();
        ctx.moveTo(x, 20);
        ctx.lineTo(x, height - 20);
        ctx.stroke();
    }
}

// Initialize download button functionality
function initDownloadButton() {
    const downloadBtn = document.querySelector('.download-btn');
    if (!downloadBtn) return;
    
    downloadBtn.addEventListener('click', function() {
        // Simulate download functionality
        downloadBtn.textContent = 'Downloading...';
        downloadBtn.disabled = true;
        
        setTimeout(() => {
            // Create a dummy PDF download (in real implementation, this would generate an actual PDF)
            const link = document.createElement('a');
            link.href = 'data:text/plain;charset=utf-8,Crop Health Report - AgriSense AI';
            link.download = 'crop-health-report.txt';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Reset button
            downloadBtn.textContent = 'Download Report';
            downloadBtn.disabled = false;
            
            // Show success message
            showNotification('Report downloaded successfully!', 'success');
        }, 1500);
    });
}

// Initialize smooth scrolling for navigation
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-message">${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 12px;
        font-family: 'Epilogue', sans-serif;
        font-size: 14px;
        max-width: 300px;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        margin: 0;
        line-height: 1;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
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
    
    .notification {
        animation: slideIn 0.3s ease-out;
    }
`;
document.head.appendChild(style);

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects for recommendation cards
    const recommendationCards = document.querySelectorAll('.recommendation-card');
    recommendationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Add hover effects for disease bars
    const diseaseBars = document.querySelectorAll('.disease-bar');
    diseaseBars.forEach(bar => {
        bar.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        bar.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add hover effects for nutrient bars
    const nutrientBars = document.querySelectorAll('.nutrient-bar');
    nutrientBars.forEach(bar => {
        bar.addEventListener('mouseenter', function() {
            this.style.transform = 'scaleY(1.1)';
        });
        
        bar.addEventListener('mouseleave', function() {
            this.style.transform = 'scaleY(1)';
        });
    });
});

// Add smooth transitions for all interactive elements
document.addEventListener('DOMContentLoaded', function() {
    const interactiveElements = document.querySelectorAll('a, button, .recommendation-card, .disease-bar, .nutrient-bar');
    
    interactiveElements.forEach(element => {
        element.style.transition = 'all 0.3s ease';
    });
});
