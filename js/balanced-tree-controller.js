// ===== BALANCED TREE CONTROLLER (AVL) =====

/**
 * Classe Node para Árvore AVL
 */
class AVLNode {
    constructor(valor) {
        this.valor = valor;
        this.esquerda = null;
        this.direita = null;
        this.altura = 0;
        this.x = 0;
        this.y = 0;
    }
}

/**
 * Classe para Árvore AVL (Auto-Balanceada)
 */
class AVLTree {
    constructor() {
        this.raiz = null;
        this.passos = [];
        this.comparacoes = 0;
        this.rotacoes = 0;
    }

    altura(no) {
        return no === null ? -1 : no.altura;
    }

    fatorBalanceamento(no) {
        return no === null ? 0 : this.altura(no.esquerda) - this.altura(no.direita);
    }

    atualizarAltura(no) {
        if (no !== null) {
            no.altura = Math.max(this.altura(no.esquerda), this.altura(no.direita)) + 1;
        }
    }

    rotacaoDireita(z) {
        this.rotacoes++;
        this.passos.push({
            tipo: 'rotacao',
            mensagem: `🔄 Rotação à DIREITA no nó ${z.valor}`,
            no: z
        });

        const y = z.esquerda;
        const T3 = y.direita;

        // Realizar rotação
        y.direita = z;
        z.esquerda = T3;

        // Atualizar alturas
        this.atualizarAltura(z);
        this.atualizarAltura(y);

        return y;
    }

    rotacaoEsquerda(z) {
        this.rotacoes++;
        this.passos.push({
            tipo: 'rotacao',
            mensagem: `🔄 Rotação à ESQUERDA no nó ${z.valor}`,
            no: z
        });

        const y = z.direita;
        const T2 = y.esquerda;

        // Realizar rotação
        y.esquerda = z;
        z.direita = T2;

        // Atualizar alturas
        this.atualizarAltura(z);
        this.atualizarAltura(y);

        return y;
    }

    inserir(valor) {
        this.passos = [];
        this.comparacoes = 0;
        this.rotacoes = 0;
        
        this.raiz = this.inserirRecursivo(this.raiz, valor);
        return this.raiz !== null;
    }

    inserirRecursivo(no, valor) {
        // 1. Inserção BST normal
        if (no === null) {
            this.passos.push({
                tipo: 'inserir',
                mensagem: `➕ Inserindo valor ${valor}`,
                valor: valor
            });
            return new AVLNode(valor);
        }

        this.comparacoes++;

        if (valor < no.valor) {
            this.passos.push({
                tipo: 'comparacao',
                mensagem: `${valor} < ${no.valor}, indo para esquerda`,
                no: no
            });
            no.esquerda = this.inserirRecursivo(no.esquerda, valor);
        } else if (valor > no.valor) {
            this.passos.push({
                tipo: 'comparacao',
                mensagem: `${valor} > ${no.valor}, indo para direita`,
                no: no
            });
            no.direita = this.inserirRecursivo(no.direita, valor);
        } else {
            // Valor duplicado
            this.passos.push({
                tipo: 'erro',
                mensagem: `❌ Valor ${valor} já existe`,
                no: no
            });
            return no;
        }

        // 2. Atualizar altura
        this.atualizarAltura(no);

        // 3. Calcular fator de balanceamento
        const fb = this.fatorBalanceamento(no);
        
        this.passos.push({
            tipo: 'balanceamento',
            mensagem: `Nó ${no.valor}: FB = ${fb}, Altura = ${no.altura}`,
            no: no,
            fb: fb
        });

        // 4. Balancear se necessário

        // Caso LL (Left-Left)
        if (fb > 1 && valor < no.esquerda.valor) {
            this.passos.push({
                tipo: 'desbalanceado',
                mensagem: `⚠️ Caso LL: FB = ${fb} no nó ${no.valor}`,
                no: no
            });
            return this.rotacaoDireita(no);
        }

        // Caso RR (Right-Right)
        if (fb < -1 && valor > no.direita.valor) {
            this.passos.push({
                tipo: 'desbalanceado',
                mensagem: `⚠️ Caso RR: FB = ${fb} no nó ${no.valor}`,
                no: no
            });
            return this.rotacaoEsquerda(no);
        }

        // Caso LR (Left-Right)
        if (fb > 1 && valor > no.esquerda.valor) {
            this.passos.push({
                tipo: 'desbalanceado',
                mensagem: `⚠️ Caso LR: FB = ${fb} no nó ${no.valor}`,
                no: no
            });
            no.esquerda = this.rotacaoEsquerda(no.esquerda);
            return this.rotacaoDireita(no);
        }

        // Caso RL (Right-Left)
        if (fb < -1 && valor < no.direita.valor) {
            this.passos.push({
                tipo: 'desbalanceado',
                mensagem: `⚠️ Caso RL: FB = ${fb} no nó ${no.valor}`,
                no: no
            });
            no.direita = this.rotacaoDireita(no.direita);
            return this.rotacaoEsquerda(no);
        }

        return no;
    }

