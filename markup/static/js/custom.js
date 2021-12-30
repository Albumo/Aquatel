$(document).ready(function () {
    var $burger = $(".js-header-burger");
    var $nav = $(".js-header-toggle nav");
    $burger.on("click", function () {
        $(this).toggleClass("open");
        $(".header").toggleClass("open");
        $nav.toggleClass("open");
        $("body").toggleClass("fixed-position");
    });

    $(window).scroll(function () {
        var height = $(window).scrollTop();

        if (height > 50) {
            $(".js-header").addClass("is-scroll");
        } else {
            $(".js-header").removeClass("is-scroll");
        }
    });
});