//play pause getAudio
(function ($, root) {
    function AudioControl() {
        this.audio = new Audio();
        this.status = 'pause';
    }
    AudioControl.prototype = {
        play: function () {
            this.audio.play();
            this.status = 'play';
        },
        pause: function () {
            this.audio.pause();
            this.status = 'pause';
        },
        getAudio: function (src) {
            console.log(src);
            this.audio.src = src;
            this.audio.load();
        },
        jumpTo:function(time){
            this.audio.currentTime = time;
            this.play();
        }
    }
    root.audioControl = new AudioControl();

}(window.Zepto, window.player || (window.player = {})))