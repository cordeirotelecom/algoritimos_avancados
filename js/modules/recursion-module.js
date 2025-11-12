// ===== TREE AND GRAPH MODULES =====

/**
 * Módulos sobre Árvores Binárias, Árvores Balanceadas e Grafos
 * Prof. Eng. Computação Vagner Cordeiro
 */

// ===== TREES MODULE =====
class TreesModule {
    static render() {
        return `
            <div class="module-content active">
                <div class="module-header">
                    <h1 class="module-title"><span>🌳</span><span>Árvores Binárias de Busca</span></h1>
                    <p class="module-description">
                        Estrutura hierárquica fundamental para organização eficiente de dados.
                    </p>
                </div>

                <div class="module-section">
                    <h2 class="section-title">📚 Conceitos Fundamentais</h2>
                    <div class="section-content">
                        <p>
                            Uma <strong>Árvore Binária de Busca (BST)</strong> é uma estrutura onde cada nó
                            tem no máximo dois filhos, e para todo nó:
                        </p>
                        <ul>
                            <li>Valores à <strong>esquerda</strong> são <strong>menores</strong></li>
                            <li>Valores à <strong>direita</strong> são <strong>maiores</strong></li>
                        </ul>

                        <div class="info-box">
                            <div class="info-box-title">🌳 Estrutura Visual</div>
                            <pre>
          50
         /  \\
       30    70
      /  \\   /  \\
    20  40 60  80

Esquerda < Raiz < Direita
                            </pre>
                        </div>

                        <h3>🔹 Terminologia</h3>
                        <ul>
                            <li><strong>Raiz:</strong> Nó no topo</li>
                            <li><strong>Folha:</strong> Nó sem filhos</li>
                            <li><strong>Altura:</strong> Nível máximo da árvore</li>
                            <li><strong>Profundidade:</strong> Distância da raiz até um nó</li>
                        </ul>
                    </div>
                </div>

                <div class="module-section">
                    <h2 class="section-title">➕ Operação: Inserção</h2>
                    <div class="section-content">
                        <p>
                            <strong>Complexidade:</strong>
                            <span class="complexity-badge logarithmic">O(log n)</span> médio,
                            <span class="complexity-badge linear">O(n)</span> pior caso
                        </p>

                        <div class="code-example">
<span class="keyword">class</span> <span class="function">Node</span> {
    <span class="keyword">constructor</span>(valor) {
        <span class="keyword">this</span>.valor = valor;
        <span class="keyword">this</span>.esquerda = <span class="keyword">null</span>;
        <span class="keyword">this</span>.direita = <span class="keyword">null</span>;
    }
}

<span class="keyword">class</span> <span class="function">BST</span> {
    <span class="keyword">constructor</span>() {
        <span class="keyword">this</span>.raiz = <span class="keyword">null</span>;
    }

    <span class="function">inserir</span>(valor) {
        <span class="keyword">const</span> novoNo = <span class="keyword">new</span> <span class="function">Node</span>(valor);
        
        <span class="keyword">if</span> (<span class="keyword">this</span>.raiz === <span class="keyword">null</span>) {
            <span class="keyword">this</span>.raiz = novoNo;
            <span class="keyword">return</span>;
        }

        <span class="keyword">let</span> atual = <span class="keyword">this</span>.raiz;
        <span class="keyword">while</span> (<span class="keyword">true</span>) {
            <span class="keyword">if</span> (valor < atual.valor) {
                <span class="keyword">if</span> (atual.esquerda === <span class="keyword">null</span>) {
                    atual.esquerda = novoNo;
                    <span class="keyword">return</span>;
                }
                atual = atual.esquerda;
            } <span class="keyword">else</span> {
                <span class="keyword">if</span> (atual.direita === <span class="keyword">null</span>) {
                    atual.direita = novoNo;
                    <span class="keyword">return</span>;
                }
                atual = atual.direita;
            }
        }
    }
}
                        </div>
                    </div>
                </div>

                <div class="module-section">
                    <h2 class="section-title">🔍 Operação: Busca</h2>
                    <div class="section-content">
                        <p>
                            <strong>Complexidade:</strong>
                            <span class="complexity-badge logarithmic">O(log n)</span> médio
                        </p>

                        <div class="code-example">
<span class="function">buscar</span>(valor, no = <span class="keyword">this</span>.raiz) {
    <span class="keyword">if</span> (no === <span class="keyword">null</span>) <span class="keyword">return false</span>;
    
    <span class="keyword">if</span> (valor === no.valor) <span class="keyword">return true</span>;
    
    <span class="keyword">if</span> (valor < no.valor) {
        <span class="keyword">return</span> <span class="keyword">this</span>.<span class="function">buscar</span>(valor, no.esquerda);
    } <span class="keyword">else</span> {
        <span class="keyword">return</span> <span class="keyword">this</span>.<span class="function">buscar</span>(valor, no.direita);
    }
}
                        </div>
                    </div>
                </div>

                <div class="module-section">
                    <h2 class="section-title">🔄 Percursos em Árvore</h2>
                    <div class="section-content">
                        <h3>🔹 In-Order (Em Ordem)</h3>
                        <p>Esquerda → Raiz → Direita | Resultado: <strong>Ordenado</strong></p>
                        <div class="code-example">
<span class="function">inOrder</span>(no = <span class="keyword">this</span>.raiz) {
    <span class="keyword">if</span> (no !== <span class="keyword">null</span>) {
        <span class="keyword">this</span>.<span class="function">inOrder</span>(no.esquerda);
        console.log(no.valor);
        <span class="keyword">this</span>.<span class="function">inOrder</span>(no.direita);
    }
}
<span class="comment">// Saída: 20, 30, 40, 50, 60, 70, 80</span>
                        </div>

                        <h3>🔹 Pre-Order (Pré-Ordem)</h3>
                        <p>Raiz → Esquerda → Direita | Útil para: <strong>Cópias</strong></p>
                        <div class="code-example">
<span class="function">preOrder</span>(no = <span class="keyword">this</span>.raiz) {
    <span class="keyword">if</span> (no !== <span class="keyword">null</span>) {
        console.log(no.valor);
        <span class="keyword">this</span>.<span class="function">preOrder</span>(no.esquerda);
        <span class="keyword">this</span>.<span class="function">preOrder</span>(no.direita);
    }
}
<span class="comment">// Saída: 50, 30, 20, 40, 70, 60, 80</span>
                        </div>

                        <h3>🔹 Post-Order (Pós-Ordem)</h3>
                        <p>Esquerda → Direita → Raiz | Útil para: <strong>Deletar árvore</strong></p>
                        <div class="code-example">
<span class="function">postOrder</span>(no = <span class="keyword">this</span>.raiz) {
    <span class="keyword">if</span> (no !== <span class="keyword">null</span>) {
        <span class="keyword">this</span>.<span class="function">postOrder</span>(no.esquerda);
        <span class="keyword">this</span>.<span class="function">postOrder</span>(no.direita);
        console.log(no.valor);
    }
}
<span class="comment">// Saída: 20, 40, 30, 60, 80, 70, 50</span>
                        </div>
                    </div>
                </div>

                <div class="module-navigation-footer">
                    <button class="btn btn-secondary" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
                        ⬆️ Voltar ao Topo
                    </button>
                    <button class="btn btn-primary" data-next-module="balanced-trees">
                        Próximo: Árvores Balanceadas ➡️
                    </button>
                </div>
            </div>
        `;
    }
}

