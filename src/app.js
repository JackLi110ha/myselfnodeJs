//导入express模块
const express=require('express');
//导入path模块
const path=require('path');
//导入body-parser包
const bodyParser=require('body-parser');
//导入session包
const session=require('express-session');

const app=express();
//设置普通字符串
app.use(bodyParser.urlencoded({ extended: false }))
//设置json格式字符串
app.use(bodyParser.json())
//导入静态资源
app.use(express.static(path.join(__dirname,"public")));
//设置session时间
app.use(session({ secret: 'keyboard cat',resave:false,saveUninitialized:false, cookie: { maxAge: 60000 }}))

//权限版本控制
app.all('/*',(req,res,next)=>{
    console.log(req.url);
    if(req.url.includes('acount')){
        //如果包含账号信息
        next();
    }else {
        if(req.session.loginName){
            //如果用户名登录
            next();
        }else {
            res.send(`<script>location.href="/acount/login";</script>`);
        }
    }
});

//获取路由路径
let account=require(path.join(__dirname,'routers/account.js'));
//设置访问路径
app.use('/acount',account);
//获取路由路径
let student=require(path.join(__dirname,'routers/student.js'));
//设置访问路径
app.use('/student',student);

app.listen(8899);