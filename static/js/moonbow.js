/**
 *
 * This is the main JavaScript file that contains different types of functionalities for the CMS.
 *
 * @package moonbow
 * @link https://github.com/imstef/moonbow-cms
 *
**/
$(document).ready(function() {
	/**
	 *
	 * Prevent CSS Animations on Page Load
	 *
	 * In order to prevent CSS animation to fire on page load, which can happen from time to time, we
	 * append a class to the body element that blocks any animations. After a short amount
	 * of time, we remove that class using a setTimeout() function, which enables all CSS transitions
	 * and animations to load properly, but only after the page has initially loaded.
	 * 
	 * Function parameters: setTimeout(callback, duration)
	 *
	**/
	setTimeout(function() {
	    $("body").removeClass("preload");
	}, 200);


	/**
	 *
	 * Detect Login Page
	 *
	 * Detect whether we are on the login page. If so, add a class to change body's background color.
	 *
	**/
	if (window.location.href.indexOf("/login/") > -1) {
	    $("body").addClass('login-bg');
	}

	/**
	 *
	 * Login Page Validation
	 *
	 * Set the input field as active (add border-bottom color) if the user has started typing in the field. This
	 * is only for convenience. If the user removes the text, set the border of the input field back to its
	 * default color, by removing the appended style attribute with the different color.
	 *
	**/
	$('.login-user').on('focusout', function() {
		var char_length = $(this).val().length;
		var obj = $(this);

		if (char_length >= 1) {
			obj.css({'border-color': '#3a85c2'});
		} else {
			obj.removeAttr('style');
		}
	});

});