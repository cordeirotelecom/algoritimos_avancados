/**
 * AVL INTERACTIVE EDUCATIONAL UI MANAGER
 * Gerencia a interface do sistema educacional interativo de AVL
 */

class AVLInteractiveUIManager {
    constructor() {
        this.container = document.getElementById('avl-educational-container');
        this.currentStep = 0;
        this.educationalSystem = null;
        this.isInitialized = false;
    }

    /**
     * Inicializa o gerenciador de UI
     */
    async initialize() {
        if (this.isInitialized) return;
        
        // Aguarda o sistema educacional AVL estar disponível
        if (typeof AVLEducationalInteractive !== 'undefined') {
            this.educationalSystem = new AVLEducationalInteractive();
            this.createHTMLStructure();
            this.setupEventListeners();
            this.isInitialized = true;
            console.log('✅ AVL Interactive UI Manager inicializado');
        } else {
            console.warn('⚠️ AVL Educational System não está disponível');
            setTimeout(() => this.initialize(), 500);
        }
    }

    /**
     * Cria a estrutura HTML do container
     */
    createHTMLStructure() {
        this.container.innerHTML = `
            <div class="avl-educational-wrapper">
                <!-- Sidebar com lições -->
                <div class="avl-sidebar">
                    <h3>🎓 Lições AVL</h3>
                    <div class="avl-lessons" id="lessonsList">
                        <!-- Preenchido dinamicamente -->
                    </div>
                </div>

                <!-- Conteúdo Principal -->
                <div class="avl-main-content">
                    <!-- Cabeçalho da lição -->
                    <div class="avl-lesson-header">
                        <h2 id="lessonTitle">Bem-vindo ao AVL</h2>
                        <p id="lessonSubtitle">Aprenda sobre balanceamento de árvores</p>
                    </div>

                    <!-- Conteúdo da lição -->
                    <div class="avl-lesson-content" id="lessonContent">
                        <!-- Preenchido dinamicamente -->
                    </div>

                    <!-- Visualizador -->
                    <div class="avl-visualizer">
                        <canvas id="avl-canvas" width="800" height="400"></canvas>
                    </div>

                    <!-- Painel de Controles -->
                    <div class="avl-controls">
                        <div class="control-group">
                            <label for="avl-insert-input">Inserir Valor:</label>
                            <input type="number" id="avl-insert-input" placeholder="Digite um número">
                            <button id="avl-insert-btn">➕ Inserir</button>
                        </div>

                        <div class="control-group">
                            <label for="avl-speed">Velocidade da Animação:</label>
                            <input type="range" id="avl-speed" min="1" max="3" value="2">
                            <span id="speed-display">Normal</span>
                        </div>

                        <div class="control-group">
                            <button id="avl-reset-btn">🔄 Resetar Árvore</button>
                            <button id="avl-play-animation-btn">▶️ Animar</button>
                            <button id="avl-pause-animation-btn">⏸️ Pausar</button>
                        </div>
                    </div>

                    <!-- Painel de Informações -->
                    <div class="avl-info-panel">
                        <div class="info-item">
                            <span class="label">Altura</span>
                            <span class="value" id="avl-height">0</span>
                        </div>
                        <div class="info-item">
                            <span class="label">Nós</span>
                            <span class="value" id="avl-nodes-count">0</span>
                        </div>
                        <div class="info-item">
                            <span class="label">Balance Factor</span>
                            <span class="value" id="avl-balance-factor">0</span>
                        </div>
                        <div class="info-item">
                            <span class="label">Status</span>
                            <span class="value" id="avl-status">✅ Balanceada</span>
                        </div>
                    </div>

                    <!-- Seção de Passos -->
                    <div class="avl-steps">
                        <h4>📍 Etapas da Lição</h4>
                        <div class="steps-list" id="stepsList">
                            <!-- Preenchido dinamicamente -->
                        </div>
                        <div class="steps-navigation">
                            <button id="prev-step-btn" class="btn-secondary">← Anterior</button>
                            <span id="step-counter">Passo 1 de 16</span>
                            <button id="next-step-btn" class="btn-secondary">Próximo →</button>
                        </div>
                    </div>

                    <!-- Navegação Final -->
                    <div class="avl-navigation">
                        <button id="close-avl-btn" class="btn-secondary">← Voltar aos Módulos</button>
                        <button id="quiz-btn" class="btn-secondary">🎯 Fazer Quiz</button>
                    </div>
                </div>
            </div>
        `;

        this.populateLessons();
        this.displayCurrentLesson();
    }

