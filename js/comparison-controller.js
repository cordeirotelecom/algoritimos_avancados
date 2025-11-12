/**
 * Advanced Algorithm Comparison Controller
 * Provides comprehensive side-by-side comparison of sorting algorithms
 */

class ComparisonController {
    constructor() {
        this.isComparisonMode = false;
        this.selectedAlgorithms = [];
        this.comparisonResults = {};
        this.comparisonHistory = JSON.parse(localStorage.getItem('comparisonHistory') || '[]');
        this.maxComparisons = 3; // Maximum algorithms to compare at once
        
        // Chart controller for visualizations
        this.chartsController = window.ChartsController ? new ChartsController() : null;
        
        this.initializeComparisonInterface();
        this.bindEvents();
    }

    initializeComparisonInterface() {
        // Create comparison interface if it doesn't exist
        this.createComparisonModal();
        this.createComparisonDashboard();
    }

    createComparisonModal() {
        if (document.getElementById('comparisonModal')) return;

        const modal = document.createElement('div');
        modal.id = 'comparisonModal';
        modal.className = 'modal comparison-modal';
        modal.innerHTML = `
            <div class="modal-content comparison-content">
                <div class="modal-header">
                    <h2>🏆 Comparação de Algoritmos</h2>
                    <button id="closeComparisonModal" class="btn btn-outline">✕</button>
                </div>
                
                <div class="comparison-setup">
                    <div class="algorithm-selector">
                        <h3>Selecione os algoritmos para comparar (máximo ${this.maxComparisons}):</h3>
                        <div class="algorithm-grid">
                            <div class="algorithm-option" data-algorithm="bubble">
                                <div class="algorithm-card-mini">
                                    <h4>Bubble Sort</h4>
                                    <span class="difficulty easy">Fácil</span>
                                    <div class="complexity">O(n²)</div>
                                </div>
                            </div>
                            <div class="algorithm-option" data-algorithm="selection">
                                <div class="algorithm-card-mini">
                                    <h4>Selection Sort</h4>
                                    <span class="difficulty easy">Fácil</span>
                                    <div class="complexity">O(n²)</div>
                                </div>
                            </div>
                            <div class="algorithm-option" data-algorithm="insertion">
                                <div class="algorithm-card-mini">
                                    <h4>Insertion Sort</h4>
                                    <span class="difficulty easy">Fácil</span>
                                    <div class="complexity">O(n²)</div>
                                </div>
                            </div>
                            <div class="algorithm-option" data-algorithm="quick">
                                <div class="algorithm-card-mini">
                                    <h4>Quick Sort</h4>
                                    <span class="difficulty hard">Difícil</span>
                                    <div class="complexity">O(n log n)</div>
                                </div>
                            </div>
                            <div class="algorithm-option" data-algorithm="merge">
                                <div class="algorithm-card-mini">
                                    <h4>Merge Sort</h4>
                                    <span class="difficulty medium">Médio</span>
                                    <div class="complexity">O(n log n)</div>
                                </div>
                            </div>
                            <div class="algorithm-option" data-algorithm="heap">
                                <div class="algorithm-card-mini">
                                    <h4>Heap Sort</h4>
                                    <span class="difficulty hard">Difícil</span>
                                    <div class="complexity">O(n log n)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="comparison-settings">
                        <h3>Configurações da Comparação:</h3>
                        <div class="settings-grid">
                            <div class="setting-item">
                                <label for="comparisonArraySize">Tamanho do Array:</label>
                                <select id="comparisonArraySize">
                                    <option value="10">10 elementos</option>
                                    <option value="20" selected>20 elementos</option>
                                    <option value="50">50 elementos</option>
                                    <option value="100">100 elementos</option>
                                </select>
                            </div>
                            <div class="setting-item">
                                <label for="comparisonArrayType">Tipo de Array:</label>
                                <select id="comparisonArrayType">
                                    <option value="random" selected>Aleatório</option>
                                    <option value="sorted">Quase Ordenado</option>
                                    <option value="reverse">Reverso</option>
                                </select>
                            </div>
                            <div class="setting-item">
                                <label for="comparisonRuns">Número de Execuções:</label>
                                <select id="comparisonRuns">
                                    <option value="1">1 execução</option>
                                    <option value="3" selected>3 execuções (média)</option>
                                    <option value="5">5 execuções (média)</option>
                                    <option value="10">10 execuções (média)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div class="selected-algorithms">
                        <h3>Algoritmos Selecionados:</h3>
                        <div id="selectedAlgorithmsList" class="selected-list">
                            <p class="placeholder">Nenhum algoritmo selecionado</p>
                        </div>
                    </div>
                    
                    <div class="comparison-actions">
                        <button id="startComparison" class="btn btn-primary" disabled>
                            🚀 Iniciar Comparação
                        </button>
                        <button id="clearSelection" class="btn btn-secondary">
                            🗑️ Limpar Seleção
                        </button>
                    </div>
                </div>
                
                <div id="comparisonResults" class="comparison-results" style="display: none;">
                    <div class="results-header">
                        <h3>📊 Resultados da Comparação</h3>
                        <div class="results-actions">
                            <button id="exportComparison" class="btn btn-outline">📋 Exportar</button>
                            <button id="shareComparison" class="btn btn-outline">🔗 Compartilhar</button>
                            <button id="newComparison" class="btn btn-primary">🔄 Nova Comparação</button>
                        </div>
                    </div>
                    
                    <div class="results-summary">
                        <div class="winner-announcement">
                            <div id="winnerCard" class="winner-card"></div>
                        </div>
                    </div>
                    
                    <div class="results-details">
                        <div class="metrics-comparison">
                            <div class="metric-cards" id="metricCards"></div>
                        </div>
                        
                        <div class="charts-section">
                            <div class="chart-container">
                                <h4>📈 Comparações por Algoritmo</h4>
                                <canvas id="comparisonsChart" width="400" height="200"></canvas>
                            </div>
                            <div class="chart-container">
                                <h4>⏱️ Tempo de Execução</h4>
                                <canvas id="timeChart" width="400" height="200"></canvas>
                            </div>
                            <div class="chart-container">
                                <h4>🔄 Número de Trocas</h4>
                                <canvas id="swapsChart" width="400" height="200"></canvas>
                            </div>
                            <div class="chart-container">
                                <h4>⚡ Eficiência Geral</h4>
                                <canvas id="efficiencyChart" width="400" height="200"></canvas>
                            </div>
                        </div>
                        
                        <div class="detailed-stats">
                            <h4>📋 Estatísticas Detalhadas</h4>
                            <div id="detailedStatsTable" class="stats-table"></div>
                        </div>
                        
                        <div class="algorithmic-insights">
                            <h4>🧠 Insights Algorítmicos</h4>
                            <div id="algorithmInsights" class="insights-content"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    createComparisonDashboard() {
        // Create a comparison history dashboard
        if (document.getElementById('comparisonDashboard')) return;

        const dashboard = document.createElement('div');
        dashboard.id = 'comparisonDashboard';
        dashboard.className = 'comparison-dashboard';
        dashboard.style.display = 'none';
        dashboard.innerHTML = `
            <div class="dashboard-header">
                <h2>📊 Dashboard de Comparações</h2>
                <button id="closeDashboard" class="btn btn-outline">✕</button>
            </div>
            
            <div class="dashboard-content">
                <div class="dashboard-stats">
                    <div class="stat-card">
                        <h3>🎯 Total de Comparações</h3>
                        <div class="stat-value" id="totalComparisons">0</div>
                    </div>
                    <div class="stat-card">
                        <h3>🏆 Algoritmo Mais Eficiente</h3>
                        <div class="stat-value" id="mostEfficient">-</div>
                    </div>
                    <div class="stat-card">
                        <h3>📈 Média de Performance</h3>
                        <div class="stat-value" id="avgPerformance">-</div>
                    </div>
                </div>
                
                <div class="history-section">
                    <h3>📚 Histórico de Comparações</h3>
                    <div id="comparisonHistory" class="history-list"></div>
                </div>
                
                <div class="trending-section">
                    <h3>📊 Tendências de Performance</h3>
                    <canvas id="trendsChart" width="600" height="300"></canvas>
                </div>
            </div>
        `;

        document.body.appendChild(dashboard);
    }

    bindEvents() {
        // Modal controls
        document.addEventListener('click', (e) => {
            if (e.target.id === 'compareBtn') {
                this.openComparisonModal();
            } else if (e.target.id === 'closeComparisonModal') {
                this.closeComparisonModal();
            } else if (e.target.id === 'startComparison') {
                this.startComparison();
            } else if (e.target.id === 'clearSelection') {
                this.clearSelection();
            } else if (e.target.id === 'newComparison') {
                this.resetComparison();
            } else if (e.target.id === 'exportComparison') {
                this.exportComparisonResults();
            } else if (e.target.id === 'shareComparison') {
                this.shareComparisonResults();
            } else if (e.target.id === 'closeDashboard') {
                this.closeDashboard();
            }
        });

        // Algorithm selection
        document.addEventListener('click', (e) => {
            if (e.target.closest('.algorithm-option')) {
                const option = e.target.closest('.algorithm-option');
                const algorithm = option.dataset.algorithm;
                this.toggleAlgorithmSelection(algorithm, option);
            }
        });

        // Settings changes
        document.addEventListener('change', (e) => {
            if (e.target.id === 'comparisonArraySize' || 
                e.target.id === 'comparisonArrayType' || 
                e.target.id === 'comparisonRuns') {
                this.updateComparisonSettings();
            }
        });
    }

    openComparisonModal() {
        const modal = document.getElementById('comparisonModal');
        if (modal) {
            modal.style.display = 'flex';
            this.resetComparison();
        }
    }

    closeComparisonModal() {
        const modal = document.getElementById('comparisonModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    toggleAlgorithmSelection(algorithm, element) {
        if (this.selectedAlgorithms.includes(algorithm)) {
            // Remove from selection
            this.selectedAlgorithms = this.selectedAlgorithms.filter(a => a !== algorithm);
            element.classList.remove('selected');
        } else {
            // Add to selection if not at max
            if (this.selectedAlgorithms.length < this.maxComparisons) {
                this.selectedAlgorithms.push(algorithm);
                element.classList.add('selected');
            } else {
                this.showNotification(`Máximo de ${this.maxComparisons} algoritmos permitidos`, 'warning');
                return;
            }
        }

        this.updateSelectedAlgorithmsList();
        this.updateStartButton();
    }

    updateSelectedAlgorithmsList() {
        const listElement = document.getElementById('selectedAlgorithmsList');
        if (!listElement) return;

        if (this.selectedAlgorithms.length === 0) {
            listElement.innerHTML = '<p class="placeholder">Nenhum algoritmo selecionado</p>';
        } else {
            const algorithmsInfo = {
                bubble: { name: 'Bubble Sort', color: '#ff6b6b' },
                selection: { name: 'Selection Sort', color: '#4ecdc4' },
                insertion: { name: 'Insertion Sort', color: '#45b7d1' },
                quick: { name: 'Quick Sort', color: '#96ceb4' },
                merge: { name: 'Merge Sort', color: '#ffeaa7' },
                heap: { name: 'Heap Sort', color: '#dda0dd' }
            };

            listElement.innerHTML = this.selectedAlgorithms.map(alg => {
                const info = algorithmsInfo[alg];
                return `
                    <div class="selected-algorithm" style="border-left: 4px solid ${info.color}">
                        <span class="algorithm-name">${info.name}</span>
                        <button class="remove-algorithm" data-algorithm="${alg}">✕</button>
                    </div>
                `;
            }).join('');

            // Add remove functionality
            listElement.querySelectorAll('.remove-algorithm').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const algorithm = e.target.dataset.algorithm;
                    this.removeAlgorithmFromSelection(algorithm);
                });
            });
        }
    }

    removeAlgorithmFromSelection(algorithm) {
        this.selectedAlgorithms = this.selectedAlgorithms.filter(a => a !== algorithm);
        
        // Update UI
        const option = document.querySelector(`[data-algorithm="${algorithm}"]`);
        if (option) option.classList.remove('selected');
        
        this.updateSelectedAlgorithmsList();
        this.updateStartButton();
    }

    updateStartButton() {
        const startButton = document.getElementById('startComparison');
        if (startButton) {
            startButton.disabled = this.selectedAlgorithms.length < 2;
            if (this.selectedAlgorithms.length < 2) {
                startButton.textContent = '🚀 Selecione pelo menos 2 algoritmos';
            } else {
                startButton.textContent = `🚀 Comparar ${this.selectedAlgorithms.length} Algoritmos`;
            }
        }
    }

    clearSelection() {
        this.selectedAlgorithms = [];
        document.querySelectorAll('.algorithm-option').forEach(option => {
            option.classList.remove('selected');
        });
        this.updateSelectedAlgorithmsList();
        this.updateStartButton();
    }

    async startComparison() {
        if (this.selectedAlgorithms.length < 2) {
            this.showNotification('Selecione pelo menos 2 algoritmos para comparar', 'error');
            return;
        }

        // Show loading state
        const startButton = document.getElementById('startComparison');
        const originalText = startButton.textContent;
        startButton.textContent = '⏳ Executando comparação...';
        startButton.disabled = true;

        try {
            // Get comparison settings
            const settings = this.getComparisonSettings();
            
            // Execute comparison
            const results = await this.executeComparison(settings);
            
            // Store results
            this.comparisonResults = results;
            this.saveComparisonToHistory(results);
            
            // Show results
            this.displayComparisonResults(results);
            
        } catch (error) {
            this.showNotification('Erro durante a comparação: ' + error.message, 'error');
        } finally {
            startButton.textContent = originalText;
            startButton.disabled = false;
        }
    }

    getComparisonSettings() {
        return {
            arraySize: parseInt(document.getElementById('comparisonArraySize')?.value || 20),
            arrayType: document.getElementById('comparisonArrayType')?.value || 'random',
            runs: parseInt(document.getElementById('comparisonRuns')?.value || 3),
            algorithms: [...this.selectedAlgorithms]
        };
    }

    async executeComparison(settings) {
        const results = {
            timestamp: new Date(),
            settings: settings,
            algorithms: {},
            winner: null,
            summary: {}
        };

        // Create test arrays for each type
        const testArrays = this.generateTestArrays(settings);
        
        // Execute each algorithm multiple times
        for (const algorithm of settings.algorithms) {
            const algorithmResults = {
                name: this.getAlgorithmName(algorithm),
                runs: [],
                averages: {}
            };

            for (let run = 0; run < settings.runs; run++) {
                for (const testArray of testArrays) {
                    const runResult = await this.runSingleAlgorithm(algorithm, [...testArray]);
                    algorithmResults.runs.push(runResult);
                }
            }

            // Calculate averages
            algorithmResults.averages = this.calculateAverages(algorithmResults.runs);
            results.algorithms[algorithm] = algorithmResults;
        }

        // Determine winner and calculate summary
        results.winner = this.determineWinner(results.algorithms);
        results.summary = this.calculateSummary(results.algorithms);

        return results;
    }

    generateTestArrays(settings) {
        const arrays = [];
        const size = settings.arraySize;

        switch (settings.arrayType) {
            case 'random':
                arrays.push(this.generateRandomArray(size));
                break;
            case 'sorted':
                arrays.push(this.generateSortedArray(size));
                break;
            case 'reverse':
                arrays.push(this.generateReverseArray(size));
                break;
            default:
                arrays.push(this.generateRandomArray(size));
        }

        return arrays;
    }

    generateRandomArray(size) {
        return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    }

    generateSortedArray(size) {
        const arr = this.generateRandomArray(size);
        arr.sort((a, b) => a - b);
        // Make it "almost sorted" by swapping a few elements
        for (let i = 0; i < Math.floor(size * 0.1); i++) {
            const idx1 = Math.floor(Math.random() * size);
            const idx2 = Math.floor(Math.random() * size);
            [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
        }
        return arr;
    }

    generateReverseArray(size) {
        const arr = this.generateRandomArray(size);
        return arr.sort((a, b) => b - a);
    }

    async runSingleAlgorithm(algorithm, array) {
        const startTime = performance.now();
        
        // Create algorithm instance
        const algorithmInstance = new AlgorithmController();
        
        // Execute algorithm
        let result;
        switch (algorithm) {
            case 'bubble':
                result = algorithmInstance.bubbleSort([...array]);
                break;
            case 'selection':
                result = algorithmInstance.selectionSort([...array]);
                break;
            case 'insertion':
                result = algorithmInstance.insertionSort([...array]);
                break;
            case 'quick':
                result = algorithmInstance.quickSort([...array]);
                break;
            case 'merge':
                result = algorithmInstance.mergeSort([...array]);
                break;
            case 'heap':
                result = algorithmInstance.heapSort([...array]);
                break;
            default:
                throw new Error(`Unknown algorithm: ${algorithm}`);
        }

        const endTime = performance.now();
        const executionTime = endTime - startTime;

        return {
            algorithm: algorithm,
            executionTime: executionTime,
            comparisons: result.comparisons || 0,
            swaps: result.swaps || 0,
            arraySize: array.length,
            efficiency: this.calculateEfficiencyScore(executionTime, result.comparisons, result.swaps)
        };
    }

    calculateEfficiencyScore(time, comparisons, swaps) {
        // Weighted efficiency score (lower is better)
        return (time * 0.3) + (comparisons * 0.4) + (swaps * 0.3);
    }

    calculateAverages(runs) {
        if (runs.length === 0) return {};

        const sums = runs.reduce((acc, run) => {
            acc.executionTime += run.executionTime;
            acc.comparisons += run.comparisons;
            acc.swaps += run.swaps;
            acc.efficiency += run.efficiency;
            return acc;
        }, { executionTime: 0, comparisons: 0, swaps: 0, efficiency: 0 });

        const count = runs.length;
        return {
            executionTime: sums.executionTime / count,
            comparisons: Math.round(sums.comparisons / count),
            swaps: Math.round(sums.swaps / count),
            efficiency: sums.efficiency / count
        };
    }

    determineWinner(algorithms) {
        let bestAlgorithm = null;
        let bestScore = Infinity;

        Object.entries(algorithms).forEach(([key, data]) => {
            if (data.averages.efficiency < bestScore) {
                bestScore = data.averages.efficiency;
                bestAlgorithm = key;
            }
        });

        return {
            algorithm: bestAlgorithm,
            name: this.getAlgorithmName(bestAlgorithm),
            score: bestScore
        };
    }

    calculateSummary(algorithms) {
        const algorithmCount = Object.keys(algorithms).length;
        let totalComparisons = 0;
        let totalSwaps = 0;
        let totalTime = 0;

        Object.values(algorithms).forEach(data => {
            totalComparisons += data.averages.comparisons;
            totalSwaps += data.averages.swaps;
            totalTime += data.averages.executionTime;
        });

        return {
            algorithmCount,
            avgComparisons: Math.round(totalComparisons / algorithmCount),
            avgSwaps: Math.round(totalSwaps / algorithmCount),
            avgTime: totalTime / algorithmCount
        };
    }

    displayComparisonResults(results) {
        // Hide setup, show results
        document.querySelector('.comparison-setup').style.display = 'none';
        document.getElementById('comparisonResults').style.display = 'block';

        // Display winner
        this.displayWinner(results.winner, results.algorithms);

        // Display metric cards
        this.displayMetricCards(results.algorithms);

        // Display charts
        if (this.chartsController) {
            this.displayComparisonCharts(results.algorithms);
        }

        // Display detailed stats
        this.displayDetailedStats(results.algorithms);

        // Display insights
        this.displayAlgorithmicInsights(results);
    }

    displayWinner(winner, algorithms) {
        const winnerCard = document.getElementById('winnerCard');
        if (!winnerCard || !winner) return;

        const winnerData = algorithms[winner.algorithm];
        const colors = {
            bubble: '#ff6b6b', selection: '#4ecdc4', insertion: '#45b7d1',
            quick: '#96ceb4', merge: '#ffeaa7', heap: '#dda0dd'
        };

        winnerCard.innerHTML = `
            <div class="winner-content" style="border-color: ${colors[winner.algorithm]}">
                <div class="winner-icon">🏆</div>
                <h3>Algoritmo Mais Eficiente</h3>
                <h2 style="color: ${colors[winner.algorithm]}">${winner.name}</h2>
                <div class="winner-stats">
                    <div class="winner-stat">
                        <span class="stat-label">Comparações:</span>
                        <span class="stat-value">${winnerData.averages.comparisons}</span>
                    </div>
                    <div class="winner-stat">
                        <span class="stat-label">Tempo:</span>
                        <span class="stat-value">${winnerData.averages.executionTime.toFixed(2)}ms</span>
                    </div>
                    <div class="winner-stat">
                        <span class="stat-label">Trocas:</span>
                        <span class="stat-value">${winnerData.averages.swaps}</span>
                    </div>
                </div>
            </div>
        `;
    }

    displayMetricCards(algorithms) {
        const container = document.getElementById('metricCards');
        if (!container) return;

        const colors = {
            bubble: '#ff6b6b', selection: '#4ecdc4', insertion: '#45b7d1',
            quick: '#96ceb4', merge: '#ffeaa7', heap: '#dda0dd'
        };

        container.innerHTML = Object.entries(algorithms).map(([key, data]) => `
            <div class="metric-card" style="border-left: 4px solid ${colors[key]}">
                <h4 style="color: ${colors[key]}">${data.name}</h4>
                <div class="metric-values">
                    <div class="metric-item">
                        <span class="metric-label">⏱️ Tempo:</span>
                        <span class="metric-value">${data.averages.executionTime.toFixed(2)}ms</span>
                    </div>
                    <div class="metric-item">
                        <span class="metric-label">🔍 Comparações:</span>
                        <span class="metric-value">${data.averages.comparisons}</span>
                    </div>
                    <div class="metric-item">
                        <span class="metric-label">🔄 Trocas:</span>
                        <span class="metric-value">${data.averages.swaps}</span>
                    </div>
                    <div class="metric-item">
                        <span class="metric-label">⚡ Eficiência:</span>
                        <span class="metric-value">${data.averages.efficiency.toFixed(1)}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    displayComparisonCharts(algorithms) {
        // Comparisons chart
        this.renderChart('comparisonsChart', 'bar', 
            Object.keys(algorithms).map(key => algorithms[key].name),
            Object.values(algorithms).map(data => data.averages.comparisons),
            'Comparações'
        );

        // Time chart
        this.renderChart('timeChart', 'bar',
            Object.keys(algorithms).map(key => algorithms[key].name),
            Object.values(algorithms).map(data => data.averages.executionTime),
            'Tempo (ms)'
        );

        // Swaps chart
        this.renderChart('swapsChart', 'bar',
            Object.keys(algorithms).map(key => algorithms[key].name),
            Object.values(algorithms).map(data => data.averages.swaps),
            'Trocas'
        );

        // Efficiency chart (radar/spider chart)
        this.renderEfficiencyChart('efficiencyChart', algorithms);
    }

    renderChart(canvasId, type, labels, data, label) {
        if (!this.chartsController) return;

        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        const chartData = {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                backgroundColor: [
                    '#ff6b6b80', '#4ecdc480', '#45b7d180', 
                    '#96ceb480', '#ffeaa780', '#dda0dd80'
                ],
                borderColor: [
                    '#ff6b6b', '#4ecdc4', '#45b7d1', 
                    '#96ceb4', '#ffeaa7', '#dda0dd'
                ],
                borderWidth: 2
            }]
        };

