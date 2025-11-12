// ===== GRAPHS MODULE =====

const GraphsModule = {
    name: 'Grafos',
    
    render() {
        console.log('🕸️ Renderizando módulo de Grafos...');
        
        // Inicializar visualização após renderizar
        setTimeout(() => {
            console.log('⏰ Tentando inicializar visualizadores de grafos...');
            if (typeof window.initializeGraphVisualization === 'function') {
                console.log('✅ Inicializando GraphVisualization');
                window.initializeGraphVisualization();
            } else {
                console.error('❌ initializeGraphVisualization não encontrado!');
            }
            if (typeof window.initializeGraphAlgorithms === 'function') {
                console.log('✅ Inicializando GraphAlgorithms');
                window.initializeGraphAlgorithms();
            } else {
                console.error('❌ initializeGraphAlgorithms não encontrado!');
            }
        }, 300);
        
        return `
            <div class="module-container graphs-module">
                <div class="module-header">
                    <h2>🕸️ Teoria dos Grafos</h2>
                    <p class="module-description">
                        Explore grafos, suas representações, algoritmos de busca (BFS, DFS), 
                        caminhos mínimos (Dijkstra, Bellman-Ford), árvores geradoras mínimas (Kruskal, Prim) e muito mais!
                    </p>
                </div>

                <!-- Introdução aos Grafos -->
                <div class="module-section">
                    <h3>📊 O que são Grafos?</h3>
                    
                    <div class="concept-card highlight">
                        <h4>Definição</h4>
                        <p>
                            Um <strong>grafo</strong> G = (V, E) é uma estrutura matemática composta por:
                        </p>
                        <ul>
                            <li><strong>V (Vértices/Nós):</strong> Conjunto de elementos</li>
                            <li><strong>E (Arestas/Edges):</strong> Conjunto de conexões entre vértices</li>
                        </ul>
                        
                        <div class="formula-box">
                            <h5>Notação Matemática</h5>
                            <p class="formula">G = (V, E)</p>
                            <p>Onde: V = {v₁, v₂, ..., vₙ} e E = {(vᵢ, vⱼ) | vᵢ, vⱼ ∈ V}</p>
                        </div>
                    </div>

                    <div class="applications-grid">
                        <div class="application-card">
                            <h4>🌐 Redes Sociais</h4>
                            <p>Pessoas são vértices, amizades são arestas</p>
                        </div>
                        <div class="application-card">
                            <h4>🗺️ Mapas e GPS</h4>
                            <p>Locais são vértices, estradas são arestas</p>
                        </div>
                        <div class="application-card">
                            <h4>🌐 Internet</h4>
                            <p>Computadores são vértices, conexões são arestas</p>
                        </div>
                        <div class="application-card">
                            <h4>🧬 Redes Biológicas</h4>
                            <p>Proteínas são vértices, interações são arestas</p>
                        </div>
                    </div>
                </div>

                <!-- Tipos de Grafos -->
                <div class="module-section">
                    <h3>🔍 Tipos de Grafos</h3>
                    
                    <div class="graph-types-grid">
                        <div class="graph-type-card">
                            <h4>Grafo Não-Direcionado</h4>
                            <div class="graph-visual">
                                <pre>
    A --- B
    |     |
    C --- D
                                </pre>
                            </div>
                            <p>Arestas não têm direção. Se (A,B) existe, então (B,A) também existe.</p>
                            <p><strong>Exemplo:</strong> Amizades no Facebook</p>
                        </div>

                        <div class="graph-type-card">
                            <h4>Grafo Direcionado (Dígrafo)</h4>
                            <div class="graph-visual">
                                <pre>
    A → B
    ↓   ↓
    C → D
                                </pre>
                            </div>
                            <p>Arestas têm direção. (A,B) ≠ (B,A)</p>
                            <p><strong>Exemplo:</strong> Seguidores no Twitter</p>
                        </div>

                        <div class="graph-type-card">
                            <h4>Grafo Ponderado</h4>
                            <div class="graph-visual">
                                <pre>
    A -5- B
    |3    |2
    C -4- D
                                </pre>
                            </div>
                            <p>Arestas possuem pesos/custos</p>
                            <p><strong>Exemplo:</strong> Distâncias entre cidades</p>
                        </div>

                        <div class="graph-type-card">
                            <h4>Grafo Cíclico</h4>
                            <div class="graph-visual">
                                <pre>
    A → B
    ↑   ↓
    D ← C
                                </pre>
                            </div>
                            <p>Contém pelo menos um ciclo (caminho fechado)</p>
                            <p><strong>Exemplo:</strong> Rotas circulares</p>
                        </div>

                        <div class="graph-type-card">
                            <h4>Grafo Acíclico (DAG)</h4>
                            <div class="graph-visual">
                                <pre>
    A → B
    ↓   ↓
    C → D
                                </pre>
                            </div>
                            <p>Grafo direcionado sem ciclos</p>
                            <p><strong>Exemplo:</strong> Árvore genealógica</p>
                        </div>

                        <div class="graph-type-card">
                            <h4>Grafo Completo</h4>
                            <div class="graph-visual">
                                <pre>
    A━━━B
    ┃╲ ╱┃
    ┃ ╳ ┃
    ┃╱ ╲┃
    C━━━D
                                </pre>
                            </div>
                            <p>Todos os vértices conectados entre si</p>
                            <p><strong>Arestas:</strong> n(n-1)/2 para n vértices</p>
                        </div>
                    </div>
                </div>

                <!-- Visualizador Interativo -->
                <div class="module-section">
                    <h3>🎨 Visualizador Interativo de Grafos</h3>
                    
                    <div class="graph-builder-container">
                        <div class="builder-toolbar">
                            <div class="toolbar-section">
                                <h4>🛠️ Ferramentas</h4>
                                <div class="tool-buttons">
                                    <button class="tool-btn active" data-tool="add-vertex">
                                        ➕ Adicionar Vértice
                                    </button>
                                    <button class="tool-btn" data-tool="add-edge">
                                        🔗 Adicionar Aresta
                                    </button>
                                    <button class="tool-btn" data-tool="remove">
                                        ❌ Remover
                                    </button>
                                    <button class="tool-btn" data-tool="select">
                                        👆 Selecionar
                                    </button>
                                </div>
                            </div>

                            <div class="toolbar-section">
                                <h4>⚙️ Configurações</h4>
                                <div class="config-options">
                                    <label>
                                        <input type="checkbox" id="graph-directed" checked>
                                        Grafo Direcionado
                                    </label>
                                    <label>
                                        <input type="checkbox" id="graph-weighted">
                                        Arestas Ponderadas
                                    </label>
                                    <label>
                                        <input type="checkbox" id="show-labels" checked>
                                        Mostrar Rótulos
                                    </label>
                                </div>
                            </div>

                            <div class="toolbar-section">
                                <h4>📋 Exemplos</h4>
                                <div class="example-buttons">
                                    <button class="example-btn" data-example="simple">
                                        Grafo Simples
                                    </button>
                                    <button class="example-btn" data-example="complete">
                                        Grafo Completo
                                    </button>
                                    <button class="example-btn" data-example="social">
                                        Rede Social
                                    </button>
                                    <button class="example-btn" data-example="weighted">
                                        Grafo Ponderado
                                    </button>
                                </div>
                            </div>

                            <div class="toolbar-section">
                                <h4>🎯 Ações</h4>
                                <div class="action-buttons">
                                    <button class="action-btn" id="clear-graph">
                                        🗑️ Limpar
                                    </button>
                                    <button class="action-btn" id="export-graph">
                                        💾 Exportar
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="graph-canvas-container">
                            <canvas id="graph-canvas" width="1000" height="600"></canvas>
                            <div class="canvas-instructions">
                                <p>💡 <strong>Instruções:</strong></p>
                                <ul>
                                    <li>Clique no canvas para adicionar vértices</li>
                                    <li>Selecione dois vértices para criar aresta</li>
                                    <li>Arraste vértices para reposicioná-los</li>
                                </ul>
                            </div>
                        </div>

                        <div class="graph-info-panel">
                            <div class="info-item">
                                <span class="label">Vértices:</span>
                                <span class="value" id="vertex-count">0</span>
                            </div>
                            <div class="info-item">
                                <span class="label">Arestas:</span>
                                <span class="value" id="edge-count">0</span>
                            </div>
                            <div class="info-item">
                                <span class="label">Tipo:</span>
                                <span class="value" id="graph-type">Direcionado</span>
                            </div>
                            <div class="info-item">
                                <span class="label">Densidade:</span>
                                <span class="value" id="graph-density">0%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Representações de Grafos -->
                <div class="module-section">
                    <h3>📝 Representações de Grafos</h3>
                    
                    <div class="representations-grid">
                        <div class="representation-card">
                            <h4>Matriz de Adjacência</h4>
                            <p>Matriz n×n onde M[i][j] = 1 se existe aresta de i para j</p>
                            <div class="code-example">
                                <pre><code>// Exemplo: A→B, A→C, B→C
    A B C
A [[0, 1, 1],
B  [0, 0, 1],
C  [0, 0, 0]]</code></pre>
                            </div>
                            <div class="complexity-info">
                                <p><strong>Espaço:</strong> O(V²)</p>
                                <p><strong>Verificar aresta:</strong> O(1)</p>
                                <p><strong>Bom para:</strong> Grafos densos</p>
                            </div>
                        </div>

                        <div class="representation-card">
                            <h4>Lista de Adjacência</h4>
                            <p>Array de listas. Cada vértice mantém lista de vizinhos</p>
                            <div class="code-example">
                                <pre><code>// Exemplo: A→B, A→C, B→C
{
  A: [B, C],
  B: [C],
  C: []
}</code></pre>
                            </div>
                            <div class="complexity-info">
                                <p><strong>Espaço:</strong> O(V + E)</p>
                                <p><strong>Verificar aresta:</strong> O(grau)</p>
                                <p><strong>Bom para:</strong> Grafos esparsos</p>
                            </div>
                        </div>

                        <div class="representation-card">
                            <h4>Lista de Arestas</h4>
                            <p>Lista de pares (origem, destino) [e peso]</p>
                            <div class="code-example">
                                <pre><code>// Exemplo: A→B(5), A→C(3), B→C(2)
[
  {from: 'A', to: 'B', weight: 5},
  {from: 'A', to: 'C', weight: 3},
  {from: 'B', to: 'C', weight: 2}
]</code></pre>
                            </div>
                            <div class="complexity-info">
                                <p><strong>Espaço:</strong> O(E)</p>
                                <p><strong>Verificar aresta:</strong> O(E)</p>
                                <p><strong>Bom para:</strong> Algoritmos de aresta</p>
                            </div>
                        </div>
                    </div>

                    <div class="representation-converter">
                        <h4>🔄 Conversor de Representações</h4>
                        <p>Veja como seu grafo é representado em diferentes estruturas de dados:</p>
                        <div class="converter-output" id="graph-representations">
                            <p class="placeholder">Crie um grafo acima para ver suas representações</p>
                        </div>
                    </div>
                </div>

                <!-- Algoritmos de Busca -->
                <div class="module-section">
                    <h3>🔍 Algoritmos de Busca em Grafos</h3>
                    
                    <div class="algorithm-comparison">
                        <div class="algorithm-card bfs-card">
                            <h4>BFS - Busca em Largura (Breadth-First Search)</h4>
                            <div class="algorithm-visual">
                                <pre>
Nível 0:    [A]
Nível 1:    [B, C]
Nível 2:    [D, E, F]
Nível 3:    [G]
                                </pre>
                            </div>
                            <div class="algorithm-details">
                                <p><strong>Estratégia:</strong> Explora por camadas (usa Fila)</p>
                                <p><strong>Complexidade:</strong> O(V + E)</p>
                                <p><strong>Uso:</strong> Menor caminho em grafos não ponderados</p>
                                <div class="code-example">
                                    <pre><code>function BFS(graph, start) {
  const queue = [start];
  const visited = new Set([start]);
  
  while (queue.length > 0) {
    const vertex = queue.shift();
    console.log(vertex);
    
    for (let neighbor of graph[vertex]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}</code></pre>
                                </div>
                            </div>
                        </div>

                        <div class="algorithm-card dfs-card">
                            <h4>DFS - Busca em Profundidade (Depth-First Search)</h4>
                            <div class="algorithm-visual">
                                <pre>
Caminho: A → B → D → E → volta → C → F → G
                                </pre>
                            </div>
                            <div class="algorithm-details">
                                <p><strong>Estratégia:</strong> Explora o mais fundo possível (usa Pilha)</p>
                                <p><strong>Complexidade:</strong> O(V + E)</p>
                                <p><strong>Uso:</strong> Detecção de ciclos, ordenação topológica</p>
                                <div class="code-example">
                                    <pre><code>function DFS(graph, start, visited = new Set()) {
  visited.add(start);
  console.log(start);
  
  for (let neighbor of graph[start]) {
    if (!visited.has(neighbor)) {
      DFS(graph, neighbor, visited);
    }
  }
}</code></pre>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="search-visualizer">
                        <h4>🎬 Visualizador de Busca</h4>
                        <div class="visualizer-controls">
                            <label>
                                Algoritmo:
                                <select id="search-algorithm">
                                    <option value="bfs">BFS - Busca em Largura</option>
                                    <option value="dfs">DFS - Busca em Profundidade</option>
                                </select>
                            </label>
                            <label>
                                Velocidade:
                                <input type="range" id="search-speed" min="1" max="5" value="3">
                                <span id="speed-label">Normal</span>
                            </label>
                            <button class="btn-primary" id="start-search">▶️ Iniciar Busca</button>
                            <button class="btn-secondary" id="reset-search">🔄 Resetar</button>
                        </div>
                        <div class="search-canvas-container">
                            <canvas id="search-canvas" width="800" height="400"></canvas>
                        </div>
                        <div class="search-steps" id="search-steps">
                            <h5>Passos da Busca:</h5>
                            <div id="steps-list"></div>
                        </div>
                    </div>
                </div>

                <!-- Caminhos Mínimos -->
                <div class="module-section">
                    <h3>🛣️ Algoritmos de Caminho Mínimo</h3>
                    
                    <div class="shortest-path-grid">
                        <div class="algorithm-card dijkstra-card">
                            <h4>Algoritmo de Dijkstra</h4>
                            <p class="algorithm-description">
                                Encontra o caminho mais curto de um vértice para todos os outros em grafos com pesos não-negativos.
                            </p>
                            <div class="algorithm-steps">
                                <h5>Como Funciona:</h5>
                                <ol>
                                    <li>Inicialize distância do vértice inicial como 0, outros como ∞</li>
                                    <li>Selecione vértice não visitado com menor distância</li>
                                    <li>Atualize distâncias dos vizinhos</li>
                                    <li>Marque vértice como visitado</li>
                                    <li>Repita até visitar todos</li>
                                </ol>
                            </div>
                            <div class="complexity-info">
                                <p><strong>Complexidade:</strong> O((V + E) log V) com heap</p>
                                <p><strong>Restrição:</strong> ⚠️ Não funciona com pesos negativos</p>
                            </div>
                            <div class="code-example">
                                <pre><code>function dijkstra(graph, start) {
  const distances = {};
  const visited = new Set();
  const pq = new PriorityQueue();
  
  // Inicializa distâncias
  for (let vertex in graph) {
    distances[vertex] = Infinity;
  }
  distances[start] = 0;
  pq.enqueue(start, 0);
  
  while (!pq.isEmpty()) {
    const current = pq.dequeue();
    if (visited.has(current)) continue;
    visited.add(current);
    
    for (let neighbor of graph[current]) {
      const newDist = distances[current] + neighbor.weight;
      if (newDist < distances[neighbor.node]) {
        distances[neighbor.node] = newDist;
        pq.enqueue(neighbor.node, newDist);
      }
    }
  }
  return distances;
}</code></pre>
                            </div>
                        </div>

                        <div class="algorithm-card bellman-ford-card">
                            <h4>Algoritmo de Bellman-Ford</h4>
                            <p class="algorithm-description">
                                Encontra caminhos mínimos mesmo com pesos negativos. Detecta ciclos negativos.
                            </p>
                            <div class="algorithm-steps">
                                <h5>Como Funciona:</h5>
                                <ol>
                                    <li>Inicialize distâncias (origem = 0, outros = ∞)</li>
                                    <li>Relaxe todas as arestas V-1 vezes</li>
                                    <li>Verifique ciclos negativos</li>
                                </ol>
                            </div>
                            <div class="complexity-info">
                                <p><strong>Complexidade:</strong> O(V × E)</p>
                                <p><strong>Vantagem:</strong> ✅ Funciona com pesos negativos</p>
                                <p><strong>Detecta:</strong> Ciclos negativos</p>
                            </div>
                            <div class="code-example">
                                <pre><code>function bellmanFord(graph, start) {
  const distances = {};
  for (let v in graph) distances[v] = Infinity;
  distances[start] = 0;
  
  // Relaxa todas arestas V-1 vezes
  for (let i = 0; i < V - 1; i++) {
    for (let edge of edges) {
      if (distances[edge.from] + edge.weight < 
          distances[edge.to]) {
        distances[edge.to] = 
          distances[edge.from] + edge.weight;
      }
    }
  }
  
  // Verifica ciclo negativo
  for (let edge of edges) {
    if (distances[edge.from] + edge.weight < 
        distances[edge.to]) {
      return "Ciclo negativo detectado!";
    }
  }
  return distances;
}</code></pre>
                            </div>
                        </div>
                    </div>

                    <div class="path-visualizer">
                        <h4>🗺️ Visualizador de Caminho Mínimo</h4>
                        <div class="path-controls">
                            <label>
                                Algoritmo:
                                <select id="path-algorithm">
                                    <option value="dijkstra">Dijkstra</option>
                                    <option value="bellman-ford">Bellman-Ford</option>
                                </select>
                            </label>
                            <label>
                                Vértice Inicial:
                                <select id="path-start">
                                    <option value="">Selecione...</option>
                                </select>
                            </label>
                            <label>
                                Vértice Final:
                                <select id="path-end">
                                    <option value="">Selecione...</option>
                                </select>
                            </label>
                            <button class="btn-primary" id="find-path">🔍 Encontrar Caminho</button>
                        </div>
                        <div class="path-result" id="path-result" style="display: none;">
                            <h5>Resultado:</h5>
                            <div class="result-info">
                                <p><strong>Caminho:</strong> <span id="path-sequence"></span></p>
                                <p><strong>Distância Total:</strong> <span id="path-distance"></span></p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Árvore Geradora Mínima -->
                <div class="module-section">
                    <h3>🌳 Árvore Geradora Mínima (MST)</h3>
                    
                    <div class="concept-card">
                        <h4>O que é MST?</h4>
                        <p>
                            Uma <strong>Árvore Geradora Mínima</strong> é uma subárvore que:
                        </p>
                        <ul>
                            <li>Conecta todos os vértices do grafo</li>
                            <li>Não possui ciclos</li>
                            <li>Tem a soma mínima dos pesos das arestas</li>
                        </ul>
                        <p><strong>Aplicações:</strong> Redes de computadores, distribuição de energia, planejamento urbano</p>
                    </div>

                    <div class="mst-algorithms-grid">
                        <div class="algorithm-card kruskal-card">
                            <h4>Algoritmo de Kruskal</h4>
                            <p><strong>Estratégia:</strong> Ordenar arestas por peso e adicionar uma por vez</p>
                            <div class="algorithm-steps">
                                <ol>
                                    <li>Ordene todas as arestas por peso crescente</li>
                                    <li>Para cada aresta (u, v):</li>
                                    <li>Se u e v não estão conectados, adicione aresta</li>
                                    <li>Use Union-Find para detectar ciclos</li>
                                </ol>
                            </div>
                            <p><strong>Complexidade:</strong> O(E log E)</p>
                        </div>

                        <div class="algorithm-card prim-card">
                            <h4>Algoritmo de Prim</h4>
                            <p><strong>Estratégia:</strong> Crescer árvore a partir de um vértice</p>
                            <div class="algorithm-steps">
                                <ol>
                                    <li>Comece com um vértice qualquer</li>
                                    <li>Adicione a aresta de menor peso que conecta a árvore a um novo vértice</li>
                                    <li>Repita até incluir todos os vértices</li>
                                </ol>
                            </div>
                            <p><strong>Complexidade:</strong> O(E log V) com heap</p>
                        </div>
                    </div>
                </div>

                <!-- Exercícios Interativos -->
                <div class="module-section">
                    <h3>💪 Exercícios Práticos</h3>
                    
                    <div class="exercises-container">
                        <div class="exercise-card">
                            <h4>Exercício 1: Criar um Grafo</h4>
                            <p>Crie um grafo que represente uma rede social com 5 pessoas.</p>
                            <button class="btn-primary">Começar</button>
                        </div>

                        <div class="exercise-card">
                            <h4>Exercício 2: Encontrar Caminho</h4>
                            <p>Use BFS para encontrar o menor caminho entre dois vértices.</p>
                            <button class="btn-primary">Começar</button>
                        </div>

                        <div class="exercise-card">
                            <h4>Exercício 3: Detectar Ciclos</h4>
                            <p>Implemente DFS para detectar se um grafo contém ciclos.</p>
                            <button class="btn-primary">Começar</button>
                        </div>

                        <div class="exercise-card">
                            <h4>Exercício 4: Caminho Mínimo</h4>
                            <p>Use Dijkstra para encontrar a rota mais curta em um mapa.</p>
                            <button class="btn-primary">Começar</button>
                        </div>
                    </div>
                </div>

                <!-- Navegação -->
                <div class="module-navigation-buttons">
                    <button class="btn btn-outline" data-next-module="balanced-trees">← Árvores Balanceadas</button>
                    <button class="btn btn-primary" data-next-module="sorting">Algoritmos de Ordenação →</button>
                </div>
            </div>
        `;
    }
};

// Export module
if (typeof window !== 'undefined') {
    window.GraphsModule = GraphsModule;
    console.log('✅ GraphsModule carregado');
}
