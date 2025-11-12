// ===== FUNCTIONS MODULE =====

/**
 * Módulo educacional sobre Funções e Passagem de Parâmetros
 */

class FunctionsModule {
    static render() {
        return `
            <div class="module-content active">
                <!-- Module Header -->
                <div class="module-header">
                    <h1 class="module-title">
                        <span>⚡</span>
                        <span>Funções e Passagem de Parâmetros</span>
                    </h1>
                    <p class="module-description">
                        Aprenda sobre funções, escopo, passagem de parâmetros por valor e referência,
                        e como estruturar código reutilizável e modular.
                    </p>
                </div>

                <!-- Seção 1: Conceitos Fundamentais -->
                <div class="module-section">
                    <h2 class="section-title">📚 Conceitos Fundamentais</h2>
                    <div class="section-content">
                        <p>
                            <strong>Funções</strong> são blocos de código reutilizáveis que realizam tarefas específicas.
                            Elas são fundamentais para a programação estruturada e permitem:
                        </p>
                        <ul>
                            <li><strong>Reutilização de código:</strong> Escreva uma vez, use várias vezes</li>
                            <li><strong>Modularização:</strong> Divida problemas complexos em partes menores</li>
                            <li><strong>Abstração:</strong> Oculte detalhes de implementação</li>
                            <li><strong>Manutenção:</strong> Facilite correções e melhorias</li>
                        </ul>

                        <h3>🔹 Anatomia de uma Função</h3>
                        <div class="code-example">
<span class="keyword">function</span> <span class="function">nomeDaFuncao</span>(parametro1, parametro2) {
    <span class="comment">// Corpo da função</span>
    <span class="keyword">let</span> resultado = parametro1 + parametro2;
    <span class="keyword">return</span> resultado; <span class="comment">// Valor de retorno</span>
}

<span class="comment">// Chamada da função</span>
<span class="keyword">let</span> soma = <span class="function">nomeDaFuncao</span>(<span class="number">5</span>, <span class="number">3</span>);
                        </div>

                        <div class="info-box">
                            <div class="info-box-title">💡 Componentes de uma Função</div>
                            <ul>
                                <li><strong>Nome:</strong> Identifica a função (deve ser descritivo)</li>
                                <li><strong>Parâmetros:</strong> Entradas que a função recebe</li>
                                <li><strong>Corpo:</strong> Código que executa a lógica</li>
                                <li><strong>Retorno:</strong> Valor que a função devolve</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Seção 2: Passagem de Parâmetros -->
                <div class="module-section">
                    <h2 class="section-title">🔄 Passagem de Parâmetros</h2>
                    <div class="section-content">
                        <h3>🔹 Por Valor (Call by Value)</h3>
                        <p>
                            Cria uma <strong>cópia</strong> do valor original. Modificações dentro da função
                            <strong>não afetam</strong> a variável original.
                        </p>
                        <p><strong>Aplicado a:</strong> Tipos primitivos (números, strings, booleanos)</p>

                        <div class="code-example">
<span class="keyword">function</span> <span class="function">modificarValor</span>(x) {
    x = x + <span class="number">10</span>;
    console.log(<span class="string">"Dentro da função:"</span>, x); <span class="comment">// 15</span>
}

<span class="keyword">let</span> numero = <span class="number">5</span>;
<span class="function">modificarValor</span>(numero);
console.log(<span class="string">"Fora da função:"</span>, numero); <span class="comment">// 5 (não modificado!)</span>
                        </div>

                        <h3>🔹 Por Referência (Call by Reference)</h3>
                        <p>
                            Passa uma <strong>referência</strong> ao objeto original. Modificações dentro da função
                            <strong>afetam</strong> o objeto original.
                        </p>
                        <p><strong>Aplicado a:</strong> Objetos, arrays, funções</p>

                        <div class="code-example">
<span class="keyword">function</span> <span class="function">modificarArray</span>(arr) {
    arr.push(<span class="number">4</span>);
    console.log(<span class="string">"Dentro da função:"</span>, arr); <span class="comment">// [1, 2, 3, 4]</span>
}

<span class="keyword">let</span> lista = [<span class="number">1</span>, <span class="number">2</span>, <span class="number">3</span>];
<span class="function">modificarArray</span>(lista);
console.log(<span class="string">"Fora da função:"</span>, lista); <span class="comment">// [1, 2, 3, 4] (modificado!)</span>
                        </div>

                        <div class="info-box warning">
                            <div class="info-box-title">⚠️ Cuidado com Referências!</div>
                            <p>
                                Ao passar objetos/arrays por referência, tenha cuidado com efeitos colaterais indesejados.
                                Use técnicas como clonagem quando necessário preservar o original.
                            </p>
                        </div>

                        <!-- Demonstração Interativa -->
                        <div class="demo-box">
                            <h3>🎯 Demonstração Interativa</h3>
                            <p>Clique no botão para ver a diferença entre passagem por valor e referência:</p>
                            <div class="demo-controls">
                                <button class="btn btn-primary" data-demo="parameter-passing">
                                    ▶️ Executar Demonstração
                                </button>
                            </div>
                            <div class="demo-output"></div>
                        </div>
                    </div>
                </div>

                <!-- Seção 3: Escopo de Variáveis -->
                <div class="module-section">
                    <h2 class="section-title">🎯 Escopo de Variáveis</h2>
                    <div class="section-content">
                        <p>
                            O <strong>escopo</strong> determina onde uma variável pode ser acessada no código.
                        </p>

                        <h3>🔹 Escopo Global</h3>
                        <p>Variáveis declaradas fora de funções são globais e acessíveis em todo o programa.</p>

                        <div class="code-example">
<span class="keyword">let</span> global = <span class="string">"Sou global"</span>;

<span class="keyword">function</span> <span class="function">mostrarGlobal</span>() {
    console.log(global); <span class="comment">// Acessa variável global</span>
}

<span class="function">mostrarGlobal</span>(); <span class="comment">// "Sou global"</span>
                        </div>

                        <h3>🔹 Escopo Local</h3>
                        <p>Variáveis declaradas dentro de funções são locais e só existem dentro delas.</p>

                        <div class="code-example">
<span class="keyword">function</span> <span class="function">criarLocal</span>() {
    <span class="keyword">let</span> local = <span class="string">"Sou local"</span>;
    console.log(local); <span class="comment">// Funciona</span>
}

<span class="function">criarLocal</span>();
console.log(local); <span class="comment">// ERRO! local não existe aqui</span>
                        </div>

                        <h3>🔹 Escopo de Bloco (let/const)</h3>
                        <div class="code-example">
<span class="keyword">if</span> (<span class="keyword">true</span>) {
    <span class="keyword">let</span> blocoLocal = <span class="string">"Apenas no if"</span>;
    console.log(blocoLocal); <span class="comment">// Funciona</span>
}

console.log(blocoLocal); <span class="comment">// ERRO! Fora do escopo</span>
                        </div>

                        <div class="info-box success">
                            <div class="info-box-title">✅ Boas Práticas</div>
                            <ul>
                                <li>Use <code>let</code> e <code>const</code> em vez de <code>var</code></li>
                                <li>Minimize o uso de variáveis globais</li>
                                <li>Declare variáveis no menor escopo possível</li>
                                <li>Use nomes descritivos para funções e variáveis</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Seção 4: Tipos de Funções -->
                <div class="module-section">
                    <h2 class="section-title">🔧 Tipos de Funções</h2>
                    <div class="section-content">
                        <h3>🔹 Funções Nomeadas</h3>
                        <div class="code-example">
<span class="keyword">function</span> <span class="function">somar</span>(a, b) {
    <span class="keyword">return</span> a + b;
}
                        </div>

                        <h3>🔹 Funções Anônimas</h3>
                        <div class="code-example">
<span class="keyword">const</span> <span class="function">subtrair</span> = <span class="keyword">function</span>(a, b) {
    <span class="keyword">return</span> a - b;
};
                        </div>

                        <h3>🔹 Arrow Functions (ES6+)</h3>
                        <div class="code-example">
<span class="keyword">const</span> <span class="function">multiplicar</span> = (a, b) => a * b;

<span class="comment">// Equivalente a:</span>
<span class="keyword">const</span> <span class="function">multiplicar</span> = <span class="keyword">function</span>(a, b) {
    <span class="keyword">return</span> a * b;
};
                        </div>

                        <h3>🔹 Funções de Ordem Superior</h3>
                        <p>Funções que recebem outras funções como parâmetros ou retornam funções.</p>
                        <div class="code-example">
<span class="keyword">const</span> numeros = [<span class="number">1</span>, <span class="number">2</span>, <span class="number">3</span>, <span class="number">4</span>, <span class="number">5</span>];

<span class="comment">// map() é uma função de ordem superior</span>
<span class="keyword">const</span> dobrados = numeros.<span class="function">map</span>(n => n * <span class="number">2</span>);
console.log(dobrados); <span class="comment">// [2, 4, 6, 8, 10]</span>

<span class="comment">// filter() também</span>
<span class="keyword">const</span> pares = numeros.<span class="function">filter</span>(n => n % <span class="number">2</span> === <span class="number">0</span>);
console.log(pares); <span class="comment">// [2, 4]</span>
                        </div>
                    </div>
                </div>

                <!-- Seção 5: Análise de Complexidade -->
                <div class="module-section">
                    <h2 class="section-title">📊 Análise de Complexidade</h2>
                    <div class="section-content">
                        <p>
                            A complexidade de funções depende das operações realizadas:
                        </p>

                        <h3>🔹 Função Simples - <span class="complexity-badge logarithmic">O(1)</span></h3>
                        <div class="code-example">
<span class="keyword">function</span> <span class="function">obterPrimeiro</span>(arr) {
    <span class="keyword">return</span> arr[<span class="number">0</span>]; <span class="comment">// Operação constante</span>
}
                        </div>

                        <h3>🔹 Função com Loop - <span class="complexity-badge linear">O(n)</span></h3>
                        <div class="code-example">
<span class="keyword">function</span> <span class="function">somarTodos</span>(arr) {
    <span class="keyword">let</span> soma = <span class="number">0</span>;
    <span class="keyword">for</span> (<span class="keyword">let</span> i = <span class="number">0</span>; i < arr.length; i++) {
        soma += arr[i]; <span class="comment">// n operações</span>
    }
    <span class="keyword">return</span> soma;
}
                        </div>

                        <h3>🔹 Função com Loop Aninhado - <span class="complexity-badge quadratic">O(n²)</span></h3>
                        <div class="code-example">
<span class="keyword">function</span> <span class="function">encontrarPares</span>(arr) {
    <span class="keyword">for</span> (<span class="keyword">let</span> i = <span class="number">0</span>; i < arr.length; i++) {
        <span class="keyword">for</span> (<span class="keyword">let</span> j = i + <span class="number">1</span>; j < arr.length; j++) {
            console.log(arr[i], arr[j]); <span class="comment">// n * n operações</span>
        }
    }
}
                        </div>

                        <div class="info-box">
                            <div class="info-box-title">📈 Impacto do Crescimento</div>
                            <p>Para n = 1000 elementos:</p>
                            <ul>
                                <li>O(1): <strong>1</strong> operação</li>
                                <li>O(n): <strong>1,000</strong> operações</li>
                                <li>O(n²): <strong>1,000,000</strong> operações</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Seção 6: Exercícios Práticos -->
                <div class="module-section">
                    <h2 class="section-title">🎓 Exercícios Práticos</h2>
                    <div class="section-content">
                        <h3>📝 Exercício 1: Calculadora de Área</h3>
                        <p>Crie funções para calcular área de diferentes formas geométricas:</p>
                        <div class="code-example">
<span class="keyword">function</span> <span class="function">areaRetangulo</span>(base, altura) {
    <span class="keyword">return</span> base * altura;
}

<span class="keyword">function</span> <span class="function">areaCirculo</span>(raio) {
    <span class="keyword">return</span> Math.PI * raio * raio;
}

<span class="keyword">function</span> <span class="function">areaTriangulo</span>(base, altura) {
    <span class="keyword">return</span> (base * altura) / <span class="number">2</span>;
}
                        </div>

                        <h3>📝 Exercício 2: Validação de Dados</h3>
                        <div class="code-example">
<span class="keyword">function</span> <span class="function">validarEmail</span>(email) {
    <span class="keyword">return</span> email.includes(<span class="string">'@'</span>) && email.includes(<span class="string">'.'</span>);
}

<span class="keyword">function</span> <span class="function">validarIdade</span>(idade) {
    <span class="keyword">return</span> idade >= <span class="number">0</span> && idade <= <span class="number">120</span>;
}
                        </div>

                        <div class="demo-box">
                            <h3>🧪 Teste suas Funções</h3>
                            <p>Execute uma demonstração completa de funções:</p>
                            <div class="demo-controls">
                                <button class="btn btn-primary" data-demo="function-call">
                                    ▶️ Executar Exemplos
                                </button>
                            </div>
                            <div class="demo-output"></div>
                        </div>
                    </div>
                </div>

                <!-- Navegação -->
                <div class="module-navigation-footer">
                    <button class="btn btn-secondary" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
                        ⬆️ Voltar ao Topo
                    </button>
                    <button class="btn btn-primary" data-next-module="data-structures">
                        Próximo: Estruturas de Dados ➡️
                    </button>
                </div>
            </div>
        `;
    }
}

// Exportar
if (typeof window !== 'undefined') {
    window.FunctionsModule = FunctionsModule;
}
