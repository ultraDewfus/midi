import MIDIDevice from "./MIDIDevice";
function main() {
  new MIDIDevice(); 
  const activateWebAudio = document.querySelector('#activateWebAudio');
  if(activateWebAudio) {
    activateWebAudio.addEventListener('click', () => {
      const audioCtx = new AudioContext();
      console.log('AudioContext state: ' + audioCtx.state);
    });
  }
}

main();
