var path=require('path');

var express=require('express');
var favicon = require('serve-favicon');

var bodyParser = require('body-parser');

//功能执行
var app=express();
//设置静态文件
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname,'views')));
//注册html模版引擎
app.engine('html', require('ejs').__express);
//使用视图模版
app.set('view engine', 'html');
//设置视图
app.set('views',path.join(__dirname, 'views'));
//设置网站图标
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.set('port', process.env.PORT || 8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var logic_api = require('./logic_api');
app.use('/api', logic_api);
//启动服务
var server=app.listen(app.get('port'),function(){
    console.log('server start and port is '+app.get('port'));
});