jQuery(document).ready(function( $ ){
	// START JQUERY


	// forms_validate_enable *  - enable javascript form validation
	// forms_validate_class - class for validation
	// forms_validate_success - validated class

	// forms_privacy_enable - enable privacy block functions
	// forms_privacy_id - id of form privacy block
	// forms_privacy_checkbox - form privacy checkbox item class


	forms_validate_enable = (typeof forms_validate_enable !== 'undefined')? forms_validate_enable : true;
	forms_validate_class = (typeof forms_validate_class !== 'undefined')? forms_validate_class : 'needs-validation';
	forms_validate_success = (typeof forms_validate_success !== 'undefined')? forms_validate_success : 'was-validated';

	forms_privacy_enable = (typeof forms_privacy_enable !== 'undefined')? forms_privacy_enable : true;
	forms_privacy_id = (typeof forms_privacy_id !== 'undefined')? forms_privacy_id : '#PrivacyCheckAll';
	forms_privacy_checkbox = (typeof forms_privacy_checkbox !== 'undefined')? forms_privacy_checkbox : '.privacy-check';


	// PRIVACY CHECKBOX HELPER
	if(forms_privacy_enable) {
		$(forms_privacy_id).click(function(){
			if(this.checked) {
				$(forms_privacy_checkbox).prop('checked', true);
			} else {
				$(forms_privacy_checkbox).prop('checked', false);
			}
		});
	}

//console.log('[forms] started');
	// FORM VALIDATION (BOOTSTRAP)
	if(forms_validate_enable) {
		//console.log('[validate] enabled');
		(function() {
			'use strict';
				//console.log('validate on');
				// Fetch all the forms we want to apply custom Bootstrap validation styles to
				var forms = document.getElementsByClassName(forms_validate_class);
				// Loop over them and prevent submission
				var validation = Array.prototype.filter.call(forms, function(form) {
					form.addEventListener('submit', function(event) {
						$('.saving').addClass('d-block');
						if (form.checkValidity() === false) {
							event.preventDefault();
							event.stopPropagation();
							$('.saving').removeClass('d-block');
						}
						form.classList.add(forms_validate_success);
					}, false);
				});
		})();
	}

// END JQUERY
});
