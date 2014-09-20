//called on document ready
$(function() {
    //load fancybox image viewer plugin
    if ($.fn.fancybox) {
        $(".fancybox").fancybox({
            openEffect: 'elastic',
            closeEffect: 'elastic',
            prevEffect: 'fade',
            nextEffect: 'fade',
            maxWidth: '85%',
            maxHeight: '85%',
            padding: 0,
            closeBtn: false,
            helpers: {
                title: {
                    type: 'float'
                },
                thumbs: {
                    width: 50,
                    height: 50
                }
            }
        });
    }

    //open links in new window
    $("a.new_window").click(function(event){
        window.open(this.href);
        //consume event
        event.preventDefault();
    });

    //fixed navigation bar when scrolling
    $(window).on('scroll', function() {
        var scrollTop = $(window).scrollTop();
        var header_height = $('#header').outerHeight();

        if (scrollTop > header_height) {
            $('#navigation_bar').addClass('navigation_fixed');
            $('body').css('padding-top', $('#navigation_bar').outerHeight());
            resizeNavigationBar();
        } else {
            $('#navigation_bar').removeClass('navigation_fixed');
            $('body').css('padding-top', 0);
        }
    });

    //page-specific scroll handler
    $(window).on('scroll', scrollHandler);


    //smooth scroll to id - navigation bar height
    if(window.location.hash) {
        scroll_to_id(window.location.hash);
    }

    //image selector - change main image on image row hover
    $('.image_row a').hover(function () {
        var image_link = $(this);
        var id = '#' + image_link.attr('rel');

        //change image source
        var main_image_id =  id + '_mainimage';
        $(main_image_id).attr('src', image_link.attr('href'));

        //set click listener
        var overlay_id = id + '_overlay';
        $(overlay_id).click(function(event) {
            image_link.click();
            event.preventDefault();
        });
    });

    //main image's initial click listener
    $('.mainimage_overlay').click(function(event) {
        var rel = $(this).attr('rel');
        //click first image
        $('.image_row a[rel=' + rel +']').children(':first').click();
        event.preventDefault();
    });
});

//window resize listener
$(window).resize(function() {
    resizeNavigationBar();
});

//sets navigation bar width
function resizeNavigationBar() {
    var navbar = $('#navigation_bar');
    var content = $('#content');
    navbar.outerWidth(content.width());
    navbar.css('left', content.offset().left);
}

//smooth scroll to id
function scroll_to_id(id) {
    $(window).off('scroll', scrollHandler);
    $(id).scrollView();
}
$.fn.scrollView = function () {
    return this.each(function () {
        $('html, body').animate(
            {
            scrollTop: $(this).offset().top - $('#navigation_bar').outerHeight() + 1
            }, 
            400, 
            registerScrollHandler
        );
    });
};

function registerScrollHandler() {
    $(window).on('scroll', scrollHandler);
    scrollHandler();
}

//move element up
function move_up(element){
    element.style.position="relative";
    element.style.top="-4px";
}

//move element to original position
function move_back(element){
    element.style.top="0px";
}
