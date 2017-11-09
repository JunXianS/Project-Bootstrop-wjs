$(function() {
        /* 动态响应式轮播图*/
        banner();
        /*初始化页签页*/
        initTabs();
        /* 初始化工具提示*/
        $('[data-toggle="tooltip"]').tooltip();
    })
    /* 动态响应式轮播图*/
function banner() {
    /*
     *1，获取后台的轮播图  图片数据     （ajax）
     *2，需要判断当前的屏幕是移动端还是非移动端    （屏幕宽度 768px以下都是移动端）
     *3，把后台数据渲染成对应的html字符串		（字符串拼接）或者用（模板引擎）
     *4，把渲染完成的html填充在对应的盒子里面  也就是完成了页面渲染		（渲染到页面中 .html）
     *5，在屏幕尺寸改变的时候需要重新渲染页面	(监听页面尺寸的改变   resize监听事件)
     *
     */
    var myData;
    var getData = function(callback) {
            if (myData) { //5-3
                callback && callback(myData);
                return false;
            }
            $.ajax({
                url: 'json/index.json',
                data: {},
                type: 'get',
                dataType: 'json',
                success: function(data) {
                    myData = data;
                    callback && callback(myData);
                }
            });
        }
        //定义渲染的方法，
    var renderHtml = function() {
            getData(function(data) {
                var width = $(window).width();
                var isMobile = false;
                if (width < 768) {
                    isMobile = true;
                }
                var templatePoint = _.template($('#template_point').html());
                var templateItem = _.template($('#template_item').html());
                var pointHtml = templatePoint({
                    model: data
                });
                var imageData = {
                    list: data,
                    isMobile: isMobile
                };
                var imageHtml = templateItem({
                    model: imageData
                });
                $('.carousel-indicators').html(pointHtml);
                $('.carousel-inner').html(imageHtml);
            });
        }
        // 第五点需求：页面尺寸改变时重新渲染
    $(window).on('resize', function() {
        renderHtml();
    }).trigger('resize');
    // 第6点需求：在移动端需要通过手势来控制图片的轮播，左右滑动。
    var startX = 0;
    var moveX = 0;
    var distanceX = 0;
    var isMove = false;
    //绑定事件：
    $('.wjs_banner').on('touchstart', function(e) {
        startX = e.originalEvent.touches[0].clientX; //第一个触摸点
    });
    $('.wjs_banner').on('touchmove', function(e) {
        moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX - startX;
        isMove = true;
    });
    $('.wjs_banner').on('touchend', function(e) {
        if (Math.abs(distanceX) > 50 && isMove) {
            if (distanceX < 0) {
                $('.carousel').carousel('next');
            } else {
                $('.carousel').carousel('prev');
            }
        }
        startX = 0;
        moveX = 0;
        distanceX = 0;
        isMove = false;
    });
}
/*初始化页签页*/
function initTabs() {
    var ul = $(".wjs_product .nav-tabs");
    var lis = ul.find("li");
    var width = 0;
    $.each(lis, function(i, o) {
        width += $(o).innerWidth(); //自加求和
    })
    ul.width(width);
    //实现在移动端的滑动
    itcast.iScroll({
        swipeDom: $('.wjs_product_tabsParent').get(0), //滑动的元素
        swipeType: 'x', //滑动的方向
        swipeDistance: '50' //缓动的距离
    })
}