'use client';

import React, { useState, useEffect } from 'react';
import '../styles/dijkstra.css';

export default function DijkstraPage() {
  // Grafo de exemplo
  const grafo = {
    nodes: [
      { id: 'A', x: 350, y: 80 },
      { id: 'B', x: 180, y: 200 },
      { id: 'C', x: 350, y: 230 },
      { id: 'D', x: 520, y: 200 },
      { id: 'E', x: 350, y: 370 }
    ],
    edges: [
      { from: 'A', to: 'B', weight: 4 },
      { from: 'A', to: 'C', weight: 2 },
      { from: 'B', to: 'C', weight: 1 },
      { from: 'C', to: 'D', weight: 8 },
      { from: 'C', to: 'E', weight: 10 },
      { from: 'D', to: 'E', weight: 2 },
      { from: 'B', to: 'E', weight: 3 }
    ]
  };

  // Estado
  const [state, setState] = useState({
    distances: {},
    predecessors: {},
    visited: new Set(),
    current: null,
    origin: null,
    step: 0,
    totalSteps: 0,
    history: [],
    isRunning: false
  });

  // Inicializar
  useEffect(() => {
    const newDistances = {};
    grafo.nodes.forEach(node => {
      newDistances[node.id] = Infinity;
    });
    setState(prev => ({ ...prev, distances: newDistances, predecessors: {} }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reset = () => {
    const newDistances = {};
    grafo.nodes.forEach(node => {
      newDistances[node.id] = Infinity;
    });
    setState({
      distances: newDistances,
      predecessors: {},
      visited: new Set(),
      current: null,
      origin: null,
      step: 0,
      totalSteps: 0,
      history: [],
      isRunning: false
    });
  };

  const startExecution = (startVertex) => {
    const newDistances = { ...state.distances };
    newDistances[startVertex] = 0;
    setState({
      ...state,
      distances: newDistances,
      origin: startVertex,
      totalSteps: grafo.nodes.length,
      step: 0,
      history: [],
      visited: new Set(),
      current: null
    });
  };

  const getMinNode = () => {
    let min = null;
    let minDist = Infinity;
    grafo.nodes.forEach(node => {
      if (!state.visited.has(node.id) && state.distances[node.id] < minDist) {
        minDist = state.distances[node.id];
        min = node.id;
      }
    });
    return min;
  };

  const getNeighbors = (nodeId) => {
    const neighbors = [];
    grafo.edges.forEach(edge => {
      if (edge.from === nodeId) {
        neighbors.push({ id: edge.to, weight: edge.weight });
      } else if (edge.to === nodeId) {
        neighbors.push({ id: edge.from, weight: edge.weight });
      }
    });
    return neighbors;
  };

  const executeStep = () => {
    const nextNode = getMinNode();
    
    if (!nextNode) return false;

    const newVisited = new Set(state.visited);
    newVisited.add(nextNode);
    const newDistances = { ...state.distances };
    const newPredecessors = { ...state.predecessors };
    const newHistory = [...state.history];

    const neighbors = getNeighbors(nextNode);
    neighbors.forEach(({ id, weight }) => {
      if (!newVisited.has(id)) {
        const oldDist = newDistances[id];
        const newDist = newDistances[nextNode] + weight;
        const wasUpdated = newDist < oldDist;

        newHistory.push({
          step: state.step + 1,
          current: nextNode,
          neighbor: id,
          oldDistance: oldDist,
          calculation: `${newDistances[nextNode]} + ${weight} = ${newDist}`,
          newDistance: newDist,
          updated: wasUpdated
        });

        if (wasUpdated) {
          newDistances[id] = newDist;
          newPredecessors[id] = nextNode;
        }
      }
    });

    setState({
      ...state,
      current: nextNode,
      visited: newVisited,
      distances: newDistances,
      predecessors: newPredecessors,
      step: state.step + 1,
      history: newHistory
    });

    return true;
  };

  const executeAll = async () => {
    setState(prev => ({ ...prev, isRunning: true }));
    let canContinue = true;
    while (canContinue) {
      canContinue = executeStep();
      await new Promise(resolve => setTimeout(resolve, 800));
    }
    setState(prev => ({ ...prev, isRunning: false }));
  };

  return (
    <div className="dijkstra-container">
      <header className="dijkstra-header">
        <h1>🎓 Simulador: Dijkstra</h1>
        <p>Visualize o algoritmo passo a passo</p>
      </header>

      <main className="dijkstra-main">
        <div className="dijkstra-content">
          <div className="dijkstra-card">
            <h2>Grafo Ponderado</h2>
            <svg viewBox="0 0 700 450" style={{ width: '100%', height: '450px' }}>
              {/* Arestas */}
              {grafo.edges.map((edge, i) => {
                const from = grafo.nodes.find(n => n.id === edge.from);
                const to = grafo.nodes.find(n => n.id === edge.to);
                return (
                  <g key={`edge-${i}`}>
                    <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="#dee2e6" strokeWidth="2" />
                    <circle cx={(from.x + to.x) / 2} cy={(from.y + to.y) / 2} r="14" fill="white" stroke="#ddd" strokeWidth="1" />
                    <text x={(from.x + to.x) / 2} y={(from.y + to.y) / 2} textAnchor="middle" dominantBaseline="middle" fontSize="13" fill="#495057" fontWeight="600">
                      {edge.weight}
                    </text>
                  </g>
                );
              })}

              {/* Nós */}
              {grafo.nodes.map(node => {
                let fillColor = '#e9ecef';
                let strokeColor = '#adb5bd';
                if (node.id === state.current) {
                  fillColor = '#ff9800';
                  strokeColor = '#e68900';
                } else if (state.visited.has(node.id)) {
                  fillColor = '#dc3545';
                  strokeColor = '#bd2130';
                }
                if (node.id === state.origin && !state.visited.has(node.id)) {
                  fillColor = '#28a745';
                  strokeColor = '#218838';
                }

                return (
                  <g key={`node-${node.id}`}>
                    <circle cx={node.x} cy={node.y} r="30" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
                    <text x={node.x} y={node.y} textAnchor="middle" dominantBaseline="middle" fontSize="18" fill={state.visited.has(node.id) || node.id === state.origin ? 'white' : '#495057'} fontWeight="600">
                      {node.id}
                    </text>
                    {state.distances[node.id] !== Infinity && (
                      <text x={node.x} y={node.y + 45} textAnchor="middle" fontSize="12" fill="#495057" fontWeight="600">
                        d={state.distances[node.id]}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="dijkstra-sidebar">
            <div className="dijkstra-card">
              <h2>Controles</h2>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#495057' }}>Vértice de Origem:</label>
                <select onChange={(e) => startExecution(e.target.value)} defaultValue="" style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #ced4da' }}>
                  <option value="">Selecione um vértice</option>
                  {grafo.nodes.map(node => <option key={node.id} value={node.id}>{node.id}</option>)}
                </select>
              </div>
              <button onClick={() => startExecution(state.origin)} style={{ width: '100%', padding: '0.85rem', marginBottom: '0.5rem', background: '#b71c1c', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }} disabled={!state.origin}>▶ Executar</button>
              <button onClick={executeStep} style={{ width: '100%', padding: '0.85rem', marginBottom: '0.5rem', background: '#6c757d', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }} disabled={!state.origin || state.isRunning}>→ Próximo Passo</button>
              <button onClick={executeAll} style={{ width: '100%', padding: '0.85rem', marginBottom: '0.5rem', background: '#28a745', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }} disabled={!state.origin || state.isRunning}>⚡ Executar Tudo</button>
              <button onClick={reset} style={{ width: '100%', padding: '0.85rem', background: 'white', color: '#6c757d', border: '1px solid #ced4da', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>🔄 Resetar</button>
            </div>

            <div className="dijkstra-card">
              <h2>Estatísticas</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ textAlign: 'center', padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: '#b71c1c' }}>{state.visited.size}</div>
                  <div style={{ fontSize: '0.85rem', color: '#6c757d', textTransform: 'uppercase' }}>Visitados</div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: '#b71c1c' }}>{grafo.nodes.length - state.visited.size}</div>
                  <div style={{ fontSize: '0.85rem', color: '#6c757d', textTransform: 'uppercase' }}>Restantes</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {state.history.length > 0 && (
          <div className="dijkstra-card" style={{ marginTop: '2rem' }}>
            <h2>📊 Histórico de Cálculos</h2>
            <div style={{ overflowX: 'auto', maxHeight: '400px', overflowY: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead style={{ background: '#f8f9fa', position: 'sticky', top: 0 }}>
                  <tr>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600, borderBottom: '2px solid #dee2e6' }}>Passo</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600, borderBottom: '2px solid #dee2e6' }}>Atual</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600, borderBottom: '2px solid #dee2e6' }}>Vizinho</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600, borderBottom: '2px solid #dee2e6' }}>Cálculo</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600, borderBottom: '2px solid #dee2e6' }}>Atualizado</th>
                  </tr>
                </thead>
                <tbody>
                  {state.history.map((calc, idx) => (
                    <tr key={idx} style={{ background: calc.updated ? '#d4edda' : 'white' }}>
                      <td style={{ padding: '0.75rem', borderBottom: '1px solid #f1f3f5' }}>{calc.step}</td>
                      <td style={{ padding: '0.75rem', borderBottom: '1px solid #f1f3f5', color: '#ff9800', fontWeight: 600 }}>{calc.current}</td>
                      <td style={{ padding: '0.75rem', borderBottom: '1px solid #f1f3f5' }}>{calc.neighbor}</td>
                      <td style={{ padding: '0.75rem', borderBottom: '1px solid #f1f3f5', fontFamily: 'monospace', fontSize: '0.85rem' }}>{calc.calculation}</td>
                      <td style={{ padding: '0.75rem', borderBottom: '1px solid #f1f3f5', fontWeight: 600 }}>{calc.updated ? '✅ SIM' : '❌ NÃO'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
