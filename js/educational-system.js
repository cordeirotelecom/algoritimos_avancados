// ===== EDUCATIONAL SYSTEM CONTROLLER =====

class EducationalController {
    constructor() {
        this.currentTab = 'explanation';
        this.currentQuizQuestion = 0;
        this.quizScore = 0;
        this.currentAlgorithm = null;
        this.codeExamples = {};
        this.quizQuestions = {};
        this.conceptExplanations = {};
        
        this.initializeEducationalContent();
        this.initializeCodePatterns();
        this.initializeEventListeners();
    }

    initializeEducationalContent() {
        // Define detailed code examples for each algorithm
        this.codeExamples = {
            bubble: {
                code: `function bubbleSort(arr) {
    console.log("🫧 Iniciando Bubble Sort!");
    
    // Loop externo: passa por todo o array
    for (let i = 0; i < arr.length - 1; i++) {
        console.log(\`🔄 Passada \${i + 1}\`);
        
        // Loop interno: compara elementos adjacentes
        for (let j = 0; j < arr.length - i - 1; j++) {
            console.log(\`🔍 Comparando \${arr[j]} e \${arr[j + 1]}\`);
            
            // Se o elemento atual e maior que o proximo
            if (arr[j] > arr[j + 1]) {
                console.log(\`🔄 Trocando \${arr[j]} ↔ \${arr[j + 1]}\`);
                
                // Realiza a troca
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
        console.log(\`✅ Apos passada \${i + 1}: [\${arr.join(', ')}]\`);
    }
    
    console.log("🎉 Array ordenado:", arr);
    return arr;
}`,
                explanation: "O Bubble Sort e como bolhas subindo na agua! Os elementos maiores 'borbulham' para o final do array atraves de trocas sucessivas.",
                steps: [
                    "Compare elementos adjacentes do inicio ao fim",
                    "Se estao fora de ordem, troque-os de posicao", 
                    "Repita ate que nenhuma troca seja necessaria",
                    "Cada passada garante que o maior elemento vai para o final"
                ]
            },
            selection: {
                code: `function selectionSort(arr) {
    console.log("🎯 Iniciando Selection Sort!");
    
    // Para cada posicao do array
    for (let i = 0; i < arr.length - 1; i++) {
        console.log(\`🔍 Procurando menor elemento da posicao \${i}\`);
        
        // Assume que o primeiro elemento e o menor
        let minIndex = i;
        
        // Procura o menor elemento no resto do array
        for (let j = i + 1; j < arr.length; j++) {
            console.log(\`⚖️ Comparando \${arr[j]} com \${arr[minIndex]}\`);
            
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
                console.log(\`📍 Novo menor: \${arr[minIndex]} na posicao \${minIndex}\`);
            }
        }
        
                // Se encontrou um menor, troca com a posicao atual
        if (minIndex !== i) {
            console.log(\`🔄 Trocando \${arr[i]} ↔ \${arr[minIndex]}\`);
            let temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
        
        console.log(\`✅ posicao \${i} definida: [\${arr.join(', ')}]\`);
    }
    
    console.log("🎉 Array ordenado:", arr);
    return arr;
}`,
                explanation: "Selection Sort e como organizar cartas: sempre seleciona o menor elemento e coloca na posicao correta!",
                steps: [
                    "Encontre o menor elemento em todo o array",
                    "Coloque-o na primeira posicao",
                    "Encontre o segundo menor no resto do array",
                    "Repita ate ordenar todos os elementos"
                ]
            },
            insertion: {
                code: `function insertionSort(arr) {
    console.log("📝 Iniciando Insertion Sort!");
    
    // Comeca do segundo elemento (indice 1)
    for (let i = 1; i < arr.length; i++) {
        let current = arr[i];
        let j = i - 1;
        
        console.log(\`📌 Inserindo \${current} na posicao correta\`);
        
        // Move elementos maiores que 'current' uma posicao a frente
        while (j >= 0 && arr[j] > current) {
            console.log(\`⬅️ Movendo \${arr[j]} para a direita\`);
            arr[j + 1] = arr[j];
            j--;
        }
        
        // Insere o elemento na posicao correta
        arr[j + 1] = current;
        console.log(\`✅ \${current} inserido: [\${arr.join(', ')}]\`);
    }
    
    console.log("🎉 Array ordenado:", arr);
    return arr;
}`,
                explanation: "Insertion Sort e como ordenar cartas na mao: pega cada carta e insere na posicao correta entre as ja ordenadas!",
                steps: [
                    "Considere o primeiro elemento como ja ordenado",
                    "Pegue o proximo elemento",
                    "Encontre sua posicao correta na parte ordenada",
                    "Insira o elemento, movendo os outros se necessario"
                ]
            },
            quick: {
                code: `function quickSort(arr, low = 0, high = arr.length - 1) {
    console.log(\`⚡ QuickSort: ordenando [\${arr.slice(low, high + 1).join(', ')}]\`);
    
    if (low < high) {
                // Particiona o array e obtem a posicao do pivot
        let pivotIndex = partition(arr, low, high);
        
        console.log(\`🎯 Pivo \${arr[pivotIndex]} na posicao \${pivotIndex}\`);
        
        // Ordena recursivamente as duas metades
        quickSort(arr, low, pivotIndex - 1);  // Esquerda
        quickSort(arr, pivotIndex + 1, high); // Direita
    }
    
    return arr;
}

function partition(arr, low, high) {
    // Escolhe o ultimo elemento como pivo
    let pivot = arr[high];
    console.log(\`🎯 Pivo escolhido: \${pivot}\`);
    
    let i = low - 1; // indice do menor elemento
    
    for (let j = low; j < high; j++) {
        console.log(\`🔍 Comparando \${arr[j]} com pivo \${pivot}\`);
        
        // Se o elemento atual e menor ou igual ao pivo
        if (arr[j] <= pivot) {
            i++;
            console.log(\`🔄 Trocando \${arr[i]} ↔ \${arr[j]}\`);
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    
    // Coloca o pivo na posicao correta
    console.log(\`🎯 Colocando pivo na posicao \${i + 1}\`);
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    
    return i + 1;
}`,
                explanation: "Quick Sort usa a estrategia 'dividir para conquistar': escolhe um pivo e organiza elementos menores a esquerda e maiores a direita!",
                steps: [
                    "Escolha um elemento como pivo (geralmente o ultimo)",
                    "Reorganize: menores a esquerda, maiores a direita",
                    "O pivo esta na posicao final correta",
                    "Repita recursivamente para as duas metades"
                ]
            },
            merge: {
                code: `function mergeSort(arr) {
    console.log(\`🔄 MergeSort: dividindo [\${arr.join(', ')}]\`);
    
    // Caso base: array com 1 elemento ja esta ordenado
    if (arr.length <= 1) {
        return arr;
    }
    
    // Divide o array pela metade
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
    
    console.log(\`📂 Dividindo em: [\${left.join(', ')}] e [\${right.join(', ')}]\`);
    
    // Ordena recursivamente cada metade
    const leftSorted = mergeSort(left);
    const rightSorted = mergeSort(right);
    
    // Combina as metades ordenadas
    return merge(leftSorted, rightSorted);
}

function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    
    console.log(\`🤝 Mesclando [\${left.join(', ')}] e [\${right.join(', ')}]\`);
    
    // Compara elementos de ambos os arrays
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] <= right[rightIndex]) {
            result.push(left[leftIndex]);
            console.log(\`⬅️ Pegando \${left[leftIndex]} da esquerda\`);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            console.log(\`➡️ Pegando \${right[rightIndex]} da direita\`);
            rightIndex++;
        }
    }
    
    // Adiciona elementos restantes
    while (leftIndex < left.length) {
        result.push(left[leftIndex]);
        leftIndex++;
    }
    
    while (rightIndex < right.length) {
        result.push(right[rightIndex]);
        rightIndex++;
    }
    
    console.log(\`✅ Resultado da mesclagem: [\${result.join(', ')}]\`);
    return result;
}`,
                explanation: "Merge Sort divide o problema pela metade repetidamente, depois combina as solucoes de forma ordenada!",
                steps: [
                    "Divida o array pela metade recursivamente",
                    "Continue ate ter arrays de 1 elemento",
                    "Combine arrays de volta, sempre ordenado",
                    "O resultado final e o array completamente ordenado"
                ]
            },
            heap: {
                code: `function heapSort(arr) {
    console.log("🏔️ Iniciando Heap Sort!");
    
    // Constroi o heap maximo
    buildMaxHeap(arr);
    
    // Extrai elementos um por um do heap
    for (let i = arr.length - 1; i > 0; i--) {
        console.log(\`🔄 Movendo maior (\${arr[0]}) para posicao \${i}\`);
        
        // Move o maior elemento para o final
        [arr[0], arr[i]] = [arr[i], arr[0]];
        
        // Restaura a propriedade do heap
        heapify(arr, 0, i);
    }
    
    console.log("🎉 Array ordenado:", arr);
    return arr;
}

function buildMaxHeap(arr) {
    console.log("🏗️ Construindo heap maximo...");
    
    // Comeca do ultimo no nao-folha
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
        heapify(arr, i, arr.length);
    }
}

function heapify(arr, rootIndex, heapSize) {
    let largest = rootIndex;
    let left = 2 * rootIndex + 1;
    let right = 2 * rootIndex + 2;
    
    // Verifica se o filho esquerdo e maior que a raiz
    if (left < heapSize && arr[left] > arr[largest]) {
        largest = left;
    }
    
    // Verifica se o filho direito e maior que o atual maior
    if (right < heapSize && arr[right] > arr[largest]) {
        largest = right;
    }
    
    // Se o maior nao e a raiz
    if (largest !== rootIndex) {
        console.log(\`🔄 Trocando \${arr[rootIndex]} ↔ \${arr[largest]}\`);
        [arr[rootIndex], arr[largest]] = [arr[largest], arr[rootIndex]];
        
        // Recursivamente heapifica a subarvore afetada
        heapify(arr, largest, heapSize);
    }
}`,
                explanation: "Heap Sort usa uma estrutura de dados especial (heap) onde o pai e sempre maior que os filhos!",
                steps: [
                    "Transforme o array em um heap maximo",
                    "O maior elemento estara sempre na raiz (inicio)",
                    "Mova a raiz para o final e reduza o heap",
                    "Restaure a propriedade do heap e repita"
                ]
            },
            radix: {
                code: `function radixSort(arr) {
    console.log("🔢 Iniciando Radix Sort!");
    
    // Encontra o maior numero para saber quantos digitos processar
    const max = Math.max(...arr);
    const maxDigits = max.toString().length;
    console.log(\`📏 Maior numero: \${max} (\${maxDigits} digitos)\`);
    
    // Para cada posicao de digito (unidades, dezenas, centenas...)
    for (let digit = 0; digit < maxDigits; digit++) {
        console.log(\`🎯 Ordenando por digito na posicao \${digit + 1}\`);
        arr = countingSortByDigit(arr, digit);
        console.log(\`✅ Apos ordenar por digito \${digit + 1}: [\${arr.join(', ')}]\`);
    }
    
    console.log("🎉 Array ordenado:", arr);
    return arr;
}

function countingSortByDigit(arr, digitPos) {
    const output = new Array(arr.length);
    const count = new Array(10).fill(0); // 0-9 digitos
    
    // Conta ocorrencias de cada digito
    for (let i = 0; i < arr.length; i++) {
        const digit = getDigit(arr[i], digitPos);
        count[digit]++;
    }
    
    console.log(\`📊 Contagem de digitos: [\${count.join(', ')}]\`);
    
    // Modifica count[i] para conter posicoes reais
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }
    
    // Constroi o array de saida
    for (let i = arr.length - 1; i >= 0; i--) {
        const digit = getDigit(arr[i], digitPos);
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }
    
    return output;
}

function getDigit(num, pos) {
    return Math.floor(num / Math.pow(10, pos)) % 10;
}`,
                explanation: "Radix Sort ordena numeros processando digito por digito, da direita para esquerda!",
                steps: [
                    "Encontre quantos digitos tem o maior numero",
                    "Ordene por cada posicao de digito (unidades, dezenas...)",
                    "Use counting sort para cada digito",
                    "Apos processar todos os digitos, esta ordenado!"
                ]
            }
        };

        // Quiz questions for each algorithm
        this.quizQuestions = {
            bubble: [
                {
                    question: "Por que o Bubble Sort tem esse nome?",
                    options: [
                        "Porque faz bolhas na tela",
                        "Porque os elementos maiores 'borbulham' para o final",
                        "Porque foi criado numa banheira",
                        "Porque e redondo como uma bolha"
                    ],
                    correct: 1,
                    explanation: "O nome vem do fato de que os elementos maiores 'borbulham' para o topo (final) do array, como bolhas de ar na agua!"
                },
                {
                    question: "Qual e a complexidade de tempo do Bubble Sort no pior caso?",
                    options: ["O(n)", "O(n log n)", "O(n²)", "O(1)"],
                    correct: 2,
                    explanation: "No pior caso (array em ordem reversa), precisa fazer n×n comparacoes, resultando em O(n²)."
                },
                {
                    question: "O Bubble Sort e um algoritmo estavel?",
                    options: [
                        "Sim, elementos iguais mantem sua ordem relativa",
                        "Nao, elementos iguais podem trocar de posicao",
                        "as vezes sim, as vezes nao",
                        "Depende da implementacao"
                    ],
                    correct: 0,
                    explanation: "Sim! O Bubble Sort e estavel porque so troca elementos quando arr[i] > arr[j], nunca quando sao iguais."
                }
            ],
            selection: [
                {
                    question: "Como o Selection Sort funciona?",
                    options: [
                        "Seleciona elementos aleatoriamente",
                        "Sempre seleciona o menor elemento e o coloca na posicao correta",
                        "Seleciona o meio do array",
                        "Seleciona dois elementos e os compara"
                    ],
                    correct: 1,
                    explanation: "O Selection Sort sempre encontra o menor elemento restante e o coloca na proxima posicao ordenada!"
                },
                {
                    question: "Quantas trocas o Selection Sort faz no maximo?",
                    options: ["n²", "n", "n-1", "2n"],
                    correct: 2,
                    explanation: "No maximo n-1 trocas, uma para cada posicao (exceto a ultima que ja estara correta)."
                }
            ],
            insertion: [
                {
                    question: "O Insertion Sort e mais eficiente quando o array esta:",
                    options: [
                        "Completamente desordenado",
                        "Em ordem reversa",
                        "Quase ordenado",
                        "Com elementos repetidos"
                    ],
                    correct: 2,
                    explanation: "Quando o array ja esta quase ordenado, o Insertion Sort faz poucas operacoes, chegando proximo de O(n)!"
                }
            ],
            quick: [
                {
                    question: "O que e o 'pivo' no Quick Sort?",
                    options: [
                        "O menor elemento do array",
                        "O elemento do meio",
                        "Um elemento escolhido para dividir o array",
                        "O maior elemento"
                    ],
                    correct: 2,
                    explanation: "O pivo e um elemento escolhido para dividir o array: menores ficam a esquerda, maiores a direita!"
                }
            ],
            merge: [
                {
                    question: "Qual e a estrategia principal do Merge Sort?",
                    options: [
                        "Dividir para conquistar",
                        "Forca bruta",
                        "Programacao dinamica",
                        "Algoritmo guloso"
                    ],
                    correct: 0,
                    explanation: "Merge Sort usa 'dividir para conquistar': divide o problema em partes menores e combina as solucoes!"
                }
            ],
            heap: [
                {
                    question: "O que e um heap maximo?",
                    options: [
                        "Uma arvore onde cada pai e menor que seus filhos",
                        "Uma arvore onde cada pai e maior que seus filhos",
                        "Uma arvore ordenada",
                        "Uma arvore balanceada"
                    ],
                    correct: 1,
                    explanation: "Em um heap maximo, cada no pai e sempre maior que seus filhos, garantindo que o maior elemento fique na raiz!"
                }
            ],
            radix: [
                {
                    question: "Como o Radix Sort processa os numeros?",
                    options: [
                        "Por valor total",
                        "Digito por digito",
                        "Por paridade",
                        "Aleatoriamente"
                    ],
                    correct: 1,
                    explanation: "Radix Sort processa os numeros digito por digito, comecando pelas unidades ate o digito mais significativo!"
                }
            ]
        };

        this.conceptExplanations = {
            bubble: {
                title: "🫧 Bubble Sort - O Algoritmo das Bolhinhas",
                concept: "Imagine que voce tem varias bolhas de ar debaixo d'agua. As bolhas maiores naturalmente sobem para a superficie mais rapido que as menores. e exatamente assim que o Bubble Sort funciona!",
                realWorld: "e como organizar pessoas em uma fila por altura: voce vai comparando pares de pessoas adjacentes e trocando quem esta fora de ordem, ate que todos estejam ordenados.",
                prosAndCons: {
                    pros: ["Facil de entender e implementar", "Algoritmo estavel", "Funciona bem para arrays pequenos"],
                    cons: ["Muito lento para arrays grandes", "Complexidade O(n²)", "Faz muitas comparacoes desnecessarias"]
                }
            },
            selection: {
                title: "🎯 Selection Sort - O Selecionador",
                concept: "e como escolher o melhor jogador de um time: voce olha todos os jogadores, seleciona o melhor, depois olha os restantes e seleciona o segundo melhor, e assim por diante.",
                realWorld: "Como organizar cartas: voce procura a menor carta, coloca na primeira posicao, depois procura a segunda menor entre as restantes, e continua ate organizar todas.",
                prosAndCons: {
                    pros: ["Faz poucas trocas (no maximo n-1)", "Simples de implementar", "Funciona bem com arrays pequenos"],
                    cons: ["Sempre faz O(n²) comparacoes", "Nao e estavel", "Performance nao melhora mesmo com arrays parcialmente ordenados"]
                }
            },
            insertion: {
                title: "📝 Insertion Sort - O Organizador",
                concept: "e como organizar cartas na sua mao: voce pega uma carta nova e a insere na posicao correta entre as cartas que ja estao organizadas.",
                realWorld: "Como organizar arquivos em uma gaveta: voce pega um arquivo e o coloca no lugar certo, empurrando os outros para fazer espaco se necessario.",
                prosAndCons: {
                    pros: ["Muito eficiente para arrays pequenos", "Adaptativo (O(n) no melhor caso)", "Estavel e facil de implementar"],
                    cons: ["O(n²) no pior caso", "Lento para arrays grandes", "Requer deslocamento de muitos elementos"]
                }
            },
            quick: {
                title: "⚡ Quick Sort - O Rapido Divisor",
                concept: "e como organizar uma festa: voce escolhe um 'organizador' (pivo) e pede para as pessoas menores ficarem de um lado e as maiores do outro. Depois faz o mesmo com cada grupo.",
                realWorld: "Como dividir um grupo para uma atividade: escolha uma pessoa como referencia, separe quem e mais novo/velho, depois repita o processo com cada subgrupo.",
                prosAndCons: {
                    pros: ["Muito rapido na media O(n log n)", "Ordena no local (pouco uso de memoria)", "Divide e conquista eficientemente"],
                    cons: ["O(n²) no pior caso", "Nao e estavel", "Performance depende da escolha do pivo"]
                }
            },
            merge: {
                title: "🤝 Merge Sort - O Combinador",
                concept: "e como organizar duas pilhas de cartas ja organizadas em uma pilha unica: voce compara o topo de cada pilha e sempre pega a menor carta.",
                realWorld: "Como combinar duas listas telefonicas em ordem alfabetica: voce vai comparando os nomes do topo de cada lista e sempre escolhe o que vem primeiro no alfabeto.",
                prosAndCons: {
                    pros: ["Sempre O(n log n)", "Algoritmo estavel", "Previsivel e confiavel"],
                    cons: ["Usa O(n) memoria extra", "Pode ser lento para arrays pequenos", "Overhead da recursao"]
                }
            },
            heap: {
                title: "🏔️ Heap Sort - O Construtor de Montanhas",
                concept: "e como construir uma piramide onde o pai sempre e maior que os filhos. O topo sempre tem o maior elemento, que voce remove e reconstroi a piramide.",
                realWorld: "Como organizar uma empresa por hierarquia: o chefe sempre ganha mais que seus subordinados. Quando o chefe sai, o maior subordinado assume.",
                prosAndCons: {
                    pros: ["Sempre O(n log n)", "Ordena no local", "Nao depende da distribuicao dos dados"],
                    cons: ["Nao e estavel", "Constante multiplicativa alta", "Dificil de implementar corretamente"]
                }
            },
            radix: {
                title: "🔢 Radix Sort - O Organizador de Digitos",
                concept: "e como organizar numeros em gavetas: primeiro voce separa por unidades (0,1,2...9), depois por dezenas, depois centenas, ate organizar completamente.",
                realWorld: "Como organizar fichas de biblioteca por numero: voce agrupa por ultimo digito, depois por penultimo, e assim por diante ate ficar ordenado.",
                prosAndCons: {
                    pros: ["Pode ser O(n) em alguns casos", "Nao faz comparacoes", "Estavel"],
                    cons: ["So funciona com numeros/strings", "Usa muita memoria extra", "Dependente do numero de digitos"]
                }
            }
        };
    }

