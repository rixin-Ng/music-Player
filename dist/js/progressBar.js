(function ($, root) {
    var duration;
    var frameId;
    var lastPer = 0;
    var startTime;
    //渲染开始、结束时间
    function renderEndTime(time) {
        lastPer = 0;
        duration = time;
        var time = formatTime(time);
        $(document.body).find('.all-time').html(time);
    }
    function formatTime(duration) {
        //254 => 04:34
        duration = Math.round(duration);
        var m = Math.floor(duration / 60);
        var s = duration - m * 60;
        if (m < 10) {
            m = '0' + m;
        }
        if (s < 10) {
            s = '0' + s;
        }
        return m + ':' + s;

    }
    //播放进度条
    function start(per) {
        lastPer = per == undefined ? lastPer : per;
        cancelAnimationFrame(frameId);
        startTime = new Date().getTime();
        function frame() {
            var lastTime = new Date().getTime();
            var percent = lastPer + (lastTime - startTime) / (duration * 1000)
            if (percent < 1) {
                frameId = requestAnimationFrame(frame);
                updataTime(percent);
            }else{
                cancelAnimationFrame(frameId);
                $(document.body).find('.btn.next').trigger('click');
            }

        }
        frame();
    }
    //更新已播放时间、进度条
    function updataTime(per) {
        var curTime = per * duration;
        curTime = formatTime(curTime);
        $(document.body).find('.cur-time').html(curTime);
        var percent = (per - 1) * 100 + '%';
        $(document.body).find('.progress').css({ 'transform': 'translateX(' + percent + ')' });
    }
    //暂停进度条
    function stop() {
        var stopTime = new Date().getTime();
        lastPer = lastPer + (stopTime - startTime) / (duration * 1000)
        cancelAnimationFrame(frameId);
    }
    root.progressBar = {
        renderEndTime: renderEndTime,
        stop: stop,
        start: start,
        updataTime: updataTime
    }
}(window.Zepto, window.player || (window.player = {})))