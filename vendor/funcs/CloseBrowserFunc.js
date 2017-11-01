/**
 * 关闭浏览器时的处理方法
 * Created by TY on 16/11/15.
 */
;(function () {
    //    window.onbeforeunload = onbeforeunload_handler;
    window.onunload = onunload_handler;
//    function onbeforeunload_handler(){
//        var warning="确认退出?";
//        console.log("1111111111111");
//        return warning;
//    }

    //关闭或刷新浏览器时监听登录信息是否超时
    function onunload_handler(){
        const time = localStorage.TIME_TIMING;
        const currTime = new Date().getTime();
        const abledTime = currTime - (1000*60*60*24*1 + Number.parseInt(time));
        // const abledTime = currTime - (1000*10 + Number.parseInt(time));
//        debugger;
        if(abledTime > 0){
            delete localStorage.CONF_ACCESS_TOKEN;
            delete localStorage.CONF_ACCOUT;
            delete localStorage.CONT_NAME;
            delete localStorage.TIME_TIMING;
//            delete localStorage.CONF_REMEMBER;
//            delete localStorage.CONF_REMEMBER_SALT;
        }

    }
})();
