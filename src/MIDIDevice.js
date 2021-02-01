"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MIDIDevice {
    constructor() {
        this.inputs = [];
        this.outputs = [];
        this.initMIDIDevice();
    }
    initMIDIDevice() {
        return new Promise((resolve, reject) => {
            if (navigator.requestMIDIAccess())
                resolve(navigator.requestMIDIAccess().then((access) => {
                    for (let input of access.inputs.values()) {
                        this.initMIDIInput(input);
                    }
                    for (let output of access.outputs.values()) {
                        this.outputs.push(output);
                    }
                    access.addEventListener('statechange', ({ port }) => {
                        if (port.state === 'connected') {
                            if (port.type === 'input') {
                                for (let input of access.inputs.values()) {
                                    if (!this.inputs.includes(input)) {
                                        if (input.id === port.id) {
                                            this.initMIDIInput(input);
                                        }
                                    }
                                }
                            }
                            else {
                                for (let output of access.outputs.values()) {
                                    if (!this.outputs.includes(output)) {
                                        if (output.id === port.id)
                                            this.outputs.push(output);
                                    }
                                }
                            }
                        }
                        else {
                            if (port.type === 'input') {
                                let index = this.inputs.findIndex((input) => input && input.id === port.id);
                                this.inputs.splice(index, 1);
                            }
                            else {
                                const index = this.outputs.findIndex((output) => output && output.id === port.id);
                                this.outputs.splice(index, 1);
                            }
                        }
                    });
                }));
            else
                reject((err) => {
                    console.log("MIDIAccess not supported: " + err);
                });
        });
    }
    midiMessageEventHandler(input) {
        input.addEventListener('midimessage', ({ data }) => {
            console.log(data);
        });
    }
    initMIDIInput(input) {
        this.midiMessageEventHandler(input);
        this.inputs.push(input);
    }
}
exports.default = MIDIDevice;
