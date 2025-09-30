// ===== SORTING ALGORITHMS IMPLEMENTATION =====

class SortingAlgorithms {
    constructor() {
        this.steps = [];
        this.comparisons = 0;
        this.swaps = 0;
        this.currentStep = 0;
    }

    reset() {
        this.steps = [];
        this.comparisons = 0;
        this.swaps = 0;
        this.currentStep = 0;
    }

    addStep(type, indices, description, array = null, isCustomData = false, customData = null) {
        // Criar descricao mais didatica baseada no co        description: 'O Quick Sort usa a estrategia "dividir para conquistar". Ele escolhe um elemento como pivot e particiona o array de forma que elementos menores ficam antes do pivot e maiores depois. Em seguida, ordena recursivamente as sublistas.',texto
        let enhancedDescription = description;
        
        if (isCustomData && customData && indices.length > 0) {
            enhancedDescription = this.enhanceDescriptionForCustomData(description, type, indices, customData);
        }
        
        this.steps.push({
            type,
            indices: [...indices],
            description: enhancedDescription,
            array: array ? [...array] : null,
            comparisons: this.comparisons,
            swaps: this.swaps
        });
    }
    
    enhanceDescriptionForCustomData(description, type, indices, customData) {
        const isTextData = customData && typeof customData[0] === 'string' && isNaN(customData[0]);
        
        if (type === 'compare' && indices.length >= 2) {
            if (isTextData) {
                const item1 = customData[indices[0]] || 'elemento';
                const item2 = customData[indices[1]] || 'elemento';
                return `🔍 Comparando "${item1}" com "${item2}" - qual vem primeiro no alfabeto?`;
            } else {
                return `🔢 Comparando numeros nas posicoes ${indices[0]} e ${indices[1]} - qual e maior?`;
            }
        }
        
        if (type === 'swap' && indices.length >= 2) {
            if (isTextData) {
                const item1 = customData[indices[0]] || 'elemento';
                const item2 = customData[indices[1]] || 'elemento';
                return `🔄 Trocando "${item1}" e "${item2}" para colocar em ordem alfabetica`;
            } else {
                return `🔄 Trocando numeros para colocar em ordem crescente`;
            }
        }
        
        if (type === 'sorted' && indices.length > 0) {
            if (isTextData) {
                const items = indices.map(idx => `"${customData[idx]}"`).join(', ');
                return `✅ ${items} ${indices.length === 1 ? 'esta' : 'estao'} na posicao correta alfabeticamente`;
            } else {
                return `✅ Elemento${indices.length > 1 ? 's' : ''} na${indices.length > 1 ? 's' : ''} posicao${indices.length > 1 ? 'es' : ''} ${indices.join(', ')} ordenado${indices.length > 1 ? 's' : ''}`;
            }
        }
        
        return description;
    }

    // Bubble Sort Algorithm
    bubbleSort(arr, compareFn = null, customData = null) {
        this.reset();
        const array = [...arr];
        const n = array.length;
        const compare = compareFn || ((a, b) => a > b);
        const isCustomData = customData !== null;
        const dataType = isCustomData && typeof customData[0] === 'string' && isNaN(customData[0]) ? 'texto' : 'numeros';

        this.addStep('start', [], `🫧 Iniciando Bubble Sort com ${n} ${dataType === 'texto' ? 'palavras/frases' : 'numeros'}! Vamos ordenar ${dataType === 'texto' ? 'alfabeticamente' : 'do menor para o maior'}!`, array, isCustomData, customData);

        for (let i = 0; i < n - 1; i++) {
            let swapped = false;
            
            this.addStep('info', [], `📋 Passada ${i + 1} de ${n - 1}: Vamos encontrar o ${dataType === 'texto' ? 'ultimo elemento na ordem alfabetica' : 'maior numero'} e coloca-lo no final!`);

            for (let j = 0; j < n - i - 1; j++) {
                this.addStep('compare', [j, j + 1], `Comparando elementos`, array, isCustomData, customData);
                this.comparisons++;

                if (compare(array[j], array[j + 1])) {
                    // Swap elements
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    this.swaps++;
                    swapped = true;
                    
                    this.addStep('swap', [j, j + 1], `Trocando elementos`, array, isCustomData, customData);
                }
            }

            this.addStep('sorted', [n - 1 - i], `${dataType === 'texto' ? 'Palavra/frase' : 'Numero'} na posicao final`, array, isCustomData, customData);

            if (!swapped) {
                this.addStep('info', [], `🎉 Array ja esta ordenado! Bubble Sort e inteligente e para quando nao ha mais trocas necessarias!`);
                break;
            }
        }

        this.addStep('complete', [], `✨ Bubble Sort concluido! Todos os ${dataType} estao ${dataType === 'texto' ? 'em ordem alfabetica' : 'ordenados do menor para o maior'}!`, array);
        return this.steps;
    }

