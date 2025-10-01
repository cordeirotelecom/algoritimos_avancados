// ===== ACCESSIBILITY HELPER =====

class AccessibilityHelper {
    constructor() {
        this.settings = {
            highContrast: false,
            largeText: false,
            reducedMotion: false,
            soundEnabled: true
        };
        
        this.loadSettings();
        this.applySettings();
        this.setupKeyboardShortcuts();
        
        console.log('♿ Sistema de acessibilidade básico inicializado');
    }
    
    loadSettings() {
        try {
            const saved = localStorage.getItem('sortingApp_accessibility');
            if (saved) {
                this.settings = { ...this.settings, ...JSON.parse(saved) };
            }
        } catch (error) {
            console.warn('Erro ao carregar configurações de acessibilidade:', error);
        }
    }
    
    saveSettings() {
        try {
            localStorage.setItem('sortingApp_accessibility', JSON.stringify(this.settings));
        } catch (error) {
            console.warn('Erro ao salvar configurações:', error);
        }
    }
    
    applySettings() {
        const body = document.body;
        
        // Aplicar classes CSS baseadas nas configurações
        body.classList.toggle('high-contrast', this.settings.highContrast);
        body.classList.toggle('large-text', this.settings.largeText);
        body.classList.toggle('reduced-motion', this.settings.reducedMotion);
        
        // Adicionar estilos se não existirem
        this.addAccessibilityStyles();
        
        this.saveSettings();
    }
    
    addAccessibilityStyles() {
        if (document.getElementById('accessibility-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'accessibility-styles';
        style.textContent = `
            /* Alto contraste */
            .high-contrast {
                filter: contrast(150%) brightness(1.1);
            }
            
            .high-contrast .array-bar {
                border: 2px solid #000 !important;
                box-shadow: 0 0 3px rgba(0,0,0,0.5);
            }
            
            /* Texto grande */
            .large-text {
                font-size: 1.2em !important;
            }
            
            .large-text * {
                font-size: inherit !important;
            }
            
            /* Movimento reduzido */
            .reduced-motion *,
            .reduced-motion *::before,
            .reduced-motion *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
            
            /* Melhor foco para navegação por teclado */
            button:focus,
            select:focus,
            input:focus,
            [tabindex]:focus {
                outline: 3px solid #4A90E2 !important;
                outline-offset: 2px !important;
            }
            
            /* Esconder visualmente mas manter acessível para leitores de tela */
            .sr-only {
                position: absolute !important;
                width: 1px !important;
                height: 1px !important;
                padding: 0 !important;
                margin: -1px !important;
                overflow: hidden !important;
                clip: rect(0, 0, 0, 0) !important;
                white-space: nowrap !important;
                border: 0 !important;
            }
        `;
        
        document.head.appendChild(style);
    }
    
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.altKey) {
                switch (e.key.toLowerCase()) {
                    case 'h':
                        e.preventDefault();
                        this.toggleHighContrast();
                        break;
                    case 'l':
                        e.preventDefault();
                        this.toggleLargeText();
                        break;
                    case 'm':
                        e.preventDefault();
                        this.toggleReducedMotion();
                        break;
                }
            }
        });
    }
    
    toggleHighContrast() {
        this.settings.highContrast = !this.settings.highContrast;
        this.applySettings();
        
        const message = this.settings.highContrast ? 
            'Alto contraste ativado' : 'Alto contraste desativado';
        
        this.showNotification(message);
        console.log('♿', message);
    }
    
    toggleLargeText() {
        this.settings.largeText = !this.settings.largeText;
        this.applySettings();
        
        const message = this.settings.largeText ? 
            'Texto grande ativado' : 'Texto grande desativado';
        
        this.showNotification(message);
        console.log('♿', message);
    }
    
    toggleReducedMotion() {
        this.settings.reducedMotion = !this.settings.reducedMotion;
        this.applySettings();
        
        const message = this.settings.reducedMotion ? 
            'Movimento reduzido ativado' : 'Movimento reduzido desativado';
        
        this.showNotification(message);
        console.log('♿', message);
    }
    
    showNotification(message) {
        if (window.gamificationController && window.gamificationController.showNotification) {
            window.gamificationController.showNotification(
                `♿ ${message}`,
                'info',
                3000
            );
        } else {
            // Fallback: criar notificação simples
            const notification = document.createElement('div');
            notification.textContent = message;
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #333;
                color: white;
                padding: 10px 15px;
                border-radius: 5px;
                z-index: 10000;
                font-size: 14px;
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 3000);
        }
    }
    
    // Melhorar elementos para acessibilidade
    enhanceAccessibility() {
        // Adicionar roles e labels ARIA
        const elementsToEnhance = [
            { id: 'arrayBars', role: 'region', label: 'Visualização do array' },
            { id: 'algorithmSelect', label: 'Selecionar algoritmo' },
            { id: 'speedSlider', label: 'Controle de velocidade' },
            { id: 'startBtn', label: 'Iniciar ordenação' },
            { id: 'pauseBtn', label: 'Pausar ordenação' },
            { id: 'resetBtn', label: 'Reiniciar' }
        ];
        
        elementsToEnhance.forEach(item => {
            const element = document.getElementById(item.id);
            if (element) {
                if (item.role) element.setAttribute('role', item.role);
                if (item.label) element.setAttribute('aria-label', item.label);
                
                // Tornar focável se não for
                if (!element.hasAttribute('tabindex') && !['INPUT', 'BUTTON', 'SELECT'].includes(element.tagName)) {
                    element.setAttribute('tabindex', '0');
                }
            }
        });
    }
    
    getStatus() {
        return {
            enabled: true,
            settings: this.settings,
            shortcuts: [
                'Alt+H: Alto Contraste',
                'Alt+L: Texto Grande', 
                'Alt+M: Movimento Reduzido'
            ]
        };
    }
}

// Detectar preferências do sistema
function detectSystemPreferences() {
    const accessibility = {
        reducedMotion: false,
        highContrast: false
    };
    
    if (window.matchMedia) {
        // Movimento reduzido
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            accessibility.reducedMotion = true;
            console.log('🎭 Preferência por movimento reduzido detectada');
        }
        
        // Alto contraste
        if (window.matchMedia('(prefers-contrast: high)').matches) {
            accessibility.highContrast = true;
            console.log('🎨 Preferência por alto contraste detectada');
        }
    }
    
    return accessibility;
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    // Criar instância global
    window.accessibilityHelper = new AccessibilityHelper();
    
    // Detectar e aplicar preferências do sistema
    const systemPrefs = detectSystemPreferences();
    if (systemPrefs.reducedMotion) {
        window.accessibilityHelper.settings.reducedMotion = true;
    }
    if (systemPrefs.highContrast) {
        window.accessibilityHelper.settings.highContrast = true;
    }
    
    window.accessibilityHelper.applySettings();
    
    // Melhorar acessibilidade dos elementos existentes
    setTimeout(() => {
        window.accessibilityHelper.enhanceAccessibility();
    }, 1000);
});

console.log('♿ Accessibility Helper carregado. Atalhos: Alt+H (contraste), Alt+L (texto), Alt+M (movimento)');