// ===== ADVANCED CHARTS SYSTEM =====

class ChartsController {
    constructor() {
        this.charts = new Map();
        this.canvases = new Map();
        this.animationFrames = new Map();
        this.chartConfigs = this.initializeChartConfigs();
        this.colorPalette = this.initializeColorPalette();
        
        this.initializeChartContainers();
        console.log('📊 Advanced Charts System initialized');
    }
    
    initializeChartConfigs() {
        return {
            performance: {
                width: 400,
                height: 250,
                margin: { top: 20, right: 30, bottom: 40, left: 50 },
                backgroundColor: '#ffffff',
                gridColor: '#e5e7eb',
                textColor: '#374151'
            },
            comparison: {
                width: 600,
                height: 300,
                margin: { top: 30, right: 40, bottom: 50, left: 60 },
                backgroundColor: '#f9fafb',
                gridColor: '#d1d5db',
                textColor: '#1f2937'
            },
            complexity: {
                width: 500,
                height: 350,
                margin: { top: 25, right: 35, bottom: 45, left: 55 },
                backgroundColor: '#ffffff',
                gridColor: '#e5e7eb',
                textColor: '#374151'
            },
            timeline: {
                width: 800,
                height: 200,
                margin: { top: 15, right: 25, bottom: 35, left: 45 },
                backgroundColor: '#f8fafc',
                gridColor: '#cbd5e1',
                textColor: '#475569'
            }
        };
    }
    
    initializeColorPalette() {
        return {
            algorithms: {
                bubble: '#ef4444',
                selection: '#f97316', 
                insertion: '#eab308',
                quick: '#22c55e',
                merge: '#06b6d4',
                heap: '#8b5cf6',
                radix: '#ec4899'
            },
            metrics: {
                comparisons: '#3b82f6',
                swaps: '#f59e0b',
                time: '#10b981',
                memory: '#8b5cf6',
                operations: '#ef4444'
            },
            states: {
                excellent: '#10b981',
                good: '#84cc16',
                average: '#f59e0b',
                poor: '#ef4444',
                neutral: '#6b7280'
            }
        };
    }
    
    initializeChartContainers() {
        // Create chart containers if they don't exist
        const containers = [
            { id: 'performanceChart', title: '📊 Gráfico de Performance' },
            { id: 'comparisonChart', title: '⚖️ Comparação de Algoritmos' },
            { id: 'complexityChart', title: '📈 Análise de Complexidade' },
            { id: 'timelineChart', title: '⏱️ Timeline de Execução' }
        ];
        
        containers.forEach(container => {
            let element = document.getElementById(container.id);
            if (!element) {
                element = document.createElement('div');
                element.id = container.id;
                element.className = 'chart-container';
                element.innerHTML = `
                    <div class="chart-header">
                        <h3>${container.title}</h3>
                        <div class="chart-controls">
                            <button class="chart-btn" data-action="refresh">🔄</button>
                            <button class="chart-btn" data-action="export">💾</button>
                            <select class="chart-type-select">
                                <option value="bar">Barras</option>
                                <option value="line">Linha</option>
                                <option value="area">Área</option>
                            </select>
                        </div>
                    </div>
                    <canvas id="${container.id}Canvas" class="chart-canvas"></canvas>
                    <div class="chart-legend" id="${container.id}Legend"></div>
                `;
                
                // Find a good place to insert the chart
                const chartSection = document.querySelector('.charts-section') || 
                                   document.querySelector('.comparison-container') ||
                                   document.createElement('div');
                
                if (!chartSection.parentNode) {
                    chartSection.className = 'charts-section';
                    document.querySelector('.main-container')?.appendChild(chartSection);
                }
                
                chartSection.appendChild(element);
            }
        });
    }
    
    createChart(containerId, type = 'bar', data = [], options = {}) {
        const container = document.getElementById(containerId);
        const canvas = document.getElementById(`${containerId}Canvas`);
        
        if (!canvas) {
            console.error(`Canvas not found for ${containerId}`);
            return null;
        }
        
        const config = this.chartConfigs[containerId.replace('Chart', '')] || this.chartConfigs.performance;
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        canvas.width = config.width;
        canvas.height = config.height;
        canvas.style.width = `${config.width}px`;
        canvas.style.height = `${config.height}px`;
        
        // Store canvas reference
        this.canvases.set(containerId, { canvas, ctx, config, type, data, options });
        
        // Render chart
        this.renderChart(containerId);
        
        return { canvas, ctx };
    }
    
