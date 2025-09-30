// ===== EXPORT AND SHARING CONTROLLER =====

class ExportShareController {
    constructor() {
        this.canvasRecorder = null;
        this.isRecording = false;
        this.recordedFrames = [];
    }

    // Export statistics as JSON
    exportStatistics(gamificationController) {
        const stats = gamificationController.getStats();
        const exportData = {
            timestamp: new Date().toISOString(),
            version: '1.0',
            statistics: stats,
            achievements: Array.from(gamificationController.achievements.values()),
            completedAlgorithms: Array.from(gamificationController.completedAlgorithms)
        };

        this.downloadJSON(exportData, 'sorting-algorithm-stats.json');
    }

    // Export current array state as image
    async exportArrayAsImage(containerElement, filename = 'sorting-visualization.png') {
        try {
            // Use html2canvas to capture the visualization
            const canvas = await this.captureElement(containerElement);
            this.downloadCanvas(canvas, filename);
        } catch (error) {
            console.error('Error exporting image:', error);
            throw new Error('Falha ao exportar imagem');
        }
    }

    // Capture element as canvas (simplified version)
    async captureElement(element) {
        return new Promise((resolve, reject) => {
            try {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // Get element dimensions
                const rect = element.getBoundingClientRect();
                canvas.width = rect.width;
                canvas.height = rect.height;

                // Fill background
                ctx.fillStyle = getComputedStyle(element).backgroundColor || '#1a1a2e';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Draw bars (simplified visualization)
                const bars = element.querySelectorAll('.array-bar');
                bars.forEach((bar, index) => {
                    const barRect = bar.getBoundingClientRect();
                    const elementRect = element.getBoundingClientRect();
                    
                    const x = barRect.left - elementRect.left;
                    const y = barRect.top - elementRect.top;
                    const width = barRect.width;
                    const height = barRect.height;

                    // Get bar color based on classes
                    let color = '#667eea'; // default
                    if (bar.classList.contains('comparing')) color = '#f093fb';
                    else if (bar.classList.contains('swapping')) color = '#fbbf24';
                    else if (bar.classList.contains('sorted')) color = '#4ade80';
                    else if (bar.classList.contains('pivot')) color = '#f59e0b';

                    // Draw bar
                    ctx.fillStyle = color;
                    ctx.fillRect(x, y, width, height);

                    // Draw value text
                    ctx.fillStyle = 'white';
                    ctx.font = '12px Inter, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText(bar.textContent, x + width/2, y + height - 5);
                });

                resolve(canvas);
            } catch (error) {
                reject(error);
            }
        });
    }

