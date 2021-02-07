import MIDIDevice from "./MIDIDevice";
function main() {
  new MIDIDevice(); 
  const audioCtx = new AudioContext();
  console.log('AudioContext state: ' + audioCtx.state);
}

main();
