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


var msg = document.querySelector('.msg');
var gsapMsg = gsap.to('.msg', 0.25, {
    autoAlpha: 1, y: -40, ease: Expo.inOut, paused: true
});
var arrInput = document.querySelectorAll('.aInput');

function send(event, php) {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    for (var i = 0, count = arrInput.length; i < count; i++) {
        arrInput[i].classList.remove('inputerror');
    }
    event.target.querySelector('button').disabled = true;
    showMsg('Wait. Sending...', '#b1b1b1');
    var req = new XMLHttpRequest();
    req.open('POST', php, true);
    req.onload = function () {
        event.target.querySelector('button').disabled = false;
        if (req.status >= 200 && req.status < 400) {
            const json = JSON.parse(this.response);
            if (json.result === 'success') {
                showMsg('Message send', '#36AE46', '1000');
                setTimeout(function () {
                    document.getElementsByClassName('msg')[0].style.opacity = '0';
                }, 2000);
                event.target.reset();
            } else if (json.result === 'email') {
                showMsg('Error. Need email', '#DC352F');
                setTimeout(function () {
                    document.getElementsByClassName('msg')[0].style.opacity = '0';
                }, 2000);
                document.querySelector('#email').classList.add('inputerror');
            }
        } else {
            showMsg('Server error. number: ' + req.status, '#DC352F');
            setTimeout(function () {
                document.getElementsByClassName('msg')[0].style.opacity = '0';
            }, 2000);
        }
    };

    req.onerror = function () {
        showMsg('Error sending request', '#DC352F');
    };
    req.send(new FormData(event.target));
}

function showMsg(message, color) {
    msg.innerText = message;
    msg.style.background = color;
    gsapMsg.restart();
}

function inputFile(e) {
    var el = e.target.parentNode.querySelector('.count');
    if (e.target.value !== '') el.innerHTML = 'Selected files: ' + e.target.files.length;
    else el.innerHTML = 'Select file';
}

for (var i = 0, count = arrInput.length; i < count; i++) {
    arrInput[i].addEventListener('focus', function () {
        this.nextElementSibling.classList.add('active');
    });
    arrInput[i].addEventListener('blur', function () {
        if (this.value === false) { this.nextElementSibling.classList.remove('active'); }
    });
}

window.onload = function () {
    var loadPage = gsap.timeline();
    loadPage.to('#form', 0.7, { autoAlpha: 1, y: 0, ease: Expo.inOut });
};
