/**
 *
 * This is the main JavaScript file that contains different types of functionalities for the CMS.
 *
 * @package point
 * @link https://github.com/imstef/point-cms
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
	$("body").addClass('alternate-bg');

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

	dashboard_nav_items[0].addClass('current-nav-item');
	dashboard_sections[0].fadeIn();

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
	$('.save-btn').click(function(e){
		e.preventDefault();
		form_id = $(this)[0].id.replace('-submit', '');
		var inputs = [];
		var input_values = {};

		$('.' + form_id + '-form .' + form_id  + '-input').each(function() {
			inputs.push($(this).val());
	  	});
		
		// console.log(form_id);
		// console.log(inputs);

		if ($(this).hasClass('delete-btn')) {
			var confirm = window.confirm("You are about to remove a section from the database. This action is permanent and you can't undo it. Proceed?");

			if (confirm === true) {
				input_values = {
				  	data: inputs,
				  	form_id: form_id,
				};

				$.ajax({
					type: "POST",
					url: "/api/",
					data: input_values,
					error: function (response) {
						alert("error" + response);
					},
					success: function (response) {
						console.log("success " + response);
					}
				});
				
				location.reload();
			} else {
				console.log('Mission aborted!');
				return;
			}
		}

		input_values = {
			data: inputs,
			form_id: form_id,
		};

		$.ajax({
			type: "POST",
			url: "/api/",
			data: input_values,
			error: function (response) {
				alert("error" + response);
			},
			success: function (response) {
				console.log("success " + response);
			}
		});
	});

	$('.default-btn').on('click', function(e) {
		e.preventDefault();
	});

	/**
	 *
	 * Section Expand and Collapse
	 *
	**/
	$('.db-section-content-expand').on('click', function() {
		$(this).css({'display': 'none'});
		$(this).parent().find('.db-section-content-hide').css({'width': '100%'});
		$(this).parent().css({ 'background-color': 'rgba(58, 133, 194, 0.85)'});
		$(this).parent().find('.db-section-item-content').slideDown();
		$(this).parent().find('.db-section-content-hide').css({ 'display': 'block', 'color': '#FFF'});
	});

	$('.db-section-content-hide').on('click', function() {
		$(this).parent().find('.db-section-content-expand').css({ 'display': 'block' });
		$(this).parent().css({ 'background-color': '#EEE', 'color': '#404040' });
		$(this).parent().find('.db-section-item-content').slideUp();
		$(this).css({'display': 'none'});
	});
	
	/**
	 *
	 * Add portfolio item modal
	 *
	**/
	db_portfolio_items = [];

	$('.db-add-portfolio-item').on('click', function() {
		$('.portfolio-item-modal-overlay').fadeIn();
		$('.db-portfolio-item').each(function() {
			$(this).css({'display':'none'});
		});
		$('.modal-wrapper').addClass('open');
		$('body').addClass('no-scroll');
		$('.add-new-item-form').fadeIn();
	});

	$('.db-portfolio-item-edit').each(function() {
        db_portfolio_items.push($(this).data("mod"));
    });

	$('.db-portfolio-item-edit').on('click', function() {
		$('.add-new-item-form').css({'display':'none'});
		$('.portfolio-item-modal-overlay').fadeIn();
		$('.modal-wrapper').addClass('open');
		$('body').addClass('no-scroll');
		var db_portfolio_item = $(this).data("mod");

		$.each(db_portfolio_items, function(i, obj) {
		    if (obj === db_portfolio_item) {
		        $('.' + obj).fadeIn();
		    } else {
		        $('.' + obj).css({'display': 'none'});
		    }
		});
	});

	$('.db-close-portfolio-item-modal').on('click', function() {
		$('.portfolio-item-modal-overlay').css({'display': 'none'});
		$('.modal-wrapper').removeClass('open');
		$('body').removeClass('no-scroll');
	});
});