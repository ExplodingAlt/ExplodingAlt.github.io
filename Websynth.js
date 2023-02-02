// Websynth 2.0

var Keyboard = document.getElementById("Keyboard")
var ctx = Keyboard.getContext("2d");
ctx.beginPath();
const HalfStepChart = { // The distance in half steps of each key from A
		"C": 0,
		"C#": 1,
		"D": 2,
		"D#": 3,
		"E": 4,
		"F": 5,
		"F#": 6,
		"G": 7,
		"G#": 8,
		"A": 9,
		"A#": 10,
		"B": 11,
};
const KeyboardKeys = "1!2@34$5%6^78*9(0qQwWeErtTyYuiIoOpPasSdDfFgGhHjJklLzZxcCvVbBnm" // So I can map the keyboard keys to the synth keys

function roundToDigits(num, digits) {
		var mult = 10 ** digits;
		return Math.round((num + Number.EPSILON) * mult) / mult;
}

function getNoteFrequency(note, octave) { // Converts note in specified octave to frequency
		var halfSteps = HalfStepChart[note];
		halfSteps += (octave - 4) * 12;
		return roundToDigits(440 * (2 ** (1 / 12)) ** halfSteps, 3);
}


function draw(){ // Draws graphics, keyboard size is 1200 by 350
	// ---- KEYBOARD ----
	ctx.fillStyle = "Grey"
	ctx.fillRect(0,0,Keyboard.width,Keyboard.height) // Draws keyboard background
	// ---- KEYS ----
	for(var Octave = 0;Octave <= 4; Octave+=1){ // Iterates thru Octaves
		for(var i=1;i<=8; i++){ // Drawing the black and white keys in different loops to make the placement more simple.
			ctx.fillStyle = "White"
			ctx.fillRect(i*35,225,25,125)
		}
		for(Key in HalfStepChart){
			ctx.fillStyle = "Black" 
			if(Key.search("#")!=-1){
				ctx.fillRect(17*HalfStepChart[Key]+25+Octave*234,175,25,125)
			}
		}
	}
}


draw()