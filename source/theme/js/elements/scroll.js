jQuery(document).ready(function( $ ){
	// START JQUERY

	// scroll_enable - enable scrolling options
	// scroll_duration - transition time (1000)

	// scrollspy_enable - enable scrollspy menus
	// scrollspy_target - scrollspy container class (#mainNavbar)
	// scrollspy_offset

	// scrolldir_enable - scroll direction enable


	// navbar_height * - default of navbar (0)
	// navbar_main - class of main navbar (#mainNavbar)
	// navbar_sub - class of sub navbar (false)

	scroll_enable = (typeof scroll_enable !== 'undefined')? scroll_enable : true;
	scroll_duration = (typeof scroll_duration !== 'undefined')? scroll_duration : 1000;

	scrollspy_enable = (typeof scrollspy_enable !== 'undefined')? scrollspy_enable : true;
	scrollspy_target = (typeof scrollspy_target !== 'undefined')? scrollspy_target : '#mainNavbar';
	scrollspy_offset = (typeof scrollspy_offset !== 'undefined')? scrollspy_offset : 0;

	scrolldir_enable = (typeof scrolldir_enable !== 'undefined')? scrolldir_enable : true;
	scrolldir_target = (typeof scrolldir_target !== 'undefined')? scrolldir_target : 'body';
	scrolldir_up = (typeof scrolldir_up !== 'undefined')? scrolldir_up : 'scrolled-up';
	scrolldir_down = (typeof scrolldir_down !== 'undefined')? scrolldir_down : 'scrolled-down';

	navbar_height = (typeof navbar_height !== 'undefined')? navbar_height : 0;
	navbar_main = (typeof navbar_main !== 'undefined')? navbar_main : '#mainNavbar';
	navbar_sub = (typeof navbar_sub !== 'undefined')? navbar_sub : false;

	// SET REAL HEIGHT
	if($(navbar_main).length) {
		navbar_height = $(navbar_main).outerHeight();
	}

	// SCROLL TO
	if (scroll_enable) {
		function scrollTo(top=0) {
				$('html,body,.snap-container').animate({
					scrollTop: top
				}, scroll_duration);
				return true;
		}

		// to div by id
		$('a.scroll-link[href*="#"]:not([href="#"]), a.nav-link[href*="#"]:not([href="#"])').click(function( event ) {
				var target = $(this.hash);

				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				if(target.length && location.hostname == this.hostname) {
					if(this.pathname.replace(/^\//, '') == '' || location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')) {

						event.preventDefault();
						var top = target.offset().top - navbar_height;
						//scrollTo(top);
						$('html,body,.snap-container').animate({
							scrollTop: top
						}, scroll_duration);

						if($('.navbar-collapse').length) $('.navbar-collapse').collapse('hide');
            if($('.fullmenu.collapse').length) $('.fullmenu').collapse('hide');

					}
				}
				return false;
		});

		// for 100%
		$('.scroll-100').click(function( event ) {
				event.preventDefault();
				var top = (window.innerHeight + 1);
				scrollTo(top);

				return false;
		});

	  // To top
		$('.scroll-top').click(function( event ) {
					event.preventDefault();
					scrollTo(0);
					return false;
		});
	}

	// SCROLLSPY
	if(scrollspy_enable && $(scrollspy_target).length) {
		$('body').scrollspy({
			target: scrollspy_target,
			offset: scrollspy_offset
		});
	}

	// SCROLL DIRECTION
	if(scrolldir_enable) {
		var lastTop = $(window).scrollTop();
		var lastMovement = 0;
		var lastDirection = 0;

		$(window).scroll(function(event){
			var newTop = $(this).scrollTop();
			lastMovement += newTop - lastTop;
			if (newTop > lastTop) {
				// scroll down
				$(scrolldir_target).addClass(scrolldir_down);
				$(scrolldir_target).removeClass(scrolldir_up);
				if (lastDirection != 1) lastMovement = 0;
				lastDirection = 1;
			} else {
				// scroll up
				$(scrolldir_target).addClass(scrolldir_up);
				$(scrolldir_target).removeClass(scrolldir_down);
			  if (lastDirection != -1) lastMovement = 0;
				lastDirection = -1;
		 }
		 lastTop = newTop;
		});
	}





	// END JQUERY
});
