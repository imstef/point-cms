$(document).ready(function() {
    // Remove preload CSS animation restriction
    setTimeout(function() {
        $("body").removeClass("preload");
    }, 200);

    // Scroll functions
    $(window).scroll(function() {
	    var scrollY = $(window).scrollTop();
        var bottom_limit   = $(window).scrollTop() + $(window).height() == $(document).height();
        var win_height = $(window).height();
        var nav = $('.header-wrapper');

        // If the viewport is too big, show a static nav bar, else show a dynamic nav indicator
        if (win_height > 1000) {
            nav.fadeIn(0);
            $('.main-nav').each(function(i, obj) {
               $(obj).removeClass('current-nav-item');
            });
        } else {
            if (scrollY > 10) {
                nav.fadeIn(450);
            } else {
                nav.fadeOut(450);
            }

            // Dynamically set current section nav indicator
            currentNavItem(bottom_limit);
        }
	});

    /**
     * Portfolio items nav bar that shows/displays current section with the appropriate
     * nav indicator in the portfolio nav bar.
     */

    // Defaults
    $('.nav-item-section-1').addClass('current-nav-item');
    $('.portfolio-section-1').fadeIn(850);

    // First section
    $('.nav-item-section-1').on('click', function() {
        $(this).addClass('current-nav-item');
        $('.nav-item-section-2').removeClass('current-nav-item');
        $('.nav-item-section-3').removeClass('current-nav-item');
        $('.portfolio-section-2').css({ 'display': 'none' });
        $('.portfolio-section-3').css({ 'display': 'none' });
        $('.portfolio-section-1').fadeIn(850);
    });

    // Second section
    $('.nav-item-section-2').on('click', function() {
        $(this).addClass('current-nav-item');
        $('.nav-item-section-1').removeClass('current-nav-item');
        $('.nav-item-section-3').removeClass('current-nav-item');
        $('.portfolio-section-1').css({ 'display': 'none' });
        $('.portfolio-section-3').css({ 'display': 'none' });
        $('.portfolio-section-2').fadeIn(850);
    });

    // Third section
    $('.nav-item-section-3').on('click', function() {
        $(this).addClass('current-nav-item');
        $('.nav-item-section-1').removeClass('current-nav-item');
        $('.nav-item-section-2').removeClass('current-nav-item');
        $('.portfolio-section-1').css({ 'display': 'none' });
        $('.portfolio-section-2').css({ 'display': 'none' });
        $('.portfolio-section-3').fadeIn(850);
    });

    /**
     * Portfolio item preview functionality
     */
    $('.item-content-wrapper').hover(function() {
        $(this).find('div.item-preview').fadeIn(350);
    }, function() {
        $(this).find('div.item-preview').fadeOut(350);
    });

    /**
     * Portfolio item preview modal
     */
    var projects = [];
    $('.item-toggle-modal:not(.inverse-icon)').each(function() {
        projects.push($(this).data("mod"));
    });

    $('.item-toggle-modal').on('click', function() {
        $('.item-preview-modal').fadeToggle();
        $('.modal-wrapper').toggleClass('open');
        $('body').toggleClass('no-scroll');
        $('.item-preview').css({ 'display': 'none' });

        var project = $(this).data("mod");

        $.each(projects, function(i, obj) {
            if (obj === project) {
                $('.' + obj).fadeIn();
                console.log(obj);
            } else {
                $('.' + obj).css({'display': 'none'});
            }
        });
    });

    /**
     * Managing how a section displays using a CSS grid system
     * @type {*|jQuery}
     */
    var portfolio_sections = [];
    var num_items = [];
    $('[class*=\'portfolio-section\']').each(function() {
        portfolio_sections.push($(this));
        num_items.push($(this).data("numitems"));
    });

    console.log(num_items);

    $.each(portfolio_sections, function(i, elem) {
        var elem_items = parseInt(num_items[i]);

        switch(elem_items) {
            case 3:
                elem.find('.column-4').addClass('column-4');
                break;
            case 2:
                elem.find('.column-4').addClass('column-6');
                break;
            case 1:
                elem.find('.column-4').addClass('column-12');
                break;
            default:
                console.log("Max number of portfolio items per row is 3")
                break;
        }
    });
});

/*
 * Helper functions
 *
*/

// Function to detect whether an element is visible in the viewport
function isVisible(el) {
	var scrollPosition = $(window).scrollTop();
	var windowHeight = $(window).height();
	var elementTop = $(el).offset().top;
	var elementHeight = $(el).height();
	var elementBottom = elementTop + elementHeight;

	// Check whether element is in current viewport for the user, and is not at the bottom or the top (the user didn't pass it)
	return ((elementBottom - elementHeight * 0.25 > scrollPosition) && (elementTop < (scrollPosition + 0.5 * windowHeight)));
}

// Function to manage the nav indicator movement through the nav items
function currentNavItem(bottom) {
	if (isVisible($('#welcome'))) {
		$('.nav-item-welcome').addClass('current-nav-item reveal');
		$('.nav-item-portfolio').removeClass('current-nav-item');
		$('.nav-item-testimonials').removeClass('current-nav-item');
		$('.nav-item-connect').removeClass('current-nav-item');
	} else if (isVisible($('#portfolio'))) {
		$('.nav-item-portfolio').addClass('current-nav-item reveal');
		$('.nav-item-welcome').removeClass('current-nav-item');
		$('.nav-item-testimonials').removeClass('current-nav-item');
		$('.nav-item-connect').removeClass('current-nav-item');
	} else if (isVisible($('#testimonials'))) {
		$('.nav-item-testimonials').addClass('current-nav-item reveal');
		$('.nav-item-portfolio').removeClass('current-nav-item');
		$('.nav-item-connect').removeClass('current-nav-item');
		$('.nav-item-welcome').removeClass('current-nav-item');
		if (bottom) {
            $('.nav-item-connect').addClass('current-nav-item reveal');
            $('.nav-item-testimonials').removeClass('current-nav-item');
            $('.nav-item-welcome').removeClass('current-nav-item');
            $('.nav-item-portfolio').removeClass('current-nav-item');
        }
	} else if (isVisible($('#connect'))) {
		$('.nav-item-connect').addClass('current-nav-item reveal');
		$('.nav-item-testimonials').removeClass('current-nav-item');
		$('.nav-item-welcome').removeClass('current-nav-item');
		$('.nav-item-portfolio').removeClass('current-nav-item');
	}
}