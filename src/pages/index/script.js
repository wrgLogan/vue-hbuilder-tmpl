import ReqAnimate from '../../assets/js/reqAnimate.js';
import tween from '../../assets/js/tween.js';
import async from '../../assets/js/async.js';
import $ from 'jquery';

window.async = async;

export default {
    data: function () {
        return {
            msg: 'index'
        };
    },
    mounted: function () {

        window.animate = new ReqAnimate;
        var bird = new Bird('.bird');
        var pipe = new Pipe('#pipe1');
        var isMove = false;
        Game.init();
        document.querySelector('body')
        document.querySelector('html').addEventListener("touchstart", function() {
            if (Game.status == 'OVER') {
                bird.stop();
                Game.reset();
                pipe.reset();
                bird.reset();
                return;
            } else if (Game.status == 'READY') {
                pipe.move();
                bird.fly();
                Game.status = 'PLAYING';
                animate.action(function(t, stop) {
                    // console.log(bird.point);
                    if ((bird.point && birdTouchPipe(bird.point, pipe)) || bird.y >= bird.maxY) {
                        
                        if (Game.count > Game.maxCount) {
                            Game.maxCount = Game.count;
                            $('#maxCount').text('最高分: ' + Game.maxCount);
                            localStorage.maxCount = Game.maxCount;
                        };

                        $('.over').fadeIn();
                        $('.over').find('.point').text(Game.count);
                        Game.status = 'OVER';
                        bird.fly();
                        pipe.stop();
                        stop();
                    };

                    onCross(bird.point, pipe, function() {
                        $('#currentCount').text('当前分: ' + (++Game.count));
                    });
                })
            } else if (Game.status == 'PLAYING') {
                bird.fly();
            }
        }, false);

        

    },
    methods: {
        run: function (el) {

            async(function () {
                var step = this;
                animate.transform(el, {
                    'translateY': {
                        'value': 300,
                        'easing': 'easeIn'
                    },
                    'translateX': 100,
                    'rotate': 360 * 6,
                    'scale': {
                        'value': .4,
                        'easing': 'easeOut',
                        'curve': 'Back'
                    }
                }, {}, function () { step.next() });
            }).then(function () {
                var step = this;
                animate.transform(el, {
                    'translateY': {
                        'value': -300 / .4,
                        'easing': 'easeOut'
                    },
                    'translateX': 100 / .4,
                    'rotate': 360 * 6,
                    'scale': {
                        'value': 1 / .4,
                        'easing': 'easeOut',
                        'curve': 'Back'
                    }
                }, {}, function () { step.next() })
            }).then(function () {
                var step = this;
                animate.transform(el, {
                    'translateY': {
                        'value': 300,
                        'easing': 'easeIn'
                    },
                    'translateX': 100,
                    'rotate': 360 * 6,
                    'scale': {
                        'value': .4,
                        'easing': 'easeOut',
                        'curve': 'Back'
                    }
                }, {}, function () { step.next() })
            }).then(function () {
                var step = this;
                animate.transform(el, {
                    'translateY': {
                        'value': -300 / .4,
                        'easing': 'easeOut'
                    },
                    'translateX': 100 / .4,
                    'rotate': 360 * 6,
                    'scale': {
                        'value': 1 / .4,
                        'easing': 'easeOut',
                        'curve': 'Back'
                    }
                }, {}, function () { step.next() })
            })
        }
    }
}

var Game = {
    init: function() {
        this.count = 0;
        this.maxCount = localStorage.maxCount ? localStorage.maxCount : 0;
        $('#maxCount').text('最高分: ' + this.maxCount);
    },
    count: 0,
    maxCount: 0,
    status: 'READY', // 'READY' 'PLAYING' 'OVER'
    reset: function() {
        this.count = 0;
        this.status = 'READY';
        $('#currentCount').text('当前分: 0');
        inPipe = false;
        $('.over').fadeOut();
    }
}

