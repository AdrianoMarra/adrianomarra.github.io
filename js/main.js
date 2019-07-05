(function () { 

    const init = function () {
        scrollControl();
        $(".link_menu, .mask, .hamburger").on('click', menuActive);
    };

    const scrollControl = function () {
    
        var target, scroll;
    
        $("a[href*=\\#]:not([href=\\#])").on("click", function (e) {
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
        document.getElementsByTagName("aside")[0].classList.toggle('active');
        document.getElementsByClassName("hamburger")[0].classList.toggle('is-active')
    }

    window.onload = init;
})();
