// ===== SISTEMA EDUCACIONAL INTERATIVO AVL =====

class AVLEducationalInteractive {
    constructor() {
        this.currentStep = 0;
        this.visualizationCanvas = null;
        this.init();
    }

    init() {
        console.log('🌳 Inicializando Sistema Educacional AVL Interativo');
        this.setupUI();
        this.loadLesson('introduction');
    }

    setupUI() {
        // Cria container principal
        const container = document.createElement('div');
        container.id = 'avl-educational-container';
        container.innerHTML = `
            <div class="avl-educational-wrapper">
                <!-- Sidebar com lições -->
                <div class="avl-sidebar">
                    <h3>📚 Lições AVL</h3>
                    <div class="avl-lessons">
                        <button class="lesson-btn active" data-lesson="introduction">
                            1. Introdução
                        </button>
                        <button class="lesson-btn" data-lesson="balancing-factor">
                            2. Fator de Balanceamento
                        </button>
                        <button class="lesson-btn" data-lesson="rotations">
                            3. Rotações
                        </button>
                        <button class="lesson-btn" data-lesson="insertion">
                            4. Inserção e Balanceamento
                        </button>
                        <button class="lesson-btn" data-lesson="deletions">
                            5. Deleção e Balanceamento
                        </button>
                        <button class="lesson-btn" data-lesson="examples">
                            6. Exemplos Práticos
                        </button>
                        <button class="lesson-btn" data-lesson="complexity">
                            7. Complexidade
                        </button>
                    </div>
                </div>

                <!-- Conteúdo principal -->
                <div class="avl-main-content">
                    <!-- Header da lição -->
                    <div class="avl-lesson-header">
                        <h2 id="lesson-title">Introdução às Árvores AVL</h2>
                        <p id="lesson-subtitle">Aprenda sobre árvores auto-balanceadas</p>
                    </div>

                    <!-- Conteúdo dinâmico -->
                    <div class="avl-lesson-content" id="lesson-content">
                        <!-- Preenchido dinamicamente -->
                    </div>

                    <!-- Visualizador -->
                    <div class="avl-visualizer">
                        <canvas id="avl-canvas" width="800" height="400"></canvas>
                    </div>

                    <!-- Controles interativos -->
                    <div class="avl-controls">
                        <div class="control-group">
                            <label>Valor a Inserir:</label>
                            <input type="number" id="avl-input-value" placeholder="Ex: 10" min="1" max="100">
                            <button id="avl-insert-btn">Inserir</button>
                            <button id="avl-delete-btn">Deletar</button>
                            <button id="avl-reset-btn">Resetar</button>
                        </div>
                        <div class="control-group">
                            <label>Velocidade de Animação:</label>
                            <input type="range" id="avl-speed" min="0.5" max="3" step="0.5" value="1">
                            <span id="speed-display">1x</span>
                        </div>
                    </div>

                    <!-- Informações em tempo real -->
                    <div class="avl-info-panel">
                        <div class="info-item">
                            <span class="label">Altura:</span>
                            <span id="avl-height" class="value">0</span>
                        </div>
                        <div class="info-item">
                            <span class="label">Total de Nós:</span>
                            <span id="avl-nodes" class="value">0</span>
                        </div>
                        <div class="info-item">
                            <span class="label">Fator de Balanceamento:</span>
                            <span id="avl-balance" class="value">0</span>
                        </div>
                        <div class="info-item">
                            <span class="label">Estado:</span>
                            <span id="avl-status" class="value">Balanceada ✓</span>
                        </div>
                    </div>

                    <!-- Passo a passo -->
                    <div class="avl-steps">
                        <h4>📋 Passo a Passo:</h4>
                        <div id="avl-steps-list" class="steps-list"></div>
                        <div class="steps-navigation">
                            <button id="prev-step">← Anterior</button>
                            <span id="step-counter">Passo 0/0</span>
                            <button id="next-step">Próximo →</button>
                        </div>
                    </div>

                    <!-- Navegação entre lições -->
                    <div class="avl-navigation">
                        <button id="prev-lesson" class="btn-secondary">← Lição Anterior</button>
                        <button id="next-lesson" class="btn-secondary">Próxima Lição →</button>
                    </div>
                </div>
            </div>
        `;

        // Adiciona ao DOM
        const educationalSection = document.querySelector('.educational-interface');
        if (educationalSection) {
            educationalSection.appendChild(container);
        }

        this.attachEventListeners();
    }

