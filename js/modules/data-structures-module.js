// ===== DATA STRUCTURES MODULE =====

/**
 * Módulo educacional sobre Estruturas de Dados
 * Homogêneas (Arrays), Heterogêneas (Structs/Objects) e Ponteiros
 */

class DataStructuresModule {
    static render() {
        return `
            <div class="module-content active">
                <!-- Module Header -->
                <div class="module-header">
                    <h1 class="module-title">
                        <span>📦</span>
                        <span>Estruturas de Dados</span>
                    </h1>
                    <p class="module-description">
                        Explore estruturas homogêneas (arrays), heterogêneas (objetos/structs) e
                        conceitos de ponteiros e referências em memória.
                    </p>
                </div>

                <!-- Seção 1: Estruturas Homogêneas (Arrays) -->
                <div class="module-section">
                    <h2 class="section-title">📊 Estruturas Homogêneas - Arrays</h2>
                    <div class="section-content">
                        <p>
                            <strong>Arrays</strong> (vetores) são estruturas que armazenam múltiplos valores
                            do <strong>mesmo tipo</strong> em posições consecutivas de memória.
                        </p>

                        <h3>🔹 Características</h3>
                        <ul>
                            <li><strong>Homogêneos:</strong> Todos os elementos são do mesmo tipo</li>
                            <li><strong>Tamanho fixo:</strong> Definido na criação (em muitas linguagens)</li>
                            <li><strong>Acesso direto:</strong> Acesso por índice em tempo constante O(1)</li>
                            <li><strong>Memória contígua:</strong> Elementos armazenados sequencialmente</li>
                        </ul>

                        <h3>🔹 Declaração e Inicialização</h3>
                        <div class="code-example">
<span class="comment">// JavaScript/TypeScript</span>
<span class="keyword">let</span> numeros = [<span class="number">1</span>, <span class="number">2</span>, <span class="number">3</span>, <span class="number">4</span>, <span class="number">5</span>];

<span class="comment">// C/C++</span>
<span class="keyword">int</span> numeros[<span class="number">5</span>] = {<span class="number">1</span>, <span class="number">2</span>, <span class="number">3</span>, <span class="number">4</span>, <span class="number">5</span>};

<span class="comment">// Java</span>
<span class="keyword">int</span>[] numeros = <span class="keyword">new int</span>[<span class="number">5</span>];
                        </div>

                        <h3>🔹 Operações Básicas</h3>
                        <div class="code-example">
<span class="comment">// Acesso - O(1)</span>
<span class="keyword">let</span> primeiro = numeros[<span class="number">0</span>]; <span class="comment">// 1</span>

<span class="comment">// Modificação - O(1)</span>
numeros[<span class="number">0</span>] = <span class="number">10</span>;

<span class="comment">// Busca Linear - O(n)</span>
<span class="keyword">function</span> <span class="function">buscar</span>(arr, valor) {
    <span class="keyword">for</span> (<span class="keyword">let</span> i = <span class="number">0</span>; i < arr.length; i++) {
        <span class="keyword">if</span> (arr[i] === valor) <span class="keyword">return</span> i;
    }
    <span class="keyword">return</span> -<span class="number">1</span>;
}

<span class="comment">// Inserção no final - O(1) amortizado</span>
numeros.push(<span class="number">6</span>);

<span class="comment">// Remoção do final - O(1)</span>
numeros.pop();

<span class="comment">// Inserção no início - O(n)</span>
numeros.unshift(<span class="number">0</span>);

<span class="comment">// Remoção do início - O(n)</span>
numeros.shift();
                        </div>

                        <div class="info-box">
                            <div class="info-box-title">📏 Representação em Memória</div>
                            <pre>
Índice:  [0]  [1]  [2]  [3]  [4]
Valor:   [10] [2]  [3]  [4]  [5]
Endereço: 100  104  108  112  116  (exemplo)

Cálculo de endereço: endereço[i] = base + (i * tamanho_tipo)
                            </pre>
                        </div>

                        <!-- Demonstração Interativa -->
                        <div class="demo-box">
                            <h3>🎯 Operações com Arrays</h3>
                            <div class="demo-controls">
                                <button class="btn btn-primary" data-demo="array-operations">
                                    ▶️ Demonstrar Operações
                                </button>
                            </div>
                            <div class="demo-output"></div>
                        </div>
                    </div>
                </div>

                <!-- Seção 2: Arrays Multidimensionais -->
                <div class="module-section">
                    <h2 class="section-title">🔲 Arrays Multidimensionais</h2>
                    <div class="section-content">
                        <p>
                            Arrays de arrays - usados para representar matrizes, tabelas e estruturas N-dimensionais.
                        </p>

                        <h3>🔹 Matriz 2D</h3>
                        <div class="code-example">
<span class="comment">// Declaração</span>
<span class="keyword">let</span> matriz = [
    [<span class="number">1</span>, <span class="number">2</span>, <span class="number">3</span>],
    [<span class="number">4</span>, <span class="number">5</span>, <span class="number">6</span>],
    [<span class="number">7</span>, <span class="number">8</span>, <span class="number">9</span>]
];

<span class="comment">// Acesso</span>
console.log(matriz[<span class="number">1</span>][<span class="number">2</span>]); <span class="comment">// 6 (linha 1, coluna 2)</span>

<span class="comment">// Percorrer</span>
<span class="keyword">for</span> (<span class="keyword">let</span> i = <span class="number">0</span>; i < matriz.length; i++) {
    <span class="keyword">for</span> (<span class="keyword">let</span> j = <span class="number">0</span>; j < matriz[i].length; j++) {
        console.log(matriz[i][j]);
    }
}
                        </div>

                        <div class="info-box">
                            <div class="info-box-title">📊 Visualização da Matriz</div>
                            <pre>
    Col 0  Col 1  Col 2
Row 0 [1]   [2]   [3]
Row 1 [4]   [5]   [6]
Row 2 [7]   [8]   [9]

Acesso: matriz[linha][coluna]
Complexidade: O(1) - acesso direto
                            </pre>
                        </div>

                        <h3>🔹 Aplicações Comuns</h3>
                        <ul>
                            <li>Representação de grades e tabuleiros</li>
                            <li>Imagens (pixels em matriz)</li>
                            <li>Grafos (matriz de adjacência)</li>
                            <li>Programação dinâmica</li>
                        </ul>
                    </div>
                </div>

                <!-- Seção 3: Estruturas Heterogêneas -->
                <div class="module-section">
                    <h2 class="section-title">🎭 Estruturas Heterogêneas</h2>
                    <div class="section-content">
                        <p>
                            <strong>Structs/Objects</strong> permitem agrupar dados de <strong>diferentes tipos</strong>
                            relacionados a uma mesma entidade.
                        </p>

                        <h3>🔹 Objetos em JavaScript</h3>
                        <div class="code-example">
<span class="comment">// Definição de objeto</span>
<span class="keyword">let</span> aluno = {
    nome: <span class="string">"João Silva"</span>,
    idade: <span class="number">20</span>,
    matricula: <span class="number">2024001</span>,
    notas: [<span class="number">8.5</span>, <span class="number">9.0</span>, <span class="number">7.5</span>],
    ativo: <span class="keyword">true</span>
};

<span class="comment">// Acesso a propriedades</span>
console.log(aluno.nome);          <span class="comment">// "João Silva"</span>
console.log(aluno[<span class="string">"idade"</span>]);      <span class="comment">// 20</span>

<span class="comment">// Modificação</span>
aluno.idade = <span class="number">21</span>;
aluno.notas.push(<span class="number">8.0</span>);

<span class="comment">// Adicionar nova propriedade</span>
aluno.curso = <span class="string">"Engenharia"</span>;
                        </div>

                        <h3>🔹 Structs em C</h3>
                        <div class="code-example">
<span class="comment">// Definição</span>
<span class="keyword">struct</span> Aluno {
    <span class="keyword">char</span> nome[<span class="number">50</span>];
    <span class="keyword">int</span> idade;
    <span class="keyword">int</span> matricula;
    <span class="keyword">float</span> notas[<span class="number">4</span>];
    <span class="keyword">bool</span> ativo;
};

<span class="comment">// Uso</span>
<span class="keyword">struct</span> Aluno aluno1;
aluno1.idade = <span class="number">20</span>;
aluno1.matricula = <span class="number">2024001</span>;
                        </div>

                        <h3>🔹 Classes (POO)</h3>
                        <div class="code-example">
<span class="keyword">class</span> <span class="function">Aluno</span> {
    <span class="keyword">constructor</span>(nome, idade, matricula) {
        <span class="keyword">this</span>.nome = nome;
        <span class="keyword">this</span>.idade = idade;
        <span class="keyword">this</span>.matricula = matricula;
        <span class="keyword">this</span>.notas = [];
    }

    <span class="function">adicionarNota</span>(nota) {
        <span class="keyword">this</span>.notas.push(nota);
    }

    <span class="function">calcularMedia</span>() {
        <span class="keyword">let</span> soma = <span class="keyword">this</span>.notas.reduce((a, b) => a + b, <span class="number">0</span>);
        <span class="keyword">return</span> soma / <span class="keyword">this</span>.notas.length;
    }
}

<span class="keyword">let</span> aluno = <span class="keyword">new</span> <span class="function">Aluno</span>(<span class="string">"João"</span>, <span class="number">20</span>, <span class="number">2024001</span>);
aluno.<span class="function">adicionarNota</span>(<span class="number">8.5</span>);
console.log(aluno.<span class="function">calcularMedia</span>());
                        </div>

                        <div class="info-box success">
                            <div class="info-box-title">✅ Vantagens das Estruturas Heterogêneas</div>
                            <ul>
                                <li><strong>Organização:</strong> Dados relacionados ficam agrupados</li>
                                <li><strong>Legibilidade:</strong> Código mais claro e descritivo</li>
                                <li><strong>Manutenção:</strong> Facilita modificações</li>
                                <li><strong>Abstração:</strong> Representa entidades do mundo real</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Seção 4: Ponteiros e Referências -->
                <div class="module-section">
                    <h2 class="section-title">👉 Ponteiros e Referências</h2>
                    <div class="section-content">
                        <p>
                            <strong>Ponteiros</strong> são variáveis que armazenam <strong>endereços de memória</strong>
                            de outras variáveis.
                        </p>

                        <h3>🔹 Conceitos Fundamentais</h3>
                        <div class="info-box">
                            <div class="info-box-title">💾 Memória</div>
                            <pre>
Variável: int x = 10;

┌─────────┬─────────┬─────────┐
│ Nome    │ Valor   │ Endereço│
├─────────┼─────────┼─────────┤
│ x       │ 10      │ 0x1000  │
└─────────┴─────────┴─────────┘

Ponteiro: int *p = &x;

┌─────────┬─────────┬─────────┐
│ Nome    │ Valor   │ Endereço│
├─────────┼─────────┼─────────┤
│ p       │ 0x1000  │ 0x2000  │
└─────────┴─────────┴─────────┘
                            </pre>
                        </div>

                        <h3>🔹 Ponteiros em C/C++</h3>
                        <div class="code-example">
<span class="keyword">int</span> x = <span class="number">10</span>;
<span class="keyword">int</span> *p;        <span class="comment">// Declaração de ponteiro</span>

p = &x;         <span class="comment">// p recebe o endereço de x</span>
*p = <span class="number">20</span>;        <span class="comment">// Modifica x através do ponteiro</span>

console.log(x);   <span class="comment">// 20 (foi modificado!)</span>
console.log(*p);  <span class="comment">// 20 (valor apontado)</span>
console.log(p);   <span class="comment">// endereço de x</span>
                        </div>

                        <h3>🔹 Referências em JavaScript</h3>
                        <p>
                            JavaScript não tem ponteiros explícitos, mas trabalha com referências
                            para objetos e arrays.
                        </p>
                        <div class="code-example">
<span class="keyword">let</span> obj1 = { valor: <span class="number">10</span> };
<span class="keyword">let</span> obj2 = obj1;  <span class="comment">// obj2 referencia o mesmo objeto</span>

obj2.valor = <span class="number">20</span>;
console.log(obj1.valor); <span class="comment">// 20 (ambos apontam para o mesmo objeto)</span>

<span class="comment">// Comparação</span>
console.log(obj1 === obj2); <span class="comment">// true (mesma referência)</span>

<span class="keyword">let</span> obj3 = { valor: <span class="number">20</span> };
console.log(obj1 === obj3); <span class="comment">// false (referências diferentes)</span>
                        </div>

                        <div class="info-box warning">
                            <div class="info-box-title">⚠️ Cuidados com Ponteiros/Referências</div>
                            <ul>
                                <li><strong>Dangling pointers:</strong> Ponteiros para memória liberada</li>
                                <li><strong>Memory leaks:</strong> Memória não liberada</li>
                                <li><strong>Null pointers:</strong> Acesso a ponteiros nulos</li>
                                <li><strong>Shallow vs Deep copy:</strong> Cópias superficiais vs profundas</li>
                            </ul>
                        </div>

                        <h3>🔹 Cópia Profunda (Deep Copy)</h3>
                        <div class="code-example">
<span class="comment">// Shallow copy (cópia superficial)</span>
<span class="keyword">let</span> obj1 = { a: <span class="number">1</span>, b: { c: <span class="number">2</span> } };
<span class="keyword">let</span> obj2 = obj1;          <span class="comment">// Mesma referência</span>
<span class="keyword">let</span> obj3 = {...obj1};     <span class="comment">// Cópia superficial</span>

<span class="comment">// Deep copy (cópia profunda)</span>
<span class="keyword">let</span> obj4 = JSON.parse(JSON.stringify(obj1));
<span class="keyword">let</span> obj5 = structuredClone(obj1); <span class="comment">// Método moderno</span>

obj4.b.c = <span class="number">10</span>;
console.log(obj1.b.c); <span class="comment">// 2 (não afetado)</span>
                        </div>
                    </div>
                </div>

                <!-- Seção 5: Análise de Complexidade -->
                <div class="module-section">
                    <h2 class="section-title">📊 Análise de Complexidade</h2>
                    <div class="section-content">
                        <h3>🔹 Operações em Arrays</h3>
                        <table style="width:100%; border-collapse: collapse;">
                            <thead>
                                <tr style="background: var(--primary-color); color: white;">
                                    <th style="padding: 12px; border: 1px solid var(--border-color);">Operação</th>
                                    <th style="padding: 12px; border: 1px solid var(--border-color);">Complexidade</th>
                                    <th style="padding: 12px; border: 1px solid var(--border-color);">Descrição</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="padding: 12px; border: 1px solid var(--border-color);">Acesso (índice)</td>
                                    <td style="padding: 12px; border: 1px solid var(--border-color);"><span class="complexity-badge logarithmic">O(1)</span></td>
                                    <td style="padding: 12px; border: 1px solid var(--border-color);">Acesso direto ao índice</td>
                                </tr>
                                <tr style="background: var(--surface-light);">
                                    <td style="padding: 12px; border: 1px solid var(--border-color);">Busca Linear</td>
                                    <td style="padding: 12px; border: 1px solid var(--border-color);"><span class="complexity-badge linear">O(n)</span></td>
                                    <td style="padding: 12px; border: 1px solid var(--border-color);">Percorre todo array</td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px; border: 1px solid var(--border-color);">Busca Binária*</td>
                                    <td style="padding: 12px; border: 1px solid var(--border-color);"><span class="complexity-badge logarithmic">O(log n)</span></td>
                                    <td style="padding: 12px; border: 1px solid var(--border-color);">*Array ordenado</td>
                                </tr>
                                <tr style="background: var(--surface-light);">
                                    <td style="padding: 12px; border: 1px solid var(--border-color);">Inserção (final)</td>
                                    <td style="padding: 12px; border: 1px solid var(--border-color);"><span class="complexity-badge logarithmic">O(1)</span></td>
                                    <td style="padding: 12px; border: 1px solid var(--border-color);">Amortizado</td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px; border: 1px solid var(--border-color);">Inserção (início/meio)</td>
                                    <td style="padding: 12px; border: 1px solid var(--border-color);"><span class="complexity-badge linear">O(n)</span></td>
                                    <td style="padding: 12px; border: 1px solid var(--border-color);">Deslocamento de elementos</td>
                                </tr>
                                <tr style="background: var(--surface-light);">
                                    <td style="padding: 12px; border: 1px solid var(--border-color);">Remoção</td>
                                    <td style="padding: 12px; border: 1px solid var(--border-color);"><span class="complexity-badge linear">O(n)</span></td>
                                    <td style="padding: 12px; border: 1px solid var(--border-color);">Deslocamento de elementos</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>🔹 Operações em Objetos</h3>
                        <div class="code-example">
<span class="comment">// Todas as operações são O(1) em média</span>
obj.propriedade = valor;    <span class="comment">// Inserção/Modificação</span>
<span class="keyword">let</span> x = obj.propriedade; <span class="comment">// Acesso</span>
<span class="keyword">delete</span> obj.propriedade;   <span class="comment">// Remoção</span>
                        </div>
                    </div>
                </div>

                <!-- Navegação -->
                <div class="module-navigation-footer">
                    <button class="btn btn-secondary" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
                        ⬆️ Voltar ao Topo
                    </button>
                    <button class="btn btn-primary" data-next-module="complexity">
                        Próximo: Análise de Complexidade ➡️
                    </button>
                </div>
            </div>
        `;
    }
}

// Exportar
if (typeof window !== 'undefined') {
    window.DataStructuresModule = DataStructuresModule;
}
