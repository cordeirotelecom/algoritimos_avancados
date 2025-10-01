// ===== SOUND EFFECTS SYSTEM =====

class SoundEffectsController {
    constructor() {
        this.audioContext = null;
        this.enabled = this.loadSoundSettings();
        this.volume = this.loadVolumeSettings();
        this.masterVolume = 1.0;
        this.soundQueue = [];
        this.isPlaying = false;
        this.presets = this.initializePresets();
        this.initializeAudio();
    }

    async initializeAudio() {
        try {
            // Check for Web Audio API support
            if (!window.AudioContext && !window.webkitAudioContext) {
                throw new Error('Web Audio API não suportado');
            }
            
            // Initialize Web Audio API
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create master gain node for global volume control
            this.masterGainNode = this.audioContext.createGain();
            this.masterGainNode.connect(this.audioContext.destination);
            this.masterGainNode.gain.setValueAtTime(this.masterVolume, this.audioContext.currentTime);
            
            // Resume audio context on user interaction (required by browsers)
            const resumeAudio = () => {
                if (this.audioContext && this.audioContext.state === 'suspended') {
                    this.audioContext.resume().then(() => {
                        console.log('🔊 Audio context resumed');
                    });
                }
            };
            
            document.addEventListener('click', resumeAudio, { once: true });
            document.addEventListener('keydown', resumeAudio, { once: true });
            
            console.log('🎵 Sound system initialized successfully');
            
        } catch (error) {
            console.warn('⚠️ Web Audio API not supported:', error.message);
            this.enabled = false;
        }
    }

    // Load sound settings from localStorage
    loadSoundSettings() {
        const saved = localStorage.getItem('sortingApp_soundEnabled');
        return saved !== null ? JSON.parse(saved) : true;
    }
    
    // Load volume settings from localStorage
    loadVolumeSettings() {
        const saved = localStorage.getItem('sortingApp_volume');
        return saved !== null ? parseFloat(saved) : 0.3;
    }
    
    // Save sound settings to localStorage
    saveSoundSettings() {
        localStorage.setItem('sortingApp_soundEnabled', JSON.stringify(this.enabled));
        localStorage.setItem('sortingApp_volume', this.volume.toString());
    }
    
    // Initialize sound presets for different algorithms
    initializePresets() {
        return {
            bubble: { baseFreq: 300, range: 200, type: 'sine' },
            selection: { baseFreq: 400, range: 300, type: 'triangle' },
            insertion: { baseFreq: 350, range: 250, type: 'sine' },
            quick: { baseFreq: 500, range: 400, type: 'square' },
            merge: { baseFreq: 450, range: 350, type: 'sawtooth' },
            heap: { baseFreq: 600, range: 500, type: 'triangle' },
            radix: { baseFreq: 250, range: 150, type: 'sine' }
        };
    }
    
    // Generate different types of sounds using oscillators
    playSound(type, frequency = 440, duration = 0.1, algorithm = 'bubble') {
        if (!this.enabled || !this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        // Get algorithm-specific preset
        const preset = this.presets[algorithm] || this.presets.bubble;
        
        // Configure sound based on type
        switch (type) {
            case 'compare':
                oscillator.type = preset.type;
                oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
                gainNode.gain.setValueAtTime(this.volume * 0.2, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration * 0.8);
                break;

            case 'swap':
                oscillator.type = 'square';
                oscillator.frequency.setValueAtTime(frequency * 1.3, this.audioContext.currentTime);
                gainNode.gain.setValueAtTime(this.volume * 0.4, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
                break;
                
            case 'place':
                oscillator.type = 'triangle';
                oscillator.frequency.setValueAtTime(frequency * 0.8, this.audioContext.currentTime);
                gainNode.gain.setValueAtTime(this.volume * 0.3, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration * 1.2);
                break;
                
            case 'pivot':
                oscillator.type = 'sawtooth';
                oscillator.frequency.setValueAtTime(frequency * 1.8, this.audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.9, this.audioContext.currentTime + duration);
                gainNode.gain.setValueAtTime(this.volume * 0.5, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
                break;
                
            case 'merge':
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
                oscillator.frequency.linearRampToValueAtTime(frequency * 1.2, this.audioContext.currentTime + duration/2);
                oscillator.frequency.linearRampToValueAtTime(frequency, this.audioContext.currentTime + duration);
                gainNode.gain.setValueAtTime(this.volume * 0.35, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
                break;
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
                
            case 'complete':
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(frequency * 1.1, this.audioContext.currentTime + duration/2);
                oscillator.frequency.exponentialRampToValueAtTime(frequency, this.audioContext.currentTime + duration);
                gainNode.gain.setValueAtTime(this.volume * 0.6, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
                break;
                
            case 'error':
                oscillator.type = 'square';
                oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.7, this.audioContext.currentTime + duration);
                gainNode.gain.setValueAtTime(this.volume * 0.4, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
                break;

            default:
                oscillator.type = preset.type;
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
