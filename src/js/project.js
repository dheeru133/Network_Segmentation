/*
 * @Author: Dheeraj Chaudhary 
 * @Date: 2018-04-06 16:02:09 
 * @Last Modified by: Dheeraj.Chaudhary@contractor.hallmark.com
 * @Last Modified time: 2018-04-10 09:37:50
 */

// const jQuery = require('jquery');
jQuery(document).ready(function($) {
    // Cardousel Trigger
    $('.carousel').carousel({
        interval: 1000,
        keyboard: true,
        pause: 'hover',
        wrap: true
    });
    //Carousel Trigger
    var container = $(
        '<div class="table-menu table-menu-hidden"><ul class="list-unstyled"/></div>'
    );

    var table = $('table');
    // table.addClass('enhanced');
    // table.addClass('enhanced');

    debugger;
    $('thead th').each(function(i) {
        var th = $(this),
            id = th.attr('id'),
            classes = th.attr('class'); // essential, optional (or other content identifiers)

        // assign an ID to each header, if none is in the markup
        if (!id) {
            id = 'col-' + i;
            th.attr('id', id);
        }

        // loop through each row to assign a "headers" attribute and any classes (essential, optional) to the matching cell
        // the "headers" attribute value = the header's ID
        $('tbody tr').each(function() {
            var cell = $(this)
                .find('th, td')
                .eq(i);
            cell.attr('headers', id);
            if (classes) {
                cell.addClass(classes);
            }
        });
        // create the menu hide/show toggles
        if (!th.is('.persist')) {
            // note that each input's value matches the header's ID;
            // later we'll use this value to control the visibility of that header and it's associated cells
            var toggle = $(
                '<li class="px-2"> <input type="checkbox" name="toggle-cols" id="toggle-col-' +
                i +
                '" value="' +
                id +
                '" /> <label for="toggle-col-' +
                i +
                '">' +
                th.text() +
                '</label></li>'
            );

            // append each toggle to the container
            container.find('ul').append(toggle);
            // assign behavior
            toggle
                .find('input')

            // when the checkbox is toggled
            .change(function() {
                    var input = $(this),
                        val = input.val(), // this equals the header's ID, i.e. "company"
                        cols = $('#' + val + ', [headers=' + val + ']'); // so we can easily find the matching header (id="company") and cells (headers="company")

                    if (input.is(':checked')) {
                        cols.show();
                    } else {
                        cols.hide();
                    }
                })
                // custom event that sets the checked state for each toggle based on column visibility, which is controlled by @media rules in the CSS
                // called whenever the window is resized or reoriented (mobile)
                .bind('updateCheck', function() {
                    if (th.css('display') == 'table-cell') {
                        $(this).attr('checked', true);
                    } else {
                        $(this).attr('checked', false);
                    }
                })
                // call the custom event on load
                .trigger('updateCheck');
        } // end conditional statement ( !th.is(".persist") )
    }); // end headers loop

    $(window).bind('orientationchange resize', function() {
        container.find('input').trigger('updateCheck');
    });

    var menuWrapper = $('<div class="table-menu-wrapper" />');
    // menuBtn = $('<a href="#" class="table-menu-btn">Display</a>');

    // var menuWrapper = $('.table-menu-wrapper');
    // menuBtn = $('.table-menu-btn');

    // menuBtn.click(function() {
    //     container.toggleClass('table-menu-hidden');
    //     return false;
    // });

    menuWrapper.append(container);
    $('.table-menu-wrapper-custom').append(menuWrapper);
    // table.before(menuWrapper); // append the menu immediately before the table
    // assign click-away-to-close event
    $(document).click(function(e) {
        if (!$(e.target).is(container) && !$(e.target).is(container.find('*'))) {
            container.addClass('table-menu-hidden');
        }
    });
});