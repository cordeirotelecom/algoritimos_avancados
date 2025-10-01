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
                    description: '🎯 Conjunto de numeros aleatorios para praticar algoritmos'
                },
                {
                    title: '📅 Anos Historicos',
                    data: '1889, 1922, 1500, 1945, 2000, 1964, 1888, 1930, 1985, 1992',
                    description: '📚 Anos importantes da historia do Brasil'
                },
                {
                    title: '🌡️ Temperaturas',
                    data: '25.5, 18.2, 32.1, 15.8, 28.9, 22.3, 35.7, 12.4, 41.2, 8.9',
                    description: '🌡️ Temperaturas em graus Celsius de diferentes cidades'
                },
                {
                    title: '📊 Notas de Prova',
                    data: '8.5, 9.2, 7.1, 6.8, 9.7, 8.0, 5.9, 10.0, 7.5, 6.2',
                    description: '🎓 Notas de uma turma (escala 0-10)'
                },
                {
                    title: '💰 Preços de Produtos',
                    data: '15.99, 23.50, 8.75, 45.00, 12.25, 67.80, 29.90, 5.49',
                    description: '🛒 Preços em reais para ordenação por valor'
                },
                {
                    title: '⏱️ Tempos de Corrida',
                    data: '12.5, 15.2, 11.8, 14.7, 13.1, 16.9, 10.5, 18.3',
                    description: '🏃 Tempos em segundos de uma corrida de 100m'
                }
            ],
            words: [
                {
                    title: '👥 Nomes Brasileiros',
                    data: 'Ana, Bruno, Carlos, Diana, Eduardo, Fernanda, Gabriel, Helena, Igor, Julia',
                    description: '👤 Ordene nomes de pessoas por ordem alfabetica'
                },
                {
                    title: '🏙️ Cidades Brasileiras',
                    data: 'Sao Paulo, Rio de Janeiro, Brasilia, Salvador, Fortaleza, Belo Horizonte, Manaus, Curitiba, Porto Alegre, Recife',
                    description: '🏛️ Principais cidades do Brasil em ordem alfabetica'
                },
                {
                    title: '🍎 Frutas Deliciosas',
                    data: 'Banana, Maca, Laranja, Uva, Pera, Abacaxi, Manga, Morango, Kiwi, Coco',
                    description: '� Frutas comuns organizadas alfabeticamente'
                },
                {
                    title: '🐕 Reino Animal',
                    data: 'Zebra, Gato, Elefante, Cachorro, Avestruz, Tigre, Borboleta, Leao, Macaco, Pinguim',
                    description: '🦁 Animais diversos para praticar ordenacao'
                },
                {
                    title: '📚 Materias Escolares',
                    data: 'Matematica, Historia, Geografia, Portugues, Ciencias, Ingles, Artes, Educacao Fisica, Filosofia, Quimica',
                    description: '🎓 Disciplinas da escola em ordem alfabetica'
                },
                {
                    title: '🌈 Cores Vibrantes',
                    data: 'Vermelho, Azul, Verde, Amarelo, Roxo, Rosa, Laranja, Preto, Branco, Marrom',
                    description: '🎨 Cores diversas organizadas em ordem alfabetica'
                },
                {
                    title: '🎵 Instrumentos Musicais',
                    data: 'Violao, Piano, Bateria, Flauta, Saxofone, Trompete, Violino, Guitarra',
                    description: '🎼 Instrumentos musicais em ordem alfabetica'
                },
                {
                    title: '🚗 Marcas de Carros',
                    data: 'Toyota, Honda, Ford, Chevrolet, Volkswagen, Nissan, BMW, Mercedes, Audi, Fiat',
                    description: '🏎️ Marcas automotivas famosas'
                }
            ],
            phrases: [
                {
                    title: '👋 Cumprimentos Diarios',
                    data: '"Bom dia", "Boa tarde", "Boa noite", "Ola", "Oi", "Como vai", "Tudo bem", "Ate logo"',
                    description: '😊 Frases de cumprimento organizadas alfabeticamente'
                },
                {
                    title: '🏛️ Sabedoria Popular',
                    data: '"Agua mole em pedra dura", "Quem nao tem cao caca com gato", "De grao em grao a galinha enche o papo", "Antes tarde do que nunca", "Quem semeia vento colhe tempestade"',
                    description: '📜 Ditados populares brasileiros em ordem alfabetica'
                },
                {
                    title: '🎵 Generos Musicais',
                    data: '"Rock Nacional", "Musica Popular Brasileira", "Funk Carioca", "Sertanejo Universitario", "Bossa Nova", "Forro", "Axe Music", "Pagode"',
                    description: '🎶 Generos musicais do Brasil ordenados'
                },
                {
                    title: '🏆 Times de Futebol',
                    data: '"Flamengo", "Corinthians", "Sao Paulo", "Palmeiras", "Santos", "Vasco da Gama", "Botafogo", "Fluminense", "Gremio", "Internacional"',
                    description: '⚽ Grandes times do futebol brasileiro'
                },
                {
                    title: '📚 Livros Classicos',
                    data: '"Dom Casmurro", "O Cortico", "Iracema", "Senhora", "O Guarani", "Capitaes da Areia", "Gabriela Cravo e Canela"',
                    description: '📖 Literatura brasileira classica'
                },
                {
                    title: '🌍 Paises da America do Sul',
                    data: '"Argentina", "Bolivia", "Brasil", "Chile", "Colombia", "Equador", "Paraguai", "Peru", "Uruguai", "Venezuela"',
                    description: '🗺️ Nações sul-americanas em ordem alfabetica'
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
            if (!inputValue || inputValue.trim().length === 0) {
                throw new Error('Dados vazios fornecidos');
            }
            
            let data;
            let type;
            
            // Check for quoted strings (phrases)
            const quotedMatches = inputValue.match(/["'][^"']*["']/g);
            if (quotedMatches && quotedMatches.length > 0) {
                data = quotedMatches.map(item => item.trim().replace(/["']/g, ''));
                type = 'phrases';
            } else {
                // Split by comma or semicolon
                const rawData = inputValue.split(/[,;]/).map(item => item.trim()).filter(item => item.length > 0);
                
                if (rawData.length === 0) {
                    throw new Error('Nenhum dado válido encontrado');
                }
                
                // Check if first few items are numbers
                const firstThree = rawData.slice(0, 3);
                const numberCount = firstThree.filter(item => !isNaN(parseFloat(item))).length;
                
                if (numberCount >= 2) {
                    // Treat as numbers
                    data = rawData.map(item => {
                        const num = parseFloat(item);
                        return isNaN(num) ? item : num;
                    });
                    type = 'numbers';
                } else {
                    // Treat as words
                    data = rawData;
                    type = 'words';
                }
            }
            
            if (data.length < 2) {
                throw new Error('É necessário pelo menos 2 elementos para ordenar');
            }
            
            if (data.length > 50) {
                throw new Error('Máximo de 50 elementos permitidos');
            }
            
            this.customData = data;
            this.currentDataType = type;
            this.applyCustomData();
            
        } catch (error) {
            if (this.gamificationController?.showNotification) {
                this.gamificationController.showNotification(`❌ ${error.message}`, 'error', 3000);
            } else {
                alert(`❌ Erro ao processar dados: ${error.message}`);
            }
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
            let errorMessage = 'Erro ao processar dados. Verifique o formato.';
            
            if (error.message.includes('quote')) {
                errorMessage = 'Erro: Verifique se as frases estão entre aspas "assim".';
            } else if (error.message.includes('number')) {
                errorMessage = 'Erro: Alguns números não são válidos.';
            } else if (error.message.includes('empty')) {
                errorMessage = 'Erro: Dados vazios ou formato inválido.';
            }
            
            previewContainer.innerHTML = `<p class="preview-placeholder">${errorMessage}</p>`;
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
            applyBtn.title = 'Adicione pelo menos 2 elementos para poder ordenar';
            return;
        }

        if (this.customData.length > 50) {
            applyBtn.disabled = true;
            applyBtn.textContent = '⚠️ Maximo 50 elementos';
            applyBtn.title = 'Muitos elementos podem deixar a visualização lenta';
            return;
        }

        // Check for duplicates and warn
        const uniqueItems = [...new Set(this.customData)];
        if (uniqueItems.length !== this.customData.length) {
            applyBtn.title = `⚠️ ${this.customData.length - uniqueItems.length} elemento(s) duplicado(s) encontrado(s)`;
        } else {
            applyBtn.title = 'Clique para aplicar seus dados personalizados';
        }

        applyBtn.disabled = false;
        applyBtn.textContent = `✅ Aplicar ${this.customData.length} Elementos`;
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

        // Show success notification with detailed info
        const typeNames = {
            numbers: 'números',
            words: 'palavras', 
            phrases: 'frases'
        };
        
        const successMessage = `🎯 Dados personalizados aplicados!\n${this.customData.length} ${typeNames[this.currentDataType]} carregadas.\n\n🎮 +50 pontos de experiência!`;
        
        if (this.gamificationController) {
            this.gamificationController.showNotification(successMessage, 'success', 4000);
            this.gamificationController.addScore(50);
        } else if (window.gamificationController) {
            window.gamificationController.showNotification(successMessage, 'success', 4000);
            window.gamificationController.addScore(50);
        } else {
            // Fallback: mostrar alert simples
            alert(successMessage);
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
        this.currentDataType = 'numbers';
        this.currentInputMethod = 'manual';
        
        // Clear UI elements if they exist
        const input = document.getElementById('customDataInput');
        if (input) input.value = '';
        
        const previewContainer = document.getElementById('dataPreview');
        if (previewContainer) {
            previewContainer.innerHTML = '<p class="preview-placeholder">Digite dados acima para ver a previa...</p>';
        }
        
        // Clear selected examples
        document.querySelectorAll('.example-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        console.log('✅ Custom data system reset complete');
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
    
    // Method to get data statistics
    getDataStatistics() {
        if (!this.customData || this.customData.length === 0) {
            return null;
        }
        
        const stats = {
            count: this.customData.length,
            type: this.currentDataType,
            uniqueCount: [...new Set(this.customData)].length,
            duplicates: this.customData.length - [...new Set(this.customData)].length
        };
        
        if (this.currentDataType === 'numbers') {
            const numbers = this.customData.filter(n => typeof n === 'number');
            if (numbers.length > 0) {
                stats.min = Math.min(...numbers);
                stats.max = Math.max(...numbers);
                stats.average = numbers.reduce((a, b) => a + b, 0) / numbers.length;
                stats.range = stats.max - stats.min;
            }
        } else {
            const lengths = this.customData.map(item => item.toString().length);
            stats.minLength = Math.min(...lengths);
            stats.maxLength = Math.max(...lengths);
            stats.avgLength = lengths.reduce((a, b) => a + b, 0) / lengths.length;
        }
        
        return stats;
    }
    
    // Method to export data for sharing
    exportData() {
        if (!this.customData || this.customData.length === 0) {
            return null;
        }
        
        return {
            timestamp: new Date().toISOString(),
            data: this.customData,
            type: this.currentDataType,
            statistics: this.getDataStatistics(),
            version: '2.0'
        };
    }
    
    // Method to import data from file or text
    importData(dataString) {
        try {
            // Try to parse as JSON first
            const jsonData = JSON.parse(dataString);
            if (jsonData.data && jsonData.type) {
                this.customData = jsonData.data;
                this.currentDataType = jsonData.type;
                this.isCustomDataActive = true;
                return { success: true, message: 'Dados importados com sucesso!' };
            }
        } catch (e) {
            // If not JSON, try to parse as CSV or plain text
            try {
                this.parseAndApplyData(dataString);
                return { success: true, message: 'Dados de texto importados com sucesso!' };
            } catch (error) {
                return { success: false, message: `Erro ao importar: ${error.message}` };
            }
        }
    }
}

// Initialize custom data controller when DOM is loaded
window.customDataController = null;

document.addEventListener('DOMContentLoaded', () => {
    window.customDataController = new CustomDataController();
    console.log('✅ Custom Data Controller initialized');
});
