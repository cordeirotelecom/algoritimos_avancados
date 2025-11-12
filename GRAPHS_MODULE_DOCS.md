# 📊 Módulo de Grafos - Documentação Completa

## 🎯 Visão Geral

O **Módulo de Grafos** é um sistema educacional interativo completo que ensina:
- Teoria dos Grafos
- Representações de grafos
- Algoritmos de busca (BFS, DFS)
- Algoritmos de caminho mínimo (Dijkstra, Bellman-Ford)
- Árvores Geradoras Mínimas (Kruskal, Prim)

## 📁 Arquivos do Módulo

### JavaScript
1. **js/modules/graphs-module.js** (550 linhas)
   - Estrutura principal do módulo
   - Conteúdo educacional em HTML
   - Teoria dos grafos e aplicações

2. **js/graph-visualization.js** (500 linhas)
   - Visualizador interativo de grafos
   - Ferramentas de criação e edição
   - Geração de representações

3. **js/graph-algorithms.js** (600 linhas)
   - Implementação de BFS e DFS
   - Dijkstra e Bellman-Ford
   - Animação passo a passo

### CSS
4. **css/graphs-module.css** (650 linhas)
   - Estilos modernos e responsivos
   - Animações e transições
   - Layout profissional

## 🎨 Componentes Principais

### 1. Visualizador Interativo de Grafos

**Ferramentas Disponíveis:**
- ➕ **Adicionar Vértice**: Clique no canvas
- 🔗 **Adicionar Aresta**: Selecione dois vértices
- ❌ **Remover**: Remove vértices/arestas
- 👆 **Selecionar**: Arrasta e move vértices

**Configurações:**
- ✓ Grafo Direcionado/Não-Direcionado
- ✓ Arestas Ponderadas
- ✓ Mostrar/Ocultar Rótulos

**Exemplos Pré-configurados:**
1. Grafo Simples (5 vértices)
2. Grafo Completo (5 vértices)
3. Rede Social (6 pessoas)
4. Grafo Ponderado (mapa com distâncias)

### 2. Sistema de Representações

Converte automaticamente o grafo criado para:

#### Matriz de Adjacência
```
    A B C
A [[0, 1, 1],
B  [0, 0, 1],
C  [0, 0, 0]]
```
- **Complexidade de Espaço**: O(V²)
- **Verificar aresta**: O(1)
- **Melhor para**: Grafos densos

#### Lista de Adjacência
```javascript
{
  A: [B, C],
  B: [C],
  C: []
}
```
- **Complexidade de Espaço**: O(V + E)
- **Verificar aresta**: O(grau do vértice)
- **Melhor para**: Grafos esparsos

#### Lista de Arestas
```javascript
[
  {from: 'A', to: 'B', weight: 5},
  {from: 'A', to: 'C', weight: 3},
  {from: 'B', to: 'C', weight: 2}
]
```
- **Complexidade de Espaço**: O(E)
- **Verificar aresta**: O(E)
- **Melhor para**: Algoritmos de aresta

### 3. Visualizador de Algoritmos de Busca

#### BFS (Busca em Largura)
- **Estratégia**: Explora por camadas (usa Fila - FIFO)
- **Complexidade**: O(V + E)
- **Uso**: Menor caminho em grafos não ponderados
- **Visualização**: 
  - Verde: Vértices visitados
  - Amarelo: Vértice sendo explorado
  - Fila em tempo real

#### DFS (Busca em Profundidade)
- **Estratégia**: Vai o mais fundo possível (usa Pilha/Recursão)
- **Complexidade**: O(V + E)
- **Uso**: Detecção de ciclos, ordenação topológica
- **Visualização**:
  - Mostra profundidade de cada vértice
  - Destaca backtracking
  - Caminho percorrido

**Controles:**
- Seletor de algoritmo (BFS/DFS)
- Controle de velocidade (5 níveis)
- Passos detalhados com explicações
- Estado da fila/pilha

### 4. Algoritmos de Caminho Mínimo

