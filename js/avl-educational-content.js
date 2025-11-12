// ===== CONTEÚDO EDUCACIONAL AVANÇADO PARA AVL =====

const AVLEducationalContent = {
    
    // Introdução Didática
    introduction: `
        <div class="avl-intro-section">
            <h2>🌲 Guia Completo de Árvores AVL</h2>
            <div class="intro-highlight">
                <h3>📚 O que você vai aprender:</h3>
                <ul class="learning-objectives">
                    <li>✅ Por que árvores AVL são necessárias</li>
                    <li>✅ Como calcular o fator de balanceamento</li>
                    <li>✅ Os 4 tipos de rotações passo a passo</li>
                    <li>✅ Inserção com balanceamento automático</li>
                    <li>✅ Remoção mantendo o balanceamento</li>
                    <li>✅ Análise de complexidade completa</li>
                </ul>
            </div>
        </div>
    `,

    // Parte 1: O Problema
    theProblem: `
        <div class="educational-section">
            <h3>🤔 Parte 1: O Problema das Árvores Binárias Normais</h3>
            
            <div class="problem-explanation">
                <h4>Imagine a seguinte situação:</h4>
                <p>Você tem uma Árvore Binária de Busca (BST) e insere os números <strong>1, 2, 3, 4, 5</strong> nesta ordem.</p>
                
                <div class="visual-comparison">
                    <div class="bad-tree">
                        <h5>❌ O que acontece (BST Normal):</h5>
                        <pre class="tree-diagram">
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
                        <div class="problem-metrics">
                            <p><span class="metric-label">Altura:</span> <span class="bad-value">5</span></p>
                            <p><span class="metric-label">Buscar 5:</span> <span class="bad-value">5 comparações</span></p>
                            <p><span class="metric-label">Complexidade:</span> <span class="bad-value">O(n) - PÉSSIMO!</span></p>
                        </div>
                        <div class="alert alert-danger">
                            <strong>Problema:</strong> Virou uma lista encadeada! Perdemos todas as vantagens da árvore.
                        </div>
                    </div>
                    
                    <div class="good-tree">
                        <h5>✅ O que deveria ser (AVL):</h5>
                        <pre class="tree-diagram">
        2
       / \\
      1   4
         / \\
        3   5
                        </pre>
                        <div class="good-metrics">
                            <p><span class="metric-label">Altura:</span> <span class="good-value">3</span></p>
                            <p><span class="metric-label">Buscar 5:</span> <span class="good-value">2 comparações</span></p>
                            <p><span class="metric-label">Complexidade:</span> <span class="good-value">O(log n) - ÓTIMO!</span></p>
                        </div>
                        <div class="alert alert-success">
                            <strong>Solução:</strong> Árvore balanceada automaticamente! Sempre eficiente.
                        </div>
                    </div>
                </div>
                
                <div class="real-world-impact">
                    <h4>💡 Impacto no Mundo Real:</h4>
                    <table class="impact-table">
                        <thead>
                            <tr>
                                <th>Elementos</th>
                                <th>BST Degenerada</th>
                                <th>AVL Balanceada</th>
                                <th>Ganho</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>100</td>
                                <td class="bad">100 ops</td>
                                <td class="good">7 ops</td>
                                <td class="gain">14x mais rápido</td>
                            </tr>
                            <tr>
                                <td>1.000</td>
                                <td class="bad">1.000 ops</td>
                                <td class="good">10 ops</td>
                                <td class="gain">100x mais rápido</td>
                            </tr>
                            <tr>
                                <td>1.000.000</td>
                                <td class="bad">1.000.000 ops</td>
                                <td class="good">20 ops</td>
                                <td class="gain">50.000x mais rápido!</td>
                            </tr>
                        </tbody>
                    </table>
                    <p class="conclusion">
                        <strong>Conclusão:</strong> Em bancos de dados e sistemas reais, AVL pode ser a diferença entre 
                        segundos e milissegundos!
                    </p>
                </div>
            </div>
        </div>
    `,

    // Parte 2: Fator de Balanceamento
    balanceFactor: `
        <div class="educational-section">
            <h3>⚖️ Parte 2: Entendendo o Fator de Balanceamento</h3>
            
            <div class="concept-intro">
                <p>O <strong>Fator de Balanceamento (FB)</strong> é o "coração" da árvore AVL. Ele nos diz se a árvore está balanceada ou não.</p>
            </div>
            
            <div class="formula-section">
                <h4>📐 A Fórmula:</h4>
                <div class="formula-box-large">
                    <p class="formula">FB(nó) = Altura(subárvore esquerda) - Altura(subárvore direita)</p>
                </div>
                
                <div class="formula-rules">
                    <h5>Regras:</h5>
                    <ul>
                        <li><span class="rule balanced">FB = 0</span> → Perfeitamente balanceada</li>
                        <li><span class="rule balanced">FB = +1</span> → Esquerda um nível maior (OK)</li>
                        <li><span class="rule balanced">FB = -1</span> → Direita um nível maior (OK)</li>
                        <li><span class="rule unbalanced">FB = +2 ou mais</span> → DESBALANCEADA! (rotação necessária)</li>
                        <li><span class="rule unbalanced">FB = -2 ou menos</span> → DESBALANCEADA! (rotação necessária)</li>
                    </ul>
                </div>
            </div>
            
            <div class="interactive-examples">
                <h4>🎯 Exemplos Interativos:</h4>
                
                <div class="example-row">
                    <div class="example-card balanced-example">
                        <h5>Exemplo 1: FB = 0</h5>
                        <pre class="tree-with-fb">
        10 [FB=0]
       /          \\
     5 [FB=0]    15 [FB=0]
                        </pre>
                        <div class="calculation">
                            <p><strong>Cálculo para nó 10:</strong></p>
                            <p>Altura esquerda = 1 (nó 5)</p>
                            <p>Altura direita = 1 (nó 15)</p>
                            <p>FB = 1 - 1 = <span class="result-ok">0 ✅</span></p>
                        </div>
                    </div>
                    
                    <div class="example-card balanced-example">
                        <h5>Exemplo 2: FB = +1</h5>
                        <pre class="tree-with-fb">
        10 [FB=+1]
       /          \\
     5 [FB=0]    15 [FB=0]
    /
   3 [FB=0]
                        </pre>
                        <div class="calculation">
                            <p><strong>Cálculo para nó 10:</strong></p>
                            <p>Altura esquerda = 2 (até nó 3)</p>
                            <p>Altura direita = 1 (nó 15)</p>
                            <p>FB = 2 - 1 = <span class="result-ok">+1 ✅</span></p>
                        </div>
                    </div>
                    
                    <div class="example-card unbalanced-example">
                        <h5>Exemplo 3: FB = +2 ❌</h5>
                        <pre class="tree-with-fb">
        10 [FB=+2] ⚠️
       /          \\
     5 [FB=+1]   15 [FB=0]
    /
   3 [FB=0]
  /
 1 [FB=0]
                        </pre>
                        <div class="calculation">
                            <p><strong>Cálculo para nó 10:</strong></p>
                            <p>Altura esquerda = 3 (até nó 1)</p>
                            <p>Altura direita = 1 (nó 15)</p>
                            <p>FB = 3 - 1 = <span class="result-bad">+2 ❌ ROTAÇÃO NECESSÁRIA!</span></p>
                        </div>
                    </div>
                </div>
                
                <div class="practice-tip">
                    <h5>💡 Dica Prática:</h5>
                    <p>Para calcular a altura de uma subárvore, conte o número de "níveis" até a folha mais profunda.</p>
                    <ul>
                        <li>Nó folha (sem filhos) = altura 0</li>
                        <li>Nó com 1 filho = altura 1 + altura do filho</li>
                        <li>Nó com 2 filhos = 1 + MAX(altura esquerda, altura direita)</li>
                    </ul>
                </div>
            </div>
        </div>
    `,

    // Parte 3: As 4 Rotações
    rotations: `
        <div class="educational-section">
            <h3>🔄 Parte 3: As 4 Rotações (Passo a Passo Detalhado)</h3>
            
            <div class="rotations-intro">
                <p>Quando detectamos desbalanceamento (FB = ±2), precisamos fazer <strong>rotações</strong> para restaurar o balanceamento.</p>
                <p>Existem <strong>4 casos</strong> diferentes, cada um com sua rotação específica:</p>
            </div>
            
            <!-- ROTAÇÃO 1: LL (Simples à Direita) -->
            <div class="rotation-detailed">
                <div class="rotation-header ll-case">
                    <h4>1️⃣ Rotação LL - Simples à Direita</h4>
                    <p class="case-description">
                        <strong>Quando usar:</strong> Desbalanceamento à <strong>Esquerda-Esquerda</strong><br>
                        FB(nó) = +2 e FB(filho esquerdo) = +1
                    </p>
                </div>
                
                <div class="step-by-step">
                    <div class="step">
                        <h5>📍 Passo 1: Identificar o problema</h5>
                        <pre class="tree-diagram">
            z [FB=+2] ← DESBALANCEADO!
           /         \\
      y [FB=+1]       T4
     /        \\
  x [FB=0]     T3
 /        \\
T1        T2
                        </pre>
                        <p>O nó <strong>z</strong> está desbalanceado porque sua subárvore esquerda é muito mais alta.</p>
                    </div>
                    
                    <div class="step">
                        <h5>📍 Passo 2: Identificar os atores</h5>
                        <ul>
                            <li><strong>z</strong> = nó desbalanceado (raiz da rotação)</li>
                            <li><strong>y</strong> = filho esquerdo de z (nova raiz)</li>
                            <li><strong>T3</strong> = subárvore direita de y (vai "mudar de pai")</li>
                        </ul>
                    </div>
                    
                    <div class="step">
                        <h5>📍 Passo 3: Executar a rotação</h5>
                        <div class="code-explanation">
                            <pre><code>1. Guardar T3 = y.direita
2. y.direita = z        ← y "sobe" e z "desce"
3. z.esquerda = T3      ← T3 vai para z
4. Atualizar alturas
5. Retornar y           ← y é a nova raiz</code></pre>
                        </div>
                    </div>
                    
                    <div class="step">
                        <h5>📍 Passo 4: Resultado</h5>
                        <pre class="tree-diagram">
          y [FB=0] ← BALANCEADO! ✅
         /        \\
    x [FB=0]      z [FB=0]
   /      \\      /      \\
  T1      T2    T3      T4
                        </pre>
                        <p class="success-message">✨ Árvore balanceada! Todas as propriedades BST mantidas!</p>
                    </div>
                </div>
                
                <div class="animation-note">
                    <p>💡 <strong>Imagine:</strong> É como se o nó y "escalasse" e virasse a nova raiz, enquanto z "desce" para direita.</p>
                </div>
            </div>
            
            <!-- ROTAÇÃO 2: RR (Simples à Esquerda) -->
            <div class="rotation-detailed">
                <div class="rotation-header rr-case">
                    <h4>2️⃣ Rotação RR - Simples à Esquerda</h4>
                    <p class="case-description">
                        <strong>Quando usar:</strong> Desbalanceamento à <strong>Direita-Direita</strong><br>
                        FB(nó) = -2 e FB(filho direito) = -1
                    </p>
                </div>
                
                <div class="step-by-step">
                    <div class="step">
                        <h5>📍 Passo 1: Identificar o problema</h5>
                        <pre class="tree-diagram">
      z [FB=-2] ← DESBALANCEADO!
     /         \\
    T1      y [FB=-1]
           /        \\
          T2     x [FB=0]
                /        \\
               T3        T4
                        </pre>
                        <p>O nó <strong>z</strong> está desbalanceado porque sua subárvore direita é muito mais alta.</p>
                    </div>
                    
                    <div class="step">
                        <h5>📍 Passo 2: Identificar os atores</h5>
                        <ul>
                            <li><strong>z</strong> = nó desbalanceado (raiz da rotação)</li>
                            <li><strong>y</strong> = filho direito de z (nova raiz)</li>
                            <li><strong>T2</strong> = subárvore esquerda de y (vai "mudar de pai")</li>
                        </ul>
                    </div>
                    
                    <div class="step">
                        <h5>📍 Passo 3: Executar a rotação</h5>
                        <div class="code-explanation">
                            <pre><code>1. Guardar T2 = y.esquerda
2. y.esquerda = z       ← y "sobe" e z "desce"
3. z.direita = T2       ← T2 vai para z
4. Atualizar alturas
5. Retornar y           ← y é a nova raiz</code></pre>
                        </div>
                    </div>
                    
                    <div class="step">
                        <h5>📍 Passo 4: Resultado</h5>
                        <pre class="tree-diagram">
          y [FB=0] ← BALANCEADO! ✅
         /        \\
    z [FB=0]      x [FB=0]
   /      \\      /      \\
  T1      T2    T3      T4
                        </pre>
                        <p class="success-message">✨ Árvore balanceada!</p>
                    </div>
                </div>
            </div>
            
            <!-- ROTAÇÃO 3: LR (Dupla Esquerda-Direita) -->
            <div class="rotation-detailed">
                <div class="rotation-header lr-case">
                    <h4>3️⃣ Rotação LR - Dupla Esquerda-Direita</h4>
                    <p class="case-description">
                        <strong>Quando usar:</strong> Desbalanceamento em <strong>Zigue-Zague (Esquerda-Direita)</strong><br>
                        FB(nó) = +2 e FB(filho esquerdo) = -1
                    </p>
                </div>
                
                <div class="step-by-step">
                    <div class="step">
                        <h5>📍 Passo 1: Identificar o problema</h5>
                        <pre class="tree-diagram">
        z [FB=+2] ← DESBALANCEADO!
       /         \\
  y [FB=-1]       T4
 /        \\
T1     x [FB=0]
      /        \\
     T2        T3
                        </pre>
                        <p>Problema em "zigue-zague": esquerda de z, mas direita de y.</p>
                    </div>
                    
                    <div class="step">
                        <h5>📍 Passo 2: Primeira rotação (Esquerda em y)</h5>
                        <pre class="tree-diagram">
        z [FB=+2]
       /         \\
  x [FB=+1]       T4  ← Transformou em caso LL!
 /        \\
y         T3
/  \\
T1  T2
                        </pre>
                        <p>Fazemos rotação à esquerda em <strong>y</strong> para transformar em caso LL.</p>
                    </div>
                    
                    <div class="step">
                        <h5>📍 Passo 3: Segunda rotação (Direita em z)</h5>
                        <pre class="tree-diagram">
          x [FB=0] ← BALANCEADO! ✅
         /        \\
    y [FB=0]      z [FB=0]
   /      \\      /      \\
  T1      T2    T3      T4
                        </pre>
                        <p>Fazemos rotação à direita em <strong>z</strong>. Pronto!</p>
                    </div>
                </div>
                
                <div class="key-insight">
                    <p><strong>💡 Sacada Principal:</strong> A rotação LR é na verdade <strong>2 rotações simples</strong>:</p>
                    <ol>
                        <li>Rotação Esquerda no filho esquerdo (transforma em LL)</li>
                        <li>Rotação Direita na raiz (resolve o LL)</li>
                    </ol>
                </div>
            </div>
            
            <!-- ROTAÇÃO 4: RL (Dupla Direita-Esquerda) -->
            <div class="rotation-detailed">
                <div class="rotation-header rl-case">
                    <h4>4️⃣ Rotação RL - Dupla Direita-Esquerda</h4>
                    <p class="case-description">
                        <strong>Quando usar:</strong> Desbalanceamento em <strong>Zigue-Zague (Direita-Esquerda)</strong><br>
                        FB(nó) = -2 e FB(filho direito) = +1
                    </p>
                </div>
                
                <div class="step-by-step">
                    <div class="step">
                        <h5>📍 Passo 1: Identificar o problema</h5>
                        <pre class="tree-diagram">
      z [FB=-2] ← DESBALANCEADO!
     /         \\
    T1      y [FB=+1]
           /        \\
      x [FB=0]      T4
     /        \\
    T2        T3
                        </pre>
                        <p>Problema em "zigue-zague": direita de z, mas esquerda de y.</p>
                    </div>
                    
                    <div class="step">
                        <h5>📍 Passo 2: Primeira rotação (Direita em y)</h5>
                        <pre class="tree-diagram">
      z [FB=-2]
     /         \\
    T1      x [FB=-1]  ← Transformou em caso RR!
           /        \\
          T2        y
                   / \\
                  T3 T4
                        </pre>
                        <p>Fazemos rotação à direita em <strong>y</strong> para transformar em caso RR.</p>
                    </div>
                    
                    <div class="step">
                        <h5>📍 Passo 3: Segunda rotação (Esquerda em z)</h5>
                        <pre class="tree-diagram">
          x [FB=0] ← BALANCEADO! ✅
         /        \\
    z [FB=0]      y [FB=0]
   /      \\      /      \\
  T1      T2    T3      T4
                        </pre>
                        <p>Fazemos rotação à esquerda em <strong>z</strong>. Pronto!</p>
                    </div>
                </div>
            </div>
            
            <div class="rotation-summary">
                <h4>📊 Resumo das Rotações:</h4>
                <table class="summary-table">
                    <thead>
                        <tr>
                            <th>Caso</th>
                            <th>FB(nó)</th>
                            <th>FB(filho)</th>
                            <th>Rotação</th>
                            <th>Passos</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="ll-case">LL</td>
                            <td>+2</td>
                            <td>+1 ou 0</td>
                            <td>Simples Direita</td>
                            <td>1 rotação</td>
                        </tr>
                        <tr>
                            <td class="rr-case">RR</td>
                            <td>-2</td>
                            <td>-1 ou 0</td>
                            <td>Simples Esquerda</td>
                            <td>1 rotação</td>
                        </tr>
                        <tr>
                            <td class="lr-case">LR</td>
                            <td>+2</td>
                            <td>-1</td>
                            <td>Dupla (Esq + Dir)</td>
                            <td>2 rotações</td>
                        </tr>
                        <tr>
                            <td class="rl-case">RL</td>
                            <td>-2</td>
                            <td>+1</td>
                            <td>Dupla (Dir + Esq)</td>
                            <td>2 rotações</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `,

    // Parte 4: Inserção Completa
    insertion: `
        <div class="educational-section">
            <h3>➕ Parte 4: Inserção em AVL (Algoritmo Completo)</h3>
            
            <div class="algorithm-overview">
                <p>A inserção em AVL é similar à BST normal, mas com balanceamento automático após cada inserção.</p>
            </div>
            
            <div class="algorithm-steps">
                <h4>🔢 Algoritmo Passo a Passo:</h4>
                
                <div class="algo-step">
                    <h5>Passo 1: Inserir como em BST normal</h5>
                    <pre><code>function inserir(raiz, valor):
    // Caso base: encontrou o local
    se raiz == null:
        retornar novo Nó(valor)
    
    // Navegar recursivamente
    se valor < raiz.valor:
        raiz.esquerda = inserir(raiz.esquerda, valor)
    senão se valor > raiz.valor:
        raiz.direita = inserir(raiz.direita, valor)
    senão:
        retornar raiz  // valor duplicado
    
    // ⬇️ Aqui começam as diferenças da AVL...</code></pre>
                </div>
                
                <div class="algo-step">
                    <h5>Passo 2: Atualizar altura do nó</h5>
                    <pre><code>    // Atualizar altura deste nó ancestral
    raiz.altura = 1 + max(altura(raiz.esquerda), 
                          altura(raiz.direita))</code></pre>
                </div>
                
                <div class="algo-step">
                    <h5>Passo 3: Calcular fator de balanceamento</h5>
                    <pre><code>    // Obter fator de balanceamento
    fb = altura(raiz.esquerda) - altura(raiz.direita)</code></pre>
                </div>
                
                <div class="algo-step">
                    <h5>Passo 4: Verificar e corrigir desbalanceamentos</h5>
                    <pre><code>    // Caso LL (Esquerda-Esquerda)
    se fb > 1 E valor < raiz.esquerda.valor:
        retornar rotacaoDireita(raiz)
    
    // Caso RR (Direita-Direita)
    se fb < -1 E valor > raiz.direita.valor:
        retornar rotacaoEsquerda(raiz)
    
    // Caso LR (Esquerda-Direita)
    se fb > 1 E valor > raiz.esquerda.valor:
        raiz.esquerda = rotacaoEsquerda(raiz.esquerda)
        retornar rotacaoDireita(raiz)
    
    // Caso RL (Direita-Esquerda)
    se fb < -1 E valor < raiz.direita.valor:
        raiz.direita = rotacaoDireita(raiz.direita)
        retornar rotacaoEsquerda(raiz)
    
    // Nó está balanceado
    retornar raiz</code></pre>
                </div>
            </div>
            
            <div class="insertion-example">
                <h4>📝 Exemplo Completo: Inserir 10, 20, 30</h4>
                
                <div class="insertion-steps">
                    <div class="insert-step">
                        <h5>1. Inserir 10</h5>
                        <pre class="tree-diagram">
    10 [FB=0]
                        </pre>
                        <p>✅ Balanceado</p>
                    </div>
                    
                    <div class="insert-step">
                        <h5>2. Inserir 20</h5>
                        <pre class="tree-diagram">
    10 [FB=-1]
      \\
      20 [FB=0]
                        </pre>
                        <p>✅ FB = -1, ainda balanceado</p>
                    </div>
                    
                    <div class="insert-step">
                        <h5>3. Inserir 30</h5>
                        <pre class="tree-diagram">
Antes da rotação:
    10 [FB=-2] ❌
      \\
      20 [FB=-1]
        \\
        30 [FB=0]
        
Detectado: Caso RR!
Aplicar: Rotação Esquerda em 10

Depois da rotação:
      20 [FB=0] ✅
     /        \\
   10 [FB=0]  30 [FB=0]
                        </pre>
                        <p>✅ Árvore rebalanceada automaticamente!</p>
                    </div>
                </div>
            </div>
        </div>
    `,

    // Parte 5: Complexidade
    complexity: `
        <div class="educational-section">
            <h3>📊 Parte 5: Análise de Complexidade</h3>
            
            <div class="complexity-table-container">
                <h4>Comparação AVL vs BST Normal:</h4>
                <table class="complexity-table">
                    <thead>
                        <tr>
                            <th>Operação</th>
                            <th>BST Normal</th>
                            <th>AVL</th>
                            <th>Explicação</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Busca</strong></td>
                            <td class="worst-case">O(n) pior caso<br>O(log n) médio</td>
                            <td class="best-case">O(log n) sempre</td>
                            <td>AVL garante altura log(n)</td>
                        </tr>
                        <tr>
                            <td><strong>Inserção</strong></td>
                            <td class="worst-case">O(n) pior caso<br>O(log n) médio</td>
                            <td class="best-case">O(log n) sempre</td>
                            <td>+ custo de rotação (constante)</td>
                        </tr>
                        <tr>
                            <td><strong>Remoção</strong></td>
                            <td class="worst-case">O(n) pior caso<br>O(log n) médio</td>
                            <td class="best-case">O(log n) sempre</td>
                            <td>+ custo de rotação (constante)</td>
                        </tr>
                        <tr>
                            <td><strong>Espaço</strong></td>
                            <td>O(n)</td>
                            <td class="worst-case">O(n) + altura</td>
                            <td>AVL guarda altura em cada nó</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="complexity-insights">
                <h4>💡 Insights Importantes:</h4>
                <ul class="insights-list">
                    <li>
                        <strong>Garantia de Performance:</strong> AVL SEMPRE é O(log n), BST pode degradar para O(n)
                    </li>
                    <li>
                        <strong>Custo das Rotações:</strong> Cada rotação é O(1) - apenas ponteiros são atualizados
                    </li>
                    <li>
                        <strong>Número de Rotações:</strong> No máximo O(log n) rotações por inserção/remoção
                    </li>
                    <li>
                        <strong>Overhead:</strong> AVL usa espaço extra para armazenar altura, mas vale a pena
                    </li>
                </ul>
            </div>
            
            <div class="when-to-use">
                <h4>🎯 Quando Usar AVL?</h4>
                <div class="use-cases-grid">
                    <div class="use-case good">
                        <h5>✅ Use AVL quando:</h5>
                        <ul>
                            <li>Buscas são mais frequentes que inserções</li>
                            <li>Precisa de garantia de performance O(log n)</li>
                            <li>Dados chegam ordenados ou quase ordenados</li>
                            <li>Aplicações em tempo real (previsibilidade)</li>
                        </ul>
                        <p class="examples"><strong>Exemplos:</strong> Bancos de dados, índices, dicionários</p>
                    </div>
                    
                    <div class="use-case alternative">
                        <h5>🤔 Considere alternativas quando:</h5>
                        <ul>
                            <li>Muitas inserções/remoções (use Red-Black Tree)</li>
                            <li>Dados aleatórios (BST normal pode bastar)</li>
                            <li>Memória é crítica (overhead da altura)</li>
                            <li>Operações em lote (use B-Trees)</li>
                        </ul>
                        <p class="examples"><strong>Alternativas:</strong> Red-Black, Splay Trees, B-Trees</p>
                    </div>
                </div>
            </div>
        </div>
    `,

    // Exercícios Práticos
    exercises: `
        <div class="educational-section">
            <h3>🎯 Parte 6: Exercícios Práticos</h3>
            
            <div class="exercise">
                <h4>Exercício 1: Calcular Fator de Balanceamento</h4>
                <p>Para cada árvore abaixo, calcule o FB de cada nó:</p>
                <pre class="tree-diagram">
      10
     /  \\
    5   15
   /      \\
  3       20
                </pre>
                <details>
                    <summary>Ver Resposta</summary>
                    <div class="answer">
                        <p>Nó 3: FB = 0 (folha)</p>
                        <p>Nó 5: FB = +1 (altura esq=1, dir=0)</p>
                        <p>Nó 20: FB = 0 (folha)</p>
                        <p>Nó 15: FB = -1 (altura esq=0, dir=1)</p>
                        <p>Nó 10: FB = 0 (altura esq=2, dir=2)</p>
                        <p><strong>Resultado:</strong> Árvore balanceada! ✅</p>
                    </div>
                </details>
            </div>
            
            <div class="exercise">
                <h4>Exercício 2: Identificar Tipo de Rotação</h4>
                <p>Qual rotação é necessária?</p>
                <pre class="tree-diagram">
      30 [FB=-2]
     /          \\
   10          50 [FB=+1]
              /
            40
                </pre>
                <details>
                    <summary>Ver Resposta</summary>
                    <div class="answer">
                        <p>Análise:</p>
                        <ul>
                            <li>FB(30) = -2 → desbalanceado à direita</li>
                            <li>FB(50) = +1 → filho desbalanceado à esquerda</li>
                            <li>Padrão: Direita-Esquerda</li>
                        </ul>
                        <p><strong>Resposta:</strong> Rotação RL (Dupla Direita-Esquerda)</p>
                        <p><strong>Passos:</strong></p>
                        <ol>
                            <li>Rotação Direita em 50</li>
                            <li>Rotação Esquerda em 30</li>
                        </ol>
                    </div>
                </details>
            </div>
            
            <div class="exercise">
                <h4>Exercício 3: Sequência de Inserções</h4>
                <p>Insira os valores 1, 2, 3, 4, 5, 6, 7 em uma AVL vazia.</p>
                <p>Desenhe a árvore após cada inserção e indique quando rotações ocorrem.</p>
                <details>
                    <summary>Ver Resposta Completa</summary>
                    <div class="answer">
                        <pre>
Inserir 1: 1 ✅

Inserir 2: 
   1
    \\
     2 ✅

Inserir 3:
Antes:   1       Rotação RR     2
          \\      =========>    / \\
           2                  1   3 ✅
            \\
             3

Inserir 4:
   2
  / \\
 1   3
      \\
       4 ✅

Inserir 5:
Antes:    2          Rotação RL        2
         / \\        no nó 3          / \\
        1   3       =========>       1   4
             \\                          / \\
              4                        3   5 ✅
               \\
                5

Inserir 6:
       2              Rotação RR         4
      / \\            na raiz         /     \\
     1   4          =========>      2       5
        / \\                        / \\      \\
       3   5                      1   3      6 ✅
            \\
             6

Inserir 7:
       4
     /   \\
    2     5
   / \\    \\
  1   3    6
            \\
             7 ✅

Total de rotações: 3
Altura final: 3 (vs 6 em BST não balanceada)
                        </pre>
                    </div>
                </details>
            </div>
        </div>
    `
};

// Exportar para uso global
window.AVLEducationalContent = AVLEducationalContent;
