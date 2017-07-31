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
	 * Login Form Functionality
	 *
	**/
});