#### Dijkstra
```javascript
function dijkstra(graph, start, end) {
  // 1. Inicializa distâncias
  // 2. Usa fila de prioridade
  // 3. Relaxa arestas
  // 4. Reconstrói caminho
  return { path, distance };
}
```
- **Complexidade**: O((V + E) log V) com heap
- **Restrição**: ⚠️ Não funciona com pesos negativos
- **Garantia**: Sempre encontra caminho ótimo (sem pesos negativos)

#### Bellman-Ford
```javascript
function bellmanFord(graph, start, end) {
  // 1. Inicializa distâncias
  // 2. Relaxa todas arestas V-1 vezes
  // 3. Detecta ciclos negativos
  // 4. Reconstrói caminho
  return { path, distance };
}
```
- **Complexidade**: O(V × E)
- **Vantagem**: ✅ Funciona com pesos negativos
- **Detecta**: Ciclos negativos (impossível encontrar menor caminho)

**Features:**
- Seleção de vértice inicial e final
- Visualização do caminho encontrado
- Distância total calculada
- Comparação visual dos algoritmos

## 🎓 Conteúdo Educacional

### Tipos de Grafos Explicados

1. **Grafo Não-Direcionado**
   - Arestas bidirecionais
   - Exemplo: Amizades no Facebook

2. **Grafo Direcionado (Dígrafo)**
   - Arestas com direção
   - Exemplo: Seguidores no Twitter

3. **Grafo Ponderado**
   - Arestas com pesos/custos
   - Exemplo: Distâncias entre cidades

4. **Grafo Cíclico**
   - Contém pelo menos um ciclo
   - Exemplo: Rotas circulares

5. **Grafo Acíclico (DAG)**
   - Sem ciclos
   - Exemplo: Árvore genealógica

6. **Grafo Completo**
   - Todos os vértices conectados
   - Arestas: n(n-1)/2 para n vértices

### Aplicações Práticas

- 🌐 **Redes Sociais**: Modelagem de conexões
- 🗺️ **GPS/Mapas**: Rotas e navegação
- 🌐 **Internet**: Topologia de redes
- 🧬 **Biologia**: Redes de interação proteica

## 💻 API e Uso

### GraphVisualization

```javascript
const viz = new GraphVisualization();
viz.initialize();

// Adicionar vértice
viz.addVertex(x, y);

// Adicionar aresta
viz.addEdge(fromVertex, toVertex, weight);

// Carregar exemplo
viz.loadExample('simple');

// Exportar grafo
viz.exportGraph(); // Gera JSON para download
```

### GraphAlgorithmsVisualizer

```javascript
const algoViz = new GraphAlgorithmsVisualizer();
algoViz.initialize();

// Executar BFS
algoViz.currentAlgorithm = 'bfs';
algoViz.startSearch();

// Encontrar caminho mínimo
algoViz.dijkstra(startId, endId);
algoViz.bellmanFord(startId, endId);
```

## 🎨 Personalização

### Cores do Tema
```javascript
colors: {
    vertex: '#667eea',      // Vértice padrão
    visited: '#4CAF50',     // Visitado
    visiting: '#FFC107',    // Sendo explorado
    path: '#FF6B6B',        // Caminho encontrado
    edge: '#999',           // Aresta padrão
    edgeActive: '#4CAF50'   // Aresta ativa
}
```

### Configurações de Animação
```javascript
animationSpeed: 500,  // 500ms por passo
speeds: [1000, 750, 500, 250, 100]  // 5 níveis
```

## 📊 Estatísticas e Informações

O painel de informações exibe em tempo real:
- **Vértices**: Quantidade total
- **Arestas**: Quantidade total
- **Tipo**: Direcionado/Não-Direcionado
- **Densidade**: Percentual de arestas possíveis

## 🔧 Integrações

### Com Sistema de Módulos
```javascript
// Em module-system.js
this.modules.set('graphs', {
    name: 'Grafos',
    icon: '🕸️',
    description: 'Conceitos, representações e algoritmos em grafos',
    render: () => this.renderGraphsModule()
});
```

