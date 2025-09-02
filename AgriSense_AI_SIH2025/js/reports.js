document.addEventListener('DOMContentLoaded', function() {
    // Initialize all the charts on the page
    drawCropHealthChart();
    drawGrowthStageChart();
    drawYieldForecastChart();
});

// Draws the wavy line chart for Crop Health Index
function drawCropHealthChart() {
    const canvas = document.getElementById('cropHealthChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const data = [0.85, 0.90, 0.88, 0.92, 0.89, 0.93, 0.92]; // Sample data

    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    ctx.clearRect(0, 0, width, height);
    
    ctx.strokeStyle = '#6E964F';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);

    const step = width / (data.length - 1);
    
    for (let i = 0; i < data.length; i++) {
        const x = i * step;
        const y = height - (data[i] * height * 0.8 + Math.sin(i * 1.5) * height * 0.1);
        ctx.lineTo(x, y);
    }
    ctx.stroke();
}

// === FIX: REWRITTEN FUNCTION TO DRAW BARS ===
// Draws the bar chart for Growth Stage Distribution
function drawGrowthStageChart() {
    const container = document.getElementById('growthStageChart');
    if (!container) return;
    
    // Clear any previous bars
    container.innerHTML = ''; 
    
    const data = [0.20, 0.75, 0.50, 0.30]; // Sample data for 4 bars
    
    data.forEach(value => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        
        const fill = document.createElement('div');
        fill.className = 'fill';
        fill.style.height = (value * 100) + '%';
        
        bar.appendChild(fill);
        container.appendChild(bar);
    });
}

// === FIX: REWRITTEN FUNCTION TO DRAW BARS ===
// Draws the stacked horizontal bars for Yield Forecast
function drawYieldForecastChart() {
    const container = document.getElementById('yieldForecastChart');
    if (!container) return;

    // Clear any previous bars
    container.innerHTML = '';
    
    // Data: [low_risk_%, medium_risk_%, high_risk_%]
    const data = [0.7, 0.2, 0.1];
    const colors = ['#6E964F', '#A8C99E', '#EDF2E8'];
    
    data.forEach((value, i) => {
        const segment = document.createElement('div');
        segment.className = 'stacked-bar-segment';
        segment.style.width = (value * 100) + '%';
        segment.style.backgroundColor = colors[i];
        container.appendChild(segment);
    });
}