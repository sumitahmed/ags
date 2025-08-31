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
}

// Draw the growth line chart
function drawGrowthLine(ctx, width, height) {
    // Sample growth data (7 months: Jan to Jul)
    const data = [65, 68, 72, 75, 78, 82, 85]; // Growth percentages
    
    const padding = 20;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;

    // Calculate scaling
    const minValue = Math.min(...data);
    const maxValue = Math.max(...data);
    const range = maxValue - minValue === 0 ? 1 : maxValue - minValue;
    
    // Set line style
    ctx.strokeStyle = '#638763';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Start drawing the line
    ctx.beginPath();
    
    data.forEach((value, index) => {
        const x = padding + (index / (data.length - 1)) * chartWidth;
        const y = padding + chartHeight - ((value - minValue) / range) * chartHeight;
        
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
        const x = padding + (index / (data.length - 1)) * chartWidth;
        const y = padding + chartHeight - ((value - minValue) / range) * chartHeight;
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    });
}

// Initialize download button functionality
function initDownloadButton() {
    const downloadBtn = document.querySelector('.download-btn');
    if (!downloadBtn) return;
    
    downloadBtn.addEventListener('click', function() {
        downloadBtn.textContent = 'Downloading...';
        downloadBtn.disabled = true;
        
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = 'data:text/plain;charset=utf-8,Crop Health Report - AgriSense AI';
            link.download = 'crop-health-report.txt';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            downloadBtn.textContent = 'Download Report';
            downloadBtn.disabled = false;
            
            showNotification('Report downloaded successfully!', 'success');
        }, 1500);
    });
}

// Initialize smooth scrolling for navigation
function initSmoothScrolling() {
    // === THE FIX IS HERE ===
    // We select only the links that start with a '#' for same-page scrolling.
    // This will now ignore links like "/dashboard" or "/fields".
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
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
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
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
        font-family: 'Epilogue', sans-serif;
        font-size: 14px;
        max-width: 300px;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Add CSS animations if not already present
if (!document.querySelector('#anim-style')) {
    const style = document.createElement('style');
    style.id = 'anim-style';
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
    `;
    document.head.appendChild(style);
}