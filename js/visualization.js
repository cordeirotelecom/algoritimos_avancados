// ===== VISUALIZATION CONTROLLER =====

class VisualizationController {
    constructor() {
        this.array = [];
        this.originalArray = [];
        this.steps = [];
        this.currentStepIndex = 0;
        this.isAnimating = false;
        this.animationSpeed = 1200; // milliseconds - slower for better learning
        this.sortingAlgorithms = new SortingAlgorithms();
        
        this.comparisons = 0;
        this.swaps = 0;
        this.startTime = null;
        this.timerInterval = null;
        
        // Custom data support
        this.customData = null;
        this.customDataType = null;
        this.isCustomDataActive = false;
        
        // Pause/Resume functionality
        this.isPaused = false;
        this.pauseCallback = null;
        this.currentAlgorithm = null;
        
        // Didactic explanations
        this.stepExplanations = {
            'compare': {
                'bubble': 'Comparando elementos adjacentes para ver se estão na ordem correta',
                'selection': 'Procurando o menor elemento no restante do array',
                'insertion': 'Comparando o elemento atual com os já ordenados',
                'quick': 'Comparando elementos com o pivô para particionamento',
                'merge': 'Comparando elementos dos sub-arrays para mesclagem',
                'heap': 'Comparando pai e filhos na estrutura de heap',
                'radix': 'Analisando dígitos dos números para classificação'
            },
            'swap': {
                'bubble': 'Trocando elementos que estão fora de ordem',
                'selection': 'Colocando o menor elemento encontrado na posição correta',
                'insertion': 'Inserindo o elemento na posição correta entre os ordenados',
                'quick': 'Organizando elementos menores à esquerda e maiores à direita do pivô',
                'merge': 'Mesclando elementos em ordem dos sub-arrays',
                'heap': 'Ajustando a estrutura do heap após remoção',
                'radix': 'Colocando números nos baldes corretos baseado no dígito'
            },
            'sorted': {
                'bubble': 'Elemento chegou à sua posição final correta',
                'selection': 'Elemento está definitivamente na posição correta',
                'insertion': 'Elemento inserido corretamente na sequência ordenada',
                'quick': 'Sub-array completamente ordenado',
                'merge': 'Mesclagem concluída com sucesso',
                'heap': 'Heap reconstruído corretamente',
                'radix': 'Classificação por este dígito concluída'
            }
        };
        
        this.initializeElements();
    }

    initializeElements() {
        // Tentar encontrar elementos com IDs alternativos se nao encontrar os padroes
        this.elements = {
            arrayBars: document.getElementById('arrayBars') || document.querySelector('.array-bars'),
            currentStep: document.getElementById('currentStep') || document.querySelector('.current-step'),
            comparisons: document.querySelector('.progress-stat:nth-child(1) .stat-value') || document.getElementById('comparisons'),
            swaps: document.querySelector('.progress-stat:nth-child(2) .stat-value') || document.getElementById('swaps'),
            timeElapsed: document.querySelector('.progress-stat:nth-child(3) .stat-value') || document.getElementById('timeElapsed'),
            algorithmDescription: document.getElementById('algorithmDescription'),
            currentAlgorithm: document.getElementById('currentAlgorithm')
        };
        
        // Verificar elementos criticos
        if (!this.elements.arrayBars) {
            this.createFallbackElements();
        }
    }
    
    createFallbackElements() {
        // Criar elementos de fallback se nao existirem
        if (!this.elements.arrayBars) {
            const fallbackBars = document.createElement('div');
            fallbackBars.className = 'array-bars';
            fallbackBars.id = 'arrayBars';
            fallbackBars.style.cssText = 'display: flex; align-items: flex-end; height: 250px; padding: 10px; border: 1px solid #ddd; margin: 10px 0;';
            
            // Tentar inserir em um container existente ou no body
            const container = document.querySelector('.visualization-area, .array-container, main') || document.body;
            container.appendChild(fallbackBars);
            this.elements.arrayBars = fallbackBars;
        }
    }

