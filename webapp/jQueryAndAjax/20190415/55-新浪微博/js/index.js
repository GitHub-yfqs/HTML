$(function () {
    //0.监听内容发布按钮的点击
    $("body").delegate(".comment","propertychange input",function () {
        //判断是否输入了内容
        if($(this).val().length>0){
            //让按钮可用
            $(".send").prop("disabled",false);
        }else{
            //让按钮不可用
            $(".send").prop("disabled",true);
        }
    })


    //1.监听发布按钮的点击
    $(".send").click(function () {
        //拿到用户输入的内容
        var $text = $(".comment").val();
        //根据内容创建节点
        var $weibo = createEle($text);
        //插入微博
        $(".messageList").prepend($weibo);
    });

    //2.监听顶点击事件
    $("body").delegate(".infoTop","click",function () {
        /*alert("top");*/
        $(this).text(parseInt($(this).text()) + 1);
    })
    //3.监听踩点击事件
    $("body").delegate(".infoDown","click",function () {
        /*alert("down");*/
        $(this).text(parseInt($(this).text()) + 1);
    })
    //4.监听删除点击事件
    $("body").delegate(".infoDel","click",function () {
        /*alert("del");*/
        $(this).parents(".info").remove();
    })

    //创建节点方法
    function createEle(text) {
        var $weibo = $("<div class=\"info\">\n" +
            "            <p class=\"infoText\">" + text + "</p>\n" +
            "            <p class=\"infoOperation\">\n" +
            "                <span class=\"infoTime\">"+formartDate()+"</span>\n" +
            "                <span class=\"infoHandle\">\n" +
            "                    <a href=\"javascript:;\" class='infoTop'>0</a>\n" +
            "                    <a href=\"javascript:;\" class='infoDown'>0</a>\n" +
            "                    <a href=\"javascript:;\" class='infoDel'>删除</a>\n" +
            "                </span>\n" +
            "            </p>\n" +
            "        </div>");

        return $weibo;
    }

    //生成时间的方法
    function formartDate() {

        var date = new Date();
        var arr = [date.getFullYear() + "-",
            date.getMonth() + 1 + "-",
            date.getDate() + " ",
            date.getHours() + ":",
            date.getMinutes() + ":",
            date.getSeconds()];
        return arr.join("")
        /*console.log(date.getFullYear());
        console.log(date.getMonth()+1);
        console.log(date.getDate());
        console.log(date.getHours());
        console.log(date.getMinutes());
        console.log(date.getSeconds());*/
    }
})
