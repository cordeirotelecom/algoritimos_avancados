// ===== ALL EDUCATIONAL MODULES =====

/**
 * Módulos educacionais consolidados para Algoritmos e Complexidade
 * Prof. Eng. Computação Vagner Cordeiro
 */

// ===== COMPLEXITY ANALYSIS MODULE =====
class ComplexityModule {
    static render() {
        return `
            <div class="module-content active">
                <div class="module-header">
                    <h1 class="module-title"><span>📊</span><span>Análise de Complexidade</span></h1>
                    <p class="module-description">
                        Aprenda a analisar a eficiência de algoritmos usando notação Big-O, Ω e Θ.
                    </p>
                </div>

                <div class="module-section">
                    <h2 class="section-title">📚 Conceitos Fundamentais</h2>
                    <div class="section-content">
                        <p>
                            <strong>Análise de Algoritmos</strong> estuda o desempenho e consumo de recursos
                            (tempo e espaço) de um algoritmo à medida que o tamanho da entrada cresce.
                        </p>

                        <h3>🔹 Por que Analisar?</h3>
                        <ul>
                            <li>Comparar eficiência de diferentes soluções</li>
                            <li>Prever comportamento com entradas grandes</li>
                            <li>Otimizar código crítico</li>
                            <li>Tomar decisões informadas no design</li>
                        </ul>

                        <h3>🔹 Tipos de Análise</h3>
                        <div class="code-example">
<span class="comment">// Melhor Caso (Best Case) - Ω(n)</span>
<span class="comment">// Entrada mais favorável possível</span>

<span class="comment">// Caso Médio (Average Case) - Θ(n)</span>
<span class="comment">// Comportamento típico esperado</span>

<span class="comment">// Pior Caso (Worst Case) - O(n)</span>
<span class="comment">// Entrada mais desfavorável possível</span>
                        </div>
                    </div>
                </div>

                <div class="module-section">
                    <h2 class="section-title">⭕ Notação Big-O</h2>
                    <div class="section-content">
                        <p>
                            A notação <strong>Big-O</strong> descreve o <strong>limite superior</strong>
                            do crescimento da complexidade (pior caso).
                        </p>

                        <h3>🔹 Classes de Complexidade Comuns</h3>
                        
                        <div class="info-box success">
                            <div class="info-box-title">
                                <span class="complexity-badge logarithmic">O(1)</span> Constante
                            </div>
                            <p>Tempo de execução não depende do tamanho da entrada.</p>
                            <div class="code-example">
<span class="keyword">function</span> <span class="function">acessarPrimeiro</span>(arr) {
    <span class="keyword">return</span> arr[<span class="number">0</span>]; <span class="comment">// Sempre 1 operação</span>
}
                            </div>
                        </div>

                        <div class="info-box">
                            <div class="info-box-title">
                                <span class="complexity-badge logarithmic">O(log n)</span> Logarítmica
                            </div>
                            <p>Divide o problema pela metade a cada passo.</p>
                            <div class="code-example">
<span class="comment">// Busca Binária</span>
<span class="keyword">function</span> <span class="function">buscaBinaria</span>(arr, alvo) {
    <span class="keyword">let</span> inicio = <span class="number">0</span>, fim = arr.length - <span class="number">1</span>;
    <span class="keyword">while</span> (inicio <= fim) {
        <span class="keyword">let</span> meio = Math.floor((inicio + fim) / <span class="number">2</span>);
        <span class="keyword">if</span> (arr[meio] === alvo) <span class="keyword">return</span> meio;
        <span class="keyword">if</span> (arr[meio] < alvo) inicio = meio + <span class="number">1</span>;
        <span class="keyword">else</span> fim = meio - <span class="number">1</span>;
    }
    <span class="keyword">return</span> -<span class="number">1</span>;
}
                            </div>
                        </div>

                        <div class="info-box">
                            <div class="info-box-title">
                                <span class="complexity-badge linear">O(n)</span> Linear
                            </div>
                            <p>Percorre cada elemento uma vez.</p>
                            <div class="code-example">
<span class="keyword">function</span> <span class="function">buscarLinear</span>(arr, alvo) {
    <span class="keyword">for</span> (<span class="keyword">let</span> i = <span class="number">0</span>; i < arr.length; i++) {
        <span class="keyword">if</span> (arr[i] === alvo) <span class="keyword">return</span> i;
    }
    <span class="keyword">return</span> -<span class="number">1</span>;
}
                            </div>
                        </div>

                        <div class="info-box">
                            <div class="info-box-title">
                                <span class="complexity-badge linear">O(n log n)</span> Linearítmica
                            </div>
                            <p>Algoritmos eficientes de ordenação.</p>
                            <div class="code-example">
<span class="comment">// Merge Sort, Quick Sort (médio), Heap Sort</span>
                            </div>
                        </div>

                        <div class="info-box warning">
                            <div class="info-box-title">
                                <span class="complexity-badge quadratic">O(n²)</span> Quadrática
                            </div>
                            <p>Loops aninhados sobre a mesma entrada.</p>
                            <div class="code-example">
<span class="keyword">function</span> <span class="function">bubbleSort</span>(arr) {
    <span class="keyword">for</span> (<span class="keyword">let</span> i = <span class="number">0</span>; i < arr.length; i++) {
        <span class="keyword">for</span> (<span class="keyword">let</span> j = <span class="number">0</span>; j < arr.length - i - <span class="number">1</span>; j++) {
            <span class="keyword">if</span> (arr[j] > arr[j+<span class="number">1</span>]) {
                [arr[j], arr[j+<span class="number">1</span>]] = [arr[j+<span class="number">1</span>], arr[j]];
            }
        }
    }
}
                            </div>
                        </div>

                        <div class="info-box danger">
                            <div class="info-box-title">
                                <span class="complexity-badge exponential">O(2ⁿ)</span> Exponencial
                            </div>
                            <p>Crescimento explosivo - evite quando possível!</p>
                            <div class="code-example">
<span class="keyword">function</span> <span class="function">fibonacci</span>(n) {
    <span class="keyword">if</span> (n <= <span class="number">1</span>) <span class="keyword">return</span> n;
    <span class="keyword">return</span> <span class="function">fibonacci</span>(n-<span class="number">1</span>) + <span class="function">fibonacci</span>(n-<span class="number">2</span>); <span class="comment">// Ineficiente!</span>
}
                            </div>
                        </div>

                        <div class="demo-box">
                            <h3>📊 Comparação de Crescimento</h3>
                            <div class="demo-controls">
                                <button class="btn btn-primary" data-demo="complexity-comparison">
                                    ▶️ Ver Comparação
                                </button>
                            </div>
                            <div class="demo-output"></div>
                        </div>
                    </div>
                </div>

                <div class="module-section">
                    <h2 class="section-title">🎯 Como Calcular Complexidade</h2>
                    <div class="section-content">
                        <h3>🔹 Regras Básicas</h3>
                        <ol>
                            <li><strong>Ignore constantes:</strong> O(2n) → O(n)</li>
                            <li><strong>Mantenha o termo dominante:</strong> O(n² + n) → O(n²)</li>
                            <li><strong>Some complexidades sequenciais:</strong> O(n) + O(m) → O(n+m)</li>
                            <li><strong>Multiplique complexidades aninhadas:</strong> O(n) * O(m) → O(n*m)</li>
                        </ol>

                        <h3>🔹 Exemplos Práticos</h3>
                        <div class="code-example">
<span class="comment">// Exemplo 1: O(n)</span>
<span class="keyword">function</span> <span class="function">exemplo1</span>(arr) {
    <span class="keyword">for</span> (<span class="keyword">let</span> i = <span class="number">0</span>; i < arr.length; i++) { <span class="comment">// n iterações</span>
        console.log(arr[i]); <span class="comment">// O(1)</span>
    }
} <span class="comment">// Total: O(n)</span>

<span class="comment">// Exemplo 2: O(n²)</span>
<span class="keyword">function</span> <span class="function">exemplo2</span>(arr) {
    <span class="keyword">for</span> (<span class="keyword">let</span> i = <span class="number">0</span>; i < arr.length; i++) { <span class="comment">// n iterações</span>
        <span class="keyword">for</span> (<span class="keyword">let</span> j = <span class="number">0</span>; j < arr.length; j++) { <span class="comment">// n iterações</span>
            console.log(arr[i], arr[j]); <span class="comment">// O(1)</span>
        }
    }
} <span class="comment">// Total: O(n * n) = O(n²)</span>

<span class="comment">// Exemplo 3: O(n + m)</span>
<span class="keyword">function</span> <span class="function">exemplo3</span>(arr1, arr2) {
    <span class="keyword">for</span> (<span class="keyword">let</span> i = <span class="number">0</span>; i < arr1.length; i++) { <span class="comment">// n</span>
        console.log(arr1[i]);
    }
    <span class="keyword">for</span> (<span class="keyword">let</span> j = <span class="number">0</span>; j < arr2.length; j++) { <span class="comment">// m</span>
        console.log(arr2[j]);
    }
} <span class="comment">// Total: O(n + m)</span>
                        </div>
                    </div>
                </div>

                <div class="module-section">
                    <h2 class="section-title">💾 Complexidade de Espaço</h2>
                    <div class="section-content">
                        <p>
                            Além do tempo, analisamos o <strong>espaço adicional</strong> (memória) usado pelo algoritmo.
                        </p>

                        <h3>🔹 Espaço O(1) - Constante</h3>
                        <div class="code-example">
<span class="keyword">function</span> <span class="function">somarArray</span>(arr) {
    <span class="keyword">let</span> soma = <span class="number">0</span>; <span class="comment">// Espaço constante</span>
    <span class="keyword">for</span> (<span class="keyword">let</span> i = <span class="number">0</span>; i < arr.length; i++) {
        soma += arr[i];
    }
    <span class="keyword">return</span> soma;
}
                        </div>

                        <h3>🔹 Espaço O(n) - Linear</h3>
                        <div class="code-example">
<span class="keyword">function</span> <span class="function">duplicarArray</span>(arr) {
    <span class="keyword">let</span> novo = []; <span class="comment">// Novo array de tamanho n</span>
    <span class="keyword">for</span> (<span class="keyword">let</span> i = <span class="number">0</span>; i < arr.length; i++) {
        novo.push(arr[i] * <span class="number">2</span>);
    }
    <span class="keyword">return</span> novo;
}
                        </div>

                        <h3>🔹 Espaço O(n) - Recursão</h3>
                        <div class="code-example">
<span class="keyword">function</span> <span class="function">fatorial</span>(n) {
    <span class="keyword">if</span> (n <= <span class="number">1</span>) <span class="keyword">return</span> <span class="number">1</span>;
    <span class="keyword">return</span> n * <span class="function">fatorial</span>(n - <span class="number">1</span>);
} <span class="comment">// Pilha de chamadas: n níveis = O(n)</span>
                        </div>
                    </div>
                </div>

                <div class="module-navigation-footer">
                    <button class="btn btn-secondary" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
                        ⬆️ Voltar ao Topo
                    </button>
                    <button class="btn btn-primary" data-next-module="recursion">
                        Próximo: Recursividade ➡️
                    </button>
                </div>
            </div>
        `;
    }
}