    /**
     * Popula a lista de lições no sidebar
     */
    populateLessons() {
        const lessonsList = document.getElementById('lessonsList');
        const steps = [
            { id: 0, title: 'Bem-vindo ao AVL' },
            { id: 1, title: 'O que é Balanceamento?' },
            { id: 2, title: 'Altura de Nós' },
            { id: 3, title: 'Balance Factor' },
            { id: 4, title: 'Desbalanceamento' },
            { id: 5, title: 'Tipos de Rotação' },
            { id: 6, title: 'Rotação LL' },
            { id: 7, title: 'Rotação RR' },
            { id: 8, title: 'Rotação LR' },
            { id: 9, title: 'Rotação RL' },
            { id: 10, title: 'Inserção' },
            { id: 11, title: 'Deleção' },
            { id: 12, title: 'Recuperação Pós-Deleção' },
            { id: 13, title: 'Animação Completa' },
            { id: 14, title: 'Modo Prático' },
            { id: 15, title: 'Quiz Final' }
        ];

        lessonsList.innerHTML = steps.map(step => `
            <button class="lesson-btn ${step.id === 0 ? 'active' : ''}" data-lesson="${step.id}">
                ${step.id + 1}. ${step.title}
            </button>
        `).join('');

        // Event listeners para os botões de lição
        lessonsList.querySelectorAll('.lesson-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.goToLesson(parseInt(e.target.dataset.lesson));
            });
        });
    }

    /**
     * Vai para uma lição específica
     */
    goToLesson(lessonId) {
        this.currentStep = lessonId;
        document.querySelectorAll('.lesson-btn').forEach(btn => {
            btn.classList.remove('active');
            if (parseInt(btn.dataset.lesson) === lessonId) {
                btn.classList.add('active');
            }
        });
        this.displayCurrentLesson();
    }

    /**
     * Exibe a lição atual
     */
    displayCurrentLesson() {
        const steps = this.educationalSystem.educationalSteps;
        const currentLesson = steps[this.currentStep];

        if (!currentLesson) return;

        // Atualizar cabeçalho
        document.getElementById('lessonTitle').textContent = currentLesson.title;
        document.getElementById('lessonSubtitle').textContent = currentLesson.subtitle || 'Aprenda sobre AVL';

        // Atualizar conteúdo
        const contentDiv = document.getElementById('lessonContent');
        contentDiv.innerHTML = this.formatLessonContent(currentLesson);

        // Atualizar contador
        document.getElementById('step-counter').textContent = `Passo ${this.currentStep + 1} de 16`;

        // Atualizar botões de navegação
        document.getElementById('prev-step-btn').disabled = this.currentStep === 0;
        document.getElementById('next-step-btn').disabled = this.currentStep === steps.length - 1;

        // Se houver um visualizador, atualizar
        if (currentLesson.visualization) {
            this.renderVisualization(currentLesson);
        }
    }

    /**
     * Formata o conteúdo de uma lição para HTML
     */
    formatLessonContent(lesson) {
        let html = `<div class="lesson-section">`;

        if (lesson.content) {
            if (Array.isArray(lesson.content)) {
                html += lesson.content.map(para => `<p>${para}</p>`).join('');
            } else {
                html += `<p>${lesson.content}</p>`;
            }
        }

        if (lesson.points) {
            html += '<ul>';
            lesson.points.forEach(point => {
                html += `<li>${point}</li>`;
            });
            html += '</ul>';
        }

        if (lesson.code) {
            html += `<div class="code-block"><pre>${this.escapeHtml(lesson.code)}</pre></div>`;
        }

        if (lesson.formula) {
            html += `<div class="formula-block"><p><strong>Fórmula:</strong> ${lesson.formula}</p></div>`;
        }

        html += '</div>';
        return html;
    }

    /**
     * Renderiza a visualização de uma lição
     */
    renderVisualization(lesson) {
        const canvas = document.getElementById('avl-canvas');
        const ctx = canvas.getContext('2d');
        
        // Limpar canvas
        ctx.fillStyle = '#f9fafb';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (lesson.visualization === 'tree') {
            this.drawTreeExample(ctx, lesson);
        } else if (lesson.visualization === 'balance-factor') {
            this.drawBalanceFactorExample(ctx, lesson);
        } else if (lesson.visualization === 'rotation') {
            this.drawRotationExample(ctx, lesson);
        }
    }

    /**
     * Desenha exemplo de árvore
     */
    drawTreeExample(ctx, lesson) {
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#1f2937';
        ctx.fillText('Exemplo de Árvore AVL', 400, 30);

        // Implementação específica para diferentes lições
        ctx.font = '12px Arial';
        ctx.fillStyle = '#6b7280';
        ctx.fillText('(Visualização será renderizada aqui)', 400, 200);
    }

    /**
     * Desenha exemplo de balance factor
     */
    drawBalanceFactorExample(ctx, lesson) {
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#1f2937';
        ctx.fillText('Cálculo de Balance Factor', 400, 30);

        ctx.font = '12px Arial';
        ctx.fillStyle = '#6b7280';
        ctx.fillText('BF = altura(esquerda) - altura(direita)', 400, 100);
    }

    /**
     * Desenha exemplo de rotação
     */
    drawRotationExample(ctx, lesson) {
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#1f2937';
        ctx.fillText('Demonstração de Rotação', 400, 30);

        ctx.font = '12px Arial';
        ctx.fillStyle = '#6b7280';
        ctx.fillText('(Visualização de rotação será mostrada aqui)', 400, 200);
    }

    /**
     * Setup de event listeners
     */
    setupEventListeners() {
        // Botões de navegação
        document.getElementById('prev-step-btn').addEventListener('click', () => {
            if (this.currentStep > 0) {
                this.goToLesson(this.currentStep - 1);
            }
        });

        document.getElementById('next-step-btn').addEventListener('click', () => {
            if (this.currentStep < this.educationalSystem.educationalSteps.length - 1) {
                this.goToLesson(this.currentStep + 1);
            }
        });

        // Botões de controle
        document.getElementById('avl-insert-btn').addEventListener('click', () => {
            const value = parseInt(document.getElementById('avl-insert-input').value);
            if (!isNaN(value)) {
                this.insertValue(value);
                document.getElementById('avl-insert-input').value = '';
            }
        });

        document.getElementById('avl-reset-btn').addEventListener('click', () => {
            this.resetTree();
        });

        document.getElementById('close-avl-btn').addEventListener('click', () => {
            this.close();
        });

        document.getElementById('quiz-btn').addEventListener('click', () => {
            this.startQuiz();
        });

        // Controle de velocidade
        document.getElementById('avl-speed').addEventListener('change', (e) => {
            const speeds = ['Lenta', 'Normal', 'Rápida'];
            document.getElementById('speed-display').textContent = speeds[e.target.value - 1];
        });

        // Enter para inserir
        document.getElementById('avl-insert-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('avl-insert-btn').click();
            }
        });
    }

    /**
     * Insere um valor na árvore
     */
    insertValue(value) {
        if (this.educationalSystem && this.educationalSystem.insertValue) {
            this.educationalSystem.insertValue(value);
            this.updateTreeInfo();
            this.renderVisualization(this.educationalSystem.educationalSteps[this.currentStep]);
        }
    }

    /**
     * Reseta a árvore
     */
    resetTree() {
        if (this.educationalSystem && this.educationalSystem.resetTree) {
            this.educationalSystem.resetTree();
            this.updateTreeInfo();
        }
    }

    /**
     * Atualiza informações da árvore
     */
    updateTreeInfo() {
        if (this.educationalSystem && this.educationalSystem.getTreeInfo) {
            const info = this.educationalSystem.getTreeInfo();
            document.getElementById('avl-height').textContent = info.height || '0';
            document.getElementById('avl-nodes-count').textContent = info.nodeCount || '0';
            document.getElementById('avl-balance-factor').textContent = info.balanceFactor || '0';
            document.getElementById('avl-status').textContent = info.isBalanced ? '✅ Balanceada' : '⚠️ Desbalanceada';
        }
    }

    /**
     * Inicia o quiz
     */
    startQuiz() {
        alert('Quiz será implementado em breve! 🎯');
    }

    /**
     * Escapa caracteres HTML
     */
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    /**
     * Abre o modo educacional AVL
     */
    open() {
        this.container.style.display = 'block';
        this.displayCurrentLesson();
    }

    /**
     * Fecha o modo educacional AVL
     */
    close() {
        this.container.style.display = 'none';
    }

    /**
     * Alterna visibilidade
     */
    toggle() {
        if (this.container.style.display === 'none' || this.container.style.display === '') {
            this.open();
        } else {
            this.close();
        }
    }
}

/**
 * Inicializa o AVL Interactive UI quando a página carrega
 */
document.addEventListener('DOMContentLoaded', () => {
    window.avlUIManager = new AVLInteractiveUIManager();
    window.avlUIManager.initialize();
    
    // Expõe método global para abrir o educacional AVL
    window.openAVLEducational = () => {
        window.avlUIManager.open();
    };
});
