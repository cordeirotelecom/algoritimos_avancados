'use client';

import { useState, useEffect, useCallback } from 'react';
import Navigation from '../components/Navigation';
import '../styles/ordenacao.css';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// Algoritmos de Ordenação
class SortingAlgorithms {
  constructor() {
    this.steps = [];
    this.comparisons = 0;
    this.swaps = 0;
  }

  reset() {
    this.steps = [];
    this.comparisons = 0;
    this.swaps = 0;
  }

  addStep(type, indices, description, array = null) {
    this.steps.push({
      type,
      indices: [...indices],
      description,
      array: array ? [...array] : null,
      comparisons: this.comparisons,
      swaps: this.swaps
    });
  }

  bubbleSort(arr) {
    this.reset();
    const array = [...arr];
    const n = array.length;

    this.addStep('start', [], `🫧 Iniciando Bubble Sort com ${n} números!`, array);

    for (let i = 0; i < n - 1; i++) {
      let swapped = false;
      
      for (let j = 0; j < n - i - 1; j++) {
        this.addStep('compare', [j, j + 1], `Comparando ${array[j]} e ${array[j + 1]}`, array);
        this.comparisons++;

        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          this.swaps++;
          swapped = true;
          this.addStep('swap', [j, j + 1], `Trocando ${array[j + 1]} e ${array[j]}`, array);
        }
      }

      this.addStep('sorted', [n - i - 1], `Posição ${n - i - 1} ordenada!`, array);
      
      if (!swapped) break;
    }

