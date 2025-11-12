export const metadata = {
  title: 'Algoritmos Avançados - Plataforma Educacional Interativa',
  description: 'Aprenda algoritmos e estruturas de dados com simuladores interativos. Visualize Dijkstra, Grafos e muito mais de forma didática e prática.',
  keywords: ['algoritmos', 'grafos', 'dijkstra', 'estruturas de dados', 'educação', 'programação', 'computação'],
  authors: [{ name: 'Prof. Eng. Computação Vagner Cordeiro' }],
  creator: 'Prof. Vagner Cordeiro',
  publisher: 'Algoritmos Avançados',
  robots: 'index, follow',
  openGraph: {
    title: 'Algoritmos Avançados - Plataforma Educacional',
    description: 'Aprenda algoritmos de forma interativa com visualizações passo a passo',
    type: 'website',
    locale: 'pt_BR',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎓</text></svg>" />
      </head>
      <body style={{ 
        margin: 0, 
        padding: 0, 
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        background: '#f8f9fa',
        minHeight: '100vh'
      }}>
        {children}
      </body>
    </html>
  );
}
