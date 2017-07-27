$(document).ready(function() {
    // Remove preload CSS animation restriction
    setTimeout(function() {
        $("body").removeClass("preload");
    }, 200);


    // Main navigation
    // Dynamically set current section nav indicator
    var nav_elems = [];
    var nav_names = [];
    var section_names = [];
    var sections = [];

    // Get all nav items and their values
    $('.main-nav-item').each(function() {
        nav_elems.push($(this));
        nav_names.push($(this).text());
    });

    // Add dynamic class to each of the menu items
    $.each(nav_elems, function(i, obj) {
        var li_num = i + 1; // identical to ++i, but easier to read
        obj.addClass('item-' + li_num);
    });

    // Save each section name, and add a dynamic class to the element
    $('.site-section').each(function(i) {
        section_names.push($(this).attr('id'));
        sections.push($(this));
        $(this).addClass('section-' + ++i);
    });

    var section_count = parseInt(section_names.length);
    var nav_count = parseInt(nav_names.length);
    var first_item, last_item;
    var top_limit = 100;
    var item_click = false;
    var manual_mode = false;

    // Set first, last and middle items
    if (section_count == nav_count) {
        first_item = 1;
        last_item = nav_count;
    }

    // Activate manual mode on nav click
    $('.main-nav-item').on('click', function() {
        manual_mode = true;
        $('.main-nav-item').each(function() {
            $('.main-nav-item').removeClass('current-nav-item');
        })
        $(this).addClass('current-nav-item');
    });

    // Scroll functions
    $(window).scroll(function() {
	    var scrollY = $(window).scrollTop();
        var win_height = $(window).height();
        var bottom_limit = scrollY + win_height == $(document).height();
        var nav = $('.header-wrapper');

        // If the viewport is too big, show a static nav bar, else show a dynamic nav indicator
        if (scrollY > 10) {
            nav.fadeIn(450);
        } else {
            nav.fadeOut(450);
        }
        

        if (manual_mode) {
            console.log("Manual mode!");
            manual_mode = false;
        } else {
            // Dynamic nav indicator
            // First section and nav element
            if (scrollY < top_limit) {
                $('.item-' + first_item).addClass('current-nav-item');
                $('.main-nav-item:not(.item-' + first_item).each(function(i, obj) {
                    $(this).removeClass('current-nav-item');
                });
                //console.log('First item!');
                // Stop the exectution of the scroll callback function
                return;
            }

            // Middle elements
            for (var i = 0; i < section_count; i++) {
                var nav_item = i + 1;
                if (isVisible('#' + section_names[i])) {
                    $('.item-' + nav_item).addClass('current-nav-item');
                    $('.main-nav-item:not(.item-' + nav_item + ')').each(function(i, obj) {
                        $(this).removeClass('current-nav-item');
                    });
                }
            }

            // Last element
            if (bottom_limit) {
                $('.item-' + last_item).addClass('current-nav-item');
                $('.main-nav-item:not(.item-' + last_item + ')').each(function(i, obj) {
                    $(this).removeClass('current-nav-item');
                });
                return;
            }
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
            } else {
                $('.' + obj).css({'display': 'none'});
            }
        });
    });

    /*
     * Managing how a section displays using a CSS grid system
     *
     */
    var portfolio_sections = [];
    var num_items = [];
    $('[class*=\'portfolio-section\']').each(function() {
        portfolio_sections.push($(this));
        num_items.push($(this).data("numitems"));
    });

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
