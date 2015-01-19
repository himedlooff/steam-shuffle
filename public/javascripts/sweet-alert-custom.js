;

$('.container').delegate('.sweet-click', 'click', function(){
var appid = $(this).data('appid');
var name = $(this).data('name');
var playtime = $(this).data('playtime') ? $(this).data('playtime') : 0 ;

var playtime_text = '';

if (playtime===0){
	playtime_text = "<br> <i class = 'fa fa-download' title='You will probably have to download it first.'></i> You probably will have to download it first. "
}

swal({
	title: unescape(name),
	text:  "Play on Steam" + "<br>"+ playtime_text,
	allowOutsideClick: true,
	showCancelButton: true,
	confirmButtonClass: 'btn-success',
	confirmButtonColor: '#217dbb',
	cancelButtonText: 'Maybe Later',
	confirmButtonText: "<i class='fa fa-steam'></i> Play",
	closeOnConfirm: true,
	closeOnCalcel: true
},
function(){
	window.location.href = 'steam://run/'+appid;
})
});