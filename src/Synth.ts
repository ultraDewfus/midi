export default class Synth {
  audioCtx: AudioContext;
  oscillatorNode: OscillatorNode;
  gainNode: GainNode;
  constructor(audioCtx: AudioContext) {
    this.audioCtx = audioCtx;
    this.oscillatorNode = audioCtx.createOscillator();
    this.gainNode = audioCtx.createGain();
  }

  initOscillator(midiValue: number) {
    this.oscillatorNode.frequency.value = this.midiToFrequency(midiValue);
    this.gainNode.gain.value = 0.0625;
    this.oscillatorNode.connect(this.gainNode);
    this.gainNode.connect(this.audioCtx.destination);
    this.oscillatorNode.start()
  }

  terminatetOscillator() {
    this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, this.audioCtx.currentTime); 
    this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.03);
    this.oscillatorNode.stop();
  }

  midiToFrequency(midiValue: number) {
    return (2 ** ((midiValue - 69) / 12)) * 440;
  }
}