// ===== BINARY TREE CONTROLLER =====

/**
 * Classe Node para Árvore Binária
 */
class TreeNode {
    constructor(valor) {
        this.valor = valor;
        this.esquerda = null;
        this.direita = null;
        this.x = 0;
        this.y = 0;
    }
}

/**
 * Classe para Árvore Binária de Busca
 */
class BinarySearchTree {
    constructor() {
        this.raiz = null;
        this.passos = [];
        this.comparacoes = 0;
    }

    inserir(valor) {
        this.passos = [];
        this.comparacoes = 0;
        
        const novoNo = new TreeNode(valor);
        
        if (this.raiz === null) {
            this.raiz = novoNo;
            this.passos.push({
                tipo: 'inserir',
                no: novoNo,
                mensagem: `Inserindo ${valor} como raiz da árvore`
            });
            return true;
        }
        
        let atual = this.raiz;
        let pai = null;
        let direcao = '';
        
        while (atual !== null) {
            this.comparacoes++;
            pai = atual;
            
            if (valor === atual.valor) {
                this.passos.push({
                    tipo: 'erro',
                    no: atual,
                    mensagem: `Valor ${valor} já existe na árvore`
                });
                return false;
            }
            
            if (valor < atual.valor) {
                this.passos.push({
                    tipo: 'comparacao',
                    no: atual,
                    mensagem: `${valor} < ${atual.valor}, indo para esquerda`
                });
                if (atual.esquerda === null) {
                    atual.esquerda = novoNo;
                    this.passos.push({
                        tipo: 'inserir',
                        no: novoNo,
                        mensagem: `Inserindo ${valor} à esquerda de ${atual.valor}`
                    });
                    return true;
                }
                atual = atual.esquerda;
            } else {
                this.passos.push({
                    tipo: 'comparacao',
                    no: atual,
                    mensagem: `${valor} > ${atual.valor}, indo para direita`
                });
                if (atual.direita === null) {
                    atual.direita = novoNo;
                    this.passos.push({
                        tipo: 'inserir',
                        no: novoNo,
                        mensagem: `Inserindo ${valor} à direita de ${atual.valor}`
                    });
                    return true;
                }
                atual = atual.direita;
            }
        }
        
        return false;
    }

    buscar(valor) {
        this.passos = [];
        this.comparacoes = 0;
        
        if (this.raiz === null) {
            this.passos.push({
                tipo: 'erro',
                mensagem: 'Árvore vazia'
            });
            return false;
        }
        
        let atual = this.raiz;
        
        while (atual !== null) {
            this.comparacoes++;
            
            if (valor === atual.valor) {
                this.passos.push({
                    tipo: 'encontrado',
                    no: atual,
                    mensagem: `✅ Valor ${valor} encontrado! (${this.comparacoes} comparações)`
                });
                return true;
            }
            
            if (valor < atual.valor) {
                this.passos.push({
                    tipo: 'comparacao',
                    no: atual,
                    mensagem: `${valor} < ${atual.valor}, buscando à esquerda`
                });
                atual = atual.esquerda;
            } else {
                this.passos.push({
                    tipo: 'comparacao',
                    no: atual,
                    mensagem: `${valor} > ${atual.valor}, buscando à direita`
                });
                atual = atual.direita;
            }
        }
        
        this.passos.push({
            tipo: 'nao_encontrado',
            mensagem: `❌ Valor ${valor} não encontrado (${this.comparacoes} comparações)`
        });
        return false;
    }

    remover(valor) {
        this.passos = [];
        this.comparacoes = 0;
        
        this.raiz = this.removerNo(this.raiz, valor);
        return this.raiz;
    }

