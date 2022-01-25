var snowFlake = "Images/snowflake.png"
var snowFlakeCount = 0
var Speed = 10
var pixelInterval = 1
var yOffset = 0

function AddImage(imgSrc,Id) {
	var img = document.createElement('img');
	img.style.width = 10+"%"
	img.style.position = "absolute"
	img.src = 
	imgSrc;
	document.getElementById('body').appendChild(img);
	var ID = Math.floor((Math.random() * 10000000) + 1);
	img.id = ID
	return ID
} 


function generateSnowflake(snowFlakeImg,xPos){
	console.log("random")
	snowFlakeCount += 1
	var id = AddImage(snowFlake)
	var snowflake = document.getElementById(id)
	
	var width = Math.floor((Math.random() * 100) + 1)
	snowflake.style.left = Math.floor((Math.random() * window.innerWidth-width-40) + 1)+"px"
	snowflake.style.top = yOffset-width+"px"
	snowflake.style.width = width+"px"
	snowflake.style["overflow-y"] = "hidden";
	snowflake.style["overflow-x"] = "scroll";
	snowflake.style["z-index"] = -2
	snowflake.style.transform = "rotate("+Math.floor((Math.random() * 360) + 1)+"deg)"
	var interval = setInterval(function(){
		var newPercent = Math.floor(snowflake.style.top.replace('px', ''))
		if(newPercent > window.innerHeight){
			snowflake.remove()
			clearInterval(interval)
		}
		newPercent += pixelInterval
		snowflake.style.top = newPercent+"px";

	},Speed)
}

function reverse(){
	pixelInterval = -pixelInterval
	yOffset = window.innerHeight
}

//commented out when no snow
//setInterval(generateSnowflake,1000,snowFlake,0)
//setInterval(generateSnowflake,1300,snowFlake,0)
//setInterval(generateSnowflake,900,snowFlake,0)
