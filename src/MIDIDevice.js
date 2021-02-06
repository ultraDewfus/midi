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
                        const connectionStatus = document.querySelector('#connectionStatus');
                        if (port.state === 'connected') {
                            if (connectionStatus)
                                connectionStatus.textContent = "Connection Status: Connected";
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
                            if (connectionStatus)
                                connectionStatus.textContent = "Connection Status: Disconnected";
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
            const midiData = document.querySelector('#midiData');
            if (midiData) {
                if (data[2] > 0) {
                    const keyDown = document.createElement('li');
                    keyDown.setAttribute('data-number', data[1].toString());
                    keyDown.textContent = this.midiToNoteName(data[1]) + ": " + this.midiToFrequency(data[1]);
                    midiData.appendChild(keyDown);
                }
                else {
                    document.querySelectorAll(`li[data-number='${data[1].toString()}']`).forEach((node) => {
                        midiData.removeChild(node);
                    });
                }
            }
        });
    }
    initMIDIInput(input) {
        this.midiMessageEventHandler(input);
        this.inputs.push(input);
    }
    midiToFrequency(midiValue) {
        return (2 ** ((midiValue - 69) / 12)) * 440;
    }
    midiToNoteName(noteNumber) {
        const noteMap = [
            'C-1',
            'C#-1/Db-1',
            'D-1',
            'D#-1/Eb-1',
            'E-1',
            'F-1',
            'F#-1/Gb-1',
            'G-1',
            'G#-1/Ab-1',
            'A-1',
            'A#-1/Bb-1',
            'B-1',
            'C0',
            'C#0/Db0',
            'D0',
            'D#0/Eb0',
            'E0',
            'F0',
            'F#0/Gb0',
            'G0',
            'G#0/Ab0',
            'A0',
            'A#0/Bb0',
            'B0',
            'C1',
            'C#1/Db1',
            'D1',
            'D#1/Eb1',
            'E1',
            'F1',
            'F#1/Gb1',
            'G1',
            'G#1/Ab1',
            'A1',
            'A#1/Bb1',
            'B1',
            'C2',
            'C#2/Db2',
            'D2',
            'D#2/Eb2',
            'E2',
            'F2',
            'F#2/Gb2',
            'G2',
            'G#2/Ab2',
            'A2',
            'A#2/Bb2',
            'B2',
            'C3',
            'C#3/Db3',
            'D3',
            'D#3/Eb3',
            'E3',
            'F3',
            'F#3/Gb3',
            'G3',
            'G#3/Ab3',
            'A3',
            'A#3/Bb3',
            'B3',
            'C4',
            'C#4/Db4',
            'D4',
            'D#4/Eb4',
            'E4',
            'F4',
            'F#4/Gb4',
            'G4',
            'G#4/Ab4',
            'A4',
            'A#4/Bb4',
            'B4',
            'C5',
            'C#5/Db5',
            'D5',
            'D#5/Eb5',
            'E5',
            'F5',
            'F#5/Gb5',
            'G5',
            'G#5/Ab5',
            'A5',
            'A#5/Bb5',
            'B5',
            'C6',
            'C#6/Db6',
            'D6',
            'D#6/Eb6',
            'E6',
            'F6',
            'F#6/Gb6',
            'G6',
            'G#6/Ab6',
            'A6',
            'A#6/Bb6',
            'B6',
            'C7',
            'C#7/Db7',
            'D7',
            'D#7/Eb7',
            'E7',
            'F7',
            'F#7/Gb7',
            'G7',
            'G#7/Ab7',
            'A7',
            'A#7/Bb7',
            'B7',
            'C8',
            'C#8/Db8',
            'D8',
            'D#8/Eb8',
            'E8',
            'F8',
            'F#8/Gb8',
            'G8',
            'G#8/Ab8',
            'A8',
            'A#8/Bb8',
            'B8',
            'C9',
            'C#9/Db9',
            'D9',
            'D#9/Eb9',
            'E9',
            'F9',
            'F#9/Gb9',
            'G9'
        ];
        return noteMap[noteNumber];
    }
}
exports.default = MIDIDevice;
