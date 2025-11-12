// ===== SISTEMA DE ATALHOS DE TECLADO AVANÇADO =====

class KeyboardShortcuts {
    constructor() {
        this.shortcuts = new Map();
        this.enabled = true;
        this.modalVisible = false;
        this.init();
    }

    init() {
        // Registra atalhos (silencioso)
        this.registerShortcuts();
        this.setupEventListeners();
        this.createHelpModal();
    }

    registerShortcuts() {
        // Navegação
        this.register('?', () => this.toggleHelpModal(), 'Mostrar/Ocultar atalhos', 'Ajuda');
        this.register('Escape', () => this.closeModals(), 'Fechar modais', 'Navegação');
        
        // Controles de visualização
        this.register('Space', () => this.togglePlay(), 'Iniciar/Pausar', 'Visualização');
        this.register('r', () => this.reset(), 'Resetar', 'Visualização');
        this.register('n', () => this.nextStep(), 'Próximo passo', 'Visualização');
        this.register('p', () => this.previousStep(), 'Passo anterior', 'Visualização');
        
        // Velocidade
        this.register('1', () => this.setSpeed(1), 'Velocidade 1x', 'Velocidade');
        this.register('2', () => this.setSpeed(2), 'Velocidade 2x', 'Velocidade');
        this.register('3', () => this.setSpeed(3), 'Velocidade 3x', 'Velocidade');
        this.register('4', () => this.setSpeed(0.5), 'Velocidade 0.5x', 'Velocidade');
        
        // Interface
        this.register('t', () => this.toggleTheme(), 'Trocar tema', 'Interface');
        this.register('f', () => this.toggleFullscreen(), 'Tela cheia', 'Interface');
        this.register('s', () => this.toggleSound(), 'Ativar/Desativar som', 'Interface');
        this.register('d', () => this.toggleDashboard(), 'Mostrar dashboard', 'Interface');
        
        // Ações rápidas
        this.register('ctrl+s', () => this.saveProgress(), 'Salvar progresso', 'Ações');
        this.register('ctrl+e', () => this.exportData(), 'Exportar dados', 'Ações');
        this.register('ctrl+p', () => this.print(), 'Imprimir', 'Ações');
    }