    // Selection Sort Algorithm
    selectionSort(arr, compareFn = null) {
        this.reset();
        const array = [...arr];
        const n = array.length;
        const compare = compareFn || ((a, b) => a < b);

        this.addStep('start', [], `Iniciando Selection Sort com ${n} elementos`, array);

        for (let i = 0; i < n - 1; i++) {
            let minIndex = i;
            
            this.addStep('info', [], `Procurando o menor elemento na posicao ${i}`);
            this.addStep('current', [i], `Posicao atual: ${i}`, array);

            for (let j = i + 1; j < n; j++) {
                this.addStep('compare', [minIndex, j], `Comparando elementos nas posicoes ${minIndex} e ${j}`, array);
                this.comparisons++;

                if (compare(array[j], array[minIndex])) {
                    minIndex = j;
                    this.addStep('newmin', [minIndex], `Novo minimo encontrado na posicao ${minIndex}`, array);
                }
            }

            if (minIndex !== i) {
                [array[i], array[minIndex]] = [array[minIndex], array[i]];
                this.swaps++;
                this.addStep('swap', [i, minIndex], `Trocando elementos nas posicoes ${i} e ${minIndex}`, array);
            }

            this.addStep('sorted', [i], `Elemento na posicao ${i} esta ordenado`, array);
        }

        this.addStep('complete', [], 'Selection Sort concluido!', array);
        return this.steps;
    }

    // Insertion Sort Algorithm
    insertionSort(arr, compareFn = null) {
        this.reset();
        const array = [...arr];
        const n = array.length;
        const compare = compareFn || ((a, b) => a > b);

        this.addStep('start', [], `Iniciando Insertion Sort com ${n} elementos`, array);
        this.addStep('sorted', [0], 'Primeiro elemento ja esta "ordenado"', array);

        for (let i = 1; i < n; i++) {
            const key = array[i];
            let j = i - 1;

            this.addStep('info', [], `Inserindo elemento na posicao ${i} no local correto`);
            this.addStep('current', [i], `Elemento atual na posicao ${i}`, array);

            while (j >= 0) {
                this.addStep('compare', [j, i], `Comparando elementos nas posicoes ${j} e ${i}`, array);
                this.comparisons++;

                if (compare(array[j], key)) {
                    array[j + 1] = array[j];
                    this.addStep('shift', [j, j + 1], `Movendo elemento da posicao ${j} para ${j + 1}`, array);
                    j--;
                } else {
                    break;
                }
            }

            array[j + 1] = key;
            if (j + 1 !== i) {
                this.swaps++;
            }
            this.addStep('insert', [j + 1], `Inserindo elemento na posicao ${j + 1}`, array);

            // Mark sorted portion
            const sortedIndices = [];
            for (let k = 0; k <= i; k++) {
                sortedIndices.push(k);
            }
            this.addStep('sorted', sortedIndices, `Primeiros ${i + 1} elementos estao ordenados`, array);
        }

        this.addStep('complete', [], 'Insertion Sort concluido!', array);
        return this.steps;
    }

    // Quick Sort Algorithm
    quickSort(arr, compareFn = null) {
        this.reset();
        const array = [...arr];
        this.customCompare = compareFn || ((a, b) => a > b);
        
        this.addStep('start', [], `Iniciando Quick Sort com ${array.length} elementos`, array);
        
        this._quickSortHelper(array, 0, array.length - 1);
        
        this.addStep('complete', [], 'Quick Sort concluido!', array);
        return this.steps;
    }

