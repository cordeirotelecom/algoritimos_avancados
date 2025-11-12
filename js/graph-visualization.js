// ===== GRAPH INTERACTIVE VISUALIZATION =====

class GraphVisualization {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.vertices = [];
        this.edges = [];
        this.directed = true;
        this.weighted = false;
        this.showLabels = true;
        
        this.selectedTool = 'add-vertex';
        this.selectedVertices = [];
        this.draggedVertex = null;
        
        this.vertexRadius = 25;
        this.vertexIdCounter = 0;
        
        this.colors = {
            vertex: '#667eea',
            vertexHover: '#764ba2',
            edge: '#555',
            edgeActive: '#4CAF50',
            text: '#fff',
            arrow: '#555',
            selected: '#FF6B6B'
        };
    }
    
    initialize() {
        console.log('🎨 Inicializando GraphVisualization...');
        this.canvas = document.getElementById('graph-canvas');
        if (!this.canvas) {
            console.error('❌ Canvas #graph-canvas não encontrado!');
            return false;
        }
        
        console.log('✅ Canvas encontrado:', this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.setupEventListeners();
        this.render();
        console.log('✅ GraphVisualization inicializado com sucesso!');
        return true;
    }
    
    setupEventListeners() {
        console.log('🔧 Configurando event listeners...');
        // Tool buttons
        const toolBtns = document.querySelectorAll('.tool-btn');
        console.log(`📊 Encontrados ${toolBtns.length} botões de ferramenta`);
        
        toolBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.selectedTool = e.target.dataset.tool;
                this.selectedVertices = [];
                this.render();
            });
        });
        
        // Example buttons
        document.querySelectorAll('.example-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.loadExample(e.target.dataset.example);
            });
        });
        
        // Canvas events
        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        
        // Config checkboxes
        document.getElementById('graph-directed')?.addEventListener('change', (e) => {
            this.directed = e.target.checked;
            this.updateGraphInfo();
            this.render();
        });
        
        document.getElementById('graph-weighted')?.addEventListener('change', (e) => {
            this.weighted = e.target.checked;
            this.render();
        });
        
        document.getElementById('show-labels')?.addEventListener('change', (e) => {
            this.showLabels = e.target.checked;
            this.render();
        });
        
        // Action buttons
        document.getElementById('clear-graph')?.addEventListener('click', () => {
            if (confirm('Limpar todo o grafo?')) {
                this.clear();
            }
        });
        
        document.getElementById('export-graph')?.addEventListener('click', () => {
            this.exportGraph();
        });
    }
    
    handleMouseDown(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const clickedVertex = this.getVertexAt(x, y);
        
        switch(this.selectedTool) {
            case 'add-vertex':
                if (!clickedVertex) {
                    this.addVertex(x, y);
                }
                break;
                
            case 'add-edge':
                if (clickedVertex) {
                    if (this.selectedVertices.length === 0) {
                        this.selectedVertices.push(clickedVertex);
                        this.render();
                    } else if (this.selectedVertices.length === 1) {
                        if (this.selectedVertices[0] !== clickedVertex) {
                            const weight = this.weighted ? 
                                parseInt(prompt('Peso da aresta:', '1') || '1') : 1;
                            this.addEdge(this.selectedVertices[0], clickedVertex, weight);
                        }
                        this.selectedVertices = [];
                        this.render();
                    }
                }
                break;
                
            case 'remove':
                if (clickedVertex) {
                    this.removeVertex(clickedVertex);
                } else {
                    const clickedEdge = this.getEdgeAt(x, y);
                    if (clickedEdge) {
                        this.removeEdge(clickedEdge);
                    }
                }
                break;
                
            case 'select':
                if (clickedVertex) {
                    this.draggedVertex = clickedVertex;
                }
                break;
        }
    }
    
    handleMouseMove(e) {
        if (this.draggedVertex && this.selectedTool === 'select') {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.draggedVertex.x = Math.max(this.vertexRadius, Math.min(x, this.canvas.width - this.vertexRadius));
            this.draggedVertex.y = Math.max(this.vertexRadius, Math.min(y, this.canvas.height - this.vertexRadius));
            
            this.render();
        }
    }
    
    handleMouseUp(e) {
        this.draggedVertex = null;
    }
    
    addVertex(x, y) {
        const label = String.fromCharCode(65 + this.vertexIdCounter); // A, B, C...
        this.vertices.push({
            id: this.vertexIdCounter++,
            label: label,
            x: x,
            y: y
        });
        this.updateGraphInfo();
        this.updateRepresentations();
        this.render();
    }
    
    addEdge(from, to, weight = 1) {
        // Verifica se aresta já existe
        const exists = this.edges.some(e => 
            e.from === from && e.to === to
        );
        
        if (!exists) {
            this.edges.push({ from, to, weight });
            this.updateGraphInfo();
            this.updateRepresentations();
            this.render();
        }
    }
    
    removeVertex(vertex) {
        this.vertices = this.vertices.filter(v => v !== vertex);
        this.edges = this.edges.filter(e => e.from !== vertex && e.to !== vertex);
        this.updateGraphInfo();
        this.updateRepresentations();
        this.render();
    }
    
    removeEdge(edge) {
        this.edges = this.edges.filter(e => e !== edge);
        this.updateGraphInfo();
        this.updateRepresentations();
        this.render();
    }
    
    getVertexAt(x, y) {
        return this.vertices.find(v => {
            const dx = v.x - x;
            const dy = v.y - y;
            return Math.sqrt(dx * dx + dy * dy) <= this.vertexRadius;
        });
    }
    
    getEdgeAt(x, y) {
        const tolerance = 10;
        return this.edges.find(edge => {
            const dist = this.pointToLineDistance(
                x, y,
                edge.from.x, edge.from.y,
                edge.to.x, edge.to.y
            );
            return dist <= tolerance;
        });
    }
    
    pointToLineDistance(px, py, x1, y1, x2, y2) {
        const A = px - x1;
        const B = py - y1;
        const C = x2 - x1;
        const D = y2 - y1;
        
        const dot = A * C + B * D;
        const lenSq = C * C + D * D;
        let param = -1;
        
        if (lenSq !== 0) param = dot / lenSq;
        
        let xx, yy;
        
        if (param < 0) {
            xx = x1;
            yy = y1;
        } else if (param > 1) {
            xx = x2;
            yy = y2;
        } else {
            xx = x1 + param * C;
            yy = y1 + param * D;
        }
        
        const dx = px - xx;
        const dy = py - yy;
        
        return Math.sqrt(dx * dx + dy * dy);
    }
    
    render() {
        // Limpa canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Desenha arestas
        this.edges.forEach(edge => this.drawEdge(edge));
        
        // Desenha vértices
        this.vertices.forEach(vertex => this.drawVertex(vertex));
        
        // Destaca vértices selecionados
        this.selectedVertices.forEach(vertex => {
            this.ctx.strokeStyle = this.colors.selected;
            this.ctx.lineWidth = 3;
            this.ctx.beginPath();
            this.ctx.arc(vertex.x, vertex.y, this.vertexRadius + 5, 0, Math.PI * 2);
            this.ctx.stroke();
        });
    }
    
    drawVertex(vertex) {
        // Círculo
        this.ctx.fillStyle = this.colors.vertex;
        this.ctx.beginPath();
        this.ctx.arc(vertex.x, vertex.y, this.vertexRadius, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Borda
        this.ctx.strokeStyle = '#fff';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        
        // Label
        if (this.showLabels) {
            this.ctx.fillStyle = this.colors.text;
            this.ctx.font = 'bold 16px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(vertex.label, vertex.x, vertex.y);
        }
    }
    
    drawEdge(edge) {
        const fromX = edge.from.x;
        const fromY = edge.from.y;
        const toX = edge.to.x;
        const toY = edge.to.y;
        
        // Calcula ângulo
        const angle = Math.atan2(toY - fromY, toX - fromX);
        
        // Ajusta pontos para não sobrepor vértices
        const startX = fromX + this.vertexRadius * Math.cos(angle);
        const startY = fromY + this.vertexRadius * Math.sin(angle);
        const endX = toX - this.vertexRadius * Math.cos(angle);
        const endY = toY - this.vertexRadius * Math.sin(angle);
        
        // Linha
        this.ctx.strokeStyle = this.colors.edge;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(endX, endY);
        this.ctx.stroke();
        
        // Seta (se direcionado)
        if (this.directed) {
            this.drawArrow(endX, endY, angle);
        }
        
        // Peso (se ponderado)
        if (this.weighted) {
            const midX = (startX + endX) / 2;
            const midY = (startY + endY) / 2;
            
            this.ctx.fillStyle = '#fff';
            this.ctx.fillRect(midX - 15, midY - 12, 30, 24);
            
            this.ctx.fillStyle = '#333';
            this.ctx.font = 'bold 14px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(edge.weight, midX, midY);
        }
    }
    
    drawArrow(x, y, angle) {
        const arrowLength = 12;
        const arrowWidth = 6;
        
        this.ctx.fillStyle = this.colors.arrow;
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
    
    updateGraphInfo() {
        const vertexCount = this.vertices.length;
        const edgeCount = this.edges.length;
        const maxEdges = this.directed ? 
            vertexCount * (vertexCount - 1) : 
            (vertexCount * (vertexCount - 1)) / 2;
        const density = maxEdges > 0 ? 
            ((edgeCount / maxEdges) * 100).toFixed(1) : 0;
        
        const typeText = this.directed ? 'Direcionado' : 'Não-Direcionado';
        
        document.getElementById('vertex-count').textContent = vertexCount;
        document.getElementById('edge-count').textContent = edgeCount;
        document.getElementById('graph-type').textContent = typeText;
        document.getElementById('graph-density').textContent = density + '%';
    }
    
    updateRepresentations() {
        const container = document.getElementById('graph-representations');
        if (!container || this.vertices.length === 0) {
            if (container) {
                container.innerHTML = '<p class="placeholder">Crie um grafo acima para ver suas representações</p>';
            }
            return;
        }
        
        let html = '<div class="representations-output">';
        
        // Matriz de Adjacência
        html += '<div class="representation-box">';
        html += '<h5>Matriz de Adjacência</h5>';
        html += this.getAdjacencyMatrix();
        html += '</div>';
        
        // Lista de Adjacência
        html += '<div class="representation-box">';
        html += '<h5>Lista de Adjacência</h5>';
        html += this.getAdjacencyList();
        html += '</div>';
        
        // Lista de Arestas
        html += '<div class="representation-box">';
        html += '<h5>Lista de Arestas</h5>';
        html += this.getEdgeList();
        html += '</div>';
        
        html += '</div>';
        container.innerHTML = html;
    }
    
    getAdjacencyMatrix() {
        const n = this.vertices.length;
        const matrix = Array(n).fill().map(() => Array(n).fill(0));
        
        this.edges.forEach(edge => {
            const i = this.vertices.indexOf(edge.from);
            const j = this.vertices.indexOf(edge.to);
            matrix[i][j] = this.weighted ? edge.weight : 1;
            if (!this.directed) {
                matrix[j][i] = this.weighted ? edge.weight : 1;
            }
        });
        
        let html = '<pre class="matrix-display">';
        html += '    ';
        this.vertices.forEach(v => html += v.label.padEnd(4));
        html += '\n';
        
        this.vertices.forEach((v, i) => {
            html += v.label.padEnd(4);
            matrix[i].forEach(val => {
                html += String(val).padEnd(4);
            });
            html += '\n';
        });
        html += '</pre>';
        return html;
    }
    
    getAdjacencyList() {
        const list = {};
        this.vertices.forEach(v => list[v.label] = []);
        
        this.edges.forEach(edge => {
            const info = this.weighted ? 
                `${edge.to.label}(${edge.weight})` : 
                edge.to.label;
            list[edge.from.label].push(info);
            
            if (!this.directed) {
                const info2 = this.weighted ? 
                    `${edge.from.label}(${edge.weight})` : 
                    edge.from.label;
                list[edge.to.label].push(info2);
            }
        });
        
        let html = '<pre class="list-display">';
        for (let vertex in list) {
            html += `${vertex}: [${list[vertex].join(', ')}]\n`;
        }
        html += '</pre>';
        return html;
    }
    
    getEdgeList() {
        let html = '<pre class="edge-display">';
        html += '[\n';
        this.edges.forEach((edge, i) => {
            const arrow = this.directed ? '→' : '—';
            const weight = this.weighted ? `, peso: ${edge.weight}` : '';
            html += `  {${edge.from.label} ${arrow} ${edge.to.label}${weight}}`;
            if (i < this.edges.length - 1) html += ',';
            html += '\n';
        });
        html += ']';
        html += '</pre>';
        return html;
    }
    
    loadExample(exampleType) {
        this.clear();
        
        switch(exampleType) {
            case 'simple':
                this.loadSimpleGraph();
                break;
            case 'complete':
                this.loadCompleteGraph();
                break;
            case 'social':
                this.loadSocialNetwork();
                break;
            case 'weighted':
                this.loadWeightedGraph();
                break;
        }
    }
    
    loadSimpleGraph() {
        const vertices = [
            { x: 200, y: 150 },
            { x: 400, y: 150 },
            { x: 300, y: 300 },
            { x: 200, y: 450 },
            { x: 400, y: 450 }
        ];
        
        vertices.forEach(v => this.addVertex(v.x, v.y));
        
        this.addEdge(this.vertices[0], this.vertices[1]);
        this.addEdge(this.vertices[0], this.vertices[2]);
        this.addEdge(this.vertices[1], this.vertices[2]);
        this.addEdge(this.vertices[2], this.vertices[3]);
        this.addEdge(this.vertices[2], this.vertices[4]);
    }
    
    loadCompleteGraph() {
        const centerX = 500;
        const centerY = 300;
        const radius = 150;
        const n = 5;
        
        for (let i = 0; i < n; i++) {
            const angle = (i * 2 * Math.PI) / n - Math.PI / 2;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            this.addVertex(x, y);
        }
        
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (i !== j) {
                    this.addEdge(this.vertices[i], this.vertices[j]);
                }
            }
        }
    }
    
    loadSocialNetwork() {
        this.directed = false;
        document.getElementById('graph-directed').checked = false;
        
        const positions = [
            { x: 300, y: 200 }, // Alice
            { x: 500, y: 200 }, // Bob
            { x: 700, y: 200 }, // Carol
            { x: 400, y: 350 }, // David
            { x: 600, y: 350 }, // Eve
            { x: 500, y: 500 }  // Frank
        ];
        
        positions.forEach(p => this.addVertex(p.x, p.y));
        
        // Conexões de amizade
        this.addEdge(this.vertices[0], this.vertices[1]); // Alice-Bob
        this.addEdge(this.vertices[1], this.vertices[2]); // Bob-Carol
        this.addEdge(this.vertices[0], this.vertices[3]); // Alice-David
        this.addEdge(this.vertices[1], this.vertices[4]); // Bob-Eve
        this.addEdge(this.vertices[3], this.vertices[4]); // David-Eve
        this.addEdge(this.vertices[4], this.vertices[5]); // Eve-Frank
        this.addEdge(this.vertices[2], this.vertices[4]); // Carol-Eve
    }
    
    loadWeightedGraph() {
        this.weighted = true;
        document.getElementById('graph-weighted').checked = true;
        
        const positions = [
            { x: 200, y: 200 },
            { x: 500, y: 150 },
            { x: 800, y: 200 },
            { x: 350, y: 400 },
            { x: 650, y: 400 }
        ];
        
        positions.forEach(p => this.addVertex(p.x, p.y));
        
        this.addEdge(this.vertices[0], this.vertices[1], 4);
        this.addEdge(this.vertices[0], this.vertices[3], 2);
        this.addEdge(this.vertices[1], this.vertices[2], 3);
        this.addEdge(this.vertices[1], this.vertices[3], 5);
        this.addEdge(this.vertices[1], this.vertices[4], 1);
        this.addEdge(this.vertices[2], this.vertices[4], 7);
        this.addEdge(this.vertices[3], this.vertices[4], 6);
    }
    
    clear() {
        this.vertices = [];
        this.edges = [];
        this.selectedVertices = [];
        this.vertexIdCounter = 0;
        this.updateGraphInfo();
        this.updateRepresentations();
        this.render();
    }
    
    exportGraph() {
        const data = {
            vertices: this.vertices.map(v => ({ id: v.id, label: v.label, x: v.x, y: v.y })),
            edges: this.edges.map(e => ({
                from: e.from.id,
                to: e.to.id,
                weight: e.weight
            })),
            directed: this.directed,
            weighted: this.weighted
        };
        
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'grafo.json';
        a.click();
        URL.revokeObjectURL(url);
        
        console.log('✅ Grafo exportado!', data);
    }
    
    getAdjacencyListObject() {
        const list = {};
        this.vertices.forEach(v => list[v.label] = []);
        
        this.edges.forEach(edge => {
            list[edge.from.label].push({
                node: edge.to.label,
                weight: edge.weight
            });
            
            if (!this.directed) {
                list[edge.to.label].push({
                    node: edge.from.label,
                    weight: edge.weight
                });
            }
        });
        
        return list;
    }
}

// Inicialização global
window.initializeGraphVisualization = function() {
    console.log('🚀 initializeGraphVisualization chamado');
    
    if (window.graphViz) {
        console.log('⚠️ GraphVisualization já existe, reinicializando...');
        window.graphViz = null;
    }
    
    try {
        window.graphViz = new GraphVisualization();
        const success = window.graphViz.initialize();
        if (success) {
            console.log('✅ Graph Visualization inicializado com sucesso!');
        } else {
            console.error('❌ Falha ao inicializar Graph Visualization');
        }
    } catch (error) {
        console.error('❌ Erro ao criar GraphVisualization:', error);
    }
};

console.log('✅ graph-visualization.js carregado e pronto');
