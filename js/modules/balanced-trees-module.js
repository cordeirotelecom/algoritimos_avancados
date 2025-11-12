// ===== BALANCED TREES MODULE =====

const BalancedTreesModule = {
    name: 'Árvores Balanceadas',
    
    render() {
        // Inicializar visualização após renderizar
        setTimeout(() => {
            if (typeof window.initializeBalancedTreeVisualization === 'function') {
                window.initializeBalancedTreeVisualization();
            }
        }, 100);
        
        return `
            <div class="module-container">
                <div class="module-header">
                    <h2>⚖️ Árvores Balanceadas</h2>
                    <p class="module-description">
                        Aprenda sobre árvores AVL e o algoritmo DSW (Day-Stout-Warren) para balanceamento de árvores binárias.
                    </p>
                </div>

                <!-- Por que balancear? -->
                <div class="module-section">
                    <h3>❓ Por que Balancear Árvores?</h3>
                    
                    <div class="concept-card highlight">
                        <h4>O Problema das Árvores Degeneradas</h4>
                        <div class="comparison-grid">
                            <div class="comparison-item">
                                <h5>❌ Árvore Degenerada (Desbalanceada)</h5>
                                <pre>
    1
     \\
      2
       \\
        3
         \\
          4
           \\
            5
                                </pre>
                                <p><strong>Altura:</strong> n-1 = 4</p>
                                <p><strong>Busca:</strong> O(n) - Linear!</p>
                                <p class="warning">Equivalente a uma lista encadeada</p>
                            </div>
                            <div class="comparison-item">
                                <h5>✅ Árvore Balanceada</h5>
                                <pre>
        3
       / \\
      2   5
     /   /
    1   4
                                </pre>
                                <p><strong>Altura:</strong> log₂(n) ≈ 2</p>
                                <p><strong>Busca:</strong> O(log n) - Logarítmica!</p>
                                <p class="success">Muito mais eficiente!</p>
                            </div>
                        </div>
                    </div>

                    <div class="stats-comparison">
                        <table>
                            <thead>
                                <tr>
                                    <th>Nós</th>
                                    <th>Altura Balanceada</th>
                                    <th>Altura Degenerada</th>
                                    <th>Diferença</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>16</td>
                                    <td class="success">3-4</td>
                                    <td class="danger">15</td>
                                    <td>~4x mais rápido</td>
                                </tr>
                                <tr>
                                    <td>1.000</td>
                                    <td class="success">~10</td>
                                    <td class="danger">999</td>
                                    <td>~100x mais rápido</td>
                                </tr>
                                <tr>
                                    <td>1.000.000</td>
                                    <td class="success">~20</td>
                                    <td class="danger">999.999</td>
                                    <td>~50.000x mais rápido!</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- EXEMPLOS VISUAIS INTERATIVOS -->
                <div class="module-section">
                    <h3>🎨 Exemplos Visuais Interativos</h3>
                    
                    <div class="visual-examples-container">
                        <div class="examples-toolbar">
                            <select id="example-selector" class="example-select">
                                <option value="">-- Selecione um Exemplo --</option>
                                <option value="binary-simple">📊 Árvore Binária Simples</option>
                                <option value="binary-unbalanced">⚠️ Árvore Desbalanceada</option>
                                <option value="avl-balanced">✅ Árvore AVL Balanceada</option>
                                <option value="balance-calculation">📐 Tutorial: Cálculo de FB</option>
                                <option value="avl-rotation-ll">🔄 Rotação LL (Simples Direita)</option>
                                <option value="avl-rotation-rr">🔄 Rotação RR (Simples Esquerda)</option>
                                <option value="avl-rotation-lr">🔄 Rotação LR (Dupla)</option>
                                <option value="avl-rotation-rl">🔄 Rotação RL (Dupla)</option>
                            </select>
                            
                            <div class="animation-controls" id="animationControls" style="display: none;">
                                <button id="prevStepBtn" class="btn-control">⬅️ Anterior</button>
                                <span id="stepIndicator">Passo 1 de 1</span>
                                <button id="nextStepBtn" class="btn-control">Próximo ➡️</button>
                            </div>
                        </div>
                        
                        <div class="canvas-container">
                            <canvas id="tree-visual-canvas" width="900" height="500"></canvas>
                        </div>
                        
                        <div id="exampleDescription" class="example-description">
                            <p>👆 Selecione um exemplo acima para visualizar árvores binárias e AVL com cálculos detalhados!</p>
                        </div>
                    </div>

                    <div class="tutorial-box">
                        <h4>📚 Como usar os exemplos:</h4>
                        <ul>
                            <li><strong>Exemplos de Árvores:</strong> Veja visualmente a diferença entre árvores balanceadas e desbalanceadas</li>
                            <li><strong>Tutorial de FB:</strong> Aprenda passo a passo como calcular o Fator de Balanceamento</li>
                            <li><strong>Rotações:</strong> Acompanhe animações de cada tipo de rotação AVL</li>
                            <li><strong>Use os botões:</strong> Navegue pelos passos das animações e tutoriais</li>
                        </ul>
                    </div>
                </div>

                <!-- Árvores AVL -->
                <div class="module-section">
                    <h3>🌲 Árvores AVL</h3>
                    
                    <div class="concept-card">
                        <h4>O que é uma Árvore AVL?</h4>
                        <p>
                            Criada por <strong>A</strong>delson-<strong>V</strong>elsky e <strong>L</strong>andis em 1962, 
                            é uma BST auto-balanceada onde a diferença de altura entre subárvores esquerda e direita 
                            (fator de balanceamento) é no máximo 1.
                        </p>
                        
                        <div class="formula-box">
                            <h5>Fator de Balanceamento (FB)</h5>
                            <p class="formula">FB(nó) = Altura(subárvore esquerda) - Altura(subárvore direita)</p>
                            <p><strong>Válido:</strong> FB ∈ {-1, 0, +1}</p>
                            <p><strong>Desbalanceado:</strong> FB ∉ {-1, 0, +1}</p>
                        </div>
                    </div>

                    <!-- CALCULADORA DE FATOR DE BALANCEAMENTO -->
                    <div id="bf-calculator-section"></div>

                    <div class="balance-examples">
                        <h4>Exemplos de Fatores de Balanceamento</h4>
                        <div class="examples-grid">
                            <div class="example-item balanced">
                                <h5>✅ Balanceada (FB = 0)</h5>
                                <pre>
        10 (0)
       /      \\
     5 (0)   15 (0)
                                </pre>
                                <p>Todas as subárvores têm mesma altura</p>
                            </div>
                            <div class="example-item balanced">
                                <h5>✅ Balanceada (FB = +1)</h5>
                                <pre>
      10 (+1)
     /      \\
   5 (0)   15
  /
 3
                                </pre>
                                <p>Esquerda uma altura maior</p>
                            </div>
                            <div class="example-item balanced">
                                <h5>✅ Balanceada (FB = -1)</h5>
                                <pre>
    10 (-1)
   /      \\
  5      15 (0)
            \\
            20
                                </pre>
                                <p>Direita uma altura maior</p>
                            </div>
                            <div class="example-item unbalanced">
                                <h5>❌ Desbalanceada (FB = +2)</h5>
                                <pre>
    10 (+2)
   /      \\
  5 (+1) 15
 /
3
                                </pre>
                                <p class="warning">Requer rotação!</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Rotações AVL -->
                <div class="module-section">
                    <h3>🔄 Rotações em Árvores AVL</h3>
                    
                    <div class="rotations-intro">
                        <p>Quando uma inserção ou remoção desbalanceia a árvore (FB > 1 ou FB < -1), aplicamos rotações para restaurar o balanceamento.</p>
                    </div>

                    <div class="rotations-grid">
                        <!-- Rotação Simples à Direita -->
                        <div class="rotation-card">
                            <h4>➡️ Rotação Simples à Direita (LL)</h4>
                            <p><strong>Quando usar:</strong> FB do nó = +2 e FB do filho esquerdo = +1</p>
                            <div class="rotation-visual">
                                <div class="before">
                                    <h5>Antes:</h5>
                                    <pre>
      z (+2)
     /     \\
   y (+1)  T4
   /   \\
  x    T3
 / \\
T1 T2
                                    </pre>
                                </div>
                                <div class="arrow">→</div>
                                <div class="after">
                                    <h5>Depois:</h5>
                                    <pre>
      y (0)
     /    \\
    x     z
   / \\   / \\
  T1 T2 T3 T4
                                    </pre>
                                </div>
                            </div>
                            <div class="code-block-mini">
                                <pre><code>
rotacaoDireita(z) {
    const y = z.esquerda;
    const T3 = y.direita;
    
    y.direita = z;
    z.esquerda = T3;
    
    // Atualizar alturas
    z.altura = Math.max(altura(z.esq), altura(z.dir)) + 1;
    y.altura = Math.max(altura(y.esq), altura(y.dir)) + 1;
    
    return y; // Nova raiz
}
                                </code></pre>
                            </div>
                        </div>

                        <!-- Rotação Simples à Esquerda -->
                        <div class="rotation-card">
                            <h4>⬅️ Rotação Simples à Esquerda (RR)</h4>
                            <p><strong>Quando usar:</strong> FB do nó = -2 e FB do filho direito = -1</p>
                            <div class="rotation-visual">
                                <div class="before">
                                    <h5>Antes:</h5>
                                    <pre>
    z (-2)
   /     \\
  T1    y (-1)
       /   \\
      T2    x
           / \\
          T3 T4
                                    </pre>
                                </div>
                                <div class="arrow">→</div>
                                <div class="after">
                                    <h5>Depois:</h5>
                                    <pre>
      y (0)
     /    \\
    z      x
   / \\   / \\
  T1 T2 T3 T4
                                    </pre>
                                </div>
                            </div>
                            <div class="code-block-mini">
                                <pre><code>
rotacaoEsquerda(z) {
    const y = z.direita;
    const T2 = y.esquerda;
    
    y.esquerda = z;
    z.direita = T2;
    
    // Atualizar alturas
    z.altura = Math.max(altura(z.esq), altura(z.dir)) + 1;
    y.altura = Math.max(altura(y.esq), altura(y.dir)) + 1;
    
    return y; // Nova raiz
}
                                </code></pre>
                            </div>
                        </div>

                        <!-- Rotação Dupla Esquerda-Direita -->
                        <div class="rotation-card">
                            <h4>↪️ Rotação Dupla Esquerda-Direita (LR)</h4>
                            <p><strong>Quando usar:</strong> FB do nó = +2 e FB do filho esquerdo = -1</p>
                            <div class="rotation-visual">
                                <div class="before">
                                    <h5>Antes:</h5>
                                    <pre>
      z (+2)
     /     \\
   y (-1)  T4
   /   \\
  T1    x
       / \\
      T2 T3
                                    </pre>
                                </div>
                                <div class="arrow">→</div>
                                <div class="after">
                                    <h5>Depois:</h5>
                                    <pre>
      x (0)
     /    \\
    y      z
   / \\   / \\
  T1 T2 T3 T4
                                    </pre>
                                </div>
                            </div>
                            <div class="code-block-mini">
                                <pre><code>
rotacaoEsquerdaDireita(z) {
    z.esquerda = rotacaoEsquerda(z.esquerda);
    return rotacaoDireita(z);
}
                                </code></pre>
                            </div>
                        </div>

                        <!-- Rotação Dupla Direita-Esquerda -->
                        <div class="rotation-card">
                            <h4>↩️ Rotação Dupla Direita-Esquerda (RL)</h4>
                            <p><strong>Quando usar:</strong> FB do nó = -2 e FB do filho direito = +1</p>
                            <div class="rotation-visual">
                                <div class="before">
                                    <h5>Antes:</h5>
                                    <pre>
    z (-2)
   /     \\
  T1    y (+1)
       /   \\
      x    T4
     / \\
    T2 T3
                                    </pre>
                                </div>
                                <div class="arrow">→</div>
                                <div class="after">
                                    <h5>Depois:</h5>
                                    <pre>
      x (0)
     /    \\
    z      y
   / \\   / \\
  T1 T2 T3 T4
                                    </pre>
                                </div>
                            </div>
                            <div class="code-block-mini">
                                <pre><code>
rotacaoDireitaEsquerda(z) {
    z.direita = rotacaoDireita(z.direita);
    return rotacaoEsquerda(z);
}
                                </code></pre>
                            </div>
                        </div>
                    </div>

                    <div class="rotation-decision-tree">
                        <h4>🌳 Árvore de Decisão para Rotações</h4>
                        <div class="code-block">
                            <pre><code>
inserirAVL(no, valor) {
    // 1. Inserção normal BST
    if (no === null) return new No(valor);
    
    if (valor < no.valor) {
        no.esquerda = inserirAVL(no.esquerda, valor);
    } else {
        no.direita = inserirAVL(no.direita, valor);
    }
    
    // 2. Atualizar altura
    no.altura = Math.max(altura(no.esquerda), altura(no.direita)) + 1;
    
    // 3. Calcular FB
    const fb = fatorBalanceamento(no);
    
    // 4. Casos de desbalanceamento
    
    // Caso LL (Left-Left)
    if (fb > 1 && valor < no.esquerda.valor) {
        return rotacaoDireita(no);
    }
    
    // Caso RR (Right-Right)
    if (fb < -1 && valor > no.direita.valor) {
        return rotacaoEsquerda(no);
    }
    
    // Caso LR (Left-Right)
    if (fb > 1 && valor > no.esquerda.valor) {
        no.esquerda = rotacaoEsquerda(no.esquerda);
        return rotacaoDireita(no);
    }
    
    // Caso RL (Right-Left)
    if (fb < -1 && valor < no.direita.valor) {
        no.direita = rotacaoDireita(no.direita);
        return rotacaoEsquerda(no);
    }
    
    return no; // Balanceada
}
                            </code></pre>
                        </div>
                    </div>
                </div>

                <!-- Algoritmo DSW -->
                <div class="module-section">
                    <h3>🔧 Algoritmo DSW (Day-Stout-Warren)</h3>
                    
                    <div class="concept-card">
                        <h4>O que é o Algoritmo DSW?</h4>
                        <p>
                            Algoritmo para <strong>balancear uma BST existente</strong> em O(n) tempo e O(1) espaço extra.
                            Diferente da AVL que mantém o balanceamento durante inserções, o DSW balanceia uma árvore já construída.
                        </p>
                    </div>

                    <div class="dsw-phases">
                        <h4>📋 Fases do Algoritmo DSW</h4>
                        
                        <div class="phase-card">
                            <h5>Fase 1: Criar a "Videira" (Backbone/Vine)</h5>
                            <p>Transformar a árvore em uma lista encadeada (apenas filhos direitos) usando rotações à direita.</p>
                            <div class="dsw-visual">
                                <div class="dsw-before">
                                    <pre>
        5
       / \\
      3   8
     / \\   \\
    1  4   9
                                    </pre>
                                    <p class="caption">Árvore original</p>
                                </div>
                                <div class="arrow">→</div>
                                <div class="dsw-after">
                                    <pre>
    1
     \\
      3
       \\
        4
         \\
          5
           \\
            8
             \\
              9
                                    </pre>
                                    <p class="caption">Videira (backbone)</p>
                                </div>
                            </div>
                            <div class="code-block-mini">
                                <pre><code>
criarVideira(raiz) {
    let cauda = raiz;
    let resto = cauda.direita;
    
    while (resto !== null) {
        if (resto.esquerda === null) {
            // Avançar
            cauda = resto;
            resto = resto.direita;
        } else {
            // Rotação à direita
            const temp = resto.esquerda;
            resto.esquerda = temp.direita;
            temp.direita = resto;
            resto = temp;
            cauda.direita = temp;
        }
    }
}
                                </code></pre>
                            </div>
                        </div>

                        <div class="phase-card">
                            <h5>Fase 2: Criar Árvore Balanceada</h5>
                            <p>Aplicar rotações à esquerda para transformar a videira em uma árvore completa balanceada.</p>
                            <div class="dsw-visual">
                                <div class="dsw-before">
                                    <pre>
    1
     \\
      3
       \\
        4
         \\
          5
           \\
            8
             \\
              9
                                    </pre>
                                    <p class="caption">Videira</p>
                                </div>
                                <div class="arrow">→</div>
                                <div class="dsw-after">
                                    <pre>
        5
       / \\
      3   8
     / \\   \\
    1  4   9
                                    </pre>
                                    <p class="caption">Árvore balanceada</p>
                                </div>
                            </div>
                            <div class="code-block-mini">
                                <pre><code>
balancearVideira(raiz, n) {
    // n = número de nós
    const m = Math.pow(2, Math.floor(Math.log2(n + 1))) - 1;
    
    // Primeira compressão: remover nós extras
    fazerCompressao(raiz, n - m);
    
    // Compressões subsequentes
    while (m > 1) {
        m = Math.floor(m / 2);
        fazerCompressao(raiz, m);
    }
}

fazerCompressao(raiz, count) {
    let scanner = raiz;
    for (let i = 0; i < count; i++) {
        // Rotação à esquerda
        const filho = scanner.direita;
        scanner.direita = filho.direita;
        scanner = scanner.direita;
        filho.direita = scanner.esquerda;
        scanner.esquerda = filho;
    }
}
                                </code></pre>
                            </div>
                        </div>
                    </div>

                    <div class="dsw-complexity">
                        <h4>⚡ Complexidade do DSW</h4>
                        <table>
                            <thead>
                                <tr>
                                    <th>Aspecto</th>
                                    <th>Complexidade</th>
                                    <th>Observação</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Tempo</td>
                                    <td class="complexity-good">O(n)</td>
                                    <td>Linear - visita cada nó apenas algumas vezes</td>
                                </tr>
                                <tr>
                                    <td>Espaço</td>
                                    <td class="complexity-excellent">O(1)</td>
                                    <td>Constante - não usa recursão, apenas ponteiros</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Comparação AVL vs DSW -->
                <div class="module-section">
                    <h3>⚔️ AVL vs DSW</h3>
                    
                    <div class="comparison-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Característica</th>
                                    <th>AVL</th>
                                    <th>DSW</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>Tipo</strong></td>
                                    <td>Balanceamento incremental</td>
                                    <td>Balanceamento em lote</td>
                                </tr>
                                <tr>
                                    <td><strong>Quando usar</strong></td>
                                    <td>Inserções/remoções frequentes</td>
                                    <td>Balancear árvore existente</td>
                                </tr>
                                <tr>
                                    <td><strong>Inserção</strong></td>
                                    <td>O(log n) com rotações</td>
                                    <td>BST normal O(h)</td>
                                </tr>
                                <tr>
                                    <td><strong>Balanceamento</strong></td>
                                    <td>Automático após cada operação</td>
                                    <td>Manual, quando necessário</td>
                                </tr>
                                <tr>
                                    <td><strong>Espaço Extra</strong></td>
                                    <td>O(1) por nó (altura)</td>
                                    <td>O(1) total</td>
                                </tr>
                                <tr>
                                    <td><strong>Implementação</strong></td>
                                    <td>Mais complexa</td>
                                    <td>Mais simples</td>
                                </tr>
                                <tr>
                                    <td><strong>Garantia</strong></td>
                                    <td>Sempre balanceada</td>
                                    <td>Balanceada após executar</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="use-cases">
                        <div class="use-case-card">
                            <h4>✅ Use AVL quando:</h4>
                            <ul>
                                <li>Operações de busca frequentes</li>
                                <li>Inserções/remoções constantes</li>
                                <li>Precisa garantir O(log n) sempre</li>
                                <li>Não se importa com complexidade de implementação</li>
                            </ul>
                        </div>
                        <div class="use-case-card">
                            <h4>✅ Use DSW quando:</h4>
                            <ul>
                                <li>Tem uma BST desbalanceada existente</li>
                                <li>Faz batch de inserções e depois balanceia</li>
                                <li>Quer implementação simples</li>
                                <li>Espaço extra é crítico</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Exemplo Prático de Rotações -->
                <div class="module-section">
                    <h3>🔄 Exemplo Prático: Rotações AVL</h3>
                    
                    <div class="concept-card highlight">
                        <h4>Cenário: Inserindo valores em ordem crescente</h4>
                        <p>Vamos inserir a sequência: <strong>[10, 20, 30]</strong> e ver como a AVL se auto-balanceia</p>
                    </div>
                    
                    <div class="rotation-example-grid">
                        <div class="rotation-example-card">
                            <h5>Passo 1: Inserir 10</h5>
                            <pre>
    10 (FB=0)
                            </pre>
                            <p>✅ Árvore balanceada</p>
                        </div>
                        
                        <div class="rotation-example-card">
                            <h5>Passo 2: Inserir 20</h5>
                            <pre>
    10 (FB=-1)
      \\
       20 (FB=0)
                            </pre>
                            <p>✅ Árvore balanceada (FB = -1 é aceitável)</p>
                        </div>
                        
                        <div class="rotation-example-card danger">
                            <h5>Passo 3: Inserir 30 (PROBLEMA!)</h5>
                            <pre>
    10 (FB=-2) ⚠️
      \\
       20 (FB=-1)
         \\
          30 (FB=0)
                            </pre>
                            <p>❌ <strong>Desbalanceada!</strong> FB = -2 no nó 10</p>
                            <p><strong>Identificação:</strong> Caso RR (Right-Right)</p>
                        </div>
                        
                        <div class="rotation-example-card success">
                            <h5>Passo 4: Aplicar Rotação Esquerda</h5>
                            <pre>
      20 (FB=0)
     /  \\
   10    30
  (FB=0) (FB=0)
                            </pre>
                            <p>✅ <strong>Balanceada!</strong> Todos os FB ∈ {-1, 0, 1}</p>
                            <p>🔄 Uma rotação à esquerda em 10 resolveu o problema</p>
                        </div>
                    </div>
                    
                    <div class="comparison-scenarios">
                        <h4>📊 Comparação: BST Normal vs AVL</h4>
                        <div class="scenarios-grid">
                            <div class="scenario-card">
                                <h5>BST Normal (sem balanceamento)</h5>
                                <p class="scenario-label">Inserindo: [10, 20, 30, 40, 50]</p>
                                <pre>
    10
      \\
       20
         \\
          30
            \\
             40
               \\
                50
                                </pre>
                                <div class="stats">
                                    <p><strong>Altura:</strong> 4</p>
                                    <p><strong>Busca 50:</strong> 5 comparações</p>
                                    <p class="complexity-bad">Complexidade: O(n) ❌</p>
                                </div>
                            </div>
                            
                            <div class="scenario-card">
                                <h5>Árvore AVL (auto-balanceada)</h5>
                                <p class="scenario-label">Inserindo: [10, 20, 30, 40, 50]</p>
                                <pre>
        30
       /  \\
      20   40
     /       \\
    10       50
                                </pre>
                                <div class="stats">
                                    <p><strong>Altura:</strong> 2</p>
                                    <p><strong>Busca 50:</strong> 2 comparações</p>
                                    <p class="complexity-good">Complexidade: O(log n) ✅</p>
                                    <p><strong>Rotações aplicadas:</strong> 2</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Visualizador Interativo -->
                <div class="module-section">
                    <h3>🎨 Visualizador de Árvores Balanceadas</h3>
                    <div class="balanced-tree-visualizer">
                        <div class="tree-type-selector">
                            <button class="btn btn-primary active" data-tree-type="avl">Árvore AVL</button>
                            <button class="btn btn-primary" data-tree-type="dsw">Algoritmo DSW</button>
                        </div>
                        
                        <div class="tree-controls">
                            <input type="number" id="balancedValue" placeholder="Valor" min="1" max="100">
                            <button class="btn btn-success" id="balancedInsert">Inserir</button>
                            <button class="btn btn-warning" id="balancedBalance">Balancear (DSW)</button>
                            <button class="btn btn-danger" id="balancedDelete">Remover</button>
                            <button class="btn btn-secondary" id="balancedClear">Limpar</button>
                        </div>
                        
                        <div id="avlExamples"></div>
                            <button class="btn btn-secondary" id="balancedClear">Limpar</button>
                        </div>
                        
                        <div class="balanced-canvas" id="balancedCanvas">
                            <p class="placeholder">Insira valores para construir a árvore</p>
                        </div>
                        
                        <div class="tree-info-grid">
                            <div class="info-card">
                                <span class="label">Altura:</span>
                                <span class="value" id="balancedHeight">0</span>
                            </div>
                            <div class="info-card">
                                <span class="label">Nós:</span>
                                <span class="value" id="balancedNodes">0</span>
                            </div>
                            <div class="info-card">
                                <span class="label">Balanceada:</span>
                                <span class="value" id="balancedStatus">✅</span>
                            </div>
                            <div class="info-card">
                                <span class="label">Rotações:</span>
                                <span class="value" id="balancedRotations">0</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Exercícios -->
                <div class="module-section">
                    <h3>✏️ Exercícios Práticos</h3>
                    
                    <div class="exercise-list">
                        <div class="exercise-item">
                            <h4>1. Identificar tipo de rotação</h4>
                            <p>Dada uma árvore desbalanceada, identifique qual rotação aplicar (LL, RR, LR ou RL).</p>
                            <button class="btn btn-outline">Praticar</button>
                        </div>
                        <div class="exercise-item">
                            <h4>2. Implementar remoção em AVL</h4>
                            <p>Complete a implementação de remoção com rebalanceamento automático.</p>
                            <button class="btn btn-outline">Ver Solução</button>
                        </div>
                        <div class="exercise-item">
                            <h4>3. Calcular altura mínima</h4>
                            <p>Dada uma AVL com n nós, calcule a altura mínima possível.</p>
                            <button class="btn btn-outline">Ver Solução</button>
                        </div>
                    </div>
                </div>

                <!-- Navegação -->
                <div class="module-navigation-buttons">
                    <button class="btn btn-outline" data-next-module="trees">← Árvores Binárias</button>
                    <button class="btn btn-primary" data-next-module="graphs">Grafos →</button>
                </div>
            </div>
        `;
    }
};

