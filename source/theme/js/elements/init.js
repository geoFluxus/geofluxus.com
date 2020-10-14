jQuery(document).ready(function( $ ){
	// START JQUERY

	// popover_enable - enable bootstrap popover
	// aos_enable * - enable animate on scroll

	popover_enable = (typeof popover_enable !== 'undefined')? popover_enable : true;
	tooltip_enable = (typeof tooltip_enable !== 'undefined')? tooltip_enable : true;

	aos_enable = (typeof aos_enable !== 'undefined')? aos_enable : true;




	// Enable Bootstrap Popovers
	if(popover_enable) {
		$(function () {
			$('[data-toggle="popover"]').popover();
		});
	}
	if(tooltip_enable) {
		$(function () {
		  $('[data-toggle="tooltip"]').tooltip();
		});
	}
	// AOS
	if(aos_enable) {
		AOS.init();
	}

	// END JQUERY
});