    register(key, action, description, category = 'Geral') {
        this.shortcuts.set(key.toLowerCase(), {
            action,
            description,
            category,
            key
        });
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (!this.enabled) return;
            
            // Ignora se estiver em input, textarea ou contentEditable
            if (this.isTypingContext(e.target)) return;
            
            const key = this.getKeyString(e);
            const shortcut = this.shortcuts.get(key.toLowerCase());
            
            if (shortcut) {
                e.preventDefault();
                shortcut.action();
                this.showFeedback(shortcut.description);
            }
        });
    }

    isTypingContext(element) {
        const tagName = element.tagName.toLowerCase();
        return (
            tagName === 'input' ||
            tagName === 'textarea' ||
            element.contentEditable === 'true'
        );
    }

    getKeyString(e) {
        const parts = [];
        if (e.ctrlKey) parts.push('ctrl');
        if (e.altKey) parts.push('alt');
        if (e.shiftKey) parts.push('shift');
        parts.push(e.key);
        return parts.join('+');
    }

    // Ações dos atalhos
    togglePlay() {
        const playBtn = document.getElementById('playBtn');
        if (playBtn) playBtn.click();
    }

    reset() {
        const resetBtn = document.getElementById('resetBtn');
        if (resetBtn) resetBtn.click();
    }

    nextStep() {
        if (window.visualizationController) {
            window.visualizationController.nextStep();
        }
    }

    previousStep() {
        if (window.visualizationController) {
            window.visualizationController.previousStep();
        }
    }

    setSpeed(speed) {
        const speedControl = document.getElementById('speedControl');
        if (speedControl) {
            speedControl.value = speed;
            speedControl.dispatchEvent(new Event('change'));
        }
    }

    toggleTheme() {
        const themeBtn = document.getElementById('themeBtn');
        if (themeBtn) {
            themeBtn.click();
        } else if (window.themeManager) {
            // Cicla entre os temas
            const themes = ['light', 'dark', 'highContrast', 'sepia'];
            const currentIndex = themes.indexOf(window.themeManager.currentTheme);
            const nextIndex = (currentIndex + 1) % themes.length;
            window.themeManager.applyTheme(themes[nextIndex]);
        }
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            if (window.toast) {
                window.toast.info('🖥️ Modo tela cheia ativado', 2000);
            }
        } else {
            document.exitFullscreen();
            if (window.toast) {
                window.toast.info('🪟 Modo tela cheia desativado', 2000);
            }
        }
    }

    toggleSound() {
        if (window.soundEffects) {
            window.soundEffects.toggleMute();
            const status = window.soundEffects.isMuted ? 'desativado' : 'ativado';
            if (window.toast) {
                window.toast.info(`🔊 Som ${status}`, 2000);
            }
        }
    }

    toggleDashboard() {
        const dashboard = document.getElementById('analyticsDashboard');
        if (dashboard) {
            const isVisible = dashboard.style.display !== 'none';
            dashboard.style.display = isVisible ? 'none' : 'flex';
        }
    }

    saveProgress() {
        if (window.gamificationSystem) {
            window.gamificationSystem.saveProgress();
            if (window.toast) {
                window.toast.success('💾 Progresso salvo!', 2000);
            }
        }
    }

    exportData() {
        const exportBtn = document.getElementById('exportImageBtn');
        if (exportBtn) {
            exportBtn.click();
        }
    }

    print() {
        window.print();
    }

    closeModals() {
        // Fecha qualquer modal aberto
        const modals = document.querySelectorAll('.modal, .dashboard, [role="dialog"]');
        modals.forEach(modal => {
            if (modal.style.display !== 'none') {
                const closeBtn = modal.querySelector('[id*="close"], .close-btn');
                if (closeBtn) closeBtn.click();
                else modal.style.display = 'none';
            }
        });
        
        if (this.modalVisible) {
            this.toggleHelpModal();
        }
    }

    showFeedback(message) {
        if (!window.toast) return;
        
        // Mostra feedback discreto
        const feedback = document.createElement('div');
        feedback.className = 'keyboard-feedback';
        feedback.textContent = message;
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            feedback.classList.remove('show');
            setTimeout(() => feedback.remove(), 300);
        }, 1500);
    }

    toggleHelpModal() {
        const modal = document.getElementById('keyboardHelpModal');
        if (modal) {
            this.modalVisible = !this.modalVisible;
            modal.style.display = this.modalVisible ? 'flex' : 'none';
        }
    }

    createHelpModal() {
        if (document.getElementById('keyboardHelpModal')) return;

        // Agrupa atalhos por categoria
        const categories = new Map();
        this.shortcuts.forEach(shortcut => {
            if (!categories.has(shortcut.category)) {
                categories.set(shortcut.category, []);
            }
            categories.get(shortcut.category).push(shortcut);
        });

        const modal = document.createElement('div');
        modal.id = 'keyboardHelpModal';
        modal.className = 'keyboard-help-modal';
        modal.style.display = 'none';
        
        let content = '<div class="keyboard-help-content">';
        content += '<div class="keyboard-help-header">';
        content += '<h2>⌨️ Atalhos de Teclado</h2>';
        content += '<button class="keyboard-help-close" onclick="window.keyboardShortcuts.toggleHelpModal()">×</button>';
        content += '</div>';
        content += '<div class="keyboard-help-body">';
        
        categories.forEach((shortcuts, category) => {
            content += `<div class="shortcut-category">`;
            content += `<h3>${category}</h3>`;
            content += `<div class="shortcut-list">`;
            
            shortcuts.forEach(shortcut => {
                const keys = shortcut.key.split('+').map(k => 
                    `<kbd>${k.charAt(0).toUpperCase() + k.slice(1)}</kbd>`
                ).join(' + ');
                
                content += `
                    <div class="shortcut-item">
                        <span class="shortcut-keys">${keys}</span>
                        <span class="shortcut-desc">${shortcut.description}</span>
                    </div>
                `;
            });
            
            content += `</div></div>`;
        });
        
        content += '</div></div>';
        modal.innerHTML = content;
        document.body.appendChild(modal);

        this.addHelpStyles();
    }

    addHelpStyles() {
        if (document.getElementById('keyboardHelpStyles')) return;

        const style = document.createElement('style');
        style.id = 'keyboardHelpStyles';
        style.textContent = `
            .keyboard-help-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.7);
                z-index: 100001;
                display: flex;
                align-items: center;
                justify-content: center;
                backdrop-filter: blur(5px);
            }

            .keyboard-help-content {
                background: var(--surface-color);
                border-radius: 16px;
                max-width: 800px;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            }

            .keyboard-help-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 24px 32px;
                border-bottom: 1px solid var(--border-color);
            }

            .keyboard-help-header h2 {
                margin: 0;
                color: var(--text-primary);
            }

            .keyboard-help-close {
                background: transparent;
                border: none;
                font-size: 32px;
                color: var(--text-secondary);
                cursor: pointer;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 8px;
                transition: all 0.2s ease;
            }

            .keyboard-help-close:hover {
                background: var(--background-color);
                color: var(--text-primary);
            }

            .keyboard-help-body {
                padding: 32px;
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 24px;
            }

            .shortcut-category h3 {
                color: var(--text-primary);
                margin: 0 0 16px 0;
                font-size: 1.1em;
            }

            .shortcut-list {
                display: flex;
                flex-direction: column;
                gap: 12px;
            }

            .shortcut-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 16px;
            }

            .shortcut-keys {
                display: flex;
                gap: 4px;
            }

            .shortcut-keys kbd {
                background: var(--background-color);
                border: 1px solid var(--border-color);
                border-radius: 4px;
                padding: 4px 8px;
                font-family: monospace;
                font-size: 0.9em;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            .shortcut-desc {
                color: var(--text-secondary);
                font-size: 0.95em;
            }

            .keyboard-feedback {
                position: fixed;
                bottom: 40px;
                left: 50%;
                transform: translateX(-50%) translateY(20px);
                background: var(--surface-color);
                color: var(--text-primary);
                padding: 8px 16px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                font-size: 14px;
                opacity: 0;
                transition: all 0.3s ease;
                z-index: 100002;
                pointer-events: none;
            }

            .keyboard-feedback.show {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }

            @media (max-width: 768px) {
                .keyboard-help-content {
                    max-width: 95%;
                    max-height: 90vh;
                }

                .keyboard-help-body {
                    grid-template-columns: 1fr;
                    padding: 16px;
                }

                .keyboard-help-header {
                    padding: 16px;
                }
            }
        `;

        document.head.appendChild(style);
    }

    enable() {
        this.enabled = true;
    }

    disable() {
        this.enabled = false;
    }

    getShortcuts() {
        return Array.from(this.shortcuts.entries()).map(([key, data]) => ({
            key,
            ...data
        }));
    }
}

// Inicializa
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.keyboardShortcuts = new KeyboardShortcuts();
    });
} else {
    window.keyboardShortcuts = new KeyboardShortcuts();
}
