//导入express模块
const express=require('express');
//导入path模块
const path=require('path');
//设置路由
const Rount=express.Router();
//获取控制层
let controller=require(path.join(__dirname,'../controller/studentControll.js')) ;
//获取注册页面
Rount.get('/list',controller.getListPage);
//获取学生信息
Rount.get('/add',controller.getStudentPage);
//添加学生信息
Rount.post('/add',controller.addStudent);
//编辑学生信息
Rount.get('/edit/:studentId',controller.editStudent);
//编辑+修改学生信息
Rount.post('/edit/:studentId',controller.toEditStudent);
//删除学生信息
Rount.get('/delete/:studentId',controller.deleteStudent);
//退出
Rount.get('/logout',controller.logoutStudent);
//输出路由
module.exports=Rount;
