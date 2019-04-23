(function( window, undefined) {
    var njQuery = function (selector) {
        return new njQuery.prototype.init(selector);
    }
    njQuery.prototype = {
        constructor: njQuery,
        init:function (selector) {
            /*
            * 1.传入'' null undefined NaN 0 false
            * 2.字符串
            *   代码片段：会将创建好的DOM元素存储到jQuery对象中返回
            *   选择器：会将找到的所有元素存储到jQuery对象中返回
            * 3.数组
            *   会将数组中存储的元素依次存储到jQuery对象中返回
            * 4.除上述类型以外的：
            *   会将传入的数据存储到jQuery对象中返回
            * */

            //0.去除字符串两端的空格
            selector = njQuery.trim(selector);

            //1.传入'' null undefined NaN 0 false,返回空的jQuery对象
            if(!selector){
                // return this;
            }
            // 2.方法处理
            else if(njQuery.isFunction(selector)){
                // console.log("是方法");
                njQuery.ready(selector);
            }
            //2.字符串
            else if(njQuery.isString(selector)){
                /*console.log("字符串");*/
                //2.1判断是否是代码片段 <a>
                if(njQuery.isHTML(selector)){
                    /*console.log("代码片段");*/
                    //1.根据代码片段创建所有的元素
                    var temp = document.createElement("div");
                    temp.innerHTML = selector;
                    /*console.log(temp);*/

                   /*
                    //2.将创建好的一级元素添加到jQuery当中
                    /!*console.log(temp.children);*!/
                    for(var i = 0; i<temp.children.length; i++){
                        this[i] = temp.children[i];
                    }
                    //3.给jQuery对象添加length属性
                    this.length = temp.children.length;*/
                    //此时此刻的this是njQuery对象
                   [].push.apply(this, temp.children);

                    //4.返回加工好的this(jQuery)
                    // return this;
                }
                //2.2判断是否是选择器
                else{
                    // 1.根据传入的选择器找到对应的元素
                    var res = document.querySelectorAll(selector);
                    //2.将找到的元素添加到njQuery上

                  /*  for(var i = 0; i<res.length; i++){
                        this[i] = res[i];
                    }
                    //3.给jQuery对象添加length属性
                    this.length = res.length;*/
                    [].push.apply(this, res);

                    // 3.返回加工好的this
                    // return this;
                }

            }
            //3.数组
            // else if(typeof selector === "object"&&
            //     "length" in selector &&
            //     selector !== window){
            else if(njQuery.isArray(selector)){
                //console.log("数组");
                // 3.1真数组
                if(({}).toString.apply(selector) === "[object Array]"){
                    // console.log("真数组");
                    [].push.apply(this, selector);
                    // return this;
                }
                // 3.2伪数组
                else{
                    // console.log("伪数组");
                    // [].push.apply(this, selector);
                    //将自定义伪数组转换为真数组
                    var arr = [].slice.call(selector);
                    //将真数组转换为伪数组
                    [].push.apply(this,arr);
                    // return this;
                }
            }
            //4.除上述类型以外的
            else{
                this[0] = selector;
                this.length = 1;
                // return this;
            }
            return this;
        },
        jquery: "1.1.0",
        selector: "",
        length: 0,
        // [].push 找到数组的push方法
        // 冒号前面的push将来有njQuery对象调用
        // 相当于 [].push.apply(this);
        push: [].push,
        sort: [].sort,
        splice: [].slice,
        toArray: function () {
            return [].slice.call(this);
        },
        get: function (num) {
            // 没有传递参数
            if (arguments.length === 0){
                return this.toArray();
            }
            //传递不是负数
            else if(num >= 0){
                return this[num];
            }
            //传递负数
            else{
                return this[this.length + num];
            }
        },
        eq: function (num) {
            // 没有传递参数
            if(arguments.length === 0){
                return new njQuery();
            }
            else{
                return njQuery((this.get(num)))
            }
           /*
            //传递非负数
            else if(num >= 0){
                return njQuery(this.get(num));
            }
            //传递负数
            else{
                return njQuery((this.get(num)))
            }
            */
        },
        first: function () {
            return this.eq(0);
        },
        last: function () {
            return this.eq(-1);
        },
        each: function (fn) {
            return njQuery.each(this, fn);
        }
    }
    njQuery.extend = njQuery.prototype.extend = function (obj) {
        // console.log(this);
        for(var key in obj){
            this[key] = obj[key];
        }
    }
    njQuery.extend({
        isString : function(str){
        return typeof str === "string"
    },
        isHTML : function(str){
            return str.charAt(0) == "<" &&
                str.charAt(str.length - 1) == ">" &&
                str.length >= 3
        },
        trim : function(str){
            if(!njQuery.isString(str)){
                return str;
            }
            //判断是否支持trim方法
            if(str.trim){
                return str.trim();
            }else{
                return str.replace(/^\s+|\s+$/g,"");
            }
        },
        isObject :  function(sele){
            return typeof sele === "object";
        },
        isWindow : function(sele){
            return sele === window;
        },
        isArray : function(sele){
            if(njQuery.isObject(sele) &&
                !njQuery.isWindow(sele) &&
                "length" in sele){
                return true;
            }
            return false;
        },
        isFunction : function(sele){
            return typeof sele ==="function";
        },
        ready: function (fn) {
            // 判断DOM是否加载完毕
            if (document.readyState == "complete"){
                fn();
            } else if(document.addEventListener){
                document.addEventListener("DOMContentLoaded",function () {
                    // console.log("DOMContentLoaded");
                    fn();
                })
            }else{
                document.attachEvent("onreadystatechange",function () {
                    // console.log("DOMContentLoaded");
                    if(document.readyState == "complete" ){
                        // console.log("DOMContentLoaded");
                        fn();
                    }

                });
            }

        },
        each: function (obj, fn) {
            // 1.判断是否是数组
            if(njQuery.isArray(obj)){
                for(var i = 0; i<obj.length; i++){
                    // var res = fn(i,obj[i]);
                    var res = fn.call(obj[i], i, obj[i]);
                    if(res === true){
                        continue;
                    }else if(res === false){
                        break;
                    }
                }
            }
            // 2.判断是否是对象
            else if(njQuery.isObject(obj)){
                for(var key in obj){
                    // var res = fn(key, obj[key]);
                    var res = fn.call(obj[key], key, obj[key]);
                    if(res === true){
                        continue;
                    }else if(res === false){
                        break;
                    }
                }
            }
            return obj;
        },
        map: function (obj,fn) {
            var res = [];
            // 1.判断是否是数组
            if(njQuery.isArray(obj)){
                for(var i = 0; i<obj.length; i++){
                    var temp = fn(obj[i], i);
                    if (temp){
                        res.push(temp);
                    }
                }
            }

            // 2.判断是否是对象
            else if(njQuery.isObject(obj)){
                for(var key in obj){
                    var temp = fn(obj[key], key);
                    if (temp){
                        res.push(temp);
                    }
                }
            }
            return res;
        },
        getStyle: function (dom, styleName) {
            if(window.getComputedStyle){
                return window.getComputedStyle(dom)[styleName];
            }else{
                return dom.currentStyle[styleName];
            }
        },
        addEvent: function addEvent(dom, name, callBack) {
            if(dom.addEventListener){
                dom.addEventListener(name, callBack);
            }else{
                dom.attachEvent("on"+ name, callBack);
            }
         }
    });
    //DOM操作相关方法
    njQuery.prototype.extend({
        empty: function () {
            //1.遍历所有找到的元素
            this.each(function (key, value) {
                value.innerHTML = "";
            });
            //2.方便链式编程
            return this;
        },
        remove: function (sele) {
            if(arguments.length === 0){
                //1.遍历指定的元素
                this.each(function (key, value) {
                    //根据遍历到的元素找到对应的父元素
                    var parent = value.parentNode;
                    //通过父元素删除指定的元素
                    parent.removeChild(value);
                });
            }else{
                var $this = this;
                // 1.根据传入的选择器找到对应的元素
                $(sele).each(function (key, value) {
                    // 2.遍历找到对应的元素，获取对应的类型
                    var type = value.tagName
                    // 3.遍历指定的元素
                    $this.each(function (k, v) {
                        // 4.获取指定元素的类型
                        var t = v.tagName;
                        // 5.判断找到元素的类型和指定元素的类型
                        if (t === type){
                            //根据遍历到的元素找到对应的父元素
                            var parent = value.parentNode;
                            //通过父元素删除指定的元素
                            parent.removeChild(value);
                        }
                    });
                })
            }
            return this;
        },
        html: function (content) {
            if(arguments.length === 0){
                return this[0].innerHTML;
            }else{
                this.each(function (key, value) {
                    value.innerHTML = content;
                })
            }
        },
        text: function (content) {
            if(arguments.length === 0){
                var res = "";
                this.each(function (key, value) {
                    res += value.innerText;
                });
                return res;
            }else{
                this.each(function (key, value) {
                    value.innerText = content;
                });
            }
        },
        appendTo: function (sele) {
            //1.统一的将传入的数据转换成jQuery对象
            var $target = $(sele);
            var $this = this;
            var res = [];
            // 1.遍历取出所有指定的元素
            $.each($target,function (key, value) {
                //2.遍历取出所有的元素
                $this.each(function (k, v) {
                    // 3.判断当前是不是第0个指定元素
                    if (key === 0) {
                        // 直接添加
                        value.appendChild(v);
                        res.push(v);
                    } else {
                        // 先拷贝再添加
                        var temp = v.cloneNode(true);
                        value.appendChild(temp);
                        res.push(temp);
                    }
                });
            });
            //返回所有添加的元素
            return $(res);
            /*
            // 1.遍历取出所有指定的元素
            for (var i = 0; i < $target.length; i++) {
                var targetEle = $target[i];
                var $this = this;
                // targetEle.appendChild(source);
                //2.遍历取出所有的元素
                for (var j = 0; j < $this.length; j++) {
                    var sourceEle = $this[j];
                    // 2.判断当前是不是第0个指定元素
                    if (i === 0) {
                        // 直接添加
                        targetEle.appendChild(sourceEle);
                    } else {
                        // 先拷贝再添加
                        var temp = sourceEle.cloneNode(true);
                        targetEle.appendChild(temp);
                    }
                }
            }*/
        },
        prependTo: function (sele) {

            //1.统一的将传入的数据转换成jQuery对象
            var $target = $(sele);
            var $this = this;
            var res = [];
            // 1.遍历取出所有指定的元素
            $.each($target,function (key, value) {
                //2.遍历取出所有的元素
                $this.each(function (k, v) {
                    // 3.判断当前是不是第0个指定元素
                    if (key === 0) {
                        // 直接添加
                        value.insertBefore(v, value.firstChild);
                        res.push(v);
                    } else {
                        // 先拷贝再添加
                        var temp = v.cloneNode(true);
                        value.insertBefore(temp, value.firstChild);
                        res.push(temp);
                    }
                });
            });
            //返回所有添加的元素
            return $(res);
        },
        append: function (sele) {
            // 判断传入的参数是不是字符串
            if(njQuery.isString(sele)){
                this[0].innerHTML += sele;
            }else{
                $(sele).appendTo(this);
            }
            return this;
        },
        prepend: function (sele) {
            // 判断传入的参数是不是字符串
            if(njQuery.isString(sele)){
                this[0].innerHTML = sele + this[0].innerHTML;
            }else{
                $(sele).prependTo(this);
            }
            return this;
        },
        insertBefore: function (sele) {
            //1.统一的将传入的数据转换成jQuery对象
            var $target = $(sele);
            var $this = this;
            var res = [];
            // 1.遍历取出所有指定的元素
            $.each($target,function (key, value) {
                var parent = value.parentNode;
                //2.遍历取出所有的元素
                $this.each(function (k, v) {
                    // 3.判断当前是不是第0个指定元素
                    if (key === 0) {
                        // 直接添加
                        parent.insertBefore(v,value);
                        res.push(v);
                    } else {
                        // 先拷贝再添加
                        var temp = v.cloneNode(true);
                        parent.insertBefore(temp, value);
                        res.push(temp);
                    }
                });
            });
            //返回所有添加的元素
            return $(res);
        },
        replaceAll: function (sele) {

            //1.统一的将传入的数据转换成jQuery对象
            var $target = $(sele);
            var $this = this;
            var res = [];
            // 1.遍历取出所有指定的元素
            $.each($target,function (key, value) {
                var parent = value.parentNode;
                //2.遍历取出所有的元素
                $this.each(function (k, v) {
                    // 3.判断当前是不是第0个指定元素
                    if (key === 0) {
                        //1.将元素插入到指定元素的前面
                        $(v).insertBefore(value);
                        // 2.将指定元素删除
                        $(value).remove();
                        res.push(v);
                    } else {
                        // 先拷贝再添加
                        var temp = v.cloneNode(true);//1.将元素插入到指定元素的前面
                        $(temp).insertBefore(value);
                        // 2.将指定元素删除
                        $(value).remove();
                        res.push(temp);
                    }
                });
            });
            //返回所有添加的元素
            return $(res);
        },
        clone: function (deep) {
            var res = [];
            //判断是否是深复制
            if(deep){
                //深复制
                this.each(function (key, ele) {
                    var temp = ele.cloneNode(true);
                    //遍历元素中的eventsCache对象
                    njQuery.each(ele.eventsCache, function (name, array) {
                        //遍历事件对应的数组
                        njQuery.each(array, function (index, method) {
                            //给复制的元素添加事件
                            $(temp).on(name, method);
                        });
                    });
                    res.push(temp);
                });
                return $(res);
            }else{
                //浅复制
                this.each(function (key, ele) {
                    var temp = ele.cloneNode(true);
                    res.push(temp);
                });
                return $(res);
            }
        }
    });
    //属性操作相关方法
    njQuery.prototype.extend({
        attr: function (attr, value) {
            //1.判断是否是字符串
            if(njQuery.isString(attr)){
                // 判断是一个字符串还是两个字符串
                if(arguments.length === 1){
                    return this[0].getAttribute(attr);
                }else{
                    this.each(function (key, ele) {
                        ele.setAttribute(attr, value);
                    })
                }
            }
            //2.判断是否是对象
            else if(njQuery.isObject(attr)){
                var $this = this;
                //遍历取出所有属性节点的名称和对应的值
                $.each(attr,function (key, value) {
                    //遍历取出所有的元素
                    $this.each(function (k, ele) {
                        ele.setAttribute(key, value);
                    });
                })
            }
            return this;
        },
        prop: function (attr, value) {
            //1.判断是否是字符串
            if(njQuery.isString(attr)){
                // 判断是一个字符串还是两个字符串
                if(arguments.length === 1){
                    return this[0][attr];
                }else{
                    this.each(function (key, ele) {
                        ele[attr] = value;
                    });
                }
            }
            //2.判断是否是对象
            else if(njQuery.isObject(attr)){
                var $this = this;
                //遍历取出所有属性节点的名称和对应的值
                $.each(attr,function (key, value) {
                    //遍历取出所有的元素
                    $this.each(function (k, ele) {
                        ele[key] = value;
                    });
                })
            }
            return this;
        },
        css: function (attr, value) {
            //1.判断是否是字符串
            if(njQuery.isString(attr)){
                // 判断是一个字符串还是两个字符串
                if(arguments.length === 1){
                    return njQuery.getStyle(this[0], attr);
                }else{
                    this.each(function (key, ele) {
                        ele.style[attr] = value;
                    });
                }
            }
            //2.判断是否是对象
            else if(njQuery.isObject(attr)){
                var $this = this;
                //遍历取出所有属性节点的名称和对应的值
                $.each(attr,function (key, value) {
                    //遍历取出所有的元素
                    $this.each(function (k, ele) {
                        ele.style[key] = value;
                    });
                })
            }
            return this;
        },
        val: function (content) {
            if(arguments.length === 0){
                return this[0].value;
            }else{
                this.each(function (key, ele) {
                    ele.value = content;
                });
                return this;
            }
        },
        hasClass: function (name) {
            var flag = false;
            if(arguments.length == 0){
                return false;
            }else{
                this.each(function (key, ele) {
                    //1.获取元素中class保存的值
                    var className = " " + ele.className + " ";
                    //2.给指定字符串的前后也加上空格
                    name = " " + name + " ";
                    //3.通过indexOf判断是否包含指定的字符串
                    if (className.indexOf(name) != -1){
                        flag = true;
                        return false;
                    }
                });
                return flag;
            }
        },
        addClass:function (name) {
            if(arguments.length === 0) return this;
            //1.对传入的类名进行切割
            var names = name.split(" ");
            //2.遍历取出所有的元素
            this.each(function (key, ele) {
                //3.遍历数组取出每个类名
                $.each(names,function (k, value) {
                    //4.判断指定元素中是否包含指定的类名
                    if(!$(ele).hasClass(value)){
                        ele.className = ele.className + " " + value;
                    }
                });
            });
            return this;
        },
        removeClass: function (name) {
            if(arguments.length === 0) {
                this.each(function (key, ele) {
                   ele.className = "";
                });
            }else{
                //1.对传入的类名进行切割
                var names = name.split(" ");
                //2.遍历取出所有的元素
                this.each(function (key, ele) {
                    //3.遍历数组取出每个类名
                    $.each(names,function (k, value) {
                        //4.判断指定元素中是否包含指定的类名
                        if($(ele).hasClass(value)){
                            ele.className = (" " + ele.className + " ").replace(" " + value + " ","");
                        }
                    });
                });
            }

            return this;
        },
        toggleClass: function (name) {
            //1.对传入的类名进行切割
            var names = name.split(" ");
            //2.遍历取出所有的元素
            this.each(function (key, ele) {
                //3.遍历数组取出每个类名
                $.each(names,function (k, value) {
                    //4.判断指定元素中是否包含指定的类名
                    if($(ele).hasClass(value)){
                        //删除
                        $(ele).removeClass(value);
                    }else{
                        //添加
                        $(ele).addClass(value);
                    }
                });
            });
            return this;
        }
    });
    //事件操作相关的方法
    njQuery.prototype.extend({
        on: function (name, callBack) {
           //1.遍历取出所有元素
           this.each(function (key, ele) {
               // 2.判断当前元素中是否有保存所有事件的对象
               if(!ele.eventsCache){
                   ele.eventsCache = {};
               }
               // 3.判断对象中有没有对应类型的数组
               if(!ele.eventsCache[name]){
                   ele.eventsCache[name] = [];
                   // 4.将回调函数添加到数据中
                   ele.eventsCache[name].push(callBack);
                   // 5.添加对应类型的事件
                   njQuery.addEvent(ele, name, function () {
                       njQuery.each(ele.eventsCache[name], function (k, method) {
                           method();
                       });
                   });
               }else{
                   // 4.奖回调函数添加到数据中
                   ele.eventsCache[name].push(callBack);
               }
           });
       },
        off: function (name, callBack) {
            //1.判断是否没有传入参数
            if(arguments.length === 0){
                this.each(function (key, ele) {
                    ele.eventsCache = {};
                });
            }
            // 2.判断是否传入一个参数
            else if(arguments.length === 1){
                this.each(function (key, ele) {
                    ele.eventsCache[name] = [];
                });
            }
            // 3.判断是否传入了两个参数
            else if(arguments.length === 2){
                this.each(function (key, ele) {
                    njQuery.each(ele.eventsCache[name], function (index, method) {
                        //判断当前遍历到的方法和传入的方法是否相同
                        if(method === callBack){
                            ele.eventsCache[name].splice(index, 1);
                        }
                    });
                });
            }
        }
    });
   /* njQuery.isString = function(str){
        return typeof str === "string"
    }
    njQuery.isHTML = function(str){
        return str.charAt(0) == "<" &&
            str.charAt(str.length - 1) == ">" &&
            str.length >= 3
    }
    njQuery.trim = function(str){
        if(!njQuery.isString(str)){
            return str;
        }
        //判断是否支持trim方法
        if(str.trim){
            return str.trim();
        }else{
            return str.replace(/^\s+|\s+$/g,"");
        }
    }
    njQuery.isObject =  function(sele){
        return typeof sele === "object";
    }
    njQuery.isWindow = function(sele){
        return sele === window;
    }
    njQuery.isArray = function(sele){
        if(njQuery.isObject(sele) &&
        !njQuery.isWindow(sele) &&
        "length" in sele){
            return true;
        }
        return false;
    }
    njQuery.isFunction = function(sele){
        return typeof sele ==="function";
    }*/
    njQuery.prototype.init.prototype = njQuery.prototype;
    window.njQuery = window.$ = njQuery;
})(window);