(function ($) {
    'use strict';

    function safe_add(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF), msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF)
    }

    function bit_rol(num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt))
    }

    function md5_cmn(q, a, b, x, s, t) {
        return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b)
    }

    function md5_ff(a, b, c, d, x, s, t) {
        return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t)
    }

    function md5_gg(a, b, c, d, x, s, t) {
        return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t)
    }

    function md5_hh(a, b, c, d, x, s, t) {
        return md5_cmn(b ^ c ^ d, a, b, x, s, t)
    }

    function md5_ii(a, b, c, d, x, s, t) {
        return md5_cmn(c ^ (b | (~d)), a, b, x, s, t)
    }

    function binl_md5(x, len) {
        x[len >> 5] |= 0x80 << ((len) % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;
        var i, olda, oldb, oldc, oldd, a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
        for (i = 0; i < x.length; i += 16) {
            olda = a;
            oldb = b;
            oldc = c;
            oldd = d;
            a = md5_ff(a, b, c, d, x[i], 7, -680876936);
            d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
            c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
            b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
            a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
            d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
            c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
            b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
            a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
            d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
            c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
            b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
            d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
            a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
            d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
            c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
            b = md5_gg(b, c, d, a, x[i], 20, -373897302);
            a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
            d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
            c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
            a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
            d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
            c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
            b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
            a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
            d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
            c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
            b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
            a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
            d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
            c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
            b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
            d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
            c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
            b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
            d = md5_hh(d, a, b, c, x[i], 11, -358537222);
            c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
            b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
            a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
            d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
            b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
            a = md5_ii(a, b, c, d, x[i], 6, -198630844);
            d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
            c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
            a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
            d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
            c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
            a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
            d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
            b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
            a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
            d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
            b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
            a = safe_add(a, olda);
            b = safe_add(b, oldb);
            c = safe_add(c, oldc);
            d = safe_add(d, oldd)
        }
        return [a, b, c, d]
    }

    function binl2rstr(input) {
        var i, output = '';
        for (i = 0; i < input.length * 32; i += 8) {
            output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF)
        }
        return output
    }

    function rstr2binl(input) {
        var i, output = [];
        output[(input.length >> 2) - 1] = undefined;
        for (i = 0; i < output.length; i += 1) {
            output[i] = 0
        }
        for (i = 0; i < input.length * 8; i += 8) {
            output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32)
        }
        return output
    }

    function rstr_md5(s) {
        return binl2rstr(binl_md5(rstr2binl(s), s.length * 8))
    }

    function rstr_hmac_md5(key, data) {
        var i, bkey = rstr2binl(key), ipad = [], opad = [], hash;
        ipad[15] = opad[15] = undefined;
        if (bkey.length > 16) {
            bkey = binl_md5(bkey, key.length * 8)
        }
        for (i = 0; i < 16; i += 1) {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5C5C5C5C
        }
        hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
        return binl2rstr(binl_md5(opad.concat(hash), 512 + 128))
    }

    function rstr2hex(input) {
        var hex_tab = '0123456789abcdef', output = '', x, i;
        for (i = 0; i < input.length; i += 1) {
            x = input.charCodeAt(i);
            output += hex_tab.charAt((x >>> 4) & 0x0F) + hex_tab.charAt(x & 0x0F)
        }
        return output
    }

    function str2rstr_utf8(input) {
        return unescape(encodeURIComponent(input))
    }

    function raw_md5(s) {
        return rstr_md5(str2rstr_utf8(s))
    }

    function hex_md5(s) {
        return rstr2hex(raw_md5(s))
    }

    function raw_hmac_md5(k, d) {
        return rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))
    }

    function hex_hmac_md5(k, d) {
        return rstr2hex(raw_hmac_md5(k, d))
    }

    $.md5 = function (string, key, raw) {
        if (!key) {
            if (!raw) {
                return hex_md5(string)
            } else {
                return raw_md5(string)
            }
        }
        if (!raw) {
            return hex_hmac_md5(key, string)
        } else {
            return raw_hmac_md5(key, string)
        }
    }
}(typeof jQuery === 'function' ? jQuery : this));
String.prototype.replaceAll = function (b, a) {
    return this.replace(new RegExp(b, "gm"), a)
};
ttlj = {
    removecj: function (a, e) {
        var d = (e == "js") ? "script" : (e == "css") ? "link" : "none";
        var c = (e == "js") ? "src" : (e == "css") ? "href" : "none";
        var f = document.getElementsByTagName(d);
        for (var b = f.length; b >= 0; b--) {
            if (f[b] && f[b].getAttribute(c) != null && f[b].getAttribute(c).indexOf(a) != -1) {
                f[b].parentNode.removeChild(f[b])
            }
        }
    },
    addcj: function (a, b) {
        if (b == "css") {
            $("<link>").attr({
                rel: "stylesheet",
                type: "text/css",
                href: a,
            }).appendTo("head")
        } else {
            jQuery.getScript(a, function () {
            })
        }
    },
    alertsuccess: function (b) {
        var a = '<div class="alertsuccess_div" style="position: fixed;z-index:999999999;max-width: 70%;line-height: 20px;overflow: hidden;top:50%;left:50%;-webkit-transform: translate(-50%,-50%);-ms-transform: translate(-50%,-50%);transform: translate(-50%,-50%); background: rgb(85, 181, 85);color: #FFF;text-align: center;font-size: 14px;padding:15px 20px;border-radius:10px;display: none;">' + b + "</div>";
        $("body").append(a);
        $(".alertsuccess_div").fadeIn(1000);
        $(".alertsuccess_div").fadeOut(3000);
        setTimeout(function () {
            $(".alertsuccess_div").remove();
            return
        }, 2500)
    },
    alerterror: function (b) {
        var a = '<div class="alerterror_div" style="position: fixed;z-index:999999999;max-width: 70%;line-height: 20px;overflow: hidden;top:50%;left:50%;-webkit-transform: translate(-50%,-50%);-ms-transform: translate(-50%,-50%);transform: translate(-50%,-50%); background: #d9534f;color: #FFF;text-align: center;font-size: 14px;padding:15px 20px;border-radius:5px;display: none;">' + b + "</div>";
        $("body").append(a);
        $(".alerterror_div").fadeIn(1000);
        $(".alerterror_div").fadeOut(3000);
        setTimeout(function () {
            $(".alerterror_div").remove();
            return
        }, 2500)
    },
    refresh: function () {
        window.location.href = location
    },
    refreshBack: function (a) {
        history.replaceState(null, null, a);
        window.location.href = location
    },
    setCookies: function (a, b, d, c) {
        $.cookie(a, b, {
            expires: c,
            path: d
        })
    },
    getCookies: function (a) {
        return $.cookie(a)
    },
    removeCookies: function (a, b) {
        $.cookie(a, null, {
            path: b,
            expires: -1
        })
    },
    checkmobile: function (a) {
        var b = /^1[3|4|5|6|7|8|9]\d{9}$/;
        if (b.test(a)) {
            return true
        } else {
            return false
        }
    },
    checkmail: function (a) {
        var b = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (b.test(a)) {
            return true
        } else {
            return false
        }
    },
    checkpassword: function (b) {
        var a = /^[\d|\w|\.|\?|\@]{6,16}$/;
        if (a.test(b)) {
            return true
        } else {
            return false
        }
    },
    checkusername: function (b) {
        var a = /^[\u4e00-\u9fa5]{2,4}$/;
        if (a.test(b)) {
            return true
        } else {
            return false
        }
    },
    checktext: function (b) {
        var a = /^[\u4e00-\u9fa5|\d|\w]{1,64}$/;
        if (a.test(b)) {
            return true
        } else {
            return false
        }
    },
    checkremarks: function (b) {
        var a = /^[\u4e00-\u9fa5|\d|\w]{0,64}$/;
        if (a.test(b)) {
            return true
        } else {
            return false
        }
    },
    checkIdCard: function (a) {
        var b = /^[\d|\w]{18}$/;
        if (b.test(a)) {
            return true
        } else {
            return false
        }
    },
    checkCode: function (b, a) {
        var c = "^(\\d){" + a + "}$";
        var d = new RegExp(c);
        if (d.test(b)) {
            return true
        } else {
            return false
        }
    },
    date2string: function (f) {
        var h = new Date();
        h.setTime(f);
        var d = h.getFullYear();
        var e = h.getMonth() + 1 < 10 ? "0" + (h.getMonth() + 1) : h.getMonth() + 1;
        var c = h.getDate() < 10 ? "0" + h.getDate() : h.getDate();
        var a = h.getHours() < 10 ? "0" + h.getHours() : h.getHours();
        var g = h.getMinutes() < 10 ? "0" + h.getMinutes() : h.getMinutes();
        var b = h.getSeconds() < 10 ? "0" + h.getSeconds() : h.getSeconds();
        return d + "-" + e + "-" + c + " " + a + ":" + g + ":" + b
    },
    dateToString: function (b, i) {
        var g = new Date();
        g.setTime(b);
        var h = g.getFullYear();
        var f = g.getMonth() + 1 < 10 ? "0" + (g.getMonth() + 1) : g.getMonth() + 1;
        var c = g.getDate() < 10 ? "0" + g.getDate() : g.getDate();
        var e = g.getHours() < 10 ? "0" + g.getHours() : g.getHours();
        var d = g.getMinutes() < 10 ? "0" + g.getMinutes() : g.getMinutes();
        var a = g.getSeconds() < 10 ? "0" + g.getSeconds() : g.getSeconds();
        return h + i + f + i + c + " " + e + ":" + d + ":" + a
    },
    dateToStringGetYMD: function (b, i) {
        var g = new Date();
        g.setTime(b);
        var h = g.getFullYear();
        var f = g.getMonth() + 1 < 10 ? "0" + (g.getMonth() + 1) : g.getMonth() + 1;
        var c = g.getDate() < 10 ? "0" + g.getDate() : g.getDate();
        var e = g.getHours() < 10 ? "0" + g.getHours() : g.getHours();
        var d = g.getMinutes() < 10 ? "0" + g.getMinutes() : g.getMinutes();
        var a = g.getSeconds() < 10 ? "0" + g.getSeconds() : g.getSeconds();
        return h + i + f + i + c
    },
    location: function (a) {
        window.location.href = a
    },
    encrypt: function (b, a) {
        var d = a;
        var c = new JSEncrypt();
        c.setPublicKey(d);
        return c.encrypt(b)
    },
    back: function () {
        history.go(-1);
        location.reload()
    },
    alertmodel: function (b) {
        var a = '<div style="position: fixed;width: 100%;height: 100%;background: rgba(0,0,0,0.5);z-index: ' + b + ';top:0px;left:0px;" class="div_alert_model"></div>';
        $("body").append(a);
        $("body").css("overflow", "hidden")
    },
    dateToStringYMD: function (time) {
        var datetime = new Date();
        datetime.setTime(time);
        var year = datetime.getFullYear();
        var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
        var hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
        var minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
        var second = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
        return year + "-" + month + "-" + date;
    },
    alertmodelText: function (b, c) {
        var a = '<div style="position: fixed;width: 100%;height: 100%;background: rgba(0,0,0,0.5);z-index: ' + b + ';top:0px;left:0px;color:#FFF;text-align: center;" class="div_alert_model"><p class="position_center" style="position: absolute;font-size: 16px;">' + c + "</p></div>";
        $("body").append(a);
        $("body").css("overflow", "hidden")
    },
    closemodel: function () {
        $(".div_alert_model").remove();
        $("body").css("overflow", "auto")
    },
    alertloading: function (b) {
//		var a = '<div class="div_alert_loading" style="position: fixed;z-index: ' + b + ';background:rgba(0,0,0,0.3);width:100%;"><span class="ball-loader">Loading&#8230;</span></div>';
        var a = '<div class="div_alert_loading" style="position: fixed;z-index: ' + b + ';background:rgba(0,0,0,0.2);width:100%;height:100%;left:0px;top:0px;"><span class="ball-loader position_center">Loading&#8230;</span></div>';
        $("body").append(a)
    },
    closeloading: function (a) {
        $(".div_alert_loading").fadeOut(a)
    },
    removeArrayIndex: function (d, b) {
        var a = new Array();
        d[b] = "removeFunction";
        for (var c = 0; c < d.length; ++c) {
            if (d[c] != "removeFunction") {
                a[a.length] = d[c]
            }
        }
        return a
    },
    autoTextarea: function (c, d, h) {
        d = d || 0;
        var a = !!document.getBoxObjectFor || "mozInnerScreenX" in window,
            b = !!window.opera && !!window.opera.toString().indexOf("Opera"),
            e = function (j, k) {
                c.addEventListener ? c.addEventListener(j, k, false) : c.attachEvent("on" + j, k)
            },
            f = c.currentStyle ?
                function (j) {
                    var l = c.currentStyle[j];
                    if (j === "height" && l.search(/px/i) !== 1) {
                        var k = c.getBoundingClientRect();
                        return k.bottom - k.top - parseFloat(f("paddingTop")) - parseFloat(f("paddingBottom")) + "px"
                    }
                    return l
                } : function (j) {
                    return getComputedStyle(c, null)[j]
                }, i = parseFloat(f("height"));
        c.style.resize = "none";
        var g = function () {
            var m, j, l = 0,
                k = c.style;
            if (c._length === c.value.length) {
                return
            }
            c._length = c.value.length;
            if (!a && !b) {
                l = parseInt(f("paddingTop")) + parseInt(f("paddingBottom"))
            }
            m = document.body.scrollTop || document.documentElement.scrollTop;
            c.style.height = i + "px";
            if (c.scrollHeight > i) {
                if (h && c.scrollHeight > h) {
                    j = h - l;
                    k.overflowY = "auto"
                } else {
                    j = c.scrollHeight - l;
                    k.overflowY = "hidden"
                }
                k.height = j + d + "px";
                m += parseInt(k.height) - c.currHeight;
                document.body.scrollTop = m;
                document.documentElement.scrollTop = m;
                c.currHeight = parseInt(k.height)
            }
        };
        e("propertychange", g);
        e("input", g);
        e("focus", g);
        g()
    },
    alertLoading: function () {
        var a = '<loading class="ball-loader">Loading&#8230;</loading>';
        $("body").append(a);
        $("loading").css("left", ($(window).width() - 50) / 2 + "px")
    },
    closeLoading: function () {
        $(".ball-loader").remove()
    },
    isChrome: function () {
        var a = navigator.userAgent;
        if (a.indexOf("Chrome") > -1) {
            return true
        } else {
            return false
        }
    },
    isInteger: function (a) {
        return (a | 0) === a
    },
    checkText: function (c, e, a) {
        var b = "^(\\d|\\w|[\\u4e00-\u9fa5]|\\?|\\?|\\?|\\?|\\?|\\?|\\?|\\?|\\?|\\/|\\{|\\}|\\.|\\@|\\#){" + e + "," + a + "}$";
        var d = new RegExp(b);
        if (d.test(c)) {
            return true
        } else {
            return false
        }
    },
    getRexpImagesArray: function (d) {
        var e = new Array();
        var g = "^(\"http://|'http://|\"https://|'https://|http://|https://)(\\d|\\w|\\:|\\?|\\_|\\-|\\/|\\.|\\\"|\\')+(\\.JPEG|\\.jpeg|\\.JPG|\\.jpg|\\.GIF|\\.gif|\\.BMP|\\.bmp|\\.PNG|\\.png)";
        var b = new RegExp(g);
        var a = d.split("src=");
        for (var c = 0; c < a.length; ++c) {
            var f = a[c];
            if (b.test(f)) {
                if (f.indexOf('"') == 0 || f.indexOf("'") == 0) {
                    f = f.substring(1, f.length)
                }
                e[e.length] = f.match(b)[0]
            }
        }
        return e
    },
    checkMobileOrTelephone: function (a) {
        var c = "(^[1][34578]\\d{9}$)|(^[0][\\d]{2,3}\\d{7,8}$)";
        var b = new RegExp(c);
        if (b.test(a)) {
            return true
        } else {
            return false
        }
    },
    checkPrice: function (a) {
        if (!(/^(?:\d+|\d+\.\d{0,2})$/.test(a.value))) {
            a.value = a.value.replace(/^(\d*\.\d{0,2}|\d+).*$/, "$1")
        }
    },
    checkNumber: function (b, a) {
        b.value = b.value.replace(/\D/g, "");
        b.value = b.value.substring(0, a)
    },
    checkMaxlength: function (b, a) {
        b.value = b.value.substring(0, a)
    },
    deleteArrayIndex: function (e, f, b) {
        var d = new Array();
        for (var c = 0; c < e.length;) {
            if (e[c] != f) {
                for (var a = 0; a < b; ++a) {
                    d[d.length] = e[c++]
                }
            } else {
                c = c + b
            }
        }
        return d
    },
    getRandNumber: function (a, b) {
        return parseInt(Math.random() * (a - b + 1) + b, 10)
    },
    parseJson: function (result) {
        return eval("(" + result + ")")
    },
    serialize: function (a) {
        a = decodeURIComponent(a);
        return a
    },
    init_closeActivity: function () {
        $(".common_top img").click(function () {
            window.mobile.closeActivity()
        })
    },
    decodeSpeChar: function (a) {
        a = a.replaceAll("&lt;", "<").replaceAll("&gt;", ">");
        a = a.replaceAll("&#40;", "(").replaceAll("&#41;", ")");
        a = a.replaceAll("&#39;", "'");
        return a
    },
    textSerialize: function (c, a, b) {
        c += a + "=" + b + "&";
        return c
    },
    getQueryString: function (a) {
        var b = new RegExp("(^|&)" + a + "=([^&]*)(&|$)", "i");
        var c = window.location.search.substr(1).match(b);
        if (c != null) {
            return unescape(c[2])
        }
        return null
    },
    isEmpty: function (a) {
        if (a == null) {
            return true
        }
        if (a == "") {
            return true
        }
        if (a.length == 0) {
            return true
        }
        return false
    },
    getDay: function () {
        var b = new Date();
        var e = b.getFullYear();
        var a = b.getMonth() + 1;
        var c = b.getDate();
        return e + "-" + a + "-" + c
    },
    getWeekDay: function () {
        var a = "??" + "???????".charAt(new Date().getDay());
        return a
    },
    getWeekDay: function (a) {
        var b = "?" + "???????".charAt(new Date(a).getDay());
        return b
    },
    generatorMd5: function (c) {
        return $.md5(c);
    },
    hiddenPhoneNumber: function (phone) {
        return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
    }
};
var axios_instance = axios.create({
    transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
    }],
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
});

