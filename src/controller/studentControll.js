//导入模板引擎
const template=require("art-template");
//导入path
const path=require('path');
//导入封装好的数据库
const db=require(path.join(__dirname,'../tools/db.js'));

//获取列表页面
exports.getListPage=(req,res)=>{
    //获取查询条件
    let keyword=req.query.keyword||'';
    db.findMore('studentInfo',{name:{$regex:keyword}},(err,docs)=>{
        let html=template(path.join(__dirname,'../public/view/list.html'),{
            student:docs,
            keyword,
            loginName:req.session.loginName
        })
        res.send(html);
    });
}

//获取学生信息
exports.getStudentPage=(req,res)=>{
    let html=template(path.join(__dirname,'../public/view/add.html'),{
        loginName:req.session.loginName
    })
    res.send(html);
}
//添加学生信息
exports.addStudent=(req,res)=>{
    console.log(req.body);
    db.insertYige('studentInfo',req.body,(err,doc)=>{
        if(!doc){
            //说明添加失败
            res.send(`<script>alert('添加数据失败');</script>`);
        }else {
            //跳转到列表页面
            res.send(`<script>location.href="/student/list";</script>`);
        }
    });
}
//添加学生信息
exports.editStudent=(req,res)=>{
    //根据id去数据库查询数据
    let _id=db.ObjectID(req.params.studentId);
    db.findMore('studentInfo',{_id},(err,doc)=>{
        //将数据渲染到模板引擎
        let html=template(path.join(__dirname,'../public/view/edit.html'),{
            student:doc[0],
            loginName:req.session.loginName
        })
        res.send(html);
    });

}
//更新添加学生信息
exports.toEditStudent=(req,res)=>{
    let _id=db.ObjectID(req.params.studentId);
    console.log(_id);
    console.log(req.body);

    db.updataYige('studentInfo',{_id},req.body,(err,doc)=>{
        if(!doc){
            //说明添加失败
            res.send(`<script>alert('修改数据失败');</script>`);
        }else {
            //跳转到列表页面
            res.send(`<script>location.href="/student/list";</script>`);
        }
    });
}
//删除学生信息
exports.deleteStudent=(req,res)=>{
    //根据id去数据库查询数据
    let _id=db.ObjectID(req.params.studentId);

    db.deleteYige('studentInfo',{_id},(err,doc)=>{
        //将数据渲染到模板引擎
        if(!doc){
            //说明添加失败
            res.send(`<script>alert('删除数据失败');</script>`);
        }else {
            //跳转到列表页面
            res.send(`<script>location.href="/student/list";</script>`);
        }
    });

}
//退出登录

exports.logoutStudent=(req,res)=>{
    //设置session为null
    req.session.loginName=null;
    //跳转到登录页
    res.send('<script>location="/acount/login";</script>');
}