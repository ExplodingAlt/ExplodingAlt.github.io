var Keyboard = document.getElementById("Keyboard")
var ctx = Keyboard.getContext("2d");
ctx.beginPath();
ctx.fillStyle = "Grey"
ctx.fillRect(0,0,Keyboard.width,Keyboard.height)
ctx.stroke();
var selectedType = "square"
function isInside(pos, rect){
	return pos.x > rect.X && pos.x < rect.X+rect.Width && pos.y < rect.Y+rect.Height && pos.y > rect.Y
}

var keys=[
	{"X" : 600, "Y" : 173, "Width" : 60, "Height" : 175, "Down" : false, "Freq" : 523.2511, "keyCode"  : 188},
	{"X" : 600, "Y" : 173, "Width" : 60, "Height" : 175, "Down" : false, "Freq" : 493.8833, "keyCode"  : 77},
	{"X" : 600, "Y" : 173, "Width" : 60, "Height" : 175, "Down" : false, "Freq" : 440.0000, "keyCode"  : 78},
	{"X" : 600, "Y" : 173, "Width" : 60, "Height" : 175, "Down" : false, "Freq" : 391.9954, "keyCode"  : 66},
	{"X" : 600, "Y" : 173, "Width" : 60, "Height" : 175, "Down" : false, "Freq" : 349.2282, "keyCode"  : 86},
	{"X" : 600, "Y" : 173, "Width" : 60, "Height" : 175, "Down" : false, "Freq" : 329.6276, "keyCode"  : 67},
	{"X" : 600, "Y" : 173, "Width" : 60, "Height" : 175, "Down" : false, "Freq" : 293.6648, "keyCode"  : 88},
	{"X" : 600, "Y" : 173, "Width" : 60, "Height" : 175, "Down" : false, "Freq" : 261.6256, "keyCode"  : 90}
]
for (var i = 0; i <= 7; i++) {
	keys[i]["X"] += i*-70
}
var blackKeys=[
	{ "X": 650, "Y": 173, "Width": 30, "Height" : 120, "Freq" : 554.3653,"keyCode"  : 76},
	
	{ "X": 510, "Y": 173, "Width": 30, "Height" : 120, "Freq" : 466.1638,"keyCode"  : 74},
	{ "X": 440, "Y": 173, "Width": 30, "Height" : 120, "Freq" : 415.3047,"keyCode"  : 72},
	{ "X": 370, "Y": 173, "Width": 30, "Height" : 120, "Freq" : 369.9944,"keyCode"  : 71},
	
	{ "X": 230, "Y": 173, "Width": 30, "Height" : 120, "Freq" : 311.1270,"keyCode"  : 68},
	{ "X": 160, "Y": 173, "Width": 30, "Height" : 120, "Freq" : 277.1826,"keyCode"  : 83}
]

var synthTypes=[
	{ "X": 250, "Y": 40, "Width": 50, "Height" : 50, "type":"square", "selected" : true},
	{ "X": 350, "Y": 40, "Width": 50, "Height" : 50, "type":"sawtooth", "selected" : false},
	{ "X": 450, "Y": 40, "Width": 50, "Height" : 50, "type":"triangle", "selected" : false},
	{ "X": 550, "Y": 40, "Width": 50, "Height" : 50, "type":"sine", "selected" : false}
]

var oscillatorNodes = [
	
]
var upButton = {"X" : 750, "Y" : 40, "Width" : 25, "Height" : 25}
var downButton = {"X" : 630, "Y" : 40, "Width" : 25, "Height" : 25}
var gain = 0.20

function drawBorder(xPos, yPos, width, height, thickness = 5){
  ctx.fillStyle="Black";
  ctx.fillRect(xPos - (thickness), yPos - (thickness), width + (thickness * 2), height + (thickness * 2));
}
function drawKeys(){
	ctx.fillStyle = "Grey"
	ctx.fillRect(0,0,Keyboard.width,Keyboard.height)
	for(key in keys){
		var theKey = keys[key]
		if(theKey["Down"] == true){
			ctx.fillStyle = "#dfdfdf"
		}else{
			ctx.fillStyle = "White"
		}
		ctx.fillRect(theKey["X"],theKey["Y"],theKey["Width"],theKey["Height"])
		ctx.stroke();
	}
	ctx.fillStyle = "Black"
	for(key in blackKeys){
		var theKey = blackKeys[key]
		ctx.fillRect(theKey["X"],theKey["Y"],theKey["Width"],theKey["Height"])
		ctx.stroke();
	}
	ctx.font = "italic 30px Titlefont"
	ctx.fillText("N4ME", 50,60);
	for(button in synthTypes){
		var theKey = synthTypes[button]
		drawBorder(theKey["X"],theKey["Y"],theKey["Width"],theKey["Height"])
		if(theKey["selected"] == true){
			ctx.fillStyle = "#b3b3b3"
		}else{
			ctx.fillStyle = "#cacaca"
		}
		ctx.fillRect(theKey["X"],theKey["Y"],theKey["Width"],theKey["Height"])
		ctx.font = "italic 10px Titlefont"
		ctx.fillStyle = "Black"
		ctx.fillText(theKey["type"],theKey["X"],theKey["Y"]+theKey["Height"]/2,theKey["Width"],theKey["Height"])
		ctx.stroke();
	}
	var upX = upButton["X"]
	var upY = upButton["Y"]
	var downX = downButton["X"]
	var downY = downButton["Y"]
	ctx.fillStyle = "Black"
	ctx.fillText("Gain: "+gain.toFixed(1), 675,75,50,50)
	ctx.font = "italic 20px Titlefont"
	drawBorder(upX,upY,upButton["Width"],upButton["Height"])
	ctx.fillStyle = "Grey"
	ctx.fillRect(upX,upY, upButton["Width"],upButton["Height"])
	ctx.fillStyle = "Black"
	ctx.fillText("+",upX+upButton["Width"]/4,upY+upButton["Height"]/1.5)
	drawBorder(downX,downY,downButton["Width"],downButton["Height"])
	ctx.fillStyle = "Grey"
	ctx.fillRect(downX,downY, downButton["Width"],downButton["Height"])
	ctx.fillStyle = "Black"
	ctx.fillText("-",downX+downButton["Width"]/4,downY+downButton["Height"]/1.5)
}


