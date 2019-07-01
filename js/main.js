(function () { 

    var init = function () {
        scrollControl();
        $(".hamburger").on('click', menuActive);
        $(".link_menu, .mask").on('click', menuDeactivate);
    };

    var scrollControl = function () {
    
        var target, scroll;
    
        $(".link_menu[href*=\\#]:not([href=\\#])").on("click", function (e) {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                target = $(this);
                scroll = ($("[id='" + target.attr("href").replace("#", "") + "']").offset().top);
    
                if (target.length) {
                    if (typeof document.body.style.transitionProperty === 'string') {
                        e.preventDefault();
    
                        var avail = $(document).height() - $(window).height();
    
                        if (scroll > avail) {
                            scroll = avail;
                        }
    
                        $("html, body").animate({
                            scrollTop: scroll - 67
                        }, 500).data("transitioning", true);
                    } else {
                        $("html, body").animate({
                            scrollTop: scroll
                        }, 500);
                        return;
                    }
                }
            }
        });
    
        $("html").on("transitionend webkitTransitionEnd msTransitionEnd oTransitionEnd", function (e) {
            if (e.target == e.currentTarget && $(this).data("transitioning") === true) {
                $(this).removeAttr("style").data("transitioning", false);
                $("html, body").scrollTop(scroll);
                return;
            }
        });
    
    };

    var menuActive = function () {
        if ($("aside").hasClass('active')) {
            menuDeactivate();
        } else {
            menuActivate();
        }
    }

    var menuActivate = function () {
        $("aside").addClass('active');
        $(".hamburger").addClass('is-active');
        // $("body").addClass('no_scroll');
    }

    var menuDeactivate = function () {
        $("aside").removeClass('active');
        $(".hamburger").removeClass('is-active');
        // $("body").removeClass('no_scroll');
    }

    $(document).ready(init);
})();
