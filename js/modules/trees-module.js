// ===== BINARY TREES MODULE =====

const TreesModule = {
    name: 'Árvores Binárias',
    
    render() {
        // Inicializar visualização após renderizar
        setTimeout(() => {
            if (typeof window.initializeTreeVisualization === 'function') {
                window.initializeTreeVisualization();
            }
        }, 100);
        
        return `
            <div class="module-container">
                <div class="module-header">
                    <h2>🌳 Árvores Binárias</h2>
                    <p class="module-description">
                        Estrutura de dados hierárquica onde cada nó possui no máximo dois filhos: esquerdo e direito.
                    </p>
                </div>

                <!-- Conceitos Fundamentais -->
                <div class="module-section">
                    <h3>📚 Conceitos Fundamentais</h3>
                    
                    <div class="concept-card">
                        <h4>O que é uma Árvore Binária?</h4>
                        <p>
                            Uma árvore binária é uma estrutura de dados hierárquica composta por nós, onde cada nó contém:
                        </p>
                        <ul>
                            <li><strong>Valor (chave):</strong> dado armazenado no nó</li>
                            <li><strong>Filho esquerdo:</strong> referência para o nó filho à esquerda</li>
                            <li><strong>Filho direito:</strong> referência para o nó filho à direita</li>
                        </ul>
                    </div>

                    <div class="terminology-grid">
                        <div class="term-card">
                            <h5>🌱 Raiz (Root)</h5>
                            <p>O nó no topo da árvore, sem pai.</p>
                        </div>
                        <div class="term-card">
                            <h5>🍃 Folha (Leaf)</h5>
                            <p>Nó sem filhos (ambos null).</p>
                        </div>
                        <div class="term-card">
                            <h5>📏 Altura</h5>
                            <p>Maior caminho da raiz até uma folha.</p>
                        </div>
                        <div class="term-card">
                            <h5>🔢 Nível</h5>
                            <p>Distância de um nó até a raiz.</p>
                        </div>
                        <div class="term-card">
                            <h5>👨‍👦 Pai/Filho</h5>
                            <p>Nó superior/inferior direto.</p>
                        </div>
                        <div class="term-card">
                            <h5>👥 Irmãos</h5>
                            <p>Nós com o mesmo pai.</p>
                        </div>
                    </div>
                </div>

                <!-- Árvore Binária de Busca (BST) -->
                <div class="module-section">
                    <h3>🔍 Árvore Binária de Busca (BST)</h3>
                    
                    <div class="concept-card highlight">
                        <h4>Propriedade Fundamental da BST</h4>
                        <p>Para cada nó:</p>
                        <ul>
                            <li>Todos os valores na <strong>subárvore esquerda</strong> são <strong>menores</strong> que o valor do nó</li>
                            <li>Todos os valores na <strong>subárvore direita</strong> são <strong>maiores</strong> que o valor do nó</li>
                        </ul>
                        <div class="visual-example">
                            <pre>
        50
       /  \\
      30   70
     / \\   / \\
    20 40 60 80
    
    Esquerda < Raiz < Direita
            </pre>
                        </div>
                    </div>

                    <div class="code-section">
                        <h4>💻 Implementação do Nó</h4>
                        <div class="code-block">
                            <pre><code class="language-javascript">
class Node {
    constructor(valor) {
        this.valor = valor;
        this.esquerda = null;
        this.direita = null;
    }
}

class ArvoreBinariaBusca {
    constructor() {
        this.raiz = null;
    }
    
    inserir(valor) {
        const novoNo = new Node(valor);
        
        if (this.raiz === null) {
            this.raiz = novoNo;
            return;
        }
        
        let atual = this.raiz;
        while (true) {
            if (valor < atual.valor) {
                // Vai para esquerda
                if (atual.esquerda === null) {
                    atual.esquerda = novoNo;
                    break;
                }
                atual = atual.esquerda;
            } else {
                // Vai para direita
                if (atual.direita === null) {
                    atual.direita = novoNo;
                    break;
                }
                atual = atual.direita;
            }
        }
    }
    
    buscar(valor) {
        let atual = this.raiz;
        
        while (atual !== null) {
            if (valor === atual.valor) {
                return true; // Encontrou
            }
            if (valor < atual.valor) {
                atual = atual.esquerda;
            } else {
                atual = atual.direita;
            }
        }
        
        return false; // Não encontrou
    }
}
                            </code></pre>
                        </div>
                    </div>
                </div>

                <!-- Percursos (Traversals) -->
                <div class="module-section">
                    <h3>🚶 Percursos em Árvores</h3>
                    
                    <div class="traversal-grid">
                        <div class="traversal-card">
                            <h4>📍 In-Order (Em-Ordem)</h4>
                            <p><strong>Ordem:</strong> Esquerda → Raiz → Direita</p>
                            <p><strong>Resultado:</strong> Valores em ordem crescente (BST)</p>
                            <div class="code-block-mini">
                                <pre><code>
inOrder(no) {
    if (no === null) return;
    
    this.inOrder(no.esquerda);
    console.log(no.valor);  // Visita raiz
    this.inOrder(no.direita);
}

// Exemplo: 20, 30, 40, 50, 60, 70, 80
                                </code></pre>
                            </div>
                        </div>

                        <div class="traversal-card">
                            <h4>📍 Pre-Order (Pré-Ordem)</h4>
                            <p><strong>Ordem:</strong> Raiz → Esquerda → Direita</p>
                            <p><strong>Uso:</strong> Copiar a árvore, criar expressões</p>
                            <div class="code-block-mini">
                                <pre><code>
preOrder(no) {
    if (no === null) return;
    
    console.log(no.valor);  // Visita raiz
    this.preOrder(no.esquerda);
    this.preOrder(no.direita);
}

// Exemplo: 50, 30, 20, 40, 70, 60, 80
                                </code></pre>
                            </div>
                        </div>

                        <div class="traversal-card">
                            <h4>📍 Post-Order (Pós-Ordem)</h4>
                            <p><strong>Ordem:</strong> Esquerda → Direita → Raiz</p>
                            <p><strong>Uso:</strong> Deletar árvore, avaliar expressões</p>
                            <div class="code-block-mini">
                                <pre><code>
postOrder(no) {
    if (no === null) return;
    
    this.postOrder(no.esquerda);
    this.postOrder(no.direita);
    console.log(no.valor);  // Visita raiz
}

// Exemplo: 20, 40, 30, 60, 80, 70, 50
                                </code></pre>
                            </div>
                        </div>

                        <div class="traversal-card">
                            <h4>📍 Level-Order (Por Nível)</h4>
                            <p><strong>Ordem:</strong> Nível por nível, esquerda → direita</p>
                            <p><strong>Uso:</strong> BFS, menor altura</p>
                            <div class="code-block-mini">
                                <pre><code>
levelOrder() {
    if (!this.raiz) return;
    
    const fila = [this.raiz];
    
    while (fila.length > 0) {
        const no = fila.shift();
        console.log(no.valor);
        
        if (no.esquerda) fila.push(no.esquerda);
        if (no.direita) fila.push(no.direita);
    }
}

// Exemplo: 50, 30, 70, 20, 40, 60, 80
                                </code></pre>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Operações Comuns -->
                <div class="module-section">
                    <h3>⚙️ Operações Principais</h3>
                    
                    <div class="operations-grid">
                        <div class="operation-card">
                            <h4>🔍 Busca</h4>
                            <p><strong>Complexidade:</strong></p>
                            <ul>
                                <li>Melhor caso: O(log n) - árvore balanceada</li>
                                <li>Pior caso: O(n) - árvore degenerada (lista)</li>
                            </ul>
                            <button class="btn btn-primary" data-demo="tree-search">▶️ Demonstrar</button>
                        </div>

                        <div class="operation-card">
                            <h4>➕ Inserção</h4>
                            <p><strong>Complexidade:</strong></p>
                            <ul>
                                <li>Melhor caso: O(log n)</li>
                                <li>Pior caso: O(n)</li>
                            </ul>
                            <button class="btn btn-primary" data-demo="tree-insert">▶️ Demonstrar</button>
                        </div>

                        <div class="operation-card">
                            <h4>❌ Remoção</h4>
                            <p><strong>Casos:</strong></p>
                            <ul>
                                <li>Nó folha: remover diretamente</li>
                                <li>1 filho: substituir pelo filho</li>
                                <li>2 filhos: substituir pelo sucessor in-order</li>
                            </ul>
                            <button class="btn btn-primary" data-demo="tree-delete">▶️ Demonstrar</button>
                        </div>

                        <div class="operation-card">
                            <h4>📏 Altura</h4>
                            <p>Calcular a altura da árvore</p>
                            <div class="code-block-mini">
                                <pre><code>
altura(no) {
    if (no === null) return -1;
    
    const altEsq = this.altura(no.esquerda);
    const altDir = this.altura(no.direita);
    
    return Math.max(altEsq, altDir) + 1;
}
                                </code></pre>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Visualizador Interativo -->
                <div class="module-section">
                    <h3>🎨 Visualizador de Árvore</h3>
                    <div class="tree-visualizer">
                        <div class="tree-controls">
                            <input type="number" id="treeValue" placeholder="Valor (1-100)" min="1" max="100">
                            <button class="btn btn-success" id="treeInsert">➕ Inserir</button>
                            <button class="btn btn-warning" id="treeSearch">🔍 Buscar</button>
                            <button class="btn btn-danger" id="treeDelete">❌ Remover</button>
                            <button class="btn btn-secondary" id="treeClear">🗑️ Limpar</button>
                        </div>
                        
                        <div id="bstExamples"></div>
                        
                        <div class="tree-traversal-buttons">
                            <h4>Percursos:</h4>
                            <button class="btn btn-outline" id="treeInOrder">In-Order</button>
                            <button class="btn btn-outline" id="treePreOrder">Pre-Order</button>
                            <button class="btn btn-outline" id="treePostOrder">Post-Order</button>
                            <button class="btn btn-outline" id="treeLevelOrder">Level-Order</button>
                        </div>
                        
                        <div class="tree-canvas" id="treeCanvas">
                            <p class="placeholder">Insira valores para construir a árvore</p>
                        </div>
                        
                        <div class="tree-info">
                            <div class="info-item">
                                <span class="label">Altura:</span>
                                <span class="value" id="treeHeight">0</span>
                            </div>
                            <div class="info-item">
                                <span class="label">Total de Nós:</span>
                                <span class="value" id="treeNodes">0</span>
                            </div>
                            <div class="info-item">
                                <span class="label">Folhas:</span>
                                <span class="value" id="treeLeaves">0</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Exemplo Passo a Passo -->
                <div class="module-section">
                    <h3>🎯 Exemplo Passo a Passo</h3>
                    
                    <div class="concept-card">
                        <h4>Construindo uma BST com a sequência: [50, 30, 70, 20, 40, 60, 80]</h4>
                    </div>
                    
                    <div class="step-by-step-grid">
                        <div class="step-card">
                            <h5>Passo 1: Inserir 50</h5>
                            <pre>
    50 (raiz)
                            </pre>
                            <p>O primeiro valor sempre é a raiz</p>
                        </div>
                        
                        <div class="step-card">
                            <h5>Passo 2: Inserir 30</h5>
                            <pre>
    50
   /
  30
                            </pre>
                            <p>30 < 50 → vai para esquerda</p>
                        </div>
                        
                        <div class="step-card">
                            <h5>Passo 3: Inserir 70</h5>
                            <pre>
    50
   /  \\
  30   70
                            </pre>
                            <p>70 > 50 → vai para direita</p>
                        </div>
                        
                        <div class="step-card">
                            <h5>Passo 4: Inserir 20</h5>
                            <pre>
      50
     /  \\
    30   70
   /
  20
                            </pre>
                            <p>20 < 50 → esquerda<br>20 < 30 → esquerda</p>
                        </div>
                        
                        <div class="step-card">
                            <h5>Passo 5: Inserir 40</h5>
                            <pre>
      50
     /  \\
    30   70
   / \\
  20 40
                            </pre>
                            <p>40 < 50 → esquerda<br>40 > 30 → direita</p>
                        </div>
                        
                        <div class="step-card">
                            <h5>Passo 6: Inserir 60</h5>
                            <pre>
      50
     /  \\
    30   70
   / \\  /
  20 40 60
                            </pre>
                            <p>60 > 50 → direita<br>60 < 70 → esquerda</p>
                        </div>
                        
                        <div class="step-card">
                            <h5>Passo 7: Inserir 80</h5>
                            <pre>
      50
     /  \\
    30   70
   / \\  / \\
  20 40 60 80
                            </pre>
                            <p>80 > 50 → direita<br>80 > 70 → direita</p>
                        </div>
                        
                        <div class="step-card final-step">
                            <h5>✅ Árvore Completa!</h5>
                            <p><strong>Percursos:</strong></p>
                            <ul>
                                <li><strong>In-Order:</strong> 20, 30, 40, 50, 60, 70, 80</li>
                                <li><strong>Pre-Order:</strong> 50, 30, 20, 40, 70, 60, 80</li>
                                <li><strong>Post-Order:</strong> 20, 40, 30, 60, 80, 70, 50</li>
                                <li><strong>Level-Order:</strong> 50, 30, 70, 20, 40, 60, 80</li>
                            </ul>
                            <p><strong>Altura:</strong> 2 (3 níveis: 0, 1, 2)</p>
                        </div>
                    </div>
                </div>

                <!-- Análise de Complexidade -->
                <div class="module-section">
                    <h3>📊 Análise de Complexidade</h3>
                    
                    <div class="complexity-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Operação</th>
                                    <th>Melhor Caso</th>
                                    <th>Caso Médio</th>
                                    <th>Pior Caso</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Busca</td>
                                    <td class="complexity-good">O(log n)</td>
                                    <td class="complexity-average">O(log n)</td>
                                    <td class="complexity-bad">O(n)</td>
                                </tr>
                                <tr>
                                    <td>Inserção</td>
                                    <td class="complexity-good">O(log n)</td>
                                    <td class="complexity-average">O(log n)</td>
                                    <td class="complexity-bad">O(n)</td>
                                </tr>
                                <tr>
                                    <td>Remoção</td>
                                    <td class="complexity-good">O(log n)</td>
                                    <td class="complexity-average">O(log n)</td>
                                    <td class="complexity-bad">O(n)</td>
                                </tr>
                                <tr>
                                    <td>Percurso</td>
                                    <td class="complexity-average">O(n)</td>
                                    <td class="complexity-average">O(n)</td>
                                    <td class="complexity-average">O(n)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="complexity-note">
                        <p><strong>⚠️ Importante:</strong> O pior caso O(n) ocorre quando a árvore se torna degenerada (como uma lista encadeada). Para evitar isso, usamos <strong>árvores balanceadas</strong>!</p>
                    </div>
                </div>

                <!-- Aplicações Práticas -->
                <div class="module-section">
                    <h3>🎯 Aplicações Práticas</h3>
                    
                    <div class="applications-grid">
                        <div class="app-card">
                            <h4>📁 Sistemas de Arquivos</h4>
                            <p>Estrutura hierárquica de diretórios e arquivos</p>
                        </div>
                        <div class="app-card">
                            <h4>🌐 DOM (Document Object Model)</h4>
                            <p>Estrutura HTML/XML representada como árvore</p>
                        </div>
                        <div class="app-card">
                            <h4>🔤 Árvores de Expressão</h4>
                            <p>Avaliação de expressões matemáticas e lógicas</p>
                        </div>
                        <div class="app-card">
                            <h4>🗃️ Bancos de Dados</h4>
                            <p>Índices B-Tree para buscas eficientes</p>
                        </div>
                        <div class="app-card">
                            <h4>🤖 Inteligência Artificial</h4>
                            <p>Árvores de decisão e árvores de jogos</p>
                        </div>
                        <div class="app-card">
                            <h4>📊 Compressão de Dados</h4>
                            <p>Árvore de Huffman para compressão</p>
                        </div>
                    </div>
                </div>

                <!-- Exercícios -->
                <div class="module-section">
                    <h3>✏️ Exercícios Práticos</h3>
                    
                    <div class="exercise-list">
                        <div class="exercise-item">
                            <h4>1. Implementar função para contar nós</h4>
                            <p>Crie uma função recursiva que conta o total de nós na árvore.</p>
                            <button class="btn btn-outline" data-next-module="balanced-trees">Ver Solução</button>
                        </div>
                        <div class="exercise-item">
                            <h4>2. Encontrar valor mínimo</h4>
                            <p>Implemente uma função que retorna o menor valor da árvore.</p>
                            <button class="btn btn-outline">Ver Solução</button>
                        </div>
                        <div class="exercise-item">
                            <h4>3. Verificar se é BST válida</h4>
                            <p>Crie uma função que verifica se uma árvore binária é uma BST válida.</p>
                            <button class="btn btn-outline">Ver Solução</button>
                        </div>
                    </div>
                </div>

                <!-- Navegação -->
                <div class="module-navigation-buttons">
                    <button class="btn btn-outline" data-next-module="recursion">← Recursividade</button>
                    <button class="btn btn-primary" data-next-module="balanced-trees">Árvores Balanceadas →</button>
                </div>
            </div>
        `;
    }
};

// Export module
if (typeof window !== 'undefined') {
    window.TreesModule = TreesModule;
    console.log('✅ TreesModule carregado');
}
