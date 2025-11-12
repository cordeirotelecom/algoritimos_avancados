// ===== GRAPH ALGORITHMS VISUALIZER =====

class GraphAlgorithmsVisualizer {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.graph = null;
        this.vertices = [];
        this.edges = [];
        
        this.currentAlgorithm = null;
        this.animationSteps = [];
        this.currentStep = 0;
        this.isAnimating = false;
        this.animationSpeed = 500;
        
        this.colors = {
            default: '#667eea',
            visited: '#4CAF50',
            visiting: '#FFC107',
            path: '#FF6B6B',
            edge: '#999',
            edgeActive: '#4CAF50',
            text: '#fff'
        };
    }
    
    initialize() {
        console.log('🔍 Inicializando GraphAlgorithmsVisualizer...');
        this.canvas = document.getElementById('search-canvas');
        if (!this.canvas) {
            console.error('❌ Canvas #search-canvas não encontrado!');
            return false;
        }
        
        console.log('✅ Canvas de busca encontrado:', this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.setupEventListeners();
        this.createExampleGraph();
        console.log('✅ GraphAlgorithmsVisualizer inicializado!');
        return true;
    }
    
    setupEventListeners() {
        console.log('🔧 Configurando listeners de algoritmos...');
        const startBtn = document.getElementById('start-search');
        const resetBtn = document.getElementById('reset-search');
        const algoSelect = document.getElementById('search-algorithm');
        const speedSlider = document.getElementById('search-speed');
        
        if (startBtn) console.log('✅ Botão start-search encontrado');
        if (resetBtn) console.log('✅ Botão reset-search encontrado');
        if (algoSelect) console.log('✅ Select search-algorithm encontrado');
        if (speedSlider) console.log('✅ Slider search-speed encontrado');
        
        startBtn?.addEventListener('click', () => this.startSearch());
        resetBtn?.addEventListener('click', () => this.reset());
        
        algoSelect?.addEventListener('change', (e) => {
            this.currentAlgorithm = e.target.value;
        });
        
        speedSlider?.addEventListener('input', (e) => {
            const speeds = [1000, 750, 500, 250, 100];
            const labels = ['Muito Lento', 'Lento', 'Normal', 'Rápido', 'Muito Rápido'];
            this.animationSpeed = speeds[e.target.value - 1];
            document.getElementById('speed-label').textContent = labels[e.target.value - 1];
        });
        
        // Path finder
        document.getElementById('find-path')?.addEventListener('click', () => {
            this.findShortestPath();
        });
    }
    
    createExampleGraph() {
        // Cria um grafo de exemplo para demonstração
        this.vertices = [
            { id: 'A', x: 150, y: 100, label: 'A' },
            { id: 'B', x: 350, y: 100, label: 'B' },
            { id: 'C', x: 550, y: 100, label: 'C' },
            { id: 'D', x: 150, y: 250, label: 'D' },
            { id: 'E', x: 350, y: 250, label: 'E' },
            { id: 'F', x: 550, y: 250, label: 'F' },
            { id: 'G', x: 350, y: 350, label: 'G' }
        ];
        
        this.edges = [
            { from: 'A', to: 'B', weight: 4 },
            { from: 'A', to: 'D', weight: 2 },
            { from: 'B', to: 'C', weight: 3 },
            { from: 'B', to: 'E', weight: 1 },
            { from: 'C', to: 'F', weight: 5 },
            { from: 'D', to: 'E', weight: 3 },
            { from: 'E', to: 'F', weight: 2 },
            { from: 'E', to: 'G', weight: 4 },
            { from: 'F', to: 'G', weight: 1 }
        ];
        
        // Atualiza seletores
        this.updateVertexSelectors();
        this.render();
    }
    
    updateVertexSelectors() {
        const startSelect = document.getElementById('path-start');
        const endSelect = document.getElementById('path-end');
        
        if (startSelect && endSelect) {
            startSelect.innerHTML = '<option value="">Selecione...</option>';
            endSelect.innerHTML = '<option value="">Selecione...</option>';
            
            this.vertices.forEach(v => {
                startSelect.innerHTML += `<option value="${v.id}">${v.label}</option>`;
                endSelect.innerHTML += `<option value="${v.id}">${v.label}</option>`;
            });
        }
    }
    
    startSearch() {
        if (this.isAnimating) return;
        
        this.reset();
        const algorithm = document.getElementById('search-algorithm')?.value || 'bfs';
        
        if (algorithm === 'bfs') {
            this.animationSteps = this.generateBFSSteps();
        } else if (algorithm === 'dfs') {
            this.animationSteps = this.generateDFSSteps();
        }
        
        this.currentStep = 0;
        this.isAnimating = true;
        this.animate();
    }
    
    generateBFSSteps() {
        const steps = [];
        const visited = new Set();
        const queue = [this.vertices[0].id];
        visited.add(this.vertices[0].id);
        
        steps.push({
            description: `Iniciando BFS a partir de ${this.vertices[0].label}`,
            visitedNodes: [this.vertices[0].id],
            currentNode: this.vertices[0].id,
            queue: [...queue]
        });
        
        while (queue.length > 0) {
            const current = queue.shift();
            const neighbors = this.getNeighbors(current);
            
            steps.push({
                description: `Explorando vértice ${current}`,
                visitedNodes: Array.from(visited),
                currentNode: current,
                queue: [...queue]
            });
            
            neighbors.forEach(neighbor => {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                    
                    steps.push({
                        description: `Descobrindo vértice ${neighbor} (adicionando à fila)`,
                        visitedNodes: Array.from(visited),
                        currentNode: neighbor,
                        queue: [...queue],
                        activeEdge: { from: current, to: neighbor }
                    });
                }
            });
        }
        
        steps.push({
            description: 'BFS concluído! Todos os vértices foram visitados.',
            visitedNodes: Array.from(visited),
            currentNode: null,
            queue: []
        });
        
        return steps;
    }
    
    generateDFSSteps() {
        const steps = [];
        const visited = new Set();
        
        const dfsVisit = (nodeId, depth = 0) => {
            visited.add(nodeId);
            
            steps.push({
                description: `Visitando ${nodeId} (profundidade ${depth})`,
                visitedNodes: Array.from(visited),
                currentNode: nodeId,
                depth: depth
            });
            
            const neighbors = this.getNeighbors(nodeId);
            neighbors.forEach(neighbor => {
                if (!visited.has(neighbor)) {
                    steps.push({
                        description: `Explorando aresta ${nodeId} → ${neighbor}`,
                        visitedNodes: Array.from(visited),
                        currentNode: nodeId,
                        activeEdge: { from: nodeId, to: neighbor }
                    });
                    
                    dfsVisit(neighbor, depth + 1);
                    
                    steps.push({
                        description: `Retornando de ${neighbor} para ${nodeId}`,
                        visitedNodes: Array.from(visited),
                        currentNode: nodeId
                    });
                }
            });
        };
        
        steps.push({
            description: `Iniciando DFS a partir de ${this.vertices[0].label}`,
            visitedNodes: [],
            currentNode: null
        });
        
        dfsVisit(this.vertices[0].id, 0);
        
        steps.push({
            description: 'DFS concluído!',
            visitedNodes: Array.from(visited),
            currentNode: null
        });
        
        return steps;
    }
    
    getNeighbors(vertexId) {
        return this.edges
            .filter(e => e.from === vertexId)
            .map(e => e.to);
    }
    
    animate() {
        if (!this.isAnimating || this.currentStep >= this.animationSteps.length) {
            this.isAnimating = false;
            return;
        }
        
        const step = this.animationSteps[this.currentStep];
        this.renderStep(step);
        this.displayStepInfo(step, this.currentStep + 1);
        
        this.currentStep++;
        setTimeout(() => this.animate(), this.animationSpeed);
    }
    
    renderStep(step) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Desenha arestas
        this.edges.forEach(edge => {
            const isActive = step.activeEdge && 
                step.activeEdge.from === edge.from && 
                step.activeEdge.to === edge.to;
            
            this.drawEdge(
                edge,
                isActive ? this.colors.edgeActive : this.colors.edge
            );
        });
        
        // Desenha vértices
        this.vertices.forEach(vertex => {
            let color = this.colors.default;
            
            if (step.currentNode === vertex.id) {
                color = this.colors.visiting;
            } else if (step.visitedNodes && step.visitedNodes.includes(vertex.id)) {
                color = this.colors.visited;
            }
            
            this.drawVertex(vertex, color);
        });
    }
    
    drawVertex(vertex, color) {
        const radius = 30;
        
        // Círculo
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(vertex.x, vertex.y, radius, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Borda
        this.ctx.strokeStyle = '#fff';
        this.ctx.lineWidth = 3;
        this.ctx.stroke();
        
        // Label
        this.ctx.fillStyle = this.colors.text;
        this.ctx.font = 'bold 18px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(vertex.label, vertex.x, vertex.y);
    }
    
    drawEdge(edge, color) {
        const from = this.vertices.find(v => v.id === edge.from);
        const to = this.vertices.find(v => v.id === edge.to);
        
        if (!from || !to) return;
        
        const angle = Math.atan2(to.y - from.y, to.x - from.x);
        const radius = 30;
        
        const startX = from.x + radius * Math.cos(angle);
        const startY = from.y + radius * Math.sin(angle);
        const endX = to.x - radius * Math.cos(angle);
        const endY = to.y - radius * Math.sin(angle);
        
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = color === this.colors.edgeActive ? 4 : 2;
        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(endX, endY);
        this.ctx.stroke();
        
        // Seta
        this.drawArrow(endX, endY, angle, color);
        
        // Peso
        const midX = (from.x + to.x) / 2;
        const midY = (from.y + to.y) / 2;
        
        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(midX - 12, midY - 12, 24, 24);
        
        this.ctx.fillStyle = '#333';
        this.ctx.font = 'bold 12px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(edge.weight, midX, midY);
    }
    
    drawArrow(x, y, angle, color) {
        const arrowLength = 15;
        
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(
            x - arrowLength * Math.cos(angle - Math.PI / 6),
            y - arrowLength * Math.sin(angle - Math.PI / 6)
        );
        this.ctx.lineTo(
            x - arrowLength * Math.cos(angle + Math.PI / 6),
            y - arrowLength * Math.sin(angle + Math.PI / 6)
        );
        this.ctx.closePath();
        this.ctx.fill();
    }
    
    displayStepInfo(step, stepNumber) {
        const stepsList = document.getElementById('steps-list');
        if (!stepsList) return;
        
        const stepDiv = document.createElement('div');
        stepDiv.className = 'search-step';
        stepDiv.innerHTML = `
            <div class="step-number">Passo ${stepNumber}</div>
            <div class="step-description">${step.description}</div>
            ${step.queue ? `<div class="step-queue">Fila: [${step.queue.join(', ')}]</div>` : ''}
            ${step.depth !== undefined ? `<div class="step-depth">Profundidade: ${step.depth}</div>` : ''}
        `;
        
        stepsList.appendChild(stepDiv);
        stepDiv.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
    
    reset() {
        this.isAnimating = false;
        this.currentStep = 0;
        this.animationSteps = [];
        
        const stepsList = document.getElementById('steps-list');
        if (stepsList) stepsList.innerHTML = '';
        
        this.render();
    }
    
    render() {
        if (!this.ctx) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Desenha arestas
        this.edges.forEach(edge => this.drawEdge(edge, this.colors.edge));
        
        // Desenha vértices
        this.vertices.forEach(vertex => this.drawVertex(vertex, this.colors.default));
    }
    
    // ===== DIJKSTRA =====
    
    findShortestPath() {
        const startId = document.getElementById('path-start')?.value;
        const endId = document.getElementById('path-end')?.value;
        const algorithm = document.getElementById('path-algorithm')?.value || 'dijkstra';
        
        if (!startId || !endId) {
            alert('Selecione vértice inicial e final');
            return;
        }
        
        let result;
        if (algorithm === 'dijkstra') {
            result = this.dijkstra(startId, endId);
        } else if (algorithm === 'bellman-ford') {
            result = this.bellmanFord(startId, endId);
        }
        
        this.displayPathResult(result);
    }
    
    dijkstra(startId, endId) {
        const distances = {};
        const previous = {};
        const visited = new Set();
        const pq = [];
        
        // Inicializa
        this.vertices.forEach(v => {
            distances[v.id] = Infinity;
            previous[v.id] = null;
        });
        distances[startId] = 0;
        pq.push({ id: startId, dist: 0 });
        
        while (pq.length > 0) {
            // Ordena e pega o menor
            pq.sort((a, b) => a.dist - b.dist);
            const { id: current } = pq.shift();
            
            if (visited.has(current)) continue;
            visited.add(current);
            
            if (current === endId) break;
            
            const neighbors = this.getNeighborsWithWeights(current);
            neighbors.forEach(({ node, weight }) => {
                if (!visited.has(node)) {
                    const newDist = distances[current] + weight;
                    if (newDist < distances[node]) {
                        distances[node] = newDist;
                        previous[node] = current;
                        pq.push({ id: node, dist: newDist });
                    }
                }
            });
        }
        
        // Reconstrói caminho
        const path = [];
        let current = endId;
        while (current) {
            path.unshift(current);
            current = previous[current];
        }
        
        return {
            path: path,
            distance: distances[endId],
            algorithm: 'Dijkstra'
        };
    }
    
    bellmanFord(startId, endId) {
        const distances = {};
        const previous = {};
        
        // Inicializa
        this.vertices.forEach(v => {
            distances[v.id] = Infinity;
            previous[v.id] = null;
        });
        distances[startId] = 0;
        
        // Relaxa arestas V-1 vezes
        for (let i = 0; i < this.vertices.length - 1; i++) {
            this.edges.forEach(edge => {
                if (distances[edge.from] + edge.weight < distances[edge.to]) {
                    distances[edge.to] = distances[edge.from] + edge.weight;
                    previous[edge.to] = edge.from;
                }
            });
        }
        
        // Verifica ciclo negativo
        let hasNegativeCycle = false;
        this.edges.forEach(edge => {
            if (distances[edge.from] + edge.weight < distances[edge.to]) {
                hasNegativeCycle = true;
            }
        });
        
        if (hasNegativeCycle) {
            return {
                error: 'Ciclo negativo detectado!',
                algorithm: 'Bellman-Ford'
            };
        }
        
        // Reconstrói caminho
        const path = [];
        let current = endId;
        while (current) {
            path.unshift(current);
            current = previous[current];
        }
        
        return {
            path: path,
            distance: distances[endId],
            algorithm: 'Bellman-Ford'
        };
    }
    
    getNeighborsWithWeights(vertexId) {
        return this.edges
            .filter(e => e.from === vertexId)
            .map(e => ({ node: e.to, weight: e.weight }));
    }
    
    displayPathResult(result) {
        const resultDiv = document.getElementById('path-result');
        if (!resultDiv) return;
        
        if (result.error) {
            resultDiv.style.display = 'block';
            resultDiv.innerHTML = `
                <h5>Resultado (${result.algorithm}):</h5>
                <div class="result-error">${result.error}</div>
            `;
            return;
        }
        
        resultDiv.style.display = 'block';
        document.getElementById('path-sequence').textContent = result.path.join(' → ');
        document.getElementById('path-distance').textContent = 
            result.distance === Infinity ? 'Sem caminho' : result.distance;
        
        // Visualiza caminho no canvas
        this.visualizePath(result.path);
    }
    
    visualizePath(path) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Desenha todas as arestas (cinza)
        this.edges.forEach(edge => this.drawEdge(edge, this.colors.edge));
        
        // Destaca arestas do caminho
        for (let i = 0; i < path.length - 1; i++) {
            const edge = this.edges.find(e => e.from === path[i] && e.to === path[i + 1]);
            if (edge) {
                this.drawEdge(edge, this.colors.path);
            }
        }
        
        // Desenha vértices
        this.vertices.forEach(vertex => {
            const isInPath = path.includes(vertex.id);
            this.drawVertex(vertex, isInPath ? this.colors.path : this.colors.default);
        });
    }
}

// Inicialização
window.initializeGraphAlgorithms = function() {
    console.log('🚀 initializeGraphAlgorithms chamado');
    
    if (window.graphAlgoViz) {
        console.log('⚠️ GraphAlgorithmsVisualizer já existe, reinicializando...');
        window.graphAlgoViz = null;
    }
    
    try {
        window.graphAlgoViz = new GraphAlgorithmsVisualizer();
        const success = window.graphAlgoViz.initialize();
        if (success) {
            console.log('✅ Graph Algorithms Visualizer inicializado com sucesso!');
        } else {
            console.error('❌ Falha ao inicializar Graph Algorithms Visualizer');
        }
    } catch (error) {
        console.error('❌ Erro ao criar GraphAlgorithmsVisualizer:', error);
    }
};

console.log('✅ graph-algorithms.js carregado e pronto');
