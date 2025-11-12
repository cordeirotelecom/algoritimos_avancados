// ===== SISTEMA DE NOTIFICAÇÕES TOAST =====

class ToastNotifications {
    constructor() {
        this.container = null;
        this.activeToasts = new Set();
        this.maxToasts = 5;
        this.defaultDuration = 4000;
        this.init();
    }

    init() {
        this.createContainer();
        this.addStyles();
    }

    createContainer() {
        if (document.getElementById('toastContainer')) return;

        this.container = document.createElement('div');
        this.container.id = 'toastContainer';
        this.container.className = 'toast-container';
        document.body.appendChild(this.container);
    }

    show(message, type = 'info', duration = this.defaultDuration) {
        // Remove toasts excedentes
        if (this.activeToasts.size >= this.maxToasts) {
            const oldestToast = this.activeToasts.values().next().value;
            this.remove(oldestToast);
        }

        const toast = this.createToast(message, type);
        this.activeToasts.add(toast);
        this.container.appendChild(toast);

        // Anima entrada
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // Auto-remove após duração
        if (duration > 0) {
            setTimeout(() => {
                this.remove(toast);
            }, duration);
        }

        return toast;
    }

    createToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        const icon = this.getIcon(type);
        const closeBtn = document.createElement('button');
        closeBtn.className = 'toast-close';
        closeBtn.innerHTML = '×';
        closeBtn.onclick = () => this.remove(toast);

        toast.innerHTML = `
            <div class="toast-icon">${icon}</div>
            <div class="toast-content">
                <div class="toast-message">${message}</div>
            </div>
        `;
        toast.appendChild(closeBtn);

        return toast;
    }

    getIcon(type) {
        const icons = {
            success: '✓',
            error: '✗',
            warning: '⚠',
            info: 'ℹ'
        };
        return icons[type] || icons.info;
    }

    remove(toast) {
        if (!toast || !this.activeToasts.has(toast)) return;

        toast.classList.remove('show');
        toast.classList.add('hide');

        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
            this.activeToasts.delete(toast);
        }, 300);
    }

    // Métodos de conveniência
    success(message, duration) {
        return this.show(message, 'success', duration);
    }

    error(message, duration) {
        return this.show(message, 'error', duration);
    }

    warning(message, duration) {
        return this.show(message, 'warning', duration);
    }

    info(message, duration) {
        return this.show(message, 'info', duration);
    }

    clear() {
        this.activeToasts.forEach(toast => this.remove(toast));
    }

    addStyles() {
        if (document.getElementById('toastStyles')) return;

        const style = document.createElement('style');
        style.id = 'toastStyles';
        style.textContent = `
            .toast-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 100000;
                display: flex;
                flex-direction: column;
                gap: 10px;
                pointer-events: none;
            }

            .toast {
                background: var(--surface-color);
                color: var(--text-primary);
                border-radius: 8px;
                padding: 16px;
                min-width: 300px;
                max-width: 500px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                display: flex;
                align-items: flex-start;
                gap: 12px;
                pointer-events: auto;
                transform: translateX(400px);
                opacity: 0;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .toast.show {
                transform: translateX(0);
                opacity: 1;
            }

            .toast.hide {
                transform: translateX(400px);
                opacity: 0;
            }

            .toast-icon {
                flex-shrink: 0;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-size: 14px;
            }

            .toast-success .toast-icon {
                background: #10b981;
                color: white;
            }

            .toast-error .toast-icon {
                background: #ef4444;
                color: white;
            }

            .toast-warning .toast-icon {
                background: #f59e0b;
                color: white;
            }

            .toast-info .toast-icon {
                background: #3b82f6;
                color: white;
            }

            .toast-content {
                flex: 1;
                padding-top: 2px;
            }

            .toast-message {
                font-size: 14px;
                line-height: 1.5;
            }

            .toast-close {
                flex-shrink: 0;
                background: transparent;
                border: none;
                color: var(--text-secondary);
                font-size: 24px;
                line-height: 1;
                cursor: pointer;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 4px;
                transition: all 0.2s ease;
            }

            .toast-close:hover {
                background: var(--background-color);
                color: var(--text-primary);
            }

            /* Animações reduzidas */
            @media (prefers-reduced-motion: reduce) {
                .toast {
                    transition: none !important;
                }
            }

            body.reduce-animations .toast {
                transition: none !important;
            }

            /* Responsivo */
            @media (max-width: 768px) {
                .toast-container {
                    top: 10px;
                    right: 10px;
                    left: 10px;
                }

                .toast {
                    min-width: auto;
                    max-width: none;
                }
            }
        `;

        document.head.appendChild(style);
    }
}

// Inicializa e expõe globalmente
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.toast = new ToastNotifications();
    });
} else {
    window.toast = new ToastNotifications();
}

// API de conveniência global
window.showToast = (message, type, duration) => {
    if (window.toast) {
        return window.toast.show(message, type, duration);
    }
};