// ===== BALANCED TREES MODULE =====
class BalancedTreesModule {
    static render() {
        return `
            <div class="module-content active">
                <div class="module-header">
                    <h1 class="module-title"><span>⚖️</span><span>Árvores Balanceadas</span></h1>
                    <p class="module-description">
                        AVL e DSW: garantindo eficiência com árvores equilibradas.
                    </p>
                </div>

                <div class="module-section">
                    <h2 class="section-title">🎯 Por Que Balancear?</h2>
                    <div class="section-content">
                        <p>
                            BST não balanceada pode degenerar em <strong>lista</strong>, perdendo eficiência.
                        </p>

                        <div class="info-box warning">
                            <div class="info-box-title">⚠️ Árvore Degenerada</div>
                            <pre>
Inserção: 10, 20, 30, 40, 50

   10
     \\
      20
        \\
         30
           \\
            40
              \\
               50

Complexidade: O(n) - igual a lista!
                            </pre>
                        </div>

                        <div class="info-box success">
                            <div class="info-box-title">✅ Árvore Balanceada</div>
                            <pre>
         30
        /  \\
      20    40
     /        \\
   10         50

Complexidade: O(log n) - eficiente!
                            </pre>
                        </div>
                    </div>
                </div>

                <div class="module-section">
                    <h2 class="section-title">🌟 Árvore AVL</h2>
                    <div class="section-content">
                        <p>
                            <strong>AVL</strong> (Adelson-Velsky e Landis) mantém altura balanceada
                            através de <strong>rotações</strong>.
                        </p>

                        <h3>🔹 Fator de Balanceamento</h3>
                        <p>FB = altura(subárvore esquerda) - altura(subárvore direita)</p>
                        <p>Árvore balanceada: <strong>|FB| ≤ 1</strong></p>

                        <h3>🔹 Rotações</h3>
                        <div class="code-example">
<span class="comment">// Rotação à Direita (Right Rotation)</span>
<span class="function">rotacaoDireita</span>(y) {
    <span class="keyword">let</span> x = y.esquerda;
    <span class="keyword">let</span> T2 = x.direita;
    
    x.direita = y;
    y.esquerda = T2;
    
    <span class="keyword">return</span> x; <span class="comment">// Nova raiz</span>
}

<span class="comment">// Rotação à Esquerda (Left Rotation)</span>
<span class="function">rotacaoEsquerda</span>(x) {
    <span class="keyword">let</span> y = x.direita;
    <span class="keyword">let</span> T2 = y.esquerda;
    
    y.esquerda = x;
    x.direita = T2;
    
    <span class="keyword">return</span> y; <span class="comment">// Nova raiz</span>
}
                        </div>

                        <p>
                            <strong>Complexidade:</strong>
                            Todas as operações: <span class="complexity-badge logarithmic">O(log n)</span> <strong>garantido</strong>
                        </p>
                    </div>
                </div>

                <div class="module-section">
                    <h2 class="section-title">🔧 Algoritmo DSW</h2>
                    <div class="section-content">
                        <p>
                            <strong>Day-Stout-Warren</strong>: balanceia árvore existente em <span class="complexity-badge linear">O(n)</span>
                        </p>

                        <h3>🔹 Passos do DSW</h3>
                        <ol>
                            <li><strong>Criar Backbone:</strong> Transformar em lista (vine)</li>
                            <li><strong>Comprimir:</strong> Aplicar rotações para balancear</li>
                        </ol>

                        <div class="info-box">
                            <div class="info-box-title">📊 Aplicações</div>
                            <ul>
                                <li>Balancear BST não balanceada existente</li>
                                <li>Reconstruir após muitas operações</li>
                                <li>Inicialização de banco de dados</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="module-navigation-footer">
                    <button class="btn btn-secondary" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
                        ⬆️ Voltar ao Topo
                    </button>
                    <button class="btn btn-primary" data-next-module="graphs">
                        Próximo: Grafos ➡️
                    </button>
                </div>
            </div>
        `;
    }
}

