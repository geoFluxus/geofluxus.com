jQuery(document).ready(function( $ ){
	// START JQUERY

	// modal_enable - enable auto modal

	doubleclick_enable = (typeof modal_enable !== 'undefined')? modal_enable : false;


	// Double click menu
	if(doubleclick_enable) {
			$('.navbar li.dropdown .nav-link').on('click', function(event) {
					event.preventDefault();
					if(this.attr('aria-expanded')) window.location.href = this.href;
			});
	}

	// END JQUERY
});
