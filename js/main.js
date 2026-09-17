(function ($) {
    "use strict";
    
    // loader
    var loader = function () {
        setTimeout(function () {
            if ($('#loader').length > 0) {
                $('#loader').removeClass('show');
            }
        }, 1);
    };
    loader();
    
    
    // Initiate the wowjs
    new WOW().init();
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    
    
    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.navbar').addClass('nav-sticky');
        } else {
            $('.navbar').removeClass('nav-sticky');
        }
    });
    
    
    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });
    
    
    // Typed Initiate
    if ($('.hero .hero-text h2').length == 1) {
        var typed_strings = $('.hero .hero-text .typed-text').text();
        var typed = new Typed('.hero .hero-text h2', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }
    
    
    // Skills
    $('.skills').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // "Get Involved" choice cards -> tailor the signup form
    var $formWrap = $('#signup-form-wrap');
    var $statusText = $('#signup-status-text');
    var $heading = $('#signup-heading');
    var $interestSelect = $('#signup-interest');
    var $cards = $('.choice-card');

    // Hide the form by default only when JS is available (progressive
    // enhancement: if JS fails to load, the form stays visible so nobody
    // gets stuck).
    if ($formWrap.length) {
        $formWrap.addClass('form-hidden');
    }

    var headingByInterest = {
        'Spread the Word': 'Sign Up To Spread The Word',
        'Volunteer': 'Sign Up To Volunteer',
        'Host an Event': 'Sign Up To Host An Event',
        'Just Have a Question': 'Send Tashia A Message'
    };

    function selectChoice(interest) {
        $cards.removeClass('choice-selected').attr('aria-pressed', 'false');
        $cards.filter('[data-interest="' + interest + '"]').addClass('choice-selected').attr('aria-pressed', 'true');

        if ($interestSelect.length) {
            $interestSelect.val(interest);
        }
        if ($heading.length) {
            $heading.text(headingByInterest[interest] || 'Sign Up Or Send A Message');
        }
        if ($statusText.length) {
            $statusText.html('You selected: <strong>' + interest + '</strong> — <button type="button" id="signup-status-change" class="link-btn">choose differently</button>');
        }

        $formWrap.removeClass('form-hidden');

        setTimeout(function () {
            $('html, body').animate({
                scrollTop: $formWrap.offset().top - 90
            }, 800, 'easeInOutExpo');
        }, 150);
    }

    $cards.on('click', function () {
        selectChoice($(this).data('interest'));
    });

    $cards.on('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            selectChoice($(this).data('interest'));
        }
    });

    // "Jump straight to the form" without pre-selecting a card
    $(document).on('click', '#signup-status-fallback', function () {
        $formWrap.removeClass('form-hidden');
        setTimeout(function () {
            $('html, body').animate({
                scrollTop: $formWrap.offset().top - 90
            }, 800, 'easeInOutExpo');
        }, 150);
    });

    // "Choose differently" resets back to the card picker
    $(document).on('click', '#signup-status-change', function () {
        $cards.removeClass('choice-selected').attr('aria-pressed', 'false');
        if ($interestSelect.length) {
            $interestSelect.val('');
        }
        if ($heading.length) {
            $heading.text('Sign Up Or Send A Message');
        }
        if ($statusText.length) {
            $statusText.html('Select an option above to get started, or <button type="button" id="signup-status-fallback" class="link-btn">jump straight to the form</button>.');
        }
        $('html, body').animate({
            scrollTop: $('#price .choice-instructions').offset().top - 90
        }, 800, 'easeInOutExpo');
    });

})(jQuery);

