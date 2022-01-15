$(document).ready(function () {
    var $burger = $('.js-header-burger');
    var $nav = $('.js-header-toggle nav');
    $burger.on('click', function () {
        $(this).toggleClass('open');
        $('.header').toggleClass('open');
        $nav.toggleClass('open');
        $('body').toggleClass('fixed-position');
    });

    $(window).scroll(function () {
        var height = $(window).scrollTop();

        if (height > 50) {
            $('.js-header').addClass('is-scroll');
        } else {
            $('.js-header').removeClass('is-scroll');
        }
    });

    $('.js-to-item').on('click', function () {
        scrollToItem($(this));
        $('.js-header-burger').removeClass('open');
        $('.header').removeClass('open');
        $('.js-header-toggle nav').removeClass('open');
        $('.header__burger-letter').removeClass('open');
        $('.header__nav').removeClass('open');
        $('body').removeClass('fixed-position');
    });
});


// scroll to element
function scrollToItem(elem) {
    var el = $(elem).attr('href').slice(1),
        elToScroll = $(`#${el}`),
        navHeight = ($('.js-header').outerHeight()) + 20,
        time = 600,
        gap = 85,
        offsetTop = elToScroll.offset().top,
        totalScroll = offsetTop - navHeight - gap;
    $('body,html').animate({
        scrollTop: totalScroll
    }, time);

    return false;
}

moveElem();

function moveElem() {
    var blockfrom = $('.js-remove--from').html();
    $('.js-remove--to').html(blockfrom);
    return false;
}
