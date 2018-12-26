//切换歌曲index值
(function ($, root) {
    function ControlIndex(len) {
        this.index = 0;
        this.len = len;
    }
    ControlIndex.prototype = {
        prev: function () {
            return this.getIndex(-1);
        },
        next: function () {
            return this.getIndex(1);
        },
        getIndex: function (val) {
            var index = this.index;
            var len = this.len;
            var curIndex = (val + index + len) % len;
            this.index = curIndex;
            return curIndex;
        }
    }

    root.controlIndex = ControlIndex;

}(window.Zepto, window.player || (window.player = {})))