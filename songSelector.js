function loadRandSong(){
	var videoCodes = ["iZ_P3F3nA1U",
			  "f7qPqxsFlVg",
			  "hLRo06NCOAo",
			  "Il7G4KUuHg",
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
	x = Math.floor((Math.random() * 10) + 1);
	var song = document.getElementById("song");
	console.log(videoCodes[x])
	if(videoCodes[x] != undefined) {
		song.src = "https://www.youtube.com/embed/" + videoCodes[x];
	} else{
		song.src = "https://www.youtube.com/embed/VjCyVfBiwpE"	
	}
	
}

