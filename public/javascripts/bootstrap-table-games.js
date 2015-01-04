/* Bootstrap table  */

$('#games').bootstrapTable({data:!{game}});

function thumb(value, row){
	var name = value + "<br>";

	if (!row.img_logo_url){
		return name + "<i class='fa fa-steam fa-4x'>";
	}
	
	var img = "<img src="+"http://media.steampowered.com/steamcommunity/public/images/apps/"+row.appid+"/"+row.img_logo_url+".jpg>";
	return name+img;
}

function run(value){
	var run = "<a href="+'steam://run/'+value+">"+"<i class='fa fa-play fa-2x'>"+"</a>";
	return run;
}

function time2words(value){
	if (typeof(value) == 'undefined' || 0){
		return "";
		} 
	else{
		var d =  Math.floor (value / 1440);

		var h = Math.floor ((value - d * 1440) / 60);

		var m = value - (d * 1440) - (h * 60);

		if (d!=0) {
			if  (d == 1) {
				d = String(d) + " day ";
				}
			else 
				d = String(d) + " days ";
		}
		else
			d="";

		if (h!=0) {
			if  (h == 1) {
				h = String(h) + " hour ";
				}
			else
				h = String(h) + " hours ";
		}
		else h = "";

		if (m!=0) {
			if  (m == 1) {
				m = String(m) + " minute";
				}
			else 
				m = String(m) + " minutes";
		}
		else m = "";
		return d + h +  m ;
		}
}