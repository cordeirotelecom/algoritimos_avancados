/**
 * Enhanced Educational System Controller
 * Provides comprehensive educational content with detailed explanations,
 * visual analogies, interactive tutorials, and contextual help
 */

class EnhancedEducationalController {
    constructor() {
        this.currentAlgorithm = null;
        this.currentTopic = 'overview';
        this.interactiveMode = false;
        this.showAdvancedConcepts = false;
        this.learningPath = [];
        this.completedTopics = new Set();
        this.userProgress = JSON.parse(localStorage.getItem('learningProgress') || '{}');
        
        this.initializeEnhancedContent();
        this.initializeInteractiveFeatures();
        this.bindEvents();
    }

    initializeEnhancedContent() {
        // Comprehensive algorithm explanations with multiple learning layers
        this.algorithmDetails = {
            bubble: {
                name: 'Bubble Sort',
                difficulty: 'Fácil',
                complexity: {
                    time: 'O(n²)',
                    space: 'O(1)',
                    bestCase: 'O(n)',
                    worstCase: 'O(n²)'
                },
                overview: {
                    title: '🫧 Bubble Sort - O Algoritmo das Bolhas',
                    description: 'O Bubble Sort é um dos algoritmos de ordenação mais simples de entender. Ele funciona comparando elementos adjacentes e trocando-os se estiverem na ordem errada, fazendo com que os elementos maiores "borbulhem" para o final do array, como bolhas subindo na água.',
                    realWorldAnalogy: '🫧 Imagine bolhas de sabão subindo na água: as bolhas maiores sempre sobem mais rápido e chegam ao topo primeiro. É exatamente assim que o Bubble Sort funciona!'
                },
                stepByStep: {
                    title: '📋 Como Funciona Passo a Passo',
                    steps: [
                        {
                            number: 1,
                            title: 'Comparação Inicial',
                            description: 'Compare o primeiro elemento com o segundo',
                            visual: '🔍 [5,2,8,1] → Comparamos 5 e 2',
                            action: 'Se 5 > 2, trocamos: [2,5,8,1]'
                        },
                        {
                            number: 2,
                            title: 'Continue Comparando',
                            description: 'Avance para o próximo par de elementos',
                            visual: '🔍 [2,5,8,1] → Comparamos 5 e 8',
                            action: 'Como 5 < 8, não trocamos: [2,5,8,1]'
                        },
                        {
                            number: 3,
                            title: 'Maior Elemento Sobe',
                            description: 'O maior elemento "borbulha" para o final',
                            visual: '🔍 [2,5,8,1] → Comparamos 8 e 1',
                            action: 'Como 8 > 1, trocamos: [2,5,1,8]'
                        },
                        {
                            number: 4,
                            title: 'Repita o Processo',
                            description: 'Reinicie do começo, ignorando elementos já ordenados',
                            visual: '🔄 Primeira passada completa: [2,5,1,8]',
                            action: 'O 8 está na posição correta, continue com o resto'
                        }
                    ]
                },
                advantages: [
                    '✅ Muito simples de entender e implementar',
                    '✅ Detecta se o array já está ordenado (versão otimizada)',
                    '✅ Algoritmo estável (mantém ordem de elementos iguais)',
                    '✅ Funciona bem para ensinar conceitos básicos'
                ],
                disadvantages: [
                    '❌ Muito lento para arrays grandes (O(n²))',
                    '❌ Muitas trocas desnecessárias',
                    '❌ Não é usado em aplicações reais',
                    '❌ Performance ruim mesmo no melhor caso'
                ],
                useCase: '🎓 Ideal para: Aprender conceitos básicos, arrays muito pequenos (< 10 elementos), situações didáticas',
                codePattern: {
                    concept: 'Comparação de elementos adjacentes com trocas condicionais',
                    pattern: 'for (i) { for (j) { if (arr[j] > arr[j+1]) swap(); } }',
                    keyPoints: [
                        'Dois loops aninhados para percorrer o array',
                        'Comparação sempre entre elementos adjacentes',
                        'Troca condicional baseada na comparação',
                        'Elemento maior sempre "borbulha" para o final'
                    ]
                }
            },

            selection: {
                name: 'Selection Sort',
                difficulty: 'Fácil',
                complexity: {
                    time: 'O(n²)',
                    space: 'O(1)',
                    bestCase: 'O(n²)',
                    worstCase: 'O(n²)'
                },
                overview: {
                    title: '🎯 Selection Sort - O Algoritmo Seletor',
                    description: 'O Selection Sort funciona encontrando repetidamente o menor elemento e colocando-o na posição correta. É como organizar cartas selecionando sempre a menor e colocando-a no início.',
                    realWorldAnalogy: '🃏 Como organizar cartas na sua mão: você sempre pega a menor carta e coloca na primeira posição, depois a segunda menor, e assim por diante.'
                },
                stepByStep: {
                    title: '📋 Como Funciona Passo a Passo',
                    steps: [
                        {
                            number: 1,
                            title: 'Encontre o Menor',
                            description: 'Procure o menor elemento em todo o array',
                            visual: '🔍 [64,25,12,22,11] → Menor é 11',
                            action: 'Encontrado: 11 na posição 4'
                        },
                        {
                            number: 2,
                            title: 'Coloque na Primeira Posição',
                            description: 'Troque o menor com o primeiro elemento',
                            visual: '🔄 Troca 64 ↔ 11',
                            action: 'Resultado: [11,25,12,22,64]'
                        },
                        {
                            number: 3,
                            title: 'Ignore o Primeiro',
                            description: 'Agora procure o menor no resto do array',
                            visual: '🔍 [11,|25,12,22,64] → Menor é 12',
                            action: 'Procure apenas na parte não ordenada'
                        },
                        {
                            number: 4,
                            title: 'Continue o Processo',
                            description: 'Repita até ordenar todos os elementos',
                            visual: '🔄 [11,12,|22,25,64]',
                            action: 'Cada iteração ordena mais um elemento'
                        }
                    ]
                },
                advantages: [
                    '✅ Simples de entender e implementar',
                    '✅ Faz o mínimo número de trocas (O(n))',
                    '✅ Funciona bem quando trocas são custosas',
                    '✅ Performance consistente independente dos dados'
                ],
                disadvantages: [
                    '❌ Sempre O(n²), mesmo com dados já ordenados',
                    '❌ Não é estável (pode alterar ordem de elementos iguais)',
                    '❌ Muitas comparações desnecessárias',
                    '❌ Não é adaptativo'
                ],
                useCase: '🎯 Ideal para: Arrays pequenos, quando trocas são custosas, quando você quer performance previsível',
                codePattern: {
                    concept: 'Busca pelo menor elemento e posicionamento correto',
                    pattern: 'for (i) { minIndex = findMin(arr, i); swap(arr[i], arr[minIndex]); }',
                    keyPoints: [
                        'Loop externo para cada posição a ser preenchida',
                        'Loop interno para encontrar o menor elemento',
                        'Uma troca por iteração do loop externo',
                        'Divisão conceitual entre parte ordenada e não ordenada'
                    ]
                }
            },

            insertion: {
                name: 'Insertion Sort',
                difficulty: 'Fácil',
                complexity: {
                    time: 'O(n²)',
                    space: 'O(1)',
                    bestCase: 'O(n)',
                    worstCase: 'O(n²)'
                },
                overview: {
                    title: '📝 Insertion Sort - O Algoritmo Inserção',
                    description: 'O Insertion Sort constrói a solução final um elemento por vez, inserindo cada novo elemento na posição correta entre os elementos já ordenados. É muito eficiente para arrays pequenos e quase ordenados.',
                    realWorldAnalogy: '🃏 Como ordenar cartas enquanto joga: você pega cada nova carta e insere na posição correta entre as cartas que já tem na mão.'
                },
                stepByStep: {
                    title: '📋 Como Funciona Passo a Passo',
                    steps: [
                        {
                            number: 1,
                            title: 'Comece do Segundo',
                            description: 'O primeiro elemento já está "ordenado"',
                            visual: '📌 [5|2,4,6,1] → Elemento 2 será inserido',
                            action: 'Parte ordenada: [5], Inserindo: 2'
                        },
                        {
                            number: 2,
                            title: 'Compare com Anteriores',
                            description: 'Compare com elementos da parte ordenada',
                            visual: '🔍 2 < 5? Sim, então mova 5 para direita',
                            action: 'Movendo: [_,5,4,6,1]'
                        },
                        {
                            number: 3,
                            title: 'Insira na Posição',
                            description: 'Coloque o elemento na posição encontrada',
                            visual: '✅ Inserindo 2: [2,5,4,6,1]',
                            action: 'Parte ordenada agora: [2,5]'
                        },
                        {
                            number: 4,
                            title: 'Repita o Processo',
                            description: 'Continue com o próximo elemento',
                            visual: '📌 [2,5|4,6,1] → Inserindo 4',
                            action: 'Encontre posição correta para 4 entre 2 e 5'
                        }
                    ]
                },
                advantages: [
                    '✅ Muito eficiente para arrays pequenos',
                    '✅ Algoritmo adaptativo (rápido se já estiver ordenado)',
                    '✅ Estável (mantém ordem de elementos iguais)',
                    '✅ Online (pode ordenar enquanto recebe dados)',
                    '✅ In-place (usa pouca memória extra)'
                ],
                disadvantages: [
                    '❌ O(n²) no pior caso',
                    '❌ Mais trocas que Selection Sort',
                    '❌ Não é adequado para arrays grandes',
                    '❌ Sensível à ordem inicial dos dados'
                ],
                useCase: '📝 Ideal para: Arrays pequenos, dados quase ordenados, implementação híbrida com outros algoritmos',
                codePattern: {
                    concept: 'Inserção ordenada de elementos em sequência crescente',
                    pattern: 'for (i=1; i<n; i++) { key=arr[i]; while(j>=0 && arr[j]>key) shift(); insert(key); }',
                    keyPoints: [
                        'Mantém uma parte ordenada no início',
                        'Insere cada novo elemento na posição correta',
                        'Move elementos maiores para criar espaço',
                        'Eficiente quando dados estão quase ordenados'
                    ]
                }
            },

            quick: {
                name: 'Quick Sort',
                difficulty: 'Difícil',
                complexity: {
                    time: 'O(n log n)',
                    space: 'O(log n)',
                    bestCase: 'O(n log n)',
                    worstCase: 'O(n²)'
                },
                overview: {
                    title: '⚡ Quick Sort - O Algoritmo Relâmpago',
                    description: 'O Quick Sort usa a estratégia "dividir para conquistar": escolhe um elemento como pivô, organiza elementos menores à esquerda e maiores à direita, depois repete recursivamente para cada parte.',
                    realWorldAnalogy: '⚖️ Como um juiz organizando pessoas: coloca todos menores que 1,70m de um lado, maiores do outro, depois organiza cada grupo separadamente.'
                },
                stepByStep: {
                    title: '📋 Como Funciona Passo a Passo',
                    steps: [
                        {
                            number: 1,
                            title: 'Escolha o Pivô',
                            description: 'Selecione um elemento como referência',
                            visual: '🎯 [3,6,8,10,1,2,1] → Pivô = 1 (último)',
                            action: 'Elemento de referência para divisão'
                        },
                        {
                            number: 2,
                            title: 'Particione o Array',
                            description: 'Organize: menores à esquerda, maiores à direita',
                            visual: '⚖️ Menores que 1: [] | Pivô: 1 | Maiores: [3,6,8,10,2]',
                            action: 'Elementos reorganizados em relação ao pivô'
                        },
                        {
                            number: 3,
                            title: 'Pivô na Posição Final',
                            description: 'O pivô agora está na posição correta',
                            visual: '✅ [1|3,6,8,10,2,1] → Pivô 1 ordenado',
                            action: 'Este elemento nunca mais precisará ser movido'
                        },
                        {
                            number: 4,
                            title: 'Recursão',
                            description: 'Repita o processo para cada lado',
                            visual: '🔄 Ordene [3,6,8,10,2,1] recursivamente',
                            action: 'Divida e conquiste até arrays de 1 elemento'
                        }
                    ]
                },
                advantages: [
                    '✅ Muito rápido na média: O(n log n)',
                    '✅ In-place (usa pouca memória extra)',
                    '✅ Amplamente usado na prática',
                    '✅ Boa performance em dados aleatórios',
                    '✅ Algoritmo de "dividir para conquistar"'
                ],
                disadvantages: [
                    '❌ Pior caso O(n²) se pivô mal escolhido',
                    '❌ Não é estável',
                    '❌ Sensível à escolha do pivô',
                    '❌ Pode usar muito stack em casos extremos',
                    '❌ Performance varia com os dados'
                ],
                useCase: '⚡ Ideal para: Arrays grandes, dados aleatórios, quando velocidade é prioridade',
                codePattern: {
                    concept: 'Divisão recursiva baseada em elemento pivô',
                    pattern: 'quickSort(arr, low, high) { pivot = partition(); quickSort(left); quickSort(right); }',
                    keyPoints: [
                        'Escolha inteligente do pivô é crucial',
                        'Particionamento reorganiza elementos',
                        'Recursão divide o problema',
                        'Caso base: array com 1 elemento'
                    ]
                }
            },

            merge: {
                name: 'Merge Sort',
                difficulty: 'Médio',
                complexity: {
                    time: 'O(n log n)',
                    space: 'O(n)',
                    bestCase: 'O(n log n)',
                    worstCase: 'O(n log n)'
                },
                overview: {
                    title: '🤝 Merge Sort - O Algoritmo Combinador',
                    description: 'O Merge Sort divide recursivamente o array pela metade até ter arrays de 1 elemento, depois combina (merge) esses arrays menores de forma ordenada até reconstruir o array completo.',
                    realWorldAnalogy: '📚 Como organizar duas pilhas de livros já ordenadas: compare sempre os topos e pegue o menor, criando uma pilha final ordenada.'
                },
                stepByStep: {
                    title: '📋 Como Funciona Passo a Passo',
                    steps: [
                        {
                            number: 1,
                            title: 'Divida pela Metade',
                            description: 'Separe o array em duas partes iguais',
                            visual: '📂 [38,27,43,3,9,82,10] → [38,27,43] e [3,9,82,10]',
                            action: 'Divisão recursiva até arrays individuais'
                        },
                        {
                            number: 2,
                            title: 'Continue Dividindo',
                            description: 'Divida até ter arrays de 1 elemento',
                            visual: '📂 [38] [27] [43] [3] [9] [82] [10]',
                            action: 'Arrays de 1 elemento já estão "ordenados"'
                        },
                        {
                            number: 3,
                            title: 'Combine Ordenadamente',
                            description: 'Mescle pares de arrays mantendo ordem',
                            visual: '🤝 [27,38] [3,43] [9,82] [10]',
                            action: 'Compare elementos e escolha o menor'
                        },
                        {
                            number: 4,
                            title: 'Continue Mesclando',
                            description: 'Repita até ter o array completo ordenado',
                            visual: '🤝 [3,27,38,43] [9,10,82] → [3,9,10,27,38,43,82]',
                            action: 'Resultado final: array completamente ordenado'
                        }
                    ]
                },
                advantages: [
                    '✅ Performance garantida: sempre O(n log n)',
                    '✅ Algoritmo estável',
                    '✅ Previsível e confiável',
                    '✅ Funciona bem com dados externos',
                    '✅ Paralelizável'
                ],
                disadvantages: [
                    '❌ Usa O(n) de memória extra',
                    '❌ Mais lento que Quick Sort na prática',
                    '❌ Não é in-place',
                    '❌ Overhead de recursão',
                    '❌ Não é adaptativo'
                ],
                useCase: '🤝 Ideal para: Quando estabilidade é importante, dados externos, performance garantida necessária',
                codePattern: {
                    concept: 'Divisão recursiva seguida de mesclagem ordenada',
                    pattern: 'mergeSort(arr) { divide(left, right); merge(leftSorted, rightSorted); }',
                    keyPoints: [
                        'Divisão recursiva até casos base',
                        'Mesclagem ordenada de subsequências',
                        'Usa memória extra para combinar',
                        'Performance consistente independente dos dados'
                    ]
                }
            },

            heap: {
                name: 'Heap Sort',
                difficulty: 'Difícil',
                complexity: {
                    time: 'O(n log n)',
                    space: 'O(1)',
                    bestCase: 'O(n log n)',
                    worstCase: 'O(n log n)'
                },
                overview: {
                    title: '🏔️ Heap Sort - O Algoritmo Montanha',
                    description: 'O Heap Sort primeiro organiza os dados em uma estrutura de heap (árvore binária onde pais são maiores que filhos), depois repetidamente extrai o maior elemento para ordenar o array.',
                    realWorldAnalogy: '🏔️ Como uma montanha onde o topo é sempre o maior: retire o topo, reorganize para manter a propriedade, repita até acabar.'
                },
                stepByStep: {
                    title: '📋 Como Funciona Passo a Passo',
                    steps: [
                        {
                            number: 1,
                            title: 'Construa o Heap',
                            description: 'Transforme o array em um max-heap',
                            visual: '🏗️ [4,10,3,5,1] → Heap: [10,5,3,4,1]',
                            action: 'Maior elemento sempre na raiz (posição 0)'
                        },
                        {
                            number: 2,
                            title: 'Extraia o Máximo',
                            description: 'Mova o maior (raiz) para o final',
                            visual: '🔄 [10,5,3,4,1] → [1,5,3,4,|10]',
                            action: 'Troque raiz com último elemento'
                        },
                        {
                            number: 3,
                            title: 'Restaure o Heap',
                            description: 'Reorganize para manter propriedade do heap',
                            visual: '🔧 [1,5,3,4|10] → [5,4,3,1|10]',
                            action: 'Elemento 10 está na posição final correta'
                        },
                        {
                            number: 4,
                            title: 'Repita o Processo',
                            description: 'Continue até ordenar todos os elementos',
                            visual: '🔄 [5,4,3,1|10] → [1,3,4,5,10]',
                            action: 'Cada iteração coloca um elemento na posição correta'
                        }
                    ]
                },
                advantages: [
                    '✅ Performance garantida: O(n log n)',
                    '✅ In-place (usa O(1) memória extra)',
                    '✅ Não é sensível aos dados de entrada',
                    '✅ Pode ser usado para encontrar k maiores elementos',
                    '✅ Bom para sistemas com limitação de memória'
                ],
                disadvantages: [
                    '❌ Não é estável',
                    '❌ Constantes maiores que Quick Sort',
                    '❌ Acesso não sequencial à memória',
                    '❌ Complexo de implementar corretamente',
                    '❌ Não é adaptativo'
                ],
                useCase: '🏔️ Ideal para: Sistemas com limitação de memória, quando performance garantida é necessária',
                codePattern: {
                    concept: 'Estrutura de heap para extração ordenada de elementos',
                    pattern: 'buildHeap(arr); for(i=n-1; i>0; i--) { swap(0,i); heapify(0,i); }',
                    keyPoints: [
                        'Construção inicial do heap',
                        'Extração sucessiva do elemento máximo',
                        'Manutenção da propriedade do heap',
                        'Uso eficiente de espaço in-place'
                    ]
                }
            }
        };

        // Interactive learning modules
        this.learningModules = {
            timeComplexity: {
                title: '⏱️ Complexidade de Tempo',
                content: 'A complexidade de tempo mede quantas operações um algoritmo precisa fazer...',
                interactiveDemo: true
            },
            spaceComplexity: {
                title: '💾 Complexidade de Espaço',
                content: 'A complexidade de espaço mede quanta memória extra o algoritmo usa...',
                interactiveDemo: true
            },
            stability: {
                title: '⚖️ Estabilidade de Algoritmos',
                content: 'Um algoritmo é estável se mantém a ordem relativa de elementos iguais...',
                interactiveDemo: true
            }
        };

        // Contextual tooltips and hints
        this.contextualHelp = {
            comparison: {
                title: 'Comparação de Elementos',
                content: 'Quando dois elementos são comparados, determinamos qual é maior, menor ou se são iguais.',
                tip: '💡 Dica: O número de comparações é uma métrica importante de eficiência!'
            },
            swap: {
                title: 'Troca de Elementos',
                content: 'Trocar elementos significa mudar suas posições no array.',
                tip: '💡 Dica: Alguns algoritmos minimizam trocas, outros minimizam comparações!'
            },
            recursion: {
                title: 'Recursão',
                content: 'Recursão é quando uma função chama a si mesma para resolver subproblemas.',
                tip: '💡 Dica: Sempre tenha um caso base para evitar recursão infinita!'
            }
        };
    }

