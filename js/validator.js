define("utils/validator", [], function(require, exports, module) {
    $("body").on("focus", "input", function() {
        if ($(this).hasClass("warning")) {
            var lastVal = $(this).data("lastVal");
            lastVal = lastVal ? lastVal.val : "";
            $(this).removeClass("warning").val(lastVal);
        }
    });
    var _defaultJson = {
        email: {
            reg: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
            error: "邮箱格式不正确",
            empty: "请填写邮箱"
        },
        phone: {
            reg: /^1[3|4|5|7|8|9][0-9]{9}$/,
            error: "请填写正确的手机号码",
            empty: "手机号码不能为空"
        },
        whiteForm: {
            reg: /^((([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+)|(1[3|4|5|7|8][0-9]{9}))$/,
            error: "请填写正确的邮箱/手机号",
            empty: "邮箱/手机不能为空"
        },
        password: {
            reg: /^[A-Za-z0-9\!\@\#\$\%\^\&\*\(\)\.\-\_]{6,30}$/,
            error: "密码格式错误",
            empty: "密码不能为空"
        },
        code: {
            reg: /^[A-Za-z0-9]{4}$/,
            error: "验证码格式错误",
            empty: "验证码不能为空"
        },
        captcha: {
            reg: /^[A-Za-z0-9]{4}$/,
            error: "验证码格式错误",
            empty: "验证码不能为空"
        },
        "phone-code": {
            reg: /^[A-Za-z0-9]{6}$/,
            error: "手机验证码格式错误",
            empty: "手机验证码不能为空"
        },
        "fee-number": {
            reg: /^[1-9]\d{0,2}$|^[1-9]\d{0,2}\.\d{1,2}$|^0\.\d?[1-9]$|^1000$/,
            error: "金额格式错误",
            empty: "金额不能为空"
        },
        noNULL: {
            reg: /\S/,
            error: "",
            empty: "不能为空"
        }
    };
    var validator = {};
    validator._json = _defaultJson;
    validator._setEvent = function(ele) {
        var that = validator;
        ele.find("[event-blur].jsCheck").each(function() {
            $(this).blur(function() {
                that._validateDom($(this));
            }).focus(function() {
                if ($(this).hasClass("warning")) {
                    var lastVal = $(this).data("lastVal");
                    lastVal = lastVal ? lastVal.val : "";
                    $(this).removeClass("warning").val(lastVal);
                }
            });
        });
        ele.find("[event-click].jsCheck").each(function() {
            $(this).click(function() {
                that._validateDom($(this));
            });
        });
    };
    validator.validateAll = function(ele) {
        var that = validator;
        ele.find("[name].jsCheck").each(function() {
            that._validateDom($(this));
        });
        if (ele.find(".warning")[0]) {
            return false;
        }
        return true;
    };
    validator._validateDom = function(self, callback) {
        var that = validator;
        var _type = self.attr("type"), _name = self.attr("name"), _val = "";
        if (_type === "radio" || _type === "checkbox") {
            _val = $.trim(ele.find("[name='" + name + "']" + ":checked").val());
        } else {
            _val = $.trim(self.val());
        }
        var _rule = that._json[_name];
        var _validateVal = "";
        if (!self.hasClass("jsAjax")) {
            _rule.url = "";
            _validateVal = that._validateVal(_val, _rule);
        } else {
            var _data = {};
            _data[_name] = _val;
            _validateVal = that._validateVal(_val, _rule, _data);
        }
        if (_validateVal !== true) {
            if (!callback && !self.hasClass("warning")) self.addClass("warning").val(_validateVal).data("lastVal", {
                val: _val
            });
            if (Array.prototype.toString.call(callback) === "[object Function]") callback.call(self[0], _validateVal);
            return false;
        }
        return true;
    };
    validator._validateVal = function(val, rule, pars) {
        var _reg = rule.reg, _error = rule.error ? rule.error : "", _empty = rule.empty ? rule.empty : "", _url = rule.url ? rule.url : "", _used = rule.used ? rule.used : "", _errorMsg = "";
        if (!$.trim(val)) {
            return _empty;
        }
        if (!_reg.test(val)) {
            return _error;
        } else {
            if (_url) {
                $.ajax({
                    url: _url,
                    data: pars,
                    async: false,
                    type: "POST",
                    success: function(res) {
                        if (res.code != "200") {
                            _errorMsg = res.msg ? res.msg : "";
                        }
                    }
                });
                return _errorMsg;
            }
        }
        return true;
    };
    module.exports = validator;
});