heqiao = {

    getRootURL: function () {
        return 'http://localhost:9000/Web/api/inlet';
    },
    /**
     * 后台请求数据公共方法
     * @param handler
     * @param method
     * @param param
     * @returns {*|AxiosPromise<any>|void}
     */
    getResponseData: function (handler, method, params) {
        let uuidKey = "HeQiaoWebSiteUUID";
        let tokenKey = "HeQiaoWebSiteToken";
        let uuid = localStorage.getItem(uuidKey);
        if (uuid == null || uuid.length == 0) {
            uuid = ttlj.generatorMd5('UUID' + new Date().getTime().toString() + Math.random()).toUpperCase();
            localStorage.setItem(uuidKey, uuid);
        }
        return axios_instance.post(this.getRootURL(), {
            apiversion: 'v.1.0',
            device: 'web',
            handler: handler,
            method: method,
            param: params,
            uuid: uuid,
            nonce: ttlj.generatorMd5(new Date().getTime().toString() + Math.random()).toUpperCase(),
            token: localStorage.getItem(tokenKey),
            sign: ttlj.generatorMd5(params + 'Finance_Direct').toUpperCase(),
            l: 'zh-cn',
        });
    },
    uploadFile: function (handler, method, params, files) {
        let uuidKey = "HeQiaoWebSiteUUID";
        let tokenKey = "HeQiaoWebSiteToken";
        let uuid = localStorage.getItem(uuidKey);
        if (uuid == null || uuid.length == 0) {
            uuid = ttlj.generatorMd5('UUID' + new Date().getTime().toString() + Math.random()).toUpperCase();
            localStorage.setItem(uuidKey, uuid);
        }
        console.log(files);
        return axios_instance.post(this.getRootURL(), {
            apiversion: 'v.1.0',
            device: 'web',
            handler: handler,
            method: method,
            param: params,
            uuid: uuid,
            nonce: ttlj.generatorMd5(new Date().getTime().toString() + Math.random()).toUpperCase(),
            token: localStorage.getItem(tokenKey),
            sign: ttlj.generatorMd5(params + 'Finance_Direct').toUpperCase(),
            l: 'zh-cn',
            file: files,
        });
    },
    getCommonParams: function () {
        let uuidKey = "HeQiaoWebSiteUUID";
        let tokenKey = "HeQiaoWebSiteToken";
        let uuid = localStorage.getItem(uuidKey);
        if (uuid == null || uuid.length == 0) {
            uuid = ttlj.generatorMd5('UUID' + new Date().getTime().toString() + Math.random()).toUpperCase();
            localStorage.setItem(uuidKey, uuid);
        }
        var params = '{"type": "1"}';
        return {
            apiversion: 'v.1.0',
            device: 'web',
            handler: 'api',
            method: 'ossUpload',
            param: params,
            uuid: uuid,
            nonce: ttlj.generatorMd5(new Date().getTime().toString() + Math.random()).toUpperCase(),
            token: localStorage.getItem(tokenKey),
            sign: ttlj.generatorMd5(params + 'Finance_Direct').toUpperCase(),
            l: 'zh-cn',
        };
    },
    saveUserInfo: function (userinfo) {
        let userInfoKey = 'HeQiaoWebSiteUserInfo';
        let tokenKey = "HeQiaoWebSiteToken";
        localStorage.setItem(tokenKey, userinfo.token);
        localStorage.setItem(userInfoKey, JSON.stringify(userinfo));
    },
    getLocalUserInfo: function () {
        let userInfoKey = 'HeQiaoWebSiteUserInfo';
        let value = localStorage.getItem(userInfoKey);
        if (value == null) {
            return null;
        } else {
            return JSON.parse(value);
        }
    }
}