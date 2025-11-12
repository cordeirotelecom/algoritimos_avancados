/**
 * TREE VISUAL EXAMPLES - Exemplos Visuais de Árvores
 * Demonstrações didáticas passo a passo com diagramas e cálculos
 */

class TreeVisualExamples {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.currentExample = null;
        this.animationStep = 0;
        this.nodeRadius = 25;
        this.levelHeight = 80;
        this.horizontalSpacing = 60;
    }

    /**
     * Exemplos de árvores disponíveis
     */
    getExamples() {
        return [
            {
                id: 'binary-simple',
                title: 'Árvore Binária Simples',
                description: 'Exemplo básico de uma árvore binária sem balanceamento',
                type: 'binary',
                nodes: [50, 30, 70, 20, 40, 60, 80]
            },
            {
                id: 'binary-unbalanced',
                title: 'Árvore Binária Desbalanceada',
                description: 'Árvore que precisa de balanceamento',
                type: 'binary',
                nodes: [10, 20, 30, 40, 50]
            },
            {
                id: 'avl-balanced',
                title: 'Árvore AVL Balanceada',
                description: 'Árvore AVL perfeitamente balanceada com FB = -1, 0 ou 1',
                type: 'avl',
                nodes: [50, 25, 75, 10, 30, 60, 90]
            },
            {
                id: 'avl-rotation-ll',
                title: 'AVL - Rotação Simples à Direita (LL)',
                description: 'Demonstração de rotação LL passo a passo',
                type: 'avl-rotation',
                rotationType: 'LL',
                nodes: [30, 20, 10] // Inserção que causa desbalanceamento LL
            },
            {
                id: 'avl-rotation-rr',
                title: 'AVL - Rotação Simples à Esquerda (RR)',
                description: 'Demonstração de rotação RR passo a passo',
                type: 'avl-rotation',
                rotationType: 'RR',
                nodes: [10, 20, 30] // Inserção que causa desbalanceamento RR
            },
            {
                id: 'avl-rotation-lr',
                title: 'AVL - Rotação Dupla LR',
                description: 'Demonstração de rotação LR passo a passo',
                type: 'avl-rotation',
                rotationType: 'LR',
                nodes: [30, 10, 20] // Inserção que causa desbalanceamento LR
            },
            {
                id: 'avl-rotation-rl',
                title: 'AVL - Rotação Dupla RL',
                description: 'Demonstração de rotação RL passo a passo',
                type: 'avl-rotation',
                rotationType: 'RL',
                nodes: [10, 30, 20] // Inserção que causa desbalanceamento RL
            },
            {
                id: 'balance-calculation',
                title: 'Cálculo de Fator de Balanceamento',
                description: 'Tutorial completo sobre como calcular FB',
                type: 'tutorial',
                steps: 'balance-factor-tutorial'
            }
        ];
    }

    /**
     * Inicializa o canvas
     */
    initializeCanvas(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.error('Canvas não encontrado:', canvasId);
            return false;
        }
        this.ctx = this.canvas.getContext('2d');
        return true;
    }

    /**
     * Desenha um nó da árvore
     */
    drawNode(x, y, value, options = {}) {
        const {
            highlight = false,
            height = null,
            balanceFactor = null,
            showCalculation = false,
            color = null
        } = options;

        // Determina a cor do nó baseado no fator de balanceamento
        let nodeColor = color || '#667eea';
        if (balanceFactor !== null) {
            if (Math.abs(balanceFactor) > 1) {
                nodeColor = '#ef4444'; // Vermelho - desbalanceado
            } else if (balanceFactor === 0) {
                nodeColor = '#10b981'; // Verde - perfeitamente balanceado
            } else {
                nodeColor = '#3b82f6'; // Azul - balanceado
            }
        }

        // Desenha o círculo do nó
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.nodeRadius, 0, 2 * Math.PI);
        this.ctx.fillStyle = highlight ? '#fbbf24' : nodeColor;
        this.ctx.fill();
        this.ctx.strokeStyle = highlight ? '#f59e0b' : '#1f2937';
        this.ctx.lineWidth = highlight ? 3 : 2;
        this.ctx.stroke();

        // Desenha o valor do nó
        this.ctx.fillStyle = 'white';
        this.ctx.font = 'bold 16px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(value, x, y);

        // Mostra altura acima do nó
        if (height !== null) {
            this.ctx.fillStyle = '#6b7280';
            this.ctx.font = '12px Arial';
            this.ctx.fillText(`h=${height}`, x, y - this.nodeRadius - 10);
        }

        // Mostra fator de balanceamento ao lado
        if (balanceFactor !== null) {
            const fbColor = Math.abs(balanceFactor) > 1 ? '#ef4444' : '#10b981';
            this.ctx.fillStyle = fbColor;
            this.ctx.font = 'bold 12px Arial';
            this.ctx.fillText(`FB=${balanceFactor}`, x + this.nodeRadius + 20, y);
        }

        // Mostra cálculo completo
        if (showCalculation && balanceFactor !== null && height !== null) {
            this.ctx.fillStyle = '#374151';
            this.ctx.font = '10px Arial';
            this.ctx.textAlign = 'left';
            const calcText = `FB = h(esq) - h(dir)`;
            this.ctx.fillText(calcText, x + this.nodeRadius + 5, y + 15);
        }
    }

    /**
     * Desenha uma aresta entre dois nós
     */
    drawEdge(x1, y1, x2, y2, options = {}) {
        const { highlight = false, label = null } = options;

        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.strokeStyle = highlight ? '#f59e0b' : '#9ca3af';
        this.ctx.lineWidth = highlight ? 3 : 2;
        this.ctx.stroke();

        // Label na aresta (ex: "E" para esquerda, "D" para direita)
        if (label) {
            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;
            this.ctx.fillStyle = '#6b7280';
            this.ctx.font = 'bold 10px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(label, midX - 10, midY);
        }
    }

    /**
     * Calcula posições dos nós para uma árvore binária
     */
    calculateNodePositions(nodes, startX, startY) {
        const positions = new Map();
        const tree = this.buildBinaryTree(nodes);
        
        const calculatePositions = (node, x, y, level, offset) => {
            if (!node) return;

            positions.set(node.value, { x, y, level });

            const childOffset = offset / 2;
            if (node.left) {
                calculatePositions(node.left, x - offset, y + this.levelHeight, level + 1, childOffset);
            }
            if (node.right) {
                calculatePositions(node.right, x + offset, y + this.levelHeight, level + 1, childOffset);
            }
        };

        calculatePositions(tree, startX, startY, 0, 150);
        return { positions, tree };
    }

    /**
     * Constrói uma árvore binária simples
     */
    buildBinaryTree(values) {
        if (!values || values.length === 0) return null;

        const root = { value: values[0], left: null, right: null };

        for (let i = 1; i < values.length; i++) {
            this.insertIntoBinaryTree(root, values[i]);
        }

        return root;
    }

    /**
     * Insere um valor na árvore binária
     */
    insertIntoBinaryTree(node, value) {
        if (value < node.value) {
            if (!node.left) {
                node.left = { value, left: null, right: null };
            } else {
                this.insertIntoBinaryTree(node.left, value);
            }
        } else {
            if (!node.right) {
                node.right = { value, left: null, right: null };
            } else {
                this.insertIntoBinaryTree(node.right, value);
            }
        }
    }

    /**
     * Calcula altura de um nó
     */
    calculateHeight(node) {
        if (!node) return -1;
        
        const leftHeight = this.calculateHeight(node.left);
        const rightHeight = this.calculateHeight(node.right);
        
        return Math.max(leftHeight, rightHeight) + 1;
    }

    /**
     * Calcula fator de balanceamento
     */
    calculateBalanceFactor(node) {
        if (!node) return 0;
        
        const leftHeight = this.calculateHeight(node.left);
        const rightHeight = this.calculateHeight(node.right);
        
        return leftHeight - rightHeight;
    }

    /**
     * Adiciona alturas e fatores de balanceamento aos nós
     */
    annotateTree(node) {
        if (!node) return;

        node.height = this.calculateHeight(node);
        node.balanceFactor = this.calculateBalanceFactor(node);

        this.annotateTree(node.left);
        this.annotateTree(node.right);
    }

    /**
     * Desenha a árvore completa
     */
    drawTree(tree, positions, options = {}) {
        const { showHeights = true, showBalanceFactors = true, highlightNode = null } = options;

        // Limpa o canvas
        this.ctx.fillStyle = '#f9fafb';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Desenha arestas primeiro
        const drawEdges = (node) => {
            if (!node) return;

            const pos = positions.get(node.value);
            if (!pos) return;

            if (node.left) {
                const leftPos = positions.get(node.left.value);
                if (leftPos) {
                    this.drawEdge(
                        pos.x, pos.y + this.nodeRadius,
                        leftPos.x, leftPos.y - this.nodeRadius,
                        { label: 'E', highlight: highlightNode === node.left.value }
                    );
                }
                drawEdges(node.left);
            }

            if (node.right) {
                const rightPos = positions.get(node.right.value);
                if (rightPos) {
                    this.drawEdge(
                        pos.x, pos.y + this.nodeRadius,
                        rightPos.x, rightPos.y - this.nodeRadius,
                        { label: 'D', highlight: highlightNode === node.right.value }
                    );
                }
                drawEdges(node.right);
            }
        };

        drawEdges(tree);

        // Desenha nós
        const drawNodes = (node) => {
            if (!node) return;

            const pos = positions.get(node.value);
            if (!pos) return;

            this.drawNode(pos.x, pos.y, node.value, {
                highlight: highlightNode === node.value,
                height: showHeights ? node.height : null,
                balanceFactor: showBalanceFactors ? node.balanceFactor : null
            });

            drawNodes(node.left);
            drawNodes(node.right);
        };

        drawNodes(tree);
    }

    /**
     * Renderiza exemplo de árvore binária simples
     */
    renderBinaryExample(example) {
        const centerX = this.canvas.width / 2;
        const startY = 60;

        const { positions, tree } = this.calculateNodePositions(example.nodes, centerX, startY);
        this.annotateTree(tree);
        this.drawTree(tree, positions, { showHeights: true, showBalanceFactors: false });

        // Adiciona legenda
        this.drawLegend([
            { color: '#667eea', text: 'Nó da árvore' },
            { text: 'h = altura do nó', type: 'label' }
        ], 20, this.canvas.height - 60);
    }

    /**
     * Renderiza exemplo de árvore AVL
     */
    renderAVLExample(example) {
        const centerX = this.canvas.width / 2;
        const startY = 60;

        const { positions, tree } = this.calculateNodePositions(example.nodes, centerX, startY);
        this.annotateTree(tree);
        this.drawTree(tree, positions, { showHeights: true, showBalanceFactors: true });

        // Adiciona legenda
        this.drawLegend([
            { color: '#10b981', text: 'FB = 0 (Perfeitamente balanceado)' },
            { color: '#3b82f6', text: 'FB = -1 ou 1 (Balanceado)' },
            { color: '#ef4444', text: 'FB > 1 ou < -1 (Desbalanceado)' },
            { text: 'FB = h(esq) - h(dir)', type: 'formula' }
        ], 20, this.canvas.height - 100);
    }

    /**
     * Tutorial passo a passo de cálculo de fator de balanceamento
     */
    renderBalanceFactorTutorial(step = 0) {
        this.ctx.fillStyle = '#f9fafb';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        const steps = [
            {
                title: '🎯 Passo 1: Entendendo a Altura',
                content: [
                    'A altura de um nó é a maior distância até uma folha',
                    'Folhas têm altura 0',
                    'Nó vazio (null) tem altura -1'
                ],
                example: { value: 50, left: { value: 30 }, right: { value: 70 } },
                highlight: 50
            },
            {
                title: '📐 Passo 2: Calculando Altura da Subárvore Esquerda',
                content: [
                    'Conte a altura máxima à esquerda',
                    'h(esquerda) = maior altura dos filhos + 1',
                    'Se não tem filho esquerdo, h(esq) = -1'
                ],
                example: { value: 50, left: { value: 30, left: { value: 20 } }, right: { value: 70 } },
                highlight: 30
            },
            {
                title: '📐 Passo 3: Calculando Altura da Subárvore Direita',
                content: [
                    'Conte a altura máxima à direita',
                    'h(direita) = maior altura dos filhos + 1',
                    'Se não tem filho direito, h(dir) = -1'
                ],
                example: { value: 50, left: { value: 30, left: { value: 20 } }, right: { value: 70 } },
                highlight: 70
            },
            {
                title: '⚖️ Passo 4: Fórmula do Fator de Balanceamento',
                content: [
                    'FB = h(esquerda) - h(direita)',
                    'Se FB = 0: perfeitamente balanceado',
                    'Se FB = 1 ou -1: levemente desbalanceado (OK)',
                    'Se FB > 1 ou < -1: precisa rotação!'
                ],
                example: { value: 50, left: { value: 30, left: { value: 20 } }, right: { value: 70 } },
                highlight: 50,
                showCalculation: true
            },
            {
                title: '✅ Passo 5: Exemplo Prático Completo',
                content: [
                    'Nó 20: h(esq)=-1, h(dir)=-1 → FB = 0 ✓',
                    'Nó 30: h(esq)=0, h(dir)=-1 → FB = 1 ✓',
                    'Nó 70: h(esq)=-1, h(dir)=-1 → FB = 0 ✓',
                    'Nó 50: h(esq)=1, h(dir)=0 → FB = 1 ✓',
                    'Todos os nós estão balanceados!'
                ],
                example: { value: 50, left: { value: 30, left: { value: 20 } }, right: { value: 70 } },
                showAll: true
            }
        ];

        const currentStep = steps[step];

        // Título
        this.ctx.fillStyle = '#1f2937';
        this.ctx.font = 'bold 20px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(currentStep.title, 30, 40);

        // Conteúdo textual
        this.ctx.font = '14px Arial';
        this.ctx.fillStyle = '#374151';
        currentStep.content.forEach((line, index) => {
            this.ctx.fillText(line, 30, 70 + (index * 25));
        });

        // Desenha exemplo visual
        if (currentStep.example) {
            const centerX = this.canvas.width / 2;
            const startY = 200;
            
            const tree = currentStep.example;
            this.annotateTree(tree);
            
            const positions = new Map();
            positions.set(50, { x: centerX, y: startY });
            if (tree.left) {
                positions.set(30, { x: centerX - 80, y: startY + 80 });
                if (tree.left.left) {
                    positions.set(20, { x: centerX - 140, y: startY + 160 });
                }
            }
            if (tree.right) {
                positions.set(70, { x: centerX + 80, y: startY + 80 });
            }

            this.drawTree(tree, positions, {
                showHeights: true,
                showBalanceFactors: currentStep.showAll || currentStep.showCalculation,
                highlightNode: currentStep.highlight
            });
        }

        // Indicador de progresso
        this.ctx.fillStyle = '#667eea';
        this.ctx.fillRect(20, this.canvas.height - 20, (this.canvas.width - 40) * ((step + 1) / steps.length), 10);
        this.ctx.strokeStyle = '#9ca3af';
        this.ctx.strokeRect(20, this.canvas.height - 20, this.canvas.width - 40, 10);
    }

    /**
     * Desenha legenda
     */
    drawLegend(items, x, y) {
        this.ctx.font = '12px Arial';
        this.ctx.textAlign = 'left';

        items.forEach((item, index) => {
            const yPos = y + (index * 20);

            if (item.color) {
                // Desenha círculo colorido
                this.ctx.beginPath();
                this.ctx.arc(x + 8, yPos, 6, 0, 2 * Math.PI);
                this.ctx.fillStyle = item.color;
                this.ctx.fill();
                this.ctx.strokeStyle = '#1f2937';
                this.ctx.lineWidth = 1;
                this.ctx.stroke();

                this.ctx.fillStyle = '#374151';
                this.ctx.fillText(item.text, x + 20, yPos + 4);
            } else if (item.type === 'formula') {
                this.ctx.fillStyle = '#667eea';
                this.ctx.font = 'bold 12px Arial';
                this.ctx.fillText(item.text, x, yPos + 4);
                this.ctx.font = '12px Arial';
            } else {
                this.ctx.fillStyle = '#6b7280';
                this.ctx.fillText(item.text, x, yPos + 4);
            }
        });
    }

    /**
     * Renderiza rotação AVL passo a passo
     */
    renderRotationExample(example, animationStep = 0) {
        this.ctx.fillStyle = '#f9fafb';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        const rotationSteps = this.getRotationSteps(example.rotationType, example.nodes);
        const currentStep = rotationSteps[Math.min(animationStep, rotationSteps.length - 1)];

        // Título
        this.ctx.fillStyle = '#1f2937';
        this.ctx.font = 'bold 18px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(currentStep.title, this.canvas.width / 2, 30);

        // Descrição
        this.ctx.font = '14px Arial';
        this.ctx.fillStyle = '#6b7280';
        this.ctx.fillText(currentStep.description, this.canvas.width / 2, 55);

        // Desenha árvore
        if (currentStep.tree) {
            const centerX = this.canvas.width / 2;
            const startY = 100;
            
            this.annotateTree(currentStep.tree);
            const positions = this.calculateSimplePositions(currentStep.tree, centerX, startY);
            
            this.drawTree(currentStep.tree, positions, {
                showHeights: true,
                showBalanceFactors: true,
                highlightNode: currentStep.highlightNode
            });
        }

        // Seta para próximo passo (se não for o último)
        if (animationStep < rotationSteps.length - 1) {
            this.drawArrow(this.canvas.width / 2, this.canvas.height - 60, 0);
        }

        // Progresso
        const progress = `Passo ${animationStep + 1} de ${rotationSteps.length}`;
        this.ctx.fillStyle = '#667eea';
        this.ctx.font = 'bold 14px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(progress, this.canvas.width / 2, this.canvas.height - 20);
    }

    /**
     * Calcula posições simples para rotações
     */
    calculateSimplePositions(node, x, y) {
        const positions = new Map();
        
        const calculate = (n, cx, cy, offset) => {
            if (!n) return;
            
            positions.set(n.value, { x: cx, y: cy });
            
            if (n.left) calculate(n.left, cx - offset, cy + 80, offset / 2);
            if (n.right) calculate(n.right, cx + offset, cy + 80, offset / 2);
        };
        
        calculate(node, x, y, 80);
        return positions;
    }

    /**
     * Obtém passos da rotação
     */
    getRotationSteps(type, nodes) {
        switch (type) {
            case 'LL':
                return this.getLLRotationSteps(nodes);
            case 'RR':
                return this.getRRRotationSteps(nodes);
            case 'LR':
                return this.getLRRotationSteps(nodes);
            case 'RL':
                return this.getRLRotationSteps(nodes);
            default:
                return [];
        }
    }

    /**
     * Passos da rotação LL (Simples à Direita)
     */
    getLLRotationSteps(nodes) {
        return [
            {
                title: '🔴 Problema: Desbalanceamento LL Detectado',
                description: 'Subárvore esquerda da esquerda está muito pesada (FB > 1)',
                tree: { value: 30, left: { value: 20, left: { value: 10 } } },
                highlightNode: 30
            },
            {
                title: '🔄 Rotação Simples à Direita',
                description: 'O nó 20 sobe e 30 desce para a direita',
                tree: { value: 20, left: { value: 10 }, right: { value: 30 } },
                highlightNode: 20
            },
            {
                title: '✅ Árvore Balanceada!',
                description: 'Todos os nós agora têm FB entre -1 e 1',
                tree: { value: 20, left: { value: 10 }, right: { value: 30 } },
                highlightNode: null
            }
        ];
    }

    /**
     * Passos da rotação RR (Simples à Esquerda)
     */
    getRRRotationSteps(nodes) {
        return [
            {
                title: '🔴 Problema: Desbalanceamento RR Detectado',
                description: 'Subárvore direita da direita está muito pesada (FB < -1)',
                tree: { value: 10, right: { value: 20, right: { value: 30 } } },
                highlightNode: 10
            },
            {
                title: '🔄 Rotação Simples à Esquerda',
                description: 'O nó 20 sobe e 10 desce para a esquerda',
                tree: { value: 20, left: { value: 10 }, right: { value: 30 } },
                highlightNode: 20
            },
            {
                title: '✅ Árvore Balanceada!',
                description: 'Todos os nós agora têm FB entre -1 e 1',
                tree: { value: 20, left: { value: 10 }, right: { value: 30 } },
                highlightNode: null
            }
        ];
    }

    /**
     * Passos da rotação LR (Dupla: Esquerda-Direita)
     */
    getLRRotationSteps(nodes) {
        return [
            {
                title: '🔴 Problema: Desbalanceamento LR Detectado',
                description: 'Filho esquerdo tem subárvore direita pesada',
                tree: { value: 30, left: { value: 10, right: { value: 20 } } },
                highlightNode: 30
            },
            {
                title: '🔄 Primeira Rotação: Esquerda no nó 10',
                description: 'Rotação à esquerda transforma LR em LL',
                tree: { value: 30, left: { value: 20, left: { value: 10 } } },
                highlightNode: 20
            },
            {
                title: '🔄 Segunda Rotação: Direita no nó 30',
                description: 'Rotação à direita balanceia a árvore',
                tree: { value: 20, left: { value: 10 }, right: { value: 30 } },
                highlightNode: 20
            },
            {
                title: '✅ Árvore Balanceada!',
                description: 'Rotação dupla LR completa',
                tree: { value: 20, left: { value: 10 }, right: { value: 30 } },
                highlightNode: null
            }
        ];
    }

    /**
     * Passos da rotação RL (Dupla: Direita-Esquerda)
     */
    getRLRotationSteps(nodes) {
        return [
            {
                title: '🔴 Problema: Desbalanceamento RL Detectado',
                description: 'Filho direito tem subárvore esquerda pesada',
                tree: { value: 10, right: { value: 30, left: { value: 20 } } },
                highlightNode: 10
            },
            {
                title: '🔄 Primeira Rotação: Direita no nó 30',
                description: 'Rotação à direita transforma RL em RR',
                tree: { value: 10, right: { value: 20, right: { value: 30 } } },
                highlightNode: 20
            },
            {
                title: '🔄 Segunda Rotação: Esquerda no nó 10',
                description: 'Rotação à esquerda balanceia a árvore',
                tree: { value: 20, left: { value: 10 }, right: { value: 30 } },
                highlightNode: 20
            },
            {
                title: '✅ Árvore Balanceada!',
                description: 'Rotação dupla RL completa',
                tree: { value: 20, left: { value: 10 }, right: { value: 30 } },
                highlightNode: null
            }
        ];
    }

    /**
     * Desenha seta para baixo
     */
    drawArrow(x, y, rotation = 0) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(rotation);

        this.ctx.fillStyle = '#667eea';
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(-10, -15);
        this.ctx.lineTo(10, -15);
        this.ctx.closePath();
        this.ctx.fill();

        this.ctx.restore();
    }

    /**
     * Renderiza exemplo baseado no tipo
     */
    renderExample(exampleId, options = {}) {
        const example = this.getExamples().find(ex => ex.id === exampleId);
        if (!example) {
            console.error('Exemplo não encontrado:', exampleId);
            return;
        }

        switch (example.type) {
            case 'binary':
                this.renderBinaryExample(example);
                break;
            case 'avl':
                this.renderAVLExample(example);
                break;
            case 'avl-rotation':
                this.renderRotationExample(example, options.step || 0);
                break;
            case 'tutorial':
                this.renderBalanceFactorTutorial(options.step || 0);
                break;
        }

        this.currentExample = example;
    }
}

// Exporta para uso global
window.TreeVisualExamples = TreeVisualExamples;
