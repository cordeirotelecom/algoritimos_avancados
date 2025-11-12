import React from 'react';

export default function Home() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <h1>🎓 Algoritmos Avançados</h1>
      <p>Plataforma educacional interativa com visualizações e simuladores</p>
      
      <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
        <a href="/dijkstra" style={{ padding: '1.5rem', border: '1px solid #ccc', borderRadius: '8px', textDecoration: 'none', color: 'inherit' }}>
          <h2>⚡ Simulador Dijkstra</h2>
          <p>Visualize o algoritmo de caminho mais curto passo a passo</p>
        </a>
        
        <a href="/grafos" style={{ padding: '1.5rem', border: '1px solid #ccc', borderRadius: '8px', textDecoration: 'none', color: 'inherit' }}>
          <h2>📊 Grafos</h2>
          <p>Explore algoritmos em grafos ponderados</p>
        </a>
      </div>
    </main>
  );
}
