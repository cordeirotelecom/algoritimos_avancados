// ===== SOUND EFFECTS SYSTEM =====

class SoundEffectsController {
    constructor() {
        this.audioContext = null;
        this.enabled = true;
        this.volume = 0.3;
        this.initializeAudio();
    }

    async initializeAudio() {
        try {
            // Initialize Web Audio API
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Resume audio context on user interaction (required by browsers)
            document.addEventListener('click', () => {
                if (this.audioContext && this.audioContext.state === 'suspended') {
                    this.audioContext.resume();
                }
            }, { once: true });
            
        } catch (error) {
            console.warn('Web Audio API not supported:', error);
            this.enabled = false;
        }
    }

    // Generate different types of sounds using oscillators
    playSound(type, frequency = 440, duration = 0.1) {
        if (!this.enabled || !this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        // Configure sound based on type
        switch (type) {
            case 'compare':
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
                gainNode.gain.setValueAtTime(this.volume * 0.3, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
                break;

            case 'swap':
                oscillator.type = 'square';
                oscillator.frequency.setValueAtTime(frequency * 1.5, this.audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.8, this.audioContext.currentTime + duration);
                gainNode.gain.setValueAtTime(this.volume * 0.5, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
                break;

            case 'sorted':
                oscillator.type = 'triangle';
                oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(frequency * 2, this.audioContext.currentTime + duration);
                gainNode.gain.setValueAtTime(this.volume * 0.4, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
                break;

            case 'complete':
                // Play a triumphant chord progression
                this.playChord([523.25, 659.25, 783.99], duration * 3); // C-E-G major chord
                return;

            case 'error':
                oscillator.type = 'sawtooth';
                oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
                gainNode.gain.setValueAtTime(this.volume * 0.6, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration * 2);
                break;

            case 'click':
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
                gainNode.gain.setValueAtTime(this.volume * 0.2, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);
                duration = 0.05;
                break;

            default:
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
                gainNode.gain.setValueAtTime(this.volume * 0.3, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
        }

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }

    playChord(frequencies, duration = 0.5) {
        if (!this.enabled || !this.audioContext) return;

        frequencies.forEach((freq, index) => {
            setTimeout(() => {
                this.playSound('sorted', freq, duration);
            }, index * 100);
        });
    }

    // Play sound based on array value for more musical experience
    playValueSound(value, maxValue, type = 'compare') {
        if (!this.enabled) return;

        // Map array value to frequency (higher values = higher pitch)
        const minFreq = 200;
        const maxFreq = 800;
        const frequency = minFreq + (value / maxValue) * (maxFreq - minFreq);
        
        this.playSound(type, frequency);
    }

    // Play completion fanfare
    playCompletionFanfare() {
        if (!this.enabled) return;

        const notes = [
            { freq: 523.25, delay: 0 },     // C
            { freq: 659.25, delay: 200 },   // E
            { freq: 783.99, delay: 400 },   // G
            { freq: 1046.50, delay: 600 }   // C (octave)
        ];

        notes.forEach(note => {
            setTimeout(() => {
                this.playSound('complete', note.freq, 0.3);
            }, note.delay);
        });
    }

    // Achievement unlock sound
    playAchievementSound() {
        if (!this.enabled) return;

        // Play ascending arpeggio
        const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C-E-G-C-E
        notes.forEach((freq, index) => {
            setTimeout(() => {
                this.playSound('sorted', freq, 0.2);
            }, index * 100);
        });
    }

    // Level up sound
    playLevelUpSound() {
        if (!this.enabled) return;

        // Play power-up sound
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(220, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(880, this.audioContext.currentTime + 0.5);
        
        gainNode.gain.setValueAtTime(this.volume * 0.4, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.5);
    }

    // Button click sound
    playButtonSound() {
        this.playSound('click');
    }

    // Enable/disable sounds
    setEnabled(enabled) {
        this.enabled = enabled;
    }

    // Set volume (0.0 to 1.0)
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
    }

    // Get current state
    isEnabled() {
        return this.enabled;
    }

    getVolume() {
        return this.volume;
    }
}

// Export for use in other modules
window.SoundEffectsController = SoundEffectsController;
