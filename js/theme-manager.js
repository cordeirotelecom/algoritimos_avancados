// ===== SISTEMA DE TEMAS AVANÇADO =====

class ThemeManager {
    constructor() {
        this.currentTheme = this.loadTheme() || 'light';
        this.themes = {
            light: {
                name: 'Claro',
                icon: '☀️',
                colors: {
                    '--background-color': '#f8fafc',
                    '--surface-color': '#ffffff',
                    '--text-primary': '#1f2937',
                    '--text-secondary': '#6b7280',
                    '--border-color': '#e5e7eb'
                }
            },
            dark: {
                name: 'Escuro',
                icon: '🌙',
                colors: {
                    '--background-color': '#0f172a',
                    '--surface-color': '#1e293b',
                    '--text-primary': '#f1f5f9',
                    '--text-secondary': '#94a3b8',
                    '--border-color': '#334155'
                }
            },
            highContrast: {
                name: 'Alto Contraste',
                icon: '👁️',
                colors: {
                    '--background-color': '#000000',
                    '--surface-color': '#1a1a1a',
                    '--text-primary': '#ffffff',
                    '--text-secondary': '#e0e0e0',
                    '--border-color': '#444444'
                }
            },
            sepia: {
                name: 'Sépia',
                icon: '📜',
                colors: {
                    '--background-color': '#f4ecd8',
                    '--surface-color': '#faf6ed',
                    '--text-primary': '#433422',
                    '--text-secondary': '#6b5d4f',
                    '--border-color': '#d4c4a8'
                }
            }
        };

        this.init();
    }

    init() {
        // Aplica tema salvo
        this.applyTheme(this.currentTheme);

        // Cria botão de tema se não existir
        this.createThemeToggle();

        // Detecta preferência do sistema
        this.detectSystemPreference();
    }

    loadTheme() {
        return localStorage.getItem('selectedTheme');
    }

    saveTheme(theme) {
        localStorage.setItem('selectedTheme', theme);
    }

    applyTheme(themeName) {
        const theme = this.themes[themeName];
        if (!theme) return;

        const root = document.documentElement;
        
        // Aplica cores do tema
        Object.entries(theme.colors).forEach(([property, value]) => {
            root.style.setProperty(property, value);
        });

        // Atualiza classe do body
        document.body.className = document.body.className.replace(/theme-\w+/g, '');
        document.body.classList.add(`theme-${themeName}`);

        this.currentTheme = themeName;
        this.saveTheme(themeName);

        // Atualiza ícone do botão
        this.updateThemeButton();

        // Dispara evento customizado
        window.dispatchEvent(new CustomEvent('themeChanged', { 
            detail: { theme: themeName } 
        }));
    }

