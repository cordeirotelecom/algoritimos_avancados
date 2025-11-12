// ===== EXEMPLOS PRÉ-DEFINIDOS PARA ÁRVORES =====

/**
 * Exemplos prontos para demonstração
 */
const TreeExamples = {
    // Árvores Binárias
    bst: {
        balanceada: [50, 30, 70, 20, 40, 60, 80],
        degenerada: [10, 20, 30, 40, 50, 60, 70],
        completa: [40, 20, 60, 10, 30, 50, 70, 5, 15, 25, 35, 45, 55, 65, 75],
        pequena: [50, 30, 70],
        fibonacci: [21, 13, 34, 8, 18, 29, 55, 5, 10, 15, 20, 25, 30, 50, 89],
        aleatoria: () => {
            const arr = [];
            const count = Math.floor(Math.random() * 10) + 5; // 5-15 nós
            while (arr.length < count) {
                const num = Math.floor(Math.random() * 100) + 1;
                if (!arr.includes(num)) arr.push(num);
            }
            return arr;
        }
    },
    
    // Árvores AVL
    avl: {
        rotacaoLL: [30, 20, 10], // Causa rotação direita
        rotacaoRR: [10, 20, 30], // Causa rotação esquerda
        rotacaoLR: [30, 10, 20], // Causa rotação dupla LR
        rotacaoRL: [10, 30, 20], // Causa rotação dupla RL
        complexa: [50, 25, 75, 10, 30, 60, 80, 5, 15, 27, 35],
        teste: [40, 20, 60, 10, 30, 50, 70, 5, 15, 25, 35, 45, 55, 65, 75]
    }
};

/**
 * Controlador de Exemplos
 */
class TreeExamplesController {
    constructor() {
        this.setupExampleButtons();
    }

