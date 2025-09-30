// ===== MAIN APPLICATION CONTROLLER =====

class SortingGameApp {
    constructor() {
        this.currentAlgorithm = null;
        this.visualizationController = new VisualizationController();
        this.progressController = window.progressController;
        this.gamificationController = window.progressController; // Alias for compatibility
        
        // New features state
        this.isPaused = false;
        this.currentTutorialStep = 0;
        this.tutorialSteps = [
            {
                title: 'Bem-vindo!',
                text: 'Esta aplicacao te ajuda a aprender algoritmos de ordenacao de forma interativa e divertida.'
            },
            {
                title: 'Escolhendo Algoritmos',
                text: 'Clique em um dos cards para selecionar um algoritmo. Cada um tem dificuldade e pontuacao diferentes.'
            },
            {
                title: 'Controles de Velocidade',
                text: 'Use o slider de velocidade para ajustar a rapidez das animacoes. Velocidade 1 e mais lenta, 5 e mais rapida.'
            },
            {
                title: 'Visualizacao',
                text: 'Observe as barras coloridas: azul para comparacoes, vermelho para trocas, verde para elementos ordenados.'
            },
            {
                title: 'Gamificacao',
                text: 'Ganhe pontos completando algoritmos! Desbloqueie conquistas e suba de nivel conforme aprende.'
            }
        ];
        
        // Make progress controller globally available
        window.progressController = this.progressController;
        
        // Initialize educational system
        this.educationalController = null; // Will be set when available
        
        this.initializeEventListeners();
        this.initializeUI();
        
        // Initialize custom data controller with new progress system
        // this.customDataController = new CustomDataController(this.visualizationController, this.progressController);
        
        // Generate initial array
        this.visualizationController.generateRandomArray();
    }