    initializeCodePatterns() {
        this.codePatterns = {
            bubble: {
                code: `function bubbleSort(arr) {
    <span class="code-loop">for (let i = 0; i < arr.length - 1; i++)</span> {
        <span class="code-loop">for (let j = 0; j < arr.length - i - 1; j++)</span> {
            <span class="code-condition">if (arr[j] > arr[j + 1])</span> {
                <span class="code-swap">// Troca os elementos
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;</span>
            }
        }
    }
    return arr;
}`,
                patterns: {
                    loop: "Dois loops aninhados (O(n²)) - o externo controla as passadas, o interno compara elementos adjacentes",
                    condition: "Condição simples compara dois elementos adjacentes",
                    swap: "Padrão clássico de troca usando variável temporária"
                }
            },
            selection: {
                code: `function selectionSort(arr) {
    <span class="code-loop">for (let i = 0; i < arr.length - 1; i++)</span> {
        let minIndex = i;
        
        <span class="code-loop">for (let j = i + 1; j < arr.length; j++)</span> {
            <span class="code-condition">if (arr[j] < arr[minIndex])</span> {
                minIndex = j;
            }
        }
        
        <span class="code-condition">if (minIndex !== i)</span> {
            <span class="code-swap">// Troca o menor elemento encontrado
            let temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;</span>
        }
    }
    return arr;
}`,
                patterns: {
                    loop: "Loop externo fixa posição, interno procura o menor elemento restante",
                    condition: "Duas condições: encontrar menor e verificar se precisa trocar",
                    swap: "Troca otimizada - só acontece se necessário"
                }
            },
            quick: {
                code: `function quickSort(arr, low = 0, high = arr.length - 1) {
    <span class="code-condition">if (low < high)</span> {
        <span class="code-recursion">let pivotIndex = partition(arr, low, high);
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);</span>
    }
    return arr;
}

function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;
    
    <span class="code-loop">for (let j = low; j < high; j++)</span> {
        <span class="code-condition">if (arr[j] <= pivot)</span> {
            i++;
            <span class="code-swap">[arr[i], arr[j]] = [arr[j], arr[i]];</span>
        }
    }
    <span class="code-swap">[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];</span>
    return i + 1;
}`,
                patterns: {
                    recursion: "Padrão recursivo: divide o problema em sub-problemas menores",
                    condition: "Condições controlam a recursão e o particionamento",
                    loop: "Loop único no partition para organizar elementos em torno do pivô",
                    swap: "Múltiplas trocas para reorganizar os elementos"
                }
            }
        };
    }

