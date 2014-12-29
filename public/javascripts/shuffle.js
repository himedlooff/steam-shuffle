$("#shuffle").click(function(e){
    e.preventDefault();
    console.log("Shuffle click");
});


function getRnd(gamesData){
	if (typeof(gamesData) == "undefined") return;
		var total = gamesData.game_count,
	selected = Math.floor( Math.random() * total );
	return selected;
}