// Export module
if (typeof window !== 'undefined') {
    window.BalancedTreesModule = BalancedTreesModule;
    console.log('✅ BalancedTreesModule carregado');
}

// ===== VISUAL EXAMPLES INTEGRATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Aguarda o módulo ser renderizado
    setTimeout(() => {
        const canvas = document.getElementById('tree-visual-canvas');
        const selector = document.getElementById('example-selector');
        
        if (!canvas || !selector) return;

        // Inicializa TreeVisualExamples
        const visualExamples = new TreeVisualExamples();
        if (!visualExamples.initializeCanvas('tree-visual-canvas')) {
            console.error('Falha ao inicializar canvas de exemplos visuais');
            return;
        }

        let currentStep = 0;
        let currentExample = null;
        let maxSteps = 0;

        // Atualiza indicador de passo
        const updateStepIndicator = () => {
            const indicator = document.getElementById('stepIndicator');
            if (indicator && maxSteps > 1) {
                indicator.textContent = `Passo ${currentStep + 1} de ${maxSteps}`;
            }
        };

        // Renderiza exemplo atual
        const renderCurrentExample = () => {
            if (!currentExample) return;

            visualExamples.renderExample(currentExample, { step: currentStep });
            updateStepIndicator();

            // Atualiza estado dos botões
            const prevBtn = document.getElementById('prevStepBtn');
            const nextBtn = document.getElementById('nextStepBtn');
            if (prevBtn) prevBtn.disabled = currentStep === 0;
            if (nextBtn) nextBtn.disabled = currentStep >= maxSteps - 1;
        };

        // Determina número de passos baseado no tipo de exemplo
        const getMaxSteps = (exampleId) => {
            if (exampleId === 'balance-calculation') return 5;
            if (exampleId.includes('rotation')) return 3; // LL, RR têm 3 passos
            if (exampleId === 'avl-rotation-lr' || exampleId === 'avl-rotation-rl') return 4; // Duplas têm 4 passos
            return 1;
        };

        // Atualiza descrição do exemplo
        const updateDescription = (example) => {
            const descDiv = document.getElementById('exampleDescription');
            if (!descDiv || !example) return;

            const examples = visualExamples.getExamples();
            const exampleData = examples.find(ex => ex.id === example);
            
            if (exampleData) {
                descDiv.innerHTML = `
                    <h4>${exampleData.title}</h4>
                    <p>${exampleData.description}</p>
                `;
            }
        };

        // Event listener para seletor de exemplo
        selector.addEventListener('change', (e) => {
            const selectedExample = e.target.value;
            if (!selectedExample) {
                // Limpa canvas
                const ctx = visualExamples.ctx;
                ctx.fillStyle = '#f9fafb';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                document.getElementById('animationControls').style.display = 'none';
                document.getElementById('exampleDescription').innerHTML = '<p>👆 Selecione um exemplo acima para visualizar árvores binárias e AVL com cálculos detalhados!</p>';
                return;
            }

            currentExample = selectedExample;
            currentStep = 0;
            maxSteps = getMaxSteps(selectedExample);

            // Mostra controles de animação se houver múltiplos passos
            const controls = document.getElementById('animationControls');
            if (controls) {
                controls.style.display = maxSteps > 1 ? 'flex' : 'none';
            }

            updateDescription(selectedExample);
            renderCurrentExample();
        });

        // Event listener para botão anterior
        const prevBtn = document.getElementById('prevStepBtn');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentStep > 0) {
                    currentStep--;
                    renderCurrentExample();
                }
            });
        }

        // Event listener para botão próximo
        const nextBtn = document.getElementById('nextStepBtn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentStep < maxSteps - 1) {
                    currentStep++;
                    renderCurrentExample();
                }
            });
        }

        // Event listener para teclas de seta
        document.addEventListener('keydown', (e) => {
            if (!currentExample || maxSteps <= 1) return;

            if (e.key === 'ArrowLeft' && currentStep > 0) {
                currentStep--;
                renderCurrentExample();
            } else if (e.key === 'ArrowRight' && currentStep < maxSteps - 1) {
                currentStep++;
                renderCurrentExample();
            }
        });

        console.log('✅ Exemplos Visuais de Árvores inicializados');

        // Inicializa Calculadora de Fator de Balanceamento
        const bfSection = document.getElementById('bf-calculator-section');
        if (bfSection && typeof BalanceFactorCalculator !== 'undefined') {
            const calculator = new BalanceFactorCalculator();
            bfSection.innerHTML = calculator.createInterface();
            calculator.initialize();
            console.log('✅ Calculadora de Fator de Balanceamento inicializada');
        }
    }, 500);
});
