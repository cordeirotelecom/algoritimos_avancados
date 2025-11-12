'use client';

import Link from 'next/link';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <div style={{ fontSize: '8rem', marginBottom: '1rem' }}>🔍</div>
      <h1 style={{ 
        fontSize: 'clamp(3rem, 10vw, 6rem)', 
        fontWeight: '800',
        margin: '0 0 1rem',
        textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
      }}>
        404
      </h1>
      <h2 style={{ 
        fontSize: 'clamp(1.5rem, 4vw, 2rem)', 
        fontWeight: '600',
        margin: '0 0 1rem',
        opacity: '0.95'
      }}>
        Página Não Encontrada
      </h2>
      <p style={{ 
        fontSize: '1.1rem', 
        maxWidth: '500px',
        margin: '0 0 2rem',
        opacity: '0.9',
        lineHeight: '1.6'
      }}>
        Desculpe, a página que você está procurando não existe ou foi movida.
      </p>
      <Link href="/" style={{ textDecoration: 'none' }}>
        <button style={{
          backgroundColor: 'white',
          color: '#667eea',
          border: 'none',
          padding: '1rem 2.5rem',
          borderRadius: '50px',
          fontSize: '1.1rem',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
        }}
        >
          ← Voltar para Home
        </button>
      </Link>
      <div style={{ 
        marginTop: '3rem',
        display: 'flex',
        gap: '1.5rem',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <Link href="/dijkstra" style={{ 
          color: 'white', 
          textDecoration: 'underline',
          fontSize: '1rem',
          opacity: '0.9'
        }}>
          Simulador Dijkstra
        </Link>
        <Link href="/grafos" style={{ 
          color: 'white', 
          textDecoration: 'underline',
          fontSize: '1rem',
          opacity: '0.9'
        }}>
          Teoria dos Grafos
        </Link>
      </div>
    </div>
  );
}
