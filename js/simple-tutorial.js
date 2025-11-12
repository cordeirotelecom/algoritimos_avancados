// ===== SISTEMA SIMPLES DE TUTORIAIS =====

class SimpleTutorialSystem {
    constructor() {
        this.currentStep = 0;
        this.tutorials = this.initializeTutorials();
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    initializeTutorials() {
        return {
            'introduction': {
                title: '🎯 Bem-vindo!',
                steps: [
                    {
                        title: 'O que é este site?',
                        content: 'Este é um playground interativo para aprender algoritmos de ordenação de forma gamificada e educativa.'
                    },
                    {
                        title: 'Como começar?',
                        content: 'Selecione um algoritmo de ordenação na tela principal para ver uma visualização passo a passo.'
                    },
                    {
                        title: 'Algoritmos disponíveis',
                        content: 'Bubble Sort, Selection Sort, Insertion Sort, Quick Sort, Merge Sort, Heap Sort e Radix Sort.'
                    },
                    {
                        title: 'Recursos',
                        content: 'Use o painel de controle para ajustar velocidade, tamanho do array e adicionar efeitos sonoros.'
                    },
                    {
                        title: 'Gamificação',
                        content: 'Ganhe pontos, desbloqueie conquistas e suba de nível enquanto aprende!'
                    }
                ]
            },
            'bubble-sort': {
                title: '🫧 Bubble Sort',
                steps: [
                    {
                        title: 'O que é Bubble Sort?',
                        content: 'Bubble Sort compara elementos adjacentes e os troca se estiverem na ordem errada. Ele faz várias passagens pelo array até que tudo esteja ordenado.'
                    },
                    {
                        title: 'Como funciona?',
                        content: '1. Compare dois elementos adjacentes\n2. Se o primeiro > segundo, troque\n3. Repita para todos os pares\n4. Continue até não haver mais trocas'
                    },
                    {
                        title: 'Complexidade',
                        content: 'Tempo: O(n²) | Espaço: O(1)\nMelhor caso: O(n) | Pior caso: O(n²)'
                    },
                    {
                        title: 'Quando usar?',
                        content: 'Use para arrays pequenos ou quando simplicidade é importante. Não recomendado para grandes conjuntos de dados.'
                    }
                ]
            },
            'quick-sort': {
                title: '⚡ Quick Sort',
                steps: [
                    {
                        title: 'O que é Quick Sort?',
                        content: 'Quick Sort é um algoritmo divide-and-conquer que escolhe um "pivô" e particiona o array em torno dele.'
                    },
                    {
                        title: 'Como funciona?',
                        content: '1. Escolha um elemento pivô\n2. Particione: elementos < pivô à esquerda, > pivô à direita\n3. Recursivamente ordene ambas as partições'
                    },
                    {
                        title: 'Complexidade',
                        content: 'Tempo: O(n log n) médio | O(n²) pior caso\nEspaço: O(log n)\nMuit rápido na prática!'
                    },
                    {
                        title: 'Quando usar?',
                        content: 'É um dos mais rápidos na prática. Use para la maioria dos casos com grandes conjuntos de dados.'
                    }
                ]
            }
        };
    }

    setupEventListeners() {
        const tutorialBtn = document.getElementById('tutorialBtn');
        if (tutorialBtn) {
            tutorialBtn.addEventListener('click', () => this.showTutorial('introduction'));
        }

        const openTutorials = document.getElementById('openTutorials');
        if (openTutorials) {
            openTutorials.addEventListener('click', () => this.showTutorial('introduction'));
        }

        const closeTutorial = document.getElementById('closeTutorial');
        if (closeTutorial) {
            closeTutorial.addEventListener('click', () => this.closeTutorial());
        }

        // Algoritmo cards
        document.querySelectorAll('.algorithm-card').forEach(card => {
            card.addEventListener('click', () => {
                const algo = card.dataset.algorithm;
                const tutorialKey = this.getAlgorithmTutorialKey(algo);
                if (this.tutorials[tutorialKey]) {
                    this.showTutorial(tutorialKey);
                }
            });
        });
    }

    getAlgorithmTutorialKey(algo) {
        const map = {
            'bubble': 'bubble-sort',
            'selection': 'bubble-sort',
            'insertion': 'bubble-sort',
            'quick': 'quick-sort',
            'merge': 'quick-sort',
            'heap': 'quick-sort',
            'radix': 'quick-sort'
        };
        return map[algo] || 'introduction';
    }

    showTutorial(key) {
        const tutorial = this.tutorials[key];
        if (!tutorial) return;

        const modal = document.getElementById('tutorialModal');
        if (!modal) return;

        this.currentStep = 0;
        modal.style.display = 'flex';
        this.updateTutorialContent(tutorial);

        // Fecha ao clicar fora
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeTutorial();
            }
        });
    }

    updateTutorialContent(tutorial) {
        const titleEl = document.getElementById('tutorialTitle');
        const textEl = document.getElementById('tutorialText');
        const prevBtn = document.querySelector('[onclick*="previousStep"]') || this.createButton('Anterior', () => this.previousStep(tutorial));
        const nextBtn = document.querySelector('[onclick*="nextStep"]') || this.createButton('Próximo', () => this.nextStep(tutorial));

        if (titleEl && textEl) {
            const step = tutorial.steps[this.currentStep];
            titleEl.textContent = `${tutorial.title} - ${step.title}`;
            textEl.textContent = step.content;

            // Atualiza botões
            this.updateNavigationButtons(tutorial);
        }
    }

    nextStep(tutorial) {
        if (this.currentStep < tutorial.steps.length - 1) {
            this.currentStep++;
            this.updateTutorialContent(tutorial);
        } else {
            this.closeTutorial();
        }
    }

    previousStep(tutorial) {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.updateTutorialContent(tutorial);
        }
    }

    updateNavigationButtons(tutorial) {
        const navSection = document.querySelector('.tutorial-navigation');
        if (navSection) {
            const buttons = navSection.querySelectorAll('button');
            const isFirst = this.currentStep === 0;
            const isLast = this.currentStep === tutorial.steps.length - 1;

            if (buttons[0]) buttons[0].disabled = isFirst;
            if (buttons[1]) buttons[1].textContent = isLast ? 'Concluir' : 'Próximo';
        }
    }

    createButton(text, onclick) {
        const btn = document.createElement('button');
        btn.textContent = text;
        btn.onclick = onclick;
        btn.className = 'btn btn-secondary';
        return btn;
    }

    closeTutorial() {
        const modal = document.getElementById('tutorialModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }
}

// Inicializa quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.simpleTutorial = new SimpleTutorialSystem();
    });
} else {
    window.simpleTutorial = new SimpleTutorialSystem();
}
