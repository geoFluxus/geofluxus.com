/*
 * Copyright (C) 2012 PrimeBox (info@primebox.co.uk)
 *
 * This work is licensed under the Creative Commons
 * Attribution 3.0 Unported License. To view a copy
 * of this license, visit
 * http://creativecommons.org/licenses/by/3.0/.
 *
 * Documentation available at:
 * http://www.primebox.co.uk/projects/cookie-bar/
 *
 * When using this software you use it at your own risk. We hold
 * no responsibility for any damage caused by using this plugin
 * or the documentation provided.
 */
(function($){
	$.cookieBar = function(options,val){
		if(options=='cookies'){
			var doReturn = 'cookies';
		}else if(options=='analytics'){
			var doReturn = 'analytics';
		}else if(options=='marketing'){
			var doReturn = 'marketing';
		}else if(options=='set'){
			var doReturn = 'set';
		}else{
			var doReturn = false;
		}
		var defaults = {
			message: 'We use cookies to track usage and preferences.', //Message displayed on bar
			acceptButton: true, //Set to true to show accept/enable button
			acceptText: 'I Understand', //Text on accept/enable button
			acceptFunction: function(cookieValue){if(cookieValue!='enabled' && cookieValue!='accepted') window.location = window.location.href;}, //Function to run after accept
			declineButton: false, //Set to true to show decline/disable button
			declineText: 'Disable Cookies', //Text on decline/disable button
			declineFunction: function(cookieValue){if(cookieValue=='enabled' || cookieValue=='accepted') window.location = window.location.href;}, //Function to run after decline
			policyButton: false, //Set to true to show Privacy Policy button
			policyText: 'Privacy Policy', //Text on Privacy Policy button
			policyURL: '/privacy-policy/', //URL of Privacy Policy
			showMore:true, // Add more options dropdown
			showMoreMarketing:true, // More options text
			showMoreAnalytics:true, // More options text
			showMoreAnalyticsCheched:true, // Precheck analytics
			acceptFunctionMarketing: function(cookieValueM){if(cookieValueM =='accepted') console.log('enabled marketing cookies');}, //Function to run after accept
			acceptFunctionAnalytics: function(cookieValueA){if(cookieValueA =='accepted') console.log('enabled analytics cookies');}, //Function to run after accept
			showMoreText:'more', // More options text
			showMoreInfo:'', // More options text
			showMorePrimaryText:'Only Neccesary', // More options text
			showMoreAnalyticsText:'Analytics', // More options text
			showMoreMarketingText:'Marketing', // More options text
			autoEnable: true, //Set to true for cookies to be accepted automatically. Banner still shows
			acceptOnContinue: false, //Set to true to accept cookies when visitor moves to another page
			acceptOnScroll: false, //Set to true to accept cookies when visitor scrolls X pixels up or down
			acceptAnyClick: false, //Set to true to accept cookies when visitor clicks anywhere on the page
			expireDays: 365, //Number of days for cookieBar cookie to be stored for
			renewOnVisit: false, //Renew the cookie upon revisit to website
			forceShow: false, //Force cookieBar to show regardless of user cookie preference
			effect: 'slide', //Options: slide, fade, hide
			element: 'body', //Element to append/prepend cookieBar to. Remember "." for class or "#" for id.
			append: false, //Set to true for cookieBar HTML to be placed at base of website. Actual position may change according to CSS
			fixed: false, //Set to true to add the class "fixed" to the cookie bar. Default CSS should fix the position
			position: 'bottom', //Add class to position cookiebar, bottom etc...
			zindex: '', //Can be set in CSS, although some may prefer to set here
			domain: String(window.location.hostname), //Location of privacy policy
			referrer: String(document.referrer) //Where visitor has come from
		};
		var options = $.extend(defaults,options);

		//Sets expiration date for cookie
		var expireDate = new Date();
		expireDate.setTime(expireDate.getTime()+(options.expireDays*86400000));
		expireDate = expireDate.toGMTString();

		var cookieEntry = 'cb-enabled={value}; expires='+expireDate+'; path=/';
		var cookieEntryA = 'cb-enabled-a={value}; expires='+expireDate+'; path=/';
		var cookieEntryM = 'cb-enabled-m={value}; expires='+expireDate+'; path=/';

		//Retrieves current cookie preference
		var i,cookieValueA='',cookieValueM='',cookieValue='',aCookie,aCookies=document.cookie.split('; ');
		for (i=0;i<aCookies.length;i++){
			aCookie = aCookies[i].split('=');
			if(aCookie[0]=='cb-enabled'){
    			cookieValue = aCookie[1];
			}
			if(aCookie[0]=='cb-enabled-a'){
    			cookieValueA = aCookie[1];
			}
			if(aCookie[0]=='cb-enabled-m'){
    			cookieValueM = aCookie[1];
			}
		}
		//Sets up default cookie preference if not already set
		if(cookieValue=='' && doReturn!='cookies' && doReturn!='analytics' && doReturn!='marketing' && options.autoEnable){
			cookieValue = 'enabled';
			document.cookie = cookieEntry.replace('{value}','enabled');
		}else if((cookieValue=='accepted' || cookieValue=='declined') && doReturn!='cookies' && options.renewOnVisit){
			document.cookie = cookieEntry.replace('{value}',cookieValue);
		}

		if(cookieValueA=='' && doReturn!='cookies' && doReturn!='analytics' && doReturn!='marketing' && options.autoEnable){
			cookieValueA = 'enabled';
			document.cookie = cookieEntryA.replace('{value}','enabled');
		}else if((cookieValueA=='accepted' || cookieValueA=='declined') && doReturn!='cookies' && options.renewOnVisit){
			document.cookie = cookieEntryA.replace('{value}',cookieValueA);
		}

		if((cookieValueM=='accepted' || cookieValueM=='declined') && doReturn!='cookies' && options.renewOnVisit){
			document.cookie = cookieEntryM.replace('{value}',cookieValueM);
		}

		if(options.acceptOnContinue){
			if(options.referrer.indexOf(options.domain)>=0 && String(window.location.href).indexOf(options.policyURL)==-1 && doReturn!='cookies' && doReturn!='analytics' && doReturn!='marketing' && doReturn!='set' && cookieValue!='accepted' && cookieValue!='declined'){
				doReturn = 'set';
				val = 'accepted';
			}
		}
		if(doReturn=='cookies'){
			//Returns true if cookies are enabled, false otherwise
			if(cookieValue=='enabled' || cookieValue=='accepted'){
				return true;
			}else{
				return false;
			}
		}else if(doReturn=='analytics'){
			//Returns true if cookies are enabled, false otherwise
			if(cookieValueA=='enabled' || cookieValueA=='accepted'){
				return true;
			}else{
				return false;
			}
		}else if(doReturn=='marketing'){
			//Returns true if cookies are enabled, false otherwise
			if(cookieValueM=='enabled' || cookieValueM=='accepted'){
				return true;
			}else{
				return false;
			}
		} else if(doReturn=='set' && (val=='accepted' || val=='declined')){
			//Sets value of cookie to 'accepted' or 'declined'
			document.cookie = cookieEntry.replace('{value}',val);
			if(val=='accepted'){
				return true;
			}else{
				return false;
			}
		} else {
			//Sets up enable/accept button if required
			var message = options.message.replace('{policy_url}',options.policyURL);

			if(options.acceptButton){
				var acceptButton = '<a href="" class="cb-enable btn btn-sm btn-success">'+options.acceptText+'</a>';
			}else{
				var acceptButton = '';
			}
			//Sets up disable/decline button if required
			if(options.declineButton){
				var declineButton = '<a href="" class="cb-disable btn btn-sm btn-danger">'+options.declineText+'</a>';
			}else{
				var declineButton = '';
			}
			//Sets up privacy policy button if required
			if(options.policyButton){
				var policyButton = '<a href="'+options.policyURL+'" class="cb-policy btn-sm">'+options.policyText+'</a>';
			}else{
				var policyButton = '';
			}
			//Whether to add "fixed" class to cookie bar
			if(options.fixed){
				if(options.position){
					var fixed = ' class="fixed ' + options.position + '"';
				}else{
					var fixed = ' class="fixed"';
				}
			}else{
				var fixed = '';
			}
			if(options.zindex!=''){
				var zindex = ' style="z-index:'+options.zindex+';"';
			}else{
				var zindex = '';
			}
			if(options.showMore){
				var showmore = '<a href="" class="cb-more">'+options.showMoreText+'</a> <div class="cookie-more d-none"> ';
				showmore += '<div class="form-check"><input class="form-check-input" type="checkbox" value="primary" id="cb-primary" disabled checked><label class="form-check-label" for="cb-primary">'+options.showMorePrimaryText+'</label></div>';
				if(options.showMoreAnalytics) {
					if(options.showMoreAnalyticsCheched) { var showmoreac = ' checked';} else { var showmoreac = '' }
					showmore += '<div class="form-check"><input class="form-check-input" type="checkbox" value="analytics" id="cb-analytics"'+showmoreac+'><label class="form-check-label" for="cb-primary">'+options.showMoreAnalyticsText+'</label></div>';
				}
				if(options.showMoreMarketing) {
					showmore += '<div class="form-check"><input class="form-check-input" type="checkbox" value="marketing" id="cb-marketing"><label class="form-check-label" for="cb-marketing">'+options.showMoreMarketingText+'</label></div>';
				}
				if(options.showMoreInfo !== '') {
					showmore += '<p class="cookie-more-info">'+options.showMoreInfo+'</p>';
				}
				showmore += ' </div>';
			}else{
				var showmore = '';
			}


			if (location.hash == '#edit-cookies') { options.forceShow == true; }

			var cookieout = '<div id="cookie-bar"'+fixed+zindex+'><div class="cookie-wrapper"><p>'+message+'</p>'+policyButton+declineButton+acceptButton+showmore+'</div></div>'

			//Displays the cookie bar if arguments met
			if(options.forceShow || cookieValue=='enabled' || cookieValue==''){
				if(options.append){
					$(options.element).append(cookieout);
				}else{
					$(options.element).prepend(cookieout);
				}
			}

			var removeBar = function(func){
				if(options.acceptOnScroll) $(document).off('scroll');
				if(typeof(func)==='function') func(cookieValue);
				if(options.effect=='slide'){
					$('#cookie-bar').slideUp(300,function(){$('#cookie-bar').remove();});
				}else if(options.effect=='fade'){
					$('#cookie-bar').fadeOut(300,function(){$('#cookie-bar').remove();});
				}else{
					$('#cookie-bar').hide(0,function(){$('#cookie-bar').remove();});
				}
				$(document).unbind('click',anyClick);
			};
			var addAnalytics = function(func){
				if(typeof(func)==='function') func(cookieValueA);
			};
			var addMarketing = function(func){
				if(typeof(func)==='function') func(cookieValueM);
			};
			var cookieAccept = function(){
				document.cookie = cookieEntry.replace('{value}','accepted');
				addMarketing(options.acceptFunctionMarketing);
				addAnalytics(options.acceptFunctionAnalytics);
				removeBar(options.acceptFunction);
			};
			var cookieDecline = function(){
				var deleteDate = new Date();
				deleteDate.setTime(deleteDate.getTime()-(864000000));
				deleteDate = deleteDate.toGMTString();
				aCookies=document.cookie.split('; ');
				for (i=0;i<aCookies.length;i++){
					aCookie = aCookies[i].split('=');
					if(aCookie[0].indexOf('_')>=0){
						document.cookie = aCookie[0]+'=0; expires='+deleteDate+'; domain='+options.domain.replace('www','')+'; path=/';
					}else{
						document.cookie = aCookie[0]+'=0; expires='+deleteDate+'; path=/';
					}
				}
				document.cookie = cookieEntry.replace('{value}','declined');
				removeBar(options.declineFunction);
			};
			var anyClick = function(e){
				if(!$(e.target).hasClass('cb-policy')) cookieAccept();
			};

			$('#cookie-bar .cb-enable').click(function(){cookieAccept();return false;});
			$('#cookie-bar .cb-disable').click(function(){cookieDecline();return false;});
			$('#cookie-bar .cb-more').click(function(event){ event.preventDefault(); $('.cookie-more').removeClass('d-none'); $('#cookie-bar .cb-more').addClass('d-none'); });

			if(options.showMore && options.showMoreMarketing) {
				$('#cookie-bar .cookie-more #cb-marketing').change(function() {
				    if(this.checked) {
				        document.cookie = cookieEntryM.replace('{value}',cookieValueM);
				    } else {
				        document.cookie = cookieEntryM.replace('{value}','declined');
				    }
				});
			}

			if(options.showMore && options.showMoreAnalytics) {
				$('#cookie-bar .cookie-more #cb-analytics').change(function() {
				    if(this.checked) {
				        document.cookie = cookieEntryA.replace('{value}',cookieValueA);
				    } else {
				        document.cookie = cookieEntryA.replace('{value}','declined');
				    }
				});
			}



			if(options.acceptOnScroll){
				var scrollStart = $(document).scrollTop(),scrollNew,scrollDiff;
				$(document).on('scroll',function(){
					scrollNew = $(document).scrollTop();
					if(scrollNew>scrollStart){
						scrollDiff = scrollNew - scrollStart;
					}else{
						scrollDiff = scrollStart - scrollNew;
					}
					if(scrollDiff>=Math.round(options.acceptOnScroll)) cookieAccept();
				});
			}
			if(options.acceptAnyClick){
				$(document).bind('click',anyClick);
			}
		}
	};
})(jQuery);