    generateRandomArray(size = 15, min = 5, max = 100) {
        this.array = [];
        for (let i = 0; i < size; i++) {
            this.array.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        this.originalArray = [...this.array];
        this.updateVisualization();
        this.resetStats();
        
        // Initial step explanation
        const stepExplanation = document.getElementById('currentStepExplanation');
        if (stepExplanation) {
            stepExplanation.textContent = 'Array gerado! Clique em "Começar" para ver como o algoritmo ordena os números.';
        }
        
        return this.array;
    }

    generateSortedArray(size = 15, min = 5, max = 100) {
        this.array = [];
        const step = Math.floor((max - min) / size);
        for (let i = 0; i < size; i++) {
            this.array.push(min + (i * step) + Math.floor(Math.random() * step));
        }
        this.originalArray = [...this.array];
        this.updateVisualization();
        this.resetStats();
        return this.array;
    }

    generateReverseArray(size = 15, min = 5, max = 100) {
        this.array = [];
        const step = Math.floor((max - min) / size);
        for (let i = size - 1; i >= 0; i--) {
            this.array.push(min + (i * step) + Math.floor(Math.random() * step));
        }
        this.originalArray = [...this.array];
        this.updateVisualization();
        this.resetStats();
        return this.array;
    }
    
    setCustomData(data, type) {
        this.customData = data;
        this.customDataType = type;
        this.isCustomDataActive = true;
        
        // Create numerical array for sorting while preserving original data
        if (type === 'numbers') {
            this.array = [...data];
        } else {
            // For words/phrases, create indices array and sort by the actual text
            this.array = data.map((_, index) => index);
        }
        
        this.originalArray = [...this.array];
        this.steps = [];
        this.currentStepIndex = 0;
        this.comparisons = 0;
        this.swaps = 0;
        this.stopTimer();
        
        this.updateVisualization();
        this.updateStats(0, 0);
    }

    // ===== PAUSE/RESUME FUNCTIONALITY =====
    pauseAnimation() {
        this.isPaused = true;
        const pauseBtn = document.getElementById('pauseSort');
        const resumeBtn = document.getElementById('resumeSort');
        
        if (pauseBtn) pauseBtn.style.display = 'none';
        if (resumeBtn) resumeBtn.style.display = 'inline-block';
        
        this.updateStepExplanation({ 
            type: 'pause', 
            description: '⏸️ Animação pausada. Analise o estado atual e clique em Continuar quando estiver pronto.' 
        });
    }

    resumeAnimation() {
        this.isPaused = false;
        const pauseBtn = document.getElementById('pauseSort');
        const resumeBtn = document.getElementById('resumeSort');
        
        if (pauseBtn) pauseBtn.style.display = 'inline-block';
        if (resumeBtn) resumeBtn.style.display = 'none';
        
        // Continue animation
        if (this.pauseCallback) {
            this.pauseCallback();
            this.pauseCallback = null;
        }
    }

    updateStepExplanation(step) {
        const explanationElement = document.getElementById('currentStepExplanation');
        if (!explanationElement) return;

        const stepNumber = this.currentStepIndex + 1;
        let explanation = '';
        const algorithm = this.currentAlgorithm || 'bubble';

        // Create didactic step-by-step explanations with more detail
        const didacticExplanations = {
            'compare': {
                'bubble': `🔍 COMPARANDO ELEMENTOS ADJACENTES\n\nO Bubble Sort olha dois números vizinhos e pergunta: "Qual é maior?"\n\n💭 ESTRATÉGIA: Se o da esquerda for maior que o da direita, eles precisam trocar de lugar!\n\n🎯 OBJETIVO: Fazer o maior número "borbulhar" para o final como uma bolha na água.`,
                'selection': `🔍 PROCURANDO O MENOR ELEMENTO\n\nO Selection Sort está buscando o menor número em toda a parte não ordenada do array.\n\n💭 ESTRATÉGIA: É como organizar cartas - sempre pego a menor carta primeiro!\n\n🎯 OBJETIVO: Encontrar o menor e colocá-lo na primeira posição livre.`,
                'insertion': `🔍 COMPARANDO COM ELEMENTOS ORDENADOS\n\nO Insertion Sort pega um elemento e pergunta: "Onde você se encaixa na parte já ordenada?"\n\n💭 ESTRATÉGIA: É como inserir uma carta na posição certa em uma mão de cartas já organizadas.\n\n🎯 OBJETIVO: Encontrar a posição exata onde este elemento deve ficar.`,
                'quick': `🔍 COMPARANDO COM O PIVÔ\n\nO Quick Sort escolheu um "pivô" (elemento de referência) e agora compara todos os outros com ele.\n\n💭 ESTRATÉGIA: "Você é menor ou maior que o pivô?" - organiza em dois grupos!\n\n🎯 OBJETIVO: Dividir o array em "menores que o pivô" e "maiores que o pivô".`,
                'merge': `🔍 COMPARANDO SUB-ARRAYS ORDENADOS\n\nO Merge Sort tem duas listas já ordenadas e está mesclando-as em uma só.\n\n💭 ESTRATÉGIA: Como mesclar duas filas organizadas em uma fila única mantendo a ordem.\n\n🎯 OBJETIVO: Combinar duas partes ordenadas em uma parte maior ainda ordenada.`,
                'heap': `🔍 VERIFICANDO ESTRUTURA DO HEAP\n\nO Heap Sort verifica se o "pai" é maior que seus "filhos" na árvore.\n\n💭 ESTRATÉGIA: Em um heap, o pai deve sempre ser o maior da família!\n\n🎯 OBJETIVO: Manter a propriedade de heap para extrair o maior elemento.`
            },
            'swap': {
                'bubble': `🔄 TROCANDO ELEMENTOS DE POSIÇÃO!\n\n✨ DESCOBERTA: O elemento da esquerda É MAIOR que o da direita!\n\n🎯 AÇÃO: Vamos trocar eles de lugar para ficarem na ordem correta.\n\n💡 RESULTADO: O maior elemento está se movendo em direção ao final (como uma bolha subindo na água).`,
                'selection': `🔄 COLOCANDO O MENOR NA POSIÇÃO CERTA!\n\n✨ DESCOBERTA: Encontramos o menor elemento de toda a parte não ordenada!\n\n🎯 AÇÃO: Vamos colocá-lo na primeira posição disponível da parte ordenada.\n\n💡 RESULTADO: Mais um elemento está em sua posição final definitiva!`,
                'insertion': `🔄 INSERINDO NA POSIÇÃO PERFEITA!\n\n✨ DESCOBERTA: Encontramos exatamente onde este elemento deve ficar!\n\n🎯 AÇÃO: Vamos "empurrar" os outros elementos para abrir espaço e inserir aqui.\n\n💡 RESULTADO: A parte ordenada cresceu em mais um elemento!`,
                'quick': `🔄 ORGANIZANDO EM TORNO DO PIVÔ!\n\n✨ DESCOBERTA: Este elemento está do lado errado do pivô!\n\n🎯 AÇÃO: Vamos movê-lo para o lado correto - menores à esquerda, maiores à direita.\n\n💡 RESULTADO: O array está sendo dividido em duas partes organizadas!`,
                'merge': `🔄 MESCLANDO ORDENADAMENTE!\n\n✨ DESCOBERTA: Entre os dois próximos elementos, sabemos qual vem primeiro!\n\n🎯 AÇÃO: Vamos colocar o menor no array resultado mantendo a ordem.\n\n💡 RESULTADO: Duas listas ordenadas estão se tornando uma lista maior ordenada!`,
                'heap': `🔄 REORGANIZANDO A ESTRUTURA!\n\n✨ DESCOBERTA: A propriedade do heap foi violada - pai menor que filho!\n\n🎯 AÇÃO: Vamos trocar para que o pai seja sempre maior que os filhos.\n\n💡 RESULTADO: A estrutura de heap está sendo restaurada!`
            },
            'sorted': {
                'bubble': `Passo ${stepNumber}: ✅ POSIÇÃO FINAL alcançada! Este elemento já está no seu lugar correto e não se moverá mais`,
                'selection': `Passo ${stepNumber}: ✅ ELEMENTO POSICIONADO! Este é definitivamente o menor dos restantes e está no lugar certo`,
                'insertion': `Passo ${stepNumber}: ✅ INSERÇÃO COMPLETA! O elemento foi inserido corretamente na sequência já ordenada`,
                'quick': `Passo ${stepNumber}: ✅ PARTIÇÃO FINALIZADA! Esta parte do array está corretamente organizada em relação ao pivô`,
                'merge': `Passo ${stepNumber}: ✅ MESCLAGEM CONCLUÍDA! Os sub-arrays foram combinados mantendo a ordem correta`,
                'heap': `Passo ${stepNumber}: ✅ HEAP VÁLIDO! A estrutura do heap foi reorganizada e está funcionando corretamente`
            },
            'start': {
                'bubble': `INÍCIO: 🫧 Bubble Sort começando! Vamos comparar elementos adjacentes e "borbulhar" os maiores para o final`,
                'selection': `INÍCIO: 🎯 Selection Sort iniciado! Vamos encontrar o menor elemento e colocá-lo na primeira posição, depois o segundo menor, e assim por diante`,
                'insertion': `INÍCIO: 📝 Insertion Sort começando! Vamos inserir cada elemento na posição correta, como ordenar cartas na mão`,
                'quick': `INÍCIO: ⚡ Quick Sort iniciado! Vamos escolher um pivô e dividir o array recursivamente`,
                'merge': `INÍCIO: 🔀 Merge Sort começando! Vamos dividir o array e depois mesclar as partes ordenadamente`,
                'heap': `INÍCIO: 🏗️ Heap Sort iniciado! Vamos construir um heap e extrair elementos em ordem`
            },
            'info': {
                'bubble': `ℹ️ INFORMAÇÃO: O Bubble Sort faz várias passadas pelo array, a cada passada o maior elemento "borbulha" para o final`,
                'selection': `ℹ️ INFORMAÇÃO: O Selection Sort seleciona o menor elemento restante a cada iteração`,
                'insertion': `ℹ️ INFORMAÇÃO: O Insertion Sort mantém uma parte ordenada crescente do array`,
                'quick': `ℹ️ INFORMAÇÃO: O Quick Sort usa a estratégia "dividir para conquistar" com pivôs`,
                'merge': `ℹ️ INFORMAÇÃO: O Merge Sort sempre divide pela metade e depois mescla ordenadamente`,
                'heap': `ℹ️ INFORMAÇÃO: O Heap Sort usa uma estrutura de heap (árvore binária especial)`
            }
        };

        if (didacticExplanations[step.type] && didacticExplanations[step.type][algorithm]) {
            explanation = didacticExplanations[step.type][algorithm];
            
            // Add specific values and positions being processed
            if (step.indices && step.indices.length > 0) {
                const valueDetails = step.indices.map(i => {
                    const value = this.array[i];
                    return `${value} (posição ${i})`;
                }).join(' e ');
                explanation += `\n\n🎯 Elementos: ${valueDetails}`;
                
                // Add comparison result for compare operations
                if (step.type === 'compare' && step.indices.length === 2) {
                    const [val1, val2] = step.indices.map(i => this.array[i]);
                    const comparison = val1 > val2 ? `${val1} > ${val2} → Precisa trocar!` : `${val1} ≤ ${val2} → Está em ordem`;
                    explanation += `\n🔍 Resultado: ${comparison}`;
                }
            }
            
            // Add progress information
            if (this.steps && this.steps.length > 0) {
                explanation += `\n\n📊 Progresso: ${stepNumber}/${this.steps.length} passos (${Math.round((stepNumber/this.steps.length)*100)}%)`;
            }
        } else {
            explanation = step.description || 'Processando algoritmo de ordenação...';
        }

        explanationElement.textContent = explanation;
        
        // Animate explanation change
        explanationElement.style.transform = 'scale(1.02)';
        setTimeout(() => {
            explanationElement.style.transform = 'scale(1)';
        }, 200);
    }

    updateVisualization() {
        if (!this.elements.arrayBars) return;

        this.elements.arrayBars.innerHTML = '';
        
        if (this.isCustomDataActive && this.customData) {
            this.updateCustomDataVisualization();
        } else {
            this.updateNumericVisualization();
        }
    }
    
    updateNumericVisualization() {
        this.array.forEach((value, index) => {
            const element = document.createElement('div');
            element.className = 'array-element';
            element.setAttribute('data-value', value);
            element.setAttribute('data-index', index);
            element.textContent = value;
            
            // Add entrance animation with stagger
            element.style.animationDelay = `${index * 0.1}s`;
            element.style.opacity = '0';
            element.style.transform = 'scale(0.8)';
            
            // Animate in
            setTimeout(() => {
                element.style.transition = 'all 0.3s ease-out';
                element.style.opacity = '1';
                element.style.transform = 'scale(1)';
            }, index * 100);
            
            this.elements.arrayBars.appendChild(element);
        });
    }
    
    updateCustomDataVisualization() {
        const containerHeight = 250;
        const isNumbers = this.customDataType === 'numbers';
        
        // For numbers, use the actual values; for text, use indices
        const displayArray = isNumbers ? this.array : this.array.map(index => this.customData[index]);
        const maxValue = isNumbers ? Math.max(...this.array) : this.customData.length;

        this.array.forEach((value, index) => {
            const bar = document.createElement('div');
            bar.className = 'array-bar custom-data-bar';
            
            if (isNumbers) {
                bar.style.height = `${(value / maxValue) * containerHeight}px`;
                bar.setAttribute('data-value', value);
                bar.textContent = value;
            } else {
                // For text data, use a fixed height and show the text
                bar.style.height = `${(value + 1) / maxValue * containerHeight}px`;
                bar.setAttribute('data-value', this.customData[value]);
                bar.innerHTML = `<span class="bar-text">${this.customData[value]}</span>`;
                bar.classList.add('text-bar');
            }
            
            bar.setAttribute('data-index', index);
            
            // Add entrance animation
            bar.style.animationDelay = `${index * 0.05}s`;
            bar.classList.add('animate-slideInUp');
            
            this.elements.arrayBars.appendChild(bar);
        });
    }

    startSorting(algorithm) {
        console.log(`🚀 Iniciando ordenação com algoritmo: ${algorithm}`);
        
        if (this.isAnimating) {
            console.log('❌ Animation already in progress');
            return;
        }

        // Verificar se o container existe
        if (!this.elements.arrayBars) {
            console.error('❌ Container arrayBars não encontrado!');
            this.createFallbackElements();
            if (!this.elements.arrayBars) {
                console.error('❌ Falha ao criar elementos de fallback');
                return;
            }
        }

        this.resetVisualization();
        this.sortedIndices = new Set(); // Initialize sorted indices tracker
        this.startTime = Date.now();
        this.startTimer();

        // Prepare array for sorting based on data type
        let sortingArray;
        if (this.isCustomDataActive && this.customDataType !== 'numbers') {
            // For text data, create a comparison function that uses the original data
            sortingArray = [...this.array];
        } else {
            sortingArray = [...this.array];
        }

        console.log(`📊 Array inicial:`, sortingArray);
        console.log(`📊 Dados customizados:`, this.isCustomDataActive ? 'Sim' : 'Não');

        // Get sorting steps based on algorithm
        const customDataForAlgorithm = this.isCustomDataActive ? this.customData : null;
        
        try {
            switch (algorithm) {
                case 'bubble':
                    this.steps = this.sortingAlgorithms.bubbleSort(sortingArray, this.getCustomComparator(), customDataForAlgorithm);
                    break;
                case 'selection':
                    this.steps = this.sortingAlgorithms.selectionSort(sortingArray, this.getCustomComparator(), customDataForAlgorithm);
                    break;
                case 'insertion':
                    this.steps = this.sortingAlgorithms.insertionSort(sortingArray, this.getCustomComparator(), customDataForAlgorithm);
                    break;
                case 'quick':
                    this.steps = this.sortingAlgorithms.quickSort(sortingArray, this.getCustomComparator(), customDataForAlgorithm);
                    break;
                case 'merge':
                    this.steps = this.sortingAlgorithms.mergeSort(sortingArray, this.getCustomComparator(), customDataForAlgorithm);
                    break;
                case 'heap':
                    this.steps = this.sortingAlgorithms.heapSort(sortingArray, this.getCustomComparator(), customDataForAlgorithm);
                    break;
                case 'radix':
                    // Radix sort only works with numbers
                    if (this.isCustomDataActive && this.customDataType !== 'numbers') {
                        this.showDidacticMessage('🚫 Radix Sort é Especial!', 
                            'O Radix Sort funciona apenas com números porque ele analisa dígito por dígito. ' +
                            'Para ordenar palavras, use algoritmos como Bubble Sort, Selection Sort ou Quick Sort que fazem comparações alfabéticas!', 
                            'info');
                        this.resetAnimationState();
                        return;
                    }
                    this.steps = this.sortingAlgorithms.radixSort(sortingArray);
                    break;
                default:
                    console.error('❌ Unknown algorithm:', algorithm);
                    this.resetAnimationState();
                    return;
            }

            console.log(`📋 Steps gerados: ${this.steps.length}`);
            
            if (!this.steps || this.steps.length === 0) {
                console.error('❌ Nenhum step foi gerado!');
                this.resetAnimationState();
                return;
            }

            this.currentStepIndex = 0;
            this.isAnimating = true;
            
            // Iniciar animação imediatamente
            console.log('🎬 Iniciando animação...');
            this.animateNextStep();
            
        } catch (error) {
            console.error('❌ Erro ao gerar steps:', error);
            this.resetAnimationState();
        }
    }
    
    resetAnimationState() {
        this.isAnimating = false;
        this.isPaused = false;
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }
    
    getCustomComparator() {
        if (!this.isCustomDataActive || this.customDataType === 'numbers') {
            return null; // Use default numeric comparison
        }
        
        // Custom comparator for text data
        return (a, b) => {
            const textA = this.customData[a].toLowerCase();
            const textB = this.customData[b].toLowerCase();
            return textA.localeCompare(textB);
        };
    }
    
    updateStepDisplay(step, stepIndex) {
        try {
            // Update step number and progress
            const stepNumber = document.getElementById('stepNumber');
            const stepTitle = document.getElementById('stepTitle');
            const currentStep = document.getElementById('currentStep');
            const progressFill = document.getElementById('progressFill');
            const progressText = document.getElementById('progressText');
            
            if (stepNumber) {
                stepNumber.textContent = stepIndex + 1;
            }
            
            if (stepTitle) {
                const titles = {
                    'compare': '🔍 Comparando elementos',
                    'swap': '🔄 Trocando posições',
                    'sorted': '✅ Elemento ordenado',
                    'complete': '🎉 Algoritmo concluído',
                    'info': '📖 Executando passo',
                    'start': '🚀 Iniciando algoritmo'
                };
                stepTitle.textContent = titles[step.type] || '📋 Processando';
            }
            
            if (currentStep && step.description) {
                currentStep.textContent = step.description;
            }
            
            // Update progress bar
            if (progressFill && progressText && this.steps && this.steps.length > 0) {
                const progress = ((stepIndex + 1) / this.steps.length) * 100;
                progressFill.style.width = `${progress}%`;
                progressText.textContent = `${Math.round(progress)}%`;
            }
            
            // Update progress controller
            if (window.progressController && typeof window.progressController.onStepUpdate === 'function') {
                window.progressController.onStepUpdate(step);
            }
        } catch (error) {
            console.error('❌ Erro em updateStepDisplay:', error);
            // Não parar a animação por causa deste erro
        }
    }

    animateNextStep() {
        console.log(`🎬 Step ${this.currentStepIndex + 1}/${this.steps.length} - isAnimating: ${this.isAnimating}, isPaused: ${this.isPaused}`);
        
        if (this.currentStepIndex >= this.steps.length) {
            console.log('✅ Ordenação concluída!');
            this.completeSorting();
            return;
        }

        if (!this.steps || this.steps.length === 0) {
            console.error('❌ Não há steps para animar!');
            this.completeSorting();
            return;
        }
        
        // Verificar se ainda deve continuar animando
        if (!this.isAnimating) {
            console.log('❌ Animação foi parada - isAnimating = false');
            return;
        }

        const step = this.steps[this.currentStepIndex];
        
        if (!step) {
            console.error(`❌ Step ${this.currentStepIndex} não encontrado!`);
            this.completeSorting();
            return;
        }
        
        console.log(`📋 Executando step:`, step);
        
        // Update new step display
        this.updateStepDisplay(step, this.currentStepIndex);
        
        // Legacy updates for compatibility
        this.updateStepDescription(step.description);
        this.updateStats(step.comparisons || this.comparisons, step.swaps || this.swaps);

        // Apply visual effects based on step type
        this.applyStepVisualization(step);

        this.currentStepIndex++;
        
        // Check for pause before continuing
        if (this.isPaused) {
            console.log('⏸️ Animação pausada');
            this.pauseCallback = () => this.animateNextStep();
            return;
        }
        
        // Continue with next step
        const delay = this.animationSpeed || 1000;
        console.log(`⏱️ Próximo step em ${delay}ms - isAnimating: ${this.isAnimating}, isPaused: ${this.isPaused}`);
        
        setTimeout(() => {
            console.log(`🔄 Timer executado - isAnimating: ${this.isAnimating}, isPaused: ${this.isPaused}`);
            if (this.isAnimating && !this.isPaused) {
                console.log('✅ Continuando animação...');
                this.animateNextStep();
            } else {
                console.log('❌ Animação interrompida - isAnimating:', this.isAnimating, 'isPaused:', this.isPaused);
            }
        }, delay);
    }

    applyStepVisualization(step) {
        try {
            if (!this.elements.arrayBars) {
                console.error('❌ Container arrayBars não encontrado em applyStepVisualization!');
                return;
            }
            
            const elements = this.elements.arrayBars.children;
            console.log(`🎨 Aplicando visualização - Step type: ${step.type}, Elementos: ${elements.length}`);
            
            if (elements.length === 0) {
                console.error('❌ Nenhum elemento visual encontrado!');
                return;
            }
            
            // Clear previous highlights but preserve sorted elements
            Array.from(elements).forEach((element, index) => {
                // Don't remove 'sorted' class - it should persist until reset
                element.classList.remove('comparing', 'swapping', 'pivot', 'current', 'newmin', 'shift', 'insert', 'merge', 'counting', 'placing', 'heap');
                
                // Re-apply sorted class if this element was previously sorted
                if (this.sortedIndices && this.sortedIndices.has(index)) {
                    element.classList.add('sorted');
                }
            });

            // Update step explanation
            this.updateStepExplanation(step);
            
            // Update detailed explanation panel
            this.updateExplanationPanel(step, step.description || 'Processando...');

            switch (step.type) {
                case 'compare':
                    console.log(`🔍 Comparando índices: ${step.indices}`);
                    if (step.indices && Array.isArray(step.indices)) {
                        step.indices.forEach(index => {
                            if (elements[index]) {
                                elements[index].classList.add('comparing');
                                console.log(`✅ Adicionado classe 'comparing' ao elemento ${index}`);
                            } else {
                                console.warn(`⚠️ Elemento ${index} não encontrado`);
                            }
                        });
                    }
                    break;

                case 'swap':
                    console.log(`🔄 Trocando índices: ${step.indices}`);
                    if (step.indices && Array.isArray(step.indices)) {
                        step.indices.forEach(index => {
                            if (elements[index]) {
                                elements[index].classList.add('swapping');
                                console.log(`✅ Adicionado classe 'swapping' ao elemento ${index}`);
                            } else {
                                console.warn(`⚠️ Elemento ${index} não encontrado`);
                            }
                        });
                    }
                    if (step.array) {
                        this.updateArrayValues(step.array);
                    }
                    break;

                case 'sorted':
                    console.log(`✅ Marcando como ordenados: ${step.indices}`);
                    if (step.indices && Array.isArray(step.indices)) {
                        step.indices.forEach(index => {
                            if (elements[index]) {
                                // Add sorted class with higher priority
                                elements[index].classList.add('sorted');
                                // Store sorted indices to preserve them
                                if (!this.sortedIndices) this.sortedIndices = new Set();
                                this.sortedIndices.add(index);
                                console.log(`✅ Elemento ${index} marcado como ordenado permanentemente`);
                            } else {
                                console.warn(`⚠️ Elemento ${index} não encontrado`);
                            }
                        });
                    }
                    break;

                case 'pivot':
                case 'current':
                    console.log(`👉 Marcando elemento: ${step.indices}`);
                    if (step.indices && Array.isArray(step.indices)) {
                        step.indices.forEach(index => {
                            if (elements[index]) {
                                elements[index].classList.add('current');
                            }
                        });
                    }
                    break;

                case 'insert':
                case 'info':
                case 'start':
                case 'complete':
                    console.log(`ℹ️ Passo informativo: ${step.type}`);
                    // Não precisa destacar elementos visuais
                    break;
                    
                default:
                    console.log(`⚠️ Tipo de step não reconhecido: ${step.type}`);
                    break;
            }
            
        } catch (error) {
            console.error('❌ Erro em applyStepVisualization:', error);
            // Não parar a animação por causa deste erro
        }
    }

    updateArrayValues(newArray) {
        this.array = [...newArray];
        const bars = this.elements.arrayBars.children;
        
        if (this.isCustomDataActive && this.customDataType !== 'numbers') {
            // For text data, update the display based on indices
            newArray.forEach((value, index) => {
                if (bars[index]) {
                    const textValue = this.customData[value];
                    bars[index].innerHTML = `<span class="bar-text">${textValue}</span>`;
                    bars[index].setAttribute('data-value', textValue);
                    
                    // Update height based on index position
                    const containerHeight = 250;
                    const maxValue = this.customData.length;
                    bars[index].style.height = `${(value + 1) / maxValue * containerHeight}px`;
                }
            });
        } else {
            // For numeric data
            const maxValue = Math.max(...newArray);
            const containerHeight = 250;

            newArray.forEach((value, index) => {
                if (bars[index]) {
                    bars[index].textContent = value;
                    bars[index].setAttribute('data-value', value);
                    bars[index].style.height = `${(value / maxValue) * containerHeight}px`;
                }
            });
        }
    }

    updateStepDescription(description) {
        if (this.elements.currentStep) {
            // Tornar descricao mais didatica com formatacao
            const formattedDescription = this.formatDidacticDescription(description);
            this.elements.currentStep.innerHTML = formattedDescription;
            this.elements.currentStep.classList.add('animate-fadeIn');
            setTimeout(() => {
                this.elements.currentStep.classList.remove('animate-fadeIn');
            }, 300);
        }
    }
    
    formatDidacticDescription(description) {
        // Adicionar emojis e formatacao para tornar mais didatico
        let formatted = description;
        
        // Destacar numeros e palavras entre aspas
        formatted = formatted.replace(/"([^"]+)"/g, '<span class="highlight-text">"$1"</span>');
        formatted = formatted.replace(/\b(\d+)\b/g, '<span class="highlight-number">$1</span>');
        
        // Destacar posicoes
        formatted = formatted.replace(/posicao\s+(\d+)/g, 'posicao <span class="highlight-position">$1</span>');
        formatted = formatted.replace(/posicoes\s+(\d+)\s+e\s+(\d+)/g, 'posicoes <span class="highlight-position">$1</span> e <span class="highlight-position">$2</span>');
        
        return formatted;
    }