### Inicialização Automática
```javascript
// Quando módulo é carregado
if (moduleId === 'graphs') {
    window.initializeGraphVisualization();
    window.initializeGraphAlgorithms();
}
```

## 🎯 Exercícios Práticos (Planejados)

1. **Criar um Grafo**: Modelar uma rede social
2. **Encontrar Caminho**: Usar BFS entre dois pontos
3. **Detectar Ciclos**: Implementar DFS
4. **Caminho Mínimo**: Resolver problemas de roteamento

## 📈 Melhorias Futuras

### Funcionalidades Planejadas
- [ ] Algoritmo de Kruskal (MST)
- [ ] Algoritmo de Prim (MST)
- [ ] Floyd-Warshall (todos os caminhos)
- [ ] Ordenação Topológica
- [ ] Componentes Fortemente Conectados
- [ ] Coloração de Grafos
- [ ] Fluxo Máximo (Ford-Fulkerson)
- [ ] Sistema de exercícios interativos
- [ ] Gamificação (conquistas para grafos)
- [ ] Import/Export de grafos em formatos padrão

### Otimizações Técnicas
- [ ] WebGL para grafos muito grandes
- [ ] Layout automático (Force-Directed)
- [ ] Zoom e pan no canvas
- [ ] Desfazer/Refazer ações
- [ ] Temas personalizados

## 🐛 Problemas Conhecidos

Nenhum problema conhecido no momento. ✅

## 📝 Notas de Desenvolvimento

### Arquitetura
- Classes ES6 modulares
- Canvas API para renderização
- Event-driven para interatividade
- Separação clara entre modelo e visualização

### Performance
- Otimizado para até 100 vértices
- Renderização eficiente com requestAnimationFrame
- Detecção de colisão otimizada

### Acessibilidade
- Instruções claras
- Feedback visual
- Controles intuitivos
- Responsivo para mobile

## 🚀 Como Usar

1. **Navegar até o módulo**:
   - Clique em "🕸️ Grafos" no menu lateral

2. **Criar um grafo**:
   - Selecione "Adicionar Vértice"
   - Clique no canvas para criar vértices
   - Selecione "Adicionar Aresta"
   - Clique em dois vértices para conectá-los

3. **Executar algoritmos**:
   - Role até "Visualizador de Busca"
   - Escolha BFS ou DFS
   - Ajuste velocidade
   - Clique em "Iniciar Busca"

4. **Encontrar caminhos**:
   - Role até "Caminho Mínimo"
   - Selecione vértices inicial e final
   - Escolha Dijkstra ou Bellman-Ford
   - Clique em "Encontrar Caminho"

## 📚 Recursos Educacionais

### Conceitos Abordados
✓ Definição formal de grafos
✓ Terminologia (vértices, arestas, grau)
✓ Tipos de grafos
✓ Representações computacionais
✓ Complexidade dos algoritmos
✓ Trade-offs entre representações
✓ Aplicações práticas

### Didática
- Explicações passo a passo
- Visualização em tempo real
- Código comentado
- Exemplos práticos
- Comparações de complexidade

## 🏆 Conquistas

O sistema de gamificação pode ser estendido para incluir:
- 🎯 "Primeiro Grafo": Criar seu primeiro grafo
- 🔍 "Explorador": Executar BFS e DFS
- 🛣️ "Navegador": Encontrar 10 caminhos mínimos
- 🌟 "Mestre dos Grafos": Completar todos os exercícios

## 📖 Referências

- **Cormen et al.** - Introduction to Algorithms (CLRS)
- **Sedgewick & Wayne** - Algorithms (4th Edition)
- **Skiena** - The Algorithm Design Manual

---

**Desenvolvido por**: Prof. Eng. Computação Vagner Cordeiro  
**Versão**: 1.0  
**Data**: 2024  
**Status**: ✅ Completo e Funcional
