# musicPlayer-一个基于zepto的移动端html5音乐播放器
该项目利用gulp前端构建工具来进行代码的转换和压缩，监听文件变化，开启服务器，运用gulp的4个API:gulp.task(),gulp.src(),gulp.dest(),gulp.watch()，整个项目以一个个任务的方式运行，更流程化。
***
### 项目功能模块
每个模块均用立即执行函数封闭作用域，仅暴露需要的接口。
1. 主模块:主页面元素渲染、绑定点击和拖动进度条等事件、利用ajax动态获取歌曲数据、一些逻辑代码等。
2. 页面渲染模块：渲染歌曲信息，如封面图片、歌曲名称、歌手、专辑名称、是否喜欢等信息。
3. 音频控制模块：控制歌曲的播放，暂停，获取音频资源，跳转播放。
4. 控制歌曲索引模块:管理当前播放歌曲的索引，歌曲切换时需要获取歌曲索引，这个功能单独封装成模块能防止外部随意更改歌曲索引。
5. 播放列表模块：主页面上播放列表按钮对应的功能模块，改变播放列表模块的显示隐藏，渲染列表信息、绑定点击事件，标记当前播放歌曲。
6. 管理进度条模块：渲染歌曲总时长、管理进度条暂停运动、开始运动，动态更新已播放时长并根据已播放时长的百分比来渲染进度条位置。这里运用requestAnimationFrame方法对动画进行了优化。

![](https://github.com/rixin-Ng/music-Player/raw/master/show/1.png) 
![](https://github.com/rixin-Ng/music-Player/raw/master/show/2.png) 
![](https://github.com/rixin-Ng/music-Player/raw/master/show/3.png) 
***
### 项目运行 
1. $ git clone https://github.com/rixin-Ng/music-Player.git
2. $ npm install/cnpm install
3. $ gulp
4. 在本地 http://localhost:8888/dist/html/ 这个地址下可以看到项目效果
