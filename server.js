var path=require('path');

var express=require('express');
var favicon = require('express-favicon');

//自定义模块
var web_api=require('./src/routes/web_api');

//功能执行
var app=express();
//设置静态文件
app.use(express.static(path.join(__dirname,'public')));
//注册html模版引擎
app.engine('html',require('ejs').__express);
//使用视图模版
app.set('view engine','html');
//设置视图
app.set('views',path.join(__dirname,'views'));
//设置网站图标
app.use(favicon(path.join(__dirname, 'public/images/favicon.ico')));
//注册路由web_api,logic_api并使用
app.use('/',web_api);
app.set('port', process.env.PORT || 8080);
//启动服务
var server=app.listen(app.get('port'),function(){
    console.log('server start and port is '+app.get('port'));
});