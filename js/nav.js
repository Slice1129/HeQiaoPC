/**
 * Created by dale on 17/9/2.
 */
//导航状态
$(function () {
    var path = window.location.pathname;

 /*   if (new RegExp("^/$").test(path)) {
        $(".actNav li a#index").addClass("active");
    } else if (path.match(new RegExp("user_center"))) {
        $(".actNav li a#user").addClass("active");
    }else if (path.match(new RegExp("message"))) {
        $(".actNav li a#message").addClass("active");
    } else if (path.match(new RegExp("setting"))) {
        $(".actNav li a#setting").addClass("active");
    } else if (path.match(new RegExp("wealth"))) {
        $(".actNav li a#wealth").addClass("active");
    } else if (path.match(new RegExp("video"))) {
        $(".actNav li a#video").addClass("active");
    } else if (path.match(new RegExp("audio"))) {
        $(".actNav li a#audio").addClass("active");
    } else if (path.match(new RegExp("report"))) {
        $(".actNav li a#report").addClass("active");
    } else if (path.match(new RegExp("photo"))) {
        $(".actNav li a#photo").addClass("active");
    } else if (path.match(new RegExp("data"))) {
        $(".actNav li a#data").addClass("active");
    } else if (path.match(new RegExp("metting"))) {
        $(".actNav li a#metting").addClass("active");
    } else if (path.match(new RegExp("interlocution"))) {
        $(".actNav li a#interlocution").addClass("active");
    } else if (path.match(new RegExp("questionnaire"))) {
        $(".actNav li a#questionnaire").addClass("active");
    } else if (path.match(new RegExp("follow"))) {
        $(".actNav li a#follow").addClass("active");
    } else if (path.match(new RegExp("collect"))) {
        $(".actNav li a#collect").addClass("active");
    }*/


    $(".actTab").slide({trigger: "click"});

/*    $(".actTab li").click(function () {
        $(".actNav").height($(".actContent").height());
    });*/
})