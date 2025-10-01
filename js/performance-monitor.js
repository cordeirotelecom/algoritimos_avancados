// ===== PERFORMANCE MONITOR =====

class PerformanceMonitor {
    constructor() {
        this.metrics = {
            frameRate: [],
            memoryUsage: [],
            sortingTimes: [],
            animationFrames: 0,
            startTime: null,
            lastFrameTime: 0
        };
        
        this.isMonitoring = false;
        this.maxSamples = 100;
        this.updateInterval = 1000; // 1 segundo
        
        this.initializeMonitoring();
    }
    
    initializeMonitoring() {
        // Verificar se a API de Performance está disponível
        if (!window.performance) {
            console.warn('⚠️ Performance API não disponível');
            return;
        }
        
        console.log('📊 Performance Monitor inicializado');
        
        // Configurar observer para Long Tasks
        if ('PerformanceObserver' in window) {
            try {
                const observer = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach(entry => {
                        if (entry.duration > 50) { // Tarefas acima de 50ms
                            console.warn(`⚠️ Long Task detectada: ${entry.duration.toFixed(2)}ms`);
                        }
                    });
                });
                
                observer.observe({ entryTypes: ['longtask'] });
            } catch (error) {
                console.warn('Long Task API não suportada:', error.message);
            }
        }
    }
    
    startMonitoring() {
        if (this.isMonitoring) return;
        
        this.isMonitoring = true;
        this.metrics.startTime = performance.now();
        this.metrics.animationFrames = 0;
        
        console.log('📊 Monitoramento de performance iniciado');
        
        // Iniciar loop de coleta de métricas
        this.monitoringLoop();
        
        // Monitorar frame rate
        this.measureFrameRate();
    }
    
    stopMonitoring() {
        this.isMonitoring = false;
        console.log('📊 Monitoramento de performance interrompido');
        
        return this.generateReport();
    }
    
    monitoringLoop() {
        if (!this.isMonitoring) return;
        
        // Coletar métricas de memória (se disponível)
        if (performance.memory) {
            const memoryInfo = {
                used: performance.memory.usedJSHeapSize,
                total: performance.memory.totalJSHeapSize,
                limit: performance.memory.jsHeapSizeLimit,
                timestamp: performance.now()
            };
            
            this.metrics.memoryUsage.push(memoryInfo);
            
            // Manter apenas os últimos N samples
            if (this.metrics.memoryUsage.length > this.maxSamples) {
                this.metrics.memoryUsage.shift();
            }
        }
        
        // Continuar monitoramento
        setTimeout(() => this.monitoringLoop(), this.updateInterval);
    }
    
    measureFrameRate() {
        if (!this.isMonitoring) return;
        
        const now = performance.now();
        
        if (this.metrics.lastFrameTime > 0) {
            const delta = now - this.metrics.lastFrameTime;
            const fps = 1000 / delta;
            
            this.metrics.frameRate.push({
                fps: fps,
                timestamp: now
            });
            
            // Manter apenas os últimos N samples
            if (this.metrics.frameRate.length > this.maxSamples) {
                this.metrics.frameRate.shift();
            }
        }
        
        this.metrics.lastFrameTime = now;
        this.metrics.animationFrames++;
        
        // Continuar medição
        requestAnimationFrame(() => this.measureFrameRate());
    }
    
    recordSortingTime(algorithm, arraySize, timeMs) {
        const record = {
            algorithm,
            arraySize,
            duration: timeMs,
            timestamp: performance.now(),
            fps: this.getAverageFPS(),
            memoryUsed: this.getCurrentMemoryUsage()
        };
        
        this.metrics.sortingTimes.push(record);
        
        // Manter apenas os últimos N samples
        if (this.metrics.sortingTimes.length > this.maxSamples) {
            this.metrics.sortingTimes.shift();
        }
        
        console.log(`📊 ${algorithm}: ${arraySize} elementos em ${timeMs.toFixed(2)}ms`);
    }
    
    getAverageFPS() {
        if (this.metrics.frameRate.length === 0) return null;
        
        const recent = this.metrics.frameRate.slice(-10); // Últimos 10 frames
        const sum = recent.reduce((acc, frame) => acc + frame.fps, 0);
        return sum / recent.length;
    }
    
    getCurrentMemoryUsage() {
        if (!performance.memory) return null;
        
        return {
            used: performance.memory.usedJSHeapSize,
            total: performance.memory.totalJSHeapSize,
            percentage: (performance.memory.usedJSHeapSize / performance.memory.totalJSHeapSize) * 100
        };
    }
    
    generateReport() {
        const totalTime = performance.now() - this.metrics.startTime;
        const avgFPS = this.getAverageFPS();
        const memoryInfo = this.getCurrentMemoryUsage();
        
        const report = {
            summary: {
                totalTime: totalTime,
                averageFPS: avgFPS,
                totalFrames: this.metrics.animationFrames,
                memoryUsage: memoryInfo
            },
            
            performance: {
                frameRate: {
                    min: Math.min(...this.metrics.frameRate.map(f => f.fps)),
                    max: Math.max(...this.metrics.frameRate.map(f => f.fps)),
                    average: avgFPS,
                    samples: this.metrics.frameRate.length
                },
                
                sortingTimes: this.metrics.sortingTimes.map(record => ({
                    algorithm: record.algorithm,
                    arraySize: record.arraySize,
                    duration: record.duration,
                    efficiency: this.calculateEfficiency(record.algorithm, record.arraySize, record.duration)
                }))
            },
            
            recommendations: this.generateRecommendations(avgFPS, memoryInfo)
        };
        
        console.log('📊 Relatório de Performance:', report);
        return report;
    }
    
    calculateEfficiency(algorithm, arraySize, duration) {
        // Complexidades teóricas aproximadas (em operações)
        const complexities = {
            'bubble': arraySize * arraySize,
            'selection': arraySize * arraySize,
            'insertion': arraySize * arraySize,
            'quick': arraySize * Math.log2(arraySize),
            'merge': arraySize * Math.log2(arraySize),
            'heap': arraySize * Math.log2(arraySize),
            'radix': arraySize
        };
        
        const expectedOps = complexities[algorithm] || arraySize * arraySize;
        const opsPerMs = expectedOps / duration;
        
        return {
            operationsPerMs: opsPerMs,
            relativeEfficiency: this.getRelativeEfficiency(algorithm, opsPerMs)
        };
    }
    
    getRelativeEfficiency(algorithm, opsPerMs) {
        // Benchmarks base (operações por ms para arrays pequenos)
        const baselines = {
            'bubble': 1000,
            'selection': 1200,
            'insertion': 1500,
            'quick': 5000,
            'merge': 4000,
            'heap': 3500,
            'radix': 8000
        };
        
        const baseline = baselines[algorithm] || 1000;
        return (opsPerMs / baseline) * 100; // Porcentagem da performance esperada
    }
    
    generateRecommendations(avgFPS, memoryInfo) {
        const recommendations = [];
        
        if (avgFPS && avgFPS < 30) {
            recommendations.push({
                type: 'performance',
                severity: 'high',
                message: 'Frame rate baixo detectado. Considere reduzir o tamanho do array ou a velocidade de animação.',
                suggestion: 'Otimizar visualização ou usar menos elementos'
            });
        }
        
        if (memoryInfo && memoryInfo.percentage > 80) {
            recommendations.push({
                type: 'memory',
                severity: 'medium',
                message: 'Uso de memória elevado. Pode impactar a performance.',
                suggestion: 'Limpar dados não utilizados ou reduzir complexidade'
            });
        }
        
        if (this.metrics.sortingTimes.length > 0) {
            const slowSorts = this.metrics.sortingTimes.filter(record => {
                const efficiency = this.calculateEfficiency(record.algorithm, record.arraySize, record.duration);
                return efficiency.relativeEfficiency < 50;
            });
            
            if (slowSorts.length > 0) {
                recommendations.push({
                    type: 'algorithm',
                    severity: 'low',
                    message: 'Alguns algoritmos estão executando abaixo da performance esperada.',
                    suggestion: 'Verificar implementação ou otimizar condições de teste'
                });
            }
        }
        
        return recommendations;
    }
    
    // Método para exportar dados de performance
    exportData() {
        return {
            timestamp: new Date().toISOString(),
            metrics: this.metrics,
            report: this.generateReport(),
            browser: {
                userAgent: navigator.userAgent,
                hardwareConcurrency: navigator.hardwareConcurrency,
                deviceMemory: navigator.deviceMemory || 'unknown'
            }
        };
    }
    
    // Método para comparar performance entre sessões
    compareWithBaseline(baselineData) {
        const currentReport = this.generateReport();
        
        if (!baselineData || !baselineData.report) {
            return { error: 'Dados de baseline inválidos' };
        }
        
        const comparison = {
            fps: {
                current: currentReport.summary.averageFPS,
                baseline: baselineData.report.summary.averageFPS,
                improvement: ((currentReport.summary.averageFPS - baselineData.report.summary.averageFPS) / baselineData.report.summary.averageFPS) * 100
            },
            
            memory: {
                current: currentReport.summary.memoryUsage?.percentage || 0,
                baseline: baselineData.report.summary.memoryUsage?.percentage || 0,
                change: (currentReport.summary.memoryUsage?.percentage || 0) - (baselineData.report.summary.memoryUsage?.percentage || 0)
            },
            
            algorithms: this.compareAlgorithmPerformance(currentReport.performance.sortingTimes, baselineData.report.performance.sortingTimes)
        };
        
        return comparison;
    }
    
    compareAlgorithmPerformance(current, baseline) {
        const comparison = {};
        
        current.forEach(currentRecord => {
            const baselineRecord = baseline.find(b => 
                b.algorithm === currentRecord.algorithm && 
                b.arraySize === currentRecord.arraySize
            );
            
            if (baselineRecord) {
                const key = `${currentRecord.algorithm}_${currentRecord.arraySize}`;
                comparison[key] = {
                    algorithm: currentRecord.algorithm,
                    arraySize: currentRecord.arraySize,
                    currentTime: currentRecord.duration,
                    baselineTime: baselineRecord.duration,
                    improvement: ((baselineRecord.duration - currentRecord.duration) / baselineRecord.duration) * 100
                };
            }
        });
        
        return comparison;
    }
}

// Inicializar monitor de performance global
window.performanceMonitor = new PerformanceMonitor();

// Adicionar atalho de teclado para relatório de performance
document.addEventListener('keydown', (e) => {
    // Ctrl+Shift+P para gerar relatório
    if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        const report = window.performanceMonitor.generateReport();
        
        // Mostrar resumo no console
        console.table({
            'FPS Médio': report.summary.averageFPS?.toFixed(1) || 'N/A',
            'Frames Totais': report.summary.totalFrames,
            'Tempo Total': `${(report.summary.totalTime / 1000).toFixed(2)}s`,
            'Memória Usada': report.summary.memoryUsage ? `${(report.summary.memoryUsage.used / 1024 / 1024).toFixed(1)}MB` : 'N/A'
        });
        
        // Mostrar notificação se disponível
        if (window.gamificationController?.showNotification) {
            window.gamificationController.showNotification(
                `📊 Relatório de Performance gerado! Verifique o console.`,
                'info',
                3000
            );
        }
    }
});

console.log('📊 Performance Monitor inicializado. Use Ctrl+Shift+P para gerar relatório.');