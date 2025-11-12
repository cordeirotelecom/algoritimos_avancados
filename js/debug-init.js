// Script de inicialização e debug
console.log('🚀 INÍCIO DO CARREGAMENTO DA PÁGINA');
console.log('Timestamp:', new Date().toISOString());

// Verificar estado do DOM
if (document.readyState === 'loading') {
    console.log('📄 DOM ainda carregando...');
} else {
    console.log('✅ DOM já carregado');
}

// Capturar TODOS os erros
window.addEventListener('error', function(e) {
    console.error('❌ ERRO GLOBAL:', e.message);
    console.error('Arquivo:', e.filename);
    console.error('Linha:', e.lineno, 'Coluna:', e.colno);
    console.error('Erro:', e.error);
    
    // Mostrar erro visualmente
    const errorBox = document.createElement('div');
    errorBox.style.cssText = `
        position: fixed;
        top: 10px;
        left: 10px;
        right: 10px;
        background: #f44336;
        color: white;
        padding: 15px;
        border-radius: 8px;
        z-index: 999999;
        font-family: monospace;
        font-size: 14px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    `;
    errorBox.innerHTML = `
        <strong>❌ ERRO DETECTADO</strong><br>
        <strong>Mensagem:</strong> ${e.message}<br>
        <strong>Arquivo:</strong> ${e.filename}<br>
        <strong>Linha:</strong> ${e.lineno}<br>
        <button onclick="this.parentElement.remove()" style="margin-top:10px;padding:5px 10px;background:white;color:#f44336;border:none;border-radius:4px;cursor:pointer;">Fechar</button>
    `;
    document.body.appendChild(errorBox);
});

// Capturar erros de promessas não tratadas
window.addEventListener('unhandledrejection', function(e) {
    console.error('❌ PROMISE REJEITADA:', e.reason);
});

// Monitorar carregamento de recursos
const resourceTiming = performance.getEntriesByType('resource');
console.log('📊 Recursos carregados até agora:', resourceTiming.length);

// Verificar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOMContentLoaded disparado');
    console.log('Body existe:', !!document.body);
    console.log('Elementos no body:', document.body ? document.body.children.length : 0);
});

// Verificar quando a página estiver totalmente carregada
window.addEventListener('load', function() {
    console.log('✅ Window.load disparado - página totalmente carregada');
    
    // Listar todos os scripts carregados
    const scripts = document.querySelectorAll('script');
    console.log('📜 Total de scripts:', scripts.length);
    
    // Listar todos os CSS carregados
    const styles = document.querySelectorAll('link[rel="stylesheet"]');
    console.log('🎨 Total de CSS:', styles.length);
    
    // Verificar classes globais importantes
    console.log('ALGORITHMS definido:', typeof ALGORITHMS !== 'undefined');
    console.log('VisualizationController definido:', typeof VisualizationController !== 'undefined');
    console.log('progressController definido:', typeof window.progressController !== 'undefined');
    console.log('SortingGameApp definido:', typeof SortingGameApp !== 'undefined');
    console.log('sortingApp instância:', typeof window.sortingApp !== 'undefined');
});

console.log('✅ Script de debug carregado');
