// ===== SIMPLIFIED PROGRESS SYSTEM =====

class SimpleProgressController {
    constructor() {
        this.completedAlgorithms = new Set();
        this.currentAlgorithm = null;
        this.currentProgress = 'Selecione um algoritmo para comecar';
        
        this.loadProgress();
        this.updateProgress();
    }

    updateProgress(message = null) {
        const progressElement = document.getElementById('currentProgress');
        if (progressElement) {
            if (message) {
                this.currentProgress = message;
            }
            progressElement.textContent = this.currentProgress;
        }
    }

    setCurrentAlgorithm(algorithmName) {
        this.currentAlgorithm = algorithmName;
        this.updateProgress(`🎓 Aprendendo: ${algorithmName}`);
    }

    startLearning(algorithmName) {
        this.updateProgress(`📖 Estudando como funciona o ${algorithmName}...`);
    }

    startSorting(algorithmName) {
        this.updateProgress(`⚡ Executando ${algorithmName} passo a passo`);
    }

    completeAlgorithm(algorithmName) {
        this.completedAlgorithms.add(algorithmName);
        const count = this.completedAlgorithms.size;
        this.updateProgress(`✅ Parabens! ${algorithmName} concluido (${count}/7 algoritmos aprendidos)`);
        this.saveProgress();
        
        setTimeout(() => {
            this.updateProgress(`🎉 Proximo desafio: escolha outro algoritmo para aprender!`);
        }, 3000);
    }

    onStepUpdate(stepInfo) {
        if (stepInfo && stepInfo.description) {
            this.updateProgress(`🔍 ${stepInfo.description}`);
        }
    }

    saveProgress() {
        try {
            localStorage.setItem('simpleProgress', JSON.stringify({
                completed: [...this.completedAlgorithms]
            }));
        } catch (e) {
            // Silent fail
        }
    }

    loadProgress() {
        try {
            const saved = localStorage.getItem('simpleProgress');
            if (saved) {
                const data = JSON.parse(saved);
                this.completedAlgorithms = new Set(data.completed || []);
            }
        } catch (e) {
            // Silent fail
        }
    }

    reset() {
        this.completedAlgorithms.clear();
        this.currentAlgorithm = null;
        this.updateProgress('Selecione um algoritmo para comecar');
        localStorage.removeItem('simpleProgress');
    }

    // Compatibility methods for existing code
    showNotification(message, type = 'info') {
        this.updateProgress(message);
    }

    getStats() {
        return {
            algorithmsCompleted: this.completedAlgorithms.size,
            totalAlgorithms: 7,
            currentProgress: this.currentProgress
        };
    }

    onSortingComplete(data) {
        if (data && data.algorithm) {
            this.completeAlgorithm(data.algorithm);
        }
    }

    trackTabView() { /* Silent compatibility */ }
    trackExplanationRead() { /* Silent compatibility */ }
    updateDailyChallengeProgress() { /* Silent compatibility */ }
    trackComplexityAnalysis() { /* Silent compatibility */ }
    trackQuizCompletion() { /* Silent compatibility */ }
    unlockAchievement() { /* Silent compatibility */ }
    trackCodeCopy() { /* Silent compatibility */ }
}

// Global instance
window.progressController = new SimpleProgressController();
window.gamificationController = window.progressController; // Compatibility alias