    this.addStep('complete', [], '✅ Ordenação completa!', array);
    return this.steps;
  }

  selectionSort(arr) {
    this.reset();
    const array = [...arr];
    const n = array.length;

    this.addStep('start', [], `🎯 Iniciando Selection Sort com ${n} números!`, array);

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      this.addStep('info', [i], `Procurando o menor elemento a partir da posição ${i}`, array);

      for (let j = i + 1; j < n; j++) {
        this.addStep('compare', [minIdx, j], `Comparando ${array[minIdx]} e ${array[j]}`, array);
        this.comparisons++;

        if (array[j] < array[minIdx]) {
          minIdx = j;
          this.addStep('info', [minIdx], `Novo mínimo encontrado: ${array[minIdx]}`, array);
        }
      }

      if (minIdx !== i) {
        [array[i], array[minIdx]] = [array[minIdx], array[i]];
        this.swaps++;
        this.addStep('swap', [i, minIdx], `Colocando ${array[i]} na posição ${i}`, array);
      }

      this.addStep('sorted', [i], `Posição ${i} ordenada!`, array);
    }

    this.addStep('complete', [], '✅ Ordenação completa!', array);
    return this.steps;
  }

  insertionSort(arr) {
    this.reset();
    const array = [...arr];
    const n = array.length;

    this.addStep('start', [], `📌 Iniciando Insertion Sort com ${n} números!`, array);

    for (let i = 1; i < n; i++) {
      const key = array[i];
      let j = i - 1;
      
      this.addStep('info', [i], `Inserindo ${key} na posição correta`, array);

      while (j >= 0 && array[j] > key) {
        this.comparisons++;
        this.addStep('compare', [j, j + 1], `Comparando ${array[j]} e ${key}`, array);
        
        array[j + 1] = array[j];
        this.swaps++;
        this.addStep('swap', [j, j + 1], `Movendo ${array[j]} para a direita`, array);
        j--;
      }

      array[j + 1] = key;
      this.addStep('sorted', Array.from({length: i + 1}, (_, k) => k), `Primeiros ${i + 1} elementos ordenados!`, array);
    }

    this.addStep('complete', [], '✅ Ordenação completa!', array);
    return this.steps;
  }

  quickSort(arr, low = 0, high = null) {
    if (high === null) {
      this.reset();
      high = arr.length - 1;
      this.addStep('start', [], `⚡ Iniciando Quick Sort com ${arr.length} números!`, [...arr]);
    }

    if (low < high) {
      const pi = this.partition(arr, low, high);
      this.quickSort(arr, low, pi - 1);
      this.quickSort(arr, pi + 1, high);
    }

    if (low === 0 && high === arr.length - 1) {
      this.addStep('complete', [], '✅ Ordenação completa!', [...arr]);
    }

    return this.steps;
  }

  partition(arr, low, high) {
    const pivot = arr[high];
    this.addStep('info', [high], `Pivô escolhido: ${pivot}`, [...arr]);
    
    let i = low - 1;

    for (let j = low; j < high; j++) {
      this.comparisons++;
      this.addStep('compare', [j, high], `Comparando ${arr[j]} com pivô ${pivot}`, [...arr]);

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        this.swaps++;
        this.addStep('swap', [i, j], `Trocando ${arr[j]} e ${arr[i]}`, [...arr]);
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    this.swaps++;
    this.addStep('swap', [i + 1, high], `Colocando pivô na posição correta`, [...arr]);
    this.addStep('sorted', [i + 1], `Pivô ${pivot} na posição final!`, [...arr]);

    return i + 1;
  }

  mergeSort(arr, l = 0, r = null) {
    if (r === null) {
      this.reset();
      r = arr.length - 1;
      this.addStep('start', [], `🔀 Iniciando Merge Sort com ${arr.length} números!`, [...arr]);
    }

    if (l < r) {
      const m = Math.floor((l + r) / 2);
      
      this.addStep('info', Array.from({length: r - l + 1}, (_, i) => l + i), 
        `Dividindo array em [${l}...${m}] e [${m + 1}...${r}]`, [...arr]);
      
      this.mergeSort(arr, l, m);
      this.mergeSort(arr, m + 1, r);
      this.merge(arr, l, m, r);
    }

    if (l === 0 && r === arr.length - 1) {
      this.addStep('complete', [], '✅ Ordenação completa!', [...arr]);
    }

    return this.steps;
  }

  merge(arr, l, m, r) {
    const n1 = m - l + 1;
    const n2 = r - m;
    const L = arr.slice(l, m + 1);
    const R = arr.slice(m + 1, r + 1);

    let i = 0, j = 0, k = l;

    this.addStep('info', Array.from({length: r - l + 1}, (_, idx) => l + idx), 
      `Mesclando sublistas...`, [...arr]);

    while (i < n1 && j < n2) {
      this.comparisons++;
      
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }
      this.swaps++;
      k++;
      this.addStep('swap', [k - 1], `Colocando ${arr[k - 1]} na posição ${k - 1}`, [...arr]);
    }

    while (i < n1) {
      arr[k] = L[i];
      this.swaps++;
      this.addStep('swap', [k], `Colocando ${arr[k]} na posição ${k}`, [...arr]);
      i++;
      k++;
    }

    while (j < n2) {
      arr[k] = R[j];
      this.swaps++;
      this.addStep('swap', [k], `Colocando ${arr[k]} na posição ${k}`, [...arr]);
      j++;
      k++;
    }

    this.addStep('sorted', Array.from({length: r - l + 1}, (_, idx) => l + idx), 
      `Sublista mesclada!`, [...arr]);
  }

  heapSort(arr) {
    this.reset();
    const array = [...arr];
    const n = array.length;

    this.addStep('start', [], `🏔️ Iniciando Heap Sort com ${n} números!`, array);

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      this.heapify(array, n, i);
    }

    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
      [array[0], array[i]] = [array[i], array[0]];
      this.swaps++;
      this.addStep('swap', [0, i], `Movendo ${array[i]} para posição final`, array);
      this.addStep('sorted', [i], `Posição ${i} ordenada!`, array);
      
      this.heapify(array, i, 0);
    }

    this.addStep('complete', [], '✅ Ordenação completa!', array);
    return this.steps;
  }

  heapify(arr, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n) {
      this.comparisons++;
      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }

    if (right < n) {
      this.comparisons++;
      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      this.swaps++;
      this.addStep('swap', [i, largest], `Ajustando heap`, [...arr]);
      this.heapify(arr, n, largest);
    }
  }

  radixSort(arr) {
    this.reset();
    const array = [...arr];

    this.addStep('start', [], `📊 Iniciando Radix Sort com ${array.length} números!`, array);

    const max = Math.max(...array);
    
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      this.countingSortByDigit(array, exp);
    }

    this.addStep('complete', [], '✅ Ordenação completa!', array);
    return this.steps;
  }

  countingSortByDigit(arr, exp) {
    const n = arr.length;
    const output = new Array(n);
    const count = new Array(10).fill(0);

    this.addStep('info', [], `Ordenando por dígito (posição ${exp})`, [...arr]);

    for (let i = 0; i < n; i++) {
      const digit = Math.floor(arr[i] / exp) % 10;
      count[digit]++;
      this.comparisons++;
    }

    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    for (let i = n - 1; i >= 0; i--) {
      const digit = Math.floor(arr[i] / exp) % 10;
      output[count[digit] - 1] = arr[i];
      count[digit]--;
      this.swaps++;
    }

    for (let i = 0; i < n; i++) {
      arr[i] = output[i];
    }

    this.addStep('swap', Array.from({length: n}, (_, i) => i), 
      `Reorganizado por dígito`, [...arr]);
  }
}