    initializeEventListeners() {
        // Tab switching
        document.querySelectorAll('.edu-tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Copy code button
        const copyBtn = document.getElementById('copyCode');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => this.copyCode());
        }

        // Quiz navigation
        const nextQuestion = document.getElementById('nextQuestion');
        if (nextQuestion) {
            nextQuestion.addEventListener('click', () => this.nextQuizQuestion());
        }

        // Complexity slider
        const complexitySlider = document.getElementById('complexitySize');
        if (complexitySlider) {
            complexitySlider.addEventListener('input', (e) => {
                document.getElementById('complexitySizeValue').textContent = e.target.value;
                this.updateComplexityChart(e.target.value);
            });
        }
    }

    switchTab(tabName) {
        // Update active tab button
        document.querySelectorAll('.edu-tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update active tab content
        document.querySelectorAll('.edu-tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');

        this.currentTab = tabName;

        // Track tab view for gamification
        if (this.currentAlgorithm && window.gamificationController) {
            window.gamificationController.trackTabView(this.currentAlgorithm, tabName);
        }

        // Load content based on current algorithm and tab
        if (this.currentAlgorithm) {
            this.loadTabContent(tabName, this.currentAlgorithm);
        }
    }

    setAlgorithm(algorithm) {
        this.currentAlgorithm = algorithm;
        this.loadTabContent(this.currentTab, algorithm);
        
        // Reset quiz
        this.currentQuizQuestion = 0;
        this.quizScore = 0;
    }

    loadTabContent(tab, algorithm) {
        switch (tab) {
            case 'explanation':
                this.loadExplanationContent(algorithm);
                break;
            case 'code':
                this.loadCodeContent(algorithm);
                break;
            case 'complexity':
                this.loadComplexityContent(algorithm);
                break;
            case 'quiz':
                this.loadQuizContent(algorithm);
                break;
        }
    }

    loadExplanationContent(algorithm) {
        const explanation = this.conceptExplanations[algorithm];
        if (!explanation) return;

        document.getElementById('algorithmTitle').textContent = explanation.title;
        document.getElementById('algorithmDescription').textContent = explanation.concept;

        // Track explanation read for gamification
        if (window.gamificationController) {
            window.gamificationController.trackExplanationRead(algorithm);
            window.gamificationController.updateDailyChallengeProgress('education');
        }

        // Update concept visual
        const conceptVisual = document.getElementById('conceptVisual');
        conceptVisual.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h4>💡 Analogia do Mundo Real</h4>
                <p style="font-style: italic; margin: 10px 0;">"${explanation.realWorld}"</p>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 15px;">
                    <div style="background: #4ade8020; padding: 15px; border-radius: 8px; border: 1px solid #4ade80;">
                        <h5 style="color: #4ade80; margin-bottom: 8px;">✅ Vantagens</h5>
                        ${explanation.prosAndCons.pros.map(pro => `<p style="margin: 5px 0; font-size: 0.9rem;">• ${pro}</p>`).join('')}
                    </div>
                    <div style="background: #f8717120; padding: 15px; border-radius: 8px; border: 1px solid #f87171;">
                        <h5 style="color: #f87171; margin-bottom: 8px;">⚠️ Desvantagens</h5>
                        ${explanation.prosAndCons.cons.map(con => `<p style="margin: 5px 0; font-size: 0.9rem;">• ${con}</p>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    loadCodeContent(algorithm) {
        const codeData = this.codeExamples[algorithm];
        if (!codeData) return;

        document.getElementById('codeExplanation').textContent = codeData.explanation;
        document.getElementById('algorithmCode').textContent = codeData.code;

        // Create complexity analysis
        const complexityGrid = document.getElementById('complexityGrid');
        const algorithmInfo = window.ALGORITHMS?.[algorithm];
        
        if (algorithmInfo) {
            complexityGrid.innerHTML = `
                <div class="complexity-item">
                    <h6>⏱️ Tempo (Melhor Caso)</h6>
                    <code>${algorithmInfo.timeComplexity.best}</code>
                </div>
                <div class="complexity-item">
                    <h6>⏱️ Tempo (Caso Medio)</h6>
                    <code>${algorithmInfo.timeComplexity.average}</code>
                </div>
                <div class="complexity-item">
                    <h6>⏱️ Tempo (Pior Caso)</h6>
                    <code>${algorithmInfo.timeComplexity.worst}</code>
                </div>
                <div class="complexity-item">
                    <h6>💾 Espaco</h6>
                    <code>${algorithmInfo.spaceComplexity}</code>
                </div>
                <div class="complexity-item">
                    <h6>🔄 Estavel</h6>
                    <span>${algorithmInfo.stability ? '✅ Sim' : '❌ Nao'}</span>
                </div>
                <div class="complexity-item">
                    <h6>🎯 Dificuldade</h6>
                    <span class="difficulty ${algorithmInfo.difficulty}">${algorithmInfo.difficulty === 'easy' ? '🟢 Facil' : algorithmInfo.difficulty === 'medium' ? '🟡 Medio' : '🔴 Dificil'}</span>
                </div>
            `;
        }
    }

    loadComplexityContent(algorithm) {
        // Track complexity analysis for gamification
        if (window.gamificationController) {
            window.gamificationController.trackComplexityAnalysis(algorithm);
            window.gamificationController.updateDailyChallengeProgress('complexity');
        }

        // Initialize complexity chart
        this.updateComplexityChart(10);
        
        const explanations = {
            bubble: "O Bubble Sort faz n-1 passadas, e em cada passada faz ate n-1 comparacoes. Por isso e O(n²).",
            selection: "Selection Sort sempre procura o menor elemento em todo o array restante, fazendo n² comparacoes.",
            insertion: "No pior caso, cada elemento pode precisar ser comparado com todos os anteriores: O(n²).",
            quick: "Divide o array pela metade a cada nivel (log n niveis) e processa n elementos por nivel: O(n log n).",
            merge: "Sempre divide pela metade (log n niveis) e mescla n elementos por nivel: O(n log n).",
            heap: "Construir o heap leva O(n) e extrair n elementos do heap leva O(log n) cada: O(n log n).",
            radix: "Processa k digitos (k = log₁₀(max)) e faz n operacoes por digito: O(kn)."
        };

        document.getElementById('complexityExplanation').innerHTML = `
            <p>${explanations[algorithm] || 'Explicacao da complexidade sera mostrada aqui.'}</p>
            <div style="margin-top: 15px; padding: 15px; background: var(--surface-light); border-radius: 8px;">
                <h5>🧮 Como calcular:</h5>
                <p style="margin: 10px 0;">Mova o slider para ver como o numero de operacoes cresce com o tamanho do array!</p>
            </div>
        `;
    }

    updateComplexityChart(n) {
        const canvas = document.getElementById('complexityCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const algorithm = this.currentAlgorithm;
        
        // Clear canvas with background
        ctx.fillStyle = '#f8f9fa';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid
        ctx.strokeStyle = '#e9ecef';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 10; i++) {
            const x = 40 + (i * 32);
            const y = 20 + (i * 16);
            
            // Vertical grid lines
            ctx.beginPath();
            ctx.moveTo(x, 20);
            ctx.lineTo(x, 180);
            ctx.stroke();
            
            // Horizontal grid lines
            ctx.beginPath();
            ctx.moveTo(40, y);
            ctx.lineTo(360, y);
            ctx.stroke();
        }
        
        // Draw axes
        ctx.strokeStyle = '#495057';
        ctx.lineWidth = 3;
        ctx.beginPath();
        // Y axis
        ctx.moveTo(40, 20);
        ctx.lineTo(40, 180);
        // X axis
        ctx.moveTo(40, 180);
        ctx.lineTo(360, 180);
        ctx.stroke();
        
        // Labels with better styling
        ctx.fillStyle = '#495057';
        ctx.font = 'bold 12px Arial';
        ctx.fillText('Operações', 5, 15);
        ctx.fillText('Tamanho do Array (n)', 260, 195);
        
        // Draw complexity curves for comparison
        const algorithms_data = [
            { name: 'bubble', color: '#ff6b6b', complexity: (n) => n * n },
            { name: 'selection', color: '#4ecdc4', complexity: (n) => n * n },
            { name: 'insertion', color: '#45b7d1', complexity: (n) => n * n },
            { name: 'quick', color: '#96ceb4', complexity: (n) => n * Math.log2(n) },
            { name: 'merge', color: '#ffeaa7', complexity: (n) => n * Math.log2(n) },
            { name: 'heap', color: '#dda0dd', complexity: (n) => n * Math.log2(n) },
            { name: 'radix', color: '#fd79a8', complexity: (n) => n * 3 }
        ];
        
        const maxN = 30;
        const stepSize = 320 / maxN;
        let maxOps = 0;
        
        // Find max operations for scaling
        algorithms_data.forEach(alg_data => {
            for (let i = 1; i <= maxN; i++) {
                const ops = alg_data.complexity(i);
                if (ops > maxOps) maxOps = ops;
            }
        });
        
        // Draw each algorithm curve
        algorithms_data.forEach(alg_data => {
            ctx.strokeStyle = alg_data.color;
            ctx.lineWidth = algorithm === alg_data.name ? 4 : 2;
            ctx.globalAlpha = algorithm === alg_data.name ? 1.0 : 0.6;
            ctx.beginPath();
            
            let started = false;
            for (let i = 1; i <= maxN; i++) {
                const x = 40 + (i * stepSize);
                const operations = alg_data.complexity(i);
                const y = 180 - ((operations / maxOps) * 160);
                
                if (!started) {
                    ctx.moveTo(x, y);
                    started = true;
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
        });
        
        ctx.globalAlpha = 1.0;
        
        // Add legend
        const legendX = 370;
        let legendY = 30;
        
        algorithms_data.forEach(alg_data => {
            ctx.fillStyle = alg_data.color;
            ctx.fillRect(legendX, legendY, 15, 10);
            
            ctx.fillStyle = '#495057';
            ctx.font = '11px Arial';
            ctx.fillText(alg_data.name.charAt(0).toUpperCase() + alg_data.name.slice(1), legendX + 20, legendY + 8);
            
            legendY += 16;
        });
        
        // Highlight current algorithm and n value
        const currentAlgData = algorithms_data.find(a => a.name === algorithm);
        if (currentAlgData && n <= maxN) {
            const currentX = 40 + (n * stepSize);
            const currentOps = currentAlgData.complexity(n);
            const currentY = 180 - ((currentOps / maxOps) * 160);
            
            // Draw point
            ctx.fillStyle = currentAlgData.color;
            ctx.beginPath();
            ctx.arc(currentX, currentY, 6, 0, 2 * Math.PI);
            ctx.fill();
            
            // Draw value label
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(Math.round(currentOps).toString(), currentX, currentY + 3);
            ctx.textAlign = 'left';
        }
        
        // Show current values
        ctx.fillStyle = '#495057';
        ctx.font = 'bold 14px Arial';
        ctx.fillText(`Array Size: n=${n}`, 50, 210);
    }

    loadQuizContent(algorithm) {
        const questions = this.quizQuestions[algorithm];
        if (!questions || questions.length === 0) {
            document.getElementById('quizQuestion').innerHTML = `
                <p>Quiz para ${algorithm} ainda nao disponivel. Em breve!</p>
            `;
            return;
        }

        this.displayQuizQuestion();
    }

    displayQuizQuestion() {
        const questions = this.quizQuestions[this.currentAlgorithm];
        const question = questions[this.currentQuizQuestion];
        
        document.getElementById('questionTitle').textContent = question.question;
        document.getElementById('quizProgress').textContent = `${this.currentQuizQuestion + 1}/${questions.length}`;
        document.getElementById('quizScore').textContent = this.quizScore;
        
        const optionsContainer = document.getElementById('quizOptions');
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'quiz-option';
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => this.selectQuizOption(index));
            optionsContainer.appendChild(optionElement);
        });
        
        // Hide feedback and next button
        document.getElementById('quizFeedback').classList.remove('show');
        document.getElementById('nextQuestion').style.display = 'none';
    }

    selectQuizOption(selectedIndex) {
        const questions = this.quizQuestions[this.currentAlgorithm];
        const question = questions[this.currentQuizQuestion];
        const options = document.querySelectorAll('.quiz-option');
        
        // Disable further selection
        options.forEach(option => {
            option.style.pointerEvents = 'none';
        });
        
        // Mark correct/incorrect
        options[selectedIndex].classList.add(selectedIndex === question.correct ? 'correct' : 'incorrect');
        if (selectedIndex !== question.correct) {
            options[question.correct].classList.add('correct');
        }
        
        // Show feedback
        const feedback = document.getElementById('quizFeedback');
        feedback.classList.add('show');
        feedback.classList.add(selectedIndex === question.correct ? 'correct' : 'incorrect');
        feedback.innerHTML = `
            <strong>${selectedIndex === question.correct ? '🎉 Correto!' : '❌ Incorreto!'}</strong>
            <p>${question.explanation}</p>
        `;
        
        // Update score
        if (selectedIndex === question.correct) {
            this.quizScore += 10;
            document.getElementById('quizScore').textContent = this.quizScore;
        }
        
        // Show next button or finish
        const nextBtn = document.getElementById('nextQuestion');
        if (this.currentQuizQuestion < questions.length - 1) {
            nextBtn.style.display = 'block';
            nextBtn.textContent = 'Proxima Pergunta';
        } else {
            nextBtn.style.display = 'block';
            nextBtn.textContent = 'Finalizar Quiz';
        }
    }

    nextQuizQuestion() {
        const questions = this.quizQuestions[this.currentAlgorithm];
        
        if (this.currentQuizQuestion < questions.length - 1) {
            this.currentQuizQuestion++;
            this.displayQuizQuestion();
        } else {
            // Quiz finished
            this.finishQuiz();
        }
    }

    finishQuiz() {
        const questions = this.quizQuestions[this.currentAlgorithm];
        const totalQuestions = questions.length;
        const maxScore = totalQuestions * 10;
        const percentage = Math.round((this.quizScore / maxScore) * 100);
        
        // Track quiz completion for gamification
        if (window.gamificationController) {
            window.gamificationController.trackQuizCompletion(this.currentAlgorithm, this.quizScore, maxScore);
            window.gamificationController.updateDailyChallengeProgress('quiz', { percentage });
            
            // Special achievement for perfect score
            if (percentage === 100) {
                window.gamificationController.unlockAchievement('quiz_champion');
            }
        }
        
        document.getElementById('quizQuestion').innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h3>🎊 Quiz Finalizado!</h3>
                <div style="font-size: 2rem; margin: 20px 0;">
                    ${percentage >= 80 ? '🏆' : percentage >= 60 ? '🥈' : '🥉'}
                </div>
                <p><strong>Sua pontuacao: ${this.quizScore}/${totalQuestions * 10}</strong></p>
                <p><strong>Aproveitamento: ${percentage}%</strong></p>
                <div style="margin: 20px 0; padding: 15px; background: var(--surface-light); border-radius: 8px;">
                    ${percentage >= 80 ? 
                        '🌟 Excelente! Voce dominou este algoritmo!' :
                        percentage >= 60 ?
                        '👍 Bom trabalho! Revise alguns conceitos para melhorar.' :
                        '📚 Continue estudando! A pratica leva a perfeicao.'
                    }
                </div>
                <button onclick="location.reload()" class="btn btn-primary">🔄 Tentar Novamente</button>
            </div>
        `;
    }

    copyCode() {
        const code = document.getElementById('algorithmCode').textContent;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(code).then(() => {
                const btn = document.getElementById('copyCode');
                const originalText = btn.textContent;
                btn.textContent = '✅ Copiado!';
                btn.style.background = 'var(--success-color)';
                
                // Track code copy for gamification
                if (this.currentAlgorithm && window.gamificationController) {
                    window.gamificationController.trackCodeCopy(this.currentAlgorithm);
                    window.gamificationController.updateDailyChallengeProgress('code');
                }
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                }, 2000);
            });
        }
    }

    updateCurrentStep(stepNumber, title, description, hint = '') {
        // Safe element updates - only update if elements exist
        const stepNumberEl = document.getElementById('stepNumber');
        const stepTitleEl = document.getElementById('stepTitle');
        const currentStepEl = document.getElementById('currentStep');
        const stepHintEl = document.getElementById('stepHint');
        
        if (stepNumberEl) stepNumberEl.textContent = stepNumber;
        if (stepTitleEl) stepTitleEl.textContent = title;
        if (currentStepEl) currentStepEl.textContent = description;
        if (stepHintEl) stepHintEl.textContent = hint;
        
        // Animate step change only if element exists
        const stepCard = document.querySelector('.current-step-card');
        if (stepCard) {
            stepCard.style.transform = 'scale(1.05)';
            setTimeout(() => {
                stepCard.style.transform = 'scale(1)';
            }, 200);
        }
    }

    highlightCodeLine(lineNumber) {
        const codeBlock = document.getElementById('algorithmCode');
        const highlight = document.getElementById('codeHighlight');
        
        if (!codeBlock || !highlight) return;
        
        const lines = codeBlock.textContent.split('\\n');
        const lineHeight = 24; // Approximate line height
        const topOffset = (lineNumber - 1) * lineHeight + 20; // 20px for padding
        
        highlight.style.display = 'block';
        highlight.style.top = topOffset + 'px';
        highlight.style.height = lineHeight + 'px';
        highlight.style.animation = 'codeHighlight 1s ease-in-out';
    }
}

// Initialize educational controller when DOM is loaded
window.educationalController = null;

document.addEventListener('DOMContentLoaded', () => {
    window.educationalController = new EducationalController();
});
