(function (global, factory) {
	if (typeof module === "object" && typeof module.exports === "object") {

		module.exports = global.document ?
			factory(global, true) :
			function (w) {
				if (!w.document) {
					throw new Error("reqAnimate requires a window with a document");
				}
				return factory(w);
			};
	} else {
		factory(global);
	}
}(typeof window !== "undefined" ? window : this, function (window, noGlobal) {

    var Class = function (parent) {
        var _class = function () {
            this.init.apply(this, arguments);
        };

        // 类的继承
        if (parent) {
            var subclass = function () { };
            subclass.prototype = parent.prototype;

            _class.prototype = new subclass;
        };

        // 实例对象的别名
        _class.fn = _class.prototype;

        // 类的别名
        _class.fn.parent = _class;

        _class.fn.init = function () { };

        // 类方法的扩展方法
        _class.extend = function (obj) {
            var extended = obj.extended;

            for (var i in obj) {
                _class[i] = obj[i];
            };

            if (extended) {
                extended();
            }
        };

        _class.include = function (obj) {
            var included = obj.included;

            for (var i in obj) {
                _class.fn[i] = obj[i];
            };

            if (included) {
                included();
            }
        };

        return _class;
    };

    var Single = function() {
        var _single = function() {
            this.init.apply(this, arguments);
            instance = this;
        };

        var instance;

        _single.fn = _single.prototype;

        _single.fn.parent = _single;

        _single.fn.init = function() {};
        // 类方法的扩展方法
        _single.extend = function (obj) {
            var extended = obj.extended;

            for (var i in obj) {
                _single[i] = obj[i];
            };

            if (extended) {
                extended();
            }
        };

        _single.include = function (obj) {
            var included = obj.included;

            for (var i in obj) {
                _single.fn[i] = obj[i];
            };

            if (included) {
                included();
            }
        };

        _single.getInstance = function() {
            return instance ? instance : new _single;
        }

        return _single;
    };

    var Tween = {
        Linear: function (t, b, c, d) { return c * t / d + b; },
        Quad: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t + b;
            },
            easeOut: function (t, b, c, d) {
                return -c * (t /= d) * (t - 2) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t + b;
                return -c / 2 * ((--t) * (t - 2) - 1) + b;
            }
        },
        Cubic: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t * t + b;
            },
            easeOut: function (t, b, c, d) {
                return c * ((t = t / d - 1) * t * t + 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
                return c / 2 * ((t -= 2) * t * t + 2) + b;
            }
        },
        Quart: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t * t * t + b;
            },
            easeOut: function (t, b, c, d) {
                return -c * ((t = t / d - 1) * t * t * t - 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
                return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
            }
        },
        Quint: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t * t * t * t + b;
            },
            easeOut: function (t, b, c, d) {
                return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
                return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
            }
        },
        Sine: {
            easeIn: function (t, b, c, d) {
                return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
            },
            easeOut: function (t, b, c, d) {
                return c * Math.sin(t / d * (Math.PI / 2)) + b;
            },
            easeInOut: function (t, b, c, d) {
                return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
            }
        },
        Expo: {
            easeIn: function (t, b, c, d) {
                return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
            },
            easeOut: function (t, b, c, d) {
                return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if (t == 0) return b;
                if (t == d) return b + c;
                if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
            }
        },
        Circ: {
            easeIn: function (t, b, c, d) {
                return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
            },
            easeOut: function (t, b, c, d) {
                return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
                return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
            }
        },
        Elastic: {
            easeIn: function (t, b, c, d, a, p) {
                var s;
                if (t == 0) return b;
                if ((t /= d) == 1) return b + c;
                if (typeof p == "undefined") p = d * .3;
                if (!a || a < Math.abs(c)) {
                    s = p / 4;
                    a = c;
                } else {
                    s = p / (2 * Math.PI) * Math.asin(c / a);
                }
                return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            },
            easeOut: function (t, b, c, d, a, p) {
                var s;
                if (t == 0) return b;
                if ((t /= d) == 1) return b + c;
                if (typeof p == "undefined") p = d * .3;
                if (!a || a < Math.abs(c)) {
                    a = c;
                    s = p / 4;
                } else {
                    s = p / (2 * Math.PI) * Math.asin(c / a);
                }
                return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
            },
            easeInOut: function (t, b, c, d, a, p) {
                var s;
                if (t == 0) return b;
                if ((t /= d / 2) == 2) return b + c;
                if (typeof p == "undefined") p = d * (.3 * 1.5);
                if (!a || a < Math.abs(c)) {
                    a = c;
                    s = p / 4;
                } else {
                    s = p / (2 * Math.PI) * Math.asin(c / a);
                }
                if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
            }
        },
        Back: {
            easeIn: function (t, b, c, d, s) {
                if (typeof s == "undefined") s = 1.70158;
                return c * (t /= d) * t * ((s + 1) * t - s) + b;
            },
            easeOut: function (t, b, c, d, s) {
                if (typeof s == "undefined") s = 1.70158;
                return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
            },
            easeInOut: function (t, b, c, d, s) {
                if (typeof s == "undefined") s = 1.70158;
                if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
                return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
            }
        },
        Bounce: {
            easeIn: function (t, b, c, d) {
                return c - Tween.Bounce.easeOut(d - t, 0, c, d) + b;
            },
            easeOut: function (t, b, c, d) {
                if ((t /= d) < (1 / 2.75)) {
                    return c * (7.5625 * t * t) + b;
                } else if (t < (2 / 2.75)) {
                    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
                } else if (t < (2.5 / 2.75)) {
                    return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
                } else {
                    return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
                }
            },
            easeInOut: function (t, b, c, d) {
                if (t < d / 2) {
                    return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
                } else {
                    return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
                }
            }
        }
    }   

    var extend = function(obj1, obj2) {
        Object.keys(obj1).forEach(function(key) {
            obj2[key] = obj1[key];
        });

        return obj2;
    }

    function unitIsPx(key) {
        if (key == "width" ||
            key == "height" ||
            key == "top" ||
            key == "left" ||
            key == "right" ||
            key == "bottom" ||
            key == "font-size" ||
            key == "fontSize" ||
            key.indexOf("margin") !== -1 ||
            key.indexOf("padding") !== -1 ||
            key.indexOf("border") !== -1) {

            return true;
        } else {
            return false;
        }
    }

    function getStyleFromAttr(el) {
        var styleParams = document.querySelector(el).getAttribute('style') ? document.querySelector(el).getAttribute('style').split(';') : [];
        var style = {};
        styleParams.forEach(function (item) {
            var styleItem = item.split(':');
            style[styleItem[0].trim()] = styleItem[1];
        });

        return style;
    }

    var getOriginMatrix = function(el) {
        var transform = getComputedStyle(document.querySelector(el)).transform;
        var matrix = {
            a: 1,
            b: 0,
            c: 0,
            d: 1,
            e: 0,
            f: 0
        };

        if (transform.indexOf('matrix3d') > -1) {

            var arr = transform.substring(9).replace(')', '').split(',');

            matrix.a = arr[0].trim();
            matrix.b = arr[1].trim();
            matrix.c = arr[3].trim();
            matrix.d = arr[4].trim();
            matrix.e = arr[9].trim();
            matrix.f = arr[10].trim();

            return [[matrix.a, matrix.c, matrix.e], [matrix.b, matrix.d, matrix.f], [0,0,1]];

        } else if (transform.indexOf('matrix') > -1) {

            var arr = transform.substring(7).replace(')', '').split(',');

            matrix.a = arr[0].trim();
            matrix.b = arr[1].trim();
            matrix.c = arr[2].trim();
            matrix.d = arr[3].trim();
            matrix.e = arr[4].trim();
            matrix.f = arr[5].trim();

            return [[matrix.a, matrix.c, matrix.e], [matrix.b, matrix.d, matrix.f], [0,0,1]];

        } else {
            return [[matrix.a, matrix.c, matrix.e], [matrix.b, matrix.d, matrix.f], [0,0,1]];
        }
    }

    function dotMMsmall(x,y) {
        var i,j,k,p,q,r,ret,foo,bar,woo,i0,k0,p0,r0;
        p = x.length; q = y.length; r = y[0].length;
        ret = Array(p);
        for(i=p-1;i>=0;i--) {
            foo = Array(r);
            bar =x[i];
            for(k=r-1;k>=0;k--) {
                woo = bar[q-1]*y[q-1][k];
                for(j=q-2;j>=1;j-=2) {
                    i0 = j-1;
                    woo += bar[j]*y[j][k] + bar[i0]*y[i0][k];
                }
                if(j===0) { woo += bar[0]*y[0][k]; }
                foo[k] = woo;
            }
            ret[i] = foo;
        }
        return ret;
    }

    function dotMatrix() {
        var Ms = Array.prototype.slice.call(arguments)[0];
        var resM = Ms[0], i = 1;

        while (i < Ms.length) {
            resM = dotMMsmall(resM, Ms[i]);
            i++;
        };
        
        return resM;
    }
    var getTMatrix = function(tx, ty) {
        return [[1, 0, tx], [0, 1, ty], [0,0,1]];
    }
    var getRMatrix = function(r){
        return [[Math.cos(r * Math.PI / 180), -Math.sin(r * Math.PI / 180), 0], [Math.sin(r * Math.PI / 180), Math.cos(r * Math.PI / 180), 0], [0, 0, 1]];
    }
    var getSMatrix = function(sx, sy) {
        return [[sx,0,0], [0,sy,0], [0,0,1]];
    };

    var getAnimateMatrix = function(originM, prop, v) {
        var mArr = [];
            mArr.push(originM);

        Object.keys(prop).forEach(function(k) {
            
            if (k == 'translateX') {
                mArr.push(getTMatrix(v * prop[k], 0));
            } else if (k == 'translateY') {
                mArr.push(getTMatrix(0, v * prop[k]));
            } else if (k == 'rotate') {
                mArr.push(getRMatrix(v * prop[k])); 
            } else if (k == 'scaleX') {
                mArr.push(getSMatrix(1 + v * (prop[k] - 1), 1));
            } else if (k == 'scaleY') {
                mArr.push(getSMatrix(1, 1 + v * (prop[k] - 1)));
            }
        });
        
        return mArr;
    }

    // 定义一个类
    var ReqAnimate = new Class; 

    ReqAnimate.extend({

    });

    ReqAnimate.include({
        create: function(param, callback, endCallback) {
            /*
            @param {
                time: (t) 初始步数  这里默认都是0
                beginningValue: (b) 初始值 不填墨人为0
                changeValue: (c) 改变量 不填没有动画 默认是0
                duration: (d) 持续时间 这里单位是ms
                frame: 每秒帧数
            }
            */ 

            var defaultParam = {
                time: 0,
                beginningValue: 0,
                changeValue: 0,
                duration: 300,
                frame: 60,
                easing: 'easeOut'
            };

            var param = extend(param, defaultParam);
            var f, value = param.beginningValue;
            var totalTime = parseInt(param.duration  / 1000 * param.frame);
            

            var animate = function() {
                param.time++;
                if (param.time > totalTime) {
                    endCallback();
                    cancelAnimationFrame(f);
                    return;
                };

                if (param.easing == 'linear') {
                    value = Tween.Linear(param.time, param.beginningValue, param.changeValue, totalTime);
                } else {
                    value = Tween.Quad[param.easing](param.time, param.beginningValue, param.changeValue, totalTime);
                }
                    
                callback && callback(value, param.time, totalTime)
                // 
                f = requestAnimationFrame(animate);
            }

            f = requestAnimationFrame(animate);

        },
        transform: function(el, transProp, param, callback) {
            if (!el || typeof el !== 'string') {
                console.error('arg 1 is not a valid selector');
                return;
            };

            var RQA = this;
            var prop = transProp;

            /*
                matrix(a,b,c,d,e,f);
                matrix3d(a,b,0,c,d,0,0,0,1,e,f,0,0,0,0,1);
            */ 
            // 当前
            // var originMatrix = getOriginMatrix(el);
            // 原始
            var originMatrix = [[1,0,0], [0,1,0], [0,0,1]];
            
            var param = extend(param || {}, {easing: 'easeOut', duration: 1000});

            var getAnimateMatrixByParam = function(originM, prop, t, d) {
                var mArr = [];
                    mArr.push(originM);

                Object.keys(prop).forEach(function(k) {
                    
                    if (typeof prop[k] == 'object') {
                        var easing = prop[k].easing;
                        var value = prop[k].value;

                        if (easing == 'linear') {
                            var v = Tween.Linear(t, 0, 1, d);
                        } else {
                            var v = Tween[prop[k].curve?prop[k].curve:"Quad"][easing](t, 0, 1, d);
                        };
                        
                    } else {
                        var value = prop[k];
                        var v = Tween.Linear(t, 0, 1, d);
                    };

                    if (k == 'translateX') {
                        mArr.push(getTMatrix(v * value, 0));
                    } else if (k == 'translateY') {
                        mArr.push(getTMatrix(0, v * value));
                    } else if (k == 'rotate') {
                        mArr.push(getRMatrix(v * value)); 
                    } else if (k == 'scaleX') {
                        mArr.push(getSMatrix(1 + v * (value - 1), 1));
                    } else if (k == 'scaleY') {
                        mArr.push(getSMatrix(1, 1 + v * (value - 1)));
                    } else if (k == 'scale') {
                        mArr.push(getSMatrix(1 + v * (value - 1), 1 + v * (value - 1)));
                    }
                    
                });
                
                return mArr;
            }

            RQA.create({
                changeValue: 1,
                easing: param.easing,
                duration: param.duration
            }, function(v, t, d) {

                // var animateMatrix = getAnimateMatrix(originMatrix, prop, v);
                var animateMatrix = getAnimateMatrixByParam(originMatrix, prop, t, d);
                var perMatrix = dotMatrix(animateMatrix);
                
                // 
                var M = {
                    'a': perMatrix[0][0],
                    'b': perMatrix[1][0],
                    'c': perMatrix[0][1],
                    'd': perMatrix[1][1],
                    'e': perMatrix[0][2],
                    'f': perMatrix[1][2]
                };

                var t = 'matrix3d(' + M.a + ',' + M.b + ',0,0,' + M.c + ',' + M.d + ',0,0,0,0,1,0,' + M.e + ',' + M.f + ',0,1)';
                
                document.querySelector(el).style.transform = t;
            }, function() {
                callback && callback()
            });
            
        },
        action: function(callback) {
            var RQA = this;

            var t = 0;
            var frame;

            var stopAction = function() {
                cancelAnimationFrame(frame);
            }

            var frameAction = function() {
                t++;

                frame = requestAnimationFrame(frameAction);
                callback && callback(t, stopAction);
                
            };

            frame = requestAnimationFrame(frameAction);
        }
    });

    return ReqAnimate;
}));