    removerNo(no, valor) {
        if (no === null) {
            this.passos.push({
                tipo: 'erro',
                mensagem: `Valor ${valor} não encontrado para remoção`
            });
            return null;
        }

        this.comparacoes++;

        if (valor < no.valor) {
            this.passos.push({
                tipo: 'comparacao',
                no: no,
                mensagem: `${valor} < ${no.valor}, buscando à esquerda`
            });
            no.esquerda = this.removerNo(no.esquerda, valor);
            return no;
        } else if (valor > no.valor) {
            this.passos.push({
                tipo: 'comparacao',
                no: no,
                mensagem: `${valor} > ${no.valor}, buscando à direita`
            });
            no.direita = this.removerNo(no.direita, valor);
            return no;
        }

        // Encontrou o nó a remover
        this.passos.push({
            tipo: 'encontrado',
            no: no,
            mensagem: `Encontrado nó ${valor} para remoção`
        });

        // Caso 1: Nó folha (sem filhos)
        if (no.esquerda === null && no.direita === null) {
            this.passos.push({
                tipo: 'remover',
                no: no,
                mensagem: `Removendo folha ${valor}`
            });
            return null;
        }

        // Caso 2: Nó com apenas filho direito
        if (no.esquerda === null) {
            this.passos.push({
                tipo: 'remover',
                no: no,
                mensagem: `Removendo ${valor}, substituindo por filho direito`
            });
            return no.direita;
        }

        // Caso 3: Nó com apenas filho esquerdo
        if (no.direita === null) {
            this.passos.push({
                tipo: 'remover',
                no: no,
                mensagem: `Removendo ${valor}, substituindo por filho esquerdo`
            });
            return no.esquerda;
        }

        // Caso 4: Nó com dois filhos - encontrar sucessor in-order
        const sucessor = this.encontrarMinimo(no.direita);
        this.passos.push({
            tipo: 'remover',
            no: no,
            mensagem: `Removendo ${valor} (2 filhos), substituindo por sucessor ${sucessor.valor}`
        });
        
        no.valor = sucessor.valor;
        no.direita = this.removerNo(no.direita, sucessor.valor);
        return no;
    }

    encontrarMinimo(no) {
        while (no.esquerda !== null) {
            no = no.esquerda;
        }
        return no;
    }

    // Percursos
    inOrder(no = this.raiz, resultado = []) {
        if (no !== null) {
            this.inOrder(no.esquerda, resultado);
            resultado.push(no.valor);
            this.inOrder(no.direita, resultado);
        }
        return resultado;
    }

    preOrder(no = this.raiz, resultado = []) {
        if (no !== null) {
            resultado.push(no.valor);
            this.preOrder(no.esquerda, resultado);
            this.preOrder(no.direita, resultado);
        }
        return resultado;
    }

    postOrder(no = this.raiz, resultado = []) {
        if (no !== null) {
            this.postOrder(no.esquerda, resultado);
            this.postOrder(no.direita, resultado);
            resultado.push(no.valor);
        }
        return resultado;
    }

    levelOrder() {
        if (this.raiz === null) return [];
        
        const resultado = [];
        const fila = [this.raiz];
        
        while (fila.length > 0) {
            const no = fila.shift();
            resultado.push(no.valor);
            
            if (no.esquerda) fila.push(no.esquerda);
            if (no.direita) fila.push(no.direita);
        }
        
        return resultado;
    }

    altura(no = this.raiz) {
        if (no === null) return -1;
        
        const alturaEsq = this.altura(no.esquerda);
        const alturaDir = this.altura(no.direita);
        
        return Math.max(alturaEsq, alturaDir) + 1;
    }

    contarNos(no = this.raiz) {
        if (no === null) return 0;
        return 1 + this.contarNos(no.esquerda) + this.contarNos(no.direita);
    }

    contarFolhas(no = this.raiz) {
        if (no === null) return 0;
        if (no.esquerda === null && no.direita === null) return 1;
        return this.contarFolhas(no.esquerda) + this.contarFolhas(no.direita);
    }

    limpar() {
        this.raiz = null;
        this.passos = [];
        this.comparacoes = 0;
    }
}

/**
 * Controlador de Visualização da Árvore
 */
class TreeVisualizationController {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.tree = new BinarySearchTree();
        this.animationSpeed = 1000;
        this.currentStep = 0;
        this.isAnimating = false;
        this.highlightedNodes = new Set();
        
        this.nodeRadius = 25;
        this.horizontalSpacing = 60;
        this.verticalSpacing = 80;
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        const insertBtn = document.getElementById('treeInsert');
        const searchBtn = document.getElementById('treeSearch');
        const deleteBtn = document.getElementById('treeDelete');
        const clearBtn = document.getElementById('treeClear');
        const input = document.getElementById('treeValue');

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

        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                const valor = parseInt(input.value);
                if (!isNaN(valor)) {
                    this.buscarComAnimacao(valor);
                } else {
                    this.mostrarMensagem('Digite um valor para buscar', 'erro');
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

        // Botões de percurso
        this.setupTraversalButtons();
    }

    setupTraversalButtons() {
        const percursos = ['inOrder', 'preOrder', 'postOrder', 'levelOrder'];
        
        percursos.forEach(percurso => {
            const btn = document.getElementById(`tree${percurso.charAt(0).toUpperCase() + percurso.slice(1)}`);
            if (btn) {
                btn.addEventListener('click', () => {
                    this.mostrarPercurso(percurso);
                });
            }
        });
    }

