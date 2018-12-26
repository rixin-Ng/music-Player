//实现页面渲染，包括img、info和btn
(function ($, root) {
    var $body = $(document.body);
    function renderImg(src) {
        var img = new Image();
        img.onload = function () {
            root.blurImg(img, $body);
            $('.img-box img').attr("src", src);
        }
        img.src = src;
    }
    function renderInfo(info) {
        $('.song-info').html('<div class="song-name">' + info.song + '</div>\
            <div class="singer">'+ info.singer + '</div>\
            <div class="album">'+ info.album + '</div>')
    }
    function isLike(like) {
        if (like) {
            $('.btn.like').addClass('liking');
        } else {
            $('.btn.like').removeClass('liking');
        }
    }
    root.render = function (data) {
        renderImg(data.image);
        renderInfo(data);
        isLike(data.isLike);
    }
}(window.Zepto, window.player || (window.player = {})))