    // Share results via Web Share API or fallback
    async shareResults(stats, algorithm) {
        const shareData = {
            title: 'Resultado dos Algoritmos de Ordenacao',
            text: `Completei o ${algorithm} com ${stats.comparisons} comparacoes e ${stats.swaps} trocas em ${stats.time}s! 🎉`,
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // Fallback: copy to clipboard
                const text = `${shareData.text}\n${shareData.url}`;
                await navigator.clipboard.writeText(text);
                throw new Error('Resultado copiado para a area de transferencia!');
            }
        } catch (error) {
            if (error.message.includes('copiado')) {
                throw error; // Re-throw clipboard success message
            }
            // If sharing fails, show modal with share options
            this.showShareModal(shareData);
        }
    }

    // Show share modal with different options
    showShareModal(shareData) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'flex';

        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>📤 Compartilhar Resultado</h3>
                    <button id="closeShareModal" class="btn btn-outline">✕</button>
                </div>
                <div class="modal-body">
                    <p>Compartilhe seu resultado:</p>
                    <textarea id="shareText" readonly style="width: 100%; height: 80px; margin: 1rem 0; padding: 0.5rem; border-radius: 0.5rem; background: var(--surface-light); color: var(--text-primary); border: 1px solid var(--border-color);">${shareData.text}</textarea>
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                        <button id="copyShare" class="btn btn-primary">📋 Copiar</button>
                        <button id="shareTwitter" class="btn btn-secondary">🐦 Twitter</button>
                        <button id="shareFacebook" class="btn btn-secondary">📘 Facebook</button>
                        <button id="shareWhatsApp" class="btn btn-secondary">💬 WhatsApp</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Event listeners
        modal.querySelector('#closeShareModal').addEventListener('click', () => {
            modal.remove();
        });

        modal.querySelector('#copyShare').addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(shareData.text);
                modal.querySelector('#copyShare').textContent = '✅ Copiado!';
                setTimeout(() => {
                    modal.remove();
                }, 1000);
            } catch (error) {
                console.error('Erro ao copiar:', error);
            }
        });

        modal.querySelector('#shareTwitter').addEventListener('click', () => {
            const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`;
            window.open(url, '_blank');
        });

        modal.querySelector('#shareFacebook').addEventListener('click', () => {
            const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}&quote=${encodeURIComponent(shareData.text)}`;
            window.open(url, '_blank');
        });

        modal.querySelector('#shareWhatsApp').addEventListener('click', () => {
            const url = `https://wa.me/?text=${encodeURIComponent(shareData.text + ' ' + shareData.url)}`;
            window.open(url, '_blank');
        });

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // Generate and download performance report
    generatePerformanceReport(gamificationController) {
        const stats = gamificationController.getStats();
        const report = this.createPerformanceHTML(stats);
        
        const blob = new Blob([report], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'relatorio-performance-algoritmos.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Create HTML performance report
    createPerformanceHTML(stats) {
        return `
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Relatorio de Performance - Algoritmos de Ordenacao</title>
    <style>
        body {
            font-family: 'Inter', Arial, sans-serif;
            background: linear-gradient(135deg, #0f0f23, #1a1a2e);
            color: white;
            margin: 0;
            padding: 2rem;
            min-height: 100vh;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(26, 26, 46, 0.8);
            border-radius: 1rem;
            padding: 2rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        h1 { color: #667eea; text-align: center; margin-bottom: 2rem; }
        h2 { color: #f093fb; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 0.5rem; }
        .stat-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin: 1rem 0;
        }
        .stat-card {
            background: rgba(16, 21, 62, 0.5);
            padding: 1rem;
            border-radius: 0.5rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
            text-align: center;
        }
        .stat-value {
            font-size: 2rem;
            font-weight: bold;
            color: #4ade80;
            display: block;
        }
        .stat-label {
            color: #a1a1aa;
            font-size: 0.875rem;
        }
        .achievements {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
        }
        .achievement {
            background: rgba(16, 21, 62, 0.5);
            padding: 1rem;
            border-radius: 0.5rem;
            border: 1px solid rgba(74, 222, 128, 0.3);
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        .achievement.locked {
            border-color: rgba(255, 255, 255, 0.1);
            opacity: 0.5;
        }
        .achievement-icon {
            font-size: 2rem;
            filter: grayscale(0);
        }
        .achievement.locked .achievement-icon {
            filter: grayscale(1);
        }
        .footer {
            text-align: center;
            margin-top: 2rem;
            padding-top: 1rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            color: #a1a1aa;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎮 Relatorio de Performance</h1>
        <p style="text-align: center; color: #a1a1aa;">Gerado em ${new Date().toLocaleString('pt-BR')}</p>
        
        <h2>📊 Estatisticas Gerais</h2>
        <div class="stat-grid">
            <div class="stat-card">
                <span class="stat-value">${stats.score.toLocaleString()}</span>
                <span class="stat-label">Pontos Totais</span>
            </div>
            <div class="stat-card">
                <span class="stat-value">${stats.level}</span>
                <span class="stat-label">Nivel</span>
            </div>
            <div class="stat-card">
                <span class="stat-value">${stats.totalSorts}</span>
                <span class="stat-label">Ordenacoes Completadas</span>
            </div>
            <div class="stat-card">
                <span class="stat-value">${stats.completedAlgorithms.length}/7</span>
                <span class="stat-label">Algoritmos Dominados</span>
            </div>
            <div class="stat-card">
                <span class="stat-value">${stats.totalComparisons.toLocaleString()}</span>
                <span class="stat-label">Comparacoes Totais</span>
            </div>
            <div class="stat-card">
                <span class="stat-value">${Math.floor(stats.totalTime / 60)}min</span>
                <span class="stat-label">Tempo de Aprendizado</span>
            </div>
        </div>

        <h2>🏆 Conquistas (${stats.achievementsUnlocked}/${stats.totalAchievements})</h2>
        <div class="achievements">
            ${Object.values(stats.achievements || {}).map(achievement => `
                <div class="achievement ${achievement.unlocked ? '' : 'locked'}">
                    <div class="achievement-icon">${achievement.icon}</div>
                    <div>
                        <strong>${achievement.name}</strong>
                        <div style="color: #a1a1aa; font-size: 0.875rem;">${achievement.description}</div>
                    </div>
                </div>
            `).join('')}
        </div>

        <h2>🎯 Algoritmos Completados</h2>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            ${stats.completedAlgorithms.map(alg => `
                <span style="background: rgba(102, 126, 234, 0.2); padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.875rem;">
                    ${alg.charAt(0).toUpperCase() + alg.slice(1)} Sort
                </span>
            `).join('')}
        </div>

        <div class="footer">
            <p>Gerado por Algoritmos de Ordenacao Gamificados</p>
            <p>Continue aprendendo e melhore suas habilidades! 🚀</p>
        </div>
    </div>
</body>
</html>`;
    }

    // Utility methods
    downloadJSON(data, filename) {
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        this.downloadBlob(blob, filename);
    }

    downloadCanvas(canvas, filename) {
        canvas.toBlob((blob) => {
            this.downloadBlob(blob, filename);
        });
    }

    downloadBlob(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Export for use in other modules
window.ExportShareController = ExportShareController;