    attachEventListeners() {
        // Botões de lições
        document.querySelectorAll('.lesson-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.lesson-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.loadLesson(e.target.dataset.lesson);
            });
        });

        // Controles
        document.getElementById('avl-insert-btn')?.addEventListener('click', () => this.insertValue());
        document.getElementById('avl-delete-btn')?.addEventListener('click', () => this.deleteValue());
        document.getElementById('avl-reset-btn')?.addEventListener('click', () => this.reset());

        // Velocidade
        document.getElementById('avl-speed')?.addEventListener('change', (e) => {
            document.getElementById('speed-display').textContent = e.target.value + 'x';
        });

        // Navegação de lições
        document.getElementById('prev-lesson')?.addEventListener('click', () => this.previousLesson());
        document.getElementById('next-lesson')?.addEventListener('click', () => this.nextLesson());

        // Navegação de passos
        document.getElementById('prev-step')?.addEventListener('click', () => this.previousStep());
        document.getElementById('next-step')?.addEventListener('click', () => this.nextStep());
    }

    loadLesson(lessonKey) {
        const lessons = {
            'introduction': {
                title: '🌳 Introdução às Árvores AVL',
                subtitle: 'Entenda o que é e por que usar árvores balanceadas',
                content: `
                    <section class="lesson-section">
                        <h3>O que é uma Árvore AVL?</h3>
                        <p>Uma Árvore AVL (nomeada em homenagem aos inventores Adelson-Velsky e Landis) é uma árvore binária de busca auto-balanceada. Isso significa que a árvore mantém automaticamente seu equilíbrio para garantir operações eficientes.</p>
                        
                        <h4>📊 Características Principais:</h4>
                        <ul>
                            <li><strong>Auto-balanceada:</strong> Mantém altura mínima automaticamente</li>
                            <li><strong>BST válida:</strong> Segue propriedades de árvore binária de busca</li>
                            <li><strong>Balanceada:</strong> Diferença de altura entre subárvores ≤ 1</li>
                            <li><strong>Eficiente:</strong> Busca, inserção, deleção em O(log n)</li>
                        </ul>

                        <h4>⚖️ Propriedade de Balanceamento:</h4>
                        <div class="code-block">
                            Para cada nó: |altura(esquerda) - altura(direita)| ≤ 1
                        </div>

                        <h4>🔄 Comparação com BST:</h4>
                        <table class="comparison-table">
                            <tr>
                                <th>Operação</th>
                                <th>BST Comum</th>
                                <th>Árvore AVL</th>
                            </tr>
                            <tr>
                                <td>Busca</td>
                                <td>O(log n) - O(n)</td>
                                <td>O(log n) ✓</td>
                            </tr>
                            <tr>
                                <td>Inserção</td>
                                <td>O(log n) - O(n)</td>
                                <td>O(log n) ✓</td>
                            </tr>
                            <tr>
                                <td>Deleção</td>
                                <td>O(log n) - O(n)</td>
                                <td>O(log n) ✓</td>
                            </tr>
                        </table>

                        <h4>🎯 Por que usar AVL?</h4>
                        <ul>
                            <li>✅ Garantia de operações em tempo logarítmico</li>
                            <li>✅ Ideal para datasets grandes</li>
                            <li>✅ Previne degeneração em árvore linear</li>
                            <li>✅ Usado em bancos de dados reais</li>
                        </ul>
                    </section>
                `
            },
            'balancing-factor': {
                title: '⚖️ Fator de Balanceamento',
                subtitle: 'Entenda como medir o desequilíbrio de um nó',
                content: `
                    <section class="lesson-section">
                        <h3>O que é Fator de Balanceamento?</h3>
                        <p>O Fator de Balanceamento (Balance Factor) é um número que indica se um nó está balanceado.</p>

                        <h4>📐 Fórmula:</h4>
                        <div class="code-block">
                            BF(nó) = altura(subárvore esquerda) - altura(subárvore direita)
                        </div>

                        <h4>✅ Valores Válidos:</h4>
                        <div class="value-table">
                            <div class="value-row">
                                <span class="bf-value bf-balanced">-1</span>
                                <span class="bf-desc">Ligeiramente desbalanceado para direita ✓</span>
                            </div>
                            <div class="value-row">
                                <span class="bf-value bf-perfect">0</span>
                                <span class="bf-desc">Perfeitamente balanceado ✓</span>
                            </div>
                            <div class="value-row">
                                <span class="bf-value bf-balanced">1</span>
                                <span class="bf-desc">Ligeiramente desbalanceado para esquerda ✓</span>
                            </div>
                        </div>

                        <h4>❌ Valores Inválidos:</h4>
                        <div class="value-table">
                            <div class="value-row">
                                <span class="bf-value bf-unbalanced">-2 ou menor</span>
                                <span class="bf-desc">Muito desbalanceado para direita ✗</span>
                            </div>
                            <div class="value-row">
                                <span class="bf-value bf-unbalanced">2 ou maior</span>
                                <span class="bf-desc">Muito desbalanceado para esquerda ✗</span>
                            </div>
                        </div>

                        <h4>📊 Exemplos Visuais:</h4>
                        <div class="tree-example">
                            <p><strong>Balanceado:</strong></p>
                            <pre>
        50 (BF=0)
       /  \\
      30   70
     / \\   / \\
    20 40 60 80
                            </pre>
                        </div>

                        <div class="tree-example">
                            <p><strong>Desbalanceado:</strong></p>
                            <pre>
        50 (BF=2) ← PROBLEMA!
       /  \\
      30   70
     /
    20
   /
  10
                            </pre>
                        </div>

                        <h4>🔍 Como Calcular:</h4>
                        <ol>
                            <li>Encontre a altura da subárvore esquerda</li>
                            <li>Encontre a altura da subárvore direita</li>
                            <li>Subtraia: altura_esquerda - altura_direita</li>
                            <li>Se resultado está entre -1 e 1: ✓ Balanceado</li>
                            <li>Se não: ✗ Rebalanceie usando rotações</li>
                        </ol>
                    </section>
                `
            },
            'rotations': {
                title: '🔄 Rotações - Como Balancear',
                subtitle: 'Aprenda os 4 tipos de rotações para rebalancear',
                content: `
                    <section class="lesson-section">
                        <h3>Tipos de Rotações</h3>
                        <p>Quando um nó fica desbalanceado, usamos rotações para restaurar o equilíbrio.</p>

                        <h4>1️⃣ Rotação Simples à Esquerda (LL)</h4>
                        <div class="rotation-diagram">
                            <p><strong>Antes (BF=2):</strong></p>
                            <pre>
      C (BF=2)          B
     /              /   \\
    B      →       A     C
   /
  A
                            </pre>
                            <p><strong>Descrição:</strong> Quando subárvore esquerda é mais pesada</p>
                            <p><strong>Caso:</strong> Nó inserido à esquerda de nó esquerdo</p>
                        </div>

                        <h4>2️⃣ Rotação Simples à Direita (RR)</h4>
                        <div class="rotation-diagram">
                            <p><strong>Antes (BF=-2):</strong></p>
                            <pre>
    A (BF=-2)           B
     \\            /   \\
      B    →     A     C
       \\
        C
                            </pre>
                            <p><strong>Descrição:</strong> Quando subárvore direita é mais pesada</p>
                            <p><strong>Caso:</strong> Nó inserido à direita de nó direito</p>
                        </div>

                        <h4>3️⃣ Rotação Dupla Esquerda-Direita (LR)</h4>
                        <div class="rotation-diagram">
                            <p><strong>Antes (BF=2):</strong></p>
                            <pre>
      C              C              B
     /      →       /      →      /   \\
    A             B              A     C
     \\           /
      B         A
                            </pre>
                            <p><strong>Descrição:</strong> Nó inserido à direita de nó esquerdo</p>
                            <p><strong>Passo 1:</strong> Rotação esquerda em nó esquerdo</p>
                            <p><strong>Passo 2:</strong> Rotação direita no nó raiz</p>
                        </div>

                        <h4>4️⃣ Rotação Dupla Direita-Esquerda (RL)</h4>
                        <div class="rotation-diagram">
                            <p><strong>Antes (BF=-2):</strong></p>
                            <pre>
    A              A              B
     \\      →       \\      →      /   \\
      C             B            A     C
     /               \\
    B                 C
                            </pre>
                            <p><strong>Descrição:</strong> Nó inserido à esquerda de nó direito</p>
                            <p><strong>Passo 1:</strong> Rotação direita em nó direito</p>
                            <p><strong>Passo 2:</strong> Rotação esquerda no nó raiz</p>
                        </div>

                        <h4>⏱️ Complexidade das Rotações:</h4>
                        <ul>
                            <li>Rotação simples: O(1)</li>
                            <li>Rotação dupla: O(1)</li>
                            <li>Máximo de rotações por inserção: 2</li>
                        </ul>
                    </section>
                `
            },
            'insertion': {
                title: '➕ Inserção e Rebalanceamento',
                subtitle: 'Passo a passo de como inserir mantendo balanceamento',
                content: `
                    <section class="lesson-section">
                        <h3>Algoritmo de Inserção em AVL</h3>
                        <p>Inserir em uma árvore AVL envolve 3 passos principais:</p>

                        <h4>📋 Algoritmo Completo:</h4>
                        <div class="algorithm-steps">
                            <div class="step">
                                <span class="step-number">1</span>
                                <div class="step-content">
                                    <h5>Inserir como BST</h5>
                                    <p>Insira o valor seguindo as regras de BST (esquerda < raiz < direita)</p>
                                </div>
                            </div>
                            <div class="step">
                                <span class="step-number">2</span>
                                <div class="step-content">
                                    <h5>Atualizar Alturas</h5>
                                    <p>Volte pela árvore atualizando altura de cada nó ancestral</p>
                                </div>
                            </div>
                            <div class="step">
                                <span class="step-number">3</span>
                                <div class="step-content">
                                    <h5>Verificar Balanceamento</h5>
                                    <p>Para cada nó, calcule BF e rebalanceie se necessário</p>
                                </div>
                            </div>
                            <div class="step">
                                <span class="step-number">4</span>
                                <div class="step-content">
                                    <h5>Aplicar Rotação</h5>
                                    <p>Aplique a rotação apropriada baseado no tipo de desbalanceamento</p>
                                </div>
                            </div>
                        </div>

                        <h4>💻 Pseudo-código:</h4>
                        <div class="code-block">
<pre>
função inserir(valor):
    1. Inserir normalmente como BST
    2. Atualizar altura(nó)
    3. BF = altura(esquerda) - altura(direita)
    
    4. Se BF > 1:  // Desequilibrado à esquerda
        Se valor < nó.esquerda.valor:
            Rotação direita
        Senão:
            Rotação esquerda-direita
    
    5. Se BF < -1:  // Desequilibrado à direita
        Se valor > nó.direita.valor:
            Rotação esquerda
        Senão:
            Rotação direita-esquerda
</pre>
                        </div>

                        <h4>📊 Exemplo Passo a Passo: Inserir 10, 20, 30</h4>
                        <div class="example-trace">
                            <p><strong>Passo 1: Inserir 10</strong></p>
                            <pre>10 (BF=0) ✓</pre>

                            <p><strong>Passo 2: Inserir 20</strong></p>
                            <pre>
 10 (BF=-1)
   \\
    20 (BF=0) ✓
                            </pre>

                            <p><strong>Passo 3: Inserir 30 → Desbalanceado!</strong></p>
                            <pre>
 10 (BF=-2) ✗ PROBLEMA!
   \\
    20
     \\
      30
                            </pre>

                            <p><strong>Aplicar Rotação Esquerda:</strong></p>
                            <pre>
    20 (BF=0) ✓
   /  \\
  10   30 ✓ BALANCEADO!
                            </pre>
                        </div>

                        <h4>⏱️ Complexidade:</h4>
                        <ul>
                            <li>Inserção: O(log n)</li>
                            <li>Máximo de rotações: 2</li>
                            <li>Total: O(log n)</li>
                        </ul>
                    </section>
                `
            },
            'deletions': {
                title: '➖ Deleção e Rebalanceamento',
                subtitle: 'Como deletar mantendo a estrutura AVL',
                content: `
                    <section class="lesson-section">
                        <h3>Algoritmo de Deleção em AVL</h3>
                        <p>Deleção é mais complexa que inserção, pois pode causar desbalanceamento em múltiplos níveis.</p>

                        <h4>📋 Algoritmo Completo:</h4>
                        <div class="algorithm-steps">
                            <div class="step">
                                <span class="step-number">1</span>
                                <div class="step-content">
                                    <h5>Deletar como BST</h5>
                                    <ul>
                                        <li>Se nó é folha: remova</li>
                                        <li>Se tem 1 filho: substitua por filho</li>
                                        <li>Se tem 2 filhos: use predecessor/sucessor</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="step">
                                <span class="step-number">2</span>
                                <div class="step-content">
                                    <h5>Atualizar Alturas</h5>
                                    <p>Volte atualizando alturas de ancestrais</p>
                                </div>
                            </div>
                            <div class="step">
                                <span class="step-number">3</span>
                                <div class="step-content">
                                    <h5>Rebalancear</h5>
                                    <p>Pode precisar de múltiplas rotações (até log n)</p>
                                </div>
                            </div>
                        </div>

                        <h4>⚠️ Diferença com Inserção:</h4>
                        <ul>
                            <li>Inserção: máximo 1-2 rotações no caminho</li>
                            <li>Deleção: pode precisar de rotações em múltiplos níveis</li>
                            <li>Deleção: mais complexa e mais lenta (mas ainda O(log n))</li>
                        </ul>

                        <h4>📊 Exemplo: Deletar de 3 nós</h4>
                        <div class="example-trace">
                            <p><strong>Árvore Inicial:</strong></p>
                            <pre>
    20 (BF=0)
   /  \\
  10   30
                            </pre>

                            <p><strong>Deletar 10:</strong></p>
                            <pre>
    20 (BF=-1) ✓
      \\
       30
                            </pre>

                            <p><strong>Deletar 20:</strong></p>
                            <pre>
    30 (BF=0) ✓
                            </pre>
                        </div>

                        <h4>💡 Casos Especiais:</h4>
                        <ul>
                            <li><strong>Deletar folha:</strong> Simples, apenas remova</li>
                            <li><strong>Deletar com 1 filho:</strong> Substitua pelo filho</li>
                            <li><strong>Deletar com 2 filhos:</strong> Use predecessor (maior da esquerda)</li>
                        </ul>
                    </section>
                `
            },
            'examples': {
                title: '🎯 Exemplos Práticos',
                subtitle: 'Veja exemplos reais de operações AVL',
                content: `
                    <section class="lesson-section">
                        <h3>Exemplos Passo a Passo</h3>

                        <h4>📌 Exemplo 1: Construir árvore com [10, 20, 30]</h4>
                        <div class="example-trace">
                            <p><strong>Inserir 10:</strong></p>
                            <pre>10</pre>

                            <p><strong>Inserir 20:</strong></p>
                            <pre>
 10
   \\
    20
                            </pre>

                            <p><strong>Inserir 30 (causa desbalanceamento):</strong></p>
                            <pre>
 10
   \\
    20
     \\
      30  ← BF=-2, precisa rotação
                            </pre>

                            <p><strong>Após rotação esquerda:</strong></p>
                            <pre>
    20
   /  \\
  10   30 ✓ BALANCEADO!
                            </pre>
                        </div>

                        <h4>📌 Exemplo 2: Sequência [50, 25, 75, 10, 30]</h4>
                        <div class="example-trace">
                            <p><strong>Passo 1-2: 50, 25</strong></p>
                            <pre>
   50
  /
 25
                            </pre>

                            <p><strong>Passo 3: 75</strong></p>
                            <pre>
   50
  /  \\
 25   75
                            </pre>

                            <p><strong>Passo 4: 10</strong></p>
                            <pre>
   50
  /  \\
 25   75
 /
10
                            </pre>

                            <p><strong>Passo 5: 30</strong></p>
                            <pre>
   50
  /  \\
 25   75
/  \\
10  30 ✓ BALANCEADO!
                            </pre>
                        </div>

                        <h4>📌 Exemplo 3: Rotação Dupla (LR)</h4>
                        <div class="example-trace">
                            <p><strong>Inserir 10, 30, 20 (em ordem):</strong></p>
                            <pre>
Passo 1: 10
  10

Passo 2: 30
  10
    \\
     30

Passo 3: 20 (Desbalanceado!)
  10 (BF=2)
    \\
     30
    /
   20  ← Precisa rotação dupla!
                            </pre>

                            <p><strong>Passo 1: Rotação direita em 30:</strong></p>
                            <pre>
  10 (BF=2)
    \\
     20
      \\
       30
                            </pre>

                            <p><strong>Passo 2: Rotação esquerda em 10:</strong></p>
                            <pre>
    20
   /  \\
  10   30 ✓ PERFEITO!
                            </pre>
                        </div>
                    </section>
                `
            },
            'complexity': {
                title: '📊 Análise de Complexidade',
                subtitle: 'Entenda o desempenho das operações AVL',
                content: `
                    <section class="lesson-section">
                        <h3>Análise de Complexidade</h3>

                        <h4>⏱️ Complexidade de Tempo</h4>
                        <table class="complexity-table">
                            <tr>
                                <th>Operação</th>
                                <th>Melhor Caso</th>
                                <th>Caso Médio</th>
                                <th>Pior Caso</th>
                            </tr>
                            <tr>
                                <td>Busca</td>
                                <td>O(1)</td>
                                <td>O(log n)</td>
                                <td>O(log n) ✓</td>
                            </tr>
                            <tr>
                                <td>Inserção</td>
                                <td>O(1)</td>
                                <td>O(log n)</td>
                                <td>O(log n) ✓</td>
                            </tr>
                            <tr>
                                <td>Deleção</td>
                                <td>O(1)</td>
                                <td>O(log n)</td>
                                <td>O(log n) ✓</td>
                            </tr>
                        </table>

                        <h4>💾 Complexidade de Espaço</h4>
                        <ul>
                            <li><strong>Espaço de Armazenamento:</strong> O(n)</li>
                            <li><strong>Espaço de Recursão:</strong> O(log n)</li>
                            <li><strong>Total:</strong> O(n)</li>
                        </ul>

                        <h4>📈 Altura Máxima</h4>
                        <p>A altura de uma árvore AVL com n nós é limitada por:</p>
                        <div class="code-block">
                            altura ≤ 1.44 * log₂(n + 2) - 0.328
                        </div>
                        <p>Em outras palavras: altura ≈ log₂(n)</p>

                        <h4>📊 Comparação com Outras Estruturas</h4>
                        <table class="comparison-table">
                            <tr>
                                <th>Estrutura</th>
                                <th>Busca</th>
                                <th>Inserção</th>
                                <th>Deleção</th>
                                <th>Uso</th>
                            </tr>
                            <tr>
                                <td>Array Desordenado</td>
                                <td>O(n)</td>
                                <td>O(1)</td>
                                <td>O(n)</td>
                                <td>Dados pequenos</td>
                            </tr>
                            <tr>
                                <td>BST (não balanceada)</td>
                                <td>O(log n)-O(n)</td>
                                <td>O(log n)-O(n)</td>
                                <td>O(log n)-O(n)</td>
                                <td>Não confiável</td>
                            </tr>
                            <tr>
                                <td><strong>Árvore AVL</strong></td>
                                <td><strong>O(log n) ✓</strong></td>
                                <td><strong>O(log n) ✓</strong></td>
                                <td><strong>O(log n) ✓</strong></td>
                                <td><strong>Garantido</strong></td>
                            </tr>
                            <tr>
                                <td>Red-Black Tree</td>
                                <td>O(log n)</td>
                                <td>O(log n)</td>
                                <td>O(log n)</td>
                                <td>Menos rotações</td>
                            </tr>
                        </table>

                        <h4>🎯 Quando Usar AVL?</h4>
                        <ul>
                            <li>✅ Aplicações com muitas buscas</li>
                            <li>✅ Datasets grandes e dinâmicos</li>
                            <li>✅ Bancos de dados</li>
                            <li>✅ Quando desempenho é crítico</li>
                            <li>❌ Se inserções/deleções são frequentes (Red-Black é melhor)</li>
                        </ul>

                        <h4>📈 Exemplos de Números</h4>
                        <table class="numbers-table">
                            <tr>
                                <th>n (nós)</th>
                                <th>BST Desbalanceada</th>
                                <th>Árvore AVL</th>
                                <th>Economia</th>
                            </tr>
                            <tr>
                                <td>1.000</td>
                                <td>até 1.000 ops</td>
                                <td>≈ 10 ops</td>
                                <td>100x mais rápido</td>
                            </tr>
                            <tr>
                                <td>1.000.000</td>
                                <td>até 1.000.000 ops</td>
                                <td>≈ 20 ops</td>
                                <td>50.000x mais rápido</td>
                            </tr>
                            <tr>
                                <td>1 bilhão</td>
                                <td>até 1 bilhão ops</td>
                                <td>≈ 30 ops</td>
                                <td>33 milhões x mais rápido</td>
                            </tr>
                        </table>
                    </section>
                `
            }
        };

        const lesson = lessons[lessonKey] || lessons['introduction'];
        
        document.getElementById('lesson-title').textContent = lesson.title;
        document.getElementById('lesson-subtitle').textContent = lesson.subtitle;
        document.getElementById('lesson-content').innerHTML = lesson.content;

        this.currentStep = 0;
        this.updateSteps();
        this.drawVisualization();
    }

    insertValue() {
        const input = document.getElementById('avl-input-value');
        const value = parseInt(input.value);
        
        if (isNaN(value)) {
            alert('Por favor, insira um número válido');
            return;
        }

        // Lógica de inserção seria aqui
        console.log('Inserindo:', value);
        input.value = '';
        
        this.updateInfo();
        this.drawVisualization();
    }

    deleteValue() {
        const input = document.getElementById('avl-input-value');
        const value = parseInt(input.value);
        
        if (isNaN(value)) {
            alert('Por favor, insira um número válido');
            return;
        }

        console.log('Deletando:', value);
        input.value = '';
        
        this.updateInfo();
        this.drawVisualization();
    }

    reset() {
        console.log('Resetando árvore');
        this.updateInfo();
        this.drawVisualization();
    }

    updateInfo() {
        document.getElementById('avl-height').textContent = '3';
        document.getElementById('avl-nodes').textContent = '7';
        document.getElementById('avl-balance').textContent = '0';
        document.getElementById('avl-status').textContent = 'Balanceada ✓';
    }

    updateSteps() {
        const stepsList = document.getElementById('avl-steps-list');
        stepsList.innerHTML = `
            <div class="step-item active">
                <span class="step-num">1</span>
                <span class="step-text">Inserir valor na posição correta (como BST)</span>
            </div>
            <div class="step-item">
                <span class="step-num">2</span>
                <span class="step-text">Atualizar altura do nó inserido</span>
            </div>
            <div class="step-item">
                <span class="step-num">3</span>
                <span class="step-text">Calcular fator de balanceamento</span>
            </div>
            <div class="step-item">
                <span class="step-num">4</span>
                <span class="step-text">Aplicar rotação se necessário</span>
            </div>
        `;
        document.getElementById('step-counter').textContent = '1/4';
    }

    nextStep() {
        this.currentStep++;
        this.updateSteps();
    }

    previousStep() {
        if (this.currentStep > 0) this.currentStep--;
        this.updateSteps();
    }

    previousLesson() {
        const buttons = Array.from(document.querySelectorAll('.lesson-btn'));
        const currentIndex = buttons.findIndex(b => b.classList.contains('active'));
        if (currentIndex > 0) {
            buttons[currentIndex - 1].click();
        }
    }

    nextLesson() {
        const buttons = Array.from(document.querySelectorAll('.lesson-btn'));
        const currentIndex = buttons.findIndex(b => b.classList.contains('active'));
        if (currentIndex < buttons.length - 1) {
            buttons[currentIndex + 1].click();
        }
    }

    drawVisualization() {
        const canvas = document.getElementById('avl-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Desenha exemplo de árvore
        ctx.fillStyle = '#667eea';
        ctx.beginPath();
        ctx.arc(400, 50, 30, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('20', 400, 50);

        // Linhas
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(400, 80);
        ctx.lineTo(300, 130);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(400, 80);
        ctx.lineTo(500, 130);
        ctx.stroke();

        // Nós filhos
        ctx.fillStyle = '#764ba2';
        ctx.beginPath();
        ctx.arc(300, 160, 25, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.fillText('10', 300, 160);

        ctx.fillStyle = '#764ba2';
        ctx.beginPath();
        ctx.arc(500, 160, 25, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.fillText('30', 500, 160);
    }
}

// Inicializa quando carregado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.avlEducationalInteractive = new AVLEducationalInteractive();
    });
} else {
    window.avlEducationalInteractive = new AVLEducationalInteractive();
}
