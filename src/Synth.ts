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
    this.oscillatorNode.connect(this.gainNode);
    this.gainNode.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
    this.gainNode.gain.setTargetAtTime(.0625, this.audioCtx.currentTime, 0.025);    //this.oscillatorNode.stop();
    this.gainNode.connect(this.audioCtx.destination);
    this.oscillatorNode.start()
  }

  terminatetOscillator() {
    console.log('Terminating');
    this.gainNode.gain.setTargetAtTime(0, this.audioCtx.currentTime, 0.015);    //this.oscillatorNode.stop();
  }

  midiToFrequency(midiValue: number) {
    return (2 ** ((midiValue - 69) / 12)) * 440;
  }
}