    updateStats(comparisons, swaps) {
        this.comparisons = comparisons;
        this.swaps = swaps;
        
        // Calcular tempo decorrido
        const timeElapsed = this.startTime ? Math.floor((Date.now() - this.startTime) / 1000) : 0;

        // Atualizar estatísticas se os elementos existirem
        if (this.elements.comparisons) {
            this.elements.comparisons.textContent = `${comparisons} comparações`;
        } else {
            // Fallback: procurar elementos por classe ou ID alternativo
            const comparisonEl = document.querySelector('#comparisons, .stat-comparisons, [data-stat="comparisons"]');
            if (comparisonEl) comparisonEl.textContent = `${comparisons} comparações`;
        }
        
        if (this.elements.swaps) {
            this.elements.swaps.textContent = `${swaps} trocas`;
        } else {
            // Fallback: procurar elementos por classe ou ID alternativo
            const swapsEl = document.querySelector('#swaps, .stat-swaps, [data-stat="swaps"]');
            if (swapsEl) swapsEl.textContent = `${swaps} trocas`;
        }
        
        // Atualizar tempo
        if (this.elements.timeElapsed) {
            this.elements.timeElapsed.textContent = `${timeElapsed}s`;
        } else {
            const timeEl = document.querySelector('#timeElapsed, .stat-time, [data-stat="time"]');
            if (timeEl) timeEl.textContent = `${timeElapsed}s`;
        }
        
        // Atualizar progresso geral no cabeçalho
        const progressElement = document.getElementById('currentProgress');
        if (progressElement && this.steps && this.steps.length > 0) {
            const currentStep = this.currentStepIndex + 1;
            const totalSteps = this.steps.length;
            const percentage = Math.round((currentStep / totalSteps) * 100);
            progressElement.textContent = `Passo ${currentStep}/${totalSteps} (${percentage}%) - ${comparisons} comparações, ${swaps} trocas`;
        }
    }

