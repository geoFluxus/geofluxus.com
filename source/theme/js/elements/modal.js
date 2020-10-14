jQuery(document).ready(function( $ ){
	// START JQUERY

	// modal_enable - enable auto modal

	modal_enable = (typeof modal_enable !== 'undefined')? modal_enable : true;


	// RUN MODAL
	if(modal_enable) {
		if(window.location.hash) {
			var hash = window.location.hash;
			if($(hash).length) {
				if($(hash).hasClass('modal')) {
					$(hash).modal('show');
				}
			}
		}
	}

	// END JQUERY
});
