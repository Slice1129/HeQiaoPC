window.onload = function () {
    $(".Audio").each(function (i, item) {
        var ssp;
        var _oldaudio = new Array();
        var _newaudio = new Array();
        _oldaudio[i] = $(this).find("audio")[0];
        _newaudio[i] = $(this).find(".NewAudio");
        var _TotalTime = '00:00';
        //console.log(_oldaudio[i].duration);
        if (!isNaN(_oldaudio[i].duration)) {
            var _TotalTime = gettime(Math.ceil(_oldaudio[i].duration));
        }
        _newaudio[i].find(".TotalTime").text(_TotalTime);
        _newaudio[i].find(".btn_Audio").click(function () {
            if ($(this).hasClass("btn_play")) {
                //播放
                $(this).attr("class", "btn_Audio btn_pause");
                _oldaudio[i].play();
                ssp = setInterval(function () {
                    startplay(_oldaudio[i], _newaudio[i]);
                }, 1000);
            } else {
                //暂停
                $(this).attr("class", "btn_Audio btn_play");
                _oldaudio[i].pause();
                clearInterval(ssp);
            }
            ;
        })

        //播放完成
        _oldaudio[i].onended = function () {
            _newaudio[i].find(".btn_Audio").attr("class", "btn_Audio btn_play");
            _oldaudio[i].pause();
            clearInterval(ssp);
        }

        //按钮拖动事件
        var $box = _newaudio[i].find('.TimeLine');
        var LineLength = $box.width();
        var $btn = _newaudio[i].find(".TimeLine .btn")
        var statu = false;
        var ox = 0;
        var left = 0;
        var bgleft = 0;
        $btn.mousedown(function (e) {
            ox = e.pageX - left;
            statu = true;
        });
        $(document).mouseup(function () {
            statu = false;
        });
        $box.mousemove(function (e) {
            if (statu) {
                left = e.pageX - ox;
                if (left < 0) {
                    left = 0;
                }
                if (left > LineLength) {
                    left = LineLength;
                }
                // console.log(left);
                // console.log(Math.ceil(_oldaudio[i].duration)*left/492);
                $btn.css('left', left);
                _oldaudio[i].currentTime = Math.ceil(_oldaudio[i].duration) * left / LineLength;//设置当前播放位置
            }
        });
        $box.click(function (e) {
            if (!statu) {
                bgleft = $box.offset().left;
                left = e.pageX - bgleft;
                if (left < 0) {
                    left = 0;
                }
                if (left > LineLength) {
                    left = LineLength;
                }
                // console.log(left);
                // console.log(Math.ceil(_oldaudio[i].duration)*left/492);
                $btn.css('left', left);
                _oldaudio[i].currentTime = Math.ceil(_oldaudio[i].duration) * left / LineLength;//设置当前播放位置
            }
        });
    })

    //播放事件
    function startplay(_oldaudio, _newaudio) {
        //console.log(gettime(Math.ceil(_oldaudio[i].currentTime)));
        var _CurrentTime = gettime(Math.ceil(_oldaudio.currentTime));
        _newaudio.find(".CurrentTime").text(_CurrentTime);//设置当前时间
        var btnleft = Math.ceil(_oldaudio.currentTime) / Math.ceil(_oldaudio.duration) * 100
        _newaudio.find(".TimeLine .btn").css("left", btnleft + "%");//设置按钮位置
    }

    //转换时间
    function gettime(longTime) {
        //转化为 00：00
        var time = parseInt(longTime);
        if (time != null && time != "") {
            var m = parseInt(time / 60).toString();
            var s = parseInt(time % 60).toString();
            if (m.length == 1) {
                m = "0" + m;
            }
            if (s.length == 1) {
                s = "0" + s;
            }
            time = m + ":" + s;
        }
        return time;
    }
}