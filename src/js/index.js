var $ = window.Zepto;
var root = window.player;
var audio = root.audioControl;
var changeIndex;
// var nowIndex = 0;
var dataList;
var len = len;
var timer;
function bindClick() {
    $(document.body).on('play:change', function (e, index, flag) {
        root.progressBar.renderEndTime(dataList[index].duration);
        root.render(dataList[index]);
        audio.getAudio(dataList[index].audio);
        root.progressBar.updataTime(0);
        if (audio.status == 'play' || flag) {
            rotated(0);
            audio.play();
            root.progressBar.start();
        }
        $('.img-box').css({
            'transform': 'rotateZ(0deg)',
            'transition': 'none'
        })
    })
    $('.btn.prev').on('click', function () {
        var i = changeIndex.prev();
        $(document.body).trigger('play:change', i);

    })
    $('.btn.play').on('click', function () {
        if (audio.status == 'pause') {
            audio.play();
            root.progressBar.start();
            var deg = $('.img-box').attr('data-deg');
            rotated(deg);
        } else {
            audio.pause();
            clearInterval(timer);
            root.progressBar.stop();
        }
        $('.btn.play').toggleClass('pause');

    })
    $('.btn.next').on('click', function () {
        var i = changeIndex.next();
        $(document.body).trigger('play:change', i);
        // root.render(dataList[i]);
        // audio.getAudio(dataList[i].audio);
        // if (audio.status == 'play') {
        //     audio.play();
        // }
    })
    $('.btn.list').on('click', function () {
        root.playList.show(changeIndex);
    })
}
function bindTouch() {
    var $proBar = $(document.body).find('.progress-bar');
    var offsetL = $proBar.offset().left;
    var w = $proBar.width();
    $(document.body).find('.dot').on('touchstart', function (e) {
         root.progressBar.stop();
    }).on('touchmove', function (e) {
        var curX = e.changedTouches[0].clientX;
        var nowPer = (curX - offsetL) / w;
        if(nowPer > 1 || nowPer < 0){
            nowPer = 0;
        }
        root.progressBar.updataTime(nowPer);
    }).on('touchend', function (e) {
        var curX = e.changedTouches[0].clientX;
        var nowPer = (curX - offsetL) / w;
        if(nowPer > 1 || nowPer < 0){
            nowPer = 0;
        }
        var curduration = dataList[changeIndex.index].duration;
        var time = nowPer * curduration;
        audio.jumpTo(time);
        root.progressBar.start(nowPer);
        $('.btn.play').addClass('pause');
    })
}
function rotated(deg) {
    clearInterval(timer);
    deg = +deg;
    timer = setInterval(function () {
        deg += 2;
        $('.img-box').attr('data-deg', deg);
        $('.img-box').css({
            'transform': 'rotateZ(' + deg + 'deg)',
            'transition': 'all 1s ease-out'
        })
    }, 200)
}
function getData(url) {
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            console.log(data);
            bindClick();
            bindTouch();
            dataList = data;
            len = data.length;
            changeIndex = new root.controlIndex(len);
            root.playList.renderList(data);
            $(document.body).trigger("play:change", 0);
        },
        error: function () {
            console.log("error");
        }
    })
}
getData("../mock/data.json");


//实现页面渲染，包括img、info和btn   render
//点击按钮     bindClick
//控制音频播放和暂停、切歌     audioControl

//进度条运动和拖拽   progressBar

//图片旋转   rotate
//列表切歌   playList