    createThemeToggle() {
        // Verifica se já existe
        if (document.getElementById('themeToggle')) return;

        const toggle = document.createElement('div');
        toggle.id = 'themeToggle';
        toggle.className = 'theme-toggle';
        toggle.innerHTML = `
            <button class="theme-btn" id="themeBtn" title="Alterar Tema">
                <span class="theme-icon">${this.themes[this.currentTheme].icon}</span>
            </button>
            <div class="theme-menu" id="themeMenu" style="display: none;">
                ${Object.keys(this.themes).map(key => `
                    <button class="theme-option ${key === this.currentTheme ? 'active' : ''}" 
                            data-theme="${key}">
                        <span class="theme-option-icon">${this.themes[key].icon}</span>
                        <span class="theme-option-name">${this.themes[key].name}</span>
                        ${key === this.currentTheme ? '<span class="theme-check">✓</span>' : ''}
                    </button>
                `).join('')}
            </div>
        `;

        // Adiciona ao body
        document.body.appendChild(toggle);

        // Adiciona CSS
        this.addThemeStyles();

        // Event listeners
        const themeBtn = document.getElementById('themeBtn');
        const themeMenu = document.getElementById('themeMenu');

        themeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            themeMenu.style.display = themeMenu.style.display === 'none' ? 'block' : 'none';
        });

        // Fecha menu ao clicar fora
        document.addEventListener('click', () => {
            themeMenu.style.display = 'none';
        });

        // Troca de tema
        document.querySelectorAll('.theme-option').forEach(option => {
            option.addEventListener('click', () => {
                const theme = option.dataset.theme;
                this.applyTheme(theme);
                themeMenu.style.display = 'none';
            });
        });
    }

    updateThemeButton() {
        const themeIcon = document.querySelector('.theme-icon');
        const themeOptions = document.querySelectorAll('.theme-option');

        if (themeIcon) {
            themeIcon.textContent = this.themes[this.currentTheme].icon;
        }

        themeOptions.forEach(option => {
            const theme = option.dataset.theme;
            if (theme === this.currentTheme) {
                option.classList.add('active');
                option.innerHTML = `
                    <span class="theme-option-icon">${this.themes[theme].icon}</span>
                    <span class="theme-option-name">${this.themes[theme].name}</span>
                    <span class="theme-check">✓</span>
                `;
            } else {
                option.classList.remove('active');
                option.innerHTML = `
                    <span class="theme-option-icon">${this.themes[theme].icon}</span>
                    <span class="theme-option-name">${this.themes[theme].name}</span>
                `;
            }
        });
    }

    detectSystemPreference() {
        // Detecta preferência de tema escuro do sistema
        if (window.matchMedia && !this.loadTheme()) {
            const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            if (darkModeQuery.matches) {
                this.applyTheme('dark');
            }

            // Observa mudanças
            darkModeQuery.addEventListener('change', (e) => {
                const newTheme = e.matches ? 'dark' : 'light';
                this.applyTheme(newTheme);
            });
        }
    }

    addThemeStyles() {
        if (document.getElementById('themeToggleStyles')) return;

        const style = document.createElement('style');
        style.id = 'themeToggleStyles';
        style.textContent = `
            .theme-toggle {
                position: fixed;
                bottom: 80px;
                right: 20px;
                z-index: 10000;
            }

            .theme-btn {
                width: 56px;
                height: 56px;
                border-radius: 50%;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border: none;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }

            .theme-btn:hover {
                transform: scale(1.1);
                box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
            }

            .theme-icon {
                font-size: 1.5em;
            }

            .theme-menu {
                position: absolute;
                bottom: 70px;
                right: 0;
                background: var(--surface-color);
                border: 1px solid var(--border-color);
                border-radius: 12px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
                min-width: 200px;
                overflow: hidden;
                animation: slideUp 0.3s ease-out;
            }

            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .theme-option {
                width: 100%;
                padding: 12px 16px;
                border: none;
                background: transparent;
                color: var(--text-primary);
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 12px;
                transition: background 0.2s ease;
                font-family: inherit;
                font-size: 0.95em;
            }

            .theme-option:hover {
                background: var(--background-color);
            }

            .theme-option.active {
                background: rgba(102, 126, 234, 0.1);
                font-weight: 600;
            }

            .theme-option-icon {
                font-size: 1.2em;
            }

            .theme-option-name {
                flex: 1;
            }

            .theme-check {
                color: #667eea;
                font-weight: bold;
            }

            /* Reduz animações em bateria baixa ou preferência do usuário */
            @media (prefers-reduced-motion: reduce) {
                .theme-btn,
                .theme-menu,
                .theme-option {
                    transition: none !important;
                    animation: none !important;
                }
            }

            body.reduce-animations .theme-btn,
            body.reduce-animations .theme-menu,
            body.reduce-animations .theme-option {
                transition: none !important;
                animation: none !important;
            }
        `;

        document.head.appendChild(style);
    }

    // API pública
    getAvailableThemes() {
        return Object.keys(this.themes).map(key => ({
            id: key,
            name: this.themes[key].name,
            icon: this.themes[key].icon
        }));
    }

    getCurrentTheme() {
        return {
            id: this.currentTheme,
            name: this.themes[this.currentTheme].name,
            icon: this.themes[this.currentTheme].icon
        };
    }
}

// Inicializa após carregamento
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.themeManager = new ThemeManager();
    });
} else {
    window.themeManager = new ThemeManager();
}
