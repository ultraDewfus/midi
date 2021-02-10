import MIDIDevice from "./MIDIDevice";
function main() {
  let audioCtx: AudioContext;
  const activateWebAudio = document.querySelector('#activateWebAudio');
  if(activateWebAudio) {
    activateWebAudio.addEventListener('click', () => {
      audioCtx = new AudioContext();
      console.log('AudioContext state: ' + audioCtx.state);
      new MIDIDevice(audioCtx); 
    });
  }
}

main();
