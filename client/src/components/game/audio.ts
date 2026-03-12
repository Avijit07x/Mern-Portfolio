class GameAudio {
	private context: AudioContext | null = null;

	private init() {
		if (!this.context) {
			this.context = new (
				window.AudioContext || (window as any).webkitAudioContext
			)();
		}
		if (this.context.state === "suspended") {
			this.context.resume();
		}
		return this.context;
	}

	playTrigger() {
		const ctx = this.init();
		const now = ctx.currentTime;

		const osc1 = ctx.createOscillator();
		const gain1 = ctx.createGain();
		osc1.type = "sine";
		osc1.frequency.setValueAtTime(40, now);
		osc1.frequency.exponentialRampToValueAtTime(600, now + 0.4);
		gain1.gain.setValueAtTime(0, now);
		gain1.gain.linearRampToValueAtTime(0.1, now + 0.1);
		gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
		osc1.connect(gain1);
		gain1.connect(ctx.destination);
		osc1.start(now);
		osc1.stop(now + 0.4);

		const osc2 = ctx.createOscillator();
		const gain2 = ctx.createGain();
		osc2.type = "square";
		osc2.frequency.setValueAtTime(880, now + 0.35);
		osc2.frequency.exponentialRampToValueAtTime(1760, now + 0.45);
		gain2.gain.setValueAtTime(0, now + 0.35);
		gain2.gain.linearRampToValueAtTime(0.05, now + 0.38);
		gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
		osc2.connect(gain2);
		gain2.connect(ctx.destination);
		osc2.start(now + 0.35);
		osc2.stop(now + 0.5);
	}

	playKill() {
		const ctx = this.init();
		const now = ctx.currentTime;

		const osc = ctx.createOscillator();
		const gain = ctx.createGain();
		osc.type = "sawtooth";
		osc.frequency.setValueAtTime(900, now);
		osc.frequency.exponentialRampToValueAtTime(300, now + 0.07);
		gain.gain.setValueAtTime(0.08, now);
		gain.gain.exponentialRampToValueAtTime(0.01, now + 0.07);
		osc.connect(gain);
		gain.connect(ctx.destination);
		osc.start(now);
		osc.stop(now + 0.07);

		const osc2 = ctx.createOscillator();
		const gain2 = ctx.createGain();
		osc2.type = "triangle";
		osc2.frequency.setValueAtTime(150, now);
		osc2.frequency.exponentialRampToValueAtTime(40, now + 0.1);
		gain2.gain.setValueAtTime(0.12, now);
		gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
		osc2.connect(gain2);
		gain2.connect(ctx.destination);
		osc2.start(now);
		osc2.stop(now + 0.1);
	}
}

export const gameAudio = new GameAudio();