    resetStats() {
        this.comparisons = 0;
        this.swaps = 0;
        this.updateStats(0, 0);
        
        if (this.elements.timeElapsed) {
            this.elements.timeElapsed.textContent = '0s';
        }
        
        if (this.elements.currentStep) {
            this.elements.currentStep.textContent = 'Clique em "Iniciar Ordenacao" para comecar.';
        }

        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    resetVisualization() {
        console.log('🔄 Reset completo da visualização...');
        
        // Parar qualquer timer ativo
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        
        // Reset completo do estado
        this.array = [...this.originalArray];
        this.currentStepIndex = 0;
        this.isAnimating = false;
        this.isPaused = false;
        this.steps = [];
        this.pauseCallback = null;
        this.comparisons = 0;
        this.swaps = 0;
        this.startTime = null;
        this.sortedIndices = new Set(); // Reset elementos ordenados
        
        // Atualizar visualização
        this.updateVisualization();

        // Reset buttons
        const startBtn = document.getElementById('startSort');
        const pauseBtn = document.getElementById('pauseSort');
        const resumeBtn = document.getElementById('resumeSort');
        
        if (startBtn) {
            startBtn.disabled = false;
            startBtn.textContent = '▶️ Começar';
        }
        if (pauseBtn) pauseBtn.style.display = 'inline-block';
        if (resumeBtn) resumeBtn.style.display = 'none';

        // Clear all element highlights
        if (this.elements.arrayBars && this.elements.arrayBars.children) {
            const elements = this.elements.arrayBars.children;
            Array.from(elements).forEach(element => {
                element.className = 'array-element'; // Reset to base class only
            });
        }
        
        // Reset stats display
        this.updateStats(0, 0);
        
        console.log('✅ Visualização resetada completamente!');

        // Reset stats
        this.resetStats();
        
        // Clear step explanation
        const stepExplanation = document.getElementById('currentStepExplanation');
        if (stepExplanation) {
            stepExplanation.textContent = 'Clique em "Começar" para ver a mágica dos algoritmos!';
        }
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            if (this.startTime && this.elements.timeElapsed) {
                const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
                this.elements.timeElapsed.textContent = `${elapsed}s`;
            }
        }, 1000);
    }

    completeSorting() {
        this.isAnimating = false;
        
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }

        // Trigger completion effects and mark all as sorted
        const bars = this.elements.arrayBars.children;
        Array.from(bars).forEach((bar, index) => {
            setTimeout(() => {
                bar.classList.add('sorting-complete', 'sorted');
                // Add all indices to sorted set
                if (!this.sortedIndices) this.sortedIndices = new Set();
                this.sortedIndices.add(index);
            }, index * 50);
        });

        // Update step description
        this.updateStepDescription('Ordenacao concluida! 🎉');

        // Trigger gamification events
        if (window.gamificationController) {
            const finalTime = this.startTime ? Math.floor((Date.now() - this.startTime) / 1000) : 0;
            window.gamificationController.onSortingComplete({
                comparisons: this.comparisons,
                swaps: this.swaps,
                time: finalTime,
                arraySize: this.array.length
            });
        }
    }

    setAnimationSpeed(speed) {
        // Speed levels: 1 (slow) to 5 (fast)
        const speedMap = {
            1: 1200,
            2: 800,
            3: 500,
            4: 300,
            5: 150
        };
        this.animationSpeed = speedMap[speed] || 800;
    }

    setAlgorithmInfo(algorithm) {
        this.currentAlgorithm = algorithm;
        const info = ALGORITHMS[algorithm];
        if (info && this.elements.algorithmDescription) {
            this.elements.algorithmDescription.textContent = info.description;
        }
        if (info && this.elements.currentAlgorithm) {
            this.elements.currentAlgorithm.textContent = info.name;
        }
    }

    pauseAnimation() {
        this.isPaused = true;
        const pauseBtn = document.getElementById('pauseSort');
        const resumeBtn = document.getElementById('resumeSort');
        
        if (pauseBtn) pauseBtn.style.display = 'none';
        if (resumeBtn) resumeBtn.style.display = 'inline-block';
    }

    resumeAnimation() {
        this.isPaused = false;
        const pauseBtn = document.getElementById('pauseSort');
        const resumeBtn = document.getElementById('resumeSort');
        
        if (pauseBtn) pauseBtn.style.display = 'inline-block';
        if (resumeBtn) resumeBtn.style.display = 'none';
        
        if (this.pauseCallback) {
            this.pauseCallback();
            this.pauseCallback = null;
        }
    }
    
    updateExplanationPanel(step, explanation) {
        const algorithm = this.currentAlgorithm || 'bubble';
        
        // Update algorithm name
        const algorithmName = document.getElementById('algorithmExplanationName');
        if (algorithmName) {
            const names = {
                'bubble': 'Bubble Sort',
                'selection': 'Selection Sort',
                'insertion': 'Insertion Sort',
                'quick': 'Quick Sort',
                'merge': 'Merge Sort',
                'heap': 'Heap Sort'
            };
            algorithmName.textContent = names[algorithm] || 'Algoritmo';
        }
        
        // Update current action
        const actionDescription = document.getElementById('actionDescription');
        if (actionDescription) {
            actionDescription.innerHTML = explanation.replace(/\n/g, '<br>');
        }
        
        // Update algorithm logic
        const logicSteps = document.getElementById('logicSteps');
        if (logicSteps) {
            const algorithmLogics = {
                'bubble': `
                    <div class="logic-step">1. Compare elementos adjacentes (vizinhos)</div>
                    <div class="logic-step">2. Se o da esquerda > direita, troque-os</div>
                    <div class="logic-step">3. Continue até o final do array</div>
                    <div class="logic-step">4. Repita até não haver mais trocas</div>
                    <div class="logic-step">5. O maior "borbulha" para o final a cada passada</div>
                `,
                'selection': `
                    <div class="logic-step">1. Encontre o menor elemento restante</div>
                    <div class="logic-step">2. Coloque-o na primeira posição livre</div>
                    <div class="logic-step">3. A parte ordenada cresce da esquerda</div>
                    <div class="logic-step">4. Repita com o restante do array</div>
                    <div class="logic-step">5. Cada posição recebe seu valor final</div>
                `,
                'insertion': `
                    <div class="logic-step">1. Pegue o próximo elemento não ordenado</div>
                    <div class="logic-step">2. Compare com os elementos ordenados</div>
                    <div class="logic-step">3. "Empurre" elementos maiores para a direita</div>
                    <div class="logic-step">4. Insira o elemento na posição correta</div>
                    <div class="logic-step">5. A parte ordenada cresce elemento por elemento</div>
                `,
                'quick': `
                    <div class="logic-step">1. Escolha um elemento como "pivô"</div>
                    <div class="logic-step">2. Organize: menores à esquerda, maiores à direita</div>
                    <div class="logic-step">3. O pivô fica em sua posição final</div>
                    <div class="logic-step">4. Aplique recursivamente nas duas partes</div>
                    <div class="logic-step">5. "Dividir para conquistar" - muito eficiente!</div>
                `,
                'merge': `
                    <div class="logic-step">1. Divida o array pela metade recursivamente</div>
                    <div class="logic-step">2. Continue dividindo até ter arrays de 1 elemento</div>
                    <div class="logic-step">3. Mescle dois arrays ordenados em um maior</div>
                    <div class="logic-step">4. Compare elementos e escolha o menor</div>
                    <div class="logic-step">5. Continue mesclando até ter um array completo</div>
                `,
                'heap': `
                    <div class="logic-step">1. Construa um "heap" - árvore onde pai > filhos</div>
                    <div class="logic-step">2. O maior elemento fica na raiz (topo)</div>
                    <div class="logic-step">3. Remova a raiz e coloque no final do array</div>
                    <div class="logic-step">4. Reorganize o heap com os elementos restantes</div>
                    <div class="logic-step">5. Repita até o heap estar vazio</div>
                `
            };
            
            logicSteps.innerHTML = algorithmLogics[algorithm] || '<p>Lógica do algoritmo será mostrada aqui.</p>';
        }
        
        // Update pattern recognition
        const patternDescription = document.getElementById('patternDescription');
        if (patternDescription && step.indices) {
            const patterns = {
                'compare': `🔍 <strong>Padrão de Comparação:</strong><br>Estamos comparando elementos para determinar sua ordem relativa. Este é o passo fundamental de qualquer algoritmo de ordenação.`,
                'swap': `🔄 <strong>Padrão de Reorganização:</strong><br>Uma troca foi necessária! Isso significa que encontramos elementos fora de ordem. Cada troca nos aproxima do array ordenado.`,
                'sorted': `✅ <strong>Padrão de Progresso:</strong><br>Elemento(s) chegaram à posição final! A parte ordenada do array está crescendo. Estes elementos não se moverão mais.`
            };
            
            patternDescription.innerHTML = patterns[step.type] || '🔍 Analisando padrão...';
        }
        
        // Update next prediction
        const predictionDescription = document.getElementById('predictionDescription');
        if (predictionDescription) {
            const stepIndex = this.currentStepIndex;
            const totalSteps = this.steps.length;
            
            if (stepIndex < totalSteps - 1) {
                const nextStep = this.steps[stepIndex + 1];
                if (nextStep) {
                    const predictions = {
                        'compare': `🔮 <strong>Próximo:</strong> Vamos comparar outros elementos para decidir se precisam trocar de posição.`,
                        'swap': `🔮 <strong>Próximo:</strong> Após esta troca, vamos continuar comparando para encontrar mais elementos fora de ordem.`,
                        'sorted': `🔮 <strong>Próximo:</strong> Com este elemento ordenado, vamos focar nos elementos restantes que ainda precisam ser organizados.`
                    };
                    
                    predictionDescription.innerHTML = predictions[nextStep.type] || '🔮 Continuando o algoritmo...';
                }
            } else {
                predictionDescription.innerHTML = '🎉 <strong>Quase lá!</strong> Estamos nos últimos passos. O array estará completamente ordenado em breve!';
            }
        }
    }
    
    showDidacticMessage(title, message, type = 'info', duration = 4000) {
        console.log(`📢 ${title}: ${message}`);
        
        // Tentar mostrar em um toast se disponível
        if (window.showToast) {
            window.showToast(title, message, type, duration);
            return;
        }
        
        // Fallback: mostrar na área de explicação de step
        const explanationElement = document.getElementById('currentStepExplanation');
        if (explanationElement) {
            const originalContent = explanationElement.textContent;
            explanationElement.innerHTML = `<strong>${title}</strong><br>${message}`;
            
            // Restaurar conteúdo original após duração
            setTimeout(() => {
                explanationElement.textContent = originalContent;
            }, duration);
        }
        
        // Também mostrar um alert como último recurso
        setTimeout(() => {
            alert(`${title}\n\n${message}`);
        }, 100);
    }
}

// Export for use in other modules
window.VisualizationController = VisualizationController;