    async inserirComAnimacao(valor) {
        if (this.isAnimating) {
            this.mostrarMensagem('Aguarde a animação anterior terminar', 'aviso');
            return;
        }

        const sucesso = this.tree.inserir(valor);
        
        if (!sucesso) {
            this.mostrarMensagem(`Valor ${valor} já existe na árvore`, 'erro');
            return;
        }

        this.isAnimating = true;
        
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
        this.mostrarMensagem(`✅ Valor ${valor} inserido! (${this.tree.comparacoes} comparações)`, 'sucesso');
        this.isAnimating = false;
    }

    async buscarComAnimacao(valor) {
        if (this.isAnimating) {
            this.mostrarMensagem('Aguarde a animação anterior terminar', 'aviso');
            return;
        }

        this.isAnimating = true;
        const encontrado = this.tree.buscar(valor);
        
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

    mostrarPercurso(tipo) {
        let resultado = [];
        let nome = '';
        
        switch(tipo) {
            case 'inOrder':
                resultado = this.tree.inOrder();
                nome = 'In-Order';
                break;
            case 'preOrder':
                resultado = this.tree.preOrder();
                nome = 'Pre-Order';
                break;
            case 'postOrder':
                resultado = this.tree.postOrder();
                nome = 'Post-Order';
                break;
            case 'levelOrder':
                resultado = this.tree.levelOrder();
                nome = 'Level-Order';
                break;
        }
        
        this.mostrarMensagem(`${nome}: [${resultado.join(', ')}]`, 'info', 5000);
    }

    calcularPosicoes() {
        if (this.tree.raiz === null) return;
        
        const larguraArvore = Math.pow(2, this.tree.altura() + 1) * this.horizontalSpacing;
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
            this.canvas.innerHTML = '<p class="placeholder">Insira valores para construir a árvore</p>';
            return;
        }
        
        this.calcularPosicoes();
        
        // Criar SVG
        const altura = (this.tree.altura() + 1) * this.verticalSpacing + 50;
        const largura = Math.max(800, Math.pow(2, this.tree.altura() + 1) * this.horizontalSpacing);
        
        let svg = `<svg width="${largura}" height="${altura}" style="margin: 0 auto; display: block;">`;
        
        // Desenhar arestas primeiro
        svg += this.desenharArestas(this.tree.raiz);
        
        // Desenhar nós
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
        const fillColor = isHighlighted ? '#667eea' : '#48bb78';
        const textColor = 'white';
        
        // Círculo do nó
        svg += `<circle cx="${no.x}" cy="${no.y}" r="${this.nodeRadius}" 
                fill="${fillColor}" stroke="#2d3748" stroke-width="2" />`;
        
        // Valor do nó
        svg += `<text x="${no.x}" y="${no.y + 5}" text-anchor="middle" 
                fill="${textColor}" font-size="16" font-weight="bold">${no.valor}</text>`;
        
        // Desenhar filhos
        svg += this.desenharNos(no.esquerda);
        svg += this.desenharNos(no.direita);
        
        return svg;
    }

    atualizarEstatisticas() {
        const heightEl = document.getElementById('treeHeight');
        const nodesEl = document.getElementById('treeNodes');
        const leavesEl = document.getElementById('treeLeaves');
        
        if (heightEl) heightEl.textContent = this.tree.altura();
        if (nodesEl) nodesEl.textContent = this.tree.contarNos();
        if (leavesEl) leavesEl.textContent = this.tree.contarFolhas();
    }

    mostrarMensagem(texto, tipo = 'info', duracao = 3000) {
        // Criar ou atualizar área de mensagens
        let msgArea = document.getElementById('treeMensagens');
        
        if (!msgArea) {
            msgArea = document.createElement('div');
            msgArea.id = 'treeMensagens';
            msgArea.style.cssText = `
                position: fixed;
                top: 80px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                font-weight: 500;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 1000;
                max-width: 400px;
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
            'encontrado': { bg: '#48bb78', text: 'white' },
            'nao_encontrado': { bg: '#f56565', text: 'white' },
            'inserir': { bg: '#48bb78', text: 'white' },
            'remover': { bg: '#ed8936', text: 'white' }
        };
        
        const cor = cores[tipo] || cores['info'];
        msgArea.style.backgroundColor = cor.bg;
        msgArea.style.color = cor.text;
        msgArea.textContent = texto;
        msgArea.style.display = 'block';
        
        // Auto-ocultar após duração
        setTimeout(() => {
            msgArea.style.display = 'none';
        }, duracao);
    }

    esperar(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Inicializar quando o módulo de árvores for carregado
window.initializeTreeVisualization = function() {
    if (document.getElementById('treeCanvas')) {
        window.treeController = new TreeVisualizationController('treeCanvas');
        console.log('✅ Visualização de Árvores Binárias inicializada');
    }
};

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.BinarySearchTree = BinarySearchTree;
    window.TreeVisualizationController = TreeVisualizationController;
    console.log('✅ TreeController carregado');
}
