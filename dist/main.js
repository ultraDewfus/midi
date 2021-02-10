/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/MIDIDevice.js":
/*!***************************!*\
  !*** ./src/MIDIDevice.js ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass MIDIDevice {\r\n    constructor(audioCtx) {\r\n        this.inputs = [];\r\n        this.outputs = [];\r\n        this.audioCtx = audioCtx;\r\n        this.oscillators = [];\r\n        this.initMIDIDevice();\r\n    }\r\n    initMIDIDevice() {\r\n        return new Promise((resolve, reject) => {\r\n            if (navigator.requestMIDIAccess())\r\n                resolve(navigator.requestMIDIAccess().then((access) => {\r\n                    for (let input of access.inputs.values()) {\r\n                        this.initMIDIInput(input);\r\n                    }\r\n                    for (let output of access.outputs.values()) {\r\n                        this.outputs.push(output);\r\n                    }\r\n                    access.addEventListener('statechange', ({ port }) => {\r\n                        const connectionStatus = document.querySelector('#connectionStatus');\r\n                        if (port.state === 'connected') {\r\n                            if (connectionStatus)\r\n                                connectionStatus.textContent = \"Connection Status: Connected\";\r\n                            if (port.type === 'input') {\r\n                                for (let input of access.inputs.values()) {\r\n                                    if (!this.inputs.includes(input)) {\r\n                                        if (input.id === port.id) {\r\n                                            this.initMIDIInput(input);\r\n                                        }\r\n                                    }\r\n                                }\r\n                            }\r\n                            else {\r\n                                for (let output of access.outputs.values()) {\r\n                                    if (!this.outputs.includes(output)) {\r\n                                        if (output.id === port.id)\r\n                                            this.outputs.push(output);\r\n                                    }\r\n                                }\r\n                            }\r\n                        }\r\n                        else {\r\n                            if (connectionStatus)\r\n                                connectionStatus.textContent = \"Connection Status: Disconnected\";\r\n                            if (port.type === 'input') {\r\n                                let index = this.inputs.findIndex((input) => input && input.id === port.id);\r\n                                this.inputs.splice(index, 1);\r\n                            }\r\n                            else {\r\n                                const index = this.outputs.findIndex((output) => output && output.id === port.id);\r\n                                this.outputs.splice(index, 1);\r\n                            }\r\n                        }\r\n                    });\r\n                }));\r\n            else\r\n                reject((err) => {\r\n                    console.log(\"MIDIAccess not supported: \" + err);\r\n                });\r\n        });\r\n    }\r\n    midiMessageEventHandler(input) {\r\n        input.addEventListener('midimessage', ({ data }) => {\r\n            const midiData = document.querySelector('#midiData');\r\n            if (midiData) {\r\n                if (data[2] > 0) {\r\n                    const keyDown = document.createElement('li');\r\n                    keyDown.setAttribute('data-number', data[1].toString());\r\n                    keyDown.textContent = this.midiToNoteName(data[1]) + \": \" + this.midiToFrequency(data[1]);\r\n                    midiData.appendChild(keyDown);\r\n                    this.initOscillator(data[1]);\r\n                }\r\n                else {\r\n                    document.querySelectorAll(`li[data-number='${data[1].toString()}']`).forEach((node) => {\r\n                        midiData.removeChild(node);\r\n                    });\r\n                    this.terminateOscillator(data[1]);\r\n                }\r\n            }\r\n        });\r\n    }\r\n    initMIDIInput(input) {\r\n        this.midiMessageEventHandler(input);\r\n        this.inputs.push(input);\r\n    }\r\n    initOscillator(midiValue) {\r\n        let osc = this.audioCtx.createOscillator();\r\n        osc.frequency.value = this.midiToFrequency(midiValue);\r\n        osc.connect(this.audioCtx.destination);\r\n        osc.start();\r\n        this.oscillators[midiValue] = osc;\r\n    }\r\n    terminateOscillator(midiValue) {\r\n        this.oscillators[midiValue].stop();\r\n        delete this.oscillators[midiValue];\r\n    }\r\n    midiToFrequency(midiValue) {\r\n        return (2 ** ((midiValue - 69) / 12)) * 440;\r\n    }\r\n    midiToNoteName(noteNumber) {\r\n        const noteMap = [\r\n            'C-1',\r\n            'C#-1/Db-1',\r\n            'D-1',\r\n            'D#-1/Eb-1',\r\n            'E-1',\r\n            'F-1',\r\n            'F#-1/Gb-1',\r\n            'G-1',\r\n            'G#-1/Ab-1',\r\n            'A-1',\r\n            'A#-1/Bb-1',\r\n            'B-1',\r\n            'C0',\r\n            'C#0/Db0',\r\n            'D0',\r\n            'D#0/Eb0',\r\n            'E0',\r\n            'F0',\r\n            'F#0/Gb0',\r\n            'G0',\r\n            'G#0/Ab0',\r\n            'A0',\r\n            'A#0/Bb0',\r\n            'B0',\r\n            'C1',\r\n            'C#1/Db1',\r\n            'D1',\r\n            'D#1/Eb1',\r\n            'E1',\r\n            'F1',\r\n            'F#1/Gb1',\r\n            'G1',\r\n            'G#1/Ab1',\r\n            'A1',\r\n            'A#1/Bb1',\r\n            'B1',\r\n            'C2',\r\n            'C#2/Db2',\r\n            'D2',\r\n            'D#2/Eb2',\r\n            'E2',\r\n            'F2',\r\n            'F#2/Gb2',\r\n            'G2',\r\n            'G#2/Ab2',\r\n            'A2',\r\n            'A#2/Bb2',\r\n            'B2',\r\n            'C3',\r\n            'C#3/Db3',\r\n            'D3',\r\n            'D#3/Eb3',\r\n            'E3',\r\n            'F3',\r\n            'F#3/Gb3',\r\n            'G3',\r\n            'G#3/Ab3',\r\n            'A3',\r\n            'A#3/Bb3',\r\n            'B3',\r\n            'C4',\r\n            'C#4/Db4',\r\n            'D4',\r\n            'D#4/Eb4',\r\n            'E4',\r\n            'F4',\r\n            'F#4/Gb4',\r\n            'G4',\r\n            'G#4/Ab4',\r\n            'A4',\r\n            'A#4/Bb4',\r\n            'B4',\r\n            'C5',\r\n            'C#5/Db5',\r\n            'D5',\r\n            'D#5/Eb5',\r\n            'E5',\r\n            'F5',\r\n            'F#5/Gb5',\r\n            'G5',\r\n            'G#5/Ab5',\r\n            'A5',\r\n            'A#5/Bb5',\r\n            'B5',\r\n            'C6',\r\n            'C#6/Db6',\r\n            'D6',\r\n            'D#6/Eb6',\r\n            'E6',\r\n            'F6',\r\n            'F#6/Gb6',\r\n            'G6',\r\n            'G#6/Ab6',\r\n            'A6',\r\n            'A#6/Bb6',\r\n            'B6',\r\n            'C7',\r\n            'C#7/Db7',\r\n            'D7',\r\n            'D#7/Eb7',\r\n            'E7',\r\n            'F7',\r\n            'F#7/Gb7',\r\n            'G7',\r\n            'G#7/Ab7',\r\n            'A7',\r\n            'A#7/Bb7',\r\n            'B7',\r\n            'C8',\r\n            'C#8/Db8',\r\n            'D8',\r\n            'D#8/Eb8',\r\n            'E8',\r\n            'F8',\r\n            'F#8/Gb8',\r\n            'G8',\r\n            'G#8/Ab8',\r\n            'A8',\r\n            'A#8/Bb8',\r\n            'B8',\r\n            'C9',\r\n            'C#9/Db9',\r\n            'D9',\r\n            'D#9/Eb9',\r\n            'E9',\r\n            'F9',\r\n            'F#9/Gb9',\r\n            'G9'\r\n        ];\r\n        return noteMap[noteNumber];\r\n    }\r\n}\r\nexports.default = MIDIDevice;\r\n\n\n//# sourceURL=webpack://project10/./src/MIDIDevice.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst MIDIDevice_1 = __importDefault(__webpack_require__(/*! ./MIDIDevice */ \"./src/MIDIDevice.js\"));\r\nfunction main() {\r\n    let audioCtx;\r\n    const activateWebAudio = document.querySelector('#activateWebAudio');\r\n    if (activateWebAudio) {\r\n        activateWebAudio.addEventListener('click', () => {\r\n            audioCtx = new AudioContext();\r\n            console.log('AudioContext state: ' + audioCtx.state);\r\n            new MIDIDevice_1.default(audioCtx);\r\n        });\r\n    }\r\n}\r\nmain();\r\n\n\n//# sourceURL=webpack://project10/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./src/index.js");
/******/ })()
;