    renderChart(containerId) {
        const chartData = this.canvases.get(containerId);
        if (!chartData) return;
        
        const { ctx, config, type, data, options } = chartData;
        
        // Clear canvas
        ctx.fillStyle = config.backgroundColor;
        ctx.fillRect(0, 0, config.width, config.height);
        
        // Draw based on chart type
        switch (type) {
            case 'bar':
                this.renderBarChart(ctx, config, data, options);
                break;
            case 'line':
                this.renderLineChart(ctx, config, data, options);
                break;
            case 'area':
                this.renderAreaChart(ctx, config, data, options);
                break;
            case 'scatter':
                this.renderScatterChart(ctx, config, data, options);
                break;
            default:
                this.renderBarChart(ctx, config, data, options);
        }
        
        // Draw grid and axes
        this.drawGrid(ctx, config);
        this.drawAxes(ctx, config, data, options);
        
        // Update legend
        this.updateLegend(containerId, data, options);
    }
    
    renderBarChart(ctx, config, data, options) {
        if (!data || data.length === 0) return;
        
        const chartArea = {
            x: config.margin.left,
            y: config.margin.top,
            width: config.width - config.margin.left - config.margin.right,
            height: config.height - config.margin.top - config.margin.bottom
        };
        
        const maxValue = Math.max(...data.map(d => d.value || 0));
        const barWidth = chartArea.width / data.length * 0.8;
        const barSpacing = chartArea.width / data.length * 0.2;
        
        data.forEach((item, index) => {
            const barHeight = (item.value / maxValue) * chartArea.height;
            const x = chartArea.x + index * (barWidth + barSpacing) + barSpacing / 2;
            const y = chartArea.y + chartArea.height - barHeight;
            
            // Draw bar with gradient
            const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
            const color = this.getColorForItem(item, index);
            gradient.addColorStop(0, color);
            gradient.addColorStop(1, this.lightenColor(color, 0.3));
            
            ctx.fillStyle = gradient;
            ctx.fillRect(x, y, barWidth, barHeight);
            
            // Draw bar border
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, barWidth, barHeight);
            
            // Draw value on top of bar
            ctx.fillStyle = config.textColor;
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            const valueText = this.formatValue(item.value, options.valueFormat);
            ctx.fillText(valueText, x + barWidth / 2, y - 5);
            
            // Draw label
            ctx.fillText(item.label || `Item ${index + 1}`, x + barWidth / 2, chartArea.y + chartArea.height + 20);
        });
    }
    
    renderLineChart(ctx, config, data, options) {
        if (!data || data.length === 0) return;
        
        const chartArea = {
            x: config.margin.left,
            y: config.margin.top,
            width: config.width - config.margin.left - config.margin.right,
            height: config.height - config.margin.top - config.margin.bottom
        };
        
        const maxValue = Math.max(...data.map(d => d.value || 0));
        const stepX = chartArea.width / (data.length - 1);
        
        // Draw line
        ctx.beginPath();
        ctx.strokeStyle = options.lineColor || this.colorPalette.metrics.time;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        data.forEach((item, index) => {
            const x = chartArea.x + index * stepX;
            const y = chartArea.y + chartArea.height - (item.value / maxValue) * chartArea.height;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Draw data points
        data.forEach((item, index) => {
            const x = chartArea.x + index * stepX;
            const y = chartArea.y + chartArea.height - (item.value / maxValue) * chartArea.height;
            
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = options.pointColor || this.colorPalette.metrics.time;
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Hover effect (simple version)
            ctx.fillStyle = config.textColor;
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(this.formatValue(item.value, options.valueFormat), x, y - 10);
        });
    }
    
    renderAreaChart(ctx, config, data, options) {
        if (!data || data.length === 0) return;
        
        const chartArea = {
            x: config.margin.left,
            y: config.margin.top,
            width: config.width - config.margin.left - config.margin.right,
            height: config.height - config.margin.top - config.margin.bottom
        };
        
        const maxValue = Math.max(...data.map(d => d.value || 0));
        const stepX = chartArea.width / (data.length - 1);
        
        // Create gradient for area fill
        const gradient = ctx.createLinearGradient(0, chartArea.y, 0, chartArea.y + chartArea.height);
        const baseColor = options.areaColor || this.colorPalette.metrics.operations;
        gradient.addColorStop(0, baseColor + '80'); // 50% opacity
        gradient.addColorStop(1, baseColor + '20'); // 12% opacity
        
        // Draw area
        ctx.beginPath();
        ctx.moveTo(chartArea.x, chartArea.y + chartArea.height);
        
        data.forEach((item, index) => {
            const x = chartArea.x + index * stepX;
            const y = chartArea.y + chartArea.height - (item.value / maxValue) * chartArea.height;
            ctx.lineTo(x, y);
        });
        
        ctx.lineTo(chartArea.x + chartArea.width, chartArea.y + chartArea.height);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw line on top
        this.renderLineChart(ctx, config, data, { ...options, lineColor: baseColor });
    }
    
    renderScatterChart(ctx, config, data, options) {
        if (!data || data.length === 0) return;
        
        const chartArea = {
            x: config.margin.left,
            y: config.margin.top,
            width: config.width - config.margin.left - config.margin.right,
            height: config.height - config.margin.top - config.margin.bottom
        };
        
        const maxX = Math.max(...data.map(d => d.x || 0));
        const maxY = Math.max(...data.map(d => d.y || 0));
        
        data.forEach((item, index) => {
            const x = chartArea.x + (item.x / maxX) * chartArea.width;
            const y = chartArea.y + chartArea.height - (item.y / maxY) * chartArea.height;
            
            ctx.beginPath();
            ctx.arc(x, y, item.size || 4, 0, 2 * Math.PI);
            ctx.fillStyle = this.getColorForItem(item, index);
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1;
            ctx.stroke();
        });
    }
    
    drawGrid(ctx, config) {
        const chartArea = {
            x: config.margin.left,
            y: config.margin.top,
            width: config.width - config.margin.left - config.margin.right,
            height: config.height - config.margin.top - config.margin.bottom
        };
        
        ctx.strokeStyle = config.gridColor;
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 2]);
        
        // Vertical grid lines
        for (let i = 0; i <= 10; i++) {
            const x = chartArea.x + (i / 10) * chartArea.width;
            ctx.beginPath();
            ctx.moveTo(x, chartArea.y);
            ctx.lineTo(x, chartArea.y + chartArea.height);
            ctx.stroke();
        }
        
        // Horizontal grid lines
        for (let i = 0; i <= 5; i++) {
            const y = chartArea.y + (i / 5) * chartArea.height;
            ctx.beginPath();
            ctx.moveTo(chartArea.x, y);
            ctx.lineTo(chartArea.x + chartArea.width, y);
            ctx.stroke();
        }
        
        ctx.setLineDash([]);
    }
    
    drawAxes(ctx, config, data, options) {
        const chartArea = {
            x: config.margin.left,
            y: config.margin.top,
            width: config.width - config.margin.left - config.margin.right,
            height: config.height - config.margin.top - config.margin.bottom
        };
        
        ctx.strokeStyle = config.textColor;
        ctx.lineWidth = 2;
        
        // X-axis
        ctx.beginPath();
        ctx.moveTo(chartArea.x, chartArea.y + chartArea.height);
        ctx.lineTo(chartArea.x + chartArea.width, chartArea.y + chartArea.height);
        ctx.stroke();
        
        // Y-axis
        ctx.beginPath();
        ctx.moveTo(chartArea.x, chartArea.y);
        ctx.lineTo(chartArea.x, chartArea.y + chartArea.height);
        ctx.stroke();
        
        // Axis labels
        ctx.fillStyle = config.textColor;
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        
        // X-axis title
        if (options.xAxisTitle) {
            ctx.fillText(
                options.xAxisTitle,
                chartArea.x + chartArea.width / 2,
                config.height - 10
            );
        }
        
        // Y-axis title
        if (options.yAxisTitle) {
            ctx.save();
            ctx.translate(15, chartArea.y + chartArea.height / 2);
            ctx.rotate(-Math.PI / 2);
            ctx.fillText(options.yAxisTitle, 0, 0);
            ctx.restore();
        }
    }
    
    updateLegend(containerId, data, options) {
        const legendContainer = document.getElementById(`${containerId}Legend`);
        if (!legendContainer) return;
        
        legendContainer.innerHTML = '';
        
        if (options.showLegend !== false && data.length > 0) {
            const legend = document.createElement('div');
            legend.className = 'chart-legend-items';
            
            data.forEach((item, index) => {
                const legendItem = document.createElement('div');
                legendItem.className = 'legend-item';
                
                const color = this.getColorForItem(item, index);
                legendItem.innerHTML = `
                    <span class="legend-color" style="background-color: ${color}"></span>
                    <span class="legend-label">${item.label || `Series ${index + 1}`}</span>
                    <span class="legend-value">${this.formatValue(item.value, options.valueFormat)}</span>
                `;
                
                legend.appendChild(legendItem);
            });
            
            legendContainer.appendChild(legend);
        }
    }
    
    getColorForItem(item, index) {
        if (item.color) return item.color;
        if (item.algorithm && this.colorPalette.algorithms[item.algorithm]) {
            return this.colorPalette.algorithms[item.algorithm];
        }
        if (item.metric && this.colorPalette.metrics[item.metric]) {
            return this.colorPalette.metrics[item.metric];
        }
        
        // Default color palette
        const defaultColors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#ec4899'];
        return defaultColors[index % defaultColors.length];
    }
    
    lightenColor(color, factor) {
        // Simple color lightening
        const hex = color.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        
        const newR = Math.min(255, Math.floor(r + (255 - r) * factor));
        const newG = Math.min(255, Math.floor(g + (255 - g) * factor));
        const newB = Math.min(255, Math.floor(b + (255 - b) * factor));
        
        return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
    }
    
    formatValue(value, format) {
        if (!format || format === 'number') {
            return typeof value === 'number' ? value.toLocaleString() : value;
        }
        
        switch (format) {
            case 'time':
                return `${value}ms`;
            case 'percentage':
                return `${(value * 100).toFixed(1)}%`;
            case 'memory':
                return value > 1024 ? `${(value / 1024).toFixed(1)}KB` : `${value}B`;
            case 'operations':
                return value > 1000 ? `${(value / 1000).toFixed(1)}K` : value.toString();
            default:
                return value.toString();
        }
    }
    
    // Animation methods
    animateChart(containerId, duration = 1000) {
        const chartData = this.canvases.get(containerId);
        if (!chartData) return;
        
        const startTime = performance.now();
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out)
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            
            this.renderChartWithProgress(containerId, easedProgress);
            
            if (progress < 1) {
                this.animationFrames.set(containerId, requestAnimationFrame(animate));
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    renderChartWithProgress(containerId, progress) {
        const chartData = this.canvases.get(containerId);
        if (!chartData) return;
        
        const { data } = chartData;
        const progressData = data.map(item => ({
            ...item,
            value: (item.value || 0) * progress
        }));
        
        chartData.data = progressData;
        this.renderChart(containerId);
        chartData.data = data; // Restore original data
    }
    
    // Update chart data
    updateChart(containerId, newData, options = {}) {
        const chartData = this.canvases.get(containerId);
        if (!chartData) return;
        
        chartData.data = newData;
        chartData.options = { ...chartData.options, ...options };
        
        if (options.animate !== false) {
            this.animateChart(containerId, options.animationDuration || 800);
        } else {
            this.renderChart(containerId);
        }
    }
    
    // Export chart as image
    exportChart(containerId, filename = 'chart.png') {
        const chartData = this.canvases.get(containerId);
        if (!chartData) return;
        
        const { canvas } = chartData;
        const link = document.createElement('a');
        link.download = filename;
        link.href = canvas.toDataURL();
        link.click();
    }
    
    // Resize chart
    resizeChart(containerId, width, height) {
        const chartData = this.canvases.get(containerId);
        if (!chartData) return;
        
        const { canvas, config } = chartData;
        config.width = width;
        config.height = height;
        
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        
        this.renderChart(containerId);
    }
    
    // Remove chart
    removeChart(containerId) {
        const animationFrame = this.animationFrames.get(containerId);
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
            this.animationFrames.delete(containerId);
        }
        
        this.canvases.delete(containerId);
        this.charts.delete(containerId);
        
        const container = document.getElementById(containerId);
        if (container) {
            container.remove();
        }
    }
}

// Initialize global charts controller
window.chartsController = new ChartsController();

// Add event listeners for chart controls
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('chart-btn')) {
        const action = e.target.dataset.action;
        const container = e.target.closest('.chart-container');
        const containerId = container?.id;
        
        if (!containerId) return;
        
        switch (action) {
            case 'refresh':
                window.chartsController.renderChart(containerId);
                break;
            case 'export':
                window.chartsController.exportChart(containerId);
                break;
        }
    }
});

// Handle chart type changes
document.addEventListener('change', (e) => {
    if (e.target.classList.contains('chart-type-select')) {
        const container = e.target.closest('.chart-container');
        const containerId = container?.id;
        const newType = e.target.value;
        
        if (!containerId) return;
        
        const chartData = window.chartsController.canvases.get(containerId);
        if (chartData) {
            chartData.type = newType;
            window.chartsController.animateChart(containerId);
        }
    }
});

console.log('📊 Advanced Charts Controller initialized with animation support');