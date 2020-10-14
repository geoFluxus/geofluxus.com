jQuery(document).ready(function( $ ){
	// START JQUERY

var unixTimeZero = Date.parse('01 Jan 2020 00:00:00 GMT');


window.setInterval(function(){
	var now = Date.now();
	var timego = now - unixTimeZero;
	var twaste = timego * 70.55 / 10000;
	var cwaste = timego * 4.4 / 10000;
	var kwaste = timego * 37.4 / 10000;

	if($('.twaste').length) {
		var twastex = twaste.toFixed(2);
		$('.twaste').html(twastex);
		//$('.twaste').html(Math.round(twaste));
	}
	if($('.cwaste').length) {
		var cwastex = cwaste.toFixed(2);
		$('.cwaste').html(cwastex);
		//$('.cwaste').html(Math.round(cwaste));
	}
	if($('.kwaste').length) {
		var kwastex = kwaste.toFixed(2);
		$('.kwaste').html(kwastex);
		//$('.kwaste').html(Math.round(kwaste));
	}

}, 100);





//1591795775103
//1577836800000
//13959396819
// END JQUERY
});
