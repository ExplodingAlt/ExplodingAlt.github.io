var canvas = document.getElementById("RL")
var ctx = canvas.getContext("2d");

var buttons = ["up","dn","rst","lt","rt"]

var bombs = []

var tiles = 100;
var lineWidth = 130;
var lineColor = "#3C3C3C";
var lineCount = tiles/10;

var allowControl = true
var won = false
var odeToJoy = new Audio('Files/OdeToJoy.mp3');
var prelude = new Audio('Files/Prelude.mp3');
var playerXSize = canvas.width/10
var playerYSize = canvas.width/10

var forwardImg = document.getElementById("forwardimg")
var bombImg = document.getElementById("bombimg")
var deadImg = document.getElementById("deadimg")

var Player = {"X":0,"Y":0}

function movePlayer(player,direction){
	var newPlayer = player;
	if(direction == "rst"){
		console.log("reset")
		playGame()	
		return "reset"
	}
	if(allowControl){
		switch(direction){
			case "up":
				if(player["Y"] > 0){
					newPlayer["Y"] -= 1
				}
				return newPlayer 
			case "dn":
				if(player["Y"] < lineCount-1){
					newPlayer["Y"] += 1
				}
				return newPlayer 
			case "lt":
				if(player["X"] > 0){
					newPlayer["X"] -= 1
				}
				return newPlayer 
			case "rt":
				if(player["X"] < lineCount-1){
					newPlayer["X"] += 1
				}
				return newPlayer 
		}
		   

	}  
}
function clickEvent(button){
	movePlayer(Player,button)
	drawGame()
}
function innitButtons(button){
	document.getElementById(button).addEventListener('click', function(){clickEvent(button)})
}

function drawLines(){
	for(let i=1; i<lineCount; i++){
		ctx.fillRect(canvas.width/lineCount*i,0,canvas.width/lineWidth,canvas.height);
	}
	// Draws lines on Z axis
	for(let i=1; i<lineCount; i++){
		ctx.fillRect(0,canvas.height/lineCount*i,canvas.width,canvas.height/lineWidth);
	}

}

function drawGame(){
	ctx.fillStyle = "Black"
	ctx.fillRect(0,0,canvas.width,canvas.height)
	//drawLines();

	ctx.fillStyle = "White"
	ctx.font = "20px clacon"
	
	allowControl = false
	if(won){
		drawBombs()
		ctx.font = "200px clacon"
		ctx.fillText("WINNER",canvas.width/2-125,250,250,200)
		ctx.drawImage(forwardImg,Player["X"]*65,Player["Y"]*65,playerXSize,playerYSize)
		return false
	}
	setTimeout(function(){
		for(bomb in bombs){
			if(bombs[bomb]["X"] === Player["X"] && bombs[bomb]["Y"] === Player["Y"] && bombs[bomb] != {"X":0,"Y":0}){
				ctx.font = "200px clacon"
				drawBombs()
				ctx.fillText("DEAD",canvas.width/2-125,250,250,200)
				allowControl = false
				var bRound = bombsAround()-1
				document.getElementById("bsAround").innerHTML = "bombs around you: "+bRound
				ctx.drawImage(deadImg,Player["X"]*65,Player["Y"]*65,playerXSize,playerYSize)
				prelude.play();	
				return "Dead"
			}			
		}
		if(Player["X"] == 9 && Player["Y"] == 9){
			if(won != true){
				drawBombs()
				ctx.font = "200px clacon"
				ctx.fillText("WINNER",canvas.width/2-125,250,250,200)
				ctx.drawImage(forwardImg,Player["X"]*65,Player["Y"]*65,playerXSize,playerYSize)
				odeToJoy.play();			
				allowControl = false
				won = true
				return "won"			
			}

		}
		document.getElementById("bsAround").innerHTML = "bombs around you: "+bombsAround() 
		ctx.drawImage(forwardImg,Player["X"]*65,Player["Y"]*65,playerXSize,playerYSize)
		allowControl = true
	},300)
	ctx.fillText("WIN",9.3*65,9.7*65,50,50)
}

function bombsAround(){
	var bAround = 0;
	for(bomb in bombs){
		if(bombs[bomb]["X"] == Player["X"] || bombs[bomb]["X"] == Player["X"] + 1 || bombs[bomb]["X"] == Player["X"] - 1){
			if(bombs[bomb]["Y"] == Player["Y"] || bombs[bomb]["Y"] == Player["Y"] + 1 || bombs[bomb]["Y"] == Player["Y"] - 1){
				bAround++
			}
		}
	}

	return bAround
}

function drawBombs(){
	for(bomb in bombs){
		ctx.drawImage(bombImg,bombs[bomb]["X"]*65,bombs[bomb]["Y"]*65,playerXSize,playerYSize)
	}
}

function genBombs(){
	for(var x=0;x<20;x++){
		bombPosition = {"X":Math.floor(Math.random() * 10),"Y":Math.floor(Math.random() * 10)}
		if(bombPosition != {"X":0,"Y":0} || bombPosition != {"X":9,"Y":9} || bombPosition != {"X":1,"Y":1} || bombPosition != {"X":0,"Y":1}){
			bombs.push(bombPosition)
		}
	}
}

function playGame(){
	// Variables
	won = false
	odeToJoy.pause();
	odeToJoy.currentTime = 0;
	prelude.pause();
	prelude.currentTime = 0;
	Player = {"X":0,"Y":0}
	console.log(Player)
	allowControl = true
	bombs = []

	ctx.fillStyle = "Black"
	ctx.fillRect(0,0,canvas.width,canvas.height)
	ctx.fillStyle = "White"
	ctx.font = "20px clacon"
	ctx.fillText("WIN",9.3*65,9.7*65,50,50)

	genBombs()
	ctx.drawImage(forwardImg,Player["X"]*65,Player["Y"]*65,canvas.width/10,canvas.height/10)
	document.getElementById("bsAround").innerHTML = "bombs around you: "+bombsAround() 
	// Draws lines on X axis
	//drawLines()
	// Initiates buttons

}
for(button in buttons){
	console.log(document.getElementById(buttons[button]))
	console.log(buttons[button])
	innitButtons(buttons[button])
}
ctx.beginPath();
ctx.stroke();

playGame();