    remover(valor) {
        this.passos = [];
        this.comparacoes = 0;
        this.rotacoes = 0;
        
        this.raiz = this.removerRecursivo(this.raiz, valor);
        return this.raiz;
    }

    removerRecursivo(no, valor) {
        if (no === null) {
            this.passos.push({
                tipo: 'erro',
                mensagem: `❌ Valor ${valor} não encontrado`,
            });
            return null;
        }

        this.comparacoes++;

        if (valor < no.valor) {
            no.esquerda = this.removerRecursivo(no.esquerda, valor);
        } else if (valor > no.valor) {
            no.direita = this.removerRecursivo(no.direita, valor);
        } else {
            // Nó encontrado
            this.passos.push({
                tipo: 'encontrado',
                mensagem: `✅ Encontrado nó ${valor} para remoção`,
                no: no
            });

            // Nó com 0 ou 1 filho
            if (no.esquerda === null || no.direita === null) {
                const temp = no.esquerda ? no.esquerda : no.direita;
                
                if (temp === null) {
                    // Nó folha
                    this.passos.push({
                        tipo: 'remover',
                        mensagem: `Removendo folha ${valor}`,
                        no: no
                    });
                    return null;
                } else {
                    // Um filho
                    this.passos.push({
                        tipo: 'remover',
                        mensagem: `Removendo ${valor}, substituindo por filho`,
                        no: no
                    });
                    return temp;
                }
            }

            // Nó com 2 filhos
            const sucessor = this.encontrarMinimo(no.direita);
            this.passos.push({
                tipo: 'remover',
                mensagem: `Removendo ${valor}, substituindo por sucessor ${sucessor.valor}`,
                no: no
            });
            
            no.valor = sucessor.valor;
            no.direita = this.removerRecursivo(no.direita, sucessor.valor);
        }

        if (no === null) return null;

        // Atualizar altura
        this.atualizarAltura(no);

        // Balancear
        const fb = this.fatorBalanceamento(no);

        // Caso LL
        if (fb > 1 && this.fatorBalanceamento(no.esquerda) >= 0) {
            return this.rotacaoDireita(no);
        }

        // Caso LR
        if (fb > 1 && this.fatorBalanceamento(no.esquerda) < 0) {
            no.esquerda = this.rotacaoEsquerda(no.esquerda);
            return this.rotacaoDireita(no);
        }

        // Caso RR
        if (fb < -1 && this.fatorBalanceamento(no.direita) <= 0) {
            return this.rotacaoEsquerda(no);
        }

        // Caso RL
        if (fb < -1 && this.fatorBalanceamento(no.direita) > 0) {
            no.direita = this.rotacaoDireita(no.direita);
            return this.rotacaoEsquerda(no);
        }

        return no;
    }

    encontrarMinimo(no) {
        while (no.esquerda !== null) {
            no = no.esquerda;
        }
        return no;
    }

    estaBalanceada(no = this.raiz) {
        if (no === null) return true;
        
        const fb = Math.abs(this.fatorBalanceamento(no));
        
        if (fb > 1) return false;
        
        return this.estaBalanceada(no.esquerda) && this.estaBalanceada(no.direita);
    }

    contarNos(no = this.raiz) {
        if (no === null) return 0;
        return 1 + this.contarNos(no.esquerda) + this.contarNos(no.direita);
    }

    limpar() {
        this.raiz = null;
        this.passos = [];
        this.comparacoes = 0;
        this.rotacoes = 0;
    }
}

/**
 * Controlador de Visualização de Árvores Balanceadas
 */
class BalancedTreeVisualizationController {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.tree = new AVLTree();
        this.animationSpeed = 1200;
        this.isAnimating = false;
        this.highlightedNodes = new Set();
        
        this.nodeRadius = 30;
        this.horizontalSpacing = 70;
        this.verticalSpacing = 90;
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        const insertBtn = document.getElementById('balancedInsert');
        const deleteBtn = document.getElementById('balancedDelete');
        const clearBtn = document.getElementById('balancedClear');
        const input = document.getElementById('balancedValue');

