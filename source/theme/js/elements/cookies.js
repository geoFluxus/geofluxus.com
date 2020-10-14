jQuery(document).ready(function( $ ){

	// cookiebar_enable * - true/false - ON or OFF
	// cookiebar_lang * - en/hr - default: en or pass cookiebar_activate variable
	// cookiebar_activate - cookiebar options array

	var cookiebar_defaults = {
                message: '<i class="fa fa-exclamation-circle"></i> We use cookies to make your experience on our website better',
                acceptText: '<i class="fa fa-check"></i> Accept',
                declineText: '<i class="fa fa-user-secret"></i> Block cookies',
                policyText: '<i class="fa fa-info-circle"></i> Privacy policy',
								showMoreText:'more', // More options text
								showMoreInfo:'', // More options text
								showMorePrimaryText:'Only Neccesary', // More options text
								showMoreAnalyticsText:'Analytics', // More options text
								showMoreMarketingText:'Marketing', // More options text
                policyURL: '/privacy/#cookie',
                autoEnable: false,
                acceptOnContinue: false,
                acceptOnScroll: false,
                acceptAnyClick: false,
                renewOnVisit: false,
                forceShow: false,
                effect: 'slide',
                zindex: '9000',
                expireDays: 365,
                fixed: true,
								position: 'bottom',
                acceptButton: true,
                declineButton: true,
                policyButton: true,
								showMore:true, // Add more options dropdown
								showMoreMarketing:true, // More options text
								showMoreAnalytics:true, // More options text
								showMoreAnalyticsCheched:true, // Precheck analytics
                acceptFunction: null,
                declineFunction: null,
								acceptFunctionMarketing:null,
								acceptFunctionAnalytics: null
            };

	// AUTOLOCALISE
	cookiebar_lang = (typeof cookiebar_lang !== 'undefined')? cookiebar_lang : 'en';
	if (cookiebar_lang == 'hr') {
		cookiebar_defaults.message = '<i class="fa fa-exclamation-circle"></i> Koristimo kolačiće kako bi vaše iskustvo na našem webu bilo što bolje.';
		cookiebar_defaults.acceptText = '<i class="fa fa-check"></i> Prihvati';
		cookiebar_defaults.declineText = '<i class="fa fa-user-secret"></i> Blokiraj';
		cookiebar_defaults.policyText = '<i class="fa fa-info-circle"></i> Vaša privatnost';
		cookiebar_defaults.showMoreText = 'više'; // More options text
		cookiebar_defaults.showMoreInfo = ''; // More options text
		cookiebar_defaults.showMorePrimaryText ='Samo nužno'; // More options text
		cookiebar_defaults.showMoreAnalyticsText = 'Analytics'; // More options text
		cookiebar_defaults.showMoreMarketingText = 'Marketing'; // More options text
		cookiebar_defaults.policyURL = '/privacy/#cookie';
		}


	// COOKIE BAR
	cookiebar_enable = (typeof cookiebar_enable !== 'undefined')? cookiebar_enable : false;
	cookiebar_activate = (typeof cookiebar_activate !== 'undefined')? cookiebar_activate : cookiebar_defaults;
	cookiebar_forceShow = (typeof cookiebar_forceShow !== 'undefined')? cookiebar_forceShow : false;

	if(cookiebar_forceShow) {
		cookiebar_activate.forceShow = cookiebar_forceShow;
	}

	if(cookiebar_activate && cookiebar_enable || cookiebar_forceShow) {

		// START COOKIE BAR
		$.cookieBar(cookiebar_activate);

		//ANALYTICS DATA
		if(jQuery.cookieBar('cookies')){
			// RUN On accept nessesary
		}
		if(jQuery.cookieBar('analytics')){
			// RUN On accept analytics
		}
		if(jQuery.cookieBar('marketing')){
			// RUN On accept marketing
		}
	}

	// END JQUERY
});
