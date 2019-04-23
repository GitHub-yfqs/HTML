function data2str(data) {
    /*
    * {
              "userName":"lnj",
             "userPwd":"123456"
      }
    *
    * */
    data.t = new Date().getTime();
    var res = [];
    for (var key in data) {
        /*
        * 在url中是不可以出现中文的，如果出现中文需要转码
        * 可以调用encodeURIComponent方法
        * URL终止可以出现字母、数字、下划线、ASCII码
        * */
        res.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));//[userName=lnj, userPwd=123456]
    }
    return res.join("&");//userName=lnj&userPwd=123456
}
function ajax(option) {
    // 0.将对象转换为字符串
    var str = data2str(option.data);//key=value&key=value

        //1.创建一个异步对象
        var xmlhttp;
    if (window.XMLHttpRequest)
    {
        //code for IE7+,Firefox,Chrome,Opera,Safari
        xmlhttp = new XMLHttpRequest();
    }else{
        //code for IE6,IE5
        xmlhttp = new ActiveXdataect("Microsoft.XMLHTTP");
    }
        //2.设置请求方式和请求地址
        /*
        * method: 请求的类型： get 或 post
        * url： 文件在服务器上的位置
        * async： true（异步） 或 false（同步）
        * */
        if(option.type.toLowerCase() === "get"){
            xmlhttp.open(option.type,option.url+"?"+str,true);
            // 3.发送请求
            xmlhttp.send();
        }else{
            xmlhttp.open(option.type,option.url,true);
            //注意点： 一下代码必须放在open和send中间
            xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xmlhttp.send(str);
        }

        // 4.监听状态的变化
        xmlhttp.onreadystatechange = function (ev2) {
            /*
            * 0: 请求未初始化
            * 1： 服务器连接已建立
            * 2： 请求已接收
            * 3： 请求处理中
            * 4： 请求已完成，且响应已就绪
            * */
            if (xmlhttp.readyState === 4){
                //判断是否请求成功
                if(xmlhttp.status >= 200 && xmlhttp.status <300 ||
                    xmlhttp.status === 304){
                    // 5.处理返回的结果
                    option.success(xmlhttp);
                }else{
                    // 5.处理返回的结果
                    option.error(xmlhttp);
                }

            }
        }
        //判断外界是否传入了超时时间
    if (option.timeout){
            timer = setInterval(function () {
                console.log("中断请求");
                xmlhttp.abort();
                clearInterval(timer);
            }, option.timeout)
    }
}