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

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass MIDIDevice {\r\n    constructor() {\r\n        this.inputs = [];\r\n        this.outputs = [];\r\n        this.initMIDIDevice();\r\n    }\r\n    initMIDIDevice() {\r\n        return new Promise((resolve, reject) => {\r\n            if (navigator.requestMIDIAccess())\r\n                resolve(navigator.requestMIDIAccess().then((access) => {\r\n                    for (let input of access.inputs.values()) {\r\n                        this.initMIDIInput(input);\r\n                    }\r\n                    for (let output of access.outputs.values()) {\r\n                        this.outputs.push(output);\r\n                    }\r\n                    access.addEventListener('statechange', ({ port }) => {\r\n                        if (port.state === 'connected') {\r\n                            if (port.type === 'input') {\r\n                                for (let input of access.inputs.values()) {\r\n                                    if (!this.inputs.includes(input)) {\r\n                                        if (input.id === port.id) {\r\n                                            this.initMIDIInput(input);\r\n                                        }\r\n                                    }\r\n                                }\r\n                            }\r\n                            else {\r\n                                for (let output of access.outputs.values()) {\r\n                                    if (!this.outputs.includes(output)) {\r\n                                        if (output.id === port.id)\r\n                                            this.outputs.push(output);\r\n                                    }\r\n                                }\r\n                            }\r\n                        }\r\n                        else {\r\n                            if (port.type === 'input') {\r\n                                let index = this.inputs.findIndex((input) => input && input.id === port.id);\r\n                                this.inputs.splice(index, 1);\r\n                            }\r\n                            else {\r\n                                const index = this.outputs.findIndex((output) => output && output.id === port.id);\r\n                                this.outputs.splice(index, 1);\r\n                            }\r\n                        }\r\n                    });\r\n                }));\r\n            else\r\n                reject((err) => {\r\n                    console.log(\"MIDIAccess not supported: \" + err);\r\n                });\r\n        });\r\n    }\r\n    midiMessageEventHandler(input) {\r\n        input.addEventListener('midimessage', ({ data }) => {\r\n            console.log(data);\r\n        });\r\n    }\r\n    initMIDIInput(input) {\r\n        this.midiMessageEventHandler(input);\r\n        this.inputs.push(input);\r\n    }\r\n}\r\nexports.default = MIDIDevice;\r\n\n\n//# sourceURL=webpack://project10/./src/MIDIDevice.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst MIDIDevice_1 = __importDefault(__webpack_require__(/*! ./MIDIDevice */ \"./src/MIDIDevice.js\"));\r\nfunction main() {\r\n    new MIDIDevice_1.default();\r\n}\r\nmain();\r\n\n\n//# sourceURL=webpack://project10/./src/index.js?");

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