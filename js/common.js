/**
 * Created by dale on 17/8/21.
 */


$(".discussBox .discussW span").click(function () {
    $(".discussBox .discussW span").removeClass('active');
    $(this).addClass('active');

    var type = $(this).attr('data-type');
    //数据处理
    $(".discussList").html('');
});

$(".minTable li").click(function () {
    $(this).parent().children().removeClass('on');
    $(this).addClass('on');
    var indx = $(this).index();
    var body = $(this).parent().parent().next();
    body.children().hide();
    body.children().eq(indx).show();
});