    _quickSortHelper(array, low, high) {
        if (low < high) {
            this.addStep('info', [], `Dividindo subarray [${low}...${high}]`);
            
            const pivotIndex = this._partition(array, low, high);
            
            this.addStep('pivot', [pivotIndex], `Pivot ${array[pivotIndex]} esta na posicao correta`, array);
            
            this._quickSortHelper(array, low, pivotIndex - 1);
            this._quickSortHelper(array, pivotIndex + 1, high);
        } else if (low === high) {
            this.addStep('sorted', [low], `Elemento ${array[low]} esta na posicao correta`, array);
        }
    }

    _partition(array, low, high) {
        const pivot = array[high];
        this.addStep('pivot', [high], `Escolhendo elemento na posicao ${high} como pivot`, array);
        
        let i = low - 1;

        for (let j = low; j < high; j++) {
            this.addStep('compare', [j, high], `Comparando elementos nas posicoes ${j} e ${high}`, array);
            this.comparisons++;

            if (!this.customCompare(array[j], pivot)) {
                i++;
                if (i !== j) {
                    [array[i], array[j]] = [array[j], array[i]];
                    this.swaps++;
                    this.addStep('swap', [i, j], `Trocando elementos nas posicoes ${i} e ${j}`, array);
                }
            }
        }

        [array[i + 1], array[high]] = [array[high], array[i + 1]];
        this.swaps++;
        this.addStep('swap', [i + 1, high], `Colocando pivot na posicao correta`, array);

        return i + 1;
    }

    // Merge Sort Algorithm
    mergeSort(arr, compareFn = null) {
        this.reset();
        const array = [...arr];
        this.customCompare = compareFn || ((a, b) => a > b);
        
        this.addStep('start', [], `Iniciando Merge Sort com ${array.length} elementos`, array);
        
        this._mergeSortHelper(array, 0, array.length - 1);
        
        this.addStep('complete', [], 'Merge Sort concluido!', array);
        return this.steps;
    }

    // Heap Sort Algorithm
    heapSort(arr, compareFn = null) {
        this.reset();
        const array = [...arr];
        const n = array.length;
        this.customCompare = compareFn || ((a, b) => a > b);

        this.addStep('start', [], `Iniciando Heap Sort com ${n} elementos`, array);
        this.addStep('info', [], 'Construindo heap maximo...');

        // Build max heap
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            this._heapify(array, n, i);
        }

        this.addStep('info', [], 'Heap maximo construido! Extraindo elementos...');

        // Extract elements from heap one by one
        for (let i = n - 1; i > 0; i--) {
            // Move current root to end
            [array[0], array[i]] = [array[i], array[0]];
            this.swaps++;
            this.addStep('swap', [0, i], `Movendo maior elemento ${array[i]} para posicao final`, array);
            this.addStep('sorted', [i], `Elemento ${array[i]} esta na posicao correta`, array);

            // Call heapify on the reduced heap
            this._heapify(array, i, 0);
        }

