/*!
 * Author: liujiaqi@cmcm.com
 * Date: 2014-11-05 15:36:37

 * include "createClass.js"
 * include "imageReady.js"
 * include "animation.js"
 * include "jpromise.js"
 * include "h5media.js"
 * include "pageSwitch.js"
 * include "jquery-1.11.1.min.js"
 * include "common.js"
 */
!function (c, r, h) {
    function p(c, m) {
        for (var e = 0, p = c.length, y = [], l; e < p; e++)"undefined" !== typeof(l = m(c[e])) && y.push(l);
        return y
    }

    function l() {
        var c = arguments.length - 1, m = arguments[c], e = arguments[0] || {}, p = typeof e, y = 1, A, r;
        "boolean" !== typeof m && (m = !1, c++);
        for ("object" != p && "function" != p && (e = {}); y < c; y++)if (null != (p = arguments[y]))for (A in p)r = e[A], copy = p[A], e !== copy && (e[A] = m && "object" == typeof copy && null != copy ? l("object" == typeof r && null != r ? r : "[object Array]" == {}.toString.call(copy) ? [] : {}, copy, m) : copy);
        return e
    }

    function y(c, m) {
        var e = "function" == typeof c;
        return e == ("function" == typeof m) ? 0 : e ? -1 : 1
    }

    function m() {
    }

    var A = c[r] = function () {
        function c(m) {
            e.apply(this, m)
        }

        function r() {
            return new c(arguments)
        }

        var e = arguments[0], w = [].slice.call(arguments, "function" == typeof e && !function (c) {
            for (c in e.prototype)return!0
        }() ? 1 : (e = m, 0)), h = [], z = {_self: e, _super: function () {
            h[0] && (h[0].prototype._self || h[0]).apply(this, arguments)
        }, extend: function () {
            var c = this;
            return l.apply(null, (this === z ? [] : [this]).concat(p([
                {constructor: r}
            ].concat([].slice.call(arguments,
                0), z).sort(y), function (e) {
                "function" == typeof e && !c.isInstanceof(e) && h.push(e);
                "function" == typeof e && (m.prototype = e.prototype, e = new m);
                return e
            })))
        }, isInstanceof: function (e) {
            var c;
            if (!(c = this instanceof e))a:{
                for (var m = 0, p = h.length; m < p; m++)if (c = h[m].prototype.isInstanceof, h[m] === e || c && c.call(this, e)) {
                    c = !0;
                    break a
                }
                c = !1
            }
            return c
        }};
        c.prototype = r.fn = r.prototype = z.extend.apply(z, w);
        r.extend = function () {
            return A.apply(null, [].slice.call(arguments, 0).concat(this))
        };
        return r
    }
}(window, "createClass");
var imageReady = function () {
    var c = [], r = null, h = [
        ["width", "height"],
        ["naturalWidth", "naturalHeight"]
    ], p = Number("naturalWidth"in new Image), l = function () {
        for (var m = 0; m < c.length;)c[m].end ? c.splice(m, 1) : y.call(c[m++]);
        c.length && (r = setTimeout(l, 50)) || (r = null)
    }, y = function () {
        if (this.complete || this[h[p][0]] !== this.__width || this[h[p][1]] !== this.__height || "loading" == this.readyState)this.end = !0, this.onready(this)
    };
    return function (m, A, K, D) {
        A = A || new Function;
        K = K || new Function;
        D = D || new Function;
        var e = "string" == typeof m ?
            new Image : m;
        e.onerror = function () {
            e.end = !0;
            e.onload = e.onerror = e.onreadystatechange = null;
            D.call(e, e);
            e = null
        };
        "string" == typeof m && (e.src = m);
        e && (e.complete ? (e.onerror = null, A.call(e, e), K.call(e, e), e = null) : (e.__width = e[h[p][0]], e.__height = e[h[p][1]], e.onready = A, y.call(e), e.onload = e.onreadystatechange = function () {
            if (!e || !e.readyState || !("loaded" != e.readyState && "complete" != e.readyState))e.onload = e.onerror = e.onreadystatechange = null, !e.end && y.call(e), K.call(e, e), e = null
        }, e.end || (c.push(e), !r && (r = setTimeout(l,
            50)))))
    }
}();
(function (c, r, h) {
    var p = c.requestAnimationFrame || c.webkitRequestAnimationFrame || c.mozRequestAnimationFrame || c.msRequestAnimationFrame || function (c) {
        return setTimeout(c, 30)
    }, l = c.cancelAnimationFrame || c.webkitCancelAnimationFrame || c.webkitCancelRequestAnimationFrame || c.mozCancelRequestAnimationFrame || c.msCancelRequestAnimationFrame || clearTimeout;
    "function" != typeof Function.prototype.bind && (Function.prototype.bind = function (c) {
        var m = this;
        return function () {
            return m.apply(c, arguments)
        }
    });
    "function" != typeof Array.prototype.forEach &&
    (Array.prototype.forEach = function (c) {
        for (var m = 0, p = this.length, l; m < p; m++)l = this[m], "undefined" != typeof l && c(l, m, this)
    });
    r.prototype = {constructor: r, playing: !1, complete: !1, percent: 0, bindEvent: function () {
        this.events = {};
        this.finish(function () {
            this.complete = !0
        })
    }, on: function (c, m) {
        if ("object" == typeof c)for (var p in c)this.on(p, c[p]); else this.events[c] || (this.events[c] = []), this.events[c].push(m);
        return this
    }, fire: function (c) {
        var m = [].slice.call(arguments, 1);
        (this.events[c] || []).forEach(function (c) {
            "function" == typeof c && c.apply(this, m)
        }.bind(this));
        return this
    }, now: Date.now || function () {
        return+new Date
    }, toggle: function () {
        return this.playing ? this.stop() : this.start()
    }, _start: function () {
        this.playing || (this.playing = !0, this.tweenTime = this.now(), this.complete && (this.complete = !1, this.timeout = 0), this.fire("start").next());
        return this
    }, _next: function () {
        var c = this.duration, m = this.now();
        this.percent = c ? this.easeFunc.call(null, this.timeout = Math.min(c, this.timeout + m - (this.tweenTime || 0)), 0, c, c) / c : 1;
        this.fire("next");
        this.timeout <
            c ? (l(this._timer), this.playing && (this._timer = p(this.next.bind(this))), this.tweenTime = m) : this.stop().fire("finish");
        return this
    }, _stop: function () {
        this.playing && (this.playing = !1, l(this._timer), this.fire("stop"));
        return this
    }, _finish: function () {
        this.complete || (this.tweenTime = 0, this.next());
        return this
    }, frame: function (c, m) {
        var p = this.now();
        return this.next(function () {
            var l = this.now();
            l - p >= c && (p = l, m.call(this))
        })
    }, setDuration: function (c) {
        this.timeout = (this.duration ? this.timeout / this.duration : 0) * (this.duration =
            parseFloat(c) || 0);
        return this
    }, setTween: function (c) {
        this.easeFunc = "function" == typeof c ? c : function (c, p, l, r) {
            return l * c / r + p
        };
        return this
    }};
    ["start", "next", "stop", "finish"].forEach(function (c) {
        r.prototype[c] = function (m) {
            return"function" == typeof m ? this.on(c, m) : this["_" + c]()
        }
    });
    c.Animation = r
})(window, function (c, r) {
    if (!(this instanceof arguments.callee))return new arguments.callee(c, r);
    this.setDuration(c).setTween(r).bindEvent()
});
(function (c, r, h) {
    "function" != typeof Function.prototype.bind && (Function.prototype.bind = function (c) {
        var p = this;
        return function () {
            return p.apply(c, arguments)
        }
    });
    "function" != typeof Array.prototype.forEach && (Array.prototype.forEach = function (c) {
        for (var p = 0, l = this.length, r; p < l; p++)r = this[p], "undefined" != typeof r && c(r, p, this)
    });
    var p = {resolved: "resolve", rejected: "reject", pending: "notify"}, l = [].slice, y = {}.toString;
    r.prototype = {constructor: r, state: "pending", on: function (c, p) {
        this.handles[c] || (this.handles[c] =
            []);
        "function" == typeof p && this.handles[c].push(p);
        return this
    }, fire: function (c) {
        var p = this.args || [], l = this.handles[c] || [];
        if ("notify" == c)l.forEach(function (c) {
            c.apply(null, p)
        }); else for (; l.length;)l.shift().apply(null, p);
        return this
    }, then: function () {
        var c = new r, h = arguments;
        ["resolve", "reject", "notify"].forEach(function (p, r) {
            this.on(p, function () {
                var e = l.call(arguments), w;
                if ("function" == typeof h[r]) {
                    try {
                        w = h[r].apply(null, e), 1 == r && (p = "resolve")
                    } catch (y) {
                        p = "reject", w = y
                    }
                    e = [w]
                }
                c[p].apply(c, e)
            })
        }.bind(this));
        switch (this.state) {
            case "resolved":
            case "rejected":
                this.fire(p[this.state])
        }
        return c
    }, chain: function (c) {
        return this.then(function () {
            c.resolve.apply(c, arguments)
        }, function () {
            c.reject.apply(c, arguments)
        }, function () {
            c.notify.apply(c, arguments)
        })
    }, delay: function (c) {
        return this.always(function () {
            var p = arguments;
            return r(function (l) {
                setTimeout(function () {
                    l.apply(null, p)
                }, c)
            })
        })
    }, "catch": function (c) {
        return this.then(null, c)
    }, done: function (c) {
        return this.then(c)
    }, fail: function (c) {
        return this.then(null, c)
    },
        always: function (c) {
            return this.then(c, c)
        }, progress: function (c) {
            return this.then(null, null, c)
        }, defer: function () {
            return this
        }, promise: function () {
            var c = this, p = {};
            ["then", "catch", "progress"].forEach(function (l) {
                p[l] = function () {
                    return c[l].apply(c, arguments).promise()
                }
            });
            return p
        }};
    ["defer", "promise"].forEach(function (c) {
        r[c] = function K(p) {
            if (this instanceof K)throw new TypeError(c + " is not a constructor");
            return this(p)[c]()
        }
    });
    ["resolved", "rejected", "pending"].forEach(function (c) {
        var h = p[c];
        r[h] = function () {
            var c =
                new this;
            return c[h].apply(c, arguments)
        };
        r.prototype[h] = function (p) {
            "pending" == this.state && ("function" == typeof(p && p.then) ? this.chain.call(p, this) : (this.state = c, this.args = l.call(arguments), this.fire(h)));
            return this
        }
    });
    "when all every any some race".split(" ").forEach(function (c) {
        var p = r[c] = function () {
            var h = l.call(arguments), D = [], e = [], w = h.length, H = 0;
            return r(function (z, E, ha) {
                h.length ? h.forEach(function (h, B) {
                    var I = "[object Array]" == y.call(h), K, T;
                    I ? h = p.apply(null, h).progress(ha) : h.always(ha);
                    h = r.resolve(h);
                    switch (c) {
                        case "any":
                            K = z;
                            T = function (c) {
                                e[B] = I ? l.call(arguments) : c;
                                w == ++H && E.apply(null, e)
                            };
                            break;
                        case "some":
                            K = function (c) {
                                D.push(I ? l.call(arguments) : c);
                                w == ++H && z.apply(null, D)
                            };
                            T = function (c) {
                                e.push(I ? l.call(arguments) : c);
                                w == ++H && (D.length ? z.apply(null, D) : E.apply(null, e))
                            };
                            break;
                        case "race":
                            K = T = z;
                            break;
                        default:
                            K = function (c) {
                                D[B] = I ? l.call(arguments) : c;
                                w == ++H && z.apply(null, D)
                            }, T = E
                    }
                    h.then(K, T)
                }) : z()
            })
        };
        r.prototype[c] = function () {
            return p.apply(null, arguments).chain(this)
        }
    });
    c.JPromise = r
})(window, function (c) {
    if (!(this instanceof
        arguments.callee))return new arguments.callee(c);
    this.handles = {};
    "function" == typeof c && c(this.resolve.bind(this), this.reject.bind(this), this.notify.bind(this))
});
(function (c, r, h) {
    "function" != typeof Function.prototype.bind && (Function.prototype.bind = function (c) {
        var l = this;
        return function () {
            return l.apply(c, arguments)
        }
    });
    r.prototype = {constructor: r, bindEvents: function () {
        this.events = {};
        this.on({"playing ended volumechange": null, loadedmetadata: function () {
            this.isReady = !0;
            this._muted = this.muted
        }});
        isNaN(this.length) || this.fire("loadedmetadata")
    }, updateConfig: function (c) {
        var l, h = this.media;
        for (l in c)c.hasOwnProperty(l) && (l in h ? h[l] = c[l] : h.setAttribute(l, c[l]))
    },
        handleEvent: function (c) {
            c = c.type.toLowerCase();
            "play" != c && this.fire(c);
            switch (c) {
                case "playing":
                    this.fire("play");
                    break;
                case "ended":
                    this.fire("end");
                    break;
                case "loadedmetadata":
                    this.fire("ready", this.length);
                    break;
                case "volumechange":
                    this._muted !== this.muted && (this.fire(this.muted ? "mute" : "unmute"), this._muted = this.muted)
            }
        }, getBuffer: function (c) {
            c = this.media[c || "buffered"];
            for (var l = 0, h = c.length, m = []; l < h; l++)m.push([c.start(l), c.end(l)]);
            return m
        }, on: function (c, l) {
            "object" == typeof c ? Object.keys(c).forEach(function (l) {
                this.on(l,
                    c[l])
            }.bind(this)) : c.split(/\s+/g).forEach(function (c) {
                this.events[c] || (this.events[c] = [], this.media.addEventListener(c, this, !1));
                "function" == typeof l && this.events[c].push(l) && this.special(c)
            }.bind(this));
            return this
        }, special: function (c) {
            "ready" == c && this.isReady && this.events[c].slice(-1)[0].call(this, this.media, this.length)
        }, fire: function (c) {
            var l = [].slice.call(arguments, 1);
            l.unshift(this.media);
            (this.events[c] || []).forEach(function (c) {
                "function" == typeof c && c.apply(this, l)
            }.bind(this));
            return this
        },
        ready: function (c) {
            return this.on("ready", c)
        }, play: function () {
            this.playing = !0;
            return this
        }, pause: function () {
            this.playing = !1;
            return this
        }, stop: function () {
            return this.pause().reset().fire("stop")
        }, finish: function () {
            return this.go(this.length)
        }, toggle: function () {
            this.playing = !this.playing;
            return this
        }, reset: function () {
            return this.go(0)
        }, skip: function (c) {
            this.currentTime += c || 1;
            return this
        }, go: function (c) {
            try {
                this.currentTime = c
            } catch (l) {
            }
            return this
        }, mute: function () {
            this.muted = !0;
            return this
        }, unmute: function () {
            this.muted = !1;
            return this
        }, muteToggle: function () {
            this.muted = !this.muted;
            return this
        }, setVol: function (c) {
            try {
                this.volume = c
            } catch (l) {
            }
            return this
        }, volUp: function () {
            this.volume += 0.1;
            return this
        }, volDown: function () {
            this.volume -= 0.1;
            return this
        }, load: function (c) {
            this.src = c;
            return this
        }, canPlayType: function (c) {
            return this.media.canPlayType(c)
        }};
    "function" == typeof Object.defineProperties && ("paused currentTime duration muted volume ended playbackRate src seeking loop poster preload autoplay controls height width".split(" ").forEach(function (c) {
        Object.defineProperty(r.prototype,
            c, {get: function () {
                return this.media[c]
            }, set: function (l) {
                this.media[c] = l
            }, enumerable: !0})
    }.bind(this)), Object.defineProperties(r.prototype, {length: {get: function () {
        return this.duration
    }, enumerable: !0}, playing: {get: function () {
        return!this.ended && !this.paused
    }, set: function (c) {
        this.media[c ? "play" : "pause"]()
    }, enumerable: !0}, buffered: {get: function () {
        return this.getBuffer()
    }, enumerable: !0}, played: {get: function () {
        return this.getBuffer("played")
    }, enumerable: !0}}));
    !function () {
        var c = document.createElement("video"),
            l = {mp4: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"', ogg: 'video/ogg; codecs="theora, vorbis"', webm: 'video/webm; codecs="vp8, vp9, vorbis"', flv: "video/x-flv", m3u: "video/mpegurl"}, h, m;
        if ("undefined" != typeof HTMLVideoElement && c.canPlayType)for (h in m = {}, l)m[h] = c.canPlayType(l[h]);
        r.video = m
    }();
    !function () {
        var c = document.createElement("audio"), l = {wav: 'audio/wav; codecs="1"', mp3: "audio/mpeg", m4a: "audio/x-m4a", flac: "audio/x-flac", flv: "audio/x-flv", m3u: "audio/mpegurl", ogg: 'audio/ogg; codecs="vorbis, opus"',
            aac: 'audio/mp4; codecs="mp4a.40.2, mp4a.40.5"', webm: 'audio/webm; codecs="vorbis"'}, h, m;
        if ("undefined" != typeof HTMLAudioElement && c.canPlayType)for (h in m = {}, l)m[h] = c.canPlayType(l[h]);
        r.audio = m
    }();
    c.H5Media = r
})(window, function (c) {
    if (!(this instanceof arguments.callee))return new arguments.callee(c);
    c = c || {};
    1 == c.nodeType ? this.media = c : (this.media = document.createElement(c.type || "video"), this.updateConfig(c));
    this.bindEvents()
});
(function (c, r, h) {
    function p(c) {
        return null == c ? String(c) : "object" == typeof c ? Object.prototype.toString.call(c).match(/\[object (\w+)\]/)[1].toLowerCase() : typeof c
    }

    function l(c, e) {
        var l = p(c);
        if (c && "function" != l && "string" != l && (0 === c.length || c.length && c.length - 1 in c)) {
            if ("function" == p(c.forEach))return c.forEach(e);
            for (var l = 0, h = c.length, m; l < h; l++)m = c[l], "undefined" != p(m) && e(m, l, c)
        } else for (h in c)e(h, c[h], c)
    }

    function y(c) {
        var e = [];
        l(c.children || c.childNodes, function (c) {
            1 == c.nodeType && e.push(c)
        });
        return e
    }

    function m(c, e, h) {
        if ("object" == p(e))return l(e, function (e, l) {
            m(c, e, l)
        });
        l(e.split(" "), function (e) {
            c.addEventListener ? c.addEventListener(e, h, !1) : c.attachEvent ? c.attachEvent("on" + e, h) : c["on" + e] = h
        })
    }

    function A(c) {
        var e = {};
        l("clientX clientY type wheelDelta detail which keyCode".split(" "), function (l) {
            e[l] = c[l]
        });
        e.oldEvent = c;
        e.target = c.target || c.srcElement || document.documentElement;
        3 === e.target.nodeType && (e.target = e.target.parentNode);
        e.preventDefault = function () {
            c.preventDefault && c.preventDefault();
            e.returnValue = c.returnValue = !1
        };
        c.changedTouches && 1 == c.changedTouches.length && (e.clientX = c.changedTouches.item(0).clientX, e.clientY = c.changedTouches.item(0).clientY);
        return e
    }

    var K = c.requestAnimationFrame || c.webkitRequestAnimationFrame || c.mozRequestAnimationFrame || c.msRequestAnimationFrame || function (c) {
            return setTimeout(c, 30)
        }, D = c.cancelAnimationFrame || c.webkitCancelAnimationFrame || c.webkitCancelRequestAnimationFrame || c.mozCancelRequestAnimationFrame || c.msCancelRequestAnimationFrame || clearTimeout,
        e = "createTouch"in document || "ontouchstart"in window;
    h = "PointerEvent"in c ? "pointerdown pointermove pointerup pointercancel" : e ? "touchstart touchmove touchend touchcancel" : "mousedown mousemove mouseup";
    var w = h.split(" ")[0], H = h.split(" ").slice(1).join(" "), z = document.documentElement.style, E = function (c) {
        return(c + "").replace(/^-ms-/, "ms-").replace(/-([a-z]|[0-9])/ig, function (c, e) {
            return(e + "").toUpperCase()
        })
    }, ha = function () {
        for (var c = ["-webkit-", "-moz", "-o-", "-ms-"], e; e = c.shift();)if (E(e + "transform")in
            z)return e;
        return""
    }();
    h = function (c) {
        c = E(c);
        var e = E(ha + c);
        return c in z && c || e in z && e || ""
    };
    var C = h("opacity"), B = h("transform"), I = h("perspective"), qa = h("backface-visibility"), T = {linear: function (c, e, l, h) {
        return l * c / h + e
    }, ease: function (c, e, l, h) {
        return-l * ((c = c / h - 1) * c * c * c - 1) + e
    }}, F = {fade: function (c, e) {
        var l = this.pages[this.current], h = this.pages[e];
        C ? (l.style.opacity = 1 - Math.abs(c), h && (h.style.opacity = Math.abs(c))) : (l.style.filter = "alpha(opacity=" + 100 * (1 - Math.abs(c)) + ")", h && (h.style.filter = "alpha(opacity=" +
            100 * Math.abs(c) + ")"))
    }};
    l(["X", "Y", ""], function (c) {
        var e = {X: "left", Y: "top"};
        F["scroll" + c] = function (l, h) {
            var p = this.pages[this.current], m = this.pages[h], r = this.direction, w = I ? " translateZ(0)" : "", r = c || ["X", "Y"][r];
            B ? (p.style[B] = "translate" + r + "(" + 100 * l + "%)" + w, m && (m.style[B] = "translate" + r + "(" + 100 * m.percent + "%)" + w)) : (r = e[r], p.style[r] = 100 * l + "%", m && (m.style[r] = 100 * m.percent + "%"))
        };
        F["slide" + c] = function (e, l) {
            var h = this.pages[this.current], p = this.pages[l], m = this.direction, r = I ? " translateZ(0)" : "", m = c || ["X",
                "Y"][m];
            B ? 0 > e ? (h.style[B] = "translate" + m + "(" + 100 * e + "%)" + r, h.style.zIndex = 1, p && (p.style[B] = "scale(" + (0.2 * (1 - p.percent) + 0.8) + ")" + r, p.style.zIndex = 0)) : (p && (p.style[B] = "translate" + m + "(" + 100 * p.percent + "%)" + r, p.style.zIndex = 1), h.style[B] = "scale(" + (0.2 * (1 - e) + 0.8) + ")" + r, h.style.zIndex = 0) : F["scroll" + c].apply(this, arguments)
        };
        F["rotate" + c] = function (e, l) {
            var h = this.pages[this.current], p = this.pages[l], m = this.direction, r = I ? " translateZ(0)" : "", w = 0 < e ? -1 : 1, m = c || ["X", "Y"][1 - m];
            I ? (h.style[qa] = "hidden", h.style[B] = "perspective(1000px) rotate" +
                m + "(" + 180 * Math.abs(e) * w + "deg)" + r, p && (p.style[qa] = "hidden", p.style[B] = "perspective(1000px) rotate" + m + "(" + 180 * Math.abs(p.percent) * -w + "deg)" + r)) : F["slide" + c].apply(this, arguments)
        };
        F["scale" + c] = function (e, l) {
            var h = this.pages[this.current], p = this.pages[l], m = I ? " translateZ(0)" : "";
            B ? (h.style[B] = "scale" + c + "(" + (1 - Math.abs(e)) + ")", +m, h.style.zIndex = 0 > e ? 1 : 0, p && (p.style[B] = "scale" + c + "(" + Math.abs(e) + ")" + m, p.style.zIndex = 0 > e ? 0 : 1)) : F["scroll" + c].apply(this, arguments)
        };
        F["skew" + c] = function (e, l) {
            var h = this.pages[this.current],
                p = this.pages[l], m = I ? " translateZ(0)" : "";
            B ? (h.style[B] = "skew" + c + "(" + 180 * e + "deg)" + m, p && (p.style[B] = "skew" + c + "(" + 180 * p.percent + "deg)" + m), F.fade.apply(this, arguments)) : F["scroll" + c].apply(this, arguments)
        }
    });
    r.prototype = {constructor: r, latestTime: 0, init: function (c) {
        var e = this, l = function (c) {
            !e.frozen && e.handleEvent(c)
        };
        this.events = {};
        this.duration = isNaN(parseInt(c.duration)) ? 600 : parseInt(c.duration);
        this.direction = 0 == parseInt(c.direction) ? 0 : 1;
        this.current = parseInt(c.start) || 0;
        this.loop = !!c.loop;
        this.mousewheel = !!c.mousewheel;
        this.arrawkey = !!c.arrowkey;
        this.pages = y(this.container);
        this.length = this.pages.length;
        m(this.container, w + " click" + (this.mousewheel ? " mousewheel DOMMouseScroll" : ""), l);
        m(document, H + (this.arrawkey ? " keydown" : ""), l);
        this.setEase(c.ease);
        this.setTransition(c.transition)
    }, setEase: function (c) {
        this.ease = "function" == typeof c ? c : T[c] || T.ease
    }, setTransition: function (c) {
        this.transite = "function" == typeof c ? c : F[c] || F.slide;
        l(this.pages, function (c) {
            var e = c.style;
            l("position:absolute top:0 left:0 width:100% height:100% display:none".split(" "),
                function (c) {
                    c = c.split(":");
                    e[c[0]] = c[1]
                });
            c.percent = 0
        });
        this.pages[this.current].style.display = "block"
    }, on: function (c, e) {
        this.events[c] || (this.events[c] = []);
        this.events[c].push(e)
    }, fire: function (c, e, h) {
        var m = this, r = [].slice.call(arguments, 1);
        "update" == c && (this.pages[this.current].percent = e, this.pages[h] && (this.pages[h].percent = 0 < e ? e - 1 : 1 + e), this.transite.apply(this, r));
        l(this.events[c] || [], function (c) {
            "function" == p(c) && c.apply(m, r)
        })
    }, freeze: function (c) {
        this.frozen = "undefined" == p(c) ? !0 : !!c
    }, slide: function (c) {
        function e() {
            var c =
                Math.min(p, +new Date - m), l = p ? r(c, 0, 1, p) : 1;
            h.fire("update", E * (1 - l), y);
            c == p ? (A && (A.style.display = "none"), h.fire("after", z, w), delete h.timer) : h.timer = K(e)
        }

        var h = this, p = this.duration, m = +new Date, r = this.ease, w = this.current, z = Math.min(this.length - 1, Math.max(0, this.fixIndex(c))), H, A, y, E;
        H = this.pages[z];
        A = this.pages[y = this.fixIndex(z == w ? z + (0 < H.percent ? -1 : 1) : w)];
        l(this.pages, function (c, e) {
            e != z && e != y && (c.style.display = "none")
        });
        "none" == H.style.display ? (H.style.display = "block", E = c > w ? 1 : -1) : E = H.percent;
        p *= Math.abs(E);
        this.fire("before", w, z);
        this.current = z;
        D(this.timer);
        this.latestTime = m;
        e()
    }, prev: function () {
        return this.slide(this.current - 1)
    }, next: function () {
        return this.slide(this.current + 1)
    }, fixIndex: function (c) {
        return 1 < this.length && this.loop ? (this.length + c) % this.length : c
    }, handleEvent: function (c) {
        c = A(c);
        switch (c.type.toLowerCase()) {
            case "mousedown":
            case "touchstart":
            case "pointerdown":
                var h = c.target.nodeName.toLowerCase();
                D(this.timer);
                this.rect = [c.clientX, c.clientY];
                this.percent = this.pages[this.current].percent;
                this.time = +new Date;
                !e && ("a" == h || "img" == h) && c.preventDefault();
                break;
            case "mousemove":
            case "touchmove":
            case "pointermove":
                if (this.rect) {
                    var p = [c.clientX, c.clientY], m = this.direction, h = p[m] - this.rect[m], r = this.pages[this.current], r = r["offset" + ["Width", "Height"][m]], w;
                    null == this.drag && this.rect.toString() != p.toString() && (this.drag = Math.abs(h) >= Math.abs(p[1 - m] - this.rect[1 - m]));
                    this.drag && (w = this.percent + (r && h / r), r = this.pages[p = this.fixIndex(this.current + (0 < w ? -1 : 1))], m = this.pages[this.fixIndex(this.current +
                        (0 < w ? 1 : -1))], r ? r.style.display = "block" : w /= 3, m && (m.style.display = "none"), this.fire("update", w, p), this._offset = h, c.preventDefault())
                }
                break;
            case "mouseup":
            case "touchend":
            case "touchcancel":
            case "pointerup":
            case "pointercancel":
                var z = this, r = this.pages[this.current], h = this.current, p = this._offset || this.timer;
                !0 == this.drag && (500 > +new Date - this.time && 30 < Math.abs(this._offset) ? h += 0 < this._offset ? -1 : 1 : 0.5 < Math.abs(r.percent) && (h += 0 < r.percent ? -1 : 1), c.preventDefault());
                this.time && (l("rect drag time timer percnet _offset".split(" "),
                    function (c) {
                        delete z[c]
                    }), p && this.slide(h));
                break;
            case "click":
                this.timer && c.preventDefault();
                break;
            case "mousewheel":
            case "dommousescroll":
                if (!this.timer && !this.drag && +new Date - this.latestTime > this.duration + 500)this[0 < (c.wheelDelta || -c.detail) ? "prev" : "next"]();
                break;
            case "keydown":
                if (h = c.target.nodeName.toLowerCase(), !this.timer && !this.drag && "input" != h && "textarea" != h)switch (c.keyCode || c.which) {
                    case 33:
                    case 37:
                    case 38:
                        this.prev();
                        break;
                    case 32:
                    case 34:
                    case 39:
                    case 40:
                        this.next();
                        break;
                    case 35:
                        this.slide(this.length -
                            1);
                        break;
                    case 36:
                        this.slide(0)
                }
        }
    }};
    c.pageSwitch = r
})(window, function (c, r) {
    if (!(this instanceof arguments.callee))return new arguments.callee(c, r);
    this.container = "string" == typeof c ? document.getElementById(c) : c;
    this.init(r || {})
});
!function (c, r) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = c.document ? r(c, !0) : function (c) {
        if (!c.document)throw Error("jQuery requires a window with a document");
        return r(c)
    } : r(c)
}("undefined" != typeof window ? window : this, function (c, r) {
    function h(a) {
        var b = a.length, f = d.type(a);
        return"function" === f || d.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === f || 0 === b || "number" == typeof b && 0 < b && b - 1 in a
    }

    function p(a, b, f) {
        if (d.isFunction(b))return d.grep(a, function (a, d) {
            return!!b.call(a, d,
                a) !== f
        });
        if (b.nodeType)return d.grep(a, function (a) {
            return a === b !== f
        });
        if ("string" == typeof b) {
            if (Qb.test(b))return d.filter(b, a, f);
            b = d.filter(b, a)
        }
        return d.grep(a, function (a) {
            return 0 <= d.inArray(a, b) !== f
        })
    }

    function l(a, b) {
        do a = a[b]; while (a && 1 !== a.nodeType);
        return a
    }

    function y(a) {
        var b = hb[a] = {};
        return d.each(a.match(W) || [], function (a, d) {
            b[d] = !0
        }), b
    }

    function m() {
        u.addEventListener ? (u.removeEventListener("DOMContentLoaded", A, !1), c.removeEventListener("load", A, !1)) : (u.detachEvent("onreadystatechange",
            A), c.detachEvent("onload", A))
    }

    function A() {
        (u.addEventListener || "load" === event.type || "complete" === u.readyState) && (m(), d.ready())
    }

    function K(a, b, f) {
        if (void 0 === f && 1 === a.nodeType) {
            var q = "data-" + b.replace(Rb, "-$1").toLowerCase();
            if (f = a.getAttribute(q), "string" == typeof f) {
                try {
                    f = "true" === f ? !0 : "false" === f ? !1 : "null" === f ? null : +f + "" === f ? +f : Sb.test(f) ? d.parseJSON(f) : f
                } catch (g) {
                }
                d.data(a, b, f)
            } else f = void 0
        }
        return f
    }

    function D(a) {
        for (var b in a)if (("data" !== b || !d.isEmptyObject(a[b])) && "toJSON" !== b)return!1;
        return!0
    }

    function e(a, b, f, q) {
        if (d.acceptData(a)) {
            var g, c, n = d.expando, x = a.nodeType, e = x ? d.cache : a, h = x ? a[n] : a[n] && n;
            if (h && e[h] && (q || e[h].data) || void 0 !== f || "string" != typeof b)return h || (h = x ? a[n] = O.pop() || d.guid++ : n), e[h] || (e[h] = x ? {} : {toJSON: d.noop}), ("object" == typeof b || "function" == typeof b) && (q ? e[h] = d.extend(e[h], b) : e[h].data = d.extend(e[h].data, b)), c = e[h], q || (c.data || (c.data = {}), c = c.data), void 0 !== f && (c[d.camelCase(b)] = f), "string" == typeof b ? (g = c[b], null == g && (g = c[d.camelCase(b)])) : g = c, g
        }
    }

    function w(a, b, f) {
        if (d.acceptData(a)) {
            var q,
                g, c = a.nodeType, n = c ? d.cache : a, x = c ? a[d.expando] : d.expando;
            if (n[x]) {
                if (b && (q = f ? n[x] : n[x].data)) {
                    d.isArray(b) ? b = b.concat(d.map(b, d.camelCase)) : b in q ? b = [b] : (b = d.camelCase(b), b = b in q ? [b] : b.split(" "));
                    for (g = b.length; g--;)delete q[b[g]];
                    if (f ? !D(q) : !d.isEmptyObject(q))return
                }
                (f || (delete n[x].data, D(n[x]))) && (c ? d.cleanData([a], !0) : t.deleteExpando || n != n.window ? delete n[x] : n[x] = null)
            }
        }
    }

    function H() {
        return!0
    }

    function z() {
        return!1
    }

    function E() {
        try {
            return u.activeElement
        } catch (a) {
        }
    }

    function ha(a) {
        var b = ib.split("|");
        a = a.createDocumentFragment();
        if (a.createElement)for (; b.length;)a.createElement(b.pop());
        return a
    }

    function C(a, b) {
        var f, q, g = 0, c = typeof a.getElementsByTagName !== U ? a.getElementsByTagName(b || "*") : typeof a.querySelectorAll !== U ? a.querySelectorAll(b || "*") : void 0;
        if (!c) {
            c = [];
            for (f = a.childNodes || a; null != (q = f[g]); g++)!b || d.nodeName(q, b) ? c.push(q) : d.merge(c, C(q, b))
        }
        return void 0 === b || b && d.nodeName(a, b) ? d.merge([a], c) : c
    }

    function B(a) {
        Ka.test(a.type) && (a.defaultChecked = a.checked)
    }

    function I(a, b) {
        return d.nodeName(a,
            "table") && d.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }

    function qa(a) {
        return a.type = (null !== d.find.attr(a, "type")) + "/" + a.type, a
    }

    function T(a) {
        var b = Tb.exec(a.type);
        return b ? a.type = b[1] : a.removeAttribute("type"), a
    }

    function F(a, b) {
        for (var f, q = 0; null != (f = a[q]); q++)d._data(f, "globalEval", !b || d._data(b[q], "globalEval"))
    }

    function Ya(a, b) {
        if (1 === b.nodeType && d.hasData(a)) {
            var f, q, g;
            q = d._data(a);
            var c = d._data(b,
                q), n = q.events;
            if (n)for (f in delete c.handle, c.events = {}, n) {
                q = 0;
                for (g = n[f].length; g > q; q++)d.event.add(b, f, n[f][q])
            }
            c.data && (c.data = d.extend({}, c.data))
        }
    }

    function Za(a, b) {
        var f, q = d(b.createElement(a)).appendTo(b.body), g = c.getDefaultComputedStyle && (f = c.getDefaultComputedStyle(q[0])) ? f.display : d.css(q[0], "display");
        return q.detach(), g
    }

    function va(a) {
        var b = u, f = jb[a];
        return f || (f = Za(a, b), "none" !== f && f || (ra = (ra || d("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = (ra[0].contentWindow ||
            ra[0].contentDocument).document, b.write(), b.close(), f = Za(a, b), ra.detach()), jb[a] = f), f
    }

    function $a(a, b) {
        return{get: function () {
            var f = a();
            if (null != f)return f ? void delete this.get : (this.get = b).apply(this, arguments)
        }}
    }

    function ab(a, b) {
        if (b in a)return b;
        for (var f = b.charAt(0).toUpperCase() + b.slice(1), d = b, g = kb.length; g--;)if (b = kb[g] + f, b in a)return b;
        return d
    }

    function bb(a, b) {
        for (var f, q, g, c = [], n = 0, x = a.length; x > n; n++)q = a[n], q.style && (c[n] = d._data(q, "olddisplay"), f = q.style.display, b ? (c[n] || "none" !== f || (q.style.display =
            ""), "" === q.style.display && aa(q) && (c[n] = d._data(q, "olddisplay", va(q.nodeName)))) : (g = aa(q), (f && "none" !== f || !g) && d._data(q, "olddisplay", g ? f : d.css(q, "display"))));
        for (n = 0; x > n; n++)q = a[n], q.style && (b && "none" !== q.style.display && "" !== q.style.display || (q.style.display = b ? c[n] || "" : "none"));
        return a
    }

    function cb(a, b, f) {
        return(a = Ub.exec(b)) ? Math.max(0, a[1] - (f || 0)) + (a[2] || "px") : b
    }

    function db(a, b, f, q, g) {
        b = f === (q ? "border" : "content") ? 4 : "width" === b ? 1 : 0;
        for (var c = 0; 4 > b; b += 2)"margin" === f && (c += d.css(a, f + ia[b], !0, g)), q ?
            ("content" === f && (c -= d.css(a, "padding" + ia[b], !0, g)), "margin" !== f && (c -= d.css(a, "border" + ia[b] + "Width", !0, g))) : (c += d.css(a, "padding" + ia[b], !0, g), "padding" !== f && (c += d.css(a, "border" + ia[b] + "Width", !0, g)));
        return c
    }

    function eb(a, b, f) {
        var q = !0, c = "width" === b ? a.offsetWidth : a.offsetHeight, k = ba(a), n = t.boxSizing && "border-box" === d.css(a, "boxSizing", !1, k);
        if (0 >= c || null == c) {
            if (c = Q(a, b, k), (0 > c || null == c) && (c = a.style[b]), xa.test(c))return c;
            q = n && (t.boxSizingReliable() || c === a.style[b]);
            c = parseFloat(c) || 0
        }
        return c + db(a,
            b, f || (n ? "border" : "content"), q, k) + "px"
    }

    function L(a, b, f, d, c) {
        return new L.prototype.init(a, b, f, d, c)
    }

    function gb() {
        return setTimeout(function () {
            X = void 0
        }), X = d.now()
    }

    function ja(a, b) {
        var f, d = {height: a}, c = 0;
        for (b = b ? 1 : 0; 4 > c; c += 2 - b)f = ia[c], d["margin" + f] = d["padding" + f] = a;
        return b && (d.opacity = d.width = a), d
    }

    function fb(a, b, f) {
        for (var d, c = (sa[b] || []).concat(sa["*"]), k = 0, n = c.length; n > k; k++)if (d = c[k].call(f, b, a))return d
    }

    function Pb(a, b) {
        var f, q, c, k, n;
        for (f in a)if (q = d.camelCase(f), c = b[q], k = a[f], d.isArray(k) &&
            (c = k[1], k = a[f] = k[0]), f !== q && (a[q] = k, delete a[f]), n = d.cssHooks[q], n && "expand"in n)for (f in k = n.expand(k), delete a[q], k)f in a || (a[f] = k[f], b[f] = c); else b[q] = c
    }

    function lb(a, b, f) {
        var q, c = 0, k = za.length, n = d.Deferred().always(function () {
            delete x.elem
        }), x = function () {
            if (q)return!1;
            for (var b = X || gb(), b = Math.max(0, e.startTime + e.duration - b), f = 1 - (b / e.duration || 0), d = 0, c = e.tweens.length; c > d; d++)e.tweens[d].run(f);
            return n.notifyWith(a, [e, f, b]), 1 > f && c ? b : (n.resolveWith(a, [e]), !1)
        }, e = n.promise({elem: a, props: d.extend({},
            b), opts: d.extend(!0, {specialEasing: {}}, f), originalProperties: b, originalOptions: f, startTime: X || gb(), duration: f.duration, tweens: [], createTween: function (b, f) {
            var q = d.Tween(a, e.opts, b, f, e.opts.specialEasing[b] || e.opts.easing);
            return e.tweens.push(q), q
        }, stop: function (b) {
            var f = 0, d = b ? e.tweens.length : 0;
            if (q)return this;
            for (q = !0; d > f; f++)e.tweens[f].run(1);
            return b ? n.resolveWith(a, [e, b]) : n.rejectWith(a, [e, b]), this
        }});
        f = e.props;
        for (Pb(f, e.opts.specialEasing); k > c; c++)if (b = za[c].call(e, a, f, e.opts))return b;
        return d.map(f,
            fb, e), d.isFunction(e.opts.start) && e.opts.start.call(a, e), d.fx.timer(d.extend(x, {elem: a, anim: e, queue: e.opts.queue})), e.progress(e.opts.progress).done(e.opts.done, e.opts.complete).fail(e.opts.fail).always(e.opts.always)
    }

    function mb(a) {
        return function (b, f) {
            "string" != typeof b && (f = b, b = "*");
            var q, c = 0, k = b.toLowerCase().match(W) || [];
            if (d.isFunction(f))for (; q = k[c++];)"+" === q.charAt(0) ? (q = q.slice(1) || "*", (a[q] = a[q] || []).unshift(f)) : (a[q] = a[q] || []).push(f)
        }
    }

    function nb(a, b, f, q) {
        function c(e) {
            var h;
            return k[e] = !0, d.each(a[e] || [], function (a, d) {
                var e = d(b, f, q);
                return"string" != typeof e || n || k[e] ? n ? !(h = e) : void 0 : (b.dataTypes.unshift(e), c(e), !1)
            }), h
        }

        var k = {}, n = a === La;
        return c(b.dataTypes[0]) || !k["*"] && c("*")
    }

    function Ma(a, b) {
        var f, q, c = d.ajaxSettings.flatOptions || {};
        for (q in b)void 0 !== b[q] && ((c[q] ? a : f || (f = {}))[q] = b[q]);
        return f && d.extend(!0, a, f), a
    }

    function Na(a, b, f, q) {
        var c;
        if (d.isArray(b))d.each(b, function (b, d) {
            f || Vb.test(a) ? q(a, d) : Na(a + "[" + ("object" == typeof d ? b : "") + "]", d, f, q)
        }); else if (f || "object" !== d.type(b))q(a,
            b); else for (c in b)Na(a + "[" + c + "]", b[c], f, q)
    }

    function ob() {
        try {
            return new c.XMLHttpRequest
        } catch (a) {
        }
    }

    function pb(a) {
        return d.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
    }

    var O = [], Y = O.slice, qb = O.concat, Oa = O.push, rb = O.indexOf, Da = {}, Wb = Da.toString, ka = Da.hasOwnProperty, t = {}, d = function (a, b) {
        return new d.fn.init(a, b)
    }, Xb = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, Yb = /^-ms-/, Zb = /-([\da-z])/gi, $b = function (a, b) {
        return b.toUpperCase()
    };
    d.fn = d.prototype = {jquery: "1.11.1", constructor: d, selector: "",
        length: 0, toArray: function () {
            return Y.call(this)
        }, get: function (a) {
            return null != a ? 0 > a ? this[a + this.length] : this[a] : Y.call(this)
        }, pushStack: function (a) {
            a = d.merge(this.constructor(), a);
            return a.prevObject = this, a.context = this.context, a
        }, each: function (a, b) {
            return d.each(this, a, b)
        }, map: function (a) {
            return this.pushStack(d.map(this, function (b, f) {
                return a.call(b, f, b)
            }))
        }, slice: function () {
            return this.pushStack(Y.apply(this, arguments))
        }, first: function () {
            return this.eq(0)
        }, last: function () {
            return this.eq(-1)
        }, eq: function (a) {
            var b =
                this.length;
            a = +a + (0 > a ? b : 0);
            return this.pushStack(0 <= a && b > a ? [this[a]] : [])
        }, end: function () {
            return this.prevObject || this.constructor(null)
        }, push: Oa, sort: O.sort, splice: O.splice};
    d.extend = d.fn.extend = function () {
        var a, b, f, q, c, k, n = arguments[0] || {}, e = 1, h = arguments.length, l = !1;
        "boolean" == typeof n && (l = n, n = arguments[e] || {}, e++);
        "object" == typeof n || d.isFunction(n) || (n = {});
        for (e === h && (n = this, e--); h > e; e++)if (null != (c = arguments[e]))for (q in c)a = n[q], f = c[q], n !== f && (l && f && (d.isPlainObject(f) || (b = d.isArray(f))) ? (b ?
            (b = !1, k = a && d.isArray(a) ? a : []) : k = a && d.isPlainObject(a) ? a : {}, n[q] = d.extend(l, k, f)) : void 0 !== f && (n[q] = f));
        return n
    };
    d.extend({expando: "jQuery" + ("1.11.1" + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (a) {
        throw Error(a);
    }, noop: function () {
    }, isFunction: function (a) {
        return"function" === d.type(a)
    }, isArray: Array.isArray || function (a) {
        return"array" === d.type(a)
    }, isWindow: function (a) {
        return null != a && a == a.window
    }, isNumeric: function (a) {
        return!d.isArray(a) && 0 <= a - parseFloat(a)
    }, isEmptyObject: function (a) {
        for (var b in a)return!1;
        return!0
    }, isPlainObject: function (a) {
        var b;
        if (!a || "object" !== d.type(a) || a.nodeType || d.isWindow(a))return!1;
        try {
            if (a.constructor && !ka.call(a, "constructor") && !ka.call(a.constructor.prototype, "isPrototypeOf"))return!1
        } catch (f) {
            return!1
        }
        if (t.ownLast)for (b in a)return ka.call(a, b);
        for (b in a);
        return void 0 === b || ka.call(a, b)
    }, type: function (a) {
        return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? Da[Wb.call(a)] || "object" : typeof a
    }, globalEval: function (a) {
        a && d.trim(a) && (c.execScript || function (a) {
            c.eval.call(c,
                a)
        })(a)
    }, camelCase: function (a) {
        return a.replace(Yb, "ms-").replace(Zb, $b)
    }, nodeName: function (a, b) {
        return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
    }, each: function (a, b, f) {
        var d, c = 0, k = a.length, n = h(a);
        if (f)if (n)for (; k > c && !(d = b.apply(a[c], f), !1 === d); c++); else for (c in a) {
            if (d = b.apply(a[c], f), !1 === d)break
        } else if (n)for (; k > c && !(d = b.call(a[c], c, a[c]), !1 === d); c++); else for (c in a)if (d = b.call(a[c], c, a[c]), !1 === d)break;
        return a
    }, trim: function (a) {
        return null == a ? "" : (a + "").replace(Xb, "")
    }, makeArray: function (a, b) {
        var f = b || [];
        return null != a && (h(Object(a)) ? d.merge(f, "string" == typeof a ? [a] : a) : Oa.call(f, a)), f
    }, inArray: function (a, b, f) {
        var d;
        if (b) {
            if (rb)return rb.call(b, a, f);
            d = b.length;
            for (f = f ? 0 > f ? Math.max(0, d + f) : f : 0; d > f; f++)if (f in b && b[f] === a)return f
        }
        return-1
    }, merge: function (a, b) {
        for (var f = +b.length, d = 0, c = a.length; f > d;)a[c++] = b[d++];
        if (f !== f)for (; void 0 !== b[d];)a[c++] = b[d++];
        return a.length = c, a
    }, grep: function (a, b, f) {
        for (var d = [], c = 0, k = a.length, n = !f; k > c; c++)f = !b(a[c], c), f !== n && d.push(a[c]);
        return d
    }, map: function (a, b, f) {
        var d, c = 0, k = a.length, n = [];
        if (h(a))for (; k > c; c++)d = b(a[c], c, f), null != d && n.push(d); else for (c in a)d = b(a[c], c, f), null != d && n.push(d);
        return qb.apply([], n)
    }, guid: 1, proxy: function (a, b) {
        var f, c, g;
        return"string" == typeof b && (g = a[b], b = a, a = g), d.isFunction(a) ? (f = Y.call(arguments, 2), c = function () {
            return a.apply(b || this, f.concat(Y.call(arguments)))
        }, c.guid = a.guid = a.guid || d.guid++, c) : void 0
    }, now: function () {
        return+new Date
    }, support: t});
    d.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),
        function (a, b) {
            Da["[object " + b + "]"] = b.toLowerCase()
        });
    var oa = function (a) {
        function b(a, b, d, f) {
            var c, q, g, k, n;
            if ((b ? b.ownerDocument || b : Z) !== R && F(b), b = b || R, d = d || [], !a || "string" != typeof a)return d;
            if (1 !== (k = b.nodeType) && 9 !== k)return[];
            if (ca && !f) {
                if (c = va.exec(a))if (g = c[1])if (9 === k) {
                    if (q = b.getElementById(g), !q || !q.parentNode)return d;
                    if (q.id === g)return d.push(q), d
                } else {
                    if (b.ownerDocument && (q = b.ownerDocument.getElementById(g)) && I(b, q) && q.id === g)return d.push(q), d
                } else {
                    if (c[2])return la.apply(d, b.getElementsByTagName(a)),
                        d;
                    if ((g = c[3]) && y.getElementsByClassName && b.getElementsByClassName)return la.apply(d, b.getElementsByClassName(g)), d
                }
                if (y.qsa && (!V || !V.test(a))) {
                    if (q = c = G, g = b, n = 9 === k && a, 1 === k && "object" !== b.nodeName.toLowerCase()) {
                        k = Aa(a);
                        (c = b.getAttribute("id")) ? q = c.replace(xa, "\\$&") : b.setAttribute("id", q);
                        q = "[id='" + q + "'] ";
                        for (g = k.length; g--;)k[g] = q + m(k[g]);
                        g = ja.test(a) && p(b.parentNode) || b;
                        n = k.join(",")
                    }
                    if (n)try {
                        return la.apply(d, g.querySelectorAll(n)), d
                    } catch (e) {
                    } finally {
                        c || b.removeAttribute("id")
                    }
                }
            }
            return K(a.replace(X,
                "$1"), b, d, f)
        }

        function d() {
            function a(d, f) {
                return b.push(d + " ") > v.cacheLength && delete a[b.shift()], a[d + " "] = f
            }

            var b = [];
            return a
        }

        function c(a) {
            return a[G] = !0, a
        }

        function g(a) {
            var b = R.createElement("div");
            try {
                return!!a(b)
            } catch (d) {
                return!1
            } finally {
                b.parentNode && b.parentNode.removeChild(b)
            }
        }

        function k(a, b) {
            for (var d = a.split("|"), f = a.length; f--;)v.attrHandle[d[f]] = b
        }

        function n(a, b) {
            var d = b && a, f = d && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || Y) - (~a.sourceIndex || Y);
            if (f)return f;
            if (d)for (; d = d.nextSibling;)if (d ===
                b)return-1;
            return a ? 1 : -1
        }

        function e(a) {
            return function (b) {
                return"input" === b.nodeName.toLowerCase() && b.type === a
            }
        }

        function h(a) {
            return function (b) {
                var d = b.nodeName.toLowerCase();
                return("input" === d || "button" === d) && b.type === a
            }
        }

        function l(a) {
            return c(function (b) {
                return b = +b, c(function (d, f) {
                    for (var c, q = a([], d.length, b), g = q.length; g--;)d[c = q[g]] && (d[c] = !(f[c] = d[c]))
                })
            })
        }

        function p(a) {
            return a && typeof a.getElementsByTagName !== O && a
        }

        function s() {
        }

        function m(a) {
            for (var b = 0, d = a.length, f = ""; d > b; b++)f += a[b].value;
            return f
        }

        function r(a, b, d) {
            var f = b.dir, c = d && "parentNode" === f, q = L++;
            return b.first ? function (b, d, q) {
                for (; b = b[f];)if (1 === b.nodeType || c)return a(b, d, q)
            } : function (b, d, g) {
                var k, n, e = [M, q];
                if (g)for (; b = b[f];) {
                    if ((1 === b.nodeType || c) && a(b, d, g))return!0
                } else for (; b = b[f];)if (1 === b.nodeType || c) {
                    if (n = b[G] || (b[G] = {}), (k = n[f]) && k[0] === M && k[1] === q)return e[2] = k[2];
                    if (n[f] = e, e[2] = a(b, d, g))return!0
                }
            }
        }

        function t(a) {
            return 1 < a.length ? function (b, d, f) {
                for (var c = a.length; c--;)if (!a[c](b, d, f))return!1;
                return!0
            } : a[0]
        }

        function w(a, b, d, f, c) {
            for (var q, g = [], k = 0, n = a.length, e = null != b; n > k; k++)(q = a[k]) && (!d || d(q, f, c)) && (g.push(q), e && b.push(k));
            return g
        }

        function u(a, d, f, g, k, n) {
            return g && !g[G] && (g = u(g)), k && !k[G] && (k = u(k, n)), c(function (c, q, n, e) {
                var x, h, s = [], l = [], p = q.length, P;
                if (!(P = c)) {
                    P = d || "*";
                    for (var m = n.nodeType ? [n] : n, r = [], wa = 0, Ca = m.length; Ca > wa; wa++)b(P, m[wa], r);
                    P = r
                }
                P = !a || !c && d ? P : w(P, s, a, n, e);
                m = f ? k || (c ? a : p || g) ? [] : q : P;
                if (f && f(P, m, n, e), g) {
                    x = w(m, l);
                    g(x, [], n, e);
                    for (n = x.length; n--;)(h = x[n]) && (m[l[n]] = !(P[l[n]] = h))
                }
                if (c) {
                    if (k || a) {
                        if (k) {
                            x =
                                [];
                            for (n = m.length; n--;)(h = m[n]) && x.push(P[n] = h);
                            k(null, m = [], x, e)
                        }
                        for (n = m.length; n--;)(h = m[n]) && -1 < (x = k ? Q.call(c, h) : s[n]) && (c[x] = !(q[x] = h))
                    }
                } else m = w(m === q ? m.splice(p, m.length) : m), k ? k(null, q, m, e) : la.apply(q, m)
            })
        }

        function z(a) {
            var b, d, f, c = a.length, q = v.relative[a[0].type];
            d = q || v.relative[" "];
            for (var g = q ? 1 : 0, k = r(function (a) {
                return a === b
            }, d, !0), n = r(function (a) {
                return-1 < Q.call(b, a)
            }, d, !0), e = [function (a, d, f) {
                return!q && (f || d !== D) || ((b = d).nodeType ? k(a, d, f) : n(a, d, f))
            }]; c > g; g++)if (d = v.relative[a[g].type])e =
                [r(t(e), d)]; else {
                if (d = v.filter[a[g].type].apply(null, a[g].matches), d[G]) {
                    for (f = ++g; c > f && !v.relative[a[f].type]; f++);
                    return u(1 < g && t(e), 1 < g && m(a.slice(0, g - 1).concat({value: " " === a[g - 2].type ? "*" : ""})).replace(X, "$1"), d, f > g && z(a.slice(g, f)), c > f && z(a = a.slice(f)), c > f && m(a))
                }
                e.push(d)
            }
            return t(e)
        }

        function H(a, d) {
            var f = 0 < d.length, g = 0 < a.length, k = function (c, q, k, n, e) {
                var x, h, s, l = 0, m = "0", P = c && [], p = [], r = D, wa = c || g && v.find.TAG("*", e), Ca = M += null == r ? 1 : Math.random() || 0.1, t = wa.length;
                for (e && (D = q !== R && q); m !== t && null !=
                    (x = wa[m]); m++) {
                    if (g && x) {
                        for (h = 0; s = a[h++];)if (s(x, q, k)) {
                            n.push(x);
                            break
                        }
                        e && (M = Ca)
                    }
                    f && ((x = !s && x) && l--, c && P.push(x))
                }
                if (l += m, f && m !== l) {
                    for (h = 0; s = d[h++];)s(P, p, q, k);
                    if (c) {
                        if (0 < l)for (; m--;)P[m] || p[m] || (p[m] = ha.call(n));
                        p = w(p)
                    }
                    la.apply(n, p);
                    e && !c && 0 < p.length && 1 < l + d.length && b.uniqueSort(n)
                }
                return e && (M = Ca, D = r), P
            };
            return f ? c(k) : k
        }

        var A, y, v, E, sb, Aa, B, K, D, C, ya, F, R, da, ca, V, ta, J, I, G = "sizzle" + -new Date, Z = a.document, M = 0, L = 0, S = d(), T = d(), U = d(), W = function (a, b) {
                return a === b && (ya = !0), 0
            }, O = "undefined", Y = -2147483648,
            fa = {}.hasOwnProperty, N = [], ha = N.pop, ia = N.push, la = N.push, ba = N.slice, Q = N.indexOf || function (a) {
                for (var b = 0, d = this.length; d > b; b++)if (this[b] === a)return b;
                return-1
            }, ea = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+".replace("w", "w#"), ga = "\\[[\\x20\\t\\r\\n\\f]*((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+)(?:[\\x20\\t\\r\\n\\f]*([*^$|!~]?=)[\\x20\\t\\r\\n\\f]*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ea + "))|)[\\x20\\t\\r\\n\\f]*\\]", $ = ":((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+)(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
                ga + ")*)|.*)\\)|)", X = RegExp("^[\\x20\\t\\r\\n\\f]+|((?:^|[^\\\\])(?:\\\\.)*)[\\x20\\t\\r\\n\\f]+$", "g"), ka = /^[\x20\t\r\n\f]*,[\x20\t\r\n\f]*/, oa = /^[\x20\t\r\n\f]*([>+~]|[\x20\t\r\n\f])[\x20\t\r\n\f]*/, pa = RegExp("=[\\x20\\t\\r\\n\\f]*([^\\]'\"]*?)[\\x20\\t\\r\\n\\f]*\\]", "g"), qa = RegExp($), ra = RegExp("^" + ea + "$"), aa = {ID: /^#((?:\\.|[\w-]|[^\x00-\xa0])+)/, CLASS: /^\.((?:\\.|[\w-]|[^\x00-\xa0])+)/, TAG: RegExp("^(" + "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+".replace("w", "w*") + ")"), ATTR: RegExp("^" + ga), PSEUDO: RegExp("^" +
                $), CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\([\\x20\\t\\r\\n\\f]*(even|odd|(([+-]|)(\\d*)n|)[\\x20\\t\\r\\n\\f]*(?:([+-]|)[\\x20\\t\\r\\n\\f]*(\\d+)|))[\\x20\\t\\r\\n\\f]*\\)|)", "i"), bool: RegExp("^(?:checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)$", "i"), needsContext: RegExp("^[\\x20\\t\\r\\n\\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\([\\x20\\t\\r\\n\\f]*((?:-\\d)?\\d*)[\\x20\\t\\r\\n\\f]*\\)|)(?=[^-]|$)",
                "i")}, sa = /^(?:input|select|textarea|button)$/i, ua = /^h\d$/i, Ba = /^[^{]+\{\s*\[native \w/, va = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ja = /[+~]/, xa = /'|\\/g, ma = RegExp("\\\\([\\da-f]{1,6}[\\x20\\t\\r\\n\\f]?|([\\x20\\t\\r\\n\\f])|.)", "ig"), na = function (a, b, d) {
                a = "0x" + b - 65536;
                return a !== a || d ? b : 0 > a ? String.fromCharCode(a + 65536) : String.fromCharCode(a >> 10 | 55296, 1023 & a | 56320)
            };
        try {
            la.apply(N = ba.call(Z.childNodes), Z.childNodes), N[Z.childNodes.length].nodeType
        } catch (za) {
            la = {apply: N.length ? function (a, b) {
                ia.apply(a, ba.call(b))
            } :
                function (a, b) {
                    for (var d = a.length, f = 0; a[d++] = b[f++];);
                    a.length = d - 1
                }}
        }
        y = b.support = {};
        sb = b.isXML = function (a) {
            return(a = a && (a.ownerDocument || a).documentElement) ? "HTML" !== a.nodeName : !1
        };
        F = b.setDocument = function (a) {
            var b, d = a ? a.ownerDocument || a : Z;
            a = d.defaultView;
            return d !== R && 9 === d.nodeType && d.documentElement ? (R = d, da = d.documentElement, ca = !sb(d), a && a !== a.top && (a.addEventListener ? a.addEventListener("unload", function () {
                F()
            }, !1) : a.attachEvent && a.attachEvent("onunload", function () {
                F()
            })), y.attributes = g(function (a) {
                return a.className =
                    "i", !a.getAttribute("className")
            }), y.getElementsByTagName = g(function (a) {
                return a.appendChild(d.createComment("")), !a.getElementsByTagName("*").length
            }), y.getElementsByClassName = Ba.test(d.getElementsByClassName) && g(function (a) {
                return a.innerHTML = "<div class='a'></div><div class='a i'></div>", a.firstChild.className = "i", 2 === a.getElementsByClassName("i").length
            }), y.getById = g(function (a) {
                return da.appendChild(a).id = G, !d.getElementsByName || !d.getElementsByName(G).length
            }), y.getById ? (v.find.ID = function (a, b) {
                if (typeof b.getElementById !== O && ca) {
                    var d = b.getElementById(a);
                    return d && d.parentNode ? [d] : []
                }
            }, v.filter.ID = function (a) {
                var b = a.replace(ma, na);
                return function (a) {
                    return a.getAttribute("id") === b
                }
            }) : (delete v.find.ID, v.filter.ID = function (a) {
                var b = a.replace(ma, na);
                return function (a) {
                    return(a = typeof a.getAttributeNode !== O && a.getAttributeNode("id")) && a.value === b
                }
            }), v.find.TAG = y.getElementsByTagName ? function (a, b) {
                return typeof b.getElementsByTagName !== O ? b.getElementsByTagName(a) : void 0
            } : function (a, b) {
                var d,
                    f = [], c = 0, q = b.getElementsByTagName(a);
                if ("*" === a) {
                    for (; d = q[c++];)1 === d.nodeType && f.push(d);
                    return f
                }
                return q
            }, v.find.CLASS = y.getElementsByClassName && function (a, b) {
                return typeof b.getElementsByClassName !== O && ca ? b.getElementsByClassName(a) : void 0
            }, ta = [], V = [], (y.qsa = Ba.test(d.querySelectorAll)) && (g(function (a) {
                a.innerHTML = "<select msallowclip=''><option selected=''></option></select>";
                a.querySelectorAll("[msallowclip^='']").length && V.push("[*^$]=[\\x20\\t\\r\\n\\f]*(?:''|\"\")");
                a.querySelectorAll("[selected]").length ||
                V.push("\\[[\\x20\\t\\r\\n\\f]*(?:value|checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)");
                a.querySelectorAll(":checked").length || V.push(":checked")
            }), g(function (a) {
                var b = d.createElement("input");
                b.setAttribute("type", "hidden");
                a.appendChild(b).setAttribute("name", "D");
                a.querySelectorAll("[name=d]").length && V.push("name[\\x20\\t\\r\\n\\f]*[*^$|!~]?=");
                a.querySelectorAll(":enabled").length || V.push(":enabled", ":disabled");
                a.querySelectorAll("*,:x");
                V.push(",.*:")
            })), (y.matchesSelector = Ba.test(J = da.matches || da.webkitMatchesSelector || da.mozMatchesSelector || da.oMatchesSelector || da.msMatchesSelector)) && g(function (a) {
                y.disconnectedMatch = J.call(a, "div");
                J.call(a, "[s!='']:x");
                ta.push("!=", $)
            }), V = V.length && RegExp(V.join("|")), ta = ta.length && RegExp(ta.join("|")), b = Ba.test(da.compareDocumentPosition), I = b || Ba.test(da.contains) ? function (a, b) {
                var d = 9 === a.nodeType ? a.documentElement : a, f = b && b.parentNode;
                return a === f || !(!f || 1 !== f.nodeType || !(d.contains ? d.contains(f) :
                    a.compareDocumentPosition && 16 & a.compareDocumentPosition(f)))
            } : function (a, b) {
                if (b)for (; b = b.parentNode;)if (b === a)return!0;
                return!1
            }, W = b ? function (a, b) {
                if (a === b)return ya = !0, 0;
                var f = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return f ? f : (f = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & f || !y.sortDetached && b.compareDocumentPosition(a) === f ? a === d || a.ownerDocument === Z && I(Z, a) ? -1 : b === d || b.ownerDocument === Z && I(Z, b) ? 1 : C ? Q.call(C, a) - Q.call(C, b) : 0 : 4 & f ? -1 : 1)
            } : function (a, b) {
                if (a === b)return ya = !0, 0;
                var f, c = 0;
                f = a.parentNode;
                var q = b.parentNode, g = [a], k = [b];
                if (!f || !q)return a === d ? -1 : b === d ? 1 : f ? -1 : q ? 1 : C ? Q.call(C, a) - Q.call(C, b) : 0;
                if (f === q)return n(a, b);
                for (f = a; f = f.parentNode;)g.unshift(f);
                for (f = b; f = f.parentNode;)k.unshift(f);
                for (; g[c] === k[c];)c++;
                return c ? n(g[c], k[c]) : g[c] === Z ? -1 : k[c] === Z ? 1 : 0
            }, d) : R
        };
        b.matches = function (a, d) {
            return b(a, null, null, d)
        };
        b.matchesSelector = function (a, d) {
            if ((a.ownerDocument || a) !== R && F(a), d = d.replace(pa, "='$1']"), !(!y.matchesSelector || !ca || ta && ta.test(d) ||
                V && V.test(d)))try {
                var f = J.call(a, d);
                if (f || y.disconnectedMatch || a.document && 11 !== a.document.nodeType)return f
            } catch (c) {
            }
            return 0 < b(d, R, null, [a]).length
        };
        b.contains = function (a, b) {
            return(a.ownerDocument || a) !== R && F(a), I(a, b)
        };
        b.attr = function (a, b) {
            (a.ownerDocument || a) !== R && F(a);
            var d = v.attrHandle[b.toLowerCase()], d = d && fa.call(v.attrHandle, b.toLowerCase()) ? d(a, b, !ca) : void 0;
            return void 0 !== d ? d : y.attributes || !ca ? a.getAttribute(b) : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
        };
        b.error = function (a) {
            throw Error("Syntax error, unrecognized expression: " +
                a);
        };
        b.uniqueSort = function (a) {
            var b, d = [], f = 0, c = 0;
            if (ya = !y.detectDuplicates, C = !y.sortStable && a.slice(0), a.sort(W), ya) {
                for (; b = a[c++];)b === a[c] && (f = d.push(c));
                for (; f--;)a.splice(d[f], 1)
            }
            return C = null, a
        };
        E = b.getText = function (a) {
            var b, d = "", f = 0;
            if (b = a.nodeType)if (1 === b || 9 === b || 11 === b) {
                if ("string" == typeof a.textContent)return a.textContent;
                for (a = a.firstChild; a; a = a.nextSibling)d += E(a)
            } else {
                if (3 === b || 4 === b)return a.nodeValue
            } else for (; b = a[f++];)d += E(b);
            return d
        };
        v = b.selectors = {cacheLength: 50, createPseudo: c,
            match: aa, attrHandle: {}, find: {}, relative: {">": {dir: "parentNode", first: !0}, " ": {dir: "parentNode"}, "+": {dir: "previousSibling", first: !0}, "~": {dir: "previousSibling"}}, preFilter: {ATTR: function (a) {
                return a[1] = a[1].replace(ma, na), a[3] = (a[3] || a[4] || a[5] || "").replace(ma, na), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
            }, CHILD: function (a) {
                return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || b.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] &&
                    b.error(a[0]), a
            }, PSEUDO: function (a) {
                var b, d = !a[6] && a[2];
                return aa.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : d && qa.test(d) && (b = Aa(d, !0)) && (b = d.indexOf(")", d.length - b) - d.length) && (a[0] = a[0].slice(0, b), a[2] = d.slice(0, b)), a.slice(0, 3))
            }}, filter: {TAG: function (a) {
                var b = a.replace(ma, na).toLowerCase();
                return"*" === a ? function () {
                    return!0
                } : function (a) {
                    return a.nodeName && a.nodeName.toLowerCase() === b
                }
            }, CLASS: function (a) {
                var b = S[a + " "];
                return b || (b = RegExp("(^|[\\x20\\t\\r\\n\\f])" + a + "([\\x20\\t\\r\\n\\f]|$)")) &&
                    S(a, function (a) {
                        return b.test("string" == typeof a.className && a.className || typeof a.getAttribute !== O && a.getAttribute("class") || "")
                    })
            }, ATTR: function (a, d, f) {
                return function (c) {
                    c = b.attr(c, a);
                    return null == c ? "!=" === d : d ? (c += "", "=" === d ? c === f : "!=" === d ? c !== f : "^=" === d ? f && 0 === c.indexOf(f) : "*=" === d ? f && -1 < c.indexOf(f) : "$=" === d ? f && c.slice(-f.length) === f : "~=" === d ? -1 < (" " + c + " ").indexOf(f) : "|=" === d ? c === f || c.slice(0, f.length + 1) === f + "-" : !1) : !0
                }
            }, CHILD: function (a, b, d, f, c) {
                var q = "nth" !== a.slice(0, 3), g = "last" !== a.slice(-4),
                    k = "of-type" === b;
                return 1 === f && 0 === c ? function (a) {
                    return!!a.parentNode
                } : function (b, d, n) {
                    var e, x, h, s, l;
                    d = q !== g ? "nextSibling" : "previousSibling";
                    var m = b.parentNode, p = k && b.nodeName.toLowerCase();
                    n = !n && !k;
                    if (m) {
                        if (q) {
                            for (; d;) {
                                for (x = b; x = x[d];)if (k ? x.nodeName.toLowerCase() === p : 1 === x.nodeType)return!1;
                                l = d = "only" === a && !l && "nextSibling"
                            }
                            return!0
                        }
                        if (l = [g ? m.firstChild : m.lastChild], g && n) {
                            n = m[G] || (m[G] = {});
                            e = n[a] || [];
                            s = e[0] === M && e[1];
                            h = e[0] === M && e[2];
                            for (x = s && m.childNodes[s]; x = ++s && x && x[d] || (h = s = 0) || l.pop();)if (1 ===
                                x.nodeType && ++h && x === b) {
                                n[a] = [M, s, h];
                                break
                            }
                        } else if (n && (e = (b[G] || (b[G] = {}))[a]) && e[0] === M)h = e[1]; else for (; (x = ++s && x && x[d] || (h = s = 0) || l.pop()) && (!(k ? x.nodeName.toLowerCase() === p : 1 === x.nodeType) || !++h || !(n && ((x[G] || (x[G] = {}))[a] = [M, h]), x === b)););
                        return h -= c, h === f || 0 === h % f && 0 <= h / f
                    }
                }
            }, PSEUDO: function (a, d) {
                var f, g = v.pseudos[a] || v.setFilters[a.toLowerCase()] || b.error("unsupported pseudo: " + a);
                return g[G] ? g(d) : 1 < g.length ? (f = [a, a, "", d], v.setFilters.hasOwnProperty(a.toLowerCase()) ? c(function (a, b) {
                    for (var f,
                             c = g(a, d), q = c.length; q--;)f = Q.call(a, c[q]), a[f] = !(b[f] = c[q])
                }) : function (a) {
                    return g(a, 0, f)
                }) : g
            }}, pseudos: {not: c(function (a) {
                var b = [], d = [], f = B(a.replace(X, "$1"));
                return f[G] ? c(function (a, b, d, c) {
                    var q;
                    d = f(a, null, c, []);
                    for (c = a.length; c--;)(q = d[c]) && (a[c] = !(b[c] = q))
                }) : function (a, c, q) {
                    return b[0] = a, f(b, null, q, d), !d.pop()
                }
            }), has: c(function (a) {
                return function (d) {
                    return 0 < b(a, d).length
                }
            }), contains: c(function (a) {
                return function (b) {
                    return-1 < (b.textContent || b.innerText || E(b)).indexOf(a)
                }
            }), lang: c(function (a) {
                return ra.test(a ||
                    "") || b.error("unsupported lang: " + a), a = a.replace(ma, na).toLowerCase(), function (b) {
                    var d;
                    do if (d = ca ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang"))return d = d.toLowerCase(), d === a || 0 === d.indexOf(a + "-"); while ((b = b.parentNode) && 1 === b.nodeType);
                    return!1
                }
            }), target: function (b) {
                var d = a.location && a.location.hash;
                return d && d.slice(1) === b.id
            }, root: function (a) {
                return a === da
            }, focus: function (a) {
                return a === R.activeElement && (!R.hasFocus || R.hasFocus()) && !(!a.type && !a.href && !~a.tabIndex)
            }, enabled: function (a) {
                return!1 ===
                    a.disabled
            }, disabled: function (a) {
                return!0 === a.disabled
            }, checked: function (a) {
                var b = a.nodeName.toLowerCase();
                return"input" === b && !!a.checked || "option" === b && !!a.selected
            }, selected: function (a) {
                return a.parentNode && a.parentNode.selectedIndex, !0 === a.selected
            }, empty: function (a) {
                for (a = a.firstChild; a; a = a.nextSibling)if (6 > a.nodeType)return!1;
                return!0
            }, parent: function (a) {
                return!v.pseudos.empty(a)
            }, header: function (a) {
                return ua.test(a.nodeName)
            }, input: function (a) {
                return sa.test(a.nodeName)
            }, button: function (a) {
                var b =
                    a.nodeName.toLowerCase();
                return"input" === b && "button" === a.type || "button" === b
            }, text: function (a) {
                var b;
                return"input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
            }, first: l(function () {
                return[0]
            }), last: l(function (a, b) {
                return[b - 1]
            }), eq: l(function (a, b, d) {
                return[0 > d ? d + b : d]
            }), even: l(function (a, b) {
                for (var d = 0; b > d; d += 2)a.push(d);
                return a
            }), odd: l(function (a, b) {
                for (var d = 1; b > d; d += 2)a.push(d);
                return a
            }), lt: l(function (a, b, d) {
                for (b = 0 > d ? d + b : d; 0 <= --b;)a.push(b);
                return a
            }), gt: l(function (a, b, d) {
                for (d = 0 > d ? d + b : d; ++d < b;)a.push(d);
                return a
            })}};
        v.pseudos.nth = v.pseudos.eq;
        for (A in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0})v.pseudos[A] = e(A);
        for (A in{submit: !0, reset: !0})v.pseudos[A] = h(A);
        s.prototype = v.filters = v.pseudos;
        v.setFilters = new s;
        Aa = b.tokenize = function (a, d) {
            var f, c, q, g, k, n, e;
            if (k = T[a + " "])return d ? 0 : k.slice(0);
            k = a;
            n = [];
            for (e = v.preFilter; k;) {
                (!f || (c = ka.exec(k))) && (c && (k = k.slice(c[0].length) || k), n.push(q = []));
                f = !1;
                (c = oa.exec(k)) && (f = c.shift(), q.push({value: f,
                    type: c[0].replace(X, " ")}), k = k.slice(f.length));
                for (g in v.filter)!(c = aa[g].exec(k)) || e[g] && !(c = e[g](c)) || (f = c.shift(), q.push({value: f, type: g, matches: c}), k = k.slice(f.length));
                if (!f)break
            }
            return d ? k.length : k ? b.error(a) : T(a, n).slice(0)
        };
        return B = b.compile = function (a, b) {
            var d, f = [], c = [], q = U[a + " "];
            if (!q) {
                b || (b = Aa(a));
                for (d = b.length; d--;)q = z(b[d]), q[G] ? f.push(q) : c.push(q);
                q = U(a, H(c, f));
                q.selector = a
            }
            return q
        }, K = b.select = function (a, b, d, f) {
            var c, q, g, k, n, e = "function" == typeof a && a, x = !f && Aa(a = e.selector || a);
            if (d = d || [], 1 === x.length) {
                if (q = x[0] = x[0].slice(0), 2 < q.length && "ID" === (g = q[0]).type && y.getById && 9 === b.nodeType && ca && v.relative[q[1].type]) {
                    if (b = (v.find.ID(g.matches[0].replace(ma, na), b) || [])[0], !b)return d;
                    e && (b = b.parentNode);
                    a = a.slice(q.shift().value.length)
                }
                for (c = aa.needsContext.test(a) ? 0 : q.length; c-- && !(g = q[c], v.relative[k = g.type]);)if ((n = v.find[k]) && (f = n(g.matches[0].replace(ma, na), ja.test(q[0].type) && p(b.parentNode) || b))) {
                    if (q.splice(c, 1), a = f.length && m(q), !a)return la.apply(d, f), d;
                    break
                }
            }
            return(e ||
                B(a, x))(f, b, !ca, d, ja.test(a) && p(b.parentNode) || b), d
        }, y.sortStable = G.split("").sort(W).join("") === G, y.detectDuplicates = !!ya, F(), y.sortDetached = g(function (a) {
            return 1 & a.compareDocumentPosition(R.createElement("div"))
        }), g(function (a) {
            return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
        }) || k("type|href|height|width", function (a, b, d) {
            return d ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
        }), y.attributes && g(function (a) {
            return a.innerHTML = "<input/>", a.firstChild.setAttribute("value",
                ""), "" === a.firstChild.getAttribute("value")
        }) || k("value", function (a, b, d) {
            return d || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue
        }), g(function (a) {
            return null == a.getAttribute("disabled")
        }) || k("checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", function (a, b, d) {
            var f;
            return d ? void 0 : !0 === a[b] ? b.toLowerCase() : (f = a.getAttributeNode(b)) && f.specified ? f.value : null
        }), b
    }(c);
    d.find = oa;
    d.expr = oa.selectors;
    d.expr[":"] = d.expr.pseudos;
    d.unique = oa.uniqueSort;
    d.text = oa.getText;
    d.isXMLDoc = oa.isXML;
    d.contains = oa.contains;
    var tb = d.expr.match.needsContext, ub = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, Qb = /^.[^:#\[\.,]*$/;
    d.filter = function (a, b, f) {
        var c = b[0];
        return f && (a = ":not(" + a + ")"), 1 === b.length && 1 === c.nodeType ? d.find.matchesSelector(c, a) ? [c] : [] : d.find.matches(a, d.grep(b, function (a) {
            return 1 === a.nodeType
        }))
    };
    d.fn.extend({find: function (a) {
        var b, f = [], c = this, g = c.length;
        if ("string" != typeof a)return this.pushStack(d(a).filter(function () {
            for (b = 0; g > b; b++)if (d.contains(c[b],
                this))return!0
        }));
        for (b = 0; g > b; b++)d.find(a, c[b], f);
        return f = this.pushStack(1 < g ? d.unique(f) : f), f.selector = this.selector ? this.selector + " " + a : a, f
    }, filter: function (a) {
        return this.pushStack(p(this, a || [], !1))
    }, not: function (a) {
        return this.pushStack(p(this, a || [], !0))
    }, is: function (a) {
        return!!p(this, "string" == typeof a && tb.test(a) ? d(a) : a || [], !1).length
    }});
    var ua, u = c.document, bc = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
    (d.fn.init = function (a, b) {
        var f, c;
        if (!a)return this;
        if ("string" == typeof a) {
            if (f = "<" === a.charAt(0) &&
                ">" === a.charAt(a.length - 1) && 3 <= a.length ? [null, a, null] : bc.exec(a), !f || !f[1] && b)return!b || b.jquery ? (b || ua).find(a) : this.constructor(b).find(a);
            if (f[1]) {
                if (b = b instanceof d ? b[0] : b, d.merge(this, d.parseHTML(f[1], b && b.nodeType ? b.ownerDocument || b : u, !0)), ub.test(f[1]) && d.isPlainObject(b))for (f in b)d.isFunction(this[f]) ? this[f](b[f]) : this.attr(f, b[f]);
                return this
            }
            if (c = u.getElementById(f[2]), c && c.parentNode) {
                if (c.id !== f[2])return ua.find(a);
                this.length = 1;
                this[0] = c
            }
            return this.context = u, this.selector = a, this
        }
        return a.nodeType ?
            (this.context = this[0] = a, this.length = 1, this) : d.isFunction(a) ? "undefined" != typeof ua.ready ? ua.ready(a) : a(d) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), d.makeArray(a, this))
    }).prototype = d.fn;
    ua = d(u);
    var cc = /^(?:parents|prev(?:Until|All))/, dc = {children: !0, contents: !0, next: !0, prev: !0};
    d.extend({dir: function (a, b, f) {
        var c = [];
        for (a = a[b]; a && 9 !== a.nodeType && (void 0 === f || 1 !== a.nodeType || !d(a).is(f));)1 === a.nodeType && c.push(a), a = a[b];
        return c
    }, sibling: function (a, b) {
        for (var d = []; a; a =
            a.nextSibling)1 === a.nodeType && a !== b && d.push(a);
        return d
    }});
    d.fn.extend({has: function (a) {
        var b, f = d(a, this), c = f.length;
        return this.filter(function () {
            for (b = 0; c > b; b++)if (d.contains(this, f[b]))return!0
        })
    }, closest: function (a, b) {
        for (var f, c = 0, g = this.length, k = [], n = tb.test(a) || "string" != typeof a ? d(a, b || this.context) : 0; g > c; c++)for (f = this[c]; f && f !== b; f = f.parentNode)if (11 > f.nodeType && (n ? -1 < n.index(f) : 1 === f.nodeType && d.find.matchesSelector(f, a))) {
            k.push(f);
            break
        }
        return this.pushStack(1 < k.length ? d.unique(k) : k)
    },
        index: function (a) {
            return a ? "string" == typeof a ? d.inArray(this[0], d(a)) : d.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        }, add: function (a, b) {
            return this.pushStack(d.unique(d.merge(this.get(), d(a, b))))
        }, addBack: function (a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
        }});
    d.each({parent: function (a) {
        return(a = a.parentNode) && 11 !== a.nodeType ? a : null
    }, parents: function (a) {
        return d.dir(a, "parentNode")
    }, parentsUntil: function (a, b, f) {
        return d.dir(a,
            "parentNode", f)
    }, next: function (a) {
        return l(a, "nextSibling")
    }, prev: function (a) {
        return l(a, "previousSibling")
    }, nextAll: function (a) {
        return d.dir(a, "nextSibling")
    }, prevAll: function (a) {
        return d.dir(a, "previousSibling")
    }, nextUntil: function (a, b, f) {
        return d.dir(a, "nextSibling", f)
    }, prevUntil: function (a, b, f) {
        return d.dir(a, "previousSibling", f)
    }, siblings: function (a) {
        return d.sibling((a.parentNode || {}).firstChild, a)
    }, children: function (a) {
        return d.sibling(a.firstChild)
    }, contents: function (a) {
        return d.nodeName(a,
            "iframe") ? a.contentDocument || a.contentWindow.document : d.merge([], a.childNodes)
    }}, function (a, b) {
        d.fn[a] = function (f, c) {
            var g = d.map(this, b, f);
            return"Until" !== a.slice(-5) && (c = f), c && "string" == typeof c && (g = d.filter(c, g)), 1 < this.length && (dc[a] || (g = d.unique(g)), cc.test(a) && (g = g.reverse())), this.pushStack(g)
        }
    });
    var W = /\S+/g, hb = {};
    d.Callbacks = function (a) {
        a = "string" == typeof a ? hb[a] || y(a) : d.extend({}, a);
        var b, f, c, g, k, n, e = [], h = !a.once && [], l = function (d) {
            f = a.memory && d;
            c = !0;
            k = n || 0;
            n = 0;
            g = e.length;
            for (b = !0; e && g > k; k++)if (!1 ===
                e[k].apply(d[0], d[1]) && a.stopOnFalse) {
                f = !1;
                break
            }
            b = !1;
            e && (h ? h.length && l(h.shift()) : f ? e = [] : m.disable())
        }, m = {add: function () {
            if (e) {
                var c = e.length;
                !function ac(b) {
                    d.each(b, function (b, f) {
                        var c = d.type(f);
                        "function" === c ? a.unique && m.has(f) || e.push(f) : f && f.length && "string" !== c && ac(f)
                    })
                }(arguments);
                b ? g = e.length : f && (n = c, l(f))
            }
            return this
        }, remove: function () {
            return e && d.each(arguments, function (a, f) {
                for (var c; -1 < (c = d.inArray(f, e, c));)e.splice(c, 1), b && (g >= c && g--, k >= c && k--)
            }), this
        }, has: function (a) {
            return a ? -1 < d.inArray(a,
                e) : !(!e || !e.length)
        }, empty: function () {
            return e = [], g = 0, this
        }, disable: function () {
            return e = h = f = void 0, this
        }, disabled: function () {
            return!e
        }, lock: function () {
            return h = void 0, f || m.disable(), this
        }, locked: function () {
            return!h
        }, fireWith: function (a, d) {
            return!e || c && !h || (d = d || [], d = [a, d.slice ? d.slice() : d], b ? h.push(d) : l(d)), this
        }, fire: function () {
            return m.fireWith(this, arguments), this
        }, fired: function () {
            return!!c
        }};
        return m
    };
    d.extend({Deferred: function (a) {
        var b = [
            ["resolve", "done", d.Callbacks("once memory"), "resolved"],
            ["reject", "fail", d.Callbacks("once memory"), "rejected"],
            ["notify", "progress", d.Callbacks("memory")]
        ], f = "pending", c = {state: function () {
            return f
        }, always: function () {
            return g.done(arguments).fail(arguments), this
        }, then: function () {
            var a = arguments;
            return d.Deferred(function (f) {
                d.each(b, function (b, e) {
                    var h = d.isFunction(a[b]) && a[b];
                    g[e[1]](function () {
                        var a = h && h.apply(this, arguments);
                        a && d.isFunction(a.promise) ? a.promise().done(f.resolve).fail(f.reject).progress(f.notify) : f[e[0] + "With"](this === c ? f.promise() :
                            this, h ? [a] : arguments)
                    })
                });
                a = null
            }).promise()
        }, promise: function (a) {
            return null != a ? d.extend(a, c) : c
        }}, g = {};
        return c.pipe = c.then, d.each(b, function (a, d) {
            var e = d[2], h = d[3];
            c[d[1]] = e.add;
            h && e.add(function () {
                f = h
            }, b[1 ^ a][2].disable, b[2][2].lock);
            g[d[0]] = function () {
                return g[d[0] + "With"](this === g ? c : this, arguments), this
            };
            g[d[0] + "With"] = e.fireWith
        }), c.promise(g), a && a.call(g, g), g
    }, when: function (a) {
        var b = 0, f = Y.call(arguments), c = f.length, g = 1 !== c || a && d.isFunction(a.promise) ? c : 0, k = 1 === g ? a : d.Deferred(), n = function (a, b, d) {
            return function (f) {
                b[a] = this;
                d[a] = 1 < arguments.length ? Y.call(arguments) : f;
                d === e ? k.notifyWith(b, d) : --g || k.resolveWith(b, d)
            }
        }, e, h, l;
        if (1 < c) {
            e = Array(c);
            h = Array(c);
            for (l = Array(c); c > b; b++)f[b] && d.isFunction(f[b].promise) ? f[b].promise().done(n(b, l, f)).fail(k.reject).progress(n(b, h, e)) : --g
        }
        return g || k.resolveWith(l, f), k.promise()
    }});
    var Ea;
    d.fn.ready = function (a) {
        return d.ready.promise().done(a), this
    };
    d.extend({isReady: !1, readyWait: 1, holdReady: function (a) {
        a ? d.readyWait++ : d.ready(!0)
    }, ready: function (a) {
        if (!0 ===
            a ? !--d.readyWait : !d.isReady) {
            if (!u.body)return setTimeout(d.ready);
            d.isReady = !0;
            !0 !== a && 0 < --d.readyWait || (Ea.resolveWith(u, [d]), d.fn.triggerHandler && (d(u).triggerHandler("ready"), d(u).off("ready")))
        }
    }});
    d.ready.promise = function (a) {
        if (!Ea)if (Ea = d.Deferred(), "complete" === u.readyState)setTimeout(d.ready); else if (u.addEventListener)u.addEventListener("DOMContentLoaded", A, !1), c.addEventListener("load", A, !1); else {
            u.attachEvent("onreadystatechange", A);
            c.attachEvent("onload", A);
            var b = !1;
            try {
                b = null == c.frameElement &&
                    u.documentElement
            } catch (f) {
            }
            b && b.doScroll && !function g() {
                if (!d.isReady) {
                    try {
                        b.doScroll("left")
                    } catch (a) {
                        return setTimeout(g, 50)
                    }
                    m();
                    d.ready()
                }
            }()
        }
        return Ea.promise(a)
    };
    var U = "undefined", vb;
    for (vb in d(t))break;
    t.ownLast = "0" !== vb;
    t.inlineBlockNeedsLayout = !1;
    d(function () {
        var a, b, d, c;
        (d = u.getElementsByTagName("body")[0]) && d.style && (b = u.createElement("div"), c = u.createElement("div"), c.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", d.appendChild(c).appendChild(b), typeof b.style.zoom !==
            U && (b.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", t.inlineBlockNeedsLayout = a = 3 === b.offsetWidth, a && (d.style.zoom = 1)), d.removeChild(c))
    });
    (function () {
        var a = u.createElement("div");
        if (null == t.deleteExpando) {
            t.deleteExpando = !0;
            try {
                delete a.test
            } catch (b) {
                t.deleteExpando = !1
            }
        }
    })();
    d.acceptData = function (a) {
        var b = d.noData[(a.nodeName + " ").toLowerCase()], f = +a.nodeType || 1;
        return 1 !== f && 9 !== f ? !1 : !b || !0 !== b && a.getAttribute("classid") === b
    };
    var Sb = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        Rb = /([A-Z])/g;
    d.extend({cache: {}, noData: {"applet ": !0, "embed ": !0, "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"}, hasData: function (a) {
        return a = a.nodeType ? d.cache[a[d.expando]] : a[d.expando], !!a && !D(a)
    }, data: function (a, b, d) {
        return e(a, b, d)
    }, removeData: function (a, b) {
        return w(a, b)
    }, _data: function (a, b, d) {
        return e(a, b, d, !0)
    }, _removeData: function (a, b) {
        return w(a, b, !0)
    }});
    d.fn.extend({data: function (a, b) {
        var f, c, g, k = this[0], n = k && k.attributes;
        if (void 0 === a) {
            if (this.length && (g = d.data(k), 1 === k.nodeType && !d._data(k, "parsedAttrs"))) {
                for (f = n.length; f--;)n[f] && (c = n[f].name, 0 === c.indexOf("data-") && (c = d.camelCase(c.slice(5)), K(k, c, g[c])));
                d._data(k, "parsedAttrs", !0)
            }
            return g
        }
        return"object" == typeof a ? this.each(function () {
            d.data(this, a)
        }) : 1 < arguments.length ? this.each(function () {
            d.data(this, a, b)
        }) : k ? K(k, a, d.data(k, a)) : void 0
    }, removeData: function (a) {
        return this.each(function () {
            d.removeData(this, a)
        })
    }});
    d.extend({queue: function (a, b, f) {
        var c;
        return a ? (b = (b || "fx") + "queue", c = d._data(a, b), f && (!c || d.isArray(f) ?
            c = d._data(a, b, d.makeArray(f)) : c.push(f)), c || []) : void 0
    }, dequeue: function (a, b) {
        b = b || "fx";
        var f = d.queue(a, b), c = f.length, g = f.shift(), k = d._queueHooks(a, b), n = function () {
            d.dequeue(a, b)
        };
        "inprogress" === g && (g = f.shift(), c--);
        g && ("fx" === b && f.unshift("inprogress"), delete k.stop, g.call(a, n, k));
        !c && k && k.empty.fire()
    }, _queueHooks: function (a, b) {
        var f = b + "queueHooks";
        return d._data(a, f) || d._data(a, f, {empty: d.Callbacks("once memory").add(function () {
            d._removeData(a, b + "queue");
            d._removeData(a, f)
        })})
    }});
    d.fn.extend({queue: function (a, b) {
        var f = 2;
        return"string" != typeof a && (b = a, a = "fx", f--), arguments.length < f ? d.queue(this[0], a) : void 0 === b ? this : this.each(function () {
            var f = d.queue(this, a, b);
            d._queueHooks(this, a);
            "fx" === a && "inprogress" !== f[0] && d.dequeue(this, a)
        })
    }, dequeue: function (a) {
        return this.each(function () {
            d.dequeue(this, a)
        })
    }, clearQueue: function (a) {
        return this.queue(a || "fx", [])
    }, promise: function (a, b) {
        var f, c = 1, g = d.Deferred(), k = this, n = this.length, e = function () {
            --c || g.resolveWith(k, [k])
        };
        "string" != typeof a && (b = a, a = void 0);
        for (a = a ||
            "fx"; n--;)(f = d._data(k[n], a + "queueHooks")) && f.empty && (c++, f.empty.add(e));
        return e(), g.promise(b)
    }});
    var Fa = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, ia = ["Top", "Right", "Bottom", "Left"], aa = function (a, b) {
        return a = b || a, "none" === d.css(a, "display") || !d.contains(a.ownerDocument, a)
    }, ea = d.access = function (a, b, f, c, g, k, n) {
        var e = 0, h = a.length, l = null == f;
        if ("object" === d.type(f))for (e in g = !0, f)d.access(a, b, e, f[e], !0, k, n); else if (void 0 !== c && (g = !0, d.isFunction(c) || (n = !0), l && (n ? (b.call(a, c), b = null) : (l = b, b = function (a, b, f) {
            return l.call(d(a), f)
        })), b))for (; h > e; e++)b(a[e], f, n ? c : c.call(a[e], e, b(a[e], f)));
        return g ? a : l ? b.call(a) : h ? b(a[0], f) : k
    }, Ka = /^(?:checkbox|radio)$/i;
    !function () {
        var a = u.createElement("input"), b = u.createElement("div"), d = u.createDocumentFragment();
        if (b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", t.leadingWhitespace = 3 === b.firstChild.nodeType, t.tbody = !b.getElementsByTagName("tbody").length, t.htmlSerialize = !!b.getElementsByTagName("link").length, t.html5Clone = "<:nav></:nav>" !==
            u.createElement("nav").cloneNode(!0).outerHTML, a.type = "checkbox", a.checked = !0, d.appendChild(a), t.appendChecked = a.checked, b.innerHTML = "<textarea>x</textarea>", t.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue, d.appendChild(b), b.innerHTML = "<input type='radio' checked='checked' name='t'/>", t.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, t.noCloneEvent = !0, b.attachEvent && (b.attachEvent("onclick", function () {
            t.noCloneEvent = !1
        }), b.cloneNode(!0).click()), null == t.deleteExpando) {
            t.deleteExpando = !0;
            try {
                delete b.test
            } catch (c) {
                t.deleteExpando = !1
            }
        }
    }();
    (function () {
        var a, b, d = u.createElement("div");
        for (a in{submit: !0, change: !0, focusin: !0})b = "on" + a, (t[a + "Bubbles"] = b in c) || (d.setAttribute(b, "t"), t[a + "Bubbles"] = !1 === d.attributes[b].expando)
    })();
    var Pa = /^(?:input|select|textarea)$/i, ec = /^key/, fc = /^(?:mouse|pointer|contextmenu)|click/, wb = /^(?:focusinfocus|focusoutblur)$/, xb = /^([^.]*)(?:\.(.+)|)$/;
    d.event = {global: {}, add: function (a, b, f, c, g) {
        var k, n, e, h, l, m, s, p, r, t;
        if (e = d._data(a)) {
            f.handler && (h = f, f =
                h.handler, g = h.selector);
            f.guid || (f.guid = d.guid++);
            (n = e.events) || (n = e.events = {});
            (m = e.handle) || (m = e.handle = function (a) {
                return typeof d === U || a && d.event.triggered === a.type ? void 0 : d.event.dispatch.apply(m.elem, arguments)
            }, m.elem = a);
            b = (b || "").match(W) || [""];
            for (e = b.length; e--;)k = xb.exec(b[e]) || [], r = t = k[1], k = (k[2] || "").split(".").sort(), r && (l = d.event.special[r] || {}, r = (g ? l.delegateType : l.bindType) || r, l = d.event.special[r] || {}, s = d.extend({type: r, origType: t, data: c, handler: f, guid: f.guid, selector: g, needsContext: g &&
                d.expr.match.needsContext.test(g), namespace: k.join(".")}, h), (p = n[r]) || (p = n[r] = [], p.delegateCount = 0, l.setup && !1 !== l.setup.call(a, c, k, m) || (a.addEventListener ? a.addEventListener(r, m, !1) : a.attachEvent && a.attachEvent("on" + r, m))), l.add && (l.add.call(a, s), s.handler.guid || (s.handler.guid = f.guid)), g ? p.splice(p.delegateCount++, 0, s) : p.push(s), d.event.global[r] = !0);
            a = null
        }
    }, remove: function (a, b, f, c, g) {
        var k, n, e, h, l, m, s, p, r, t, w, u = d.hasData(a) && d._data(a);
        if (u && (m = u.events)) {
            b = (b || "").match(W) || [""];
            for (l = b.length; l--;)if (e =
                xb.exec(b[l]) || [], r = w = e[1], t = (e[2] || "").split(".").sort(), r) {
                s = d.event.special[r] || {};
                r = (c ? s.delegateType : s.bindType) || r;
                p = m[r] || [];
                e = e[2] && RegExp("(^|\\.)" + t.join("\\.(?:.*\\.|)") + "(\\.|$)");
                for (h = k = p.length; k--;)n = p[k], !g && w !== n.origType || f && f.guid !== n.guid || e && !e.test(n.namespace) || c && c !== n.selector && ("**" !== c || !n.selector) || (p.splice(k, 1), n.selector && p.delegateCount--, s.remove && s.remove.call(a, n));
                h && !p.length && (s.teardown && !1 !== s.teardown.call(a, t, u.handle) || d.removeEvent(a, r, u.handle), delete m[r])
            } else for (r in m)d.event.remove(a,
                r + b[l], f, c, !0);
            d.isEmptyObject(m) && (delete u.handle, d._removeData(a, "events"))
        }
    }, trigger: function (a, b, f, q) {
        var g, k, e, h, l, m, p = [f || u], s = ka.call(a, "type") ? a.type : a;
        m = ka.call(a, "namespace") ? a.namespace.split(".") : [];
        if (e = g = f = f || u, 3 !== f.nodeType && 8 !== f.nodeType && !wb.test(s + d.event.triggered) && (0 <= s.indexOf(".") && (m = s.split("."), s = m.shift(), m.sort()), k = 0 > s.indexOf(":") && "on" + s, a = a[d.expando] ? a : new d.Event(s, "object" == typeof a && a), a.isTrigger = q ? 2 : 3, a.namespace = m.join("."), a.namespace_re = a.namespace ? RegExp("(^|\\.)" +
            m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, a.result = void 0, a.target || (a.target = f), b = null == b ? [a] : d.makeArray(b, [a]), l = d.event.special[s] || {}, q || !l.trigger || !1 !== l.trigger.apply(f, b))) {
            if (!q && !l.noBubble && !d.isWindow(f)) {
                h = l.delegateType || s;
                for (wb.test(h + s) || (e = e.parentNode); e; e = e.parentNode)p.push(e), g = e;
                g === (f.ownerDocument || u) && p.push(g.defaultView || g.parentWindow || c)
            }
            for (m = 0; (e = p[m++]) && !a.isPropagationStopped();)a.type = 1 < m ? h : l.bindType || s, (g = (d._data(e, "events") || {})[a.type] && d._data(e, "handle")) &&
                g.apply(e, b), (g = k && e[k]) && g.apply && d.acceptData(e) && (a.result = g.apply(e, b), !1 === a.result && a.preventDefault());
            if (a.type = s, !q && !a.isDefaultPrevented() && (!l._default || !1 === l._default.apply(p.pop(), b)) && d.acceptData(f) && k && f[s] && !d.isWindow(f)) {
                (g = f[k]) && (f[k] = null);
                d.event.triggered = s;
                try {
                    f[s]()
                } catch (r) {
                }
                d.event.triggered = void 0;
                g && (f[k] = g)
            }
            return a.result
        }
    }, dispatch: function (a) {
        a = d.event.fix(a);
        var b, f, c, g, k, e = [], h = Y.call(arguments);
        b = (d._data(this, "events") || {})[a.type] || [];
        var l = d.event.special[a.type] ||
        {};
        if (h[0] = a, a.delegateTarget = this, !l.preDispatch || !1 !== l.preDispatch.call(this, a)) {
            e = d.event.handlers.call(this, a, b);
            for (b = 0; (g = e[b++]) && !a.isPropagationStopped();) {
                a.currentTarget = g.elem;
                for (k = 0; (c = g.handlers[k++]) && !a.isImmediatePropagationStopped();)(!a.namespace_re || a.namespace_re.test(c.namespace)) && (a.handleObj = c, a.data = c.data, f = ((d.event.special[c.origType] || {}).handle || c.handler).apply(g.elem, h), void 0 !== f && !1 === (a.result = f) && (a.preventDefault(), a.stopPropagation()))
            }
            return l.postDispatch &&
                l.postDispatch.call(this, a), a.result
        }
    }, handlers: function (a, b) {
        var f, c, g, k, e = [], h = b.delegateCount, l = a.target;
        if (h && l.nodeType && (!a.button || "click" !== a.type))for (; l != this; l = l.parentNode || this)if (1 === l.nodeType && (!0 !== l.disabled || "click" !== a.type)) {
            g = [];
            for (k = 0; h > k; k++)c = b[k], f = c.selector + " ", void 0 === g[f] && (g[f] = c.needsContext ? 0 <= d(f, this).index(l) : d.find(f, this, null, [l]).length), g[f] && g.push(c);
            g.length && e.push({elem: l, handlers: g})
        }
        return h < b.length && e.push({elem: this, handlers: b.slice(h)}), e
    }, fix: function (a) {
        if (a[d.expando])return a;
        var b, f, c;
        b = a.type;
        var g = a, k = this.fixHooks[b];
        k || (this.fixHooks[b] = k = fc.test(b) ? this.mouseHooks : ec.test(b) ? this.keyHooks : {});
        c = k.props ? this.props.concat(k.props) : this.props;
        a = new d.Event(g);
        for (b = c.length; b--;)f = c[b], a[f] = g[f];
        return a.target || (a.target = g.srcElement || u), 3 === a.target.nodeType && (a.target = a.target.parentNode), a.metaKey = !!a.metaKey, k.filter ? k.filter(a, g) : a
    }, props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {}, keyHooks: {props: ["char", "charCode", "key", "keyCode"], filter: function (a, b) {
            return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
        }}, mouseHooks: {props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter: function (a, b) {
            var d, c, g, k = b.button, e = b.fromElement;
            return null == a.pageX && null != b.clientX && (c = a.target.ownerDocument || u, g = c.documentElement, d = c.body, a.pageX = b.clientX + (g && g.scrollLeft || d && d.scrollLeft || 0) - (g &&
                g.clientLeft || d && d.clientLeft || 0), a.pageY = b.clientY + (g && g.scrollTop || d && d.scrollTop || 0) - (g && g.clientTop || d && d.clientTop || 0)), !a.relatedTarget && e && (a.relatedTarget = e === a.target ? b.toElement : e), a.which || void 0 === k || (a.which = 1 & k ? 1 : 2 & k ? 3 : 4 & k ? 2 : 0), a
        }}, special: {load: {noBubble: !0}, focus: {trigger: function () {
            if (this !== E() && this.focus)try {
                return this.focus(), !1
            } catch (a) {
            }
        }, delegateType: "focusin"}, blur: {trigger: function () {
            return this === E() && this.blur ? (this.blur(), !1) : void 0
        }, delegateType: "focusout"}, click: {trigger: function () {
            return d.nodeName(this,
                "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
        }, _default: function (a) {
            return d.nodeName(a.target, "a")
        }}, beforeunload: {postDispatch: function (a) {
            void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
        }}}, simulate: function (a, b, f, c) {
            a = d.extend(new d.Event, f, {type: a, isSimulated: !0, originalEvent: {}});
            c ? d.event.trigger(a, null, b) : d.event.dispatch.call(b, a);
            a.isDefaultPrevented() && f.preventDefault()
        }};
    d.removeEvent = u.removeEventListener ? function (a, b, d) {
        a.removeEventListener &&
        a.removeEventListener(b, d, !1)
    } : function (a, b, d) {
        b = "on" + b;
        a.detachEvent && (typeof a[b] === U && (a[b] = null), a.detachEvent(b, d))
    };
    d.Event = function (a, b) {
        return this instanceof d.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && !1 === a.returnValue ? H : z) : this.type = a, b && d.extend(this, b), this.timeStamp = a && a.timeStamp || d.now(), void(this[d.expando] = !0)) : new d.Event(a, b)
    };
    d.Event.prototype = {isDefaultPrevented: z, isPropagationStopped: z, isImmediatePropagationStopped: z,
        preventDefault: function () {
            var a = this.originalEvent;
            this.isDefaultPrevented = H;
            a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
        }, stopPropagation: function () {
            var a = this.originalEvent;
            this.isPropagationStopped = H;
            a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
        }, stopImmediatePropagation: function () {
            var a = this.originalEvent;
            this.isImmediatePropagationStopped = H;
            a && a.stopImmediatePropagation && a.stopImmediatePropagation();
            this.stopPropagation()
        }};
    d.each({mouseenter: "mouseover", mouseleave: "mouseout",
        pointerenter: "pointerover", pointerleave: "pointerout"}, function (a, b) {
        d.event.special[a] = {delegateType: b, bindType: b, handle: function (a) {
            var c, g = a.relatedTarget, k = a.handleObj;
            return(!g || g !== this && !d.contains(this, g)) && (a.type = k.origType, c = k.handler.apply(this, arguments), a.type = b), c
        }}
    });
    t.submitBubbles || (d.event.special.submit = {setup: function () {
        return d.nodeName(this, "form") ? !1 : void d.event.add(this, "click._submit keypress._submit", function (a) {
            a = a.target;
            (a = d.nodeName(a, "input") || d.nodeName(a, "button") ?
                a.form : void 0) && !d._data(a, "submitBubbles") && (d.event.add(a, "submit._submit", function (a) {
                a._submit_bubble = !0
            }), d._data(a, "submitBubbles", !0))
        })
    }, postDispatch: function (a) {
        a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && d.event.simulate("submit", this.parentNode, a, !0))
    }, teardown: function () {
        return d.nodeName(this, "form") ? !1 : void d.event.remove(this, "._submit")
    }});
    t.changeBubbles || (d.event.special.change = {setup: function () {
        return Pa.test(this.nodeName) ? (("checkbox" === this.type ||
            "radio" === this.type) && (d.event.add(this, "propertychange._change", function (a) {
            "checked" === a.originalEvent.propertyName && (this._just_changed = !0)
        }), d.event.add(this, "click._change", function (a) {
            this._just_changed && !a.isTrigger && (this._just_changed = !1);
            d.event.simulate("change", this, a, !0)
        })), !1) : void d.event.add(this, "beforeactivate._change", function (a) {
            a = a.target;
            Pa.test(a.nodeName) && !d._data(a, "changeBubbles") && (d.event.add(a, "change._change", function (a) {
                !this.parentNode || a.isSimulated || a.isTrigger ||
                d.event.simulate("change", this.parentNode, a, !0)
            }), d._data(a, "changeBubbles", !0))
        })
    }, handle: function (a) {
        var b = a.target;
        return this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type ? a.handleObj.handler.apply(this, arguments) : void 0
    }, teardown: function () {
        return d.event.remove(this, "._change"), !Pa.test(this.nodeName)
    }});
    t.focusinBubbles || d.each({focus: "focusin", blur: "focusout"}, function (a, b) {
        var f = function (a) {
            d.event.simulate(b, a.target, d.event.fix(a), !0)
        };
        d.event.special[b] = {setup: function () {
            var c =
                this.ownerDocument || this, g = d._data(c, b);
            g || c.addEventListener(a, f, !0);
            d._data(c, b, (g || 0) + 1)
        }, teardown: function () {
            var c = this.ownerDocument || this, g = d._data(c, b) - 1;
            g ? d._data(c, b, g) : (c.removeEventListener(a, f, !0), d._removeData(c, b))
        }}
    });
    d.fn.extend({on: function (a, b, f, c, g) {
        var k, e;
        if ("object" == typeof a) {
            "string" != typeof b && (f = f || b, b = void 0);
            for (k in a)this.on(k, b, f, a[k], g);
            return this
        }
        if (null == f && null == c ? (c = b, f = b = void 0) : null == c && ("string" == typeof b ? (c = f, f = void 0) : (c = f, f = b, b = void 0)), !1 === c)c = z; else if (!c)return this;
        return 1 === g && (e = c, c = function (a) {
            return d().off(a), e.apply(this, arguments)
        }, c.guid = e.guid || (e.guid = d.guid++)), this.each(function () {
            d.event.add(this, a, c, f, b)
        })
    }, one: function (a, b, d, c) {
        return this.on(a, b, d, c, 1)
    }, off: function (a, b, f) {
        var c, g;
        if (a && a.preventDefault && a.handleObj)return c = a.handleObj, d(a.delegateTarget).off(c.namespace ? c.origType + "." + c.namespace : c.origType, c.selector, c.handler), this;
        if ("object" == typeof a) {
            for (g in a)this.off(g, b, a[g]);
            return this
        }
        return(!1 === b || "function" == typeof b) && (f =
            b, b = void 0), !1 === f && (f = z), this.each(function () {
            d.event.remove(this, a, f, b)
        })
    }, trigger: function (a, b) {
        return this.each(function () {
            d.event.trigger(a, b, this)
        })
    }, triggerHandler: function (a, b) {
        var f = this[0];
        return f ? d.event.trigger(a, b, f, !0) : void 0
    }});
    var ib = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", gc = / jQuery\d+="(?:null|\d+)"/g, yb = RegExp("<(?:" + ib + ")[\\s/>]", "i"), Qa = /^\s+/, zb = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        Ab = /<([\w:]+)/, Bb = /<tbody/i, hc = /<|&#?\w+;/, ic = /<(?:script|style|link)/i, jc = /checked\s*(?:[^=]|=\s*.checked.)/i, Cb = /^$|\/(?:java|ecma)script/i, Tb = /^true\/(.*)/, kc = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, S = {option: [1, "<select multiple='multiple'>", "</select>"], legend: [1, "<fieldset>", "</fieldset>"], area: [1, "<map>", "</map>"], param: [1, "<object>", "</object>"], thead: [1, "<table>", "</table>"], tr: [2, "<table><tbody>", "</tbody></table>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], td: [3,
            "<table><tbody><tr>", "</tr></tbody></table>"], _default: t.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]}, Ra = ha(u).appendChild(u.createElement("div"));
    S.optgroup = S.option;
    S.tbody = S.tfoot = S.colgroup = S.caption = S.thead;
    S.th = S.td;
    d.extend({clone: function (a, b, f) {
        var c, g, k, e, h, l = d.contains(a.ownerDocument, a);
        if (t.html5Clone || d.isXMLDoc(a) || !yb.test("<" + a.nodeName + ">") ? k = a.cloneNode(!0) : (Ra.innerHTML = a.outerHTML, Ra.removeChild(k = Ra.firstChild)), !(t.noCloneEvent && t.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType ||
            d.isXMLDoc(a))) {
            c = C(k);
            h = C(a);
            for (e = 0; null != (g = h[e]); ++e)if (c[e]) {
                var m = c[e], p = void 0, s = void 0, r = void 0;
                if (1 === m.nodeType) {
                    if (p = m.nodeName.toLowerCase(), !t.noCloneEvent && m[d.expando]) {
                        r = d._data(m);
                        for (s in r.events)d.removeEvent(m, s, r.handle);
                        m.removeAttribute(d.expando)
                    }
                    "script" === p && m.text !== g.text ? (qa(m).text = g.text, T(m)) : "object" === p ? (m.parentNode && (m.outerHTML = g.outerHTML), t.html5Clone && g.innerHTML && !d.trim(m.innerHTML) && (m.innerHTML = g.innerHTML)) : "input" === p && Ka.test(g.type) ? (m.defaultChecked =
                        m.checked = g.checked, m.value !== g.value && (m.value = g.value)) : "option" === p ? m.defaultSelected = m.selected = g.defaultSelected : ("input" === p || "textarea" === p) && (m.defaultValue = g.defaultValue)
                }
            }
        }
        if (b)if (f) {
            h = h || C(a);
            c = c || C(k);
            for (e = 0; null != (g = h[e]); e++)Ya(g, c[e])
        } else Ya(a, k);
        return c = C(k, "script"), 0 < c.length && F(c, !l && C(a, "script")), k
    }, buildFragment: function (a, b, f, c) {
        for (var g, k, e, h, l, m, p, s = a.length, r = ha(b), w = [], u = 0; s > u; u++)if (k = a[u], k || 0 === k)if ("object" === d.type(k))d.merge(w, k.nodeType ? [k] : k); else if (hc.test(k)) {
            h =
                h || r.appendChild(b.createElement("div"));
            l = (Ab.exec(k) || ["", ""])[1].toLowerCase();
            p = S[l] || S._default;
            h.innerHTML = p[1] + k.replace(zb, "<$1></$2>") + p[2];
            for (g = p[0]; g--;)h = h.lastChild;
            if (!t.leadingWhitespace && Qa.test(k) && w.push(b.createTextNode(Qa.exec(k)[0])), !t.tbody)for (g = (k = "table" !== l || Bb.test(k) ? "<table>" !== p[1] || Bb.test(k) ? 0 : h : h.firstChild) && k.childNodes.length; g--;)d.nodeName(m = k.childNodes[g], "tbody") && !m.childNodes.length && k.removeChild(m);
            d.merge(w, h.childNodes);
            for (h.textContent = ""; h.firstChild;)h.removeChild(h.firstChild);
            h = r.lastChild
        } else w.push(b.createTextNode(k));
        h && r.removeChild(h);
        t.appendChecked || d.grep(C(w, "input"), B);
        for (u = 0; k = w[u++];)if ((!c || -1 === d.inArray(k, c)) && (e = d.contains(k.ownerDocument, k), h = C(r.appendChild(k), "script"), e && F(h), f))for (g = 0; k = h[g++];)Cb.test(k.type || "") && f.push(k);
        return r
    }, cleanData: function (a, b) {
        for (var f, c, g, k, e = 0, h = d.expando, l = d.cache, m = t.deleteExpando, p = d.event.special; null != (f = a[e]); e++)if ((b || d.acceptData(f)) && (g = f[h], k = g && l[g])) {
            if (k.events)for (c in k.events)p[c] ? d.event.remove(f,
                c) : d.removeEvent(f, c, k.handle);
            l[g] && (delete l[g], m ? delete f[h] : typeof f.removeAttribute !== U ? f.removeAttribute(h) : f[h] = null, O.push(g))
        }
    }});
    d.fn.extend({text: function (a) {
        return ea(this, function (a) {
            return void 0 === a ? d.text(this) : this.empty().append((this[0] && this[0].ownerDocument || u).createTextNode(a))
        }, null, a, arguments.length)
    }, append: function () {
        return this.domManip(arguments, function (a) {
            (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && I(this, a).appendChild(a)
        })
    }, prepend: function () {
        return this.domManip(arguments,
            function (a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = I(this, a);
                    b.insertBefore(a, b.firstChild)
                }
            })
    }, before: function () {
        return this.domManip(arguments, function (a) {
            this.parentNode && this.parentNode.insertBefore(a, this)
        })
    }, after: function () {
        return this.domManip(arguments, function (a) {
            this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
        })
    }, remove: function (a, b) {
        for (var f, c = a ? d.filter(a, this) : this, g = 0; null != (f = c[g]); g++)b || 1 !== f.nodeType || d.cleanData(C(f)), f.parentNode &&
            (b && d.contains(f.ownerDocument, f) && F(C(f, "script")), f.parentNode.removeChild(f));
        return this
    }, empty: function () {
        for (var a, b = 0; null != (a = this[b]); b++) {
            for (1 === a.nodeType && d.cleanData(C(a, !1)); a.firstChild;)a.removeChild(a.firstChild);
            a.options && d.nodeName(a, "select") && (a.options.length = 0)
        }
        return this
    }, clone: function (a, b) {
        return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function () {
            return d.clone(this, a, b)
        })
    }, html: function (a) {
        return ea(this, function (a) {
            var f = this[0] || {}, c = 0, g = this.length;
            if (void 0 === a)return 1 ===
                f.nodeType ? f.innerHTML.replace(gc, "") : void 0;
            if (!("string" != typeof a || ic.test(a) || !t.htmlSerialize && yb.test(a) || !t.leadingWhitespace && Qa.test(a) || S[(Ab.exec(a) || ["", ""])[1].toLowerCase()])) {
                a = a.replace(zb, "<$1></$2>");
                try {
                    for (; g > c; c++)f = this[c] || {}, 1 === f.nodeType && (d.cleanData(C(f, !1)), f.innerHTML = a);
                    f = 0
                } catch (k) {
                }
            }
            f && this.empty().append(a)
        }, null, a, arguments.length)
    }, replaceWith: function () {
        var a = arguments[0];
        return this.domManip(arguments, function (b) {
            a = this.parentNode;
            d.cleanData(C(this));
            a && a.replaceChild(b,
                this)
        }), a && (a.length || a.nodeType) ? this : this.remove()
    }, detach: function (a) {
        return this.remove(a, !0)
    }, domManip: function (a, b) {
        a = qb.apply([], a);
        var f, c, g, k, e = 0, h = this.length, l = this, m = h - 1, p = a[0], s = d.isFunction(p);
        if (s || 1 < h && "string" == typeof p && !t.checkClone && jc.test(p))return this.each(function (d) {
            var c = l.eq(d);
            s && (a[0] = p.call(this, d, c.html()));
            c.domManip(a, b)
        });
        if (h && (k = d.buildFragment(a, this[0].ownerDocument, !1, this), f = k.firstChild, 1 === k.childNodes.length && (k = f), f)) {
            g = d.map(C(k, "script"), qa);
            for (c = g.length; h >
                e; e++)f = k, e !== m && (f = d.clone(f, !0, !0), c && d.merge(g, C(f, "script"))), b.call(this[e], f, e);
            if (c) {
                k = g[g.length - 1].ownerDocument;
                d.map(g, T);
                for (e = 0; c > e; e++)f = g[e], Cb.test(f.type || "") && !d._data(f, "globalEval") && d.contains(k, f) && (f.src ? d._evalUrl && d._evalUrl(f.src) : d.globalEval((f.text || f.textContent || f.innerHTML || "").replace(kc, "")))
            }
            k = f = null
        }
        return this
    }});
    d.each({appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith"}, function (a, b) {
        d.fn[a] = function (a) {
            for (var c =
                0, g = [], e = d(a), n = e.length - 1; n >= c; c++)a = c === n ? this : this.clone(!0), d(e[c])[b](a), Oa.apply(g, a.get());
            return this.pushStack(g)
        }
    });
    var ra, jb = {};
    !function () {
        var a;
        t.shrinkWrapBlocks = function () {
            if (null != a)return a;
            a = !1;
            var b, d, c;
            return d = u.getElementsByTagName("body")[0], d && d.style ? (b = u.createElement("div"), c = u.createElement("div"), c.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", d.appendChild(c).appendChild(b), typeof b.style.zoom !== U && (b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",
                b.appendChild(u.createElement("div")).style.width = "5px", a = 3 !== b.offsetWidth), d.removeChild(c), a) : void 0
        }
    }();
    var Db = /^margin/, xa = RegExp("^(" + Fa + ")(?!px)[a-z%]+$", "i"), ba, Q, lc = /^(top|right|bottom|left)$/;
    c.getComputedStyle ? (ba = function (a) {
        return a.ownerDocument.defaultView.getComputedStyle(a, null)
    }, Q = function (a, b, c) {
        var q, g, e, n, h = a.style;
        return c = c || ba(a), n = c ? c.getPropertyValue(b) || c[b] : void 0, c && ("" !== n || d.contains(a.ownerDocument, a) || (n = d.style(a, b)), xa.test(n) && Db.test(b) && (q = h.width, g = h.minWidth,
            e = h.maxWidth, h.minWidth = h.maxWidth = h.width = n, n = c.width, h.width = q, h.minWidth = g, h.maxWidth = e)), void 0 === n ? n : n + ""
    }) : u.documentElement.currentStyle && (ba = function (a) {
        return a.currentStyle
    }, Q = function (a, b, d) {
        var c, g, e, n, h = a.style;
        return d = d || ba(a), n = d ? d[b] : void 0, null == n && h && h[b] && (n = h[b]), xa.test(n) && !lc.test(b) && (c = h.left, g = a.runtimeStyle, e = g && g.left, e && (g.left = a.currentStyle.left), h.left = "fontSize" === b ? "1em" : n, n = h.pixelLeft + "px", h.left = c, e && (g.left = e)), void 0 === n ? n : n + "" || "auto"
    });
    !function () {
        var a, b,
            f, e, g, k, n;
        if (a = u.createElement("div"), a.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", f = a.getElementsByTagName("a")[0], b = f && f.style) {
            b.cssText = "float:left;opacity:.5";
            t.opacity = "0.5" === b.opacity;
            t.cssFloat = !!b.cssFloat;
            a.style.backgroundClip = "content-box";
            a.cloneNode(!0).style.backgroundClip = "";
            t.clearCloneStyle = "content-box" === a.style.backgroundClip;
            t.boxSizing = "" === b.boxSizing || "" === b.MozBoxSizing || "" === b.WebkitBoxSizing;
            d.extend(t, {reliableHiddenOffsets: function () {
                return null ==
                    k && h(), k
            }, boxSizingReliable: function () {
                return null == g && h(), g
            }, pixelPosition: function () {
                return null == e && h(), e
            }, reliableMarginRight: function () {
                return null == n && h(), n
            }});
            var h = function () {
                var a, b, d, f;
                (b = u.getElementsByTagName("body")[0]) && b.style && (a = u.createElement("div"), d = u.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", b.appendChild(d).appendChild(a), a.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",
                    e = g = !1, n = !0, c.getComputedStyle && (e = "1%" !== (c.getComputedStyle(a, null) || {}).top, g = "4px" === (c.getComputedStyle(a, null) || {width: "4px"}).width, f = a.appendChild(u.createElement("div")), f.style.cssText = a.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", f.style.marginRight = f.style.width = "0", a.style.width = "1px", n = !parseFloat((c.getComputedStyle(f, null) || {}).marginRight)), a.innerHTML = "<table><tr><td></td><td>t</td></tr></table>",
                    f = a.getElementsByTagName("td"), f[0].style.cssText = "margin:0;border:0;padding:0;display:none", k = 0 === f[0].offsetHeight, k && (f[0].style.display = "", f[1].style.display = "none", k = 0 === f[0].offsetHeight), b.removeChild(d))
            }
        }
    }();
    d.swap = function (a, b, d, c) {
        var g, e = {};
        for (g in b)e[g] = a.style[g], a.style[g] = b[g];
        d = d.apply(a, c || []);
        for (g in b)a.style[g] = e[g];
        return d
    };
    var Sa = /alpha\([^)]*\)/i, mc = /opacity\s*=\s*([^)]*)/, nc = /^(none|table(?!-c[ea]).+)/, Ub = RegExp("^(" + Fa + ")(.*)$", "i"), oc = RegExp("^([+-])=(" + Fa + ")", "i"),
        pc = {position: "absolute", visibility: "hidden", display: "block"}, Eb = {letterSpacing: "0", fontWeight: "400"}, kb = ["Webkit", "O", "Moz", "ms"];
    d.extend({cssHooks: {opacity: {get: function (a, b) {
        if (b) {
            var d = Q(a, "opacity");
            return"" === d ? "1" : d
        }
    }}}, cssNumber: {columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0}, cssProps: {"float": t.cssFloat ? "cssFloat" : "styleFloat"}, style: function (a, b, c, e) {
        if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
            var g,
                k, n, h = d.camelCase(b), l = a.style;
            if (b = d.cssProps[h] || (d.cssProps[h] = ab(l, h)), n = d.cssHooks[b] || d.cssHooks[h], void 0 === c)return n && "get"in n && void 0 !== (g = n.get(a, !1, e)) ? g : l[b];
            if (k = typeof c, "string" === k && (g = oc.exec(c)) && (c = (g[1] + 1) * g[2] + parseFloat(d.css(a, b)), k = "number"), null != c && c === c && ("number" !== k || d.cssNumber[h] || (c += "px"), t.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (l[b] = "inherit"), !(n && "set"in n && void 0 === (c = n.set(a, c, e)))))try {
                l[b] = c
            } catch (m) {
            }
        }
    }, css: function (a, b, c, e) {
        var g, k, n, h = d.camelCase(b);
        return b = d.cssProps[h] || (d.cssProps[h] = ab(a.style, h)), n = d.cssHooks[b] || d.cssHooks[h], n && "get"in n && (k = n.get(a, !0, c)), void 0 === k && (k = Q(a, b, e)), "normal" === k && b in Eb && (k = Eb[b]), "" === c || c ? (g = parseFloat(k), !0 === c || d.isNumeric(g) ? g || 0 : k) : k
    }});
    d.each(["height", "width"], function (a, b) {
        d.cssHooks[b] = {get: function (a, c, g) {
            return c ? nc.test(d.css(a, "display")) && 0 === a.offsetWidth ? d.swap(a, pc, function () {
                return eb(a, b, g)
            }) : eb(a, b, g) : void 0
        }, set: function (a, c, g) {
            var e = g && ba(a);
            return cb(a, c, g ? db(a, b, g, t.boxSizing &&
                "border-box" === d.css(a, "boxSizing", !1, e), e) : 0)
        }}
    });
    t.opacity || (d.cssHooks.opacity = {get: function (a, b) {
        return mc.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? 0.01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
    }, set: function (a, b) {
        var c = a.style, e = a.currentStyle, g = d.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "", k = e && e.filter || c.filter || "";
        c.zoom = 1;
        (1 <= b || "" === b) && "" === d.trim(k.replace(Sa, "")) && c.removeAttribute && (c.removeAttribute("filter"), "" === b || e && !e.filter) || (c.filter = Sa.test(k) ? k.replace(Sa,
            g) : k + " " + g)
    }});
    d.cssHooks.marginRight = $a(t.reliableMarginRight, function (a, b) {
        return b ? d.swap(a, {display: "inline-block"}, Q, [a, "marginRight"]) : void 0
    });
    d.each({margin: "", padding: "", border: "Width"}, function (a, b) {
        d.cssHooks[a + b] = {expand: function (d) {
            var c = 0, g = {};
            for (d = "string" == typeof d ? d.split(" ") : [d]; 4 > c; c++)g[a + ia[c] + b] = d[c] || d[c - 2] || d[0];
            return g
        }};
        Db.test(a) || (d.cssHooks[a + b].set = cb)
    });
    d.fn.extend({css: function (a, b) {
        return ea(this, function (a, b, c) {
            var e, n = {}, h = 0;
            if (d.isArray(b)) {
                c = ba(a);
                for (e = b.length; e >
                    h; h++)n[b[h]] = d.css(a, b[h], !1, c);
                return n
            }
            return void 0 !== c ? d.style(a, b, c) : d.css(a, b)
        }, a, b, 1 < arguments.length)
    }, show: function () {
        return bb(this, !0)
    }, hide: function () {
        return bb(this)
    }, toggle: function (a) {
        return"boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function () {
            aa(this) ? d(this).show() : d(this).hide()
        })
    }});
    d.Tween = L;
    L.prototype = {constructor: L, init: function (a, b, c, e, g, k) {
        this.elem = a;
        this.prop = c;
        this.easing = g || "swing";
        this.options = b;
        this.start = this.now = this.cur();
        this.end = e;
        this.unit = k || (d.cssNumber[c] ?
            "" : "px")
    }, cur: function () {
        var a = L.propHooks[this.prop];
        return a && a.get ? a.get(this) : L.propHooks._default.get(this)
    }, run: function (a) {
        var b, c = L.propHooks[this.prop];
        return this.pos = b = this.options.duration ? d.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : L.propHooks._default.set(this), this
    }};
    L.prototype.init.prototype = L.prototype;
    L.propHooks = {_default: {get: function (a) {
        var b;
        return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = d.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop]
    }, set: function (a) {
        d.fx.step[a.prop] ? d.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[d.cssProps[a.prop]] || d.cssHooks[a.prop]) ? d.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
    }}};
    L.propHooks.scrollTop = L.propHooks.scrollLeft = {set: function (a) {
        a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
    }};
    d.easing = {linear: function (a) {
        return a
    }, swing: function (a) {
        return 0.5 -
            Math.cos(a * Math.PI) / 2
    }};
    d.fx = L.prototype.init;
    d.fx.step = {};
    var X, Ga, qc = /^(?:toggle|show|hide)$/, Fb = RegExp("^(?:([+-])=|)(" + Fa + ")([a-z%]*)$", "i"), rc = /queueHooks$/, za = [function (a, b, c) {
        var e, g, k, n, h, l, m, p = this, r = {}, w = a.style, u = a.nodeType && aa(a), z = d._data(a, "fxshow");
        c.queue || (n = d._queueHooks(a, "fx"), null == n.unqueued && (n.unqueued = 0, h = n.empty.fire, n.empty.fire = function () {
            n.unqueued || h()
        }), n.unqueued++, p.always(function () {
            p.always(function () {
                n.unqueued--;
                d.queue(a, "fx").length || n.empty.fire()
            })
        }));
        1 ===
            a.nodeType && ("height"in b || "width"in b) && (c.overflow = [w.overflow, w.overflowX, w.overflowY], l = d.css(a, "display"), m = "none" === l ? d._data(a, "olddisplay") || va(a.nodeName) : l, "inline" === m && "none" === d.css(a, "float") && (t.inlineBlockNeedsLayout && "inline" !== va(a.nodeName) ? w.zoom = 1 : w.display = "inline-block"));
        c.overflow && (w.overflow = "hidden", t.shrinkWrapBlocks() || p.always(function () {
            w.overflow = c.overflow[0];
            w.overflowX = c.overflow[1];
            w.overflowY = c.overflow[2]
        }));
        for (e in b)if (g = b[e], qc.exec(g)) {
            if (delete b[e], k =
                k || "toggle" === g, g === (u ? "hide" : "show")) {
                if ("show" !== g || !z || void 0 === z[e])continue;
                u = !0
            }
            r[e] = z && z[e] || d.style(a, e)
        } else l = void 0;
        if (d.isEmptyObject(r))"inline" === ("none" === l ? va(a.nodeName) : l) && (w.display = l); else for (e in z ? "hidden"in z && (u = z.hidden) : z = d._data(a, "fxshow", {}), k && (z.hidden = !u), u ? d(a).show() : p.done(function () {
            d(a).hide()
        }), p.done(function () {
            var b;
            d._removeData(a, "fxshow");
            for (b in r)d.style(a, b, r[b])
        }), r)b = fb(u ? z[e] : 0, e, p), e in z || (z[e] = b.start, u && (b.end = b.start, b.start = "width" === e || "height" ===
            e ? 1 : 0))
    }], sa = {"*": [function (a, b) {
        var c = this.createTween(a, b), e = c.cur(), g = Fb.exec(b), k = g && g[3] || (d.cssNumber[a] ? "" : "px"), n = (d.cssNumber[a] || "px" !== k && +e) && Fb.exec(d.css(c.elem, a)), h = 1, l = 20;
        if (n && n[3] !== k) {
            k = k || n[3];
            g = g || [];
            n = +e || 1;
            do h = h || ".5", n /= h, d.style(c.elem, a, n + k); while (h !== (h = c.cur() / e) && 1 !== h && --l)
        }
        return g && (n = c.start = +n || +e || 0, c.unit = k, c.end = g[1] ? n + (g[1] + 1) * g[2] : +g[2]), c
    }]};
    d.Animation = d.extend(lb, {tweener: function (a, b) {
        d.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
        for (var c, e = 0, g = a.length; g >
            e; e++)c = a[e], sa[c] = sa[c] || [], sa[c].unshift(b)
    }, prefilter: function (a, b) {
        b ? za.unshift(a) : za.push(a)
    }});
    d.speed = function (a, b, c) {
        var e = a && "object" == typeof a ? d.extend({}, a) : {complete: c || !c && b || d.isFunction(a) && a, duration: a, easing: c && b || b && !d.isFunction(b) && b};
        return e.duration = d.fx.off ? 0 : "number" == typeof e.duration ? e.duration : e.duration in d.fx.speeds ? d.fx.speeds[e.duration] : d.fx.speeds._default, (null == e.queue || !0 === e.queue) && (e.queue = "fx"), e.old = e.complete, e.complete = function () {
            d.isFunction(e.old) && e.old.call(this);
            e.queue && d.dequeue(this, e.queue)
        }, e
    };
    d.fn.extend({fadeTo: function (a, b, d, c) {
        return this.filter(aa).css("opacity", 0).show().end().animate({opacity: b}, a, d, c)
    }, animate: function (a, b, c, e) {
        var g = d.isEmptyObject(a), k = d.speed(b, c, e);
        b = function () {
            var b = lb(this, d.extend({}, a), k);
            (g || d._data(this, "finish")) && b.stop(!0)
        };
        return b.finish = b, g || !1 === k.queue ? this.each(b) : this.queue(k.queue, b)
    }, stop: function (a, b, c) {
        var e = function (a) {
            var b = a.stop;
            delete a.stop;
            b(c)
        };
        return"string" != typeof a && (c = b, b = a, a = void 0), b && !1 !==
            a && this.queue(a || "fx", []), this.each(function () {
            var b = !0, k = null != a && a + "queueHooks", n = d.timers, h = d._data(this);
            if (k)h[k] && h[k].stop && e(h[k]); else for (k in h)h[k] && h[k].stop && rc.test(k) && e(h[k]);
            for (k = n.length; k--;)n[k].elem !== this || null != a && n[k].queue !== a || (n[k].anim.stop(c), b = !1, n.splice(k, 1));
            (b || !c) && d.dequeue(this, a)
        })
    }, finish: function (a) {
        return!1 !== a && (a = a || "fx"), this.each(function () {
            var b, c = d._data(this), e = c[a + "queue"];
            b = c[a + "queueHooks"];
            var g = d.timers, k = e ? e.length : 0;
            c.finish = !0;
            d.queue(this,
                a, []);
            b && b.stop && b.stop.call(this, !0);
            for (b = g.length; b--;)g[b].elem === this && g[b].queue === a && (g[b].anim.stop(!0), g.splice(b, 1));
            for (b = 0; k > b; b++)e[b] && e[b].finish && e[b].finish.call(this);
            delete c.finish
        })
    }});
    d.each(["toggle", "show", "hide"], function (a, b) {
        var c = d.fn[b];
        d.fn[b] = function (a, d, e) {
            return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(ja(b, !0), a, d, e)
        }
    });
    d.each({slideDown: ja("show"), slideUp: ja("hide"), slideToggle: ja("toggle"), fadeIn: {opacity: "show"}, fadeOut: {opacity: "hide"},
        fadeToggle: {opacity: "toggle"}}, function (a, b) {
        d.fn[a] = function (a, d, c) {
            return this.animate(b, a, d, c)
        }
    });
    d.timers = [];
    d.fx.tick = function () {
        var a, b = d.timers, c = 0;
        for (X = d.now(); c < b.length; c++)a = b[c], a() || b[c] !== a || b.splice(c--, 1);
        b.length || d.fx.stop();
        X = void 0
    };
    d.fx.timer = function (a) {
        d.timers.push(a);
        a() ? d.fx.start() : d.timers.pop()
    };
    d.fx.interval = 13;
    d.fx.start = function () {
        Ga || (Ga = setInterval(d.fx.tick, d.fx.interval))
    };
    d.fx.stop = function () {
        clearInterval(Ga);
        Ga = null
    };
    d.fx.speeds = {slow: 600, fast: 200, _default: 400};
    d.fn.delay = function (a, b) {
        return a = d.fx ? d.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function (b, d) {
            var c = setTimeout(b, a);
            d.stop = function () {
                clearTimeout(c)
            }
        })
    };
    (function () {
        var a, b, d, c, e;
        b = u.createElement("div");
        b.setAttribute("className", "t");
        b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        c = b.getElementsByTagName("a")[0];
        d = u.createElement("select");
        e = d.appendChild(u.createElement("option"));
        a = b.getElementsByTagName("input")[0];
        c.style.cssText = "top:1px";
        t.getSetAttribute =
            "t" !== b.className;
        t.style = /top/.test(c.getAttribute("style"));
        t.hrefNormalized = "/a" === c.getAttribute("href");
        t.checkOn = !!a.value;
        t.optSelected = e.selected;
        t.enctype = !!u.createElement("form").enctype;
        d.disabled = !0;
        t.optDisabled = !e.disabled;
        a = u.createElement("input");
        a.setAttribute("value", "");
        t.input = "" === a.getAttribute("value");
        a.value = "t";
        a.setAttribute("type", "radio");
        t.radioValue = "t" === a.value
    })();
    var sc = /\r/g;
    d.fn.extend({val: function (a) {
        var b, c, e, g = this[0];
        if (arguments.length)return e = d.isFunction(a),
            this.each(function (c) {
                var f;
                1 === this.nodeType && (f = e ? a.call(this, c, d(this).val()) : a, null == f ? f = "" : "number" == typeof f ? f += "" : d.isArray(f) && (f = d.map(f, function (a) {
                    return null == a ? "" : a + ""
                })), b = d.valHooks[this.type] || d.valHooks[this.nodeName.toLowerCase()], b && "set"in b && void 0 !== b.set(this, f, "value") || (this.value = f))
            });
        if (g)return b = d.valHooks[g.type] || d.valHooks[g.nodeName.toLowerCase()], b && "get"in b && void 0 !== (c = b.get(g, "value")) ? c : (c = g.value, "string" == typeof c ? c.replace(sc, "") : null == c ? "" : c)
    }});
    d.extend({valHooks: {option: {get: function (a) {
        var b =
            d.find.attr(a, "value");
        return null != b ? b : d.trim(d.text(a))
    }}, select: {get: function (a) {
        for (var b, c = a.options, e = a.selectedIndex, g = "select-one" === a.type || 0 > e, k = g ? null : [], h = g ? e + 1 : c.length, l = 0 > e ? h : g ? e : 0; h > l; l++)if (b = c[l], !(!b.selected && l !== e || (t.optDisabled ? b.disabled : null !== b.getAttribute("disabled")) || b.parentNode.disabled && d.nodeName(b.parentNode, "optgroup"))) {
            if (a = d(b).val(), g)return a;
            k.push(a)
        }
        return k
    }, set: function (a, b) {
        for (var c, e, g = a.options, k = d.makeArray(b), h = g.length; h--;)if (e = g[h], 0 <= d.inArray(d.valHooks.option.get(e),
            k))try {
            e.selected = c = !0
        } catch (l) {
            e.scrollHeight
        } else e.selected = !1;
        return c || (a.selectedIndex = -1), g
    }}}});
    d.each(["radio", "checkbox"], function () {
        d.valHooks[this] = {set: function (a, b) {
            return d.isArray(b) ? a.checked = 0 <= d.inArray(d(a).val(), b) : void 0
        }};
        t.checkOn || (d.valHooks[this].get = function (a) {
            return null === a.getAttribute("value") ? "on" : a.value
        })
    });
    var pa, Gb, fa = d.expr.attrHandle, Ta = /^(?:checked|selected)$/i, ga = t.getSetAttribute, Ha = t.input;
    d.fn.extend({attr: function (a, b) {
        return ea(this, d.attr, a, b, 1 < arguments.length)
    },
        removeAttr: function (a) {
            return this.each(function () {
                d.removeAttr(this, a)
            })
        }});
    d.extend({attr: function (a, b, c) {
        var e, g, k = a.nodeType;
        if (a && 3 !== k && 8 !== k && 2 !== k)return typeof a.getAttribute === U ? d.prop(a, b, c) : (1 === k && d.isXMLDoc(a) || (b = b.toLowerCase(), e = d.attrHooks[b] || (d.expr.match.bool.test(b) ? Gb : pa)), void 0 === c ? e && "get"in e && null !== (g = e.get(a, b)) ? g : (g = d.find.attr(a, b), null == g ? void 0 : g) : null !== c ? e && "set"in e && void 0 !== (g = e.set(a, c, b)) ? g : (a.setAttribute(b, c + ""), c) : void d.removeAttr(a, b))
    }, removeAttr: function (a, b) {
        var c, e, g = 0, k = b && b.match(W);
        if (k && 1 === a.nodeType)for (; c = k[g++];)e = d.propFix[c] || c, d.expr.match.bool.test(c) ? Ha && ga || !Ta.test(c) ? a[e] = !1 : a[d.camelCase("default-" + c)] = a[e] = !1 : d.attr(a, c, ""), a.removeAttribute(ga ? c : e)
    }, attrHooks: {type: {set: function (a, b) {
        if (!t.radioValue && "radio" === b && d.nodeName(a, "input")) {
            var c = a.value;
            return a.setAttribute("type", b), c && (a.value = c), b
        }
    }}}});
    Gb = {set: function (a, b, c) {
        return!1 === b ? d.removeAttr(a, c) : Ha && ga || !Ta.test(c) ? a.setAttribute(!ga && d.propFix[c] || c, c) : a[d.camelCase("default-" +
            c)] = a[c] = !0, c
    }};
    d.each(d.expr.match.bool.source.match(/\w+/g), function (a, b) {
        var c = fa[b] || d.find.attr;
        fa[b] = Ha && ga || !Ta.test(b) ? function (a, b, d) {
            var e, h;
            return d || (h = fa[b], fa[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, fa[b] = h), e
        } : function (a, b, c) {
            return c ? void 0 : a[d.camelCase("default-" + b)] ? b.toLowerCase() : null
        }
    });
    Ha && ga || (d.attrHooks.value = {set: function (a, b, c) {
        return d.nodeName(a, "input") ? void(a.defaultValue = b) : pa && pa.set(a, b, c)
    }});
    ga || (pa = {set: function (a, b, d) {
        var c = a.getAttributeNode(d);
        return c ||
            a.setAttributeNode(c = a.ownerDocument.createAttribute(d)), c.value = b += "", "value" === d || b === a.getAttribute(d) ? b : void 0
    }}, fa.id = fa.name = fa.coords = function (a, b, d) {
        var c;
        return d ? void 0 : (c = a.getAttributeNode(b)) && "" !== c.value ? c.value : null
    }, d.valHooks.button = {get: function (a, b) {
        var d = a.getAttributeNode(b);
        return d && d.specified ? d.value : void 0
    }, set: pa.set}, d.attrHooks.contenteditable = {set: function (a, b, d) {
        pa.set(a, "" === b ? !1 : b, d)
    }}, d.each(["width", "height"], function (a, b) {
        d.attrHooks[b] = {set: function (a, d) {
            return"" ===
                d ? (a.setAttribute(b, "auto"), d) : void 0
        }}
    }));
    t.style || (d.attrHooks.style = {get: function (a) {
        return a.style.cssText || void 0
    }, set: function (a, b) {
        return a.style.cssText = b + ""
    }});
    var tc = /^(?:input|select|textarea|button|object)$/i, uc = /^(?:a|area)$/i;
    d.fn.extend({prop: function (a, b) {
        return ea(this, d.prop, a, b, 1 < arguments.length)
    }, removeProp: function (a) {
        return a = d.propFix[a] || a, this.each(function () {
            try {
                this[a] = void 0, delete this[a]
            } catch (b) {
            }
        })
    }});
    d.extend({propFix: {"for": "htmlFor", "class": "className"}, prop: function (a, b, c) {
        var e, g, k, h = a.nodeType;
        if (a && 3 !== h && 8 !== h && 2 !== h)return k = 1 !== h || !d.isXMLDoc(a), k && (b = d.propFix[b] || b, g = d.propHooks[b]), void 0 !== c ? g && "set"in g && void 0 !== (e = g.set(a, c, b)) ? e : a[b] = c : g && "get"in g && null !== (e = g.get(a, b)) ? e : a[b]
    }, propHooks: {tabIndex: {get: function (a) {
        var b = d.find.attr(a, "tabindex");
        return b ? parseInt(b, 10) : tc.test(a.nodeName) || uc.test(a.nodeName) && a.href ? 0 : -1
    }}}});
    t.hrefNormalized || d.each(["href", "src"], function (a, b) {
        d.propHooks[b] = {get: function (a) {
            return a.getAttribute(b, 4)
        }}
    });
    t.optSelected ||
    (d.propHooks.selected = {get: function (a) {
        a = a.parentNode;
        return a && (a.selectedIndex, a.parentNode && a.parentNode.selectedIndex), null
    }});
    d.each("tabIndex readOnly maxLength cellSpacing cellPadding rowSpan colSpan useMap frameBorder contentEditable".split(" "), function () {
        d.propFix[this.toLowerCase()] = this
    });
    t.enctype || (d.propFix.enctype = "encoding");
    var Ua = /[\t\r\n\f]/g;
    d.fn.extend({addClass: function (a) {
        var b, c, e, g, k, h = 0, l = this.length;
        b = "string" == typeof a && a;
        if (d.isFunction(a))return this.each(function (b) {
            d(this).addClass(a.call(this,
                b, this.className))
        });
        if (b)for (b = (a || "").match(W) || []; l > h; h++)if (c = this[h], e = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(Ua, " ") : " ")) {
            for (k = 0; g = b[k++];)0 > e.indexOf(" " + g + " ") && (e += g + " ");
            e = d.trim(e);
            c.className !== e && (c.className = e)
        }
        return this
    }, removeClass: function (a) {
        var b, c, e, g, k, h = 0, l = this.length;
        b = 0 === arguments.length || "string" == typeof a && a;
        if (d.isFunction(a))return this.each(function (b) {
            d(this).removeClass(a.call(this, b, this.className))
        });
        if (b)for (b = (a || "").match(W) || []; l > h; h++)if (c =
            this[h], e = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(Ua, " ") : "")) {
            for (k = 0; g = b[k++];)for (; 0 <= e.indexOf(" " + g + " ");)e = e.replace(" " + g + " ", " ");
            e = a ? d.trim(e) : "";
            c.className !== e && (c.className = e)
        }
        return this
    }, toggleClass: function (a, b) {
        var c = typeof a;
        return"boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(d.isFunction(a) ? function (c) {
            d(this).toggleClass(a.call(this, c, this.className, b), b)
        } : function () {
            if ("string" === c)for (var b, e = 0, k = d(this), h = a.match(W) || []; b =
                h[e++];)k.hasClass(b) ? k.removeClass(b) : k.addClass(b); else(c === U || "boolean" === c) && (this.className && d._data(this, "__className__", this.className), this.className = this.className || !1 === a ? "" : d._data(this, "__className__") || "")
        })
    }, hasClass: function (a) {
        a = " " + a + " ";
        for (var b = 0, d = this.length; d > b; b++)if (1 === this[b].nodeType && 0 <= (" " + this[b].className + " ").replace(Ua, " ").indexOf(a))return!0;
        return!1
    }});
    d.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),
        function (a, b) {
            d.fn[b] = function (a, d) {
                return 0 < arguments.length ? this.on(b, null, a, d) : this.trigger(b)
            }
        });
    d.fn.extend({hover: function (a, b) {
        return this.mouseenter(a).mouseleave(b || a)
    }, bind: function (a, b, d) {
        return this.on(a, null, b, d)
    }, unbind: function (a, b) {
        return this.off(a, null, b)
    }, delegate: function (a, b, d, c) {
        return this.on(b, a, d, c)
    }, undelegate: function (a, b, d) {
        return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", d)
    }});
    var Va = d.now(), Wa = /\?/, vc = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    d.parseJSON = function (a) {
        if (c.JSON && c.JSON.parse)return c.JSON.parse(a + "");
        var b, f = null, e = d.trim(a + "");
        return e && !d.trim(e.replace(vc, function (a, d, c, e) {
            return b && d && (f = 0), 0 === f ? a : (b = c || d, f += !e - !c, "")
        })) ? Function("return " + e)() : d.error("Invalid JSON: " + a)
    };
    d.parseXML = function (a) {
        var b, f;
        if (!a || "string" != typeof a)return null;
        try {
            c.DOMParser ? (f = new DOMParser, b = f.parseFromString(a, "text/xml")) : (b = new ActiveXObject("Microsoft.XMLDOM"), b.async = "false", b.loadXML(a))
        } catch (e) {
            b = void 0
        }
        return b && b.documentElement && !b.getElementsByTagName("parsererror").length || d.error("Invalid XML: " + a), b
    };
    var $, N, wc = /#.*$/, Hb = /([?&])_=[^&]*/, xc = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, yc = /^(?:GET|HEAD)$/, zc = /^\/\//, Ib = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, Jb = {}, La = {}, Kb = "*/".concat("*");
    try {
        N = location.href
    } catch (Gc) {
        N = u.createElement("a"), N.href = "", N = N.href
    }
    $ = Ib.exec(N.toLowerCase()) || [];
    d.extend({active: 0, lastModified: {}, etag: {}, ajaxSettings: {url: N, type: "GET", isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test($[1]),
        global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: {"*": Kb, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript"}, contents: {xml: /xml/, html: /html/, json: /json/}, responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"}, converters: {"* text": String, "text html": !0, "text json": d.parseJSON, "text xml": d.parseXML}, flatOptions: {url: !0, context: !0}}, ajaxSetup: function (a, b) {
        return b ? Ma(Ma(a,
            d.ajaxSettings), b) : Ma(d.ajaxSettings, a)
    }, ajaxPrefilter: mb(Jb), ajaxTransport: mb(La), ajax: function (a, b) {
        function c(a, b, f, e) {
            var g, q, r, H, A = b;
            if (2 !== E) {
                E = 2;
                l && clearTimeout(l);
                p = void 0;
                h = e || "";
                v.readyState = 0 < a ? 4 : 0;
                e = 200 <= a && 300 > a || 304 === a;
                if (f) {
                    r = s;
                    for (var C = v, B, F, D, J, K = r.contents, G = r.dataTypes; "*" === G[0];)G.shift(), void 0 === F && (F = r.mimeType || C.getResponseHeader("Content-Type"));
                    if (F)for (J in K)if (K[J] && K[J].test(F)) {
                        G.unshift(J);
                        break
                    }
                    if (G[0]in f)D = G[0]; else {
                        for (J in f) {
                            if (!G[0] || r.converters[J + " " + G[0]]) {
                                D =
                                    J;
                                break
                            }
                            B || (B = J)
                        }
                        D = D || B
                    }
                    r = D ? (D !== G[0] && G.unshift(D), f[D]) : void 0
                }
                var I;
                a:{
                    f = s;
                    B = r;
                    F = v;
                    D = e;
                    var M, N, L;
                    r = {};
                    C = f.dataTypes.slice();
                    if (C[1])for (M in f.converters)r[M.toLowerCase()] = f.converters[M];
                    for (J = C.shift(); J;)if (f.responseFields[J] && (F[f.responseFields[J]] = B), !L && D && f.dataFilter && (B = f.dataFilter(B, f.dataType)), L = J, J = C.shift())if ("*" === J)J = L; else if ("*" !== L && L !== J) {
                        if (M = r[L + " " + J] || r["* " + J], !M)for (I in r)if (N = I.split(" "), N[1] === J && (M = r[L + " " + N[0]] || r["* " + N[0]])) {
                            !0 === M ? M = r[I] : !0 !== r[I] && (J = N[0],
                                C.unshift(N[1]));
                            break
                        }
                        if (!0 !== M)if (M && f["throws"])B = M(B); else try {
                            B = M(B)
                        } catch (O) {
                            I = {state: "parsererror", error: M ? O : "No conversion from " + L + " to " + J};
                            break a
                        }
                    }
                    I = {state: "success", data: B}
                }
                r = I;
                e ? (s.ifModified && (H = v.getResponseHeader("Last-Modified"), H && (d.lastModified[k] = H), H = v.getResponseHeader("etag"), H && (d.etag[k] = H)), 204 === a || "HEAD" === s.type ? A = "nocontent" : 304 === a ? A = "notmodified" : (A = r.state, g = r.data, q = r.error, e = !q)) : (q = A, (a || !A) && (A = "error", 0 > a && (a = 0)));
                v.status = a;
                v.statusText = (b || A) + "";
                e ? u.resolveWith(w,
                    [g, A, v]) : u.rejectWith(w, [v, A, q]);
                v.statusCode(y);
                y = void 0;
                m && t.trigger(e ? "ajaxSuccess" : "ajaxError", [v, s, e ? g : q]);
                z.fireWith(w, [v, A]);
                m && (t.trigger("ajaxComplete", [v, s]), --d.active || d.event.trigger("ajaxStop"))
            }
        }

        "object" == typeof a && (b = a, a = void 0);
        b = b || {};
        var e, g, k, h, l, m, p, r, s = d.ajaxSetup({}, b), w = s.context || s, t = s.context && (w.nodeType || w.jquery) ? d(w) : d.event, u = d.Deferred(), z = d.Callbacks("once memory"), y = s.statusCode || {}, H = {}, A = {}, E = 0, C = "canceled", v = {readyState: 0, getResponseHeader: function (a) {
            var b;
            if (2 ===
                E) {
                if (!r)for (r = {}; b = xc.exec(h);)r[b[1].toLowerCase()] = b[2];
                b = r[a.toLowerCase()]
            }
            return null == b ? null : b
        }, getAllResponseHeaders: function () {
            return 2 === E ? h : null
        }, setRequestHeader: function (a, b) {
            var d = a.toLowerCase();
            return E || (a = A[d] = A[d] || a, H[a] = b), this
        }, overrideMimeType: function (a) {
            return E || (s.mimeType = a), this
        }, statusCode: function (a) {
            var b;
            if (a)if (2 > E)for (b in a)y[b] = [y[b], a[b]]; else v.always(a[v.status]);
            return this
        }, abort: function (a) {
            a = a || C;
            return p && p.abort(a), c(0, a), this
        }};
        if (u.promise(v).complete =
            z.add, v.success = v.done, v.error = v.fail, s.url = ((a || s.url || N) + "").replace(wc, "").replace(zc, $[1] + "//"), s.type = b.method || b.type || s.method || s.type, s.dataTypes = d.trim(s.dataType || "*").toLowerCase().match(W) || [""], null == s.crossDomain && (e = Ib.exec(s.url.toLowerCase()), s.crossDomain = !(!e || e[1] === $[1] && e[2] === $[2] && (e[3] || ("http:" === e[1] ? "80" : "443")) === ($[3] || ("http:" === $[1] ? "80" : "443")))), s.data && s.processData && "string" != typeof s.data && (s.data = d.param(s.data, s.traditional)), nb(Jb, s, b, v), 2 === E)return v;
        (m = s.global) &&
            0 === d.active++ && d.event.trigger("ajaxStart");
        s.type = s.type.toUpperCase();
        s.hasContent = !yc.test(s.type);
        k = s.url;
        s.hasContent || (s.data && (k = s.url += (Wa.test(k) ? "&" : "?") + s.data, delete s.data), !1 === s.cache && (s.url = Hb.test(k) ? k.replace(Hb, "$1_=" + Va++) : k + (Wa.test(k) ? "&" : "?") + "_=" + Va++));
        s.ifModified && (d.lastModified[k] && v.setRequestHeader("If-Modified-Since", d.lastModified[k]), d.etag[k] && v.setRequestHeader("If-None-Match", d.etag[k]));
        (s.data && s.hasContent && !1 !== s.contentType || b.contentType) && v.setRequestHeader("Content-Type",
            s.contentType);
        v.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + ("*" !== s.dataTypes[0] ? ", " + Kb + "; q=0.01" : "") : s.accepts["*"]);
        for (g in s.headers)v.setRequestHeader(g, s.headers[g]);
        if (s.beforeSend && (!1 === s.beforeSend.call(w, v, s) || 2 === E))return v.abort();
        C = "abort";
        for (g in{success: 1, error: 1, complete: 1})v[g](s[g]);
        if (p = nb(La, s, b, v)) {
            v.readyState = 1;
            m && t.trigger("ajaxSend", [v, s]);
            s.async && 0 < s.timeout && (l = setTimeout(function () {
                v.abort("timeout")
            }, s.timeout));
            try {
                E = 1, p.send(H, c)
            } catch (B) {
                if (!(2 > E))throw B;
                c(-1, B)
            }
        } else c(-1, "No Transport");
        return v
    }, getJSON: function (a, b, c) {
        return d.get(a, b, c, "json")
    }, getScript: function (a, b) {
        return d.get(a, void 0, b, "script")
    }});
    d.each(["get", "post"], function (a, b) {
        d[b] = function (a, c, e, k) {
            return d.isFunction(c) && (k = k || e, e = c, c = void 0), d.ajax({url: a, type: b, dataType: k, data: c, success: e})
        }
    });
    d.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (a, b) {
        d.fn[b] = function (a) {
            return this.on(b, a)
        }
    });
    d._evalUrl = function (a) {
        return d.ajax({url: a, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0})
    };
    d.fn.extend({wrapAll: function (a) {
        if (d.isFunction(a))return this.each(function (b) {
            d(this).wrapAll(a.call(this, b))
        });
        if (this[0]) {
            var b = d(a, this[0].ownerDocument).eq(0).clone(!0);
            this[0].parentNode && b.insertBefore(this[0]);
            b.map(function () {
                for (var a = this; a.firstChild && 1 === a.firstChild.nodeType;)a = a.firstChild;
                return a
            }).append(this)
        }
        return this
    }, wrapInner: function (a) {
        return this.each(d.isFunction(a) ?
            function (b) {
                d(this).wrapInner(a.call(this, b))
            } : function () {
            var b = d(this), c = b.contents();
            c.length ? c.wrapAll(a) : b.append(a)
        })
    }, wrap: function (a) {
        var b = d.isFunction(a);
        return this.each(function (c) {
            d(this).wrapAll(b ? a.call(this, c) : a)
        })
    }, unwrap: function () {
        return this.parent().each(function () {
            d.nodeName(this, "body") || d(this).replaceWith(this.childNodes)
        }).end()
    }});
    d.expr.filters.hidden = function (a) {
        return 0 >= a.offsetWidth && 0 >= a.offsetHeight || !t.reliableHiddenOffsets() && "none" === (a.style && a.style.display ||
            d.css(a, "display"))
    };
    d.expr.filters.visible = function (a) {
        return!d.expr.filters.hidden(a)
    };
    var Ac = /%20/g, Vb = /\[\]$/, Lb = /\r?\n/g, Bc = /^(?:submit|button|image|reset|file)$/i, Cc = /^(?:input|select|textarea|keygen)/i;
    d.param = function (a, b) {
        var c, e = [], g = function (a, b) {
            b = d.isFunction(b) ? b() : null == b ? "" : b;
            e[e.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
        };
        if (void 0 === b && (b = d.ajaxSettings && d.ajaxSettings.traditional), d.isArray(a) || a.jquery && !d.isPlainObject(a))d.each(a, function () {
            g(this.name, this.value)
        });
        else for (c in a)Na(c, a[c], b, g);
        return e.join("&").replace(Ac, "+")
    };
    d.fn.extend({serialize: function () {
        return d.param(this.serializeArray())
    }, serializeArray: function () {
        return this.map(function () {
            var a = d.prop(this, "elements");
            return a ? d.makeArray(a) : this
        }).filter(function () {
            var a = this.type;
            return this.name && !d(this).is(":disabled") && Cc.test(this.nodeName) && !Bc.test(a) && (this.checked || !Ka.test(a))
        }).map(function (a, b) {
            var c = d(this).val();
            return null == c ? null : d.isArray(c) ? d.map(c, function (a) {
                return{name: b.name,
                    value: a.replace(Lb, "\r\n")}
            }) : {name: b.name, value: c.replace(Lb, "\r\n")}
        }).get()
    }});
    d.ajaxSettings.xhr = void 0 !== c.ActiveXObject ? function () {
        var a;
        if (!(a = !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && ob()))a:{
            try {
                a = new c.ActiveXObject("Microsoft.XMLHTTP");
                break a
            } catch (b) {
            }
            a = void 0
        }
        return a
    } : ob;
    var Dc = 0, Ia = {}, Ja = d.ajaxSettings.xhr();
    c.ActiveXObject && d(c).on("unload", function () {
        for (var a in Ia)Ia[a](void 0, !0)
    });
    t.cors = !!Ja && "withCredentials"in Ja;
    (Ja = t.ajax = !!Ja) && d.ajaxTransport(function (a) {
        if (!a.crossDomain ||
            t.cors) {
            var b;
            return{send: function (c, e) {
                var g, k = a.xhr(), h = ++Dc;
                if (k.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields)for (g in a.xhrFields)k[g] = a.xhrFields[g];
                a.mimeType && k.overrideMimeType && k.overrideMimeType(a.mimeType);
                a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
                for (g in c)void 0 !== c[g] && k.setRequestHeader(g, c[g] + "");
                k.send(a.hasContent && a.data || null);
                b = function (c, f) {
                    var g, l, m;
                    if (b && (f || 4 === k.readyState))if (delete Ia[h], b = void 0, k.onreadystatechange =
                        d.noop, f)4 !== k.readyState && k.abort(); else {
                        m = {};
                        g = k.status;
                        "string" == typeof k.responseText && (m.text = k.responseText);
                        try {
                            l = k.statusText
                        } catch (p) {
                            l = ""
                        }
                        g || !a.isLocal || a.crossDomain ? 1223 === g && (g = 204) : g = m.text ? 200 : 404
                    }
                    m && e(g, l, m, k.getAllResponseHeaders())
                };
                a.async ? 4 === k.readyState ? setTimeout(b) : k.onreadystatechange = Ia[h] = b : b()
            }, abort: function () {
                b && b(void 0, !0)
            }}
        }
    });
    d.ajaxSetup({accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"}, contents: {script: /(?:java|ecma)script/},
        converters: {"text script": function (a) {
            return d.globalEval(a), a
        }}});
    d.ajaxPrefilter("script", function (a) {
        void 0 === a.cache && (a.cache = !1);
        a.crossDomain && (a.type = "GET", a.global = !1)
    });
    d.ajaxTransport("script", function (a) {
        if (a.crossDomain) {
            var b, c = u.head || d("head")[0] || u.documentElement;
            return{send: function (d, e) {
                b = u.createElement("script");
                b.async = !0;
                a.scriptCharset && (b.charset = a.scriptCharset);
                b.src = a.url;
                b.onload = b.onreadystatechange = function (a, d) {
                    (d || !b.readyState || /loaded|complete/.test(b.readyState)) &&
                    (b.onload = b.onreadystatechange = null, b.parentNode && b.parentNode.removeChild(b), b = null, d || e(200, "success"))
                };
                c.insertBefore(b, c.firstChild)
            }, abort: function () {
                b && b.onload(void 0, !0)
            }}
        }
    });
    var Mb = [], Xa = /(=)\?(?=&|$)|\?\?/;
    d.ajaxSetup({jsonp: "callback", jsonpCallback: function () {
        var a = Mb.pop() || d.expando + "_" + Va++;
        return this[a] = !0, a
    }});
    d.ajaxPrefilter("json jsonp", function (a, b, f) {
        var e, g, k, h = !1 !== a.jsonp && (Xa.test(a.url) ? "url" : "string" == typeof a.data && !(a.contentType || "").indexOf("application/x-www-form-urlencoded") &&
            Xa.test(a.data) && "data");
        return h || "jsonp" === a.dataTypes[0] ? (e = a.jsonpCallback = d.isFunction(a.jsonpCallback) ? a.jsonpCallback() : a.jsonpCallback, h ? a[h] = a[h].replace(Xa, "$1" + e) : !1 !== a.jsonp && (a.url += (Wa.test(a.url) ? "&" : "?") + a.jsonp + "=" + e), a.converters["script json"] = function () {
            return k || d.error(e + " was not called"), k[0]
        }, a.dataTypes[0] = "json", g = c[e], c[e] = function () {
            k = arguments
        }, f.always(function () {
            c[e] = g;
            a[e] && (a.jsonpCallback = b.jsonpCallback, Mb.push(e));
            k && d.isFunction(g) && g(k[0]);
            k = g = void 0
        }), "script") :
            void 0
    });
    d.parseHTML = function (a, b, c) {
        if (!a || "string" != typeof a)return null;
        "boolean" == typeof b && (c = b, b = !1);
        b = b || u;
        var e = ub.exec(a);
        c = !c && [];
        return e ? [b.createElement(e[1])] : (e = d.buildFragment([a], b, c), c && c.length && d(c).remove(), d.merge([], e.childNodes))
    };
    var Nb = d.fn.load;
    d.fn.load = function (a, b, c) {
        if ("string" != typeof a && Nb)return Nb.apply(this, arguments);
        var e, g, k, h = this, l = a.indexOf(" ");
        return 0 <= l && (e = d.trim(a.slice(l, a.length)), a = a.slice(0, l)), d.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b &&
            (k = "POST"), 0 < h.length && d.ajax({url: a, type: k, dataType: "html", data: b}).done(function (a) {
            g = arguments;
            h.html(e ? d("<div>").append(d.parseHTML(a)).find(e) : a)
        }).complete(c && function (a, b) {
            h.each(c, g || [a.responseText, b, a])
        }), this
    };
    d.expr.filters.animated = function (a) {
        return d.grep(d.timers,function (b) {
            return a === b.elem
        }).length
    };
    var Ob = c.document.documentElement;
    d.offset = {setOffset: function (a, b, c) {
        var e, g, k, h, l, m, p = d.css(a, "position"), r = d(a), s = {};
        "static" === p && (a.style.position = "relative");
        l = r.offset();
        k = d.css(a,
            "top");
        m = d.css(a, "left");
        ("absolute" === p || "fixed" === p) && -1 < d.inArray("auto", [k, m]) ? (e = r.position(), h = e.top, g = e.left) : (h = parseFloat(k) || 0, g = parseFloat(m) || 0);
        d.isFunction(b) && (b = b.call(a, c, l));
        null != b.top && (s.top = b.top - l.top + h);
        null != b.left && (s.left = b.left - l.left + g);
        "using"in b ? b.using.call(a, s) : r.css(s)
    }};
    d.fn.extend({offset: function (a) {
        if (arguments.length)return void 0 === a ? this : this.each(function (b) {
            d.offset.setOffset(this, a, b)
        });
        var b, c, e = {top: 0, left: 0}, g = this[0], k = g && g.ownerDocument;
        if (k)return b =
            k.documentElement, d.contains(b, g) ? (typeof g.getBoundingClientRect !== U && (e = g.getBoundingClientRect()), c = pb(k), {top: e.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0), left: e.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)}) : e
    }, position: function () {
        if (this[0]) {
            var a, b, c = {top: 0, left: 0}, e = this[0];
            return"fixed" === d.css(e, "position") ? b = e.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), d.nodeName(a[0], "html") || (c = a.offset()), c.top += d.css(a[0], "borderTopWidth", !0), c.left += d.css(a[0], "borderLeftWidth",
                !0)), {top: b.top - c.top - d.css(e, "marginTop", !0), left: b.left - c.left - d.css(e, "marginLeft", !0)}
        }
    }, offsetParent: function () {
        return this.map(function () {
            for (var a = this.offsetParent || Ob; a && !d.nodeName(a, "html") && "static" === d.css(a, "position");)a = a.offsetParent;
            return a || Ob
        })
    }});
    d.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (a, b) {
        var c = /Y/.test(b);
        d.fn[a] = function (e) {
            return ea(this, function (a, e, h) {
                var l = pb(a);
                return void 0 === h ? l ? b in l ? l[b] : l.document.documentElement[e] : a[e] : void(l ? l.scrollTo(c ?
                    d(l).scrollLeft() : h, c ? h : d(l).scrollTop()) : a[e] = h)
            }, a, e, arguments.length, null)
        }
    });
    d.each(["top", "left"], function (a, b) {
        d.cssHooks[b] = $a(t.pixelPosition, function (a, c) {
            return c ? (c = Q(a, b), xa.test(c) ? d(a).position()[b] + "px" : c) : void 0
        })
    });
    d.each({Height: "height", Width: "width"}, function (a, b) {
        d.each({padding: "inner" + a, content: b, "": "outer" + a}, function (c, e) {
            d.fn[e] = function (e, k) {
                var h = arguments.length && (c || "boolean" != typeof e), l = c || (!0 === e || !0 === k ? "margin" : "border");
                return ea(this, function (b, c, e) {
                    var f;
                    return d.isWindow(b) ?
                        b.document.documentElement["client" + a] : 9 === b.nodeType ? (f = b.documentElement, Math.max(b.body["scroll" + a], f["scroll" + a], b.body["offset" + a], f["offset" + a], f["client" + a])) : void 0 === e ? d.css(b, c, l) : d.style(b, c, e, l)
                }, b, h ? e : void 0, h, null)
            }
        })
    });
    d.fn.size = function () {
        return this.length
    };
    d.fn.andSelf = d.fn.addBack;
    "function" == typeof define && define.amd && define("jquery", [], function () {
        return d
    });
    var Ec = c.jQuery, Fc = c.$;
    return d.noConflict = function (a) {
        return c.$ === d && (c.$ = Fc), a && c.jQuery === d && (c.jQuery = Ec), d
    }, typeof r ===
        U && (c.jQuery = c.$ = d), d
});
(function (c, r) {
    var h = window.KingSoft = window.K || {}, p = document.createElement("div").style, l = {};
    window.K = h;
    h.supports = h.supports || l;
    h.version = "1.0.0";
    var y = h.camelCase = function (c) {
        return c.replace(/^-ms-/, "ms-").replace(/-([a-z]|[0-9])/ig, function (c, e) {
            return(e + "").toUpperCase()
        })
    };
    h.uncamelCase = function (c) {
        return c.replace(/([A-Z]|^ms)/g, "-$1").toLowerCase()
    };
    var m = h.cssVendor = function () {
        var c = ["-o-", "-webkit-", "-moz-", "-ms-", ""], h = 0;
        do if (y(c[h] + "transform")in p)return c[h]; while (++h < c.length);
        return""
    }();
    h.transitionend = {"-o-": "otransitionend", "-webkit-": "webkitTransitionEnd", "-moz-": "transitionend", "-ms-": "MSTransitionEnd transitionend", "": "transitionend"}[m];
    var A = h.isCSS = function (c) {
        var h = y(c);
        c = y(m + c);
        return h in p && h || c in p && c || ""
    };
    h.object_keys = function (c) {
        if (Object.keys)c = Object.keys(c); else {
            var h = [], l;
            for (l in c)c.hasOwnProperty(l) && h.push(l);
            c = h
        }
        return c
    };
    var K = h.isArrayLike = function (c) {
        var l = h.type(c);
        return!!c && "function" != l && "string" != l && (0 === c.length || c.length && c.length - 1 in c)
    }, D = h.type =
        function () {
            for (var c = "Boolean Number String Function Array Date RegExp Object Error Undefined Null".split(" "), l = 0, m = {}; l < c.length;)h["is" + c[l]] = function () {
                var h = c[l].toLowerCase();
                return function (c) {
                    return D(c) === h
                }
            }(), m["[object " + c[l] + "]"] = c[l++].toLowerCase();
            return function (c) {
                return null == c ? String(c) : "object" == typeof c ? m[m.toString.call(c)] || "object" : typeof c
            }
        }();
    h.reset = function (c) {
        if (K(c))c = c[0]; else a:{
            for (var h in c) {
                c = c[h];
                break a
            }
            c = void 0
        }
        return c
    };
    h.bind = function (c, h) {
        return function () {
            return h.apply(c,
                arguments)
        }
    };
    h.createNode = function (c, h) {
        var l = document.createElement(c), m;
        if (h)for (m in h)h.hasOwnProperty(m) && (m in l ? l[m] = h[m] : l.setAttribute(m, h[m]));
        return l
    };
    h.placeholder = function () {
        var e = "placeholder"in document.createElement("input"), l = function () {
            var e = c(this), h = e.attr("placeholder");
            e.focus(function () {
                e.val() == h && e.removeClass("hasholder").val("")
            }).blur(function () {
                "" == e.val() && e.addClass("hasholder").val(h)
            }).blur()
        };
        h.supports.placeholder = e;
        return function (h) {
            !e && c(h).each(l)
        }
    }();
    l.touch =
        "createTouch"in document || "ontouchstart"in window;
    h.isMobile = l.touch && 540 >= c(window).width();
    c.each("transform transition animation perspective border-image border-radius box-shadow background-size background-clip text-shadow min-height opacity".split(" "), function (c, h) {
        l[y(h)] = !!A(h)
    });
    p.cssText = "color:rgba(0,0,0,0);position:fixed;display:inline-block;border-color:transparent;background-image:" + m + "gradient(linear,0 0,0 0,from(#000),to(#000));background-image:" + m + "linear-gradient(#fff,#000);";
    l.rgba =
        /rgba/.test(p.color);
    l.fixed = /fixed/.test(p.position);
    l.inlineBlock = /inline-block/.test(p.display);
    l.transparent = /transparent/.test(p.borderColor);
    l.gradient = /gradient/.test(p.backgroundImage);
    h.transform = A("transform");
    h.transition = A("transition");
    h.animation = A("animation");
    c("body").addClass(c.map(l,function (c, h) {
        if (c)return y("can-" + h)
    }).join(" "));
    c.fn.extend({tap: function (e) {
        if (!c(this).data("tapbind")) {
            if (h.supports.touch) {
                var l, m, p;
                c(this).on({touchstart: function (c) {
                    c = c.originalEvent.changedTouches;
                    l = c.item(0).pageX;
                    m = c.item(0).pageY;
                    p = +new Date
                }, "touchcancel touchend": function (e) {
                    e = e.originalEvent.changedTouches;
                    3 > Math.abs(l - e.item(0).pageX) && (3 > Math.abs(m - e.item(0).pageY) && 300 > +new Date - p) && c(this).trigger("tap")
                }})
            } else c(this).click(function () {
                c(this).trigger("tap")
            });
            c(this).data("tapbind", "true")
        }
        return c(this).on("tap", e)
    }})
})(jQuery);