    initializeInteractiveFeatures() {
        // Create enhanced educational interface
        this.createEnhancedEducationalPanel();
        this.createTooltipSystem();
        this.createProgressTracker();
        this.createInteractiveTutorials();
    }

    createEnhancedEducationalPanel() {
        // Check if panel already exists
        if (document.getElementById('enhancedEduPanel')) return;

        const panel = document.createElement('div');
        panel.id = 'enhancedEduPanel';
        panel.className = 'enhanced-educational-panel';
        panel.innerHTML = `
            <div class="edu-panel-header">
                <h3>📚 Sistema Educacional Avançado</h3>
                <div class="edu-controls">
                    <button id="toggleAdvanced" class="btn btn-outline">🔬 Conceitos Avançados</button>
                    <button id="showProgress" class="btn btn-outline">📊 Meu Progresso</button>
                    <button id="interactiveMode" class="btn btn-outline">🎮 Modo Interativo</button>
                </div>
            </div>
            
            <div class="edu-content-tabs">
                <div class="edu-tab-navigation">
                    <button class="edu-tab-btn active" data-tab="overview">🌟 Visão Geral</button>
                    <button class="edu-tab-btn" data-tab="stepbystep">📋 Passo a Passo</button>
                    <button class="edu-tab-btn" data-tab="analysis">📊 Análise</button>
                    <button class="edu-tab-btn" data-tab="comparison">⚖️ Comparação</button>
                    <button class="edu-tab-btn" data-tab="practice">🎯 Prática</button>
                </div>
                
                <div class="edu-tab-contents">
                    <div id="overview-content" class="edu-tab-pane active">
                        <div class="algorithm-overview-card">
                            <div class="overview-header">
                                <h2 id="algorithmTitle">Selecione um Algoritmo</h2>
                                <div class="algorithm-badges">
                                    <span id="difficultyBadge" class="difficulty-badge">-</span>
                                    <span id="complexityBadge" class="complexity-badge">-</span>
                                </div>
                            </div>
                            <div class="overview-content">
                                <div class="real-world-analogy">
                                    <h4>🌍 Analogia do Mundo Real</h4>
                                    <p id="realWorldAnalogy">Selecione um algoritmo para ver a analogia.</p>
                                </div>
                                <div class="algorithm-description">
                                    <h4>📝 Descrição</h4>
                                    <p id="algorithmDescription">Selecione um algoritmo para ver a descrição detalhada.</p>
                                </div>
                                <div class="pros-cons">
                                    <div class="advantages">
                                        <h4>✅ Vantagens</h4>
                                        <ul id="algorithmAdvantages"></ul>
                                    </div>
                                    <div class="disadvantages">
                                        <h4>❌ Desvantagens</h4>
                                        <ul id="algorithmDisadvantages"></ul>
                                    </div>
                                </div>
                                <div class="use-case">
                                    <h4>🎯 Quando Usar</h4>
                                    <p id="algorithmUseCase">-</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div id="stepbystep-content" class="edu-tab-pane">
                        <div class="step-by-step-guide">
                            <h3>📋 Guia Passo a Passo</h3>
                            <div id="stepByStepContainer" class="steps-container">
                                <div class="welcome-message" style="text-align: center; padding: 40px 20px;">
                                    <div style="font-size: 4em; margin-bottom: 20px;">🎯</div>
                                    <h2 style="color: #667eea; margin-bottom: 15px;">Bem-vindo ao Guia Passo a Passo!</h2>
                                    <p style="font-size: 1.1em; color: #666; margin-bottom: 30px;">
                                        Selecione um algoritmo acima para ver um tutorial detalhado com exemplos visuais e explicações passo a passo.
                                    </p>
                                    <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                                        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 12px; max-width: 200px;">
                                            <div style="font-size: 2.5em; margin-bottom: 10px;">7</div>
                                            <div>Algoritmos Disponíveis</div>
                                        </div>
                                        <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 20px; border-radius: 12px; max-width: 200px;">
                                            <div style="font-size: 2.5em; margin-bottom: 10px;">📚</div>
                                            <div>Exemplos Interativos</div>
                                        </div>
                                        <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 20px; border-radius: 12px; max-width: 200px;">
                                            <div style="font-size: 2.5em; margin-bottom: 10px;">🎓</div>
                                            <div>Aprendizado Prático</div>
                                        </div>
                                    </div>
                                    <div style="margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 12px; text-align: left;">
                                        <h4 style="color: #667eea; margin-bottom: 15px;">💡 Dica: Comece por aqui</h4>
                                        <ol style="margin: 0; padding-left: 20px; line-height: 1.8;">
                                            <li><strong>Bubble Sort</strong> - Ideal para iniciantes</li>
                                            <li><strong>Selection Sort</strong> - Conceitos fundamentais</li>
                                            <li><strong>Quick Sort</strong> - Para usuários avançados</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div id="analysis-content" class="edu-tab-pane">
                        <div class="complexity-analysis">
                            <h3>📊 Análise de Complexidade</h3>
                            <div id="complexityAnalysis" class="analysis-grid">
                                <div class="welcome-message" style="text-align: center; padding: 30px;">
                                    <div style="font-size: 3em; margin-bottom: 15px;">📊</div>
                                    <p style="color: #666; font-size: 1.1em;">
                                        Selecione um algoritmo para ver análise detalhada de complexidade temporal e espacial.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="pattern-analysis">
                            <h3>🧩 Padrão Algorítmico</h3>
                            <div id="patternAnalysis" class="pattern-content">
                                <div class="welcome-message" style="text-align: center; padding: 30px;">
                                    <div style="font-size: 3em; margin-bottom: 15px;">🧩</div>
                                    <p style="color: #666; font-size: 1.1em;">
                                        Aprenda os padrões de código e conceitos fundamentais de cada algoritmo.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div id="comparison-content" class="edu-tab-pane">
                        <div class="algorithm-comparison">
                            <h3>⚖️ Comparação entre Algoritmos</h3>
                            <div id="comparisonMatrix" class="comparison-matrix">
                                <div class="welcome-message" style="text-align: center; padding: 30px;">
                                    <div style="font-size: 3em; margin-bottom: 15px;">⚖️</div>
                                    <h4 style="color: #667eea; margin-bottom: 15px;">Compare Algoritmos Lado a Lado</h4>
                                    <p style="color: #666; margin-bottom: 20px;">
                                        Veja as diferenças entre os algoritmos de ordenação em termos de complexidade, vantagens e casos de uso.
                                    </p>
                                    <p style="background: #e8eaf6; padding: 15px; border-radius: 8px; border-left: 4px solid #667eea;">
                                        <strong>💡 Dica:</strong> Use o botão "🆚 Comparar Algoritmos" no menu principal para comparações visuais em tempo real!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div id="practice-content" class="edu-tab-pane">
                        <div class="practice-exercises">
                            <h3>🎯 Exercícios Práticos</h3>
                            <div id="practiceContainer" class="practice-content">
                                <div class="welcome-message" style="text-align: center; padding: 30px;">
                                    <div style="font-size: 3em; margin-bottom: 15px;">🎯</div>
                                    <h4 style="color: #667eea; margin-bottom: 15px;">Pratique e Aprenda Fazendo!</h4>
                                    <p style="color: #666; margin-bottom: 20px;">
                                        Exercícios interativos e desafios práticos para testar seu conhecimento.
                                    </p>
                                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 20px;">
                                        <div style="padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px;">
                                            <div style="font-size: 2em; margin-bottom: 10px;">🎮</div>
                                            <strong>Modo Interativo</strong>
                                            <p style="font-size: 0.9em; margin: 10px 0 0 0;">Execute os algoritmos e observe em tempo real</p>
                                        </div>
                                        <div style="padding: 20px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px;">
                                            <div style="font-size: 2em; margin-bottom: 10px;">🏆</div>
                                            <strong>Conquistas</strong>
                                            <p style="font-size: 0.9em; margin: 10px 0 0 0;">Ganhe pontos e desbloqueie medalhas</p>
                                        </div>
                                        <div style="padding: 20px; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 12px;">
                                            <div style="font-size: 2em; margin-bottom: 10px;">📈</div>
                                            <strong>Progresso</strong>
                                            <p style="font-size: 0.9em; margin: 10px 0 0 0;">Acompanhe sua evolução</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Insert after existing educational content
        const existingPanel = document.querySelector('.educational-content');
        if (existingPanel) {
            existingPanel.parentNode.insertBefore(panel, existingPanel.nextSibling);
        } else {
            document.body.appendChild(panel);
        }
    }

    createTooltipSystem() {
        // Create floating tooltip for contextual help
        const tooltip = document.createElement('div');
        tooltip.id = 'contextualTooltip';
        tooltip.className = 'contextual-tooltip';
        tooltip.style.display = 'none';
        document.body.appendChild(tooltip);

        // Add hover listeners to array bars and UI elements
        this.addContextualHelpListeners();
    }

    createProgressTracker() {
        const tracker = document.createElement('div');
        tracker.id = 'learningProgress';
        tracker.className = 'learning-progress-tracker';
        tracker.innerHTML = `
            <div class="progress-header">
                <h4>📊 Seu Progresso de Aprendizado</h4>
                <button id="closeProgress" class="btn btn-outline">✕</button>
            </div>
            <div class="progress-content">
                <div class="overall-progress">
                    <h5>🎯 Progresso Geral</h5>
                    <div class="progress-bar">
                        <div id="overallProgressFill" class="progress-fill"></div>
                    </div>
                    <span id="overallProgressText">0%</span>
                </div>
                <div class="algorithm-progress">
                    <h5>📚 Algoritmos Estudados</h5>
                    <div id="algorithmProgressList" class="progress-list"></div>
                </div>
                <div class="achievements">
                    <h5>🏆 Conquistas de Aprendizado</h5>
                    <div id="learningAchievements" class="achievements-grid"></div>
                </div>
            </div>
        `;
        tracker.style.display = 'none';
        document.body.appendChild(tracker);
    }

    createInteractiveTutorials() {
        // Interactive step-through tutorial system
        this.tutorialSystem = {
            currentStep: 0,
            isActive: false,
            steps: []
        };
    }

    bindEvents() {
        // Enhanced educational panel events
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('edu-tab-btn')) {
                this.switchEducationalTab(e.target.dataset.tab);
            } else if (e.target.id === 'toggleAdvanced') {
                this.toggleAdvancedConcepts();
            } else if (e.target.id === 'showProgress') {
                this.showProgressTracker();
            } else if (e.target.id === 'interactiveMode') {
                this.toggleInteractiveMode();
            } else if (e.target.id === 'closeProgress') {
                this.hideProgressTracker();
            }
        });

        // Contextual help on hover
        document.addEventListener('mouseover', (e) => {
            if (e.target.classList.contains('array-bar')) {
                this.showContextualTooltip(e.target, 'array-element');
            } else if (e.target.classList.contains('comparison-highlight')) {
                this.showContextualTooltip(e.target, 'comparison');
            } else if (e.target.classList.contains('swap-highlight')) {
                this.showContextualTooltip(e.target, 'swap');
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.classList.contains('array-bar') || 
                e.target.classList.contains('comparison-highlight') ||
                e.target.classList.contains('swap-highlight')) {
                this.hideContextualTooltip();
            }
        });
    }

    setCurrentAlgorithm(algorithm) {
        this.currentAlgorithm = algorithm;
        this.updateEducationalContent();
        this.markTopicAsVisited(algorithm);
    }

    updateEducationalContent() {
        if (!this.currentAlgorithm || !this.algorithmDetails[this.currentAlgorithm]) {
            return;
        }

        const details = this.algorithmDetails[this.currentAlgorithm];
        
        // Update overview tab
        this.updateOverviewTab(details);
        
        // Update step-by-step tab
        this.updateStepByStepTab(details);
        
        // Update analysis tab
        this.updateAnalysisTab(details);
        
        // Update comparison tab
        this.updateComparisonTab(details);
    }

    updateOverviewTab(details) {
        // Update header
        const titleEl = document.getElementById('algorithmTitle');
        const difficultyEl = document.getElementById('difficultyBadge');
        const complexityEl = document.getElementById('complexityBadge');
        
        if (titleEl) titleEl.textContent = details.overview.title;
        if (difficultyEl) {
            difficultyEl.textContent = details.difficulty;
            difficultyEl.className = `difficulty-badge ${details.difficulty.toLowerCase()}`;
        }
        if (complexityEl) complexityEl.textContent = details.complexity.time;

        // Update content
        const analogyEl = document.getElementById('realWorldAnalogy');
        const descriptionEl = document.getElementById('algorithmDescription');
        const advantagesEl = document.getElementById('algorithmAdvantages');
        const disadvantagesEl = document.getElementById('algorithmDisadvantages');
        const useCaseEl = document.getElementById('algorithmUseCase');
        
        if (analogyEl) analogyEl.textContent = details.overview.realWorldAnalogy;
        if (descriptionEl) descriptionEl.textContent = details.overview.description;
        if (useCaseEl) useCaseEl.textContent = details.useCase;
        
        if (advantagesEl) {
            advantagesEl.innerHTML = details.advantages.map(adv => `<li>${adv}</li>`).join('');
        }
        
        if (disadvantagesEl) {
            disadvantagesEl.innerHTML = details.disadvantages.map(dis => `<li>${dis}</li>`).join('');
        }
    }

    updateStepByStepTab(details) {
        const container = document.getElementById('stepByStepContainer');
        if (!container) return;

        const stepsByStep = details.stepByStep;
        container.innerHTML = `
            <div class="steps-header">
                <h4>${stepsByStep.title}</h4>
            </div>
            <div class="steps-list">
                ${stepsByStep.steps.map((step, index) => `
                    <div class="step-card" data-step="${index}">
                        <div class="step-number">${step.number}</div>
                        <div class="step-content">
                            <h5>${step.title}</h5>
                            <p class="step-description">${step.description}</p>
                            <div class="step-visual">
                                <code>${step.visual}</code>
                            </div>
                            <div class="step-action">
                                <strong>Ação:</strong> ${step.action}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        // Add interactive step navigation
        container.querySelectorAll('.step-card').forEach(card => {
            card.addEventListener('click', () => {
                const stepIndex = parseInt(card.dataset.step);
                this.highlightStep(stepIndex);
            });
        });
    }

    updateAnalysisTab(details) {
        const analysisContainer = document.getElementById('complexityAnalysis');
        const patternContainer = document.getElementById('patternAnalysis');
        
        if (analysisContainer) {
            analysisContainer.innerHTML = `
                <div class="complexity-cards">
                    <div class="complexity-card time">
                        <h4>⏱️ Complexidade de Tempo</h4>
                        <div class="complexity-details">
                            <div class="complexity-item">
                                <span class="label">Melhor Caso:</span>
                                <span class="value">${details.complexity.bestCase}</span>
                            </div>
                            <div class="complexity-item">
                                <span class="label">Caso Médio:</span>
                                <span class="value">${details.complexity.time}</span>
                            </div>
                            <div class="complexity-item">
                                <span class="label">Pior Caso:</span>
                                <span class="value">${details.complexity.worstCase}</span>
                            </div>
                        </div>
                    </div>
                    <div class="complexity-card space">
                        <h4>💾 Complexidade de Espaço</h4>
                        <div class="complexity-value">${details.complexity.space}</div>
                        <p class="complexity-explanation">
                            ${this.getSpaceComplexityExplanation(details.complexity.space)}
                        </p>
                    </div>
                </div>
            `;
        }

        if (patternContainer && details.codePattern) {
            patternContainer.innerHTML = `
                <div class="pattern-card">
                    <h4>🧩 Conceito Principal</h4>
                    <p>${details.codePattern.concept}</p>
                </div>
                <div class="pattern-card">
                    <h4>🔄 Padrão de Código</h4>
                    <code class="pattern-code">${details.codePattern.pattern}</code>
                </div>
                <div class="pattern-card">
                    <h4>🔑 Pontos-Chave</h4>
                    <ul>
                        ${details.codePattern.keyPoints.map(point => `<li>${point}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
    }

    updateComparisonTab(details) {
        const comparisonContainer = document.getElementById('comparisonMatrix');
        if (!comparisonContainer) return;

        // Create comparison matrix with other algorithms
        const algorithms = Object.keys(this.algorithmDetails);
        const currentAlgorithm = this.currentAlgorithm;
        
        comparisonContainer.innerHTML = `
            <div class="comparison-table-container">
                <table class="algorithm-comparison-table">
                    <thead>
                        <tr>
                            <th>Algoritmo</th>
                            <th>Dificuldade</th>
                            <th>Tempo (Médio)</th>
                            <th>Espaço</th>
                            <th>Estável</th>
                            <th>In-place</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${algorithms.map(alg => {
                            const algDetails = this.algorithmDetails[alg];
                            const isCurrent = alg === currentAlgorithm;
                            return `
                                <tr class="${isCurrent ? 'current-algorithm' : ''}">
                                    <td><strong>${algDetails.name}</strong></td>
                                    <td><span class="difficulty ${algDetails.difficulty.toLowerCase()}">${algDetails.difficulty}</span></td>
                                    <td>${algDetails.complexity.time}</td>
                                    <td>${algDetails.complexity.space}</td>
                                    <td>${this.isStableAlgorithm(alg) ? '✅' : '❌'}</td>
                                    <td>${this.isInPlaceAlgorithm(alg) ? '✅' : '❌'}</td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
            <div class="comparison-insights">
                <h4>💡 Insights de Comparação</h4>
                <div class="insights-content">
                    ${this.generateComparisonInsights(currentAlgorithm)}
                </div>
            </div>
        `;
    }

    switchEducationalTab(tabName) {
        // Remove active class from all tabs and contents
        document.querySelectorAll('.edu-tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelectorAll('.edu-tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });
        
        // Add active class to clicked tab and corresponding content
        const activeBtn = document.querySelector(`[data-tab="${tabName}"]`);
        const activeContent = document.getElementById(`${tabName}-content`);
        
        if (activeBtn) activeBtn.classList.add('active');
        if (activeContent) activeContent.classList.add('active');
        
        this.currentTopic = tabName;
        this.markTopicAsVisited(`${this.currentAlgorithm}-${tabName}`);
    }

    toggleAdvancedConcepts() {
        this.showAdvancedConcepts = !this.showAdvancedConcepts;
        const button = document.getElementById('toggleAdvanced');
        
        if (this.showAdvancedConcepts) {
            button.textContent = '🔬 Ocultar Avançados';
            document.body.classList.add('show-advanced-concepts');
        } else {
            button.textContent = '🔬 Conceitos Avançados';
            document.body.classList.remove('show-advanced-concepts');
        }
        
        this.updateEducationalContent();
    }

    toggleInteractiveMode() {
        this.interactiveMode = !this.interactiveMode;
        const button = document.getElementById('interactiveMode');
        
        if (this.interactiveMode) {
            button.textContent = '🎮 Sair do Interativo';
            this.enableInteractiveFeatures();
        } else {
            button.textContent = '🎮 Modo Interativo';
            this.disableInteractiveFeatures();
        }
    }

    enableInteractiveFeatures() {
        // Add interactive elements to visualization
        document.body.classList.add('interactive-mode');
        
        // Add click handlers to array elements
        document.querySelectorAll('.array-bar').forEach(bar => {
            bar.addEventListener('click', (e) => {
                this.handleInteractiveElementClick(e.target);
            });
        });
    }

    disableInteractiveFeatures() {
        document.body.classList.remove('interactive-mode');
        
        // Remove interactive click handlers
        document.querySelectorAll('.array-bar').forEach(bar => {
            bar.replaceWith(bar.cloneNode(true));
        });
    }

    handleInteractiveElementClick(element) {
        const value = element.dataset.value;
        const index = element.dataset.index;
        
        this.showElementDetails(value, index, element);
    }

    showElementDetails(value, index, element) {
        const details = `
            <div class="element-details">
                <h4>📊 Detalhes do Elemento</h4>
                <p><strong>Valor:</strong> ${value}</p>
                <p><strong>Posição:</strong> ${index}</p>
                <p><strong>Estado:</strong> ${this.getElementState(element)}</p>
            </div>
        `;
        
        this.showContextualTooltip(element, 'element-details', details);
    }

    showContextualTooltip(element, type, customContent = null) {
        const tooltip = document.getElementById('contextualTooltip');
        if (!tooltip) return;

        let content = customContent;
        if (!content && this.contextualHelp[type]) {
            const help = this.contextualHelp[type];
            content = `
                <h4>${help.title}</h4>
                <p>${help.content}</p>
                <div class="tooltip-tip">${help.tip}</div>
            `;
        }

        if (content) {
            tooltip.innerHTML = content;
            tooltip.style.display = 'block';
            
            const rect = element.getBoundingClientRect();
            tooltip.style.left = `${rect.left + rect.width / 2}px`;
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
        }
    }

    hideContextualTooltip() {
        const tooltip = document.getElementById('contextualTooltip');
        if (tooltip) {
            tooltip.style.display = 'none';
        }
    }

    showProgressTracker() {
        const tracker = document.getElementById('learningProgress');
        if (tracker) {
            this.updateProgressData();
            tracker.style.display = 'block';
        }
    }

    hideProgressTracker() {
        const tracker = document.getElementById('learningProgress');
        if (tracker) {
            tracker.style.display = 'none';
        }
    }

    updateProgressData() {
        const totalTopics = Object.keys(this.algorithmDetails).length * 5; // 5 tabs per algorithm
        const completedTopics = this.completedTopics.size;
        const progressPercentage = Math.round((completedTopics / totalTopics) * 100);
        
        // Update overall progress
        const progressFill = document.getElementById('overallProgressFill');
        const progressText = document.getElementById('overallProgressText');
        
        if (progressFill) progressFill.style.width = `${progressPercentage}%`;
        if (progressText) progressText.textContent = `${progressPercentage}%`;
        
        // Update algorithm progress list
        this.updateAlgorithmProgressList();
        
        // Update achievements
        this.updateLearningAchievements();
    }

    updateAlgorithmProgressList() {
        const listContainer = document.getElementById('algorithmProgressList');
        if (!listContainer) return;

        const algorithms = Object.keys(this.algorithmDetails);
        listContainer.innerHTML = algorithms.map(alg => {
            const completed = this.getAlgorithmCompletionCount(alg);
            const total = 5; // Number of tabs
            const percentage = Math.round((completed / total) * 100);
            
            return `
                <div class="algorithm-progress-item">
                    <div class="algorithm-name">${this.algorithmDetails[alg].name}</div>
                    <div class="progress-bar small">
                        <div class="progress-fill" style="width: ${percentage}%"></div>
                    </div>
                    <div class="progress-text">${completed}/${total}</div>
                </div>
            `;
        }).join('');
    }

    updateLearningAchievements() {
        const container = document.getElementById('learningAchievements');
        if (!container) return;

        const achievements = this.calculateLearningAchievements();
        container.innerHTML = achievements.map(achievement => `
            <div class="achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-title">${achievement.title}</div>
                <div class="achievement-description">${achievement.description}</div>
            </div>
        `).join('');
    }

    // Helper methods
    markTopicAsVisited(topic) {
        this.completedTopics.add(topic);
        this.saveProgress();
    }

    saveProgress() {
        this.userProgress = {
            completedTopics: Array.from(this.completedTopics),
            lastVisited: new Date().toISOString(),
            showAdvancedConcepts: this.showAdvancedConcepts
        };
        localStorage.setItem('learningProgress', JSON.stringify(this.userProgress));
    }

    getAlgorithmCompletionCount(algorithm) {
        const tabs = ['overview', 'stepbystep', 'analysis', 'comparison', 'practice'];
        return tabs.filter(tab => this.completedTopics.has(`${algorithm}-${tab}`)).length;
    }

    getSpaceComplexityExplanation(complexity) {
        const explanations = {
            'O(1)': 'Usa uma quantidade constante de memória adicional',
            'O(n)': 'Usa memória proporcional ao tamanho do array',
            'O(log n)': 'Usa memória logarítmica (geralmente para recursão)'
        };
        return explanations[complexity] || 'Complexidade de espaço específica do algoritmo';
    }

    isStableAlgorithm(algorithm) {
        const stableAlgorithms = ['bubble', 'insertion', 'merge'];
        return stableAlgorithms.includes(algorithm);
    }

    isInPlaceAlgorithm(algorithm) {
        const inPlaceAlgorithms = ['bubble', 'selection', 'insertion', 'quick', 'heap'];
        return inPlaceAlgorithms.includes(algorithm);
    }

    generateComparisonInsights(currentAlgorithm) {
        const current = this.algorithmDetails[currentAlgorithm];
        const insights = [];

        // Performance insight
        if (current.complexity.time === 'O(n²)') {
            insights.push('⚠️ Este algoritmo tem complexidade quadrática - considere Quick Sort ou Merge Sort para arrays grandes.');
        } else if (current.complexity.time === 'O(n log n)') {
            insights.push('✅ Excelente escolha para arrays grandes com complexidade O(n log n).');
        }

        // Memory insight
        if (current.complexity.space === 'O(1)') {
            insights.push('💾 Algoritmo in-place - usa memória mínima adicional.');
        } else if (current.complexity.space === 'O(n)') {
            insights.push('💾 Usa memória adicional proporcional ao tamanho do array.');
        }

        // Stability insight
        if (this.isStableAlgorithm(currentAlgorithm)) {
            insights.push('⚖️ Algoritmo estável - mantém ordem relativa de elementos iguais.');
        }

        return insights.map(insight => `<p>${insight}</p>`).join('');
    }

    calculateLearningAchievements() {
        const achievements = [
            {
                id: 'first_algorithm',
                title: '🎯 Primeiro Algoritmo',
                description: 'Estudou seu primeiro algoritmo completamente',
                icon: '🥇',
                unlocked: this.getCompletedAlgorithms().length >= 1
            },
            {
                id: 'complexity_master',
                title: '📊 Mestre da Complexidade',
                description: 'Visitou a aba de análise em 3 algoritmos',
                icon: '🧮',
                unlocked: this.getAnalysisTabVisits() >= 3
            },
            {
                id: 'comparison_expert',
                title: '⚖️ Expert em Comparação',
                description: 'Comparou diferentes algoritmos',
                icon: '🔍',
                unlocked: this.completedTopics.has('comparison')
            },
            {
                id: 'interactive_learner',
                title: '🎮 Aprendiz Interativo',
                description: 'Usou o modo interativo',
                icon: '🎯',
                unlocked: this.interactiveMode
            }
        ];

        return achievements;
    }

    getCompletedAlgorithms() {
        const algorithms = Object.keys(this.algorithmDetails);
        return algorithms.filter(alg => this.getAlgorithmCompletionCount(alg) >= 4);
    }

    getAnalysisTabVisits() {
        const algorithms = Object.keys(this.algorithmDetails);
        return algorithms.filter(alg => this.completedTopics.has(`${alg}-analysis`)).length;
    }

    getElementState(element) {
        if (element.classList.contains('comparing')) return 'Sendo comparado';
        if (element.classList.contains('swapping')) return 'Sendo trocado';
        if (element.classList.contains('sorted')) return 'Ordenado';
        return 'Aguardando';
    }

    addContextualHelpListeners() {
        // Add listeners for educational hover effects
        document.addEventListener('mouseover', (e) => {
            if (e.target.classList.contains('progress-stat')) {
                this.showContextualTooltip(e.target, 'statistics');
            }
        });
    }
}

// Initialize enhanced educational system
document.addEventListener('DOMContentLoaded', () => {
    window.enhancedEducationalController = new EnhancedEducationalController();
    
    // Cria alias para compatibilidade com código antigo
    window.educationalController = window.enhancedEducationalController;
    console.log('✅ Sistema educacional unificado inicializado');
    console.log('   - enhancedEducationalController: ativado');
    console.log('   - educationalController (alias): ativado');
});