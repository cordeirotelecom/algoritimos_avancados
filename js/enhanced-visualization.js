// ===== ENHANCED VISUALIZATION EXTENSIONS =====

/**
 * Extensões para o sistema de visualização existente
 * Adiciona métodos ao VisualizationController sem quebrar compatibilidade
 */

// Extend existing VisualizationController with enhanced features
if (typeof VisualizationController !== 'undefined') {
    // Add enhanced mode to existing visualization controller
    VisualizationController.prototype.initializeEnhancedMode = function() {
        this.enhancedMode = {
            enabled: true,
            particlesEnabled: true,
            realTimeStats: true,
            colorScheme: 'default',
            settings: {
                particlesEnabled: true,
                smoothAnimations: true,
                visualFeedback: true,
                realTimeStats: true
            }
        };
        
        this.setupEnhancedStats();
        return this.enhancedMode;
    };

    VisualizationController.prototype.toggleEnhancedMode = function() {
        if (!this.enhancedMode) {
            this.initializeEnhancedMode();
        }
        
        this.enhancedMode.enabled = !this.enhancedMode.enabled;
        
        if (this.enhancedMode.enabled) {
            this.enableEnhancedVisualization();
        } else {
            this.disableEnhancedVisualization();
        }
        
        return this.enhancedMode.enabled;
    };

    VisualizationController.prototype.enableEnhancedVisualization = function() {
        // Add enhanced visual classes
        const arrayBars = document.getElementById('arrayBars');
        if (arrayBars) {
            arrayBars.classList.add('enhanced-mode');
        }
        
        // Show enhanced stats if enabled
        const enhancedStats = document.getElementById('enhancedStats');
        if (enhancedStats && this.enhancedMode.settings.realTimeStats) {
            enhancedStats.style.display = 'block';
        }
    };

    VisualizationController.prototype.disableEnhancedVisualization = function() {
        // Remove enhanced visual classes
        const arrayBars = document.getElementById('arrayBars');
        if (arrayBars) {
            arrayBars.classList.remove('enhanced-mode');
        }
        
        // Hide enhanced stats
        const enhancedStats = document.getElementById('enhancedStats');
        if (enhancedStats) {
            enhancedStats.style.display = 'none';
        }
    };

    VisualizationController.prototype.setColorScheme = function(scheme) {
        if (!this.enhancedMode) {
            this.initializeEnhancedMode();
        }
        
        this.enhancedMode.colorScheme = scheme;
        
        // Apply color scheme to body
        document.body.className = document.body.className.replace(/color-scheme-\w+/g, '');
        document.body.classList.add(`color-scheme-${scheme}`);
        
        // Update visualization
        this.updateVisualization();
    };

    VisualizationController.prototype.updateSettings = function(newSettings) {
        if (!this.enhancedMode) {
            this.initializeEnhancedMode();
        }
        
        Object.assign(this.enhancedMode.settings, newSettings);
        
        // Apply settings
        if (newSettings.hasOwnProperty('particlesEnabled')) {
            this.toggleParticles(newSettings.particlesEnabled);
        }
        
        if (newSettings.hasOwnProperty('realTimeStats')) {
            this.toggleRealTimeStats(newSettings.realTimeStats);
        }
    };

    VisualizationController.prototype.toggleParticles = function(enabled) {
        if (!this.enhancedMode) {
            this.initializeEnhancedMode();
        }
        
        this.enhancedMode.settings.particlesEnabled = enabled;
        
        // Add/remove particle effects class
        const body = document.body;
        if (enabled) {
            body.classList.add('particles-enabled');
        } else {
            body.classList.remove('particles-enabled');
        }
    };

    VisualizationController.prototype.toggleRealTimeStats = function(enabled) {
        if (!this.enhancedMode) {
            this.initializeEnhancedMode();
        }
        
        this.enhancedMode.settings.realTimeStats = enabled;
        
        const enhancedStats = document.getElementById('enhancedStats');
        if (enhancedStats) {
            enhancedStats.style.display = enabled ? 'block' : 'none';
        }
    };

    VisualizationController.prototype.setupEnhancedStats = function() {
        // Create enhanced stats container if it doesn't exist
        if (!document.getElementById('enhancedStats')) {
            const statsContainer = document.createElement('div');
            statsContainer.id = 'enhancedStats';
            statsContainer.className = 'enhanced-stats-container';
            
            statsContainer.innerHTML = `
                <h3>📊 Estatísticas em Tempo Real</h3>
                <div class="stats-section">
                    <div class="stat-item">
                        <div class="stat-icon">⚡</div>
                        <div class="stat-content">
                            <div class="stat-label">Velocidade</div>
                            <div class="stat-value" id="realtimeSpeed">Normal</div>
                        </div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-icon">🔄</div>
                        <div class="stat-content">
                            <div class="stat-label">Comparações</div>
                            <div class="stat-value" id="realtimeComparisons">0</div>
                            <div class="stat-rate" id="realtimeComparisonRate">0/s</div>
                        </div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-icon">🔀</div>
                        <div class="stat-content">
                            <div class="stat-label">Trocas</div>
                            <div class="stat-value" id="realtimeSwaps">0</div>
                            <div class="stat-rate" id="realtimeSwapRate">0/s</div>
                        </div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-icon">⏱️</div>
                        <div class="stat-content">
                            <div class="stat-label">Tempo</div>
                            <div class="stat-value" id="realtimeTime">0s</div>
                        </div>
                    </div>
                </div>
                <div class="performance-graph">
                    <canvas id="performanceCanvas" width="300" height="60"></canvas>
                </div>
            `;
            
            // Insert after visualization area
            const visualizationArea = document.getElementById('visualizationArea');
            if (visualizationArea) {
                visualizationArea.appendChild(statsContainer);
            }
        }
    };

    // Override updateVisualization to add enhanced features
    const originalUpdateVisualization = VisualizationController.prototype.updateVisualization;
    VisualizationController.prototype.updateVisualization = function() {
        // Call original method
        originalUpdateVisualization.call(this);
        
        // Add enhanced features if enabled
        if (this.enhancedMode && this.enhancedMode.enabled) {
            this.addEnhancedVisualEffects();
        }
    };

    VisualizationController.prototype.addEnhancedVisualEffects = function() {
        const elements = document.querySelectorAll('.array-element, .array-bar');
        
        elements.forEach((element, index) => {
            // Add enhanced classes
            element.classList.add('enhanced-element');
            
            // Add hover effects
            element.addEventListener('mouseenter', (e) => {
                this.showElementTooltip(e.target, index);
            });
            
            element.addEventListener('mouseleave', (e) => {
                this.hideElementTooltip();
            });
        });
    };

    VisualizationController.prototype.showElementTooltip = function(element, index) {
        // Remove existing tooltip
        this.hideElementTooltip();
        
        const tooltip = document.createElement('div');
        tooltip.className = 'element-tooltip';
        tooltip.innerHTML = `
            <div class="tooltip-content">
                <div class="tooltip-value">Valor: ${element.textContent || element.getAttribute('data-value')}</div>
                <div class="tooltip-index">Índice: ${index}</div>
                <div class="tooltip-state">Estado: ${this.getElementState(element)}</div>
            </div>
        `;
        
        document.body.appendChild(tooltip);
        
        // Position tooltip
        const rect = element.getBoundingClientRect();
        tooltip.style.position = 'fixed';
        tooltip.style.left = `${rect.left + rect.width / 2}px`;
        tooltip.style.top = `${rect.top - 10}px`;
        tooltip.style.transform = 'translate(-50%, -100%)';
        tooltip.style.zIndex = '1000';
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translate(-50%, -100%) translateY(0)';
    };

    VisualizationController.prototype.hideElementTooltip = function() {
        const existing = document.querySelector('.element-tooltip');
        if (existing) {
            existing.remove();
        }
    };

    VisualizationController.prototype.getElementState = function(element) {
        if (element.classList.contains('comparing')) return 'Comparando';
        if (element.classList.contains('swapping')) return 'Trocando';
        if (element.classList.contains('sorted')) return 'Ordenado';
        if (element.classList.contains('current')) return 'Atual';
        if (element.classList.contains('minimum')) return 'Mínimo';
        if (element.classList.contains('pivot')) return 'Pivô';
        return 'Normal';
    };

    // Enhanced step animation with real-time stats update
    const originalAnimateStep = VisualizationController.prototype.animateStep;
    VisualizationController.prototype.animateStep = function(step) {
        // Update real-time stats
        this.updateRealTimeStats();
        
        // Call original method
        if (originalAnimateStep) {
            return originalAnimateStep.call(this, step);
        }
    };

    VisualizationController.prototype.updateRealTimeStats = function() {
        if (!this.enhancedMode || !this.enhancedMode.settings.realTimeStats) return;
        
        // Update speed
        const speedElement = document.getElementById('realtimeSpeed');
        if (speedElement) {
            const speedMap = { 1: 'Lenta', 2: 'Normal', 3: 'Rápida' };
            const currentSpeed = document.getElementById('speedSlider')?.value || 2;
            speedElement.textContent = speedMap[currentSpeed] || 'Normal';
        }
        
        // Update comparisons
        const comparisonsElement = document.getElementById('realtimeComparisons');
        if (comparisonsElement) {
            comparisonsElement.textContent = this.comparisons || 0;
        }
        
        // Update swaps
        const swapsElement = document.getElementById('realtimeSwaps');
        if (swapsElement) {
            swapsElement.textContent = this.swaps || 0;
        }
        
        // Update time
        const timeElement = document.getElementById('realtimeTime');
        if (timeElement && this.startTime) {
            const elapsed = (Date.now() - this.startTime) / 1000;
            timeElement.textContent = `${elapsed.toFixed(1)}s`;
        }
        
        // Update performance graph
        this.updatePerformanceGraph();
    };

    VisualizationController.prototype.updatePerformanceGraph = function() {
        const canvas = document.getElementById('performanceCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Simple performance visualization
        const comparisons = this.comparisons || 0;
        const maxOperations = this.array ? this.array.length * this.array.length : 100;
        
        // Draw background
        ctx.fillStyle = '#f1f5f9';
        ctx.fillRect(0, 0, width, height);
        
        // Draw progress bar
        const progress = Math.min(comparisons / maxOperations, 1);
        const barWidth = width * progress;
        
        // Gradient for progress bar
        const gradient = ctx.createLinearGradient(0, 0, barWidth, 0);
        gradient.addColorStop(0, '#10b981');
        gradient.addColorStop(1, '#059669');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, height - 10, barWidth, 10);
        
        // Draw border
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 1;
        ctx.strokeRect(0, 0, width, height);
    };

    console.log('🎨 Enhanced Visualization extensions loaded');
} else {
    console.warn('VisualizationController not found - Enhanced Visualization extensions not applied');
}