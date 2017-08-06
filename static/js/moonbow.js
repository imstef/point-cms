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
	 * Detect Login Page and Dashboard Page
	 *
	 * Detect whether we are on the login page or the dashboard page. If so, add a class to change body's background color.
	 *
	**/
	if (window.location.href.indexOf("/login/") > -1 || window.location.href.indexOf("/dashboard/") > -1) {
	    $("body").addClass('alternate-bg');
	}

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

	/**
	 *
	 * Dashboard Navigation and Sections Preview Logic
	 *
	**/
	var dashboard_nav_items = [];
	var dashboard_sections = [];

	$('.dashboard-nav-item').each(function(i) {
		var item = i + 1;
		dashboard_nav_items.push($(this));
		$(this).addClass('d-nav-item-' + item);
	});

	$('.dashboard-section').each(function(i) {
		var item = i + 1;
		dashboard_sections.push($(this));
		$(this).addClass('dashboard-section-' + item);
	});

	if (window.location.href.indexOf("/dashboard/") > -1) {
		dashboard_nav_items[0].addClass('current-nav-item');
		dashboard_sections[0].fadeIn();
	}

	$('.dashboard-nav-item').on('click', function() {
		$('.dashboard-nav-item').each(function() {
		    $(this).removeClass('current-nav-item');
		});
		$(this).addClass('current-nav-item');

		$.each(dashboard_sections, function(i, obj) {
			if (dashboard_nav_items[i].hasClass('current-nav-item')) {
				obj.fadeIn('slow');
			} else {
				obj.css({'display': 'none'});
			}
		});
	});

	/**
	 *
	 * User Navigation
	 *
	**/
	$('.username').on('click', function() {
		$('.user-nav-wrapper').toggleClass('nav-open');
	});

	$(window).on('click', function(e) {
		if (e.target !== $('.username')[0] && e.target !== $('user-nav-wrapper')[0]) {
			$('.user-nav-wrapper').removeClass('nav-open');
		}
	});

	/**
	 *
	 * Ajax
	 *
	**/
	$(".save-btn").click(function(e){
		e.preventDefault();
		form_id = this.id.replace('-submit', '');
		console.log(form_id)
		var inputs = [];
		$('.' + form_id + '-form .' + form_id  + '-input').each(function() {
			inputs.push($(this).val());
	  	});
	  	console.log(inputs);
	  	var inputValues = {
	    	data: inputs,
	    	form_id: form_id,
	  	};

	  	$.ajax({
	   		type: "POST",
	    	url: "/api/",
	    	data: inputValues,
	    	success: function(response){
	     		console.log("success " + response);
	    	},
	    	error: function(response){
	     		alert("error" + response);
	   		}
		});

	});

	/**
	 *
	 * Section Expand and Collapse
	 *
	**/
	if (window.location.href.indexOf("/dashboard/") > -1) {
	    $('.db-section-content-expand').on('click', function() {
	    	$(this).parent().find('.db-section-item-content').slideDown();
	    	$(this).parent().find('.db-section-content-hide').css({'display': 'inline-block'});
	    });

	    $('.db-section-content-hide').on('click', function() {
	    	$(this).parent().find('.db-section-item-content').slideUp();
	    	$(this).css({'display': 'none'});
	    });
	}
	
	/**
	 *
	 * Add portfolio item modal
	 *
	**/
	db_portfolio_items = [];

	$('.add-portfolio-item').on('click', function() {
		$('.portfolio-item-modal-overlay').fadeIn();
		$('.db-portfolio-item').each(function() {
			$(this).css({'display':'none'});
		});
		$('.modal-wrapper').addClass('open');
		$('.add-new-item-form').fadeIn();
	});

	$('.db-portfolio-item-edit').each(function() {
        db_portfolio_items.push($(this).data("mod"));
    });

	$('.db-portfolio-item-edit').on('click', function() {
		$('.add-new-item-form').css({'display':'none'});
		$('.portfolio-item-modal-overlay').fadeIn();
		$('.modal-wrapper').addClass('open');
		//$('body').toggleClass('no-scroll');
		var db_portfolio_item = $(this).data("mod");

		$.each(db_portfolio_items, function(i, obj) {
		    if (obj === db_portfolio_item) {
		        $('.' + obj).fadeIn();
		    } else {
		        $('.' + obj).css({'display': 'none'});
		    }
		});
	})

	$('.db-close-portfolio-item-modal').on('click', function() {
		$('.portfolio-item-modal-overlay').css({'display': 'none'});
		$('.modal-wrapper').removeClass('open');
	});
});