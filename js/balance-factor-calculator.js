/**
 * BALANCE FACTOR CALCULATOR - Calculadora Didática de Fator de Balanceamento
 * Interface interativa para ensinar cálculo de FB passo a passo
 */

class BalanceFactorCalculator {
    constructor() {
        this.currentNode = null;
        this.tree = null;
        this.steps = [];
    }

    /**
     * Cria interface HTML
     */
    createInterface() {
        return `
            <div class="bf-calculator-container">
                <div class="bf-header">
                    <h3>🧮 Calculadora de Fator de Balanceamento</h3>
                    <p>Aprenda a calcular o FB de qualquer nó passo a passo</p>
                </div>

                <div class="bf-input-section">
                    <label for="bf-tree-input">Insira valores para criar uma árvore:</label>
                    <div class="bf-input-group">
                        <input 
                            type="text" 
                            id="bf-tree-input" 
                            placeholder="Ex: 50, 30, 70, 20, 40, 60, 80"
                            class="bf-input"
                        >
                        <button id="bf-build-tree" class="btn-primary">🌳 Criar Árvore</button>
                    </div>
                    <p class="bf-hint">💡 Separe os números com vírgula. A árvore será construída em ordem.</p>
                </div>

                <div class="bf-tree-display" id="bf-tree-display" style="display: none;">
                    <canvas id="bf-calculator-canvas" width="800" height="400"></canvas>
                </div>

                <div class="bf-node-selector" id="bf-node-selector" style="display: none;">
                    <label>Selecione um nó para calcular seu FB:</label>
                    <select id="bf-node-select" class="bf-select">
                        <option value="">-- Escolha um nó --</option>
                    </select>
                </div>

                <div class="bf-calculation-steps" id="bf-calculation-steps" style="display: none;">
                    <h4>📐 Passos do Cálculo</h4>
                    <div id="bf-steps-container"></div>
                </div>

                <div class="bf-result" id="bf-result" style="display: none;">
                    <div class="result-card">
                        <h4>Resultado Final</h4>
                        <div class="result-value">
                            <span class="label">Fator de Balanceamento:</span>
                            <span class="value" id="bf-final-value">0</span>
                        </div>
                        <div class="result-status" id="bf-status">
                            <span class="status-icon">✅</span>
                            <span class="status-text">Balanceado</span>
                        </div>
                    </div>
                </div>

                <div class="bf-legend">
                    <h4>📚 Legenda</h4>
                    <div class="legend-items">
                        <div class="legend-item">
                            <div class="legend-box balanced-perfect"></div>
                            <span>FB = 0 (Perfeitamente balanceado)</span>
                        </div>
                        <div class="legend-item">
                            <div class="legend-box balanced"></div>
                            <span>FB = ±1 (Balanceado)</span>
                        </div>
                        <div class="legend-item">
                            <div class="legend-box unbalanced"></div>
                            <span>FB > 1 ou < -1 (Desbalanceado - precisa rotação)</span>
                        </div>
                    </div>
                </div>

                <div class="bf-examples">
                    <h4>💡 Exemplos Rápidos</h4>
                    <div class="examples-grid">
                        <button class="example-btn" data-example="50,30,70,20,40,60,80">
                            Balanceada Completa
                        </button>
                        <button class="example-btn" data-example="10,20,30,40,50">
                            Desbalanceada (Degenerada)
                        </button>
                        <button class="example-btn" data-example="50,25,75,10,30">
                            Parcialmente Balanceada
                        </button>
                        <button class="example-btn" data-example="100,50,150,25,75,125,175">
                            Árvore Perfeita
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Inicializa event listeners
     */
    initialize() {
        // Botão construir árvore
        const buildBtn = document.getElementById('bf-build-tree');
        if (buildBtn) {
            buildBtn.addEventListener('click', () => this.buildTreeFromInput());
        }

        // Input com Enter
        const input = document.getElementById('bf-tree-input');
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.buildTreeFromInput();
            });
        }

        // Seletor de nó
        const nodeSelect = document.getElementById('bf-node-select');
        if (nodeSelect) {
            nodeSelect.addEventListener('change', (e) => {
                if (e.target.value) {
                    this.calculateForNode(parseInt(e.target.value));
                }
            });
        }

        // Botões de exemplo
        document.querySelectorAll('.example-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const example = e.target.dataset.example;
                document.getElementById('bf-tree-input').value = example;
                this.buildTreeFromInput();
            });
        });
    }

    /**
     * Constrói árvore a partir do input
     */
    buildTreeFromInput() {
        const input = document.getElementById('bf-tree-input');
        const valuesStr = input.value.trim();
        
        if (!valuesStr) {
            alert('Por favor, insira alguns números!');
            return;
        }

        // Parse dos valores
        const values = valuesStr.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v));
        
        if (values.length === 0) {
            alert('Nenhum número válido encontrado!');
            return;
        }

        // Constrói árvore
        this.tree = this.buildBinaryTree(values);
        this.annotateTree(this.tree);
        
        // Mostra árvore
        this.displayTree();
        
        // Popula seletor de nós
        this.populateNodeSelector(values);
        
        // Mostra elementos
        document.getElementById('bf-tree-display').style.display = 'block';
        document.getElementById('bf-node-selector').style.display = 'block';
    }

    /**
     * Constrói árvore binária
     */
    buildBinaryTree(values) {
        if (!values || values.length === 0) return null;

        const root = { value: values[0], left: null, right: null };

        for (let i = 1; i < values.length; i++) {
            this.insertNode(root, values[i]);
        }

        return root;
    }

    /**
     * Insere nó na árvore
     */
    insertNode(node, value) {
        if (value < node.value) {
            if (!node.left) {
                node.left = { value, left: null, right: null };
            } else {
                this.insertNode(node.left, value);
            }
        } else {
            if (!node.right) {
                node.right = { value, left: null, right: null };
            } else {
                this.insertNode(node.right, value);
            }
        }
    }

    /**
     * Calcula altura
     */
    calculateHeight(node) {
        if (!node) return -1;
        return Math.max(this.calculateHeight(node.left), this.calculateHeight(node.right)) + 1;
    }

    /**
     * Anota árvore com alturas e FBs
     */
    annotateTree(node) {
        if (!node) return;

        node.height = this.calculateHeight(node);
        const leftHeight = this.calculateHeight(node.left);
        const rightHeight = this.calculateHeight(node.right);
        node.balanceFactor = leftHeight - rightHeight;

        this.annotateTree(node.left);
        this.annotateTree(node.right);
    }

    /**
     * Exibe árvore no canvas
     */
    displayTree() {
        const canvas = document.getElementById('bf-calculator-canvas');
        const ctx = canvas.getContext('2d');
        
        // Limpa
        ctx.fillStyle = '#f9fafb';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Desenha
        const positions = this.calculatePositions(this.tree, canvas.width / 2, 40);
        this.drawTree(ctx, this.tree, positions);
    }

    /**
     * Calcula posições dos nós
     */
    calculatePositions(node, x, y, offset = 150) {
        const positions = new Map();
        
        const calculate = (n, cx, cy, off) => {
            if (!n) return;
            
            positions.set(n.value, { x: cx, y: cy });
            
            if (n.left) calculate(n.left, cx - off, cy + 80, off / 2);
            if (n.right) calculate(n.right, cx + off, cy + 80, off / 2);
        };
        
        calculate(node, x, y, offset);
        return positions;
    }

    /**
     * Desenha árvore
     */
    drawTree(ctx, node, positions) {
        // Desenha arestas
        const drawEdges = (n) => {
            if (!n) return;
            
            const pos = positions.get(n.value);
            
            if (n.left) {
                const leftPos = positions.get(n.left.value);
                ctx.beginPath();
                ctx.moveTo(pos.x, pos.y + 20);
                ctx.lineTo(leftPos.x, leftPos.y - 20);
                ctx.strokeStyle = '#9ca3af';
                ctx.lineWidth = 2;
                ctx.stroke();
                drawEdges(n.left);
            }
            
            if (n.right) {
                const rightPos = positions.get(n.right.value);
                ctx.beginPath();
                ctx.moveTo(pos.x, pos.y + 20);
                ctx.lineTo(rightPos.x, rightPos.y - 20);
                ctx.strokeStyle = '#9ca3af';
                ctx.lineWidth = 2;
                ctx.stroke();
                drawEdges(n.right);
            }
        };

        drawEdges(node);

        // Desenha nós
        const drawNodes = (n) => {
            if (!n) return;
            
            const pos = positions.get(n.value);
            
            // Cor baseada no FB
            let color = '#10b981'; // Verde
            if (Math.abs(n.balanceFactor) > 1) color = '#ef4444'; // Vermelho
            else if (n.balanceFactor !== 0) color = '#3b82f6'; // Azul
            
            // Círculo
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, 20, 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.strokeStyle = '#1f2937';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Valor
            ctx.fillStyle = 'white';
            ctx.font = 'bold 14px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(n.value, pos.x, pos.y);
            
            // Altura
            ctx.fillStyle = '#6b7280';
            ctx.font = '11px Arial';
            ctx.fillText(`h=${n.height}`, pos.x, pos.y - 30);
            
            // FB
            ctx.fillStyle = color;
            ctx.font = 'bold 11px Arial';
            ctx.fillText(`FB=${n.balanceFactor}`, pos.x, pos.y + 35);
            
            drawNodes(n.left);
            drawNodes(n.right);
        };

        drawNodes(node);
    }

    /**
     * Popula seletor de nós
     */
    populateNodeSelector(values) {
        const select = document.getElementById('bf-node-select');
        select.innerHTML = '<option value="">-- Escolha um nó --</option>';
        
        values.forEach(value => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = `Nó ${value}`;
            select.appendChild(option);
        });
    }

    /**
     * Calcula FB para um nó específico
     */
    calculateForNode(nodeValue) {
        const node = this.findNode(this.tree, nodeValue);
        if (!node) return;

        this.currentNode = node;
        this.generateSteps(node);
        this.displaySteps();
        this.displayResult(node);
    }

    /**
     * Encontra nó na árvore
     */
    findNode(node, value) {
        if (!node) return null;
        if (node.value === value) return node;
        
        if (value < node.value) return this.findNode(node.left, value);
        return this.findNode(node.right, value);
    }

    /**
     * Gera passos do cálculo
     */
    generateSteps(node) {
        const leftHeight = this.calculateHeight(node.left);
        const rightHeight = this.calculateHeight(node.right);
        
        this.steps = [
            {
                title: '1️⃣ Identificar o Nó',
                content: `Vamos calcular o FB do nó <strong>${node.value}</strong>`
            },
            {
                title: '2️⃣ Calcular Altura da Subárvore Esquerda',
                content: `Altura da subárvore esquerda: <strong>h(esq) = ${leftHeight}</strong>`,
                detail: leftHeight === -1 ? 'Não há subárvore esquerda (altura = -1)' : 
                        `A maior altura à esquerda é ${leftHeight}`
            },
            {
                title: '3️⃣ Calcular Altura da Subárvore Direita',
                content: `Altura da subárvore direita: <strong>h(dir) = ${rightHeight}</strong>`,
                detail: rightHeight === -1 ? 'Não há subárvore direita (altura = -1)' : 
                        `A maior altura à direita é ${rightHeight}`
            },
            {
                title: '4️⃣ Aplicar a Fórmula',
                content: `<div class="formula-highlight">FB = h(esq) - h(dir)</div>`,
                detail: `FB = ${leftHeight} - (${rightHeight}) = <strong>${leftHeight - rightHeight}</strong>`
            },
            {
                title: '5️⃣ Interpretar o Resultado',
                content: this.interpretBalanceFactor(node.balanceFactor)
            }
        ];
    }

    /**
     * Interpreta o FB
     */
    interpretBalanceFactor(bf) {
        if (bf === 0) {
            return '✅ <strong>FB = 0:</strong> Perfeitamente balanceado! As subárvores têm exatamente a mesma altura.';
        } else if (bf === 1) {
            return '✅ <strong>FB = +1:</strong> Levemente desbalanceado à esquerda (ainda é aceitável em AVL).';
        } else if (bf === -1) {
            return '✅ <strong>FB = -1:</strong> Levemente desbalanceado à direita (ainda é aceitável em AVL).';
        } else if (bf > 1) {
            return `❌ <strong>FB = +${bf}:</strong> Muito desbalanceado à esquerda! Precisa de rotação à direita.`;
        } else {
            return `❌ <strong>FB = ${bf}:</strong> Muito desbalanceado à direita! Precisa de rotação à esquerda.`;
        }
    }

    /**
     * Exibe passos
     */
    displaySteps() {
        const container = document.getElementById('bf-steps-container');
        container.innerHTML = this.steps.map((step, index) => `
            <div class="step-card" style="animation-delay: ${index * 0.1}s">
                <h5>${step.title}</h5>
                <p>${step.content}</p>
                ${step.detail ? `<p class="step-detail">${step.detail}</p>` : ''}
            </div>
        `).join('');

        document.getElementById('bf-calculation-steps').style.display = 'block';
    }

    /**
     * Exibe resultado
     */
    displayResult(node) {
        const resultDiv = document.getElementById('bf-result');
        const valueSpan = document.getElementById('bf-final-value');
        const statusDiv = document.getElementById('bf-status');

        valueSpan.textContent = node.balanceFactor;
        valueSpan.className = 'value';
        
        if (Math.abs(node.balanceFactor) > 1) {
            valueSpan.classList.add('unbalanced');
            statusDiv.innerHTML = '<span class="status-icon">❌</span><span class="status-text">Desbalanceado - Precisa Rotação</span>';
        } else if (node.balanceFactor === 0) {
            valueSpan.classList.add('balanced-perfect');
            statusDiv.innerHTML = '<span class="status-icon">✅</span><span class="status-text">Perfeitamente Balanceado</span>';
        } else {
            valueSpan.classList.add('balanced');
            statusDiv.innerHTML = '<span class="status-icon">✅</span><span class="status-text">Balanceado</span>';
        }

        resultDiv.style.display = 'block';
    }
}

// Exporta para uso global
window.BalanceFactorCalculator = BalanceFactorCalculator;
