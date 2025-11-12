'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navigation from '../components/Navigation';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function GrafosPage() {
  const [activeTab, setActiveTab] = useState('conceitos');
  const [selectedGraph, setSelectedGraph] = useState('tipo1');
  const [highlightedNode, setHighlightedNode] = useState(null);

  // Exemplo 1: Grafo Simples
  const grafo1 = {
    nome: 'Grafo Simples (Não-direcionado)',
    nodes: [
      { id: 'A', x: 100, y: 80 },
      { id: 'B', x: 200, y: 80 },
      { id: 'C', x: 150, y: 150 },
    ],
    edges: [
      { from: 'A', to: 'B', weight: 1 },
      { from: 'B', to: 'C', weight: 1 },
      { from: 'C', to: 'A', weight: 1 },
    ],
  };

  // Exemplo 2: Grafo Direcionado
  const grafo2 = {
    nome: 'Grafo Direcionado',
    nodes: [
      { id: 'X', x: 50, y: 80 },
      { id: 'Y', x: 150, y: 80 },
      { id: 'Z', x: 250, y: 80 },
    ],
    edges: [
      { from: 'X', to: 'Y', weight: 5 },
      { from: 'Y', to: 'Z', weight: 3 },
      { from: 'Z', to: 'X', weight: 2 },
    ],
  };

  // Exemplo 3: Grafo Ponderado
  const grafo3 = {
    nome: 'Grafo Ponderado (com pesos)',
    nodes: [
      { id: '1', x: 80, y: 50 },
      { id: '2', x: 180, y: 50 },
      { id: '3', x: 130, y: 130 },
    ],
    edges: [
      { from: '1', to: '2', weight: 10 },
      { from: '2', to: '3', weight: 15 },
      { from: '3', to: '1', weight: 20 },
    ],
  };

  const grafos = {
    tipo1: grafo1,
    tipo2: grafo2,
    tipo3: grafo3,
  };

  const currentGrafo = grafos[selectedGraph];

  const renderSVG = (grafo) => {
    return (
      <svg width="300" height="200" style={{ border: '1px solid #e0e0e0', borderRadius: '8px' }}>
        {/* Arestas */}
        {grafo.edges.map((edge, idx) => {
          const from = grafo.nodes.find(n => n.id === edge.from);
          const to = grafo.nodes.find(n => n.id === edge.to);
          if (!from || !to) return null;

          return (
            <g key={`edge-${idx}`}>
              <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="#666"
                strokeWidth="2"
              />
              {/* Seta direcionada se for grafo direcionado */}
              {selectedGraph === 'tipo2' && (
                <polygon
                  points={`${to.x},${to.y} ${to.x - 8},${to.y - 5} ${to.x - 8},${to.y + 5}`}
                  fill="#666"
                />
              )}
              {/* Label do peso */}
              <text
                x={(from.x + to.x) / 2}
                y={(from.y + to.y) / 2 - 5}
                textAnchor="middle"
                fontSize="12"
                fill="#0066cc"
                fontWeight="bold"
              >
                {edge.weight}
              </text>
            </g>
          );
        })}

        {/* Nós */}
        {grafo.nodes.map(node => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r="25"
              fill={highlightedNode === node.id ? '#ffb3b3' : '#e8f4f8'}
              stroke={highlightedNode === node.id ? '#cc0000' : '#0066cc'}
              strokeWidth="2"
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHighlightedNode(node.id)}
              onMouseLeave={() => setHighlightedNode(null)}
            />
            <text
              x={node.x}
              y={node.y}
              textAnchor="middle"
              dy="0.3em"
              fontSize="16"
              fontWeight="bold"
              fill="#000"
              style={{ pointerEvents: 'none' }}
            >
              {node.id}
            </text>
          </g>
        ))}
      </svg>
    );
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Navigation */}
      <Navigation />
      
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ marginTop: 0 }}>Introdução a Grafos</h1>
        <p style={{ fontSize: '16px', color: '#666' }}>
          Aprenda sobre estruturas de grafos, tipos, algoritmos e aplicações práticas.
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '2px solid #eee' }}>
        {['conceitos', 'tipos', 'algoritmos', 'exercicios'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '12px 20px',
              backgroundColor: activeTab === tab ? '#0066cc' : 'transparent',
              color: activeTab === tab ? 'white' : '#333',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              borderBottom: activeTab === tab ? '3px solid #0066cc' : 'none',
              textTransform: 'capitalize',
            }}
          >
            {tab === 'conceitos' && 'Conceitos Básicos'}
            {tab === 'tipos' && 'Tipos de Grafos'}
            {tab === 'algoritmos' && 'Algoritmos'}
            {tab === 'exercicios' && 'Exercícios'}
          </button>
        ))}
      </div>

      {/* Conteúdo */}
      <div style={{ backgroundColor: '#fafafa', padding: '20px', borderRadius: '8px', minHeight: '400px' }}>
        {/* TAB: Conceitos Básicos */}
        {activeTab === 'conceitos' && (
          <div>
            <h2>Conceitos Básicos de Grafos</h2>

            <div style={{ marginTop: '20px' }}>
              <h3>O que é um Grafo?</h3>
              <p>
                Um grafo é uma estrutura de dados composta por <strong>nós (vértices)</strong> e <strong>arestas (edges)</strong>.
                Grafos são usados para representar relacionamentos entre objetos.
              </p>
              <div style={{ backgroundColor: '#e8f4f8', padding: '15px', borderRadius: '5px', marginTop: '10px' }}>
                <strong>Definição Formal:</strong> G = (V, E)
                <ul>
                  <li><strong>V</strong>: Conjunto de vértices (nós)</li>
                  <li><strong>E</strong>: Conjunto de arestas (conexões entre vértices)</li>
                </ul>
              </div>
            </div>

            <div style={{ marginTop: '20px' }}>
              <h3>Termos Importantes</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '5px', border: '1px solid #ddd' }}>
                  <strong>Vértice (Nó)</strong>
                  <p>Um ponto no grafo que representa uma entidade. Exemplo: Cidade, Pessoa, Página Web</p>
                </div>
                <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '5px', border: '1px solid #ddd' }}>
                  <strong>Aresta</strong>
                  <p>Conexão entre dois vértices. Representa um relacionamento. Exemplo: Estrada, Amizade, Link</p>
                </div>
                <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '5px', border: '1px solid #ddd' }}>
                  <strong>Grau de um Vértice</strong>
                  <p>Número de arestas conectadas ao vértice. Em grafos direcionados: grau de entrada e saída</p>
                </div>
                <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '5px', border: '1px solid #ddd' }}>
                  <strong>Peso de Aresta</strong>
                  <p>Um valor numérico associado à aresta. Exemplo: Distância, Custo, Tempo</p>
                </div>
                <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '5px', border: '1px solid #ddd' }}>
                  <strong>Caminho</strong>
                  <p>Sequência de vértices onde cada par consecutivo é conectado por uma aresta</p>
                </div>
                <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '5px', border: '1px solid #ddd' }}>
                  <strong>Ciclo</strong>
                  <p>Um caminho que começa e termina no mesmo vértice</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '20px' }}>
              <h3>Aplicações de Grafos</h3>
              <ul style={{ fontSize: '15px' }}>
                <li><strong>Redes Sociais:</strong> Usuários são vértices, amizades são arestas</li>
                <li><strong>Mapas e Navegação:</strong> Cidades são vértices, estradas são arestas ponderadas</li>
                <li><strong>Internet:</strong> Páginas web são vértices, links são arestas</li>
                <li><strong>Redes de Computadores:</strong> Computadores são vértices, conexões são arestas</li>
                <li><strong>Recomendação de Produtos:</strong> Produtos relacionados formam grafos</li>
                <li><strong>Biologia:</strong> Cadeias alimentares e redes moleculares</li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB: Tipos de Grafos */}
        {activeTab === 'tipos' && (
          <div>
            <h2>Tipos de Grafos</h2>

            <div style={{ marginTop: '20px' }}>
              <h3>Selecione um tipo para visualizar:</h3>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                {[
                  { id: 'tipo1', label: 'Grafo Simples' },
                  { id: 'tipo2', label: 'Grafo Direcionado' },
                  { id: 'tipo3', label: 'Grafo Ponderado' },
                ].map(g => (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGraph(g.id)}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: selectedGraph === g.id ? '#0066cc' : '#f0f0f0',
                      color: selectedGraph === g.id ? 'white' : '#333',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: selectedGraph === g.id ? 'bold' : 'normal',
                    }}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'start' }}>
              <div>
                <h4>{currentGrafo.nome}</h4>
                {renderSVG(currentGrafo)}
                <p style={{ marginTop: '10px', fontSize: '13px', color: '#666' }}>
                  Passe o mouse sobre os nós para destacá-los
                </p>
              </div>

              <div>
                {selectedGraph === 'tipo1' && (
                  <div>
                    <h4>Grafo Simples (Não-direcionado)</h4>
                    <p>
                      Arestas não têm direção. Se há aresta de A para B, há também de B para A.
                    </p>
                    <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '5px', marginTop: '10px' }}>
                      <strong>Características:</strong>
                      <ul>
                        <li>Arestas não-direcionadas</li>
                        <li>Cada aresta conecta exatamente 2 vértices</li>
                        <li>Sem laços próprios</li>
                        <li>Sem arestas múltiplas</li>
                      </ul>
                    </div>
                    <div style={{ backgroundColor: '#fff3cd', padding: '15px', borderRadius: '5px', marginTop: '10px' }}>
                      <strong>Exemplo Real:</strong> Rede de amizades (se A é amigo de B, B é amigo de A)
                    </div>
                  </div>
                )}

                {selectedGraph === 'tipo2' && (
                  <div>
                    <h4>Grafo Direcionado (Dígrafos)</h4>
                    <p>
                      Arestas têm direção indicada por setas. Há aresta de A para B, mas não necessariamente de B para A.
                    </p>
                    <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '5px', marginTop: '10px' }}>
                      <strong>Características:</strong>
                      <ul>
                        <li>Arestas direcionadas (com setas)</li>
                        <li>Grau de entrada e grau de saída</li>
                        <li>Pode ter laços próprios</li>
                        <li>Pode ter arestas em apenas uma direção</li>
                      </ul>
                    </div>
                    <div style={{ backgroundColor: '#fff3cd', padding: '15px', borderRadius: '5px', marginTop: '10px' }}>
                      <strong>Exemplo Real:</strong> Rede de seguidores em mídias sociais (seguir alguém não é recíproco)
                    </div>
                  </div>
                )}

                {selectedGraph === 'tipo3' && (
                  <div>
                    <h4>Grafo Ponderado</h4>
                    <p>
                      Cada aresta tem um peso (valor numérico) associado. Usado quando há um &quot;custo&quot; na relação.
                    </p>
                    <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '5px', marginTop: '10px' }}>
                      <strong>Características:</strong>
                      <ul>
                        <li>Cada aresta tem um peso/custo</li>
                        <li>Pode ser direcionado ou não</li>
                        <li>Algoritmos de caminho mínimo usam grafos ponderados</li>
                        <li>Exemplos: distância, tempo, custo financeiro</li>
                      </ul>
                    </div>
                    <div style={{ backgroundColor: '#fff3cd', padding: '15px', borderRadius: '5px', marginTop: '10px' }}>
                      <strong>Exemplo Real:</strong> Mapa de cidades com distâncias (buscar rota mais curta)
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB: Algoritmos */}
        {activeTab === 'algoritmos' && (
          <div>
            <h2>Algoritmos Importantes em Grafos</h2>

            <div style={{ marginTop: '20px' }}>
              <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '5px', border: '1px solid #ddd', marginBottom: '15px' }}>
                <h3 style={{ marginTop: 0 }}>Busca em Largura (BFS - Breadth-First Search)</h3>
                <p><strong>Objetivo:</strong> Explorar todos os vértices em ordem de proximidade</p>
                <div style={{ backgroundColor: '#e8f4f8', padding: '10px', borderRadius: '3px', margin: '10px 0', fontFamily: 'monospace', fontSize: '12px' }}>
                  Complexidade: O(V + E) onde V = vértices, E = arestas
                </div>
                <p><strong>Aplicações:</strong> Encontrar caminho mais curto, verificar conectividade, análise de redes</p>
              </div>

              <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '5px', border: '1px solid #ddd', marginBottom: '15px' }}>
                <h3 style={{ marginTop: 0 }}>Busca em Profundidade (DFS - Depth-First Search)</h3>
                <p><strong>Objetivo:</strong> Explorar o máximo possível em cada caminho antes de voltar</p>
                <div style={{ backgroundColor: '#e8f4f8', padding: '10px', borderRadius: '3px', margin: '10px 0', fontFamily: 'monospace', fontSize: '12px' }}>
                  Complexidade: O(V + E)
                </div>
                <p><strong>Aplicações:</strong> Detecção de ciclos, ordenação topológica, componentes fortemente conectados</p>
              </div>

              <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '5px', border: '1px solid #ddd', marginBottom: '15px' }}>
                <h3 style={{ marginTop: 0 }}>Algoritmo de Dijkstra</h3>
                <p><strong>Objetivo:</strong> Encontrar caminho mais curto de um vértice para todos os outros</p>
                <div style={{ backgroundColor: '#e8f4f8', padding: '10px', borderRadius: '3px', margin: '10px 0', fontFamily: 'monospace', fontSize: '12px' }}>
                  Complexidade: O(V² ) ou O((V + E) log V) com heap
                </div>
                <p><strong>Aplicações:</strong> GPS/Mapas, roteamento de rede, planejamento de rotas</p>
                <Link href="/dijkstra">
                  <button
                    style={{
                      marginTop: '10px',
                      padding: '10px 20px',
                      backgroundColor: '#0066cc',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                    }}
                  >
                    Ver Simulador Dijkstra →
                  </button>
                </Link>
              </div>

              <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '5px', border: '1px solid #ddd', marginBottom: '15px' }}>
                <h3 style={{ marginTop: 0 }}>Floyd-Warshall</h3>
                <p><strong>Objetivo:</strong> Encontrar caminho mais curto entre todos os pares de vértices</p>
                <div style={{ backgroundColor: '#e8f4f8', padding: '10px', borderRadius: '3px', margin: '10px 0', fontFamily: 'monospace', fontSize: '12px' }}>
                  Complexidade: O(V³)
                </div>
                <p><strong>Aplicações:</strong> Transitividade de relacionamentos, detecção de ciclos negativos</p>
              </div>

              <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '5px', border: '1px solid #ddd', marginBottom: '15px' }}>
                <h3 style={{ marginTop: 0 }}>Prim e Kruskal</h3>
                <p><strong>Objetivo:</strong> Encontrar Árvore Geradora Mínima (MST)</p>
                <div style={{ backgroundColor: '#e8f4f8', padding: '10px', borderRadius: '3px', margin: '10px 0', fontFamily: 'monospace', fontSize: '12px' }}>
                  Prim: O(V²), Kruskal: O(E log E)
                </div>
                <p><strong>Aplicações:</strong> Redes de telecomunicação, projetos de circuitos com custo mínimo</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB: Exercícios */}
        {activeTab === 'exercicios' && (
          <div>
            <h2>Exercícios Práticos</h2>

            <div style={{ marginTop: '20px' }}>
              <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '5px', border: '1px solid #ddd', marginBottom: '15px' }}>
                <h4>Exercício 1: Análise de Grafo</h4>
                <p>Dado o grafo ao lado, responda:</p>
                <ol>
                  <li>Quantos vértices tem o grafo?</li>
                  <li>Quantas arestas tem o grafo?</li>
                  <li>Qual é o grau de cada vértice?</li>
                  <li>Existem ciclos? Se sim, liste um</li>
                </ol>
                <details style={{ marginTop: '10px' }}>
                  <summary style={{ cursor: 'pointer', color: '#0066cc', fontWeight: 'bold' }}>Ver resposta</summary>
                  <div style={{ marginTop: '10px', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '3px' }}>
                    <p><strong>1.</strong> 3 vértices (A, B, C)</p>
                    <p><strong>2.</strong> 3 arestas (A-B, B-C, C-A)</p>
                    <p><strong>3.</strong> Cada vértice tem grau 2</p>
                    <p><strong>4.</strong> Sim, ciclo: A → B → C → A</p>
                  </div>
                </details>
              </div>

              <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '5px', border: '1px solid #ddd', marginBottom: '15px' }}>
                <h4>Exercício 2: Aplicação Prática</h4>
                <p>
                  Você está desenvolvendo um GPS. Como você usaria grafos para representar:
                </p>
                <ul>
                  <li>Cidades</li>
                  <li>Estradas</li>
                  <li>Distância entre cidades</li>
                  <li>Encontrar a rota mais curta</li>
                </ul>
                <details style={{ marginTop: '10px' }}>
                  <summary style={{ cursor: 'pointer', color: '#0066cc', fontWeight: 'bold' }}>Ver sugestão</summary>
                  <div style={{ marginTop: '10px', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '3px' }}>
                    <p><strong>Vértices:</strong> Cada cidade é um vértice</p>
                    <p><strong>Arestas:</strong> Cada estrada entre cidades é uma aresta</p>
                    <p><strong>Peso:</strong> A distância é o peso da aresta (grafo ponderado)</p>
                    <p><strong>Algoritmo:</strong> Use Dijkstra para encontrar o caminho mais curto</p>
                  </div>
                </details>
              </div>

              <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '5px', border: '1px solid #ddd', marginBottom: '15px' }}>
                <h4>Exercício 3: Identificar Tipo de Grafo</h4>
                <p>Classifique cada situação como grafo:</p>
                <ul>
                  <li><strong>Rede de amizades em Facebook:</strong> Direcionado ou Não-direcionado?</li>
                  <li><strong>Followers no Twitter:</strong> Direcionado ou Não-direcionado?</li>
                  <li><strong>Malha viária de uma cidade:</strong> Ponderado ou Não-ponderado?</li>
                  <li><strong>Cadeia alimentar:</strong> Direcionado ou Não-direcionado?</li>
                </ul>
                <details style={{ marginTop: '10px' }}>
                  <summary style={{ cursor: 'pointer', color: '#0066cc', fontWeight: 'bold' }}>Ver respostas</summary>
                  <div style={{ marginTop: '10px', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '3px' }}>
                    <p>✓ Facebook: <strong>Não-direcionado</strong> (amizade é mútua)</p>
                    <p>✓ Twitter: <strong>Direcionado</strong> (seguir é unilateral)</p>
                    <p>✓ Malha viária: <strong>Ponderado</strong> (tem distâncias)</p>
                    <p>✓ Cadeia alimentar: <strong>Direcionado</strong> (fluxo de energia)</p>
                  </div>
                </details>
              </div>
            </div>

            <div style={{ marginTop: '30px', backgroundColor: '#e8f4f8', padding: '15px', borderRadius: '5px' }}>
              <h3>Próximos Passos</h3>
              <p>Agora que você conhece os conceitos básicos de grafos, explore:</p>
              <Link href="/dijkstra">
                <button
                  style={{
                    padding: '10px 20px',
                    marginRight: '10px',
                    backgroundColor: '#0066cc',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  Simulador Dijkstra →
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
