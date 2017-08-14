/**
 *
 * This is the main JavaScript file that contains different types of functionalities for the CMS login page.
 *
 * @package point
 * @link https://github.com/imstef/point-cms
 *
**/
$(document).ready(function () {
	/**
	 *
	 * Prevent CSS Animations on Page Load
	 *
	 * In order to prevent CSS animation to fire on page load, which can happen from time to time, we
	 * append a class to the body element that blocks any animations. After a short amount
	 * of time, we remove that class using a setTimeout() function, which enables all CSS transitions
	 * and animations to load properly, but only after the page has initially loaded.
	 *
	 *
	**/
    setTimeout(function () {
        $("body").removeClass("preload");
    }, 200);

    $("body").addClass('alternate-bg');

    /**
	 *
	 * Login Page Validation
	 *
	 * Set the input field as active (add border-bottom color) if the user has started typing in the field. This
	 * is only for convenience. If the user removes the text, set the border of the input field back to its
	 * default color, by removing the appended style attribute with the different color. We do this in a loop so
	 * that all input fields (in our case 2) are included.
     *
     * If there is an error message shown after the submit button has been clicked, we want to remove that error
     * as soon as the user starts typing. That's why we're attempting to fade out the login-status div in case it
     * is visible, which should happen whenever there's an error after a user tries to log in to the dashboard.
     *
     * How do we know when to show that error? It's simple. If the div that's holding the error has more than 1
     * character (not including whitespace), we know that back-end responded with an error message that is
     * interpolated in the login status div.
	 *
	**/
	var input_fields = [];
	var login_status = $('.login-status');

	$('.form-group').each(function() {
		input_fields.push($(this));
	});

	for (var i = 0; i < input_fields.length; i++) {
		var current_field = input_fields[i].children();

		if (current_field.val().length !== 0) {
			current_field.css({'border-color': '#3a85c2'});
		}

		current_field.on('keyup', function() {
			var char_length = $(this).val().length;
			var obj = $(this);

			if (char_length >= 1) {
				obj.css({'border-color': '#3a85c2'});
			} else {
				obj.removeAttr('style');
			}

			$('.login-status').fadeOut('slow');
		});
	}

	if (login_status.text().trim().length !== 0) {
		login_status.fadeIn('slow');
	}
});