        this.addStep('sorted', [0], `ultimo elemento ${array[0]} ja esta ordenado`, array);
        this.addStep('complete', [], 'Heap Sort concluido!', array);
        return this.steps;
    }

    _heapify(array, n, i) {
        let largest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;

        this.addStep('info', [], `Verificando heap na posicao ${i}`);

        // If left child is larger than root
        if (left < n) {
            this.addStep('compare', [largest, left], `Comparando elementos nas posicoes ${largest} e ${left}`, array);
            this.comparisons++;
            if (this.customCompare(array[left], array[largest])) {
                largest = left;
                this.addStep('newmin', [largest], `Elemento na posicao ${left} e maior`, array);
            }
        }

        // If right child is larger than largest so far
        if (right < n) {
            this.addStep('compare', [largest, right], `Comparando elementos nas posicoes ${largest} e ${right}`, array);
            this.comparisons++;
            if (this.customCompare(array[right], array[largest])) {
                largest = right;
                this.addStep('newmin', [largest], `Elemento na posicao ${right} e maior`, array);
            }
        }

        // If largest is not root
        if (largest !== i) {
            [array[i], array[largest]] = [array[largest], array[i]];
            this.swaps++;
            this.addStep('swap', [i, largest], `Trocando elementos nas posicoes ${i} e ${largest} para manter heap`, array);

            // Recursively heapify the affected sub-tree
            this._heapify(array, n, largest);
        }
    }

    // Radix Sort Algorithm (only for positive integers)
    radixSort(arr) {
        this.reset();
        const array = [...arr];
        
        // Check if all numbers are positive integers
        if (array.some(num => num < 0 || !Number.isInteger(num))) {
            this.addStep('error', [], 'Radix Sort funciona apenas com numeros inteiros positivos', array);
            return this.steps;
        }

        this.addStep('start', [], `Iniciando Radix Sort com ${array.length} elementos`, array);

        // Find the maximum number to know number of digits
        const max = Math.max(...array);
        this.addStep('info', [], `Numero maximo: ${max}`);

        // Do counting sort for every digit
        for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
            const digit = Math.log10(exp);
            this.addStep('info', [], `Ordenando por digito ${digit + 1} (posicao ${exp})`);
            this._countingSortByDigit(array, exp);
        }

        this.addStep('complete', [], 'Radix Sort concluido!', array);
        return this.steps;
    }

    _countingSortByDigit(array, exp) {
        const n = array.length;
        const output = new Array(n);
        const count = new Array(10).fill(0);

        // Store count of occurrences of each digit
        for (let i = 0; i < n; i++) {
            const digit = Math.floor(array[i] / exp) % 10;
            count[digit]++;
            this.addStep('count', [i], `Contando digito ${digit} do elemento ${array[i]}`, array);
        }

        this.addStep('info', [], `Contagem de digitos: [${count.join(', ')}]`);

        // Change count[i] so that count[i] contains actual position of this digit in output[]
        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        // Build the output array
        for (let i = n - 1; i >= 0; i--) {
            const digit = Math.floor(array[i] / exp) % 10;
            output[count[digit] - 1] = array[i];
            count[digit]--;
            this.addStep('place', [i], `Colocando ${array[i]} na posicao ${count[digit]} baseado no digito ${digit}`, [...output]);
        }

        // Copy the output array to arr[], so that arr[] now contains sorted numbers
        for (let i = 0; i < n; i++) {
            array[i] = output[i];
        }

        this.addStep('sorted', Array.from({length: n}, (_, i) => i), `Digito atual ordenado`, array);
    }

    _mergeSortHelper(array, left, right) {
        if (left >= right) {
            if (left === right) {
                this.addStep('sorted', [left], `Elemento ${array[left]} (subarray de 1 elemento)`, array);
            }
            return;
        }

        const mid = Math.floor((left + right) / 2);
        
        this.addStep('info', [], `Dividindo array [${left}...${right}] no meio (${mid})`);
        
        this._mergeSortHelper(array, left, mid);
        this._mergeSortHelper(array, mid + 1, right);
        
        this._merge(array, left, mid, right);
    }

    _merge(array, left, mid, right) {
        const leftArray = array.slice(left, mid + 1);
        const rightArray = array.slice(mid + 1, right + 1);

        this.addStep('info', [], `Mesclando subarrays [${left}...${mid}] e [${mid + 1}...${right}]`);

        let i = 0, j = 0, k = left;

        while (i < leftArray.length && j < rightArray.length) {
            this.addStep('compare', [left + i, mid + 1 + j], `Comparando ${leftArray[i]} e ${rightArray[j]}`, array);
            this.comparisons++;

            if (leftArray[i] <= rightArray[j]) {
                array[k] = leftArray[i];
                this.addStep('merge', [k], `Colocando ${leftArray[i]} na posicao ${k}`, array);
                i++;
            } else {
                array[k] = rightArray[j];
                this.addStep('merge', [k], `Colocando ${rightArray[j]} na posicao ${k}`, array);
                j++;
            }
            k++;
        }

        while (i < leftArray.length) {
            array[k] = leftArray[i];
            this.addStep('merge', [k], `Colocando elemento restante ${leftArray[i]} na posicao ${k}`, array);
            i++;
            k++;
        }

        while (j < rightArray.length) {
            array[k] = rightArray[j];
            this.addStep('merge', [k], `Colocando elemento restante ${rightArray[j]} na posicao ${k}`, array);
            j++;
            k++;
        }

        // Mark merged section as sorted
        const sortedIndices = [];
        for (let idx = left; idx <= right; idx++) {
            sortedIndices.push(idx);
        }
        this.addStep('sorted', sortedIndices, `Subarray [${left}...${right}] esta mesclado e ordenado`, array);
    }
}

