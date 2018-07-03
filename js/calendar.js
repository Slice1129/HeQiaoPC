(function ($, window, undefined) {
    var defalut = {
        clickComplete :function () {},
        clickClassName : "tdActive",
    };
    $.fn.extend({
        currentMonth: (new Date()).getMonth() + 1,
        currentYear: (new Date()).getFullYear(),
        opts : '',
        CalendarInit: function (options) {
            this.opts= $.extend({}, defalut, options); //使用jQuery.extend 覆盖插件默认参数
            this.currentMonth = (new Date()).getMonth() + 1;
            this.currentYear = (new Date()).getFullYear();
            this.render();
        },
        //获取上个月的天数
        getPreMonthLength: function () {
            if (this.currentMonth - 1 < 0) {
                this.currentYear = this.currentYear - 1;
                return (new Date(this.currentYear, 12, 0)).getDate();
            } else {
                return (new Date(this.currentYear, this.currentMonth - 1, 0)).getDate();
            }
        },
        //获取当月的天数
        getCurrentLength: function () {
            return (new Date(this.currentYear, this.currentMonth, 0)).getDate();
        },
        //获取当月的第一天星期几
        getCurrentFirstDateWeek: function () {

            return (new Date(this.currentYear, this.currentMonth - 1, 1)).getDay();
        },
        //下个月点击
        nextMonthClick: function () {
            if (this.currentMonth + 1 > 12) {
                this.currentYear = this.currentYear + 1;
                this.currentMonth = 1;
            } else {
                this.currentMonth = this.currentMonth + 1;
            }
            this.render();
        },
        //获取当天的日期
        getCurrentDate:function () {
          return (new Date()).getDate()
        },
        //上个月点击
        preMonthClick: function () {
            if (this.currentMonth - 1 < 1) {
                this.currentYear = this.currentYear - 1;
                this.currentMonth = 12;
            } else {
                this.currentMonth = this.currentMonth - 1;
            }
            this.render();
        },
        //日期点击的处理
        cellClick: function (e, that) {
            var oTarget = e.currentTarget;
            switch (true) {
                case $(oTarget).hasClass('enable'):
                    break;
                case $(oTarget).hasClass('able'):
                    $(this).find("td.able").removeClass(that.opts.clickClassName);
                    $(oTarget).addClass(that.opts.clickClassName);
                    var day = $(oTarget).find("span").html()
                    var clickResult = [that.currentYear,that.currentMonth,day];
                    that.opts.clickComplete(clickResult);
                    break;
            }
        },
        //事件的代理
        clickDelegate: function (e, that) {
            var oTarget = e.currentTarget;
            switch (true) {
                case $(oTarget).hasClass('pre'):
                    that.preMonthClick();
                    break;
                case $(oTarget).hasClass('next'):
                    that.nextMonthClick();
                case $(oTarget).hasClass('cell'):
                    that.cellClick(e, that);
                    break;
            }
        },
        //获取下个月的月份
        getNextMonthNum:function () {
            if (this.currentMonth + 1 > 12){
                return 1;
            } else {
                return this.currentMonth;
            }
        },
        //获取下个年份
        getNextMonthYearNum:function () {
            if (this.currentMonth + 1 > 12){
                return this.currentYear + 1;
            } else {
                return this.currentYear;
            }
        },
        //获取上个月的月份
        getPreMonthNum:function () {
            if (this.currentMonth - 1 < 1){
                return 12;
            } else {
                return this.currentMonth - 1;
            }
        },
        //获取上个年份
        getPreMonthYearNum:function () {
            if (this.currentMonth - 1 < 1){
                return this.currentYear - 1;
            } else {
                return this.currentYear;
            }
        },
        //将小写的数字转大写
        smallNumberUpper: function () {
            switch (this.currentMonth) {
                case 1:
                    return "一";
                    break;
                case 2:
                    return "二";
                    break;
                case 3:
                    return "三";
                    break;
                case 4:
                    return "四";
                    break;
                case 5:
                    return "五";
                    break;
                case 6:
                    return "六";
                    break;
                case 7:
                    return "七";
                    break;
                case 8:
                    return "八";
                    break;
                case 9:
                    return "九";
                    break;
                case 10:
                    return "十";
                    break;
                case 11:
                    return "十一";
                    break;
                case 12:
                    return "十二";
                    break;
            }
        },
        render: function () {
            $(this).empty();
            var currentLength = this.getCurrentLength();
            var week = this.getCurrentFirstDateWeek();
            var preMonthLength = this.getPreMonthLength();
            var curentMonth = 1;
            var nextMonth = 1;
            var currentDate = this.getCurrentDate()
            var html = "<table>" +
                "<caption><button class='pre'>&lt;</button><h1>" + this.currentYear + "&nbsp;&nbsp;" + this.smallNumberUpper() + "月</h1><button class='next'>&gt;</button></caption>" +
                "<thead><tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr></thead>" +
                "<tbody>";
            for (var i = 0; i < 6; i++) {
                html = html + "<tr>"
                for (var j = 0; j < 7; j++) {
                    if (i === 0) {
                        if (j > week || j === week) {
                            if (curentMonth===currentDate){
                                html = html + "<td class='cell able  "+ this.opts.clickClassName+"'><span data-date='"+this.currentYear+"-"+ this.currentMonth + "-"+ curentMonth +"'>" + curentMonth + "</span></td>";
                            }else {
                                html = html + "<td class='cell  able'><span data-date='"+this.currentYear+"-"+ this.currentMonth + "-"+ curentMonth +"'>" + curentMonth + "</span></td>"
                            }
                            curentMonth++;
                        } else {
                            html = html + "<td class='cell enable'><span data-date='"+this.getPreMonthYearNum()+"-"+ this.getPreMonthNum() + "-"+ (preMonthLength - week + j) +"'>" + (preMonthLength - week + j) + "</span></td>"
                        }
                    } else {
                        if (curentMonth < currentLength + 1) {
                            if (curentMonth===currentDate){
                                html = html + "<td class='cell able  "+ this.opts.clickClassName+"'><span data-date='"+this.currentYear+"-"+ this.currentMonth + "-"+ curentMonth +"'>" + curentMonth + "</span></td>";
                            }else {
                                html = html + "<td class='cell  able'><span data-date='"+this.currentYear+"-"+ this.currentMonth + "-"+ curentMonth +"'>" + curentMonth + "</span></td>"
                            }
                            curentMonth++;
                        } else {
                            html = html + "<td class='cell enable'><span data-date='"+this.getNextMonthYearNum()+"-"+ this.getNextMonthNum() + "-"+ nextMonth +"'>" + nextMonth + "</span></td>"
                            nextMonth++;
                        }
                    }
                }
            }
            html = html + "</tbody>" + "</table>"
            $(this).append(html);
            var that = this;
            $(this).find("td").bind("click", function (e) {
                that.clickDelegate(e, that);
            });
            $(this).find("button").bind("click", function (e) {
                that.clickDelegate(e, that);
            });
        }
    });
})(jQuery, window, undefined)
