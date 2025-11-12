/**
 * Advanced Analytics Dashboard Controller
 * Provides comprehensive analytics, metrics, and insights for the learning platform
 */

class AnalyticsDashboardController {
    constructor() {
        this.analytics = {
            sessions: [],
            algorithmStats: {},
            learningMetrics: {},
            performanceData: {},
            userBehavior: {},
            comparisons: [],
            achievements: []
        };
        
        this.currentSession = this.createNewSession();
        this.isTrackingEnabled = true;
        this.chartControllers = {};
        
        this.loadAnalytics();
        this.initializeDashboard();
        this.startSessionTracking();
        this.bindEvents();
    }

    initializeDashboard() {
        this.createAnalyticsDashboard();
        this.createRealTimeMetrics();
        this.createPerformanceCharts();
        this.createLearningInsights();
    }

    createAnalyticsDashboard() {
        if (document.getElementById('analyticsDashboard')) return;

        const dashboard = document.createElement('div');
        dashboard.id = 'analyticsDashboard';
        dashboard.className = 'analytics-dashboard';
        dashboard.style.display = 'none';
        dashboard.innerHTML = `
            <div class="analytics-header">
                <h2>📊 Dashboard de Analytics</h2>
                <div class="dashboard-controls">
                    <button id="refreshAnalytics" class="btn btn-outline">🔄 Atualizar</button>
                    <button id="exportAnalytics" class="btn btn-outline">📤 Exportar</button>
                    <button id="resetAnalytics" class="btn btn-secondary">🗑️ Limpar Dados</button>
                    <button id="closeDashboard" class="btn btn-outline">✕</button>
                </div>
            </div>
            
            <div class="analytics-content">
                <!-- Real-time Metrics -->
                <div class="metrics-overview">
                    <h3>📈 Métricas em Tempo Real</h3>
                    <div class="metrics-grid">
                        <div class="metric-card primary">
                            <div class="metric-icon">🎯</div>
                            <div class="metric-info">
                                <h4>Algoritmos Aprendidos</h4>
                                <div class="metric-value" id="algorithmsLearned">0</div>
                                <div class="metric-change" id="algorithmsChange">+0 hoje</div>
                            </div>
                        </div>
                        
                        <div class="metric-card success">
                            <div class="metric-icon">⏱️</div>
                            <div class="metric-info">
                                <h4>Tempo Total de Estudo</h4>
                                <div class="metric-value" id="totalStudyTime">0min</div>
                                <div class="metric-change" id="timeChange">+0min hoje</div>
                            </div>
                        </div>
                        
                        <div class="metric-card info">
                            <div class="metric-icon">🔄</div>
                            <div class="metric-info">
                                <h4>Execuções Totais</h4>
                                <div class="metric-value" id="totalExecutions">0</div>
                                <div class="metric-change" id="executionsChange">+0 hoje</div>
                            </div>
                        </div>
                        
                        <div class="metric-card warning">
                            <div class="metric-icon">⚖️</div>
                            <div class="metric-info">
                                <h4>Comparações Feitas</h4>
                                <div class="metric-value" id="totalComparisons">0</div>
                                <div class="metric-change" id="comparisonsChange">+0 hoje</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Performance Charts -->
                <div class="performance-charts">
                    <h3>📊 Análise de Performance</h3>
                    <div class="charts-grid">
                        <div class="chart-container">
                            <h4>📈 Progresso de Aprendizado</h4>
                            <canvas id="learningProgressChart" width="400" height="200"></canvas>
                        </div>
                        
                        <div class="chart-container">
                            <h4>⏱️ Tempo por Algoritmo</h4>
                            <canvas id="timePerAlgorithmChart" width="400" height="200"></canvas>
                        </div>
                        
                        <div class="chart-container">
                            <h4>🔥 Atividade Semanal</h4>
                            <canvas id="weeklyActivityChart" width="400" height="200"></canvas>
                        </div>
                        
                        <div class="chart-container">
                            <h4>🎯 Eficiência de Aprendizado</h4>
                            <canvas id="learningEfficiencyChart" width="400" height="200"></canvas>
                        </div>
                    </div>
                </div>
                
                <!-- Detailed Analytics -->
                <div class="detailed-analytics">
                    <h3>🔍 Análise Detalhada</h3>
                    <div class="analytics-tabs">
                        <button class="analytics-tab-btn active" data-tab="algorithms">🎓 Algoritmos</button>
                        <button class="analytics-tab-btn" data-tab="sessions">📅 Sessões</button>
                        <button class="analytics-tab-btn" data-tab="behavior">👤 Comportamento</button>
                        <button class="analytics-tab-btn" data-tab="insights">💡 Insights</button>
                    </div>
                    
                    <div class="analytics-tab-content">
                        <div id="algorithms-analytics" class="analytics-tab-pane active">
                            <div class="algorithm-performance-table">
                                <h4>📊 Performance por Algoritmo</h4>
                                <div id="algorithmPerformanceTable"></div>
                            </div>
                        </div>
                        
                        <div id="sessions-analytics" class="analytics-tab-pane">
                            <div class="session-history">
                                <h4>📅 Histórico de Sessões</h4>
                                <div id="sessionHistoryTable"></div>
                            </div>
                        </div>
                        
                        <div id="behavior-analytics" class="analytics-tab-pane">
                            <div class="behavior-patterns">
                                <h4>👤 Padrões de Comportamento</h4>
                                <div id="behaviorAnalysis"></div>
                            </div>
                        </div>
                        
                        <div id="insights-analytics" class="analytics-tab-pane">
                            <div class="learning-insights">
                                <h4>💡 Insights Personalizados</h4>
                                <div id="personalizedInsights"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Achievements and Goals -->
                <div class="achievements-goals">
                    <h3>🏆 Conquistas e Metas</h3>
                    <div class="achievements-grid">
                        <div class="achievement-category">
                            <h4>🎯 Metas de Aprendizado</h4>
                            <div id="learningGoals" class="goals-list"></div>
                        </div>
                        
                        <div class="achievement-category">
                            <h4>🏆 Conquistas Desbloqueadas</h4>
                            <div id="unlockedAchievements" class="achievements-list"></div>
                        </div>
                        
                        <div class="achievement-category">
                            <h4>🔒 Próximas Conquistas</h4>
                            <div id="nextAchievements" class="achievements-list"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(dashboard);
    }

    createRealTimeMetrics() {
        // Create floating metrics widget for real-time tracking
        const widget = document.createElement('div');
        widget.id = 'realTimeMetrics';
        widget.className = 'real-time-metrics-widget';
        widget.innerHTML = `
            <div class="widget-header">
                <span>📊 Métricas</span>
                <button id="toggleMetrics" class="widget-toggle">−</button>
            </div>
            <div class="widget-content">
                <div class="mini-metric">
                    <span class="label">Sessão:</span>
                    <span id="sessionTime" class="value">00:00</span>
                </div>
                <div class="mini-metric">
                    <span class="label">Algoritmo:</span>
                    <span id="currentAlgorithm" class="value">-</span>
                </div>
                <div class="mini-metric">
                    <span class="label">Execuções:</span>
                    <span id="sessionExecutions" class="value">0</span>
                </div>
            </div>
        `;
        
        document.body.appendChild(widget);
    }

    createPerformanceCharts() {
        // Initialize chart controllers if available
        if (window.ChartsController) {
            this.chartControllers.learningProgress = new ChartsController();
            this.chartControllers.timePerAlgorithm = new ChartsController();
            this.chartControllers.weeklyActivity = new ChartsController();
            this.chartControllers.learningEfficiency = new ChartsController();
        }
    }

    createLearningInsights() {
        // AI-powered insights system
        this.insightsEngine = {
            patterns: [],
            recommendations: [],
            trends: []
        };
    }

    bindEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.id === 'statsBtn') {
                this.openDashboard();
            } else if (e.target.id === 'closeDashboard') {
                this.closeDashboard();
            } else if (e.target.id === 'refreshAnalytics') {
                this.refreshDashboard();
            } else if (e.target.id === 'exportAnalytics') {
                this.exportAnalytics();
            } else if (e.target.id === 'resetAnalytics') {
                this.resetAnalytics();
            } else if (e.target.id === 'toggleMetrics') {
                this.toggleMetricsWidget();
            } else if (e.target.classList.contains('analytics-tab-btn')) {
                this.switchAnalyticsTab(e.target.dataset.tab);
            }
        });

        // Track user interactions
        this.setupInteractionTracking();
    }

    setupInteractionTracking() {
        // Track algorithm selections
        document.addEventListener('click', (e) => {
            if (e.target.closest('.algorithm-card')) {
                const algorithm = e.target.closest('.algorithm-card').dataset.algorithm;
                this.trackAlgorithmSelection(algorithm);
            }
        });

        // Track sorting executions
        document.addEventListener('click', (e) => {
            if (e.target.id === 'startSort') {
                this.trackSortingExecution();
            }
        });

        // Track educational tab switches
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('edu-tab-btn')) {
                this.trackEducationalTabView(e.target.dataset.tab);
            }
        });

        // Track comparison usage
        document.addEventListener('click', (e) => {
            if (e.target.id === 'startComparison') {
                this.trackComparisonUsage();
            }
        });
    }

    // Session Management
    createNewSession() {
        return {
            id: Date.now(),
            startTime: new Date(),
            endTime: null,
            duration: 0,
            algorithmsUsed: [],
            executionsCount: 0,
            tabsViewed: [],
            comparisons: 0,
            interactions: []
        };
    }

    startSessionTracking() {
        // Update session time every second
        this.sessionTimer = setInterval(() => {
            this.updateSessionTime();
            this.updateRealTimeMetrics();
        }, 1000);

        // Save session data every 30 seconds
        this.saveTimer = setInterval(() => {
            this.saveAnalytics();
        }, 30000);
    }

    updateSessionTime() {
        if (this.currentSession) {
            this.currentSession.duration = Date.now() - this.currentSession.startTime.getTime();
            
            const sessionTimeElement = document.getElementById('sessionTime');
            if (sessionTimeElement) {
                const minutes = Math.floor(this.currentSession.duration / 60000);
                const seconds = Math.floor((this.currentSession.duration % 60000) / 1000);
                sessionTimeElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
        }
    }

    // Tracking Methods
    trackAlgorithmSelection(algorithm) {
        if (!this.isTrackingEnabled) return;

        this.currentSession.algorithmsUsed.push({
            algorithm: algorithm,
            timestamp: new Date(),
            duration: 0
        });

        const currentAlgElement = document.getElementById('currentAlgorithm');
        if (currentAlgElement) {
            currentAlgElement.textContent = this.getAlgorithmName(algorithm);
        }

        // Update algorithm stats
        if (!this.analytics.algorithmStats[algorithm]) {
            this.analytics.algorithmStats[algorithm] = {
                name: this.getAlgorithmName(algorithm),
                timesUsed: 0,
                totalTime: 0,
                executions: 0,
                averageTime: 0,
                lastUsed: null
            };
        }

        this.analytics.algorithmStats[algorithm].timesUsed++;
        this.analytics.algorithmStats[algorithm].lastUsed = new Date();
    }

    trackSortingExecution() {
        if (!this.isTrackingEnabled) return;

        this.currentSession.executionsCount++;
        
        const executionsElement = document.getElementById('sessionExecutions');
        if (executionsElement) {
            executionsElement.textContent = this.currentSession.executionsCount;
        }

        // Track in analytics
        const today = new Date().toDateString();
        if (!this.analytics.performanceData[today]) {
            this.analytics.performanceData[today] = {
                executions: 0,
                studyTime: 0,
                algorithmsUsed: new Set()
            };
        }
        this.analytics.performanceData[today].executions++;
    }

    trackEducationalTabView(tab) {
        if (!this.isTrackingEnabled) return;

        this.currentSession.tabsViewed.push({
            tab: tab,
            timestamp: new Date()
        });

        // Update learning metrics
        if (!this.analytics.learningMetrics[tab]) {
            this.analytics.learningMetrics[tab] = {
                views: 0,
                timeSpent: 0
            };
        }
        this.analytics.learningMetrics[tab].views++;
    }

    trackComparisonUsage() {
        if (!this.isTrackingEnabled) return;

        this.currentSession.comparisons++;
        this.analytics.comparisons.push({
            timestamp: new Date(),
            sessionId: this.currentSession.id
        });
    }

    // Dashboard Methods
    openDashboard() {
        const dashboard = document.getElementById('analyticsDashboard');
        if (dashboard) {
            this.updateDashboardData();
            dashboard.style.display = 'block';
        }
    }

    closeDashboard() {
        const dashboard = document.getElementById('analyticsDashboard');
        if (dashboard) {
            dashboard.style.display = 'none';
        }
    }

    refreshDashboard() {
        this.updateDashboardData();
        this.showNotification('Dashboard atualizado!', 'success');
    }

    updateDashboardData() {
        this.updateOverviewMetrics();
        this.updatePerformanceCharts();
        this.updateDetailedAnalytics();
        this.updateAchievementsAndGoals();
    }

    updateOverviewMetrics() {
        const algorithmsLearned = Object.keys(this.analytics.algorithmStats).length;
        const totalStudyTime = this.calculateTotalStudyTime();
        const totalExecutions = this.calculateTotalExecutions();
        const totalComparisons = this.analytics.comparisons.length;

        // Update metric values
        this.updateMetricValue('algorithmsLearned', algorithmsLearned);
        this.updateMetricValue('totalStudyTime', `${Math.round(totalStudyTime / 60)}min`);
        this.updateMetricValue('totalExecutions', totalExecutions);
        this.updateMetricValue('totalComparisons', totalComparisons);

        // Update daily changes
        this.updateDailyChanges();
    }

    updateMetricValue(elementId, value) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = value;
        }
    }

    updateDailyChanges() {
        const today = new Date().toDateString();
        const todayData = this.analytics.performanceData[today] || {};

        this.updateMetricChange('algorithmsChange', `+${todayData.algorithmsUsed?.size || 0} hoje`);
        this.updateMetricChange('timeChange', `+${Math.round((todayData.studyTime || 0) / 60)}min hoje`);
        this.updateMetricChange('executionsChange', `+${todayData.executions || 0} hoje`);
        this.updateMetricChange('comparisonsChange', `+${this.getTodayComparisons()} hoje`);
    }

    updateMetricChange(elementId, value) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = value;
        }
    }

    updatePerformanceCharts() {
        this.renderLearningProgressChart();
        this.renderTimePerAlgorithmChart();
        this.renderWeeklyActivityChart();
        this.renderLearningEfficiencyChart();
    }

    renderLearningProgressChart() {
        const canvas = document.getElementById('learningProgressChart');
        if (!canvas || !this.chartControllers.learningProgress) return;

        const progressData = this.calculateLearningProgress();
        const chartData = {
            labels: progressData.labels,
            datasets: [{
                label: 'Algoritmos Aprendidos',
                data: progressData.values,
                borderColor: '#4ecdc4',
                backgroundColor: '#4ecdc440',
                fill: true
            }]
        };

        this.chartControllers.learningProgress.renderChart(canvas, 'line', chartData);
    }

    renderTimePerAlgorithmChart() {
        const canvas = document.getElementById('timePerAlgorithmChart');
        if (!canvas || !this.chartControllers.timePerAlgorithm) return;

        const timeData = this.calculateTimePerAlgorithm();
        const chartData = {
            labels: timeData.labels,
            datasets: [{
                label: 'Tempo (minutos)',
                data: timeData.values,
                backgroundColor: [
                    '#ff6b6b', '#4ecdc4', '#45b7d1', 
                    '#96ceb4', '#ffeaa7', '#dda0dd', '#ff9ff3'
                ]
            }]
        };

        this.chartControllers.timePerAlgorithm.renderChart(canvas, 'bar', chartData);
    }

    renderWeeklyActivityChart() {
        const canvas = document.getElementById('weeklyActivityChart');
        if (!canvas || !this.chartControllers.weeklyActivity) return;

        const weeklyData = this.calculateWeeklyActivity();
        const chartData = {
            labels: weeklyData.labels,
            datasets: [{
                label: 'Atividade Diária',
                data: weeklyData.values,
                borderColor: '#45b7d1',
                backgroundColor: '#45b7d140',
                fill: true
            }]
        };

        this.chartControllers.weeklyActivity.renderChart(canvas, 'line', chartData);
    }

    renderLearningEfficiencyChart() {
        const canvas = document.getElementById('learningEfficiencyChart');
        if (!canvas || !this.chartControllers.learningEfficiency) return;

        const efficiencyData = this.calculateLearningEfficiency();
        const chartData = {
            labels: efficiencyData.labels,
            datasets: [{
                label: 'Eficiência',
                data: efficiencyData.values,
                backgroundColor: '#96ceb4'
            }]
        };

        this.chartControllers.learningEfficiency.renderChart(canvas, 'radar', chartData);
    }

    updateDetailedAnalytics() {
        this.updateAlgorithmPerformanceTable();
        this.updateSessionHistoryTable();
        this.updateBehaviorAnalysis();
        this.updatePersonalizedInsights();
    }

    updateAlgorithmPerformanceTable() {
        const container = document.getElementById('algorithmPerformanceTable');
        if (!container) return;

        const algorithms = Object.entries(this.analytics.algorithmStats);
        if (algorithms.length === 0) {
            container.innerHTML = '<p class="no-data">Nenhum algoritmo usado ainda.</p>';
            return;
        }

        const tableHTML = `
            <table class="performance-table">
                <thead>
                    <tr>
                        <th>Algoritmo</th>
                        <th>Vezes Usado</th>
                        <th>Tempo Total</th>
                        <th>Execuções</th>
                        <th>Tempo Médio</th>
                        <th>Último Uso</th>
                    </tr>
                </thead>
                <tbody>
                    ${algorithms.map(([key, data]) => `
                        <tr>
                            <td><strong>${data.name}</strong></td>
                            <td>${data.timesUsed}</td>
                            <td>${Math.round(data.totalTime / 60)}min</td>
                            <td>${data.executions}</td>
                            <td>${Math.round(data.averageTime / 60)}min</td>
                            <td>${data.lastUsed ? new Date(data.lastUsed).toLocaleDateString('pt-BR') : '-'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;

        container.innerHTML = tableHTML;
    }

    updateSessionHistoryTable() {
        const container = document.getElementById('sessionHistoryTable');
        if (!container) return;

        const recentSessions = this.analytics.sessions.slice(-10);
        if (recentSessions.length === 0) {
            container.innerHTML = '<p class="no-data">Nenhuma sessão registrada ainda.</p>';
            return;
        }

        const tableHTML = `
            <table class="sessions-table">
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Duração</th>
                        <th>Algoritmos</th>
                        <th>Execuções</th>
                        <th>Abas Visitadas</th>
                    </tr>
                </thead>
                <tbody>
                    ${recentSessions.map(session => `
                        <tr>
                            <td>${new Date(session.startTime).toLocaleDateString('pt-BR')}</td>
                            <td>${Math.round(session.duration / 60000)}min</td>
                            <td>${session.algorithmsUsed.length}</td>
                            <td>${session.executionsCount}</td>
                            <td>${session.tabsViewed.length}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;

        container.innerHTML = tableHTML;
    }

    updateBehaviorAnalysis() {
        const container = document.getElementById('behaviorAnalysis');
        if (!container) return;

        const patterns = this.analyzeBehaviorPatterns();
        container.innerHTML = `
            <div class="behavior-insights">
                ${patterns.map(pattern => `
                    <div class="behavior-card">
                        <div class="behavior-icon">${pattern.icon}</div>
                        <div class="behavior-content">
                            <h5>${pattern.title}</h5>
                            <p>${pattern.description}</p>
                            <div class="behavior-metric">${pattern.metric}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    updatePersonalizedInsights() {
        const container = document.getElementById('personalizedInsights');
        if (!container) return;

        const insights = this.generatePersonalizedInsights();
        container.innerHTML = `
            <div class="insights-list">
                ${insights.map(insight => `
                    <div class="insight-card ${insight.type}">
                        <div class="insight-icon">${insight.icon}</div>
                        <div class="insight-content">
                            <h5>${insight.title}</h5>
                            <p>${insight.description}</p>
                            ${insight.action ? `<button class="btn btn-sm btn-primary">${insight.action}</button>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    switchAnalyticsTab(tabName) {
        // Remove active class from all tabs
        document.querySelectorAll('.analytics-tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelectorAll('.analytics-tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });

        // Add active class to selected tab
        const activeBtn = document.querySelector(`[data-tab="${tabName}"]`);
        const activePane = document.getElementById(`${tabName}-analytics`);

        if (activeBtn) activeBtn.classList.add('active');
        if (activePane) activePane.classList.add('active');
    }

    // Calculation Methods
    calculateTotalStudyTime() {
        return this.analytics.sessions.reduce((total, session) => total + session.duration, 0) +
               this.currentSession.duration;
    }

    calculateTotalExecutions() {
        return this.analytics.sessions.reduce((total, session) => total + session.executionsCount, 0) +
               this.currentSession.executionsCount;
    }

    getTodayComparisons() {
        const today = new Date().toDateString();
        return this.analytics.comparisons.filter(comp => 
            new Date(comp.timestamp).toDateString() === today
        ).length;
    }

    calculateLearningProgress() {
        const last7Days = [];
        const progressValues = [];
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            last7Days.push(date.toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' }));
            
            // Calculate algorithms learned up to this date
            const algorithmsLearnedByDate = Object.values(this.analytics.algorithmStats)
                .filter(alg => new Date(alg.lastUsed) <= date).length;
            progressValues.push(algorithmsLearnedByDate);
        }

        return { labels: last7Days, values: progressValues };
    }

    calculateTimePerAlgorithm() {
        const algorithms = Object.entries(this.analytics.algorithmStats);
        return {
            labels: algorithms.map(([, data]) => data.name),
            values: algorithms.map(([, data]) => Math.round(data.totalTime / 60000))
        };
    }

    calculateWeeklyActivity() {
        const last7Days = [];
        const activityValues = [];
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateString = date.toDateString();
            
            last7Days.push(date.toLocaleDateString('pt-BR', { weekday: 'short' }));
            
            const dayActivity = this.analytics.sessions
                .filter(session => new Date(session.startTime).toDateString() === dateString)
                .reduce((total, session) => total + session.executionsCount, 0);
            
            activityValues.push(dayActivity);
        }

        return { labels: last7Days, values: activityValues };
    }

    calculateLearningEfficiency() {
        const metrics = ['Velocidade', 'Precisão', 'Consistência', 'Exploração', 'Retenção'];
        const values = [
            this.calculateLearningSpeed(),
            this.calculateLearningAccuracy(),
            this.calculateLearningConsistency(),
            this.calculateExplorationRate(),
            this.calculateRetentionRate()
        ];

        return { labels: metrics, values: values };
    }

    // Analysis Methods
    analyzeBehaviorPatterns() {
        const patterns = [];

        // Most used algorithm
        const mostUsedAlgorithm = this.getMostUsedAlgorithm();
        if (mostUsedAlgorithm) {
            patterns.push({
                icon: '🎯',
                title: 'Algoritmo Favorito',
                description: `Você tem preferência pelo ${mostUsedAlgorithm.name}`,
                metric: `${mostUsedAlgorithm.timesUsed} usos`
            });
        }

        // Learning pattern
        const avgSessionTime = this.calculateAverageSessionTime();
        patterns.push({
            icon: '⏱️',
            title: 'Padrão de Estudo',
            description: avgSessionTime > 15 ? 'Você prefere sessões longas de estudo' : 'Você faz sessões rápidas e focadas',
            metric: `${Math.round(avgSessionTime)}min por sessão`
        });

        // Most viewed tab
        const mostViewedTab = this.getMostViewedTab();
        if (mostViewedTab) {
            patterns.push({
                icon: '📖',
                title: 'Preferência de Aprendizado',
                description: `Você gosta mais da aba "${mostViewedTab.name}"`,
                metric: `${mostViewedTab.views} visualizações`
            });
        }

        return patterns;
    }

    generatePersonalizedInsights() {
        const insights = [];

        // Suggest next algorithm
        const nextAlgorithm = this.suggestNextAlgorithm();
        if (nextAlgorithm) {
            insights.push({
                type: 'suggestion',
                icon: '💡',
                title: 'Próximo Desafio',
                description: `Com base no seu progresso, recomendamos aprender ${nextAlgorithm}`,
                action: 'Começar Agora'
            });
        }

        // Study streak
        const streak = this.calculateStudyStreak();
        if (streak > 1) {
            insights.push({
                type: 'achievement',
                icon: '🔥',
                title: 'Sequência de Estudos',
                description: `Parabéns! Você está em uma sequência de ${streak} dias estudando`,
                action: null
            });
        }

        // Performance insight
        const performance = this.analyzePerformanceTrend();
        if (performance.trend === 'improving') {
            insights.push({
                type: 'positive',
                icon: '📈',
                title: 'Performance Melhorando',
                description: 'Sua eficiência de aprendizado está aumentando',
                action: 'Ver Detalhes'
            });
        }

        return insights;
    }

    // Helper Methods
    getMostUsedAlgorithm() {
        const algorithms = Object.entries(this.analytics.algorithmStats);
        if (algorithms.length === 0) return null;

        return algorithms.reduce((most, [key, data]) => 
            data.timesUsed > (most?.timesUsed || 0) ? data : most
        );
    }

    calculateAverageSessionTime() {
        const sessions = this.analytics.sessions;
        if (sessions.length === 0) return 0;

        const totalTime = sessions.reduce((sum, session) => sum + session.duration, 0);
        return totalTime / sessions.length / 60000; // Convert to minutes
    }

    getMostViewedTab() {
        const tabs = Object.entries(this.analytics.learningMetrics);
        if (tabs.length === 0) return null;

        const tabNames = {
            explanation: 'Explicação',
            code: 'Código',
            steps: 'Passos',
            complexity: 'Complexidade'
        };

        const mostViewed = tabs.reduce((most, [key, data]) => 
            data.views > (most?.views || 0) ? { key, ...data } : most
        );

        return mostViewed ? { ...mostViewed, name: tabNames[mostViewed.key] || mostViewed.key } : null;
    }

    suggestNextAlgorithm() {
        const allAlgorithms = ['bubble', 'selection', 'insertion', 'quick', 'merge', 'heap'];
        const learnedAlgorithms = Object.keys(this.analytics.algorithmStats);
        const unlearned = allAlgorithms.filter(alg => !learnedAlgorithms.includes(alg));
        
        if (unlearned.length === 0) return null;

        // Suggest based on difficulty progression
        const difficultyOrder = ['bubble', 'selection', 'insertion', 'merge', 'quick', 'heap'];
        return this.getAlgorithmName(difficultyOrder.find(alg => unlearned.includes(alg)));
    }

    calculateStudyStreak() {
        const today = new Date();
        let streak = 0;
        
        for (let i = 0; i < 30; i++) {
            const checkDate = new Date(today);
            checkDate.setDate(checkDate.getDate() - i);
            const dateString = checkDate.toDateString();
            
            const hadActivity = this.analytics.sessions.some(session => 
                new Date(session.startTime).toDateString() === dateString
            );
            
            if (hadActivity) {
                streak++;
            } else if (i > 0) {
                break;
            }
        }
        
        return streak;
    }

    analyzePerformanceTrend() {
        // Simple trend analysis based on recent sessions
        const recentSessions = this.analytics.sessions.slice(-5);
        if (recentSessions.length < 3) return { trend: 'insufficient_data' };

        const avgExecutions = recentSessions.reduce((sum, s) => sum + s.executionsCount, 0) / recentSessions.length;
        const lastTwoAvg = recentSessions.slice(-2).reduce((sum, s) => sum + s.executionsCount, 0) / 2;

        return {
            trend: lastTwoAvg > avgExecutions ? 'improving' : 'stable'
        };
    }

    calculateLearningSpeed() {
        // Calculate based on algorithms learned per hour
        const totalHours = this.calculateTotalStudyTime() / 3600000;
        const algorithmsLearned = Object.keys(this.analytics.algorithmStats).length;
        return Math.min(100, (algorithmsLearned / Math.max(1, totalHours)) * 20);
    }

    calculateLearningAccuracy() {
        // Placeholder - would need more specific metrics
        return Math.random() * 40 + 60; // 60-100 range
    }

    calculateLearningConsistency() {
        const streak = this.calculateStudyStreak();
        return Math.min(100, streak * 10);
    }

    calculateExplorationRate() {
        const algorithmsUsed = Object.keys(this.analytics.algorithmStats).length;
        return (algorithmsUsed / 7) * 100; // 7 total algorithms
    }

    calculateRetentionRate() {
        // Based on returning to previously learned algorithms
        const algorithms = Object.values(this.analytics.algorithmStats);
        const recentRevisits = algorithms.filter(alg => 
            alg.timesUsed > 1 && alg.lastUsed && 
            (Date.now() - new Date(alg.lastUsed).getTime()) < 7 * 24 * 60 * 60 * 1000
        ).length;
        
        return Math.min(100, (recentRevisits / Math.max(1, algorithms.length)) * 100);
    }

    // Utility Methods
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

    updateRealTimeMetrics() {
        // Update the floating widget
        this.updateSessionTime();
    }

    toggleMetricsWidget() {
        const widget = document.getElementById('realTimeMetrics');
        const content = widget.querySelector('.widget-content');
        const toggle = document.getElementById('toggleMetrics');
        
        if (content.style.display === 'none') {
            content.style.display = 'block';
            toggle.textContent = '−';
        } else {
            content.style.display = 'none';
            toggle.textContent = '+';
        }
    }

    updateAchievementsAndGoals() {
        this.updateLearningGoals();
        this.updateUnlockedAchievements();
        this.updateNextAchievements();
    }

    updateLearningGoals() {
        const container = document.getElementById('learningGoals');
        if (!container) return;

        const goals = this.generateLearningGoals();
        container.innerHTML = goals.map(goal => `
            <div class="goal-item ${goal.completed ? 'completed' : ''}">
                <div class="goal-icon">${goal.icon}</div>
                <div class="goal-content">
                    <h5>${goal.title}</h5>
                    <p>${goal.description}</p>
                    <div class="goal-progress">
                        <div class="progress-bar small">
                            <div class="progress-fill" style="width: ${goal.progress}%"></div>
                        </div>
                        <span>${goal.progress}%</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    generateLearningGoals() {
        const algorithmsLearned = Object.keys(this.analytics.algorithmStats).length;
        const totalTime = this.calculateTotalStudyTime() / 60000; // minutes
        
        return [
            {
                icon: '🎯',
                title: 'Aprender 3 Algoritmos',
                description: 'Domine 3 algoritmos diferentes',
                progress: Math.min(100, (algorithmsLearned / 3) * 100),
                completed: algorithmsLearned >= 3
            },
            {
                icon: '⏱️',
                title: '30 Minutos de Estudo',
                description: 'Acumule 30 minutos de tempo de estudo',
                progress: Math.min(100, (totalTime / 30) * 100),
                completed: totalTime >= 30
            },
            {
                icon: '🔥',
                title: 'Sequência de 3 Dias',
                description: 'Estude por 3 dias consecutivos',
                progress: Math.min(100, (this.calculateStudyStreak() / 3) * 100),
                completed: this.calculateStudyStreak() >= 3
            }
        ];
    }

    updateUnlockedAchievements() {
        const container = document.getElementById('unlockedAchievements');
        if (!container) return;

        const achievements = this.getUnlockedAchievements();
        container.innerHTML = achievements.map(achievement => `
            <div class="achievement-item unlocked">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-content">
                    <h5>${achievement.title}</h5>
                    <p>${achievement.description}</p>
                    <div class="achievement-date">Desbloqueado em ${achievement.date}</div>
                </div>
            </div>
        `).join('');
    }

    updateNextAchievements() {
        const container = document.getElementById('nextAchievements');
        if (!container) return;

        const nextAchievements = this.getNextAchievements();
        container.innerHTML = nextAchievements.map(achievement => `
            <div class="achievement-item locked">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-content">
                    <h5>${achievement.title}</h5>
                    <p>${achievement.description}</p>
                    <div class="achievement-requirement">${achievement.requirement}</div>
                </div>
            </div>
        `).join('');
    }

    getUnlockedAchievements() {
        // Return achievements based on current progress
        const achievements = [];
        const algorithmsLearned = Object.keys(this.analytics.algorithmStats).length;
        
        if (algorithmsLearned >= 1) {
            achievements.push({
                icon: '🥇',
                title: 'Primeiro Algoritmo',
                description: 'Aprendeu seu primeiro algoritmo',
                date: new Date().toLocaleDateString('pt-BR')
            });
        }
        
        return achievements;
    }

    getNextAchievements() {
        const next = [];
        const algorithmsLearned = Object.keys(this.analytics.algorithmStats).length;
        
        if (algorithmsLearned < 3) {
            next.push({
                icon: '🎓',
                title: 'Estudante Dedicado',
                description: 'Aprenda 3 algoritmos diferentes',
                requirement: `${3 - algorithmsLearned} algoritmos restantes`
            });
        }
        
        return next;
    }

    // Data Management
    exportAnalytics() {
        const exportData = {
            analytics: this.analytics,
            currentSession: this.currentSession,
            exportDate: new Date().toISOString(),
            version: '1.0'
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `analytics-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);

        this.showNotification('Analytics exportados com sucesso!', 'success');
    }

    resetAnalytics() {
        if (confirm('Tem certeza que deseja limpar todos os dados de analytics? Esta ação não pode ser desfeita.')) {
            this.analytics = {
                sessions: [],
                algorithmStats: {},
                learningMetrics: {},
                performanceData: {},
                userBehavior: {},
                comparisons: [],
                achievements: []
            };
            
            localStorage.removeItem('analyticsData');
            this.updateDashboardData();
            this.showNotification('Dados de analytics limpos!', 'info');
        }
    }

    saveAnalytics() {
        try {
            const dataToSave = {
                analytics: this.analytics,
                lastSaved: new Date().toISOString()
            };
            localStorage.setItem('analyticsData', JSON.stringify(dataToSave));
        } catch (error) {
            console.warn('Failed to save analytics:', error);
        }
    }

    loadAnalytics() {
        try {
            const saved = localStorage.getItem('analyticsData');
            if (saved) {
                const data = JSON.parse(saved);
                this.analytics = { ...this.analytics, ...data.analytics };
            }
        } catch (error) {
            console.warn('Failed to load analytics:', error);
        }
    }

    endCurrentSession() {
        this.currentSession.endTime = new Date();
        this.analytics.sessions.push({ ...this.currentSession });
        this.saveAnalytics();
        
        if (this.sessionTimer) {
            clearInterval(this.sessionTimer);
        }
        if (this.saveTimer) {
            clearInterval(this.saveTimer);
        }
    }

    showNotification(message, type = 'info') {
        // Use existing notification system if available
        if (window.gamificationController && window.gamificationController.showNotification) {
            window.gamificationController.showNotification(message, type);
        } else {
            console.log(`[${type.toUpperCase()}] ${message}`);
        }
    }
}

// Initialize analytics dashboard
document.addEventListener('DOMContentLoaded', () => {
    window.analyticsDashboardController = new AnalyticsDashboardController();
    
    // Handle page unload to save session
    window.addEventListener('beforeunload', () => {
        if (window.analyticsDashboardController) {
            window.analyticsDashboardController.endCurrentSession();
        }
    });
});