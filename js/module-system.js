// ===== MODULE SYSTEM CONTROLLER =====

/**
 * Controlador principal do sistema de módulos educacionais
 * Gerencia navegação entre diferentes tópicos de algoritmos e complexidade
 */

class ModuleSystemController {
    constructor() {
        this.currentModule = 'sorting';
        this.modules = new Map();
        this.progressData = this.loadProgress();
        
        this.initialize();
    }

    initialize() {
        console.log('🎓 Inicializando Sistema de Módulos Educacionais');
        
        // Registrar todos os módulos
        this.registerModules();
        
        // Configurar navegação
        this.setupNavigation();
        
        // Não carrega módulo inicial - o HTML já tem o conteúdo de ordenação
        // Apenas atualiza o progresso
        const module = this.modules.get(this.currentModule);
        const progressEl = document.getElementById('currentProgress');
        if (progressEl && module) {
            progressEl.textContent = `📚 ${module.name}`;
        }
    }

    registerModules() {
        // Módulo de Ordenação (existente)
        this.modules.set('sorting', {
            name: 'Algoritmos de Ordenação',
            icon: '🔄',
            description: 'Visualização interativa e análise de algoritmos de ordenação',
            render: () => this.renderSortingModule()
        });

        // Funções e Parâmetros
        this.modules.set('functions', {
            name: 'Funções e Parâmetros',
            icon: '⚡',
            description: 'Entenda funções, passagem de parâmetros e escopo',
            render: () => this.renderFunctionsModule()
        });

        // Estruturas de Dados
        this.modules.set('data-structures', {
            name: 'Estruturas de Dados',
            icon: '📦',
            description: 'Estruturas homogêneas, heterogêneas e ponteiros',
            render: () => this.renderDataStructuresModule()
        });

        // Análise de Complexidade
        this.modules.set('complexity', {
            name: 'Análise de Complexidade',
            icon: '📊',
            description: 'Notação Big-O, análise temporal e espacial',
            render: () => this.renderComplexityModule()
        });

        // Recursividade
        this.modules.set('recursion', {
            name: 'Recursividade',
            icon: '🔁',
            description: 'Definições recursivas e implementação de algoritmos',
            render: () => this.renderRecursionModule()
        });

        // Árvores Binárias
        this.modules.set('trees', {
            name: 'Árvores Binárias',
            icon: '🌳',
            description: 'Árvores de busca binária, percursos e operações',
            render: () => this.renderTreesModule()
        });

        // Árvores Balanceadas
        this.modules.set('balanced-trees', {
            name: 'Árvores Balanceadas',
            icon: '⚖️',
            description: 'Árvores AVL e algoritmo DSW',
            render: () => this.renderBalancedTreesModule()
        });

        // Grafos
        this.modules.set('graphs', {
            name: 'Grafos',
            icon: '🕸️',
            description: 'Conceitos, representações e algoritmos em grafos',
            render: () => this.renderGraphsModule()
        });
    }

    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const moduleId = item.getAttribute('data-module');
                this.loadModule(moduleId);
            });
        });
    }

    loadModule(moduleId) {
        if (!this.modules.has(moduleId)) {
            console.error(`Módulo ${moduleId} não encontrado`);
            return;
        }

        // Atualizar navegação
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-module') === moduleId) {
                item.classList.add('active');
            }
        });

        // Atualizar progresso atual
        const module = this.modules.get(moduleId);
        const progressEl = document.getElementById('currentProgress');
        if (progressEl) {
            progressEl.textContent = `📚 ${module.name}`;
        }

        // Renderizar módulo
        this.currentModule = moduleId;
        
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            // Se for o módulo de ordenação, não substituir o conteúdo
            // pois ele já está no HTML e possui funcionalidades complexas
            if (moduleId === 'sorting') {
                // Garantir que o conteúdo de ordenação esteja visível
                const sortingContent = mainContent.querySelector('.algorithm-selection');
                if (!sortingContent) {
                    // Se não existir, criar estrutura básica
                    console.warn('Conteúdo de ordenação não encontrado no HTML');
                }
                // Scroll para o topo
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                // Para outros módulos, renderizar o conteúdo
                const content = module.render();
                mainContent.innerHTML = content;
                
                // Scroll para o topo
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                // Inicializar funcionalidades específicas do módulo
                this.initializeModuleFeatures(moduleId);
            }
        }

        // Salvar progresso
        this.saveProgress(moduleId);
    }

    initializeModuleFeatures(moduleId) {
        console.log(`🎯 Inicializando features do módulo: ${moduleId}`);
        
        // Módulo de ordenação usa o sistema existente
        if (moduleId === 'sorting') {
            // O app.js já inicializa o sistema de ordenação
            return;
        }

        // Inicializar features específicas do módulo de grafos
        if (moduleId === 'graphs') {
            console.log('🕸️ Módulo de Grafos detectado, inicializando visualizadores...');
            setTimeout(() => {
                console.log('⏰ Timeout de inicialização de grafos executando...');
                
                if (typeof window.initializeGraphVisualization === 'function') {
                    console.log('✅ Chamando initializeGraphVisualization');
                    try {
                        window.initializeGraphVisualization();
                    } catch (error) {
                        console.error('❌ Erro ao inicializar GraphVisualization:', error);
                    }
                } else {
                    console.error('❌ initializeGraphVisualization não está definida!');
                }
                
                if (typeof window.initializeGraphAlgorithms === 'function') {
                    console.log('✅ Chamando initializeGraphAlgorithms');
                    try {
                        window.initializeGraphAlgorithms();
                    } catch (error) {
                        console.error('❌ Erro ao inicializar GraphAlgorithms:', error);
                    }
                } else {
                    console.error('❌ initializeGraphAlgorithms não está definida!');
                }
            }, 500);
        }

        // Inicializar demonstrações interativas
        this.initializeDemos();
    }

    initializeDemos() {
        // Configurar botões de demonstração
        const demoButtons = document.querySelectorAll('[data-demo]');
        
        demoButtons.forEach(button => {
            button.addEventListener('click', () => {
                const demoType = button.getAttribute('data-demo');
                this.runDemo(demoType, button);
            });
        });

        // Configurar botões de navegação entre módulos
        const nextButtons = document.querySelectorAll('[data-next-module]');
        nextButtons.forEach(button => {
            button.addEventListener('click', () => {
                const nextModule = button.getAttribute('data-next-module');
                this.loadModule(nextModule);
            });
        });
    }

    runDemo(demoType, button) {
        const outputEl = button.closest('.demo-box').querySelector('.demo-output');
        if (!outputEl) return;

        outputEl.innerHTML = '<div class="loading">⏳ Executando demonstração...</div>';

        setTimeout(() => {
            let result = '';
            
            switch(demoType) {
                case 'function-call':
                    result = this.demoFunctionCall();
                    break;
                case 'parameter-passing':
                    result = this.demoParameterPassing();
                    break;
                case 'recursion-factorial':
                    result = this.demoRecursion();
                    break;
                case 'array-operations':
                    result = this.demoArrayOperations();
                    break;
                case 'complexity-comparison':
                    result = this.demoComplexityComparison();
                    break;
                default:
                    result = '✅ Demonstração executada com sucesso!';
            }
            
            outputEl.innerHTML = result;
        }, 500);
    }

    demoFunctionCall() {
        return `
<pre><strong>🎯 Exemplo: Chamada de Função</strong>

<span class="comment">// Definição da função</span>
<span class="keyword">function</span> <span class="function">somar</span>(a, b) {
    <span class="keyword">return</span> a + b;
}

<span class="comment">// Chamada da função</span>
<span class="keyword">let</span> resultado = <span class="function">somar</span>(<span class="number">5</span>, <span class="number">3</span>);

<span class="comment">// Resultado</span>
console.log(resultado); <span class="comment">// Saída: 8</span>

<strong>✅ Função executada com sucesso!</strong></pre>
        `;
    }

    demoParameterPassing() {
        return `
<pre><strong>🔄 Exemplo: Passagem de Parâmetros</strong>

<span class="comment">// Por Valor (tipos primitivos)</span>
<span class="keyword">function</span> <span class="function">modificarValor</span>(x) {
    x = x + <span class="number">10</span>;
    console.log("Dentro:", x); <span class="comment">// 15</span>
}
<span class="keyword">let</span> num = <span class="number">5</span>;
<span class="function">modificarValor</span>(num);
console.log("Fora:", num); <span class="comment">// 5 (não modificado)</span>

<span class="comment">// Por Referência (objetos/arrays)</span>
<span class="keyword">function</span> <span class="function">modificarArray</span>(arr) {
    arr.push(<span class="number">4</span>);
}
<span class="keyword">let</span> lista = [<span class="number">1</span>, <span class="number">2</span>, <span class="number">3</span>];
<span class="function">modificarArray</span>(lista);
console.log(lista); <span class="comment">// [1, 2, 3, 4] (modificado)</span>

<strong>✅ Demonstração concluída!</strong></pre>
        `;
    }

    demoRecursion() {
        const factorial = (n) => n <= 1 ? 1 : n * factorial(n - 1);
        const result = factorial(5);
        
        return `
<pre><strong>🔁 Exemplo: Fatorial Recursivo</strong>

<span class="keyword">function</span> <span class="function">fatorial</span>(n) {
    <span class="keyword">if</span> (n <= <span class="number">1</span>) <span class="keyword">return</span> <span class="number">1</span>;
    <span class="keyword">return</span> n * <span class="function">fatorial</span>(n - <span class="number">1</span>);
}

<span class="comment">// Execução: fatorial(5)</span>
<span class="comment">// 5 * fatorial(4)</span>
<span class="comment">// 5 * 4 * fatorial(3)</span>
<span class="comment">// 5 * 4 * 3 * fatorial(2)</span>
<span class="comment">// 5 * 4 * 3 * 2 * fatorial(1)</span>
<span class="comment">// 5 * 4 * 3 * 2 * 1 = 120</span>

<strong>Resultado: ${result}</strong>
<strong>✅ Recursão executada com sucesso!</strong></pre>
        `;
    }

    demoArrayOperations() {
        return `
<pre><strong>📦 Exemplo: Operações com Arrays</strong>

<span class="keyword">let</span> numeros = [<span class="number">5</span>, <span class="number">2</span>, <span class="number">8</span>, <span class="number">1</span>, <span class="number">9</span>];

<span class="comment">// Acesso</span>
console.log(numeros[<span class="number">0</span>]); <span class="comment">// 5</span>

<span class="comment">// Inserção</span>
numeros.push(<span class="number">3</span>); <span class="comment">// [5, 2, 8, 1, 9, 3]</span>

<span class="comment">// Busca</span>
<span class="keyword">let</span> index = numeros.indexOf(<span class="number">8</span>); <span class="comment">// 2</span>

<span class="comment">// Ordenação</span>
numeros.sort((a, b) => a - b); <span class="comment">// [1, 2, 3, 5, 8, 9]</span>

<strong>Array final: [${[1, 2, 3, 5, 8, 9].join(', ')}]</strong>
<strong>✅ Operações executadas!</strong></pre>
        `;
    }

    demoComplexityComparison() {
        return `
<pre><strong>📊 Comparação de Complexidade</strong>

<span class="keyword">Algoritmo</span>          | <span class="keyword">Melhor Caso</span> | <span class="keyword">Pior Caso</span>
${'-'.repeat(50)}
Busca Linear      | O(1)        | O(n)
Busca Binária     | O(1)        | O(log n)
Bubble Sort       | O(n)        | O(n²)
Quick Sort        | O(n log n)  | O(n²)
Merge Sort        | O(n log n)  | O(n log n)

<strong>🎯 Exemplo prático com n = 1000:</strong>
O(1):        <span class="number">1</span> operação
O(log n):    <span class="number">10</span> operações
O(n):        <span class="number">1,000</span> operações
O(n log n):  <span class="number">10,000</span> operações
O(n²):       <span class="number">1,000,000</span> operações

<strong>✅ Análise concluída!</strong></pre>
        `;
    }

    saveProgress(moduleId) {
        if (!this.progressData.visitedModules.includes(moduleId)) {
            this.progressData.visitedModules.push(moduleId);
        }
        this.progressData.lastModule = moduleId;
        this.progressData.lastVisit = new Date().toISOString();
        
        localStorage.setItem('moduleProgress', JSON.stringify(this.progressData));
    }

    loadProgress() {
        const saved = localStorage.getItem('moduleProgress');
        return saved ? JSON.parse(saved) : {
            visitedModules: [],
            lastModule: 'sorting',
            lastVisit: null
        };
    }

    // Os métodos render de cada módulo serão implementados em arquivos separados
    renderSortingModule() {
        // Retorna o HTML existente do sistema de ordenação
        const existingContent = document.querySelector('.algorithm-selection');
        if (existingContent) {
            return existingContent.parentElement.innerHTML;
        }
        return '<p>Carregando módulo de ordenação...</p>';
    }

    renderFunctionsModule() {
        return typeof FunctionsModule !== 'undefined' ? 
               FunctionsModule.render() : 
               '<div class="module-placeholder">Módulo de Funções carregando...</div>';
    }

    renderDataStructuresModule() {
        return typeof DataStructuresModule !== 'undefined' ? 
               DataStructuresModule.render() : 
               '<div class="module-placeholder">Módulo de Estruturas carregando...</div>';
    }

    renderComplexityModule() {
        return typeof ComplexityModule !== 'undefined' ? 
               ComplexityModule.render() : 
               '<div class="module-placeholder">Módulo de Complexidade carregando...</div>';
    }

    renderRecursionModule() {
        return typeof RecursionModule !== 'undefined' ? 
               RecursionModule.render() : 
               '<div class="module-placeholder">Módulo de Recursividade carregando...</div>';
    }

    renderTreesModule() {
        return typeof TreesModule !== 'undefined' ? 
               TreesModule.render() : 
               '<div class="module-placeholder">Módulo de Árvores carregando...</div>';
    }

    renderBalancedTreesModule() {
        return typeof BalancedTreesModule !== 'undefined' ? 
               BalancedTreesModule.render() : 
               '<div class="module-placeholder">Módulo de Árvores Balanceadas carregando...</div>';
    }

    renderGraphsModule() {
        return typeof GraphsModule !== 'undefined' ? 
               GraphsModule.render() : 
               '<div class="module-placeholder">Módulo de Grafos carregando...</div>';
    }
}

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.ModuleSystemController = ModuleSystemController;
    console.log('✅ ModuleSystemController carregado');
}
