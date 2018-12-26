(function ($, root) {
    var index;
    var $playList = $('<div class="play-list">\
    <div class="play-header">播放列表</div>\
    <ul class = "list-wrapper"></ul>\
    <div class="close-btn">关闭</div>\
    </div>')

    //显示列表
    function show(changeIndex) {
        index = changeIndex.index;
        $playList.addClass('show');
        signSong(index);
    }
    //渲染列表
    function renderList(dataList) {
        var tag1 = '';
        for (var i = 0; i < dataList.length; i++) {
            tag1 += '<li><h3>' + dataList[i].song + ' - <span>' + dataList[i].singer + '</span></h3></li>'
        }
        $playList.find("ul").html(tag1);
        $(document.body).append($playList);
        bindEvent();
    }
    function bindEvent(){
        $playList.on('click','.close-btn',function(e){
             $playList.removeClass("show");
        })
        $playList.on('click','li',function(){
           var curIndex = $(this).index();
           signSong(curIndex);
           changeIndex.index = curIndex;
           $(document.body).trigger('play:change',[curIndex,true]);
           $(document.body).find('.btn.play').addClass('pause');
           setTimeout(function(){
             $playList.removeClass("show");
           },200)
        })
    }
    function signSong(index){
        $playList.find('.sign').removeClass('sign');
        $playList.find('ul li').eq(index).addClass('sign');
    }
    root.playList = {
        show: show,
        renderList: renderList
    }
}(window.Zepto, window.player || (window.player = {})))