/* ===========================================
   Audio System - Simple Web Audio API based sounds
   Provides click sounds, success sounds, and hover effects
   =========================================== */

class AudioSystem {
    constructor() {
        this.audioContext = null;
        this.enabled = true;
        this.init();
    }

    init() {
        try {
            // Create audio context on first user interaction
            document.addEventListener('click', this.initAudioContext.bind(this), { once: true });
            document.addEventListener('touchstart', this.initAudioContext.bind(this), { once: true });
        } catch (error) {
            console.warn('🔇 Audio not available:', error);
            this.enabled = false;
        }
    }

    initAudioContext() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            console.log('🔊 Audio system initialized');
        }
    }

    // Generate a simple tone
    playTone(frequency, duration, type = 'sine', volume = 0.3) {
        if (!this.enabled || !this.audioContext) return;

        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.frequency.value = frequency;
            oscillator.type = type;

            gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
        } catch (error) {
            console.warn('🔇 Could not play tone:', error);
        }
    }

    // Play click sound
    playClick() {
        this.playTone(800, 0.1, 'square', 0.2);
    }

    // Play hover sound
    playHover() {
        this.playTone(1000, 0.05, 'sine', 0.1);
    }

    // Play success sound
    playSuccess() {
        // Success chord: C - E - G
        setTimeout(() => this.playTone(523, 0.3, 'sine', 0.15), 0);    // C
        setTimeout(() => this.playTone(659, 0.3, 'sine', 0.15), 100);  // E
        setTimeout(() => this.playTone(784, 0.4, 'sine', 0.15), 200);  // G
    }

    // Play unlock sound
    playUnlock() {
        // Rising notes
        setTimeout(() => this.playTone(440, 0.15, 'sine', 0.2), 0);   // A
        setTimeout(() => this.playTone(554, 0.15, 'sine', 0.2), 150); // C#
        setTimeout(() => this.playTone(659, 0.2, 'sine', 0.2), 300);  // E
    }

    // Play level complete fanfare
    playLevelComplete() {
        // Victory fanfare
        const notes = [523, 659, 784, 1047]; // C, E, G, C (octave)
        notes.forEach((note, index) => {
            setTimeout(() => this.playTone(note, 0.3, 'triangle', 0.2), index * 150);
        });
    }

    // Enable/disable audio
    toggle() {
        this.enabled = !this.enabled;
        console.log(this.enabled ? '🔊 Audio enabled' : '🔇 Audio disabled');
        return this.enabled;
    }

    // Check if audio is enabled
    isEnabled() {
        return this.enabled;
    }
}

// Create global audio system instance
const audioSystem = new AudioSystem();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = audioSystem;
}