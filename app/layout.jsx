export const metadata = {
  title: 'Algoritmos Avançados',
  description: 'Plataforma educacional interativa com simuladores de algoritmos',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body style={{ margin: 0, padding: 0, fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', background: '#f8f9fa' }}>
        {children}
      </body>
    </html>
  );
}
