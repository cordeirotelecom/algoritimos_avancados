'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Início', icon: '🏠' },
    { href: '/ordenacao', label: 'Ordenação', icon: '🫧' },
    { href: '/dijkstra', label: 'Dijkstra', icon: '⚡' },
    { href: '/grafos', label: 'Grafos', icon: '🔗' }
  ];

  return (
    <nav style={{
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      borderRadius: '16px',
      padding: '0.75rem 1rem',
      marginBottom: '2rem',
      display: 'flex',
      gap: '0.5rem',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        
        return (
          <Link
            key={item.href}
            href={item.href}
            style={{
              textDecoration: 'none',
              padding: '0.6rem 1.2rem',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.95rem',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              background: isActive 
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : 'transparent',
              color: isActive ? 'white' : '#333',
              border: isActive ? 'none' : '2px solid transparent'
            }}
            className="nav-link"
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        );
      })}

      <style jsx global>{`
        .nav-link:hover {
          transform: translateY(-2px);
          border-color: #667eea !important;
          background: linear-gradient(135deg, #667eea10 0%, #764ba210 100%) !important;
        }

        .nav-link:hover[style*="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"] {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4) !important;
        }
      `}</style>
    </nav>
  );
}