    initializeEventListeners() {
        // Algorithm selection cards
        document.querySelectorAll('.algorithm-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const algorithm = card.getAttribute('data-algorithm');
                // Sound removed for simplicity
                this.selectAlgorithm(algorithm);
            });
        });

        // Control buttons
        const generateBtn = document.getElementById('generateArray');
        const startBtn = document.getElementById('startSort');
        const pauseBtn = document.getElementById('pauseSort');
        const resetBtn = document.getElementById('resetSort');
        const backBtn = document.getElementById('backToSelection');
        
        // Custom data button
        const customDataBtn = document.getElementById('customDataBtn');
        
        // Speed control
        const speedSlider = document.getElementById('speedSlider');
        const speedValue = document.getElementById('speedValue');
        
        // Educational tabs
        const eduTabs = document.querySelectorAll('.edu-tab-btn');
        
        // Feature buttons (that may not exist in simplified interface)
        const compareBtn = document.getElementById('compareBtn');
        const statsBtn = document.getElementById('statsBtn');
        const tutorialBtn = document.getElementById('tutorialBtn');
        const settingsBtn = document.getElementById('settingsBtn');
        const exportBtn = document.getElementById('exportBtn');
        const shareBtn = document.getElementById('shareBtn');
        
        // Modal controls
        const settingsModal = document.getElementById('settingsModal');
        const tutorialModal = document.getElementById('tutorialModal');
        const closeSettings = document.getElementById('closeSettings');
        const closeTutorial = document.getElementById('closeTutorial');

        if (generateBtn) {
            generateBtn.addEventListener('click', () => this.generateNewArray());
        }

        if (startBtn) {
            startBtn.addEventListener('click', () => this.startSorting());
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetVisualization());
        }

        if (backBtn) {
            backBtn.addEventListener('click', () => this.backToSelection());
        }
        
        if (pauseBtn) {
            pauseBtn.addEventListener('click', () => this.pauseSorting());
        }
        
        const resumeBtn = document.getElementById('resumeSort');
        if (resumeBtn) {
            resumeBtn.addEventListener('click', () => this.resumeSorting());
        }
        
        // Speed control
        if (speedSlider) {
            speedSlider.addEventListener('input', (e) => {
                const speed = parseInt(e.target.value);
                const speedLabels = ['Lento', 'Normal', 'Rapido'];
                this.visualizationController.setAnimationSpeed(speed);
                if (speedValue) speedValue.textContent = speedLabels[speed - 1] || 'Normal';
            });
        }
        
        // Educational tabs
        if (eduTabs) {
            eduTabs.forEach(tab => {
                tab.addEventListener('click', (e) => {
                    this.switchEducationalTab(e.target.dataset.tab);
                });
            });
        }
        
        // Feature buttons
        if (compareBtn) {
            compareBtn.addEventListener('click', () => this.openComparisonMode());
        }
        
        if (statsBtn) {
            statsBtn.addEventListener('click', () => this.openStatsDashboard());
        }
        
        if (tutorialBtn) {
            tutorialBtn.addEventListener('click', () => this.openTutorial());
        }
        
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => this.openSettings());
        }
        
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.showExportOptions());
        }
        
        if (shareBtn) {
            shareBtn.addEventListener('click', () => this.shareCurrentResults());
        }
        
        // Modal controls
        if (closeSettings) {
            closeSettings.addEventListener('click', () => this.closeSettings());
        }
        
        if (closeTutorial) {
            closeTutorial.addEventListener('click', () => this.closeTutorial());
        }
        
        // Settings form
        const saveSettings = document.getElementById('saveSettings');
        if (saveSettings) {
            saveSettings.addEventListener('click', () => this.saveSettings());
        }
        
        // Tutorial navigation
        const nextTutorial = document.getElementById('nextTutorial');
        const prevTutorial = document.getElementById('prevTutorial');
        
        if (nextTutorial) {
            nextTutorial.addEventListener('click', () => this.nextTutorialStep());
        }
        
        if (prevTutorial) {
            prevTutorial.addEventListener('click', () => this.prevTutorialStep());
        }

        // Comparison mode controls
        const startComparison = document.getElementById('startComparison');
        const exitComparison = document.getElementById('exitComparison');
        
        if (startComparison) {
            startComparison.addEventListener('click', () => this.startComparison());
        }
        
        if (exitComparison) {
            exitComparison.addEventListener('click', () => this.exitComparisonMode());
        }

        // Dashboard controls
        const closeDashboard = document.getElementById('closeDashboard');
        
        if (closeDashboard) {
            closeDashboard.addEventListener('click', () => this.closeDashboard());
        }

        // Settings controls
        const resetSettings = document.getElementById('resetSettings');
        
        if (resetSettings) {
            resetSettings.addEventListener('click', () => this.resetSettings());
        }
        
        // Update array size display
        const arraySizeSlider = document.getElementById('arraySizeSlider');
        const arraySizeValue = document.getElementById('arraySizeValue');
        
        if (arraySizeSlider && arraySizeValue) {
            arraySizeSlider.addEventListener('input', (e) => {
                arraySizeValue.textContent = e.target.value;
            });
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return; // Don't handle shortcuts when typing
            }

            switch (e.key) {
                case ' ': // Spacebar
                    e.preventDefault();
                    if (this.currentAlgorithm) {
                        if (this.visualizationController.isAnimating) {
                            // Could add pause/resume functionality
                        } else {
                            this.startSorting();
                        }
                    }
                    break;
                case 'r':
                case 'R':
                    e.preventDefault();
                    if (this.currentAlgorithm) {
                        this.resetVisualization();
                    }
                    break;
                case 'g':
                case 'G':
                    e.preventDefault();
                    if (this.currentAlgorithm) {
                        this.generateNewArray();
                    }
                    break;
                case 'Escape':
                    e.preventDefault();
                    if (this.currentAlgorithm) {
                        this.backToSelection();
                    }
                    break;
                case '1':
                    e.preventDefault();
                    this.selectAlgorithm('bubble');
                    break;
                case '2':
                    e.preventDefault();
                    this.selectAlgorithm('selection');
                    break;
                case '3':
                    e.preventDefault();
                    this.selectAlgorithm('insertion');
                    break;
                case '4':
                    e.preventDefault();
                    this.selectAlgorithm('quick');
                    break;
                case '5':
                    e.preventDefault();
                    this.selectAlgorithm('merge');
                    break;
                case '6':
                    e.preventDefault();
                    this.selectAlgorithm('heap');
                    break;
                case '7':
                    e.preventDefault();
                    this.selectAlgorithm('radix');
                    break;
            }
        });

        // Add right-click context menu for additional options
        document.addEventListener('contextmenu', (e) => {
            if (e.target.closest('.array-bar')) {
                e.preventDefault();
                this.showArrayContextMenu(e);
            }
        });

        // Close context menu on click elsewhere
        document.addEventListener('click', () => {
            this.hideContextMenu();
        });
    }

    switchEducationalTab(tabName) {
        // Remove active class from all tabs and contents
        document.querySelectorAll('.edu-tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelectorAll('.edu-tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Add active class to clicked tab and corresponding content
        const activeBtn = document.querySelector(`[data-tab="${tabName}"]`);
        const activeContent = document.getElementById(`${tabName}-tab`);
        
        if (activeBtn) activeBtn.classList.add('active');
        if (activeContent) activeContent.classList.add('active');
    }

    selectAlgorithm(algorithm) {
        if (!ALGORITHMS[algorithm]) {
            console.error('Invalid algorithm:', algorithm);
            return;
        }

        this.currentAlgorithm = algorithm;
        
        // Update progress controller
        if (this.progressController) {
            this.progressController.setCurrentAlgorithm(ALGORITHMS[algorithm].name);
        }
        
        // Update visualization
        this.visualizationController.setAlgorithmInfo(algorithm);
        
        // Generate initial array if none exists
        if (this.visualizationController.array.length === 0) {
            this.visualizationController.generateRandomArray(10, 10, 99);
        }
        
        // Update educational content
        this.updateEducationalContent(algorithm);
        
        // Show visualization area with animation
        const selectionArea = document.querySelector('.algorithm-selection');
        const visualizationArea = document.getElementById('visualizationArea');
        
        if (selectionArea) {
            selectionArea.style.display = 'none';
        }
        
        if (visualizationArea) {
            visualizationArea.style.display = 'block';
            visualizationArea.classList.add('visualization-enter');
            
            setTimeout(() => {
                visualizationArea.classList.remove('visualization-enter');
            }, 600);
        }

        // Update algorithm cards visual state
        document.querySelectorAll('.algorithm-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        const selectedCard = document.querySelector(`[data-algorithm="${algorithm}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
        }

        // Show enhanced welcome message with educational features
        this.showEducationalWelcome(algorithm);

        // Show help tooltip for first-time users
        this.showKeyboardShortcuts();
    }

    startSorting() {
        if (!this.currentAlgorithm || this.visualizationController.isAnimating) {
            return;
        }

        // Update progress
        if (this.progressController) {
            this.progressController.startSorting(ALGORITHMS[this.currentAlgorithm].name);
        }

        // Update button states
        const startBtn = document.getElementById('startSort');
        const pauseBtn = document.getElementById('pauseSort');
        
        if (startBtn) {
            startBtn.disabled = true;
            startBtn.textContent = '⏳ Executando...';
        }
        
        if (pauseBtn) {
            pauseBtn.style.display = 'inline-block';
        }

        // Start visualization with current algorithm
        this.visualizationController.startSorting(this.currentAlgorithm);

        // Setup completion callback
        setTimeout(() => {
            const originalComplete = this.visualizationController.completeSorting.bind(this.visualizationController);
            this.visualizationController.completeSorting = () => {
                originalComplete();
                
                // Re-enable button and hide pause
                if (startBtn) {
                    startBtn.disabled = false;
                    startBtn.textContent = '▶️ Começar';
                }
                
                const pauseBtn = document.getElementById('pauseSort');
                const resumeBtn = document.getElementById('resumeSort');
                if (pauseBtn) pauseBtn.style.display = 'none';
                if (resumeBtn) resumeBtn.style.display = 'none';

                // Update progress
                if (this.progressController) {
                    this.progressController.completeAlgorithm(ALGORITHMS[this.currentAlgorithm].name);
                }
            };
        }, 100);
    }

    updateEducationalContent(algorithm) {
        const algorithmInfo = ALGORITHMS[algorithm];
        if (!algorithmInfo) return;
        
        // Update title and description
        const titleEl = document.getElementById('algorithmTitle');
        const descEl = document.getElementById('algorithmDescription');
        
        if (titleEl) {
            titleEl.textContent = `Como funciona o ${algorithmInfo.name}?`;
        }
        
        if (descEl) {
            descEl.textContent = algorithmInfo.description;
        }
        
        // Update current algorithm header
        const currentAlgorithmEl = document.getElementById('currentAlgorithm');
        if (currentAlgorithmEl) {
            currentAlgorithmEl.textContent = algorithmInfo.name;
        }
        
        // Update code tab with patterns
        this.updateCodePatterns(algorithm);
        
        // Reset steps tab
        this.resetStepsDisplay();
    }

    updateCodePatterns(algorithm) {
        // Get the educational controller to access code patterns
        if (window.educationalController && window.educationalController.codePatterns) {
            const patterns = window.educationalController.codePatterns[algorithm];
            
            if (patterns) {
                // Update code display
                const codeElement = document.getElementById('algorithmCode');
                if (codeElement) {
                    codeElement.innerHTML = `<code>${patterns.code}</code>`;
                }
                
                // Update pattern explanations
                const explanationsElement = document.getElementById('patternExplanations');
                if (explanationsElement) {
                    let explanationsHTML = '<div class="pattern-explanations">';
                    
                    Object.entries(patterns.patterns).forEach(([patternType, explanation]) => {
                        const patternNames = {
                            loop: '🔄 Loops (Repetição)',
                            condition: '❓ Condições (Decisão)', 
                            swap: '🔄 Troca de elementos',
                            recursion: '🌀 Recursão'
                        };
                        
                        explanationsHTML += `
                            <div class="pattern-explanation-item">
                                <h6>${patternNames[patternType] || patternType}</h6>
                                <p>${explanation}</p>
                            </div>
                        `;
                    });
                    
                    explanationsHTML += '</div>';
                    explanationsElement.innerHTML = explanationsHTML;
                }
            }
        }
    }
    
    resetStepsDisplay() {
        const stepNumber = document.getElementById('stepNumber');
        const stepTitle = document.getElementById('stepTitle');
        const currentStep = document.getElementById('currentStep');
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        if (stepNumber) stepNumber.textContent = '1';
        if (stepTitle) stepTitle.textContent = 'Pronto para aprender!';
        if (currentStep) currentStep.textContent = 'Clique em "Comecar" para ver o algoritmo funcionando passo a passo.';
        if (progressFill) progressFill.style.width = '0%';
        if (progressText) progressText.textContent = '0%';
    }

    generateNewArray() {
        if (this.visualizationController.isAnimating) {
            return;
        }

        // Show generation options
        const options = [
            'Aleatorio',
            'Quase Ordenado',
            'Reverso',
            'Personalizado'
        ];

        this.showArrayGenerationDialog(options);
    }

    showArrayGenerationDialog(options) {
        // Create simple modal for array generation options
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        `;

        const content = document.createElement('div');
        content.style.cssText = `
            background: var(--surface-color);
            padding: 2rem;
            border-radius: 1rem;
            border: 1px solid var(--border-color);
            max-width: 400px;
            width: 90%;
        `;

        content.innerHTML = `
            <h3 style="margin-bottom: 1rem; color: var(--text-primary);">Escolha o tipo de array</h3>
            <div class="array-options" style="display: flex; flex-direction: column; gap: 0.5rem;">
                <button class="btn btn-outline" data-type="random">🎲 Array Aleatorio</button>
                <button class="btn btn-outline" data-type="sorted">📊 Array Quase Ordenado</button>
                <button class="btn btn-outline" data-type="reverse">🔄 Array Reverso</button>
                <button class="btn btn-outline" data-type="custom">⚙️ Array Personalizado</button>
            </div>
            <button class="btn btn-secondary" id="cancelModal" style="margin-top: 1rem; width: 100%;">Cancelar</button>
        `;

        modal.appendChild(content);
        document.body.appendChild(modal);

        // Add event listeners
        content.querySelectorAll('[data-type]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const type = e.target.getAttribute('data-type');
                this.generateArrayByType(type);
                modal.remove();
            });
        });

        content.querySelector('#cancelModal').addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    generateArrayByType(type) {
        const size = 15; // Default size
        
        switch (type) {
            case 'random':
                this.visualizationController.generateRandomArray(size);
                break;
            case 'sorted':
                this.visualizationController.generateSortedArray(size);
                break;
            case 'reverse':
                this.visualizationController.generateReverseArray(size);
                break;
            case 'custom':
                this.showCustomArrayDialog();
                break;
        }
    }

    showCustomArrayDialog() {
        const input = prompt('Digite os numeros separados por virgula (ex: 5,2,8,1,9):');
        if (input) {
            try {
                const numbers = input.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));
                if (numbers.length > 0 && numbers.length <= 30) {
                    this.visualizationController.array = numbers;
                    this.visualizationController.originalArray = [...numbers];
                    this.visualizationController.updateVisualization();
                    this.visualizationController.resetStats();
                } else {
                    alert('Digite entre 1 e 30 numeros validos.');
                }
            } catch (error) {
                alert('Formato invalido. Use numeros separados por virgula.');
            }
        }
    }

    resetVisualization() {
        console.log('🔄 Resetando visualização...');
        
        // Forçar parada da animação se estiver rodando
        if (this.visualizationController.isAnimating) {
            this.visualizationController.resetAnimationState();
        }

        // Reset completo do controller
        this.visualizationController.resetVisualization();
        
        // Gerar novo array aleatório
        this.visualizationController.generateRandomArray();
        
        // Dar feedback visual no botão reset
        const resetBtn = document.getElementById('resetSort');
        if (resetBtn) {
            const originalText = resetBtn.textContent;
            resetBtn.textContent = '✅ Resetado!';
            resetBtn.disabled = true;
            
            setTimeout(() => {
                resetBtn.textContent = originalText;
                resetBtn.disabled = false;
            }, 1000);
        }
        
        // Resetar botões para estado inicial
        const startBtn = document.getElementById('startSort');
        const pauseBtn = document.getElementById('pauseSort');
        const resumeBtn = document.getElementById('resumeSort');
        
        if (startBtn) {
            startBtn.disabled = false;
            startBtn.textContent = '▶️ Começar';
        }
        if (pauseBtn) {
            pauseBtn.style.display = 'inline-block';
        }
        if (resumeBtn) {
            resumeBtn.style.display = 'none';
        }
        
        // Resetar área de explicação
        const explanationElement = document.getElementById('currentStepExplanation');
        if (explanationElement) {
            explanationElement.textContent = 'Array gerado! Clique em "Começar" para ver como o algoritmo ordena os números.';
        }
        
        // Resetar progresso
        const progressElement = document.getElementById('currentProgress');
        if (progressElement) {
            progressElement.textContent = 'Pronto para iniciar a ordenação!';
        }
        
        console.log('✅ Visualização resetada com sucesso!');
    }

    backToSelection() {
        this.currentAlgorithm = null;
        
        // Show selection area, hide visualization
        const selectionArea = document.querySelector('.algorithm-selection');
        const visualizationArea = document.getElementById('visualizationArea');
        
        if (visualizationArea) {
            visualizationArea.classList.add('visualization-exit');
            setTimeout(() => {
                visualizationArea.style.display = 'none';
                visualizationArea.classList.remove('visualization-exit');
            }, 400);
        }
        
        if (selectionArea) {
            setTimeout(() => {
                selectionArea.style.display = 'block';
            }, 200);
        }

        // Reset visualization
        this.resetVisualization();
    }

    showKeyboardShortcuts() {
        // Show shortcuts only once per session
        if (sessionStorage.getItem('shortcutsShown')) {
            return;
        }

        setTimeout(() => {
            this.gamificationController.showNotification(
                '💡 Dica: Use Espaco para iniciar, R para resetar, G para gerar novo array!',
                'info'
            );
            sessionStorage.setItem('shortcutsShown', 'true');
        }, 2000);
    }

    showArrayContextMenu(e) {
        // Remove existing context menu
        this.hideContextMenu();

        const contextMenu = document.createElement('div');
        contextMenu.id = 'arrayContextMenu';
        contextMenu.style.cssText = `
            position: fixed;
            top: ${e.clientY}px;
            left: ${e.clientX}px;
            background: var(--surface-color);
            border: 1px solid var(--border-color);
            border-radius: 0.5rem;
            padding: 0.5rem 0;
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            min-width: 150px;
        `;

        const menuItems = [
            { text: '🎲 Array Aleatorio', action: () => this.generateArrayByType('random') },
            { text: '📊 Quase Ordenado', action: () => this.generateArrayByType('sorted') },
            { text: '🔄 Array Reverso', action: () => this.generateArrayByType('reverse') },
            { text: '⚙️ Personalizado', action: () => this.generateArrayByType('custom') }
        ];

        menuItems.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.style.cssText = `
                padding: 0.5rem 1rem;
                cursor: pointer;
                color: var(--text-primary);
                transition: background-color 0.2s;
            `;
            menuItem.textContent = item.text;
            
            menuItem.addEventListener('click', () => {
                item.action();
                this.hideContextMenu();
            });
            
            menuItem.addEventListener('mouseenter', () => {
                menuItem.style.backgroundColor = 'var(--surface-light)';
            });
            
            menuItem.addEventListener('mouseleave', () => {
                menuItem.style.backgroundColor = 'transparent';
            });

            contextMenu.appendChild(menuItem);
        });

        document.body.appendChild(contextMenu);
    }

    hideContextMenu() {
        const existingMenu = document.getElementById('arrayContextMenu');
        if (existingMenu) {
            existingMenu.remove();
        }
    }

    initializeUI() {
        // Add any additional UI initialization here
        
        // Initialize tooltips or help system
        this.initializeTooltips();
        
        // Check for mobile device and adjust accordingly
        this.handleMobileOptimizations();
        
        // Load and apply saved settings
        this.loadAndApplySettings();
    }
    
    loadAndApplySettings() {
        const settings = JSON.parse(localStorage.getItem('sortingAppSettings') || '{}');
        this.applySettings(settings);
        
        // Show tutorial for first-time users
        if (!localStorage.getItem('tutorialCompleted')) {
            setTimeout(() => {
                this.openTutorial();
            }, 2000);
        }
    }

    initializeTooltips() {
        // Add hover tooltips to difficulty badges
        document.querySelectorAll('.difficulty').forEach(badge => {
            const difficulty = badge.textContent.toLowerCase();
            let tooltip = '';
            
            switch (difficulty) {
                case 'facil':
                    tooltip = 'Algoritmo simples, ideal para iniciantes';
                    break;
                case 'medio':
                    tooltip = 'Algoritmo intermediario com conceitos importantes';
                    break;
                case 'dificil':
                    tooltip = 'Algoritmo avancado com alta eficiencia';
                    break;
            }
            
            if (tooltip) {
                badge.title = tooltip;
            }
        });
    }

    handleMobileOptimizations() {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Adjust animation speed for mobile
            this.visualizationController.setAnimationSpeed(3); // Medium speed
            
            // Add touch-friendly interactions
            document.querySelectorAll('.algorithm-card').forEach(card => {
                card.addEventListener('touchstart', () => {
                    card.style.transform = 'scale(0.95)';
                });
                
                card.addEventListener('touchend', () => {
                    card.style.transform = '';
                });
            });
        }
    }
    
    // ===== NEW FEATURE METHODS =====
    
    pauseSorting() {
        if (this.visualizationController.isAnimating) {
            this.visualizationController.pauseAnimation();
        }
    }

    resumeSorting() {
        if (this.visualizationController.isAnimating) {
            this.visualizationController.resumeAnimation();
        }
    }
    
    openComparisonMode() {
        const comparisonMode = document.getElementById('comparisonMode');
        if (comparisonMode) {
            comparisonMode.style.display = 'block';
            comparisonMode.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    openStatsDashboard() {
        const statsDashboard = document.getElementById('statsDashboard');
        if (statsDashboard) {
            this.updateStatsDashboard();
            statsDashboard.style.display = 'block';
            statsDashboard.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    updateStatsDashboard() {
        const stats = this.gamificationController.getStats();
        
        const elements = {
            fastestAlgorithm: document.getElementById('fastestAlgorithm'),
            leastComparisons: document.getElementById('leastComparisons'),
            totalSorts: document.getElementById('totalSorts'),
            totalTimeSpent: document.getElementById('totalTimeSpent')
        };
        
        if (elements.fastestAlgorithm) {
            elements.fastestAlgorithm.textContent = stats.fastestSort ? 
                `${stats.fastestSort}s` : 'Nenhum ainda';
        }
        
        if (elements.leastComparisons) {
            elements.leastComparisons.textContent = stats.bestEfficiency ? 
                Math.floor(stats.bestEfficiency) : 'Nenhum ainda';
        }
        
        if (elements.totalSorts) {
            elements.totalSorts.textContent = stats.totalSorts;
        }
        
        if (elements.totalTimeSpent) {
            const minutes = Math.floor(stats.totalTime / 60);
            elements.totalTimeSpent.textContent = `${minutes}min`;
        }
        
        // Update performance chart
        this.updatePerformanceChart(gameStats);
    }
    
    updatePerformanceChart(gameStats) {
        const canvas = document.getElementById('performanceChart');
        if (!canvas) {
            console.warn('⚠️ Canvas performanceChart não encontrado');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        // Clear canvas with background
        ctx.fillStyle = '#f8f9fa';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Set up chart dimensions
        const margin = 60;
        const chartWidth = canvas.width - (margin * 2);
        const chartHeight = canvas.height - (margin * 2);
        
        // Sample data - in a real app, this would come from actual sorting history
        const performanceData = [
            { name: 'Bubble', comparisons: gameStats.avgComparisons * 1.8 || 150, time: 45, color: '#ff6b6b' },
            { name: 'Selection', comparisons: gameStats.avgComparisons * 1.2 || 100, time: 35, color: '#4ecdc4' },
            { name: 'Insertion', comparisons: gameStats.avgComparisons * 0.9 || 75, time: 25, color: '#45b7d1' },
            { name: 'Quick', comparisons: gameStats.avgComparisons * 0.4 || 40, time: 15, color: '#96ceb4' },
            { name: 'Merge', comparisons: gameStats.avgComparisons * 0.3 || 35, time: 20, color: '#ffeaa7' },
            { name: 'Heap', comparisons: gameStats.avgComparisons * 0.5 || 50, time: 30, color: '#dda0dd' }
        ];
        
        // Draw grid
        ctx.strokeStyle = '#e9ecef';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 10; i++) {
            const x = margin + (i * chartWidth / 10);
            const y = margin + (i * chartHeight / 10);
            
            // Vertical grid lines
            ctx.beginPath();
            ctx.moveTo(x, margin);
            ctx.lineTo(x, canvas.height - margin);
            ctx.stroke();
            
            // Horizontal grid lines
            ctx.beginPath();
            ctx.moveTo(margin, y);
            ctx.lineTo(canvas.width - margin, y);
            ctx.stroke();
        }
        
        // Draw axes
        ctx.strokeStyle = '#495057';
        ctx.lineWidth = 3;
        ctx.beginPath();
        // Y axis
        ctx.moveTo(margin, margin);
        ctx.lineTo(margin, canvas.height - margin);
        // X axis
        ctx.moveTo(margin, canvas.height - margin);
        ctx.lineTo(canvas.width - margin, canvas.height - margin);
        ctx.stroke();
        
        // Draw labels
        ctx.fillStyle = '#495057';
        ctx.font = 'bold 14px Arial';
        ctx.fillText('Comparações', 10, margin - 10);
        ctx.fillText('Algoritmos', canvas.width / 2 - 40, canvas.height - 10);
        
        // Draw bars
        const barWidth = chartWidth / performanceData.length - 20;
        const maxComparisons = Math.max(...performanceData.map(d => d.comparisons));
        
        performanceData.forEach((data, index) => {
            const barHeight = (data.comparisons / maxComparisons) * chartHeight;
            const x = margin + 10 + (index * (barWidth + 20));
            const y = canvas.height - margin - barHeight;
            
            // Draw bar with gradient
            const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
            gradient.addColorStop(0, data.color);
            gradient.addColorStop(1, data.color + '80');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(x, y, barWidth, barHeight);
            
            // Draw bar border
            ctx.strokeStyle = data.color;
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, barWidth, barHeight);
            
            // Draw algorithm name
            ctx.fillStyle = '#495057';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(data.name, x + barWidth/2, canvas.height - margin + 20);
            
            // Draw value on top of bar
            ctx.fillStyle = data.color;
            ctx.font = 'bold 11px Arial';
            ctx.fillText(Math.round(data.comparisons).toString(), x + barWidth/2, y - 5);
        });
        
        // Reset text alignment
        ctx.textAlign = 'left';
    }
    
    openTutorial() {
        const tutorialModal = document.getElementById('tutorialModal');
        if (tutorialModal) {
            this.currentTutorialStep = 0;
            this.updateTutorialStep();
            tutorialModal.style.display = 'flex';
        }
    }
    
    closeTutorial() {
        const tutorialModal = document.getElementById('tutorialModal');
        if (tutorialModal) {
            tutorialModal.style.display = 'none';
        }
    }
    
    nextTutorialStep() {
        if (this.currentTutorialStep < this.tutorialSteps.length - 1) {
            this.currentTutorialStep++;
            this.updateTutorialStep();
        } else {
            this.closeTutorial();
        }
    }
    
    prevTutorialStep() {
        if (this.currentTutorialStep > 0) {
            this.currentTutorialStep--;
            this.updateTutorialStep();
        }
    }
    
    updateTutorialStep() {
        const step = this.tutorialSteps[this.currentTutorialStep];
        const elements = {
            title: document.getElementById('tutorialTitle'),
            text: document.getElementById('tutorialText'),
            progress: document.getElementById('tutorialProgress'),
            prevBtn: document.getElementById('prevTutorial'),
            nextBtn: document.getElementById('nextTutorial')
        };
        
        if (elements.title) elements.title.textContent = step.title;
        if (elements.text) elements.text.textContent = step.text;
        if (elements.progress) {
            elements.progress.textContent = `${this.currentTutorialStep + 1} / ${this.tutorialSteps.length}`;
        }
        
        if (elements.prevBtn) {
            elements.prevBtn.disabled = this.currentTutorialStep === 0;
        }
        
        if (elements.nextBtn) {
            elements.nextBtn.textContent = this.currentTutorialStep === this.tutorialSteps.length - 1 ? 
                'Finalizar' : 'Proximo →';
        }
    }
    
    openSettings() {
        const settingsModal = document.getElementById('settingsModal');
        if (settingsModal) {
            this.loadCurrentSettings();
            settingsModal.style.display = 'flex';
        }
    }
    
    closeSettings() {
        const settingsModal = document.getElementById('settingsModal');
        if (settingsModal) {
            settingsModal.style.display = 'none';
        }
    }
    
    loadCurrentSettings() {
        // Load current settings into the form
        const settings = JSON.parse(localStorage.getItem('sortingAppSettings') || '{}');
        
        const elements = {
            soundEffects: document.getElementById('soundEffects'),
            darkTheme: document.getElementById('darkTheme'),
            arraySizeSlider: document.getElementById('arraySizeSlider'),
            arraySizeValue: document.getElementById('arraySizeValue'),
            showValues: document.getElementById('showValues')
        };
        
        if (elements.soundEffects) {
            elements.soundEffects.checked = settings.soundEffects !== false;
        }
        
        if (elements.darkTheme) {
            elements.darkTheme.checked = settings.darkTheme !== false;
        }
        
        if (elements.arraySizeSlider) {
            elements.arraySizeSlider.value = settings.arraySize || 15;
            if (elements.arraySizeValue) {
                elements.arraySizeValue.textContent = settings.arraySize || 15;
            }
            
            elements.arraySizeSlider.addEventListener('input', (e) => {
                if (elements.arraySizeValue) {
                    elements.arraySizeValue.textContent = e.target.value;
                }
            });
        }
        
        if (elements.showValues) {
            elements.showValues.checked = settings.showValues !== false;
        }
    }
    
    saveSettings() {
        const settings = {
            soundEffects: document.getElementById('soundEffects')?.checked || true,
            darkTheme: document.getElementById('darkTheme')?.checked || true,
            arraySize: parseInt(document.getElementById('arraySizeSlider')?.value || 15),
            showValues: document.getElementById('showValues')?.checked || true
        };
        
        localStorage.setItem('sortingAppSettings', JSON.stringify(settings));
        this.applySettings(settings);
        this.closeSettings();
        
        this.gamificationController.showNotification('Configuracoes salvas!', 'success');
    }
    
    applySettings(settings) {
        // Apply the settings to the application
        if (settings.arraySize && settings.arraySize !== 15) {
            // Regenerate array with new size
            this.visualizationController.generateRandomArray(settings.arraySize);
        }
        
        // Apply theme changes, sound settings, etc.
        if (!settings.darkTheme) {
            document.body.classList.add('light-theme');
        } else {
            document.body.classList.remove('light-theme');
        }
        
        // Apply sound settings
        if (this.soundController) {
            this.soundController.setEnabled(settings.soundEffects !== false);
        }
    }
    
    // ===== EXPORT AND SHARING METHODS =====
    
    showExportOptions() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'flex';
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>💾 Opcoes de Export</h3>
                    <button id="closeExportModal" class="btn btn-outline">✕</button>
                </div>
                <div class="modal-body">
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        <button id="exportStats" class="btn btn-primary">📊 Exportar Estatisticas (JSON)</button>
                        <button id="exportImage" class="btn btn-primary">🖼️ Capturar Visualizacao (PNG)</button>
                        <button id="exportReport" class="btn btn-primary">📄 Gerar Relatorio (HTML)</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners
        modal.querySelector('#closeExportModal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.querySelector('#exportStats').addEventListener('click', () => {
            try {
                this.exportController.exportStatistics(this.gamificationController);
                modal.remove();
                this.gamificationController.showNotification('Estatisticas exportadas!', 'success');
            } catch (error) {
                this.gamificationController.showNotification('Erro ao exportar estatisticas', 'error');
            }
        });
        
        modal.querySelector('#exportImage').addEventListener('click', async () => {
            try {
                const container = document.getElementById('arrayBars');
                if (container && container.children.length > 0) {
                    await this.exportController.exportArrayAsImage(container.parentElement);
                    modal.remove();
                    this.gamificationController.showNotification('Imagem exportada!', 'success');
                } else {
                    this.gamificationController.showNotification('Nenhuma visualizacao disponivel', 'error');
                }
            } catch (error) {
                this.gamificationController.showNotification('Erro ao exportar imagem', 'error');
            }
        });
        
        modal.querySelector('#exportReport').addEventListener('click', () => {
            try {
                this.exportController.generatePerformanceReport(this.gamificationController);
                modal.remove();
                this.gamificationController.showNotification('Relatorio gerado!', 'success');
            } catch (error) {
                this.gamificationController.showNotification('Erro ao gerar relatorio', 'error');
            }
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    async shareCurrentResults() {
        if (!this.currentAlgorithm) {
            this.gamificationController.showNotification('Complete um algoritmo primeiro!', 'info');
            return;
        }
        
        const stats = {
            algorithm: ALGORITHMS[this.currentAlgorithm]?.name || this.currentAlgorithm,
            comparisons: this.visualizationController.comparisons,
            swaps: this.visualizationController.swaps,
            time: this.visualizationController.startTime ? 
                  Math.floor((Date.now() - this.visualizationController.startTime) / 1000) : 0
        };
        
        try {
            await this.exportController.shareResults(stats, stats.algorithm);
        } catch (error) {
            if (error.message.includes('copiado')) {
                this.gamificationController.showNotification(error.message, 'success');
            } else {
                this.gamificationController.showNotification('Erro ao compartilhar', 'error');
            }
        }
    }
    
    showExportOptions() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'flex';
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>💾 Opcoes de Export</h3>
                    <button id="closeExportModal" class="btn btn-outline">✕</button>
                </div>
                <div class="modal-body">
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        <button id="exportStats" class="btn btn-primary">📊 Exportar Estatisticas (JSON)</button>
                        <button id="exportImage" class="btn btn-primary">🖼️ Capturar Visualizacao (PNG)</button>
                        <button id="exportReport" class="btn btn-primary">📄 Gerar Relatorio (HTML)</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners
        modal.querySelector('#closeExportModal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.querySelector('#exportStats').addEventListener('click', () => {
            try {
                this.exportController.exportStatistics(this.gamificationController);
                modal.remove();
                this.gamificationController.showNotification('Estatisticas exportadas!', 'success');
            } catch (error) {
                this.gamificationController.showNotification('Erro ao exportar estatisticas', 'error');
            }
        });
        
        modal.querySelector('#exportImage').addEventListener('click', async () => {
            try {
                const container = document.getElementById('arrayBars');
                if (container && container.children.length > 0) {
                    await this.exportController.exportArrayAsImage(container.parentElement);
                    modal.remove();
                    this.gamificationController.showNotification('Imagem exportada!', 'success');
                } else {
                    this.gamificationController.showNotification('Nenhuma visualizacao disponivel', 'error');
                }
            } catch (error) {
                this.gamificationController.showNotification('Erro ao exportar imagem', 'error');
            }
        });
        
        modal.querySelector('#exportReport').addEventListener('click', () => {
            try {
                this.exportController.generatePerformanceReport(this.gamificationController);
                modal.remove();
                this.gamificationController.showNotification('Relatorio gerado!', 'success');
            } catch (error) {
                this.gamificationController.showNotification('Erro ao gerar relatorio', 'error');
            }
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    async shareCurrentResults() {
        if (!this.currentAlgorithm) {
            this.gamificationController.showNotification('Complete um algoritmo primeiro!', 'info');
            return;
        }
        
        const stats = {
            algorithm: ALGORITHMS[this.currentAlgorithm]?.name || this.currentAlgorithm,
            comparisons: this.visualizationController.comparisons,
            swaps: this.visualizationController.swaps,
            time: this.visualizationController.startTime ? 
                  Math.floor((Date.now() - this.visualizationController.startTime) / 1000) : 0
        };
        
        try {
            await this.exportController.shareResults(stats, stats.algorithm);
        } catch (error) {
            if (error.message.includes('copiado')) {
                this.gamificationController.showNotification(error.message, 'success');
            } else {
                this.gamificationController.showNotification('Erro ao compartilhar', 'error');
            }
        }
    }
    startComparison() {
        const alg1 = document.getElementById('algorithm1Select').value;
        const alg2 = document.getElementById('algorithm2Select').value;
        
        if (alg1 === alg2) {
            this.gamificationController.showNotification('Selecione algoritmos diferentes!', 'error');
            return;
        }
        
        // Update comparison names
        document.getElementById('compAlg1Name').textContent = ALGORITHMS[alg1]?.name || alg1;
        document.getElementById('compAlg2Name').textContent = ALGORITHMS[alg2]?.name || alg2;
        
        // Reset stats
        ['compComparisons1', 'compSwaps1', 'compTime1'].forEach(id => {
            document.getElementById(id).textContent = '0';
        });
        ['compComparisons2', 'compSwaps2', 'compTime2'].forEach(id => {
            document.getElementById(id).textContent = '0';
        });
        
        // Start simulated comparison
        this.simulateComparison(alg1, alg2);
        
        if (this.soundController) {
            this.soundController.playSuccessSound();
        }
    }
    
    simulateComparison(alg1, alg2) {
        try {
            // Generate same array for fair comparison
            const arraySize = 12;
            const testArray = Array.from({length: arraySize}, () => Math.floor(Math.random() * 90) + 10);
            
            console.log('🔄 Iniciando comparação:', alg1, 'vs', alg2);
            console.log('📊 Array de teste:', testArray);
            
            // Simulate running both algorithms with animation delay
            const result1 = this.simulateAlgorithm(alg1, [...testArray]);
            const result2 = this.simulateAlgorithm(alg2, [...testArray]);
            
            // Update displays with animation
            setTimeout(() => {
                this.updateComparisonDisplay('compArray1', testArray, result1.finalArray);
                this.updateComparisonDisplay('compArray2', testArray, result2.finalArray);
            }, 100);
            
            // Update stats with animation
            this.animateStatUpdate('compComparisons1', result1.comparisons);
            this.animateStatUpdate('compSwaps1', result1.swaps);
            this.animateStatUpdate('compTime1', result1.time, 'ms');
            
            this.animateStatUpdate('compComparisons2', result2.comparisons);
            this.animateStatUpdate('compSwaps2', result2.swaps);
            this.animateStatUpdate('compTime2', result2.time, 'ms');
            
            // Show winner after animation
            setTimeout(() => this.showComparisonWinner(result1, result2, alg1, alg2), 2000);
            
        } catch (error) {
            console.error('❌ Erro na comparação:', error);
            this.gamificationController.showNotification('Erro ao executar comparação!', 'error');
        }
    }
    
    simulateAlgorithm(algorithm, array) {
        const startTime = performance.now();
        
        // More realistic algorithm complexity based on Big O notation
        const algorithmComplexity = {
            'bubble': { compFactor: 1.8, swapFactor: 1.5, timeBase: 50 },
            'selection': { compFactor: 1.2, swapFactor: 0.9, timeBase: 35 },
            'insertion': { compFactor: 0.9, swapFactor: 0.7, timeBase: 25 },
            'quick': { compFactor: 0.4, swapFactor: 0.3, timeBase: 15 },
            'merge': { compFactor: 0.3, swapFactor: 0.2, timeBase: 20 },
            'heap': { compFactor: 0.5, swapFactor: 0.4, timeBase: 30 },
            'radix': { compFactor: 0.2, swapFactor: 0.1, timeBase: 10 }
        };
        
        const complexity = algorithmComplexity[algorithm] || algorithmComplexity['bubble'];
        const n = array.length;
        
        // Calculate more realistic stats based on array size
        const comparisons = Math.floor(n * n * complexity.compFactor * (0.3 + Math.random() * 0.7));
        const swaps = Math.floor(n * complexity.swapFactor * (0.2 + Math.random() * 0.8));
        
        // Create final sorted array
        const finalArray = [...array].sort((a, b) => a - b);
        
        // Simulate realistic execution time
        const simulatedTime = Math.floor(complexity.timeBase * (0.5 + Math.random() * 1.5));
        
        return { 
            comparisons, 
            swaps, 
            time: simulatedTime, 
            finalArray,
            algorithm,
            efficiency: this.calculateEfficiencyScore(comparisons, swaps, simulatedTime)
        };
    }
    
    updateComparisonDisplay(containerId, originalArray, sortedArray) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error('❌ Container não encontrado:', containerId);
            return;
        }
        
        container.innerHTML = '';
        
        const maxValue = Math.max(...originalArray);
        
        // Show original array first
        originalArray.forEach((value, index) => {
            const bar = document.createElement('div');
            bar.className = 'comparison-bar original';
            bar.style.cssText = `
                height: ${(value / maxValue) * 80}px;
                width: 18px;
                background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
                margin: 0 1px;
                border-radius: 3px;
                display: inline-block;
                position: relative;
                transition: all 1s ease-in-out;
                opacity: 0.7;
            `;
            
            const label = document.createElement('span');
            label.textContent = value;
            label.style.cssText = `
                position: absolute;
                bottom: -18px;
                left: 50%;
                transform: translateX(-50%);
                font-size: 9px;
                color: var(--text-secondary);
                font-weight: 600;
            `;
            
            bar.appendChild(label);
            container.appendChild(bar);
            
            // Animate to sorted position after delay
            setTimeout(() => {
                const sortedValue = sortedArray[index];
                const sortedHeight = (sortedValue / maxValue) * 80;
                
                bar.style.height = sortedHeight + 'px';
                bar.style.background = 'linear-gradient(135deg, #51cf66 0%, #40c057 100%)';
                bar.style.opacity = '1';
                bar.classList.remove('original');
                bar.classList.add('sorted');
                label.textContent = sortedValue;
            }, 500 + (index * 100));
        });
    }
    
    animateStatUpdate(elementId, finalValue, suffix = '') {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        let currentValue = 0;
        const increment = Math.ceil(finalValue / 20);
        
        const animate = () => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                element.textContent = finalValue + suffix;
                element.style.color = '#51cf66';
                setTimeout(() => {
                    element.style.color = 'var(--text-primary)';
                }, 1000);
            } else {
                element.textContent = currentValue + suffix;
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }
    
    calculateEfficiencyScore(comparisons, swaps, time) {
        // Lower values = better efficiency
        const score = 1000 - (comparisons * 2 + swaps * 3 + time);
        return Math.max(0, score);
    }
    
    showComparisonWinner(result1, result2, alg1, alg2) {
        const totalScore1 = result1.efficiency;
        const totalScore2 = result2.efficiency;
        
        let winner, loser, winnerAlg, loserAlg;
        
        if (totalScore1 > totalScore2) {
            winner = result1;
            loser = result2;
            winnerAlg = alg1;
            loserAlg = alg2;
        } else {
            winner = result2;
            loser = result1;
            winnerAlg = alg2;
            loserAlg = alg1;
        }
        
        const algorithmNames = {
            'bubble': 'Bubble Sort',
            'selection': 'Selection Sort', 
            'insertion': 'Insertion Sort',
            'quick': 'Quick Sort',
            'merge': 'Merge Sort',
            'heap': 'Heap Sort',
            'radix': 'Radix Sort'
        };
        
        this.gamificationController.showNotification(
            `🏆 ${algorithmNames[winnerAlg]} venceu! \nEficiência: ${winner.efficiency} pontos\n${algorithmNames[loserAlg]}: ${loser.efficiency} pontos`,
            'success',
            4000
        );
    }
    
    updatePerformanceChart(gameStats) {
        const canvas = document.getElementById('performanceChart');
        if (!canvas) {
            console.warn('⚠️ Canvas performanceChart não encontrado');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Set up chart dimensions
        const margin = 50;
        const chartWidth = canvas.width - (margin * 2);
        const chartHeight = canvas.height - (margin * 2);
        
        // Sample data - in a real app, this would come from actual sorting history
        const algorithms = ['Bubble', 'Selection', 'Insertion', 'Quick', 'Merge', 'Heap'];
        const performanceData = [
            { name: 'Bubble', comparisons: gameStats.avgComparisons * 1.8 || 120, time: 45, color: '#ff6b6b' },
            { name: 'Selection', comparisons: gameStats.avgComparisons * 1.2 || 80, time: 35, color: '#4ecdc4' },
            { name: 'Insertion', comparisons: gameStats.avgComparisons * 0.9 || 60, time: 25, color: '#45b7d1' },
            { name: 'Quick', comparisons: gameStats.avgComparisons * 0.4 || 30, time: 15, color: '#96ceb4' },
            { name: 'Merge', comparisons: gameStats.avgComparisons * 0.3 || 25, time: 20, color: '#ffeaa7' },
            { name: 'Heap', comparisons: gameStats.avgComparisons * 0.5 || 40, time: 30, color: '#dda0dd' }
        ];
        
        // Draw axes
        ctx.strokeStyle = '#666';
        ctx.lineWidth = 2;
        ctx.beginPath();
        // Y axis
        ctx.moveTo(margin, margin);
        ctx.lineTo(margin, canvas.height - margin);
        // X axis
        ctx.lineTo(canvas.width - margin, canvas.height - margin);
        ctx.stroke();
        
        // Draw labels
        ctx.fillStyle = '#333';
        ctx.font = 'bold 14px Arial';
        ctx.fillText('Comparações', 10, margin - 10);
        ctx.fillText('Algoritmos', canvas.width / 2 - 40, canvas.height - 10);
        
        // Draw bars
        const barWidth = chartWidth / performanceData.length - 10;
        const maxComparisons = Math.max(...performanceData.map(d => d.comparisons));
        
        performanceData.forEach((data, index) => {
            const barHeight = (data.comparisons / maxComparisons) * chartHeight;
            const x = margin + (index * (barWidth + 10));
            const y = canvas.height - margin - barHeight;
            
            // Draw bar with gradient
            const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
            gradient.addColorStop(0, data.color);
            gradient.addColorStop(1, data.color + '80');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(x, y, barWidth, barHeight);
            
            // Draw bar border
            ctx.strokeStyle = data.color;
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, barWidth, barHeight);
            
            // Draw algorithm name
            ctx.fillStyle = '#333';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(data.name, x + barWidth/2, canvas.height - margin + 20);
            
            // Draw value on top of bar
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 11px Arial';
            ctx.fillText(data.comparisons.toString(), x + barWidth/2, y - 5);
        });
        
        // Reset text alignment
        ctx.textAlign = 'left';
    }
    
    exitComparisonMode() {
        const comparisonMode = document.getElementById('comparisonMode');
        if (comparisonMode) {
            comparisonMode.style.display = 'none';
        }
        
        if (this.soundController) {
            this.soundController.playButtonSound();
        }
    }
    
    closeDashboard() {
        const statsDashboard = document.getElementById('statsDashboard');
        if (statsDashboard) {
            statsDashboard.style.display = 'none';
        }
        
        if (this.soundController) {
            this.soundController.playButtonSound();
        }
    }
    
    resetSettings() {
        // Reset to default settings
        const defaultSettings = {
            soundEffects: true,
            darkTheme: true,
            arraySize: 15,
            showValues: true,
            detailedTiming: true
        };
        
        localStorage.setItem('sortingAppSettings', JSON.stringify(defaultSettings));
        this.loadCurrentSettings();
        this.applySettings(defaultSettings);
        
        this.gamificationController.showNotification('Configuracoes restauradas!', 'success');
        
        if (this.soundController) {
            this.soundController.playButtonSound();
        }
    }
    
    showEducationalWelcome(algorithm) {
        const algorithmInfo = ALGORITHMS[algorithm];
        if (!algorithmInfo) return;
        
        // Show enhanced notification with educational tips
        const welcomeMessage = `🎓 Agora voce esta aprendendo ${algorithmInfo.name}! Explore as abas educacionais para entender melhor.`;
        
        if (this.gamificationController && this.gamificationController.showNotification) {
            this.gamificationController.showNotification(welcomeMessage, 'info', 3000);
        }
        
        // Update step information with educational context
        if (window.educationalController) {
            window.educationalController.updateCurrentStep(
                1,
                `Comecando com ${algorithmInfo.name}`,
                'Explore as abas educacionais para entender melhor como este algoritmo funciona!',
                '💡 Dica: Comece pela aba "Como Funciona" para ver analogias do mundo real!'
            );
        }
    }
    
    // Enhanced method to update educational step during sorting
    updateEducationalStep(stepNumber, action, explanation) {
        if (window.educationalController) {
            const hints = {
                compare: '👀 Observe como os elementos sao comparados!',
                swap: '🔄 Veja a troca happening in real-time!',
                move: '➡️ Elemento sendo movido para a posicao correta!',
                partition: '📍 Dividindo o array em partes menores!',
                merge: '🤝 Combinando arrays ordenados!',
                heapify: '🏔️ Mantendo a propriedade do heap!',
                complete: '🎉 Algoritmo concluido com sucesso!'
            };
            
            window.educationalController.updateCurrentStep(
                stepNumber,
                action,
                explanation,
                hints[action.toLowerCase().split(' ')[0]] || '💡 Continue observando o processo!'
            );
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('🚀 Inicializando SortingGameApp...');
        
        // Verificar se todos os componentes necessários estão carregados
        if (typeof VisualizationController === 'undefined') {
            throw new Error('VisualizationController não encontrado');
        }
        
        if (typeof ALGORITHMS === 'undefined') {
            throw new Error('ALGORITHMS não encontrado');
        }
        
        if (!window.progressController) {
            throw new Error('progressController não encontrado');
        }
        
        window.sortingApp = new SortingGameApp();
        console.log('✅ SortingGameApp inicializado com sucesso!');
        
        console.log('🎮 Sorting Game App initialized!');
        console.log('Keyboard shortcuts:');
        console.log('- Space: Start sorting');
        console.log('- R: Reset');
        console.log('- G: Generate new array');
        console.log('- Escape: Back to selection');
        console.log('- 1-7: Select algorithm');
        
    } catch (error) {
        console.error('❌ Erro ao inicializar aplicacao:', error);
        console.error('Stack trace:', error.stack);
        
        // Mostrar erro de forma menos intrusiva
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff4757;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            z-index: 10000;
            max-width: 300px;
            font-family: Arial, sans-serif;
        `;
        errorDiv.innerHTML = `
            <strong>⚠️ Erro de carregamento</strong><br>
            ${error.message}<br>
            <small>Verifique o console para mais detalhes</small>
        `;
        document.body.appendChild(errorDiv);
        
        // Remover erro após 10 segundos
        setTimeout(() => errorDiv.remove(), 10000);
    }
});