// Algorithm information and complexity details
const ALGORITHMS = {
    bubble: {
        name: 'Bubble Sort',
        description: 'O Bubble Sort percorre repetidamente a lista, compara elementos adjacentes e os troca se estiverem na ordem errada. O nome vem do fato de que os elementos menores "borbulham" para o topo da lista.',
        timeComplexity: {
            best: 'O(n)',
            average: 'O(n²)',
            worst: 'O(n²)'
        },
        spaceComplexity: 'O(1)',
        stability: true,
        difficulty: 'easy',
        points: 100
    },
    selection: {
        name: 'Selection Sort',
        description: 'O Selection Sort divide a lista em duas partes: a sublista dos elementos ja ordenados e a sublista dos elementos restantes. Ele encontra repetidamente o elemento minimo da parte nao ordenada e o move para o final da parte ordenada.',
        timeComplexity: {
            best: 'O(n²)',
            average: 'O(n²)',
            worst: 'O(n²)'
        },
        spaceComplexity: 'O(1)',
        stability: false,
        difficulty: 'easy',
        points: 100
    },
    insertion: {
        name: 'Insertion Sort',
        description: 'O Insertion Sort constroi a lista ordenada final um elemento por vez. e muito eficiente para listas pequenas e listas que ja estao quase ordenadas.',
        timeComplexity: {
            best: 'O(n)',
            average: 'O(n²)',
            worst: 'O(n²)'
        },
        spaceComplexity: 'O(1)',
        stability: true,
        difficulty: 'medium',
        points: 150
    },
    quick: {
        name: 'Quick Sort',
        description: 'O Quick Sort usa a estrategia "dividir para conquistar". Ele escolhe um elemento como pivo e particiona o array de forma que elementos menores ficam antes do pivo e maiores depois. Em seguida, ordena recursivamente as sublistas.',
        timeComplexity: {
            best: 'O(n log n)',
            average: 'O(n log n)',
            worst: 'O(n²)'
        },
        spaceComplexity: 'O(log n)',
        stability: false,
        difficulty: 'hard',
        points: 200
    },
    merge: {
        name: 'Merge Sort',
        description: 'O Merge Sort tambem usa "dividir para conquistar". Ele divide o array pela metade recursivamente ate ter arrays de um elemento, depois os mescla de volta em ordem crescente.',
        timeComplexity: {
            best: 'O(n log n)',
            average: 'O(n log n)',
            worst: 'O(n log n)'
        },
        spaceComplexity: 'O(n)',
        stability: true,
        difficulty: 'hard',
        points: 200
    },
    heap: {
        name: 'Heap Sort',
        description: 'O Heap Sort usa uma estrutura de dados heap (monticulo) para ordenar. Primeiro constroi um heap maximo, depois extrai repetidamente o maior elemento.',
        timeComplexity: {
            best: 'O(n log n)',
            average: 'O(n log n)',
            worst: 'O(n log n)'
        },
        spaceComplexity: 'O(1)',
        stability: false,
        difficulty: 'hard',
        points: 250
    },
    radix: {
        name: 'Radix Sort',
        description: 'O Radix Sort ordena numeros processando digito por digito, do menos significativo ao mais significativo. e muito eficiente para numeros inteiros.',
        timeComplexity: {
            best: 'O(nk)',
            average: 'O(nk)',
            worst: 'O(nk)'
        },
        spaceComplexity: 'O(n+k)',
        stability: true,
        difficulty: 'hard',
        points: 250
    }
};

// Export for use in other modules
window.SortingAlgorithms = SortingAlgorithms;
window.ALGORITHMS = ALGORITHMS;
