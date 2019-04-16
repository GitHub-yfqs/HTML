$(function () {
    //自定义滚动条
    $(".content_list").mCustomScrollbar();
    //1.监听歌曲的移入移出事件
    $(".list_music").hover(function () {
        //显示子菜单
        /*$(".list_menu").stop().fadeIn(100);*/
        $(this).find(".list_menu").stop().fadeIn(100);
        $(this).find(".list_time a").stop().fadeIn(100);
        //隐藏时长
        $(this).find(".list_time span").stop().fadeOut(100);
    },function () {
        //隐藏子菜单
        /*$(".list_menu").stop().fadeIn(100);*/
        $(this).find(".list_menu").stop().fadeOut(100);
        $(this).find(".list_time a").stop().fadeOut(100);
        //显示时长
        $(this).find(".list_time span").stop().fadeIn(100);
    });

    //2.监听复选框的点击事件
    $(".list_check").click(function () {
        $(this).toggleClass("list_checked");
    });
});