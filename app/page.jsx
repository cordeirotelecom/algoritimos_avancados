'use client';

import Link from 'next/link';

// Force dynamic rendering - no static generation
export const dynamic = 'force-dynamic';

export default function Home() {
  const modules = [
    {
      title: 'Algoritmos de Ordenação',
      icon: '🫧',
      description: 'Visualize 7 algoritmos de ordenação passo a passo com animações',
      href: '/ordenacao',
      color: '#9333ea',
    },
    {
      title: 'Simulador Dijkstra',
      icon: '⚡',
      description: 'Visualize o algoritmo de caminho mais curto passo a passo',
      href: '/dijkstra',
      color: '#0066cc',
    },
    {
      title: 'Teoria de Grafos',
      icon: '🔗',
      description: 'Aprenda conceitos fundamentais com exemplos práticos',
      href: '/grafos',
      color: '#28a745',
    },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <header style={{
          textAlign: 'center',
          marginBottom: '4rem',
          paddingTop: '2rem'
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '800',
            color: 'white',
            marginBottom: '1rem',
            textShadow: '0 4px 20px rgba(0,0,0,0.2)'
          }}>
            🎓 Algoritmos Avançados
          </h1>
          <p style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
            color: 'rgba(255,255,255,0.95)',
            maxWidth: '600px',
            margin: '0 auto 2rem',
            lineHeight: '1.6'
          }}>
            Plataforma educacional interativa para aprender algoritmos complexos
          </p>

          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <span style={{
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              padding: '0.5rem 1.2rem',
              borderRadius: '30px',
              color: 'white',
              fontSize: '0.9rem',
              fontWeight: '600'
            }}>
              ✅ Gratuito
            </span>
            <span style={{
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              padding: '0.5rem 1.2rem',
              borderRadius: '30px',
              color: 'white',
              fontSize: '0.9rem',
              fontWeight: '600'
            }}>
              ⚡ Interativo
            </span>
            <span style={{
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              padding: '0.5rem 1.2rem',
              borderRadius: '30px',
              color: 'white',
              fontSize: '0.9rem',
              fontWeight: '600'
            }}>
              📚 Didático
            </span>
          </div>
        </header>

        {/* Module Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {modules.map((module, idx) => (
            <Link
              key={idx}
              href={module.href}
              style={{
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              <div className="module-card" style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '2rem',
                boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '120px',
                  height: '120px',
                  background: `linear-gradient(135deg, ${module.color}20, ${module.color}10)`,
                  borderRadius: '0 0 0 100%'
                }} />
                
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem',
                  position: 'relative',
                  zIndex: 1
                }}>
                  {module.icon}
                </div>

                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  marginBottom: '0.75rem',
                  color: module.color
                }}>
                  {module.title}
                </h2>

                <p style={{
                  color: '#666',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem',
                  flex: 1
                }}>
                  {module.description}
                </p>

                <button style={{
                  backgroundColor: module.color,
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  width: '100%'
                }}>
                  Acessar Módulo →
                </button>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <footer style={{
          textAlign: 'center',
          padding: '2rem 0',
          color: 'rgba(255,255,255,0.9)'
        }}>
          <p style={{ margin: 0, fontSize: '0.95rem' }}>
            Prof. Eng. Computação <strong>Vagner Cordeiro</strong>
          </p>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem', opacity: 0.8 }}>
            Plataforma educacional para ensino de algoritmos © 2024
          </p>
        </footer>
      </div>

      <style jsx>{`
        .module-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.2) !important;
        }
      `}</style>
    </div>
  );
}