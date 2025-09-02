// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeMetricsTabs();
    initializeTrendCharts();
    initializeFilterButtons();
    initializeSearchFunctionality();
    initializeResponsiveBehavior();
});

// Metrics Tabs Functionality
function initializeMetricsTabs() {
    const metricTabs = document.querySelectorAll('.metric-tab');
    
    metricTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            metricTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Here you would typically update the metrics display
            // based on the selected tab (NDVI, EVI, or SAVI)
            updateMetricsDisplay(this.textContent);
        });
    });
}

// Update metrics display based on selected tab
function updateMetricsDisplay(selectedMetric) {
    console.log(`Switched to ${selectedMetric} metrics`);
    // In a real application, this would fetch and display
    // different data based on the selected metric
}

// Initialize Trend Charts
function initializeTrendCharts() {
    createTrendChart('ndviChart', [0.72, 0.73, 0.74, 0.75, 0.76, 0.77, 0.75], '#6E964F');
    createTrendChart('eviChart', [0.70, 0.69, 0.68, 0.67, 0.68, 0.69, 0.68], '#6E964F');
    createTrendChart('saviChart', [0.80, 0.81, 0.82, 0.83, 0.84, 0.85, 0.82], '#6E964F');
}

// Create trend chart using Canvas
function createTrendChart(canvasId, data, strokeColor) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set up chart area
    const padding = 20;
    const chartWidth = width - (padding * 2);
    const chartHeight = height - (padding * 2);
    
    // Find min and max values for scaling
    const minValue = Math.min(...data);
    const maxValue = Math.max(...data);
    const valueRange = maxValue - minValue;
    
    // Draw chart background
    ctx.fillStyle = 'rgba(237, 242, 232, 0.3)';
    ctx.fillRect(padding, padding, chartWidth, chartHeight);
    
    // Draw grid lines
    ctx.strokeStyle = 'rgba(110, 150, 79, 0.2)';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 4; i++) {
        const y = padding + (i * chartHeight / 4);
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(padding + chartWidth, y);
        ctx.stroke();
    }
    
    // Vertical grid lines
    for (let i = 0; i <= 6; i++) {
        const x = padding + (i * chartWidth / 6);
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, padding + chartHeight);
        ctx.stroke();
    }
    
    // Draw trend line
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    data.forEach((value, index) => {
        const x = padding + (index * chartWidth / (data.length - 1));
        const y = padding + chartHeight - ((value - minValue) / valueRange * chartHeight);
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Draw data points
    ctx.fillStyle = strokeColor;
    data.forEach((value, index) => {
        const x = padding + (index * chartWidth / (data.length - 1));
        const y = padding + chartHeight - ((value - minValue) / valueRange * chartHeight);
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
    });
}

// Filter Buttons Functionality
function initializeFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all filter buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Handle filter functionality
            handleFilterChange(this.querySelector('i').className);
        });
    });
}

// Handle filter changes
function handleFilterChange(filterType) {
    console.log(`Filter changed to: ${filterType}`);
}

// Search Functionality
function initializeSearchFunctionality() {
    const searchInputs = document.querySelectorAll('.search-input, .search-input-large, .field-search');
    
    searchInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            performSearch(searchTerm, e.target.placeholder);
        });
        
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = e.target.value.toLowerCase();
                performSearch(searchTerm, e.target.placeholder);
            }
        });
    });
}

// Perform search functionality
function performSearch(searchTerm, searchType) {
    console.log(`Searching for "${searchTerm}" in ${searchType}`);
}

// Responsive Behavior
function initializeResponsiveBehavior() {
    window.addEventListener('resize', function() {
        setTimeout(() => {
            initializeTrendCharts();
        }, 100);
    });
}