var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
function playNote(frequency) {
  for(osci in oscillatorNodes){
  	var oscil = oscillatorNodes[osci]
  	if(oscil["Freq"] == frequency){
  		return false
  	}
  }
  var oscillator = audioCtx.createOscillator();
 	var gainNode = audioCtx.createGain();
	gainNode.gain.value = gain;
	gainNode.connect(audioCtx.destination)
  oscillator.type = selectedType;
  oscillator.frequency.value = frequency; // value in hertz
  oscillator.connect(gainNode);
  oscillator.start()
  oscillatorNodes.push({"Node" : oscillator, "Started" : true, "Freq" : frequency})
}

function getMousePos(canvas, event) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top
	};
}

function stopNote(freq){
	for(oscillator in oscillatorNodes){
		var osci = oscillatorNodes[oscillator]
		if(osci["Started"] == true && osci["Freq"] == freq){
			osci["Node"].stop()
			oscillatorNodes.splice(oscillator, 1);
			return true
		}
	}
}

keys = keys.slice(0).reverse();
Keyboard.addEventListener('mousedown', function(evt) {
	var mousePos = getMousePos(Keyboard, evt);
	if(isInside(mousePos,upButton)){
		if(gain <= 1){
			gain += 0.1
		}
	}else if(isInside(mousePos,downButton)){
		if(gain>=0.1){
			gain -= 0.1
		}
	}
	for(key in blackKeys){
		if (isInside(mousePos,blackKeys[key])) {
		for(oscillator in oscillatorNodes){
			var osci = oscillatorNodes[oscillator]
			if(osci["Started"] == true){
				osci["Node"].stop()
			}
		}
			playNote(blackKeys[key]["Freq"])
			return true
		}
	}
	for(key in keys){
		if (isInside(mousePos,keys[key])) {
			for(oscillator in oscillatorNodes){
				var osci = oscillatorNodes[oscillator]
				if(osci["Started"] == true){
					osci["Node"].stop()
				}
			}
			playNote(keys[key]["Freq"])
			keys[key]["Down"] = true
			drawKeys()
			return true
		}
	}
	for(button in synthTypes){
		if (isInside(mousePos,synthTypes[button])) {
			for(button2 in synthTypes){
				synthTypes[button2]["selected"] = false
			}
			synthTypes[button]["selected"] = true
			selectedType = synthTypes[button]["type"]
			drawKeys()
			return true
		}
	}
}, false);
window.addEventListener('mouseup', function(evt) {
	for(key in keys){
		keys[key]["Down"] = false
	}
	drawKeys()
	for(oscillator in oscillatorNodes){
		var osci = oscillatorNodes[oscillator]
		if(osci["Started"] == true){
			osci["Node"].stop()
			oscillatorNodes.splice(oscillator, 1);
		}
	}
}, false);
document.addEventListener('keydown', function(event) {
	for(key in keys){
		if (keys[key]["keyCode"] == event.keyCode){
			playNote(keys[key]["Freq"])
			keys[key]["Down"] = true
			drawKeys()
			return true
		}
	}
	for(key in blackKeys){
		if (blackKeys[key]["keyCode"] == event.keyCode){
			playNote(blackKeys[key]["Freq"])
			drawKeys()
			return true
		}
	}
});
window.addEventListener('keyup', function(event) {
	for(key in keys){
		keys[key]["Down"] = false
	}
	drawKeys()
	for(key in keys){
		if (keys[key]["keyCode"] == event.keyCode){
			stopNote(keys[key]["Freq"])
			keys[key]["Down"] = false
			drawKeys()
			return true
		}
	}
	for(key in blackKeys){
		if (blackKeys[key]["keyCode"] == event.keyCode){
			stopNote(blackKeys[key]["Freq"])
			drawKeys()
			return true
		}
	}
}, false);
drawKeys()

