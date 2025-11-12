// ===== INTERACTIVE ENHANCEMENTS =====

/**
 * Sistema de Efeitos Visuais Interativos
 * Adiciona micro-interações e animações de entrada/saída
 */

class InteractiveEnhancements {
    constructor() {
        this.initialize();
    }

    initialize() {
        console.log('🎨 Inicializando Efeitos Visuais Interativos');
        this.setupCardAnimations();
        this.setupButtonEffects();
        this.setupScrollAnimations();
        this.setupParticleEffects();
    }

    /**
     * Animações de cards ao passar do mouse
     */
    setupCardAnimations() {
        const cards = document.querySelectorAll('.algorithm-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                card.style.animation = 'cardHoverPulse 0.6s ease-out';
            });

            card.addEventListener('mouseleave', (e) => {
                card.style.animation = 'none';
            });
        });
    }

    /**
     * Efeitos de botões
     */
    setupButtonEffects() {
        const buttons = document.querySelectorAll('button, a[role="button"]');
        
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.createRippleEffect(e);
            });

            btn.addEventListener('mouseenter', (e) => {
                btn.style.transform = 'scale(1.05)';
            });

            btn.addEventListener('mouseleave', (e) => {
                btn.style.transform = 'scale(1)';
            });
        });
    }

    /**
     * Efeito Ripple em cliques
     */
    createRippleEffect(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.position = 'absolute';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'rippleAnimation 0.6s ease-out';
        ripple.style.transform = 'scale(0)';

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }

    /**
     * Animações ao scroll
     */
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.module-section, .stat-card, .achievement-item').forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * Efeitos de partículas
     */
    setupParticleEffects() {
        // Adiciona efeito de partículas em elementos especiais
        const particleElements = document.querySelectorAll('.achievement-item, .stat-item');
        
        particleElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.createParticles(el);
            });
        });
    }

    /**
     * Criar partículas animadas
     */
    createParticles(element) {
        const rect = element.getBoundingClientRect();
        const particleCount = 5;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            const size = Math.random() * 6 + 3;
            const x = Math.random() * rect.width;
            const y = Math.random() * rect.height;
            const vx = (Math.random() - 0.5) * 200;
            const vy = (Math.random() - 0.5) * 200 - 100;

            particle.style.position = 'fixed';
            particle.style.left = (rect.left + x) + 'px';
            particle.style.top = (rect.top + y) + 'px';
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.background = `hsl(${Math.random() * 60 + 200}, 100%, 60%)`;
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            particle.style.boxShadow = '0 0 10px currentColor';

            document.body.appendChild(particle);

            let currentX = rect.left + x;
            let currentY = rect.top + y;
            let currentVx = vx;
            let currentVy = vy;
            const duration = 1000;
            const startTime = performance.now();

            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                currentVy += 9.8 * 0.016; // Gravidade
                currentX += currentVx * 0.016;
                currentY += currentVy * 0.016;

                particle.style.left = currentX + 'px';
                particle.style.top = currentY + 'px';
                particle.style.opacity = 1 - progress;

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    particle.remove();
                }
            };

            requestAnimationFrame(animate);
        }
    }
}

// ===== ANIMATIONS CSS INJECTION =====

const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes cardHoverPulse {
        0% {
            transform: translateY(-8px) scale(1);
        }
        50% {
            transform: translateY(-12px) scale(1.02);
        }
        100% {
            transform: translateY(-8px) scale(1);
        }
    }

    @keyframes rippleAnimation {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes particleExplosion {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(var(--tx), var(--ty)) scale(0);
            opacity: 0;
        }
    }

    /* Smooth transitions para todos os botões */
    button, a[role="button"], .btn {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Efeito de pulse em elementos destacados */
    .pulse-animation {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.8;
        }
    }
`;

document.head.appendChild(styleSheet);

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new InteractiveEnhancements();
});
