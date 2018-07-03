$(function () {
    //----------------- 交易日历----------------------------------------
    $("#calendarContainer").CalendarInit({
        clickClassName : "tdActive",
        clickComplete: function (result) {
            console.log("年"+result[0])
            console.log("月"+result[1])
            console.log("日"+result[2])
        }
    });
    //-----------------  主题背景、主题议程、主题嘉宾、活动指南  的选择----------------------------------------
    $(".container  .container-main div.theme-celect>h1  span").click(function () {
        $(".container  .container-main div.theme-celect>h1  span").removeClass("theme-active")
        $(this).addClass("theme-active");
        var t = $(this).attr("data-content");
        $(".container  .container-main div.theme-celect .content").css("display", "none");
        $(".container  .container-main div.theme-celect #order_content_" + t).css("display", "block")
    });

    $(".container  .container-main .container-main-left>header ul li").click(function () {
        $(".container  .container-main .container-main-left>header ul li").removeClass("theme-active")
        $(this).addClass("theme-active")
    });
    //-----------------  弹出赞助框----------------------------------------
    $("#forPay").click(function () {
        $("#tip-zanzhu").css("display", "block").css("height", $("body").height()).css("width", $("body").width());
    });
    //-----------------  取消弹出框----------------------------------------
    $(".cover").click(function () {
        $("#tip-baoming").css("display", "none");
        $("#tip-zanzhu").css("display", "none");
    });
    //-----------------  弹出报名框----------------------------------------
    $("#forName").click(function () {
        $("#tip-baoming").css("display", "block").css("height", $("body").height()).css("width", $("body").width());
    });
    //----------------- 期货工具   树状图的点击显示----------------------------------------
    $(" .container .container-main  #tree main  .left ul li.title").click(function () {
        if ($(this).next().hasClass("hide")) {
            $(".container .container-main  #tree main  .left ul li.content").addClass("hide").removeClass("show");
            $(this).next().addClass("show").removeClass("hide");
        } else {
            $(".container .container-main  #tree main  .left ul li.content").addClass("hide").removeClass("show");
        }
    });

    //-----------------  分页函数----------------------------------------
    function pageFunction(pageContnt, pageCode, space) {
        var current = 1;
        var count = 1;
        var arr = $(pageContnt);
        space = Number(space);
        count = arr.length % space == 0 ? arr.length / space : parseInt(arr.length / space) + 1;
        $(pageCode).empty();
        $(pageCode).append("<li class='prev'><a href='javascript:void(0);'>上一页</a></li>")
        $(pageCode).append("<li class='next'><a href='javascript:void(0);'>下一页</a></li>")
        for (var i = 1; i < count + 1; i++) {
            if (i == 1) {
                var html = "<li class='active'><a href='javascript:void(0);'>" + i + "</a></li>"
            } else {
                var html = "<li><a href='javascript:void(0);'>" + i + "</a></li>"
            }
            $(pageCode + " li.next").before(html)
        }
        $(arr).css("display", "none");
        for (var i = 0; i < space; i++) {
            $(arr[current * space - 1 - i]).css("display", "block");
        }
        //事件监听
        $(pageCode + "  li").click(function () {
            arr = $(pageContnt);
            space = Number(space);
            count = arr.length % space == 0 ? arr.length / space : parseInt(arr.length / space) + 1;
            if ($(this).hasClass("prev")) {
                if (Number(current) === 1) {
                    current = 1;
                } else {
                    current = current - 1;
                }
            } else if ($(this).hasClass("next")) {
                if (Number(current) === (count)) {
                    current = count;
                } else {
                    current = current + 1;
                }
            } else {
                current = $(this).find("a").html();
                current = Number(current)
            }
            $(arr).css("display", "none");
            for (var i = 0; i < space; i++) {
                $(arr[current * space - 1 - i]).css("display", "block");
            }
            $(pageCode + " li").removeClass("active");
            var style_index = $(pageCode + " li")[current];
            $(style_index).addClass("active");
        })
    }

    //-----------------  ask-question  热门，时间切换 ----------------------------------------
    $("#ask-question> h2 > span").click(function () {
        if (!$(this).hasClass("active")) {
            $("#ask-question> h2 > span").removeClass("active");
            $(this).addClass("active");
            var index = $(this).attr("data-index");
            $("#ask-question .order").css("display", "none").removeClass("order")
            $("#ask-question  #order_" + index).css("display", "block").addClass("order");
            var space = $("#ask-question").attr("data-space");
            pageFunction("#ask-question .order  .send-back", "#ask-question .order .pagebox .page ul", space)
        }
    });
    /*-----------------ask-question 分页----------------------------------------
       pageContnt->#ask-question .order    .send-back
       pageCode->  #ask-question  .order    .pagebox   .page  ul
     */
    var space = $("#ask-question").attr("data-space");
    pageFunction("#ask-question .order  .send-back", "#ask-question .order .pagebox .page ul", space)

    /*-----------------photo.html 页面的分页效果 ----------------------------------------
      pageContnt   #photo .hQContent .hQleftLayout .blogger_article .bd .hq-pack
      pageCode     #photo .pagebox  .page ul
      space        8
    */
    pageFunction("#photo .hQContent .hQleftLayout .blogger_article .bd .hq-pack", "#photo .pagebox  .page ul", 8)
    //-----------------44_bloggerDetail_index.html 专栏的分页效果 ----------------------------------------
    //专栏页面-图片上文字的显示
    $(".container .people-list li").mouseover(function () {
        $(this).find(".about").css("display", "block")
    });

    $(".container .people-list li").mouseout(function () {
        $(this).find(".about").css("display", "none")
    });

    /*
     pageContnt   #zhuanlan .container-main .container-main-left .people-list
     pageCode     #zhuanlan .container-main .container-main-left .pagebox  .page ul
     space        1
    */
    pageFunction("#zhuanlan .container-main .container-main-left section.show .people-list", "#zhuanlan .container-main .container-main-left section.show .pagebox  .page ul", 1)
    //专栏面板切换
    $("#zhuanlan  .container-main .container-main-left>h1  span").click(function () {
        $(".container  .container-main .container-main-left>h1  span").removeClass("theme-active")
        $(this).addClass("theme-active")
        var index = $(this).attr("data-index");
        index = Number(index)
        var section = $("#zhuanlan  .container-main .container-main-left section")[index - 1];
        $("#zhuanlan  .container-main .container-main-left section").removeClass("show").addClass("hide");
        $(section).removeClass("hide").addClass("show");
        pageFunction("#zhuanlan .container-main .container-main-left section.show .people-list", "#zhuanlan .container-main .container-main-left section.show .pagebox  .page ul", 1)
    });




    //------------------------------bloggerQuestion 加载更多--------------------------------
    $("#bloggerQuestion .loadingMore").click(function () {
        var html = "<li>" +
                       "<div class='timmer fl'>12:28</div>" +
                       "<div class='ntxt'>" +
                           "<a>本周40起普洛斯私有化约168亿】财联社23日讯涉及35家A股上市公司。根据已披露数据显示，发生的并购交</a>" +
                            "<div class='opera'>" +
                                "<em class='what fr'></em>" +
                                "<em class='share fr'></em>" +
                            "</div>" +
                       "</div>" +
                     "</li>";
        $("#bloggerQuestion .hQContent .hQleftLayout .newslist").append(html)
    });


    //-------------------------------finance_meeting --------------------------------------
    // 面板的切换
    $(".container  .container-main div.left>h1  span").click(function () {
        $(".container  .container-main div.left>h1  span").removeClass("theme-active")
        $(this).addClass("theme-active");
        var index = $(this).attr("data-index");
        index = Number(index)
        var section = $("#finance_meeting .container-main section")[index - 1];
        $("#finance_meeting .container-main section").removeClass("show").addClass("hide");
        $(section).removeClass("hide").addClass("show");
    });

    // 面板的选择
    function choose() {
        $("#finance_meeting .container-main section div p").click(function () {
            $(this).siblings("p").removeClass("active-border");
            $(this).addClass("active-border");
            $(this).siblings("b").removeClass("default-border");
            var arr = $("#finance_meeting .container-main section.show div p.active-border");
            $("#finance_meeting .container-main section.show    div.result  p span:first-child").text(arr.text());
        })

        $("#finance_meeting .container-main section div b").click(function () {
            $(this).addClass("default-border");
            $(this).siblings("p").removeClass("active-border");
            var arr = $("#finance_meeting .container-main section div p.active-border");
            $("#finance_meeting .container-main section div.result  p span:first-child").text(arr.text());
        })
    }
    choose();

    // 显示更多
    function showMore() {
        $("#finance_meeting .loadingMore").click(function () {
            var html ="<li>" +
                "<div class='top-img'>" +
                "<img src='./../images/upload/finance_meeting_02.jpg'>" +
                "<p class='state'><span>正在播出</span></p>" +
                "<p class='address'><span>上海</span></p>" +
                "</div>" +
                "<div class='content'>" +
                "<h3>2017年金融艳萍高峰论坛创新驱动发展研讨会</h3>" +
                "<p class='time'>&nbsp;&nbsp;<span>2017-08  AM 09:15</span></p>" +
                "<p class='user'>&nbsp;&nbsp;<span>深圳市人民政府</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;报名&nbsp;&nbsp;<span>1254</span></p>" +
                "</div>" +
                "</li>"
            $("#finance_meeting .container-footer.show  ul").append(html)
        });
    }
    showMore();

});


