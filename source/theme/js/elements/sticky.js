jQuery(document).ready(function( $ ){
	// START JQUERY

	affix_enable = (typeof affix_enable !== 'undefined')? affix_enable : true;
	affix_class = (typeof affix_class !== 'undefined')? affix_class : 'affix';
	affix_top = (typeof affix_top !== 'undefined')? affix_top : 'affix-top';

	navbar_main = (typeof navbar_main !== 'undefined')? navbar_main : '#mainNavbar';
	navbar_sub = (typeof navbar_sub !== 'undefined')? navbar_sub : false;
	navbar_height = (typeof navbar_height !== 'undefined')? navbar_height : 0;

	// set navbar height
	if($(navbar_main).length) {
		navbar_height = $(navbar_main).outerHeight();
	}

	if (affix_enable) {
			function checkNavTop(el,off) {
				var top = $(window).scrollTop();
				if (top >= off) {
					$(el).addClass(affix_class);
					$(el).removeClass(affix_top);
				} else {
					$(el).removeClass(affix_class);
					$(el).addClass(affix_top);
				}
			}

			$(window).scroll(function(){
				checkNavTop(navbar_main,navbar_height);
				if(navbar_sub) checkNavTop(navbar_sub,subnavbar_height);
			});

			$(window).on('load', function(){
				checkNavTop(navbar_main,navbar_height);
				if(navbar_sub) checkNavTop(navbar_sub,subnavbar_height);
			});
	}


	        // Get the video
	        var vid = document.getElementById("topvideo");
	        var skip_last = 0.1;
	        var skip_first = 0.1;
	        if(vid) {
	            var duration = vid.duration;
	            vid.addEventListener("timeupdate", function () {
	                if (!duration) {
	                    duration = vid.duration - skip_last;
	                    if(this.currentTime >= duration) {
	                        this.currentTime = skip_first;
	                    }
	                } else {
	                    duration = 0;
	                }
	            });
	        }



// END JQUERY
});
