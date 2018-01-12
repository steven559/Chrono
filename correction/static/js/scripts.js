(function($) {
    var $f = $('#change-time'),
        $s = $('#set-time'),
        $c = $('#counter'),
        $min = $('.counter-min', $c),
        $sec = $('.counter-sec', $c),
        $a = $('#end-timer'),
        timeRest = 0;

    /*****************/
    /* INITIALISATIONS
    /* */
    /* Init interval */
    var interval = {
        start : function(fct) {
            if(!interval.value) {
                interval.value = setInterval(fct, 1000);
            }
        },
        stop : function() {
            if(interval.value) {
                clearTimeout(interval.value);
                interval.value = null;
            }
        },
        value : null
    };

    /* Init countdown */
    var countdown = {
        start : function(isBegin) {
            if(isBegin) {
                $('.last-time', $c).removeClass('last-time');
                timeRest = $s.data('time');
            }

            interval.start(countdown.loop);
        },
        stop : function(isEnd) {
            if(isEnd) {
                $a[0].play();
                $('.counter-box',$c).click(function() {
                    countdown.start(true);
                });
            }
            interval.stop();
        },
        loop : function() {
            var min = Math.floor(timeRest/60),
                sec = timeRest%60;

            min = min.toString().length == 1 ? "0" + min : min;
            sec = sec.toString().length == 1 ? "0" + sec : sec;

            $min.text(min);
            $sec.text(sec);

            if(timeRest == 0) {
                countdown.stop(true);
            } else if(timeRest < 5) {
                $('.counter-box', $c).addClass('last-time');
            }

            timeRest --;
        }
    };

    /*****************/
    /* FUNCTIONS
    /* */
    /* Change timer viewer */
    var setHeadTime = function() {
        var min = Math.floor(timeRest/60),
            sec = timeRest%60,
            html = "";

        if(min>0) {
            html += min + ' minute' + (min>9 ? 's' : '') + ' ';
        }
        if(sec>0) {
            html += sec + ' seconde' + (sec>9 ? 's' : '');
        }

        $s.attr('data-time',timeRest).find('span').html(html);
    };
    var setMainTime = function() {
        var min = Math.floor(timeRest/60),
            sec = timeRest%60;

        min = min.toString().length == 1 ? "0" + min : min;
        sec = sec.toString().length == 1 ? "0" + sec : sec;

        $min.text(min);
        $sec.text(sec);
    };

    /*****************/
    /* BIND ELEMENTS
    /* */
    /* Start countdown */
    $('.js-starter', $c).click(function() {
        $(this).fadeOut(500,function() {
            $('.js-countdown').fadeIn(500,function() {
                countdown.start(true);
            });
        });

    });
    /* Play/pause button */
    $('.js-stop', $c).click(function() {
        var $t = $(this);

        if(interval.value) {
            countdown.stop();
            $('.btn-pause', $t).attr('aria-hidden', 'true');
            $('.btn-play', $t).attr('aria-hidden', 'false');
        } else {
            countdown.start();
            $('.btn-pause', $t).attr('aria-hidden', 'false');
            $('.btn-play', $t).attr('aria-hidden', 'true');
        }
    });
    /* Restart button */
    $('.js-start', $c).click(function() {
        countdown.start(true);
    });

    /* Show form */
    $('button', $s).click(function() {
        $s.add($f).toggleClass('show');
    });

    /* Label effect on form inputs */
    $.fn.setVal = function(add) {
        var $elem = $(this).parent();

        if(add) {
            $elem.addClass('hasVal');
        } else {
            $elem.removeClass('hasVal');
        }
    };
    $('[type="number"]', $f).on('change', function() {
        $(this).setVal(true);
    }).focusin(function() {
        $(this).setVal(true);
    }).focusout(function() {
        $(this).setVal(!!$(this).val());
    });

    /* Change set time */
    $f.on('submit', function() {
        var newMin = parseInt($('#minutes').val()) || 0,
            newSec = parseInt($('#seconds').val()) || 0;

        /* Set timeRest */
        timeRest = (newMin*60) + newSec;
        localStorage.setItem('timer', timeRest);

        /* Set data-time */
        setHeadTime();
        setMainTime();

        /* Hide form */
        $s.add($f).toggleClass('show');

        return false;
    });

    /*****************/
    /* INIT PAGE
    /* */
    /* Init input val */
    $('[type="number"]', $f).setVal(!!$('[type="number"]', $f).val());

    /* Init timer */
    timeRest = localStorage.getItem('timer') || 60;
    setHeadTime();
    setMainTime();
})(jQuery);
