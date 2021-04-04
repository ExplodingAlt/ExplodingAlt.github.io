var pastCode = 0
function loadRandSong(){
	var videoCodes = ["iZ_P3F3nA1U",
			  "iZ_P3F3nA1U",
			  "hLRo06NCOAo",
			  "66aUCFCAMLM",
			  "M2wB0skdJ5o",
			  "pJtlLzsDICo",
			  "CvFH_6DNRCY",
			  "yqem6k_3pZ8",
			  "rbxL5BVEkRs",
			  "VjCyVfBiwpE",
			  "zZEumf7RowI",
			  "f3bzqzspXPI",
			  "yqem6k_3pZ8",
			 ];
	var x;
	x = Math.floor((Math.random() * 15) + 1);
	var song = document.getElementById("song");
	console.log(videoCodes[x])
	if(videoCodes[x] != undefined && x != pastCode) {
		pastCode = x
		song.src = "https://www.youtube.com/embed/" + videoCodes[x];
	} else{
		while(pastCode == x) {
			x = Math.floor((Math.random() * 15) + 1);
		}
		song.src = "https://www.youtube.com/embed/" + videoCodes[x];
	}
	
}