        this.chartsController.renderChart(canvas, type, chartData);
    }

    renderEfficiencyChart(canvasId, algorithms) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 40;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw efficiency radar chart
        const algorithmKeys = Object.keys(algorithms);
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd'];

        // Normalize efficiency scores for visualization
        const maxEfficiency = Math.max(...Object.values(algorithms).map(data => data.averages.efficiency));
        
        algorithmKeys.forEach((key, index) => {
            const data = algorithms[key];
            const normalizedEfficiency = 1 - (data.averages.efficiency / maxEfficiency); // Invert so higher is better
            const angle = (index / algorithmKeys.length) * 2 * Math.PI - Math.PI / 2;
            const x = centerX + Math.cos(angle) * radius * normalizedEfficiency;
            const y = centerY + Math.sin(angle) * radius * normalizedEfficiency;

            // Draw point
            ctx.fillStyle = colors[index];
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, 2 * Math.PI);
            ctx.fill();

            // Draw line to center
            ctx.strokeStyle = colors[index];
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, y);
            ctx.stroke();

            // Draw label
            const labelX = centerX + Math.cos(angle) * (radius + 20);
            const labelY = centerY + Math.sin(angle) * (radius + 20);
            ctx.fillStyle = '#333';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(data.name, labelX, labelY);
        });

        // Draw circles for reference
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        for (let i = 1; i <= 5; i++) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, (radius * i) / 5, 0, 2 * Math.PI);
            ctx.stroke();
        }
    }

    displayDetailedStats(algorithms) {
        const container = document.getElementById('detailedStatsTable');
        if (!container) return;

        const headers = ['Algoritmo', 'Tempo Médio (ms)', 'Comparações', 'Trocas', 'Eficiência', 'Classificação'];
        
        // Sort algorithms by efficiency
        const sortedAlgorithms = Object.entries(algorithms)
            .sort(([, a], [, b]) => a.averages.efficiency - b.averages.efficiency);

        const tableHTML = `
            <table class="comparison-table">
                <thead>
                    <tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>
                </thead>
                <tbody>
                    ${sortedAlgorithms.map(([key, data], index) => `
                        <tr class="algorithm-row">
                            <td class="algorithm-name">${data.name}</td>
                            <td>${data.averages.executionTime.toFixed(2)}</td>
                            <td>${data.averages.comparisons}</td>
                            <td>${data.averages.swaps}</td>
                            <td>${data.averages.efficiency.toFixed(1)}</td>
                            <td class="ranking">${this.getRankingIcon(index + 1)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;

        container.innerHTML = tableHTML;
    }

    getRankingIcon(position) {
        const icons = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣', '6️⃣'];
        return icons[position - 1] || `${position}º`;
    }

    displayAlgorithmicInsights(results) {
        const container = document.getElementById('algorithmInsights');
        if (!container) return;

        const insights = this.generateInsights(results);
        
        container.innerHTML = `
            <div class="insights-grid">
                ${insights.map(insight => `
                    <div class="insight-card ${insight.type}">
                        <div class="insight-icon">${insight.icon}</div>
                        <h5>${insight.title}</h5>
                        <p>${insight.description}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }

    generateInsights(results) {
        const insights = [];
        const algorithms = results.algorithms;
        const winner = results.winner;

        // Performance insight
        insights.push({
            type: 'performance',
            icon: '⚡',
            title: 'Melhor Performance',
            description: `${winner.name} teve a melhor performance geral com uma pontuação de eficiência de ${winner.score.toFixed(1)}.`
        });

        // Complexity insight
        const complexityInsight = this.getComplexityInsight(algorithms);
        if (complexityInsight) {
            insights.push(complexityInsight);
        }

        // Stability insight
        insights.push({
            type: 'stability',
            icon: '🎯',
            title: 'Estabilidade',
            description: this.getStabilityInsight(algorithms)
        });

        // Best case scenario
        const bestCaseInsight = this.getBestCaseInsight(algorithms);
        if (bestCaseInsight) {
            insights.push(bestCaseInsight);
        }

        return insights;
    }

    getComplexityInsight(algorithms) {
        const quickSortInComparison = algorithms['quick'];
        const mergeSortInComparison = algorithms['merge'];
        
        if (quickSortInComparison && mergeSortInComparison) {
            return {
                type: 'complexity',
                icon: '🧮',
                title: 'Complexidade Algorítmica',
                description: 'Algoritmos O(n log n) como Quick Sort e Merge Sort geralmente superam algoritmos O(n²) em arrays maiores.'
            };
        }
        return null;
    }

    getStabilityInsight(algorithms) {
        const stableAlgorithms = ['insertion', 'merge'];
        const hasStable = Object.keys(algorithms).some(key => stableAlgorithms.includes(key));
        
        if (hasStable) {
            return 'Algoritmos estáveis como Insertion Sort e Merge Sort preservam a ordem relativa de elementos iguais.';
        }
        return 'A estabilidade é importante quando você precisa manter a ordem de elementos com valores iguais.';
    }

    getBestCaseInsight(algorithms) {
        const insertionInComparison = algorithms['insertion'];
        
        if (insertionInComparison) {
            return {
                type: 'bestcase',
                icon: '📈',
                title: 'Melhor Caso',
                description: 'Insertion Sort é especialmente eficiente em arrays já ordenados ou quase ordenados.'
            };
        }
        return null;
    }

    resetComparison() {
        // Reset to setup view
        document.querySelector('.comparison-setup').style.display = 'block';
        document.getElementById('comparisonResults').style.display = 'none';
        
        // Clear any previous selections
        this.clearSelection();
    }

    saveComparisonToHistory(results) {
        const historyEntry = {
            id: Date.now(),
            timestamp: results.timestamp,
            algorithms: results.settings.algorithms,
            winner: results.winner,
            summary: results.summary
        };

        this.comparisonHistory.unshift(historyEntry);
        
        // Keep only last 50 comparisons
        this.comparisonHistory = this.comparisonHistory.slice(0, 50);
        
        localStorage.setItem('comparisonHistory', JSON.stringify(this.comparisonHistory));
    }

    exportComparisonResults() {
        if (!this.comparisonResults) {
            this.showNotification('Nenhum resultado para exportar', 'warning');
            return;
        }

        const exportData = {
            ...this.comparisonResults,
            exportedAt: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `comparison-results-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);

        this.showNotification('Resultados exportados com sucesso!', 'success');
    }

    async shareComparisonResults() {
        if (!this.comparisonResults) {
            this.showNotification('Nenhum resultado para compartilhar', 'warning');
            return;
        }

        const shareText = `🏆 Comparação de Algoritmos de Ordenação
Algoritmos: ${this.comparisonResults.settings.algorithms.join(', ')}
Vencedor: ${this.comparisonResults.winner.name}
Tamanho do array: ${this.comparisonResults.settings.arraySize}
Executado em: ${new Date().toLocaleDateString('pt-BR')}`;

        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'Comparação de Algoritmos de Ordenação',
                    text: shareText
                });
            } else {
                await navigator.clipboard.writeText(shareText);
                this.showNotification('Resultados copiados para a área de transferência!', 'success');
            }
        } catch (error) {
            this.showNotification('Erro ao compartilhar resultados', 'error');
        }
    }

    openDashboard() {
        const dashboard = document.getElementById('comparisonDashboard');
        if (dashboard) {
            this.updateDashboardData();
            dashboard.style.display = 'block';
        }
    }

    closeDashboard() {
        const dashboard = document.getElementById('comparisonDashboard');
        if (dashboard) {
            dashboard.style.display = 'none';
        }
    }

    updateDashboardData() {
        // Update statistics
        const totalComparisons = this.comparisonHistory.length;
        document.getElementById('totalComparisons').textContent = totalComparisons;

        // Most efficient algorithm
        const algorithmCounts = {};
        this.comparisonHistory.forEach(entry => {
            const winner = entry.winner.algorithm;
            algorithmCounts[winner] = (algorithmCounts[winner] || 0) + 1;
        });

        const mostEfficient = Object.entries(algorithmCounts)
            .sort(([, a], [, b]) => b - a)[0];
        
        document.getElementById('mostEfficient').textContent = 
            mostEfficient ? this.getAlgorithmName(mostEfficient[0]) : '-';

        // Average performance calculation would go here
        document.getElementById('avgPerformance').textContent = 
            totalComparisons > 0 ? 'Bom' : '-';

        // Update history list
        this.updateHistoryList();
    }

    updateHistoryList() {
        const container = document.getElementById('comparisonHistory');
        if (!container) return;

        if (this.comparisonHistory.length === 0) {
            container.innerHTML = '<p class="placeholder">Nenhuma comparação realizada ainda</p>';
            return;
        }

        container.innerHTML = this.comparisonHistory.slice(0, 10).map(entry => `
            <div class="history-item">
                <div class="history-date">${new Date(entry.timestamp).toLocaleDateString('pt-BR')}</div>
                <div class="history-algorithms">${entry.algorithms.map(a => this.getAlgorithmName(a)).join(' vs ')}</div>
                <div class="history-winner">🏆 ${entry.winner.name}</div>
            </div>
        `).join('');
    }

    getAlgorithmName(algorithm) {
        const names = {
            bubble: 'Bubble Sort',
            selection: 'Selection Sort',
            insertion: 'Insertion Sort',
            quick: 'Quick Sort',
            merge: 'Merge Sort',
            heap: 'Heap Sort'
        };
        return names[algorithm] || algorithm;
    }

    showNotification(message, type = 'info') {
        // Use existing notification system if available
        if (window.gamificationController && window.gamificationController.showNotification) {
            window.gamificationController.showNotification(message, type);
        } else {
            alert(message);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.comparisonController = new ComparisonController();
});