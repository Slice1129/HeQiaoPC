YUI.add('price-calendar', function(Y) {
var L      = Y.Lang,
    each   = Y.each,
    toHTML = L.sub,
    REG    = /-|\//g,
    RDATE  = /^((19|2[01])\d{2})-(0?[1-9]|1[012])-(0?[1-9]|[12]\d|3[01])$/;
function Calendar() {
    Calendar.superclass.constructor.apply(this, arguments);
}
Y.PriceCalendar = Y.extend(Calendar, Y.Base, {
     //日历id
    _calendarId:"calendarId",
    //日历外容器
    _boundingBox: null,
    // 内容容器
    _contentBox: null,
   // 日历日期容器
    _dateBox: null,
   //日历初始化
    initializer: function() {
        this.renderUI();
    },
    // 渲染日历结构
    renderUI: function() {
        Y.one(this.get('container') || 'body').append(this._initCalendarHTML(this.get('date')));
        this._boundingBox = Y.one('#' + this._calendarId);
        this._dateBox     = this._boundingBox.one('.date-box');
        this._contentBox  = this._boundingBox.one('.content-box');
        this.bindUI()._setWidth();
        return this;
    },
    // 事件绑定
    bindUI: function() {
        this.on('render', this._setWidth);
        this.after(['dateChange', 'dataChange'], this.render);
        this._boundingBox.delegate(['mouseenter', 'mouseleave'], this._mouseDelegate, 'td', this);
        this._boundingBox.delegate('click', this._clickDelegate, '.next-btn, .prev-btn, .in, .out, .confirm-btn, .cancel-btn', this);
        return this;
    },
     //渲染方法
    render: function() {
        this._dateBox.setContent(this._dateHTML());
        this.fire('render');
        return this;
    },
    //渲染下月日历
    nextMonth: function() {
        this.set('date', this._getSiblingMonth(this.get('date'), 1));
        this.fire('nextmonth');
        return this;
    },
    prevMonth: function() {
        this.set('date', this._getSiblingMonth(this.get('date'), -1));
        this.fire('prevmonth');
        return this;
    },
     // 鼠标移入事件
    _mouseenter: function(oTarget) {
        var curDate   = this._toNumber(oTarget.getAttribute('data-date')),
            depDate   = this.get('depDate'),
            endDate   = this.get('endDate'),
            minDate   = this.get('minDate'),
            maxDate   = this.get('maxDate'),
            oIn       = oTarget.one('.in'),
            oOut      = oTarget.one('.out'),
            sDate     = oTarget.getAttribute('data-date'),
            sNextDate = this._getSiblingDate(sDate, 1),
            sPrevDate = this._getSiblingDate(sDate, -1);
        oTarget.addClass('active');
        switch(true) {
            case maxDate && curDate >= this._toNumber(maxDate):
                oIn.addClass('disabled');
                break;
            case this.get('depDate') && curDate <= this._toNumber(depDate):
            case minDate && curDate <= this._toNumber(minDate):
                oOut.addClass('disabled');
                break;
        }
    },
   // 鼠标移出事件
    _mouseleave: function(oTarget) {
        oTarget.removeClass('active');
        this._boundingBox.all('.out').removeClass('disabled');
    },
     // 点击事件代理
    _clickDelegate: function(e) {
        var oTarget = e.currentTarget;
        switch(true) {
            case oTarget.hasClass('prev-btn'):
                this.prevMonth();
                break;
            case oTarget.hasClass('next-btn'):
                this.nextMonth();
                break;
        }
    },
    // 鼠标移入/移出事件代理
    _mouseDelegate: function(e) {
        var oTarget = e.currentTarget;
        if(oTarget.hasClass('disabled')) return;
        e.type == 'mouseenter' ? this._mouseenter(oTarget) : this._mouseleave(oTarget);
    },
    //获取指定日期的兄弟日期
    _getSiblingDate: function(v, n) {
        v = v.split(REG);
        return this._toStringDate(new Date(v[0], v[1] - 1, v[2] * 1 + n));
    },
    //获取指定月份的兄弟月份
    _getSiblingMonth: function(v, n) {
        return new Date(v.getFullYear(), v.getMonth() * 1 + n);
    },
    // 获取指定的日期状态
    _getDateStatus: function(v) {
        return (this.get('minDate') && this._toNumber(v) < this._toNumber(this.get('minDate'))) ||
               (this.get('maxDate') && this._toNumber(v) > this._toNumber(this.get('maxDate')));
    },
    //获取两个日期间隔天数
    _getDateDiff: function(sDate1, sDate2) {
        var oDate1 = +this._toDate(sDate1);
        var oDate2 = +this._toDate(sDate2);
        return parseInt(Math.abs(oDate1 - oDate2) / 24 / 60 / 60 / 1000);
    },
    // 设置价格日历容器宽度
    _setWidth: function() {
        (function(that, boundingBox, contentBox) {
            // boundingBox.setStyle('width',"600px");
            boundingBox.all('.inner').setStyle('width', boundingBox.one('table').get('offsetWidth'));
            boundingBox.setStyle('width',
                boundingBox.one('.inner').get('offsetWidth') * that.get('count') +
                parseInt(contentBox.getStyle('borderLeftWidth')) +
                parseInt(contentBox.getStyle('borderRightWidth')));
        })(this, this._boundingBox, this._contentBox);
        return this;
    },
    // 同排显示的日历中最大的单元格数
    _maxCell: function() {
        var oDate  = this.get('date'),
            iYear  = oDate.getFullYear(),
            iMonth = oDate.getMonth() + 1,
            aCell  = [];
        for(var i = 0; i < this.get('count'); i++) {
            aCell.push(new Date(iYear, iMonth - 1 + i, 1).getDay() + new Date(iYear, iMonth * 1 + i, 0).getDate());
        }
        return Math.max.apply(null, aCell);
    },

    // 不足两位数的数字补零
    _filled: function(v) {
        return v.toString().replace(/^(\d)$/, '0$1');
    },

    // 将日历字符串格式化为数字
    _toNumber: function(v) {
        return v.toString().replace(/-|\//g, '');
    },

    //将日期对象转为字符串格式
    _toStringDate: function(v) {
        return v.getFullYear() + '-' + this._filled(v.getMonth() * 1 + 1) + '-' + this._filled(v.getDate());
    },
    // 将日期字符串转为日期对象
    _toDate: function(v) {
        v = v.split(REG);
        return new Date(v[0], v[1] - 1, v[2]);
    },
    //生成日历模板
    _initCalendarHTML: function() {
        //calendar template object
        var calendar_template                    = {};
            calendar_template['bounding_box_id'] = this._calendarId;
            calendar_template['date_template']   = this._dateHTML();
            calendar_template['bottom_template'] = Calendar.BOTTOM_TEMPLATE;
        //return Y.Calendar template string
        return toHTML(Calendar.CALENDAR_TEMPLATE, calendar_template);
    },
    // 生成多日历模板
    _dateHTML: function(date) {
        var date   = this.get('date'),
            iYear  = date.getFullYear(),
            iMonth = date.getMonth();
        //calendar date template string
        var date_template = '';
        for(var i = 0; i < this.get('count'); i++) {
            date_template +=
                toHTML(Calendar.DATE_TEMPLATE, this._singleDateHTML(new Date(iYear, iMonth + i)));
        }
        return date_template;
    },
    // 生成单日历模板
    _singleDateHTML: function(date) {
        var iYear     = date.getFullYear(),
            iMonth    = date.getMonth() + 1,
            firstDays = new Date(iYear, iMonth - 1, 1).getDay(),
            monthDays = new Date(iYear, iMonth, 0).getDate(),
            weekdays  = [{wd: '\u65e5', weekend: 'weekend'},
                         {wd: '\u4e00'},
                         {wd: '\u4e8c'},
                         {wd: '\u4e09'},
                         {wd: '\u56db'},
                         {wd: '\u4e94'},
                         {wd: '\u516d', weekend: 'weekend'}];
        //week template string
        var weekday_template = '';
            each(weekdays, function(v) {
                weekday_template +=
                    toHTML(Calendar.HEAD_TEMPLATE, {weekday_name: v.wd, weekend: v.weekend || ''});
            });
        //tbody template string
        var body_template = '',
            days_array    = [];
            for(;firstDays--;) days_array.push(0);
            for(var i = 1; i <= monthDays; i++) days_array.push(i);
        days_array.length = this._maxCell();
        var rows  = Math.ceil(days_array.length / 7),
            oData = this.get('data');
        for(var i = 0; i < rows; i++) {
            var calday_row = '';
            for(var j = 0; j <= 6; j++) {
                var days = days_array[j + 7 * i] || '';
                var date = days ? iYear + '-' + this._filled(iMonth) + '-' + this._filled(days) : '';
                calday_row +=
                    toHTML(Calendar.DAY_TEMPLATE,
                        {
                            'day': days,
                            'date': date,
                            'disabled': this._getDateStatus(date) || !days ? 'disabled' : '',
                            'saturday': j == 6 ? ' bor-r-0' : '',
                            'dep_date': (date != '' && this.get('depDate') == date) ? ' dep-date' : '',
                            'end_date': (date != '' && this.get('endDate') == date) ? ' end-date' : '',
                            'pos': this.get('data') ? ' pos' : '',
                            'iYear':iYear,
                            'iMonth':iMonth
                        }
                    )
            }
            body_template +=
                toHTML(Calendar.BODY_TEMPLATE, {calday_row: calday_row})
        }
        //table template object
        var table_template = {};
            //thead string
            table_template['head_template'] = weekday_template;
            //tbody string
            table_template['body_template'] = body_template;
           var iMonth_big = '';
            switch (iMonth){
                case 1:
                    iMonth_big ="一"
                    break;
                case 2:
                    iMonth_big ="二"
                    break;
                case 3:
                    iMonth_big ="三"
                    break;
                case 4:
                    iMonth_big ="四"
                    break;
                case 5:
                    iMonth_big ="五"
                    break;
                case 6:
                    iMonth_big ="六"
                    break;
                case 7:
                    iMonth_big ="七"
                    break;
                case 8:
                    iMonth_big ="八"
                    break;
                case 9:
                    iMonth_big ="九"
                    break;
                case 10:
                    iMonth_big ="十"
                    break;
                case 11:
                    iMonth_big ="十一"
                    break;
                case 12:
                    iMonth_big ="十二"
                    break;
            }
        var single_calendar_template = {};
            single_calendar_template['date'] =iYear + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + iMonth_big + '\u6708';
            single_calendar_template['table_template'] = toHTML(Calendar.TABLE_TEMPLATE, table_template);
        //return single calendar template object
        return single_calendar_template;
    }
},
{
    // 日历模板
    CALENDAR_TEMPLATE: '<div id="{bounding_box_id}" class="price-calendar-bounding-box">' +
                            '<div class="container">' +
                                '<div class="content-box">' +
                                    '<div class="arrow">' +
                                        '<span class="prev-btn" title="\u4e0a\u6708">&lt;</span>' +
                                        '<span class="next-btn" title="\u4e0b\u6708">&gt;</span>' +
                                    '</div>' +
                                    '<div class="date-box">' +
                                        '{date_template}' +
                                    '</div>' +
                                '</div>' +
                                '<div class="bottom">' +
                                    '{bottom_template}' +
                                '</div>' +
                            '</div>' +
                        '</div>',

    DATE_TEMPLATE: '<div class="inner">' +
                        '<h4>' +
                            '{date}' +
                        '</h4>' +
                        '{table_template}' +
                    '</div>',

    TABLE_TEMPLATE: '<table>' +
                        '<thead>' +
                            '<tr>' +
                                '{head_template}' +
                            '</tr>' +
                        '</thead>' +
                        '<tbody>' +
                            '{body_template}' +
                        '</tbody>' +
                    '</table>',

    HEAD_TEMPLATE: '<th>{weekday_name}</th>',

    BODY_TEMPLATE: '<tr>' +
                        '{calday_row}' +
                    '</tr>',

    DAY_TEMPLATE: '<td data-date="{date}" class="{disabled}">' +
                        '<p>' +
                            '<b class="date">' +
                                '{day}' +
                            '</b>' +
                        '</p>' +
                    '</td>',
    BOTTOM_TEMPLATE:  "",
    // 日历组件标识
    NAME: 'PriceCalendar',
    // 默认属性配置
    ATTRS: {
        // 放置日历的容器
        container: {
            value: null,
            getter: function(v) {
                if(/\,/.test(v)) {
                    v = v.replace(/\s+/g, '');
                    v = v.split(new RegExp('\\s+' + v + '+\\s', 'g'));
                    v = v.join().replace(/^,+|,+$/g, '');
                }
                return v
            }
        },
        // 日历初始日期
        date: {
            value: new Date(),
            setter: function(v) {
                if(!L.isDate(v)) {
                    v = RDATE.test(v) ? v : new Date();
                }
                return v;
            },
            getter: function(v) {
                if(L.isDate(v)) {
                    return v;
                }
                else if(L.isString(v)) {
                    v = v.split(REG);
                    return new Date(v[0], v[1] - 1);
                }
            }
        },
        // 日历个数
        count: {
            value: 1
        },
        //容器
        calendarContainer:{
           value: "null"
        },
        //允许操作的最小日期
        minDate: {
            value: null,
            setter: function(v) {
                if(L.isDate(v)) {
                    v = this._toStringDate(v);
                }
                return RDATE.test(v) ? v : null;
            },
            getter: function(v) {
                if(L.isString(v)) {
                    v = v.split(REG);
                    v = v[0] + '-' + this._filled(v[1]) + '-' + this._filled(v[2]);
                }
                return v || '';
            }
        },
        // 允许操作的最大日期
        maxDate: {
            value: null,
            setter: function(v) {
                if(L.isDate(v)) {
                    v = this._toStringDate(v);
                }
                return RDATE.test(v) ? v : null;
            },
            getter: function(v) {
                if(L.isString(v)) {
                    v = v.split(REG);
                    v = v[0] + '-' + this._filled(v[1]) + '-' + this._filled(v[2]);
                }
                else if(this.get('afterDays')) {
                    var oDate = this.get('minDate').split(REG);
                    v = new Date(oDate[0], oDate[1] - 1, oDate[2] * 1 + this.get('afterDays') * 1 - 1);
                    v = this._toStringDate(v);
                }
                return v || '';
            }
        },
        // 等价于设置minDate和maxDate，minDate未设置时取当前日期
        afterDays: {
            value: 0,
            getter: function(v) {
                v && (this.get('minDate') || this.set('minDate', new Date()));
                return v;
            }
        }
    }
});

}, '1.0', {requires: ['node', 'base-base', 'event-mouseenter']});