    setupExampleButtons() {
        // Botões para BST
        const bstExamples = document.getElementById('bstExamples');
        if (bstExamples) {
            bstExamples.innerHTML = `
                <div class="examples-container">
                    <h4>📋 Exemplos Prontos:</h4>
                    <div class="example-buttons">
                        <button class="btn btn-outline-sm" data-example="bst-balanceada">
                            ⚖️ Balanceada
                        </button>
                        <button class="btn btn-outline-sm" data-example="bst-degenerada">
                            ⚠️ Degenerada
                        </button>
                        <button class="btn btn-outline-sm" data-example="bst-completa">
                            📦 Completa
                        </button>
                        <button class="btn btn-outline-sm" data-example="bst-pequena">
                            🌱 Pequena
                        </button>
                        <button class="btn btn-outline-sm" data-example="bst-aleatoria">
                            🎲 Aleatória
                        </button>
                    </div>
                </div>
            `;

            // Event listeners para BST
            document.querySelectorAll('[data-example^="bst-"]').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const example = e.target.dataset.example.replace('bst-', '');
                    this.loadBSTExample(example);
                });
            });
        }

        // Botões para AVL
        const avlExamples = document.getElementById('avlExamples');
        if (avlExamples) {
            avlExamples.innerHTML = `
                <div class="examples-container">
                    <h4>📋 Exemplos de Rotações:</h4>
                    <div class="example-buttons">
                        <button class="btn btn-outline-sm" data-example="avl-rotacaoLL">
                            ↪️ Rotação LL
                        </button>
                        <button class="btn btn-outline-sm" data-example="avl-rotacaoRR">
                            ↩️ Rotação RR
                        </button>
                        <button class="btn btn-outline-sm" data-example="avl-rotacaoLR">
                            🔄 Rotação LR
                        </button>
                        <button class="btn btn-outline-sm" data-example="avl-rotacaoRL">
                            🔃 Rotação RL
                        </button>
                        <button class="btn btn-outline-sm" data-example="avl-complexa">
                            🌳 Complexa
                        </button>
                        <button class="btn btn-outline-sm" data-example="avl-teste">
                            🧪 Teste Completo
                        </button>
                    </div>
                </div>
            `;

            // Event listeners para AVL
            document.querySelectorAll('[data-example^="avl-"]').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const example = e.target.dataset.example.replace('avl-', '');
                    this.loadAVLExample(example);
                });
            });
        }
    }

    async loadBSTExample(exampleName) {
        if (!window.treeController) {
            console.warn('Tree controller não inicializado');
            return;
        }

        // Limpar árvore atual
        window.treeController.tree.limpar();
        window.treeController.desenhar();
        window.treeController.atualizarEstatisticas();

        // Obter valores do exemplo
        let valores = TreeExamples.bst[exampleName];
        if (typeof valores === 'function') {
            valores = valores();
        }

        // Mensagem inicial
        window.treeController.mostrarMensagem(
            `Carregando exemplo: ${this.getExampleName(exampleName)}`,
            'info',
            2000
        );

        await this.esperar(1000);

        // Inserir valores com delay
        for (let i = 0; i < valores.length; i++) {
            const valor = valores[i];
            
            // Mostrar progresso
            window.treeController.mostrarMensagem(
                `Inserindo ${valor} (${i + 1}/${valores.length})`,
                'info',
                800
            );

            window.treeController.tree.inserir(valor);
            window.treeController.desenhar();
            window.treeController.atualizarEstatisticas();

            await this.esperar(600);
        }

        // Mensagem final
        window.treeController.mostrarMensagem(
            `✅ Exemplo "${this.getExampleName(exampleName)}" carregado! ${valores.length} nós inseridos.`,
            'sucesso',
            3000
        );
    }

    async loadAVLExample(exampleName) {
        if (!window.balancedTreeController) {
            console.warn('Balanced tree controller não inicializado');
            return;
        }

        // Limpar árvore atual
        window.balancedTreeController.tree.limpar();
        window.balancedTreeController.desenhar();
        window.balancedTreeController.atualizarEstatisticas();

        // Obter valores do exemplo
        const valores = TreeExamples.avl[exampleName];

        // Mensagem inicial
        window.balancedTreeController.mostrarMensagem(
            `Carregando exemplo: ${this.getExampleName(exampleName)}`,
            'info',
            2000
        );

        await this.esperar(1000);

        // Inserir valores com delay e animação
        for (let i = 0; i < valores.length; i++) {
            const valor = valores[i];
            
            window.balancedTreeController.mostrarMensagem(
                `Inserindo ${valor} (${i + 1}/${valores.length})`,
                'info',
                1000
            );

            await window.balancedTreeController.inserirComAnimacao(valor);
            await this.esperar(500);
        }

        // Estatísticas finais
        const stats = `✅ Exemplo carregado! Nós: ${valores.length}, Rotações: ${window.balancedTreeController.tree.rotacoes}`;
        window.balancedTreeController.mostrarMensagem(stats, 'sucesso', 4000);
    }

    getExampleName(key) {
        const names = {
            // BST
            'balanceada': 'Árvore Balanceada',
            'degenerada': 'Árvore Degenerada (Pior Caso)',
            'completa': 'Árvore Completa',
            'pequena': 'Árvore Pequena',
            'aleatoria': 'Árvore Aleatória',
            'fibonacci': 'Sequência Fibonacci',
            
            // AVL
            'rotacaoLL': 'Rotação Simples à Direita (LL)',
            'rotacaoRR': 'Rotação Simples à Esquerda (RR)',
            'rotacaoLR': 'Rotação Dupla Esquerda-Direita (LR)',
            'rotacaoRL': 'Rotação Dupla Direita-Esquerda (RL)',
            'complexa': 'Árvore AVL Complexa',
            'teste': 'Teste Completo AVL'
        };
        return names[key] || key;
    }

    esperar(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Auto-inicializar quando disponível
if (typeof window !== 'undefined') {
    window.TreeExamples = TreeExamples;
    
    // Inicializar após o DOM carregar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                window.treeExamplesController = new TreeExamplesController();
                console.log('✅ TreeExamplesController carregado');
            }, 500);
        });
    } else {
        setTimeout(() => {
            window.treeExamplesController = new TreeExamplesController();
            console.log('✅ TreeExamplesController carregado');
        }, 500);
    }
}