        if (insertBtn) {
            insertBtn.addEventListener('click', () => {
                const valor = parseInt(input.value);
                if (!isNaN(valor) && valor >= 1 && valor <= 100) {
                    this.inserirComAnimacao(valor);
                    input.value = '';
                } else {
                    this.mostrarMensagem('Digite um valor entre 1 e 100', 'erro');
                }
            });
        }

        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                const valor = parseInt(input.value);
                if (!isNaN(valor)) {
                    this.removerComAnimacao(valor);
                    input.value = '';
                } else {
                    this.mostrarMensagem('Digite um valor para remover', 'erro');
                }
            });
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                this.tree.limpar();
                this.desenhar();
                this.atualizarEstatisticas();
                this.mostrarMensagem('Árvore limpa!', 'sucesso');
            });
        }

        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    insertBtn.click();
                }
            });
        }
    }

    async inserirComAnimacao(valor) {
        if (this.isAnimating) {
            this.mostrarMensagem('Aguarde a animação anterior terminar', 'aviso');
            return;
        }

        this.isAnimating = true;
        this.tree.inserir(valor);
        
        for (const passo of this.tree.passos) {
            this.highlightedNodes.clear();
            if (passo.no) {
                this.highlightedNodes.add(passo.no);
            }
            
            this.desenhar();
            this.mostrarMensagem(passo.mensagem, passo.tipo);
            
            await this.esperar(this.animationSpeed);
        }
        
        this.highlightedNodes.clear();
        this.desenhar();
        this.atualizarEstatisticas();
        
        const resumo = `✅ Valor ${valor} inserido! Comparações: ${this.tree.comparacoes}, Rotações: ${this.tree.rotacoes}`;
        this.mostrarMensagem(resumo, 'sucesso');
        
        this.isAnimating = false;
    }

    async removerComAnimacao(valor) {
        if (this.isAnimating) {
            this.mostrarMensagem('Aguarde a animação anterior terminar', 'aviso');
            return;
        }

        this.isAnimating = true;
        this.tree.remover(valor);
        
        for (const passo of this.tree.passos) {
            this.highlightedNodes.clear();
            if (passo.no) {
                this.highlightedNodes.add(passo.no);
            }
            
            this.desenhar();
            this.mostrarMensagem(passo.mensagem, passo.tipo);
            
            await this.esperar(this.animationSpeed);
        }
        
        this.highlightedNodes.clear();
        this.desenhar();
        this.atualizarEstatisticas();
        this.isAnimating = false;
    }

    calcularPosicoes() {
        if (this.tree.raiz === null) return;
        
        const larguraArvore = Math.pow(2, this.tree.altura(this.tree.raiz) + 1) * this.horizontalSpacing;
        this.calcularPosicoesRecursivo(this.tree.raiz, larguraArvore / 2, 50, larguraArvore / 4);
    }

    calcularPosicoesRecursivo(no, x, y, offset) {
        if (no === null) return;
        
        no.x = x;
        no.y = y;
        
        if (no.esquerda) {
            this.calcularPosicoesRecursivo(
                no.esquerda,
                x - offset,
                y + this.verticalSpacing,
                offset / 2
            );
        }
        
        if (no.direita) {
            this.calcularPosicoesRecursivo(
                no.direita,
                x + offset,
                y + this.verticalSpacing,
                offset / 2
            );
        }
    }

    desenhar() {
        if (!this.canvas) return;
        
        if (this.tree.raiz === null) {
            this.canvas.innerHTML = '<p class="placeholder">Insira valores para construir a árvore AVL</p>';
            return;
        }
        
        this.calcularPosicoes();
        
        const altura = (this.tree.altura(this.tree.raiz) + 1) * this.verticalSpacing + 50;
        const largura = Math.max(800, Math.pow(2, this.tree.altura(this.tree.raiz) + 1) * this.horizontalSpacing);
        
        let svg = `<svg width="${largura}" height="${altura}" style="margin: 0 auto; display: block;">`;
        
        svg += this.desenharArestas(this.tree.raiz);
        svg += this.desenharNos(this.tree.raiz);
        
        svg += '</svg>';
        
        this.canvas.innerHTML = svg;
    }

    desenharArestas(no) {
        if (no === null) return '';
        
        let svg = '';
        
        if (no.esquerda) {
            svg += `<line x1="${no.x}" y1="${no.y}" x2="${no.esquerda.x}" y2="${no.esquerda.y}" 
                    stroke="#cbd5e0" stroke-width="2" />`;
            svg += this.desenharArestas(no.esquerda);
        }
        
        if (no.direita) {
            svg += `<line x1="${no.x}" y1="${no.y}" x2="${no.direita.x}" y2="${no.direita.y}" 
                    stroke="#cbd5e0" stroke-width="2" />`;
            svg += this.desenharArestas(no.direita);
        }
        
        return svg;
    }

    desenharNos(no) {
        if (no === null) return '';
        
        let svg = '';
        const isHighlighted = this.highlightedNodes.has(no);
        const fb = this.tree.fatorBalanceamento(no);
        
        // Cor baseada no fator de balanceamento
        let fillColor;
        if (Math.abs(fb) > 1) {
            fillColor = '#f56565'; // Desbalanceado - vermelho
        } else if (isHighlighted) {
            fillColor = '#667eea'; // Destacado - roxo
        } else {
            fillColor = '#48bb78'; // Balanceado - verde
        }
        
        // Círculo do nó
        svg += `<circle cx="${no.x}" cy="${no.y}" r="${this.nodeRadius}" 
                fill="${fillColor}" stroke="#2d3748" stroke-width="2" />`;
        
        // Valor do nó
        svg += `<text x="${no.x}" y="${no.y + 5}" text-anchor="middle" 
                fill="white" font-size="16" font-weight="bold">${no.valor}</text>`;
        
        // Fator de balanceamento (pequeno texto acima do nó)
        svg += `<text x="${no.x}" y="${no.y - this.nodeRadius - 5}" text-anchor="middle" 
                fill="#4a5568" font-size="12" font-weight="bold">FB:${fb}</text>`;
        
        // Altura (pequeno texto abaixo do nó)
        svg += `<text x="${no.x}" y="${no.y + this.nodeRadius + 15}" text-anchor="middle" 
                fill="#718096" font-size="11">h:${no.altura}</text>`;
        
        // Desenhar filhos
        svg += this.desenharNos(no.esquerda);
        svg += this.desenharNos(no.direita);
        
        return svg;
    }

    atualizarEstatisticas() {
        const heightEl = document.getElementById('balancedHeight');
        const nodesEl = document.getElementById('balancedNodes');
        const statusEl = document.getElementById('balancedStatus');
        const rotationsEl = document.getElementById('balancedRotations');
        
        if (heightEl) heightEl.textContent = this.tree.altura(this.tree.raiz);
        if (nodesEl) nodesEl.textContent = this.tree.contarNos();
        if (statusEl) statusEl.textContent = this.tree.estaBalanceada() ? '✅' : '❌';
        if (rotationsEl) rotationsEl.textContent = this.tree.rotacoes;
    }

    mostrarMensagem(texto, tipo = 'info', duracao = 3000) {
        let msgArea = document.getElementById('balancedMensagens');
        
        if (!msgArea) {
            msgArea = document.createElement('div');
            msgArea.id = 'balancedMensagens';
            msgArea.style.cssText = `
                position: fixed;
                top: 80px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                font-weight: 500;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 1000;
                max-width: 450px;
                animation: slideIn 0.3s ease-out;
            `;
            document.body.appendChild(msgArea);
        }
        
        const cores = {
            'sucesso': { bg: '#48bb78', text: 'white' },
            'erro': { bg: '#f56565', text: 'white' },
            'aviso': { bg: '#ed8936', text: 'white' },
            'info': { bg: '#4299e1', text: 'white' },
            'comparacao': { bg: '#667eea', text: 'white' },
            'balanceamento': { bg: '#38b2ac', text: 'white' },
            'desbalanceado': { bg: '#f56565', text: 'white' },
            'rotacao': { bg: '#ed8936', text: 'white' },
            'inserir': { bg: '#48bb78', text: 'white' },
            'remover': { bg: '#ed8936', text: 'white' },
            'encontrado': { bg: '#48bb78', text: 'white' }
        };
        
        const cor = cores[tipo] || cores['info'];
        msgArea.style.backgroundColor = cor.bg;
        msgArea.style.color = cor.text;
        msgArea.textContent = texto;
        msgArea.style.display = 'block';
        
        setTimeout(() => {
            msgArea.style.display = 'none';
        }, duracao);
    }

    esperar(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Inicializar quando o módulo de árvores balanceadas for carregado
window.initializeBalancedTreeVisualization = function() {
    if (document.getElementById('balancedCanvas')) {
        window.balancedTreeController = new BalancedTreeVisualizationController('balancedCanvas');
        console.log('✅ Visualização de Árvores AVL inicializada');
    }
};

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.AVLTree = AVLTree;
    window.BalancedTreeVisualizationController = BalancedTreeVisualizationController;
    console.log('✅ BalancedTreeController carregado');
}
