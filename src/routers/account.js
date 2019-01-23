//导入express模块
const express=require('express');
//导入path模块
const path=require('path');
//设置路由
const Rount=express.Router();

//获取控制层
let controller=require(path.join(__dirname,'../controller/accountControll')) ;

//获取注册页面
Rount.get('/register',controller.getRegisterPage);
//设置注册页面
Rount.post('/register',controller.setRegister);
//获取注册页面
Rount.get('/login',controller.getLoginPage);
//获取验证码
Rount.get('/vcode',controller.getvCode);
//设置登录信息
Rount.post('/login',controller.setLogin);
//导出路由
module.exports=Rount;

