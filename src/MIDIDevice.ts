export default class MIDIDevice {
  inputs: WebMidi.MIDIInput[];
  outputs: WebMidi.MIDIOutput[];

  constructor() {
    this.inputs = [];
    this.outputs = [];
    this.initMIDIDevice();
  }

  initMIDIDevice() {
    return new Promise((resolve, reject) => {
      if(navigator.requestMIDIAccess())
        resolve( navigator.requestMIDIAccess().then((access) => {
          for (let input of access.inputs.values()) {
            this.initMIDIInput(input);
          }

          for(let output of access.outputs.values()) {
            this.outputs.push(output);
          }

          access.addEventListener('statechange', ({ port }) => {
            const connectionStatus = document.querySelector('#connectionStatus');
            if (port.state === 'connected') {
              if (connectionStatus)
                connectionStatus.textContent = "Connection Status: Connected";
              if(port.type === 'input') {
                for(let input of access.inputs.values()) {
                  if(!this.inputs.includes(input)) {
                    if(input.id === port.id) {
                      this.initMIDIInput(input);
                    }
                  }
                }
              } else {
                for(let output of access.outputs.values()) {
                  if(!this.outputs.includes(output)) {
                    if(output.id === port.id)
                      this.outputs.push(output)
                    }
                }   
              }
            } else {
              if(connectionStatus)
                connectionStatus.textContent = "Connection Status: Disconnected";
              if(port.type === 'input') {
                let index = this.inputs.findIndex((input) => 
                  input && input.id === port.id
                );
                this.inputs.splice(index, 1);
              }
              else {
                const index = this.outputs.findIndex((output) => 
                  output && output.id === port.id
                );
                this.outputs.splice(index, 1);
              }
            }
          });
        }))
      else
        reject((err: string) => {
          console.log("MIDIAccess not supported: " + err);
        });
    });
  }

  midiMessageEventHandler(input: WebMidi.MIDIInput) {
    input.addEventListener('midimessage', ({ data }) => {
      const midiData = document.querySelector('#midiData');
      if(midiData) {
        if(data[2] > 0) {
          const keyDown = document.createElement('li');
          keyDown.setAttribute('data-number', data[1].toString());
          keyDown.textContent = data.toString();
          midiData.appendChild(keyDown);
        } else {
          document.querySelectorAll(`li[data-number='${data[1].toString()}']`).forEach((node) => {
            midiData.removeChild(node);
          })
        }
      }
    })
  }

  initMIDIInput(input: WebMidi.MIDIInput) {
    this.midiMessageEventHandler(input);
    this.inputs.push(input);
  }
}