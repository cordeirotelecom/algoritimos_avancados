'use client';

import Link from 'next/link';

export default function Home() {
  const modules = [
    {
      title: 'Simulador Dijkstra',
      icon: '⚡',
      description: 'Visualize o algoritmo de caminho mais curto passo a passo com grafo interativo',
      href: '/dijkstra',
      color: '#0066cc',
      features: ['Grafo interativo', 'Passo a passo', 'Tabela de cálculo']
    },
    {
      title: 'Teoria dos Grafos',
      icon: '📊',
      description: 'Aprenda conceitos fundamentais de grafos com exemplos interativos e exercícios',
      href: '/grafos',
      color: '#28a745',
      features: ['Conceitos básicos', 'Tipos de grafos', 'Algoritmos principais']
    }
  ];

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Hero Section */}
      <section style={{
        padding: '4rem 2rem 2rem',
        textAlign: 'center',
        color: 'white'
      }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: '800',
          margin: '0 0 1rem',
          textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
        }}>
          🎓 Algoritmos Avançados
        </h1>
        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          maxWidth: '700px',
          margin: '0 auto 2rem',
          opacity: '0.95',
          lineHeight: '1.6'
        }}>
          Plataforma educacional interativa para aprender algoritmos, estruturas de dados e análise de complexidade
        </p>
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            padding: '0.5rem 1.5rem',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)',
            fontSize: '0.9rem'
          }}>
            ✨ 100% Gratuito
          </div>
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            padding: '0.5rem 1.5rem',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)',
            fontSize: '0.9rem'
          }}>
            🎯 Interativo
          </div>
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            padding: '0.5rem 1.5rem',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)',
            fontSize: '0.9rem'
          }}>
            📚 Didático
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section style={{
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
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
              <div style={{
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
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.15)';
              }}
              >
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
                  color: '#333',
                  position: 'relative',
                  zIndex: 1
                }}>
                  {module.title}
                </h2>
                
                <p style={{
                  fontSize: '1rem',
                  color: '#666',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem',
                  flex: 1,
                  position: 'relative',
                  zIndex: 1
                }}>
                  {module.description}
                </p>
                
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  marginBottom: '1rem',
                  position: 'relative',
                  zIndex: 1
                }}>
                  {module.features.map((feature, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '0.875rem',
                      color: '#555'
                    }}>
                      <span style={{
                        marginRight: '0.5rem',
                        color: module.color
                      }}>✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
                
                <button style={{
                  backgroundColor: module.color,
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  width: '100%',
                  position: 'relative',
                  zIndex: 1
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = `0 4px 12px ${module.color}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                >
                  Explorar →
                </button>
              </div>
            </Link>
          ))}
        </div>

        {/* Info Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginTop: '3rem'
        }}>
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.95)',
            padding: '1.5rem',
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#333' }}>
              Aprendizado Prático
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#666', margin: 0 }}>
              Visualize e interaja com os algoritmos em tempo real
            </p>
          </div>

          <div style={{
            backgroundColor: 'rgba(255,255,255,0.95)',
            padding: '1.5rem',
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📈</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#333' }}>
              Passo a Passo
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#666', margin: 0 }}>
              Acompanhe cada etapa da execução dos algoritmos
            </p>
          </div>

          <div style={{
            backgroundColor: 'rgba(255,255,255,0.95)',
            padding: '1.5rem',
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>�</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#333' }}>
              Conteúdo Completo
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#666', margin: 0 }}>
              Teoria, exemplos e exercícios práticos
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '2rem',
        color: 'white',
        opacity: '0.9',
        marginTop: '2rem'
      }}>
        <p style={{ margin: '0 0 0.5rem', fontSize: '0.9rem' }}>
          Desenvolvido por Prof. Eng. Computação Vagner Cordeiro
        </p>
        <p style={{ margin: 0, fontSize: '0.85rem', opacity: '0.8' }}>
          © 2025 Algoritmos Avançados - Plataforma Educacional
        </p>
      </footer>
    </main>
  );
}