window.Bird = function(el) {
    this.element = document.querySelector(el);
    this.y = 250;
    this.x = 100;
    this.v = 10;
    this.g = .5;
    this.originY = 0;
    this.eye = $(this.element).find('.eye');
    this.wing = $(this.element).find('.wing');
}

Bird.prototype.reset = function() {
    var bird = this;

    bird.element.style.transform = 'translate3d(100px, 250px, 0px)';
    bird.originY = 0;
    bird.y = 250;
}

Bird.prototype.fly = function() {
    var bird = this;
    bird.stop && bird.stop();

    bird.originY = bird.y;
    var i = 0;

    animate.action(function(t, stop) {

        // var rotate = (1.5 * t - 30) <= 90 ? (1.5 * t - 30) : 90;
        var rotate = 0;

        bird.y = - (bird.v * t - bird.g/2 * t * t) + bird.originY;
        bird.element.style.transform = 'translate3d(' + bird.x + 'px,'+ parseFloat(bird.y) +'px, 0px) rotate(' + rotate + 'deg)';
        bird.stop = stop;

        bird.point = {
            a: {
                x: bird.x,
                y: bird.y
            },
            b: {
                x: bird.x + 40,
                y: bird.y
            },
            c: {
                x: bird.x + 40,
                y: bird.y + 20
            },
            d: {
                x: bird.x,
                y: bird.y + 20
            }
        };

        var maxY = bird.maxY = document.querySelector('body').offsetHeight;

        // 拍翅膀
        i++;
        if (i == 1) {
            bird.wing.css('transform', 'translateY(0px)');
        } else if (i == 2) {
            bird.wing.css('transform', 'translateY(15px)');
        } else if (i == 3) {
            bird.wing.css('transform', 'translateY(-15px)');
            i = 0;
        };

        if (bird.y > maxY) {
            bird.element.style.transform = 'translate3d(' + bird.x + 'px,'+ parseFloat(maxY) +'px, 0px)';
            bird.wing.css('transform', 'translateY(0px)');
            stop();
        } 
        
    });
}

var Pipe = function(el) {
    this.element = document.querySelector(el);
    this.x = 1000;
    this.originX = $(window).width() + 100;
};

Pipe.prototype.reset = function(){
    var pipe = this;

    pipe.x = pipe.originX;
    pipe.element.style.transform = 'translate3d(' + pipe.x + 'px, 0, 0)';
}

Pipe.prototype.move = function() {
    var pipe = this;
    pipe.x = pipe.originX;
    pipe.setHeight();
    animate.action(function(t, stop) {
        pipe.x -= 3;
        pipe.stop = stop;
        pipe.element.style.transform = "translate3d(" + pipe.x + "px, 0, 0)";
        if (pipe.x < -80) {
            stop();
            pipe.move();
        }
    });

};

Pipe.prototype.setHeight = function() {
    var pipe = this;

    var bodyHeight = document.querySelector('body').offsetHeight;
    var safeHeight = 170;
    var bottomHeight = Math.random() * (bodyHeight - safeHeight - 100) + 50;
    var topHeight = bodyHeight - safeHeight - bottomHeight;

    pipe.safeHeight = safeHeight;
    pipe.bottomHeight = bottomHeight;
    pipe.topHeight = topHeight;
    pipe.width = 60;

    $(this.element).find('.pipe-bottom').css('height', bottomHeight);
    $(this.element).find('.pipe-top').css('height', topHeight);
};

function birdTouchPipe(birdPoint, pipe) {
    if (pipe.x < birdPoint.c.x && pipe.x + pipe.width > birdPoint.a.x) {

        if (birdPoint.a.y < pipe.topHeight || birdPoint.c.y > pipe.topHeight + pipe.safeHeight) {
            return true;
        }

    }

    return false;
}
var inPipe = false;
function onCross(birdPoint, pipe, callback) {
    if (birdPoint && pipe.x < birdPoint.c.x && pipe.x + pipe.width > birdPoint.a.x) {
        inPipe = true;
    } else if (inPipe) {
        inPipe = false;
        callback && callback();
    };
}