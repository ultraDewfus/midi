# Project
- A site that can connect to a USB MIDI device.
- The goal is to expand this into a synthesizer to use with any MIDI device.

## Current Functionality
- The site utilizes the Web MIDI API to connect to a MIDI device that is plugged into a USB port of a PC. A user can press keys or pads on a MIDI device and generate the appropriate pitch produced by a sine wave. The app currently supports different pitches played together, though they don't blend well. 

## Compatible Browsers
- Chrome
- Opera
- Edge

## Instructions
1. Clone the repository
2. `cd midi`
3. `npm install`
4. `npm run build`
5. `npm run start`

## Sources
- A Web MIDI API tutorial by Jake Albaugh. [gropramming: 001 - Web MIDI API](https://www.youtube.com/watch?v=556e3cLWusc) 
