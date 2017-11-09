# Project-Bootstrop-wjs
基于Bootstrop响应式开发的项目， 适配多种终端。
包含的Bootstrop相关内容：
响应式开发
栅格系统
javascript组件
固定浮动导航：Affix

@media screen and (max-width: 768px){
  .wjs_nav .navbar-collapse{
    position:absolute;  
    width:100%;
    background: #fff;
  }
}
轮播图
动态ajax异步请求后台轮播图数据。
function banner() {

//1，获取后台的轮播图  图片数据 （ajax）
    var getData=function(callback){
        $.ajax({
           url:'json/index.json',
           data:{},
           type:'get',
           dataType:'json',
           success:function(data){
                callback && callback(data);
                console.log(data);
            }
        });
    }

移动端手势滑动：

var startX=0；
var moveX=0；
var distanceX=0；
var isMove=false；
$(‘.wjs_banner’).on( ‘ touchstart’ ,  function (e) { //刚刚触摸到的触摸点

	startX = e.originalEvent.touches[0].clientX;
});
$(‘.wjs_banner’).on( ‘ touchmove’ ,  function (e) {

	moveX = e.originalEvent.touches[0].clientX;
        
	distanceX= moveX- startX;  
        
isMove=true;
});
$(‘.wjs_banner’).on( ‘ touchend’ ,  function (e) { 
	if（Math.abs( distancex) > 50 && isMove) {
	if ( distanceX  < 0）{
	//向左滑动  下一张
	$('.carousel').carousel(“next”);
}else{
        //向右滑动  上一张
	$('.carousel').carousel(“prev”)
}
}
//重置
startX=0；

moveX=0；

distanceX=0；

isMove=false；

});

页签移动端响应和滑动
产品盒子响应式
bootstrop定制
字体图标
等等。。