// ===== RECURSION MODULE =====
class RecursionModule {
    static render() {
        return `
            <div class="module-content active">
                <div class="module-header">
                    <h1 class="module-title"><span>🔁</span><span>Recursividade</span></h1>
                    <p class="module-description">
                        Domine recursão: quando uma função chama a si mesma para resolver subproblemas.
                    </p>
                </div>

                <div class="module-section">
                    <h2 class="section-title">📚 O que é Recursão?</h2>
                    <div class="section-content">
                        <p>
                            Uma função é <strong>recursiva</strong> quando chama a si mesma,
                            dividindo o problema em casos menores até atingir um <strong>caso base</strong>.
                        </p>

                        <h3>🔹 Componentes Essenciais</h3>
                        <ul>
                            <li><strong>Caso Base:</strong> Condição de parada (evita loop infinito)</li>
                            <li><strong>Caso Recursivo:</strong> Chamada da função com problema reduzido</li>
                            <li><strong>Progresso:</strong> Cada chamada deve aproximar do caso base</li>
                        </ul>

                        <div class="code-example">
<span class="keyword">function</span> <span class="function">fatorial</span>(n) {
    <span class="comment">// Caso Base</span>
    <span class="keyword">if</span> (n <= <span class="number">1</span>) <span class="keyword">return</span> <span class="number">1</span>;
    
    <span class="comment">// Caso Recursivo</span>
    <span class="keyword">return</span> n * <span class="function">fatorial</span>(n - <span class="number">1</span>);
}

<span class="comment">// Execução: fatorial(5)</span>
<span class="comment">// 5 * fatorial(4)</span>
<span class="comment">// 5 * 4 * fatorial(3)</span>
<span class="comment">// 5 * 4 * 3 * fatorial(2)</span>
<span class="comment">// 5 * 4 * 3 * 2 * fatorial(1)</span>
<span class="comment">// 5 * 4 * 3 * 2 * 1 = 120</span>
                        </div>

                        <div class="demo-box">
                            <h3>🎯 Demonstração: Fatorial</h3>
                            <div class="demo-controls">
                                <button class="btn btn-primary" data-demo="recursion-factorial">
                                    ▶️ Executar Fatorial(5)
                                </button>
                            </div>
                            <div class="demo-output"></div>
                        </div>
                    </div>
                </div>

                <div class="module-section">
                    <h2 class="section-title">🌟 Exemplos Clássicos</h2>
                    <div class="section-content">
                        <h3>🔹 Fibonacci</h3>
                        <div class="code-example">
<span class="keyword">function</span> <span class="function">fibonacci</span>(n) {
    <span class="keyword">if</span> (n <= <span class="number">1</span>) <span class="keyword">return</span> n;
    <span class="keyword">return</span> <span class="function">fibonacci</span>(n-<span class="number">1</span>) + <span class="function">fibonacci</span>(n-<span class="number">2</span>);
}

<span class="comment">// Sequência: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34...</span>
                        </div>

                        <div class="info-box warning">
                            <div class="info-box-title">⚠️ Problema: Complexidade <span class="complexity-badge exponential">O(2ⁿ)</span></div>
                            <p>Fibonacci recursivo simples é muito ineficiente!</p>
                        </div>

                        <h3>🔹 Soma de Array</h3>
                        <div class="code-example">
<span class="keyword">function</span> <span class="function">somarArray</span>(arr) {
    <span class="keyword">if</span> (arr.length === <span class="number">0</span>) <span class="keyword">return</span> <span class="number">0</span>;
    <span class="keyword">return</span> arr[<span class="number">0</span>] + <span class="function">somarArray</span>(arr.slice(<span class="number">1</span>));
}
                        </div>

                        <h3>🔹 Potência</h3>
                        <div class="code-example">
<span class="keyword">function</span> <span class="function">potencia</span>(base, exp) {
    <span class="keyword">if</span> (exp === <span class="number">0</span>) <span class="keyword">return</span> <span class="number">1</span>;
    <span class="keyword">return</span> base * <span class="function">potencia</span>(base, exp - <span class="number">1</span>);
}
                        </div>

                        <h3>🔹 Torres de Hanoi</h3>
                        <div class="code-example">
<span class="keyword">function</span> <span class="function">hanoi</span>(n, origem, destino, auxiliar) {
    <span class="keyword">if</span> (n === <span class="number">1</span>) {
        console.log(<span class="string">"Mover disco "</span> + n + <span class="string">" de "</span> + origem + <span class="string">" para "</span> + destino);
        <span class="keyword">return</span>;
    }
    <span class="function">hanoi</span>(n-<span class="number">1</span>, origem, auxiliar, destino);
    console.log(<span class="string">"Mover disco "</span> + n + <span class="string">" de "</span> + origem + <span class="string">" para "</span> + destino);
    <span class="function">hanoi</span>(n-<span class="number">1</span>, auxiliar, destino, origem);
}
                        </div>
                    </div>
                </div>

                <div class="module-section">
                    <h2 class="section-title">⚖️ Recursão vs Iteração</h2>
                    <div class="section-content">
                        <h3>🔹 Quando Usar Recursão</h3>
                        <ul>
                            <li>✅ Problemas com estrutura naturalmente recursiva (árvores, grafos)</li>
                            <li>✅ Código mais limpo e legível</li>
                            <li>✅ Divide e conquista</li>
                        </ul>

                        <h3>🔹 Quando NÃO Usar Recursão</h3>
                        <ul>
                            <li>❌ Problemas simples (loops são mais eficientes)</li>
                            <li>❌ Profundidade muito grande (stack overflow)</li>
                            <li>❌ Performance crítica sem otimização</li>
                        </ul>

                        <div class="info-box">
                            <div class="info-box-title">💡 Comparação</div>
                            <div class="code-example">
<span class="comment">// Recursivo</span>
<span class="keyword">function</span> <span class="function">somaN_recursivo</span>(n) {
    <span class="keyword">if</span> (n <= <span class="number">0</span>) <span class="keyword">return</span> <span class="number">0</span>;
    <span class="keyword">return</span> n + <span class="function">somaN_recursivo</span>(n - <span class="number">1</span>);
}

<span class="comment">// Iterativo (mais eficiente)</span>
<span class="keyword">function</span> <span class="function">somaN_iterativo</span>(n) {
    <span class="keyword">let</span> soma = <span class="number">0</span>;
    <span class="keyword">for</span> (<span class="keyword">let</span> i = <span class="number">1</span>; i <= n; i++) {
        soma += i;
    }
    <span class="keyword">return</span> soma;
}

<span class="comment">// Fórmula matemática (melhor!)</span>
<span class="keyword">function</span> <span class="function">somaN_formula</span>(n) {
    <span class="keyword">return</span> (n * (n + <span class="number">1</span>)) / <span class="number">2</span>;
}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="module-navigation-footer">
                    <button class="btn btn-secondary" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
                        ⬆️ Voltar ao Topo
                    </button>
                    <button class="btn btn-primary" data-next-module="trees">
                        Próximo: Árvores Binárias ➡️
                    </button>
                </div>
            </div>
        `;
    }
}

// Export modules
if (typeof window !== 'undefined') {
    window.ComplexityModule = ComplexityModule;
    window.RecursionModule = RecursionModule;
    console.log('✅ Additional modules loaded: Complexity, Recursion');
}
