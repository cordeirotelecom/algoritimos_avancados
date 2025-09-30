// ===== CUSTOM DATA CONTROLLER =====

class CustomDataController {
    constructor(visualizationController = null, gamificationController = null) {
        this.visualizationController = visualizationController;
        this.gamificationController = gamificationController;
        this.currentDataType = 'numbers';
        this.currentInputMethod = 'manual';
        this.customData = [];
        this.isCustomDataActive = false;
        
        this.predefinedExamples = {
            numbers: [
                {
                    title: '🎲 Numeros Aleatorios',
                    data: '42, 17, 89, 3, 56, 23, 91, 8, 67, 35',
                    description: 'Conjunto de numeros aleatorios para praticar'
                },
                {
                    title: '📅 Anos Historicos',
                    data: '1889, 1922, 1500, 1945, 2000, 1964, 1888, 1930',
                    description: 'Anos importantes da historia do Brasil'
                },
                {
                    title: '🌡️ Temperaturas',
                    data: '25.5, 18.2, 32.1, 15.8, 28.9, 22.3, 35.7, 12.4',
                    description: 'Temperaturas em graus Celsius'
                },
                {
                    title: '📊 Notas de Prova',
                    data: '8.5, 9.2, 7.1, 6.8, 9.7, 8.0, 5.9, 10.0, 7.5',
                    description: 'Notas de uma turma (0-10)'
                }
            ],
            words: [
                {
                    title: '👥 Nomes Brasileiros',
                    data: 'Ana, Bruno, Carlos, Diana, Eduardo, Fernanda, Gabriel, Helena',
                    description: '🎯 Ordene nomes de pessoas por ordem alfabetica'
                },
                {
                    title: '🏙️ Cidades Brasileiras',
                    data: 'Sao Paulo, Rio de Janeiro, Brasilia, Salvador, Fortaleza, Belo Horizonte, Manaus, Curitiba',
                    description: '🏛️ Principais cidades do Brasil em ordem alfabetica'
                },
                {
                    title: '🍎 Frutas Deliciosas',
                    data: 'Banana, Maca, Laranja, Uva, Pera, Abacaxi, Manga, Morango',
                    description: '🍇 Frutas comuns organizadas alfabeticamente'
                },
                {
                    title: '🐕 Reino Animal',
                    data: 'Zebra, Gato, Elefante, Cachorro, Avestruz, Tigre, Borboleta, Leao',
                    description: '🦁 Animais diversos para praticar ordenacao'
                },
                {
                    title: '📚 Materias Escolares',
                    data: 'Matematica, Historia, Geografia, Portugues, Ciencias, Ingles, Artes, Educacao Fisica',
                    description: '🎓 Disciplinas da escola em ordem alfabetica'
                },
                {
                    title: '🌈 Cores do Arco-iris',
                    data: 'Vermelho, Azul, Verde, Amarelo, Roxo, Rosa, Laranja, Preto',
                    description: '🎨 Cores basicas organizadas em ordem alfabetica'
                }
            ],
            phrases: [
                {
                    title: '👋 Cumprimentos Diarios',
                    data: '"Bom dia", "Boa tarde", "Boa noite", "Ola", "Oi", "Como vai", "Tudo bem"',
                    description: '😊 Frases de cumprimento organizadas alfabeticamente'
                },
                {
                    title: '🏛️ Sabedoria Popular',
                    data: '"Agua mole em pedra dura", "Quem nao tem cao caca com gato", "De grao em grao a galinha enche o papo", "Antes tarde do que nunca"',
                    description: '📜 Ditados brasileiros em ordem alfabetica'
                },
                {
                    title: '🎵 Musica Brasileira',
                    data: '"Rock Nacional", "Musica Popular Brasileira", "Funk Carioca", "Sertanejo Universitario", "Bossa Nova", "Forro", "Axe Music"',
                    description: '🎶 Generos musicais do Brasil ordenados'
                },
                {
                    title: '🏆 Futebol Brasileiro',
                    data: '"Flamengo", "Corinthians", "Sao Paulo", "Palmeiras", "Santos", "Vasco da Gama", "Botafogo", "Fluminense"',
                    description: '⚽ Grandes times do futebol nacional'
                }
            ]
        };
        
        // Inicializar depois que o DOM estiver pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeEventListeners());
        } else {
            this.initializeEventListeners();
        }
    }

    initializeEventListeners() {
        // Modal controls
        const customDataBtn = document.getElementById('customDataBtn');
        const closeCustomData = document.getElementById('closeCustomData');
        const customDataModal = document.getElementById('customDataModal');

        if (customDataBtn) {
            customDataBtn.addEventListener('click', () => this.openCustomDataModal());
        } else {
            console.warn('CustomDataController: customDataBtn nao encontrado');
        }

        if (closeCustomData) {
            closeCustomData.addEventListener('click', () => this.closeCustomDataModal());
        } else {
            console.warn('CustomDataController: closeCustomData nao encontrado');
        }

        // Close modal when clicking outside
        if (customDataModal) {
            customDataModal.addEventListener('click', (e) => {
                if (e.target === customDataModal) {
                    this.closeCustomDataModal();
                }
            });
        } else {
            console.error('CustomDataController: customDataModal nao encontrado no DOM');
        }

        // Data type selection
        document.querySelectorAll('.data-type-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectDataType(e.target.dataset.type);
            });
        });

        // Input method selection
        document.querySelectorAll('.input-tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectInputMethod(e.target.dataset.method);
            });
        });

        // Input field changes
        const customDataInput = document.getElementById('customDataInput');
        if (customDataInput) {
            customDataInput.addEventListener('input', () => this.updatePreview());
            customDataInput.addEventListener('paste', () => {
                setTimeout(() => this.updatePreview(), 100);
            });
        }

        // Action buttons
        const clearBtn = document.getElementById('clearCustomData');
        const applyBtn = document.getElementById('applyCustomData');

        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearData());
        }

        if (applyBtn) {
            applyBtn.addEventListener('click', () => this.applyCustomData());
        }
    }

    openCustomDataModal() {
        const modal = document.getElementById('customDataModal');
        if (modal) {
            modal.style.display = 'flex';
            this.loadExamples();
            this.updatePreview();
            
            // Focus on input field
            setTimeout(() => {
                const input = document.getElementById('customDataInput');
                if (input) input.focus();
            }, 300);
        } else {
            // Fallback: criar modal simples se nao existir
            this.createFallbackModal();
        }
    }
    
    createFallbackModal() {
        const data = prompt('📝 Entre com seus dados separados por virgula:\n\nExemplos:\n• Numeros: 42, 17, 89, 23\n• Palavras: Ana, Bruno, Carlos\n• Frases: "Bom dia", "Boa tarde"');
        
        if (data && data.trim()) {
            this.parseAndApplyData(data.trim());
        }
    }
    
    parseAndApplyData(inputValue) {
        try {
            let data;
            let type;
            
            if (inputValue.includes('"') || inputValue.includes("'")) {
                // Frases
                data = inputValue.split(',').map(item => item.trim().replace(/['"]/g, ''));
                type = 'phrases';
            } else if (isNaN(inputValue.split(',')[0].trim())) {
                // Palavras
                data = inputValue.split(',').map(item => item.trim());
                type = 'words';
            } else {
                // Numeros
                data = inputValue.split(',').map(item => parseFloat(item.trim())).filter(n => !isNaN(n));
                type = 'numbers';
            }
            
            if (data.length < 2) {
                alert('⚠️ e necessario pelo menos 2 elementos para ordenar!');
                return;
            }
            
            this.customData = data;
            this.currentDataType = type;
            this.applyCustomData();
            
        } catch (error) {
            alert(`❌ Erro ao processar dados: ${error.message}`);
        }
    }

    closeCustomDataModal() {
        const modal = document.getElementById('customDataModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    selectDataType(type) {
        this.currentDataType = type;
        
        // Update active button
        document.querySelectorAll('.data-type-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-type="${type}"]`).classList.add('active');
        
        // Update placeholder and hints
        this.updateInputPlaceholder();
        this.loadExamples();
        this.updatePreview();
    }

    selectInputMethod(method) {
        this.currentInputMethod = method;
        
        // Update active tab
        document.querySelectorAll('.input-tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-method="${method}"]`).classList.add('active');
        
        // Show/hide input methods
        document.querySelectorAll('.input-method').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(`${method}-input`).classList.add('active');
        
        if (method === 'examples') {
            this.loadExamples();
        }
    }

    updateInputPlaceholder() {
        const input = document.getElementById('customDataInput');
        if (!input) return;

        const placeholders = {
            numbers: 'Ex: 42, 13, 7, 89, 25, 156, 3, 91',
            words: 'Ex: Joao, Maria, Pedro, Ana, Carlos, Beatriz',
            phrases: 'Ex: "Bom dia", "Boa tarde", "Boa noite", "Como vai?"'
        };

        input.placeholder = placeholders[this.currentDataType] || 'Digite seus dados...';
    }

    loadExamples() {
        const examplesGrid = document.getElementById('examplesGrid');
        if (!examplesGrid) return;

        const examples = this.predefinedExamples[this.currentDataType] || [];
        
        examplesGrid.innerHTML = '';
        
        examples.forEach((example, index) => {
            const card = document.createElement('div');
            card.className = 'example-card';
            card.innerHTML = `
                <div class="example-title">
                    ${example.title}
                </div>
                <div class="example-data">
                    ${example.data}
                </div>
                <div class="example-description">
                    ${example.description}
                </div>
            `;
            
            card.addEventListener('click', () => {
                this.selectExample(example, card);
            });
            
            examplesGrid.appendChild(card);
        });
    }

    selectExample(example, cardElement) {
        // Update selected visual state
        document.querySelectorAll('.example-card').forEach(card => {
            card.classList.remove('selected');
        });
        cardElement.classList.add('selected');

        // Set the data in input field
        const input = document.getElementById('customDataInput');
        if (input) {
            input.value = example.data;
            this.updatePreview();
        }

        // Show notification
        if (window.gamificationController) {
            window.gamificationController.showNotification(
                `📝 Exemplo selecionado: ${example.title}`,
                'info',
                2000
            );
        }
    }

    updatePreview() {
        const input = document.getElementById('customDataInput');
        const previewContainer = document.getElementById('dataPreview');
        const elementCount = document.getElementById('elementCount');
        const dataTypeDisplay = document.getElementById('dataTypeDisplay');

        if (!input || !previewContainer) return;

        const inputValue = input.value.trim();
        
        if (!inputValue) {
            previewContainer.innerHTML = '<p class="preview-placeholder">Digite dados acima para ver a previa...</p>';
            elementCount.textContent = '0';
            dataTypeDisplay.textContent = '-';
            this.customData = [];
            return;
        }

        try {
            this.customData = this.parseInput(inputValue);
            
            if (this.customData.length === 0) {
                previewContainer.innerHTML = '<p class="preview-placeholder">Dados invalidos. Verifique o formato.</p>';
                elementCount.textContent = '0';
                dataTypeDisplay.textContent = 'Erro';
                return;
            }

            // Create preview items
            const previewItems = document.createElement('div');
            previewItems.className = 'preview-items';
            
            this.customData.slice(0, 10).forEach(item => {
                const previewItem = document.createElement('div');
                previewItem.className = 'preview-item';
                previewItem.textContent = item.toString();
                previewItem.title = item.toString(); // Full text on hover
                previewItems.appendChild(previewItem);
            });

            if (this.customData.length > 10) {
                const moreItem = document.createElement('div');
                moreItem.className = 'preview-item';
                moreItem.style.background = 'var(--text-secondary)';
                moreItem.textContent = `+${this.customData.length - 10}`;
                previewItems.appendChild(moreItem);
            }

            previewContainer.innerHTML = '';
            previewContainer.appendChild(previewItems);
            
            // Update stats
            elementCount.textContent = this.customData.length;
            
            const typeNames = {
                numbers: 'Numeros',
                words: 'Palavras',
                phrases: 'Frases'
            };
            dataTypeDisplay.textContent = typeNames[this.currentDataType] || 'Personalizado';

            // Validate data
            this.validateData();

        } catch (error) {
            previewContainer.innerHTML = '<p class="preview-placeholder">Erro ao processar dados. Verifique o formato.</p>';
            elementCount.textContent = '0';
            dataTypeDisplay.textContent = 'Erro';
            console.error('Error parsing custom data:', error);
        }
    }

    parseInput(inputValue) {
        let data = [];
        
        if (this.currentDataType === 'phrases') {
            // For phrases, look for quoted strings
            const matches = inputValue.match(/"([^"]*)"/g);
            if (matches) {
                data = matches.map(match => match.slice(1, -1)); // Remove quotes
            } else {
                // Fallback: split by comma if no quotes found
                data = inputValue.split(',').map(item => item.trim()).filter(item => item);
            }
        } else {
            // For numbers and words, split by comma or multiple spaces
            data = inputValue.split(/[,\s]+/).map(item => item.trim()).filter(item => item);
        }

        // Convert numbers if needed
        if (this.currentDataType === 'numbers') {
            data = data.map(item => {
                const num = parseFloat(item);
                return isNaN(num) ? item : num; // Keep original if not a valid number
            });
        }

        return data;
    }

    validateData() {
        const applyBtn = document.getElementById('applyCustomData');
        if (!applyBtn) return;

        if (this.customData.length < 2) {
            applyBtn.disabled = true;
            applyBtn.textContent = '⚠️ Minimo 2 elementos';
            return;
        }

        if (this.customData.length > 50) {
            applyBtn.disabled = true;
            applyBtn.textContent = '⚠️ Maximo 50 elementos';
            return;
        }

        applyBtn.disabled = false;
        applyBtn.textContent = '✅ Aplicar Dados';
    }

    clearData() {
        const input = document.getElementById('customDataInput');
        if (input) {
            input.value = '';
            this.updatePreview();
        }

        // Clear selected examples
        document.querySelectorAll('.example-card').forEach(card => {
            card.classList.remove('selected');
        });
    }

    applyCustomData() {
        if (this.customData.length < 2) {
            if (this.gamificationController) {
                this.gamificationController.showNotification(
                    '⚠️ e necessario pelo menos 2 elementos para ordenar!',
                    'error'
                );
            } else if (window.gamificationController) {
                window.gamificationController.showNotification(
                    '⚠️ e necessario pelo menos 2 elementos para ordenar!',
                    'error'
                );
            } else {
                alert('⚠️ e necessario pelo menos 2 elementos para ordenar!');
            }
            return;
        }

        this.isCustomDataActive = true;
        
        // Apply data to visualization usando referencia direta ou fallback
        if (this.visualizationController) {
            this.visualizationController.setCustomData(this.customData, this.currentDataType);
        } else if (window.sortingApp && window.sortingApp.visualizationController) {
            window.sortingApp.visualizationController.setCustomData(this.customData, this.currentDataType);
        } else {
            console.error('CustomDataController: Visualization controller nao encontrado');
            alert('Erro: Sistema de visualizacao nao encontrado. Por favor, recarregue a pagina.');
            return;
        }

        // Close modal
        this.closeCustomDataModal();

        // Show success notification
        if (this.gamificationController) {
            this.gamificationController.showNotification(
                `🎯 Dados personalizados aplicados! ${this.customData.length} elementos carregados.`,
                'success',
                3000
            );
            // Award points for using custom data
            this.gamificationController.addScore(50);
        } else if (window.gamificationController) {
            window.gamificationController.showNotification(
                `🎯 Dados personalizados aplicados! ${this.customData.length} elementos carregados.`,
                'success',
                3000
            );
            window.gamificationController.addScore(50);
        } else {
            // Fallback: mostrar alert simples
            alert(`🎯 Dados personalizados aplicados com sucesso!\n${this.customData.length} elementos carregados.`);
        }

        // Update educational controller
        if (window.educationalController) {
            const typeNames = {
                numbers: 'numeros',
                words: 'palavras', 
                phrases: 'frases'
            };
            
            window.educationalController.updateCurrentStep(
                1,
                `Dados Personalizados Carregados`,
                `Agora voce esta ordenando ${this.customData.length} ${typeNames[this.currentDataType]} personalizadas! Veja como o algoritmo processa seus proprios dados.`,
                '🎯 Dica: Observe como seus dados sao comparados e organizados!'
            );
        }
    }

    getCurrentData() {
        return {
            data: this.customData,
            type: this.currentDataType,
            isActive: this.isCustomDataActive
        };
    }

    resetCustomData() {
        this.isCustomDataActive = false;
        this.customData = [];
    }

    // Method to get display text for visualization
    getDisplayText(value) {
        if (this.currentDataType === 'numbers') {
            return value.toString();
        } else if (this.currentDataType === 'words') {
            return value.toString();
        } else if (this.currentDataType === 'phrases') {
            // Truncate long phrases for display
            const text = value.toString();
            return text.length > 12 ? text.substring(0, 12) + '...' : text;
        }
        return value.toString();
    }

    // Method to get sorting value (for comparison)
    getSortingValue(value) {
        if (this.currentDataType === 'numbers') {
            return typeof value === 'number' ? value : parseFloat(value) || 0;
        } else {
            // For strings, use localeCompare for proper alphabetical sorting
            return value.toString().toLowerCase();
        }
    }

    // Method to compare two values
    compareValues(a, b) {
        if (this.currentDataType === 'numbers') {
            const numA = this.getSortingValue(a);
            const numB = this.getSortingValue(b);
            return numA - numB;
        } else {
            const strA = this.getSortingValue(a);
            const strB = this.getSortingValue(b);
            return strA.localeCompare(strB, 'pt-BR');
        }
    }
}

// Initialize custom data controller when DOM is loaded
window.customDataController = null;

document.addEventListener('DOMContentLoaded', () => {
    window.customDataController = new CustomDataController();
});