// ===== GRAPHS MODULE =====
class GraphsModule {
    static render() {
        return `
            <div class="module-content active">
                <div class="module-header">
                    <h1 class="module-title"><span>🕸️</span><span>Grafos</span></h1>
                    <p class="module-description">
                        Estruturas para modelar relacionamentos: redes, rotas, dependências e muito mais.
                    </p>
                </div>

                <div class="module-section">
                    <h2 class="section-title">📚 Conceitos de Grafos</h2>
                    <div class="section-content">
                        <p>
                            Um <strong>grafo</strong> G = (V, E) consiste em:
                        </p>
                        <ul>
                            <li><strong>V (Vértices):</strong> Conjunto de nós</li>
                            <li><strong>E (Arestas):</strong> Conjunto de conexões entre vértices</li>
                        </ul>

                        <h3>🔹 Tipos de Grafos</h3>
                        <ul>
                            <li><strong>Direcionado:</strong> Arestas têm direção (A → B)</li>
                            <li><strong>Não-direcionado:</strong> Arestas bidirecionais (A — B)</li>
                            <li><strong>Ponderado:</strong> Arestas têm peso/custo</li>
                            <li><strong>Não-ponderado:</strong> Todas arestas iguais</li>
                        </ul>

                        <div class="info-box">
                            <div class="info-box-title">🌐 Aplicações</div>
                            <ul>
                                <li>Redes sociais (amizades, seguidores)</li>
                                <li>Mapas e rotas (GPS, navegação)</li>
                                <li>Dependências (tarefas, compilação)</li>
                                <li>Redes de computadores</li>
                                <li>Sistemas de recomendação</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="module-section">
                    <h2 class="section-title">📊 Representações</h2>
                    <div class="section-content">
                        <h3>🔹 Matriz de Adjacência</h3>
                        <p>Matriz V x V onde [i][j] = 1 se existe aresta i→j</p>
                        <div class="code-example">
<span class="comment">// Grafo: 0→1, 0→2, 1→2, 2→3</span>
<span class="keyword">let</span> matriz = [
    [<span class="number">0</span>, <span class="number">1</span>, <span class="number">1</span>, <span class="number">0</span>],  <span class="comment">// vértice 0</span>
    [<span class="number">0</span>, <span class="number">0</span>, <span class="number">1</span>, <span class="number">0</span>],  <span class="comment">// vértice 1</span>
    [<span class="number">0</span>, <span class="number">0</span>, <span class="number">0</span>, <span class="number">1</span>],  <span class="comment">// vértice 2</span>
    [<span class="number">0</span>, <span class="number">0</span>, <span class="number">0</span>, <span class="number">0</span>]   <span class="comment">// vértice 3</span>
];

<span class="comment">// Espaço: O(V²)</span>
<span class="comment">// Verificar aresta: O(1)</span>
                        </div>

                        <h3>🔹 Lista de Adjacência</h3>
                        <p>Array de listas: cada vértice guarda seus vizinhos</p>
                        <div class="code-example">
<span class="keyword">let</span> lista = {
    <span class="number">0</span>: [<span class="number">1</span>, <span class="number">2</span>],
    <span class="number">1</span>: [<span class="number">2</span>],
    <span class="number">2</span>: [<span class="number">3</span>],
    <span class="number">3</span>: []
};

<span class="comment">// Espaço: O(V + E)</span>
<span class="comment">// Melhor para grafos esparsos</span>
                        </div>
                    </div>
                </div>

                <div class="module-section">
                    <h2 class="section-title">🔍 Algoritmos de Busca</h2>
                    <div class="section-content">
                        <h3>🔹 BFS - Busca em Largura</h3>
                        <p>Explora por níveis usando <strong>fila</strong></p>
                        <p><strong>Complexidade:</strong> <span class="complexity-badge linear">O(V + E)</span></p>

                        <div class="code-example">
<span class="keyword">function</span> <span class="function">BFS</span>(grafo, inicio) {
    <span class="keyword">let</span> visitados = <span class="keyword">new</span> <span class="function">Set</span>();
    <span class="keyword">let</span> fila = [inicio];
    
    <span class="keyword">while</span> (fila.length > <span class="number">0</span>) {
        <span class="keyword">let</span> v = fila.shift();
        <span class="keyword">if</span> (visitados.has(v)) <span class="keyword">continue</span>;
        
        visitados.add(v);
        console.log(v);
        
        <span class="keyword">for</span> (<span class="keyword">let</span> vizinho <span class="keyword">of</span> grafo[v]) {
            <span class="keyword">if</span> (!visitados.has(vizinho)) {
                fila.push(vizinho);
            }
        }
    }
}
                        </div>

                        <h3>🔹 DFS - Busca em Profundidade</h3>
                        <p>Explora o mais fundo possível usando <strong>pilha/recursão</strong></p>
                        <p><strong>Complexidade:</strong> <span class="complexity-badge linear">O(V + E)</span></p>

                        <div class="code-example">
<span class="keyword">function</span> <span class="function">DFS</span>(grafo, v, visitados = <span class="keyword">new</span> <span class="function">Set</span>()) {
    visitados.add(v);
    console.log(v);
    
    <span class="keyword">for</span> (<span class="keyword">let</span> vizinho <span class="keyword">of</span> grafo[v]) {
        <span class="keyword">if</span> (!visitados.has(vizinho)) {
            <span class="function">DFS</span>(grafo, vizinho, visitados);
        }
    }
}
                        </div>
                    </div>
                </div>

                <div class="module-section">
                    <h2 class="section-title">🛣️ Caminho Mínimo</h2>
                    <div class="section-content">
                        <h3>🔹 Algoritmo de Dijkstra</h3>
                        <p>Encontra menor caminho de um vértice para todos os outros</p>
                        <p><strong>Complexidade:</strong> <span class="complexity-badge quadratic">O(V²)</span> ou <span class="complexity-badge linear">O((V+E) log V)</span> com heap</p>

                        <div class="code-example">
<span class="keyword">function</span> <span class="function">dijkstra</span>(grafo, inicio) {
    <span class="keyword">let</span> distancias = {};
    <span class="keyword">let</span> visitados = <span class="keyword">new</span> <span class="function">Set</span>();
    
    <span class="comment">// Inicializar distâncias</span>
    <span class="keyword">for</span> (<span class="keyword">let</span> v <span class="keyword">in</span> grafo) {
        distancias[v] = <span class="number">Infinity</span>;
    }
    distancias[inicio] = <span class="number">0</span>;
    
    <span class="comment">// Processar vértices</span>
    <span class="keyword">while</span> (visitados.size < Object.keys(grafo).length) {
        <span class="keyword">let</span> u = menorDistancia(distancias, visitados);
        visitados.add(u);
        
        <span class="keyword">for</span> (<span class="keyword">let</span> [v, peso] <span class="keyword">of</span> grafo[u]) {
            <span class="keyword">let</span> novaDistancia = distancias[u] + peso;
            <span class="keyword">if</span> (novaDistancia < distancias[v]) {
                distancias[v] = novaDistancia;
            }
        }
    }
    
    <span class="keyword">return</span> distancias;
}
                        </div>

                        <h3>🔹 Floyd-Warshall</h3>
                        <p>Caminho mínimo entre <strong>todos os pares</strong> de vértices</p>
                        <p><strong>Complexidade:</strong> <span class="complexity-badge exponential">O(V³)</span></p>

                        <div class="info-box">
                            <div class="info-box-title">🎯 Quando Usar</div>
                            <ul>
                                <li><strong>Dijkstra:</strong> Menor caminho de um ponto</li>
                                <li><strong>BFS:</strong> Grafos não-ponderados</li>
                                <li><strong>Floyd-Warshall:</strong> Todos os pares, grafos pequenos</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="module-navigation-footer">
                    <button class="btn btn-secondary" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
                        ⬆️ Voltar ao Topo
                    </button>
                    <button class="btn btn-primary" data-next-module="sorting">
                        Voltar: Algoritmos de Ordenação 🔄
                    </button>
                </div>
            </div>
        `;
    }
}

// Export modules
if (typeof window !== 'undefined') {
    window.TreesModule = TreesModule;
    window.BalancedTreesModule = BalancedTreesModule;
    window.GraphsModule = GraphsModule;
    console.log('✅ Tree and Graph modules loaded');
}
