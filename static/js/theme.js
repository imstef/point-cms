/**
 *
 * This is the main JavaScript file that contains different types of functionalities for the official
 * theme of the CMS. It handles dynamic and manual navigation, hover state on portfolio items and 
 * modal functionality, dynamic centering of portfolio items using a CSS grid system, and portfolio
 * categories/sections navigation that toggles specific sections that are selected from the 
 * portfolio navigation.
 *
 * @package moonbow
 * @link https://github.com/imstef/moonbow-cms
 *
**/
$(document).ready(function() {
    /**
     *
     * Main Navigation Functionality
     *
     * We dynamically add classes from item-1 to item-n to all main nav li elements, and add a
     * section-n (where n starts from 1), to all sections.
     *
     * The main nav has two different states: manual nav mode and dynamic mode. The dynamic nav mode
     * happens whenever a user is scrolling through the page, and can be interrupted at any the when
     * a user clicks on any of the main nav items - which triggers manual mode. 
     *
     * Manual mode will stay active as long as the user is clicking through the items, but once a scroll 
     * event occurs, manual mode will be interrupted, and dynamic mode will become active.
     *
     * Both modes place an indicator for the current nav item that's visible or selected. Manual mode is
     * simpler in functionality, as it only registers which nav item has been clicked, and places a current
     * indicator bellow it.
     *
     * Dynamic mode is more complicated, as it depends on how the user scrolls, and which sections are
     * visible in the view-port depending on whether the user has scrolled into the element. There are 
     * 3 key parts to how this works:
     *
     *   - First nav item
     *
     *     As long the user scroll is less than 100 pixels, the first nav item will become current,
     *     and the class that draws the current nav indicator will be removed to all other elements.
     *     Once this executes, we will interrupt the code by returning nothing, and thus, exiting the
     *     scroll callback function. This means that only when user scrolls more than 100 pixels, we can
     *     continue with crawling and marking the next items in the navigation.
     *
     *   - Middle nav items
     *
     *     This step beings whenever user scrolls more than 100 pixels, and it begins looping through
     *     all the sections to see which one is visible using a isVisible() helper function. Since 
     *     this function returns true or false when a scroll enters a given section, we can place a 
     *     current nav indicator to the element that  is currently visible in the view-port using a simple
     *     conditional logic. Whenever we place a CSS  class for current nav item, we remove that same class
     *     from the other items - may they have it. 
     *     This ensures that only 1 nav items is marked as current, and that item is connected with the 
     *     visible section in the view-port. But there can be visible more than 1 section, and the larger 
     *     the screen, the more sections will return true when tested whether they are visible or not. 
     *     Because of this, only the LAST visible section will be marked as current in the navigation.
     *     Since we are in a loop, if section-2 returns true, and section-3 returns true for visible,
     *     the section-3 nav item will overwrite section-2 nav, and thus, become the active one. This will
     *     result in setting section-3 nav item as current and removing the current-nav-item CSS class to
     *     every other nav item that had it before (which is section-2 exactly 1 loop iteration before).
     *     
     *   - Last nav item
     * 
     *     The last nav item is triggered whenever a user scroll touches the bottom of the view-port. If
     *     this occurs, the last nav item in the list is marked as current, following the same logic
     *     from above.
     *
     * If the user hasn't started scrolling, the main navigation will remain hidden and won't reveal unless
     * there are 10 pixels scrolled.
     *
    **/
    var nav_elems = [];
    var sections = [];
    var main_nav_item;
    var first_nav_item;
    var last_nav_item;
    var top_limit = 100;
    var manual_nav = false;

    $('.main-nav-item').each(function() {
        nav_elems.push($(this));
    });

    $.each(nav_elems, function(i, obj) {
        var li_num = i + 1;
        obj.addClass('item-' + li_num);
    });

    $('.site-section').each(function(i) {
        sections.push($(this).attr('id'));
        $(this).addClass('section-' + ++i);
    });

    first_nav_item = 1;
    last_nav_item = sections.length;
    
    main_nav_item = $('.main-nav-item');
    main_nav_item.on('click', function() {
        manual_nav = true;
        main_nav_item.each(function() {
            main_nav_item.removeClass('current-nav-item');
        });

        $(this).addClass('current-nav-item');
    });

    $(window).scroll(function() {
	    var scrollY = $(window).scrollTop();
        var win_height = $(window).height();
        var bottom_reached = scrollY + win_height == $(document).height();
        var nav = $('.header-wrapper');

        if (scrollY > 10) {
            nav.fadeIn(450);
        } else {
            nav.fadeOut(450);
        }
        
        if (manual_nav) {
            manual_nav = false;
        } else {
            if (scrollY < top_limit) {
                $('.item-' + first_nav_item).addClass('current-nav-item');
                $('.main-nav-item:not(.item-' + first_nav_item).each(function() {
                    $(this).removeClass('current-nav-item');
                });
                return;
            }

            for (var i = 0; i < sections.length; i++) {
                var nav_item = i + 1;
                if (isVisible('#' + sections[i])) {
                    $('.item-' + nav_item).addClass('current-nav-item');
                    $('.main-nav-item:not(.item-' + nav_item + ')').each(function(i, obj) {
                        $(this).removeClass('current-nav-item');
                    });
                }
            }

            if (bottom_reached) {
                $('.item-' + last_nav_item).addClass('current-nav-item');
                $('.main-nav-item:not(.item-' + last_nav_item + ')').each(function(i, obj) {
                    $(this).removeClass('current-nav-item');
                });
                return;
            }
        }
	});

    /**
     *
     * Hover State on Portfolio Item Elements and Portfolio Item Modal Functionality
     *
     * Whenever a user hovers certain portfolio item, we will display the preview item div that contains
     * additional information about the hovered portfolio item. As the user hovers out of the element
     * we will slowly hide the preview item div back it its default state.
     *
     * While the hover is active, a user can optionally open up a modal window, which displays detailed
     * information about the portfolio item in question. There is a unique data-mod attribute in each
     * portfolio item's open modal span. The value in this span's data-mod attribute is directly
     * associated with a portfolio item wrapper in the item preview modal window. So whenever we click 
     * on a  open modal icon, the modal opens, and then we match the value in the data-mod attribute with
     * the appropriate div that wraps the portfolio item. 
     * For example, if we click on a "open modal" span element with data-mod value of portfolio-item-1,
     * we will check in a loop which div in the preview modal matches portfolio-item-1, and display that 
     * div, while we  hide the rest.
     *
     * Note that when a modal window is opened, we add a CSS class no-scroll to make the window scroll
     * apply only to the active modal's content, and not the entire page. When we close the modal, we remove 
     * that class, and the scroll functionality is returned at its default state, which allows users to
     * scroll through the entire website from top to bottom.
     *
     * Only one portfolio item can be opened at a time. While a portfolio item is open, the other portfolio 
     * items that lie in the item preview modal are hidden.
     *
     * When a modal is opened, there are 3 ways a user can close it. The first option is to click on the
     * "X" button in the top right corder, the second is to click anywhere outside of the modal-wrapper div
     * and the third is to press the ESC button on the keyboard. When we click on a span to open a modal
     * we set the item-preview div to be hidden again (hovered out), just so that when the modal exists,
     * everything is in the default state.
     *
     * For the first option, we simply toggle a CSS class that translates the modal-wrapper 100% in Y and
     * reverse. For the second option, we add a click event on the window object, and watch for a click
     * while the item preview modal is open. If the click is registered on the item preview modal itself
     * and not the modal wrapper or content, we know that the user has clicked outside of the content
     * area and wants to close the modal. That's why we fadeOut the modal overlay and remove the
     * CSS open class of the modal wrapper (which takes that div back to 100% Y - which is basically
     * out of our screen). The third option is by pressing the ESC key, and we simply add a listener
     * to watch over the keyCode that's associated with ESC which is 27. If the user presses that
     * key, we do the same exact thing: hide the overlay and remove the class of the modal wrapper.
     *
     *
    **/
    var portfolio_items = [];

    $('.item-content').hover(function() {
        $(this).find('.item-preview').fadeIn(350);
    }, function() {
        $(this).find('.item-preview').fadeOut(350);
    });

    $('.item-toggle-modal:not(.inverse-icon)').each(function() {
        portfolio_items.push($(this).data("mod"));
    });

    $('.item-toggle-modal').on('click', function() {
        $('.item-preview-modal').fadeToggle();
        $('.modal-wrapper').toggleClass('open');
        $('body').toggleClass('no-scroll');
        $('.item-preview').css({ 'display': 'none' });
        var portfolio_item = $(this).data("mod");

        $.each(portfolio_items, function(i, obj) {
            if (obj === portfolio_item) {
                $('.' + obj).fadeIn();
            } else {
                $('.' + obj).css({'display': 'none'});
            }
        });
    });

    $(window).on('click', function(e) {
        if (e.target == $('.item-preview-modal')[0]) {
            $(".item-preview-modal").css({'display': 'none'});
            $('.modal-wrapper').removeClass('open');
            $('body').removeClass('no-scroll');
        }
    });

    $(document).keyup(function(e) {
      if (e.keyCode === 27) {
        $(".item-preview-modal").css({'display': 'none'});
        $('.modal-wrapper').removeClass('open');
        $('body').removeClass('no-scroll');
      }
    });


    /**
     *
     * Portfolio Sections Dynamic Grid and Navigation Functionality by Category
     *
     * Similar to what we did in the main navigation, we dynamically add a different class to each
     * portfolio nav item from item-1 to item-n - depending on how many elements there are. We also
     * add a unique class to each of the portfolio sections depending on their category, so for example
     * the first portfolio-section is related to the web category, and will have a sections-web class.
     *
     * In order to have centered number of portfolio items no matter how many projects are in a given
     * category, we are adding different classes from the grid. This functionality depends on the
     * portfolio section item count, which we calculate dynamically, and push the value in an array.
     *
     * All portfolio items will have a default column-4 element as a wrapper. We will override this
     * CSS class depending on the item count.
     *
     * The default behavior of the grid is to have 3 projects in a row, which are three column-4
     * elements, but that can vary from category to category. So we need to make sure we add a proper
     * CSS class in case there are two or one portfolio items.
     *
     * That's why we are saving the item count in an HTML-5 attribute data-numitems, which will help us to
     * set the proper CSS class from the grid. For example, if a portfolio-section div has data-numitems
     * attribute with value of 2, this means that we have 2 portfolio items in that section. If we have two
     * portfolio items, we need a two column-6 grid, where each item will fall within one column-6 element.
     * 
     * If we have 1 portfolio item in a section, then we append a column-12 element to the item. In case you're
     * wondering how this works, if you have a .column-4 class that has a width of 33.33% width, and then add
     * on a column-12 that has a 100% width, the class that's added afterwards will overwrite the width
     * property of the element in question.
     *
     * As far as the navigation goes, we are dynamically placing the current nav to be the first category, and
     * fade in the first category portfolio items on page load. Then, on a click on the portfolio nav, the
     * current nav item indicator is set to the clicked li item, and removed everywhere else. Once that's done
     * we loop through each portfolio section, and try to match a section with a nav using the
     * section-<nav-item-name> class. If it is a match, fade in the section, otherwise hide it. This will be
     * true once per item click, and will result in showing all projects within a certain portfolio category.
     *
     * For example, if we click on portfolio nav item at index 1, which is games, we place the CSS class
     * current-nav-item to the li item games, and then in the loop, we try to find a match for the portfolio
     * section that's related to the portfolio nav item. The loop will start from 0, and loop through all
     * sections (let's say 3 in total). At i=0, we check whether the first nav li element has the current
     * item class, and that would be false, thus, we will hide the element associated with that iteration. 
     * At i=1, we check whether the second nav element has the class, which would be true in our example,
     * and since that's true, we fade in the element's content (portfolio-section div) that's currently 
     * in the loop at i=1.The loop continues at i=3, which would be false, and we'd hide that portfolio
     * section div as well.
     * 
     * So at the end of the loop, we end up with 1 portfolio section div displayed, while the rest of the
     * divs are hidden. And that div is connected with the nav item that was clicked by mapping out the
     * indexes in the arrays and the current iteration cycle in the loop.
     * 
     * In other words:
     *
     * portfolio_sections[0] maps to portfolio_nav_items[0]
     * portfolio_sections[1] maps to portfolio_nav_items[1]
     * portfolio_sections[2] maps to portfolio_nav_items[2]
     * portfolio_sections[n] maps to portfolio_nav_items[n]
     *
     **/
    var portfolio_sections = [];
    var portfolio_section_items_count = [];
    var portfolio_nav_items = [];
    var portfolio_nav_item_names = [];

    $('.portfolio-nav-item').each(function(i) {
        portfolio_nav_items.push($(this));
        portfolio_nav_item_names.push($(this).text());
        $(this).addClass('portfolio-nav-item-' + ++i);
    });

    $('.portfolio-section').each(function(i) {
        portfolio_sections.push($(this));
    });

    $('.portfolio-section').each(function(i) {
        $(this).addClass('section-' + portfolio_nav_item_names[i]);
    });

    for (var i = 0; i < portfolio_sections.length; i++) {
        var count = $('.section-'+ portfolio_nav_item_names[i]).find('.column-4').length;
        portfolio_section_items_count.push(count);
        if (i == 0) {
            portfolio_nav_items[i].addClass('current-nav-item');
            portfolio_sections[i].fadeIn();
        }
    }

    $('.portfolio-section').each(function(i) {
        $(this).attr("data-numitems", portfolio_section_items_count[i]);
    });

    $.each(portfolio_sections, function(i, obj) {
        var section_items = parseInt(portfolio_section_items_count[i]);

        switch(section_items) {
            case 2:
                obj.find('.column-4').addClass('column-6');
                break;
            case 1:
                obj.find('.column-4').addClass('column-12');
                break;
        }
    });

    $('.portfolio-nav-item').on('click', function() {
        $('.portfolio-nav-item').each(function() {
            $(this).removeClass('current-nav-item');
        });
        $(this).addClass('current-nav-item');

        $.each(portfolio_sections, function(i, obj) {
            if (portfolio_nav_items[i].hasClass('current-nav-item')) {
                obj.fadeIn();
            } else {
                obj.css({'display' : 'none'});
            }
        });
    });
});
    
/**
 *
 * Helper Functions
 *
 * The code bellow is a set of functions that help us abstract code, and make it reusable in different
 * parts of the CMS.
 *
**/

// Check whether element is in current view-port for the user, and is not at the bottom or the top (the user didn't pass it)
function isVisible(el) {
	var scrollPosition = $(window).scrollTop();
	var windowHeight = $(window).height();
	var elementTop = $(el).offset().top;
	var elementHeight = $(el).height();
	var elementBottom = elementTop + elementHeight;

	return ((elementBottom - elementHeight * 0.25 > scrollPosition) && (elementTop < (scrollPosition + 0.5 * windowHeight)));
}


