import ReqAnimate from '../../assets/js/reqAnimate.js';
import tween from '../../assets/js/tween.js';
import async from '../../assets/js/async.js';
import $ from 'jquery';

window.async = async;

export default {
    data: function () {
        return {
            msg: 'Scroller'
        }
    },
    mounted: function() {
        var animate = new ReqAnimate;
        var stopAnimate;
        var lastY, nowY, startY, startItemY;

        $(".scroller-container").delegate('.scroller-item', 'touchmove', function(e) {

            $('.scroller-touch-point').css({
                top: e.originalEvent.targetTouches[0].clientY - $('.touch-container')[0].offsetTop,
                left: e.originalEvent.targetTouches[0].clientX - $('.touch-container')[0].offsetLeft
            });

            var y = parseFloat(nowY) - startY + startItemY;

            $(".scroller-item").css({
                "transform": "translateY(" + y + "px)"
            })

        });

        $(".scroller-container").delegate('.scroller-item', 'touchstart', function(e) {
            
            $('.scroller-touch-point').css({
                top: e.originalEvent.targetTouches[0].clientY - $('.touch-container')[0].offsetTop,
                left: e.originalEvent.targetTouches[0].clientX - $('.touch-container')[0].offsetLeft
            });

            action(50, function(t, stop) {

                if (t == 1) {
                    console.log('startY:' + $('.scroller-touch-point').css("top"));
                    startY = parseFloat($('.scroller-touch-point').css("top"));
                    startItemY = getOriginY('.scroller-item');

                    $(".scroller-item").css({
                        "transform": "translateY(" + startItemY + "px)"
                    })
                };

                if (t >= 2) {
                    lastY = nowY;
                    nowY = $('.scroller-touch-point').css("top");
                } else {
                    lastY = nowY = $('.scroller-touch-point').css("top");
                }
                stopAnimate = stop;
            });

        });

        $(".scroller-container").delegate('.scroller-item', 'touchend', function(e) {
            // nowY = $('.scroller-touch-point').css("top");
            console.log('nowY:' + nowY);
            console.log('lastY:' + lastY);
            stopAnimate && stopAnimate();

            var changeY = parseFloat(nowY) - parseFloat(lastY);
            
            console.log('speed:' + (changeY/50) + ' px/ms');
            if (Math.abs(changeY/50) > .02) scroll(changeY/50 * 16.666666);
            
        });

        function scroll(v) {
            var v = v || 0; // 速度
            var a = v > 0 ? -.7 : .7; // 加速度
            var aY, bY;
            var originY = getOriginY('.scroller-item');
            aY = originY;
            // var totalY = 0;

            animate.action(function(t, stop) {
                var Y = v * t + a / 2 * t * t + originY;

                if (t >= 2) {
                    aY = bY;
                };

                bY = Y;

                if (bY - aY)
                // console.log(bY - aY);

                if (t >= 3 && Math.abs(bY - aY) <= 1) {
                    stop();
                }

                if (t >= 3) {
                    $('.scroller-item').css({
                        "transform": "translateY(" + Y + "px)"
                    })
                }
                    
                if (Y > 0) {
                    stop();
                    $('.scroller-item').css({
                        "transform": "translateY(" + 0 + "px)"
                    })
                }
                
            })
        }
    },
    methods: {
       
    }
};

function getOriginY(el) {
    var resY = 0;
    $(el)[0].style["transform"].split(" ").forEach(function(item) {
        if (item.indexOf('translateY') > -1) {
            resY = parseFloat(item.substring(11));
        }
    });

    return resY;
}

function action(speed, callback) {
    var t = 0;
    var callback = callback;
    var timer;

    if (typeof speed === 'function') {
        callback = speed;
        var speed = 16.66666666666667;
    } else {
        var speed = speed;
    };

    var act = function() {
	 	timer = setTimeout(act, speed);

        if (callback) {
            callback(t++, stop);
        };
        
    };

    act();

    function stop() {
        clearTimeout(timer);
    };
};