export default function OrdenacaoPage() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble');
  const [arraySize, setArraySize] = useState(10);
  const [array, setArray] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [stats, setStats] = useState({ comparisons: 0, swaps: 0 });

  const algorithms = {
    bubble: { name: 'Bubble Sort', icon: '🫧', complexity: 'O(n²)' },
    selection: { name: 'Selection Sort', icon: '🎯', complexity: 'O(n²)' },
    insertion: { name: 'Insertion Sort', icon: '📌', complexity: 'O(n²)' },
    quick: { name: 'Quick Sort', icon: '⚡', complexity: 'O(n log n)' },
    merge: { name: 'Merge Sort', icon: '🔀', complexity: 'O(n log n)' },
    heap: { name: 'Heap Sort', icon: '🏔️', complexity: 'O(n log n)' },
    radix: { name: 'Radix Sort', icon: '📊', complexity: 'O(nk)' }
  };

  // Gerar array aleatório
  const generateArray = useCallback(() => {
    const newArray = Array.from({ length: arraySize }, () => 
      Math.floor(Math.random() * 100) + 1
    );
    setArray(newArray);
    setSteps([]);
    setCurrentStep(0);
    setIsPlaying(false);
    setStats({ comparisons: 0, swaps: 0 });
  }, [arraySize]);

  useEffect(() => {
    generateArray();
  }, [generateArray]);

  // Executar algoritmo
  const runAlgorithm = () => {
    if (array.length === 0) return;
    
    const sorter = new SortingAlgorithms();
    let algorithmSteps = [];

    switch (selectedAlgorithm) {
      case 'bubble':
        algorithmSteps = sorter.bubbleSort([...array]);
        break;
      case 'selection':
        algorithmSteps = sorter.selectionSort([...array]);
        break;
      case 'insertion':
        algorithmSteps = sorter.insertionSort([...array]);
        break;
      case 'quick':
        algorithmSteps = sorter.quickSort([...array]);
        break;
      case 'merge':
        algorithmSteps = sorter.mergeSort([...array]);
        break;
      case 'heap':
        algorithmSteps = sorter.heapSort([...array]);
        break;
      case 'radix':
        algorithmSteps = sorter.radixSort([...array]);
        break;
      default:
        break;
    }

    setSteps(algorithmSteps);
    setCurrentStep(0);
    setIsPlaying(true);
  };

  // Animação automática
  useEffect(() => {
    if (!isPlaying || currentStep >= steps.length - 1) {
      if (currentStep >= steps.length - 1 && steps.length > 0) {
        setIsPlaying(false);
      }
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1);
      if (steps[currentStep + 1]) {
        setStats({
          comparisons: steps[currentStep + 1].comparisons,
          swaps: steps[currentStep + 1].swaps
        });
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps, speed]);

  // Controles de navegação
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setStats({
        comparisons: steps[currentStep + 1].comparisons,
        swaps: steps[currentStep + 1].swaps
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setStats({
        comparisons: steps[currentStep - 1].comparisons,
        swaps: steps[currentStep - 1].swaps
      });
    }
  };

  const currentStepData = steps[currentStep];
  const displayArray = currentStepData?.array || array;

  return (
    <div className="sorting-container">
      {/* Navigation */}
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <Navigation />
      </div>

      {/* Header */}
      <header className="sorting-header">
        <div className="header-content">
          <h1>🎓 Algoritmos de Ordenação</h1>
          <p>Visualize e aprenda algoritmos de ordenação passo a passo</p>
        </div>
        <nav className="breadcrumb">
          <a href="/">Início</a> / Ordenação
        </nav>
      </header>

      {/* Controles */}
      <div className="controls-panel">
        <div className="algorithm-selector">
          <label>Escolha o Algoritmo:</label>
          <div className="algorithm-buttons">
            {Object.entries(algorithms).map(([key, algo]) => (
              <button
                key={key}
                className={`algo-btn ${selectedAlgorithm === key ? 'active' : ''}`}
                onClick={() => {
                  setSelectedAlgorithm(key);
                  setSteps([]);
                  setCurrentStep(0);
                  setIsPlaying(false);
                }}
              >
                <span className="algo-icon">{algo.icon}</span>
                <span className="algo-name">{algo.name}</span>
                <span className="algo-complexity">{algo.complexity}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="array-controls">
          <div className="control-group">
            <label>Tamanho do Array: {arraySize}</label>
            <input
              type="range"
              min="5"
              max="30"
              value={arraySize}
              onChange={(e) => setArraySize(Number(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label>Velocidade: {speed}ms</label>
            <input
              type="range"
              min="100"
              max="2000"
              step="100"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
            />
          </div>

          <div className="action-buttons">
            <button className="btn-primary" onClick={generateArray}>
              🔄 Novo Array
            </button>
            <button 
              className="btn-success" 
              onClick={runAlgorithm}
              disabled={steps.length > 0}
            >
              ▶️ Executar
            </button>
          </div>
        </div>
      </div>

      {/* Visualização */}
      <div className="visualization-panel">
        <div className="stats-bar">
          <div className="stat">
            <span className="stat-label">Comparações:</span>
            <span className="stat-value">{stats.comparisons}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Trocas:</span>
            <span className="stat-value">{stats.swaps}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Passo:</span>
            <span className="stat-value">{currentStep + 1} / {steps.length || 1}</span>
          </div>
        </div>

        <div className="array-visualization">
          {displayArray.map((value, index) => {
            const isComparing = currentStepData?.type === 'compare' && 
              currentStepData.indices.includes(index);
            const isSwapping = currentStepData?.type === 'swap' && 
              currentStepData.indices.includes(index);
            const isSorted = currentStepData?.type === 'sorted' && 
              currentStepData.indices.includes(index);

            return (
              <div
                key={index}
                className={`array-bar ${isComparing ? 'comparing' : ''} ${isSwapping ? 'swapping' : ''} ${isSorted ? 'sorted' : ''}`}
                style={{
                  height: `${(value / Math.max(...displayArray)) * 300}px`,
                  width: `${Math.max(20, 600 / displayArray.length)}px`
                }}
              >
                <span className="bar-value">{value}</span>
              </div>
            );
          })}
        </div>

        {currentStepData && (
          <div className="step-description">
            {currentStepData.description}
          </div>
        )}

        {steps.length > 0 && (
          <div className="playback-controls">
            <button onClick={prevStep} disabled={currentStep === 0}>
              ⏮️ Anterior
            </button>
            <button onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? '⏸️ Pausar' : '▶️ Reproduzir'}
            </button>
            <button onClick={nextStep} disabled={currentStep >= steps.length - 1}>
              ⏭️ Próximo
            </button>
          </div>
        )}
      </div>

      {/* Informações do Algoritmo */}
      <div className="algorithm-info">
        <h3>{algorithms[selectedAlgorithm].icon} {algorithms[selectedAlgorithm].name}</h3>
        <div className="info-grid">
          <div className="info-card">
            <h4>⏱️ Complexidade</h4>
            <p><strong>Melhor caso:</strong> {getComplexity(selectedAlgorithm, 'best')}</p>
            <p><strong>Caso médio:</strong> {getComplexity(selectedAlgorithm, 'average')}</p>
            <p><strong>Pior caso:</strong> {getComplexity(selectedAlgorithm, 'worst')}</p>
          </div>
          <div className="info-card">
            <h4>💾 Espaço</h4>
            <p>{getSpaceComplexity(selectedAlgorithm)}</p>
          </div>
          <div className="info-card">
            <h4>📝 Características</h4>
            <p>{getCharacteristics(selectedAlgorithm)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function getComplexity(algorithm, type) {
  const complexities = {
    bubble: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    selection: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
    insertion: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    quick: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
    merge: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    heap: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    radix: { best: 'O(nk)', average: 'O(nk)', worst: 'O(nk)' }
  };
  return complexities[algorithm][type];
}

function getSpaceComplexity(algorithm) {
  const space = {
    bubble: 'O(1) - In-place',
    selection: 'O(1) - In-place',
    insertion: 'O(1) - In-place',
    quick: 'O(log n) - Recursivo',
    merge: 'O(n) - Arrays auxiliares',
    heap: 'O(1) - In-place',
    radix: 'O(n + k) - Buckets'
  };
  return space[algorithm];
}

function getCharacteristics(algorithm) {
  const chars = {
    bubble: 'Estável, simples, ineficiente para grandes arrays',
    selection: 'Instável, sempre faz n² comparações',
    insertion: 'Estável, eficiente para arrays pequenos ou quase ordenados',
    quick: 'Instável, muito eficiente na prática, dividir e conquistar',
    merge: 'Estável, sempre O(n log n), usa memória extra',
    heap: 'Instável, usa estrutura de heap, in-place',
    radix: 'Estável, não-comparativo, bom para números inteiros'
  };
  return chars[algorithm];
}
