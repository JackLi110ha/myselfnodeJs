const path = require('path');
//导入验证码模块
var captchapng = require('captchapng');
//导入封装好的数据库
const db=require(path.join(__dirname,'../tools/db.js'));


//获取注册页面
exports.getRegisterPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/view/register.html'));
}
//设置注册信息
exports.setRegister = (req, res) => {
    console.log(req.body);
    const {
        username,
        password
    } = req.body;
    let result = {
        status: 0,
        message: '成功'
    }

    db.findYige('user',{username},(err,doc)=>{
        if (doc) {
            result.status = 1,
                result.message = '用户名存在';
            res.json(result);
        } else {
            //用户名不存在 插入到数据库中
            db.insertYige('user',{username,password},(err,doc)=>{
                if (!doc) {
                    result.status = 2,
                        result.message = '注册失败';
                    res.json(result);
                } else {
                    res.json(result);
                }
            });
            // collection.insertOne({
            //     username,
            //     password
            // }, (err, doc) => {
            //     if (!doc) {
            //         result.status = 2,
            //             result.message = '注册失败';
            //         res.json(result);
            //     } else {
            //         res.json(result);
            //     }
            // });
        }
    });
    //将数据存入到数据库中
    // MongoClient.connect(url, function (err, client) {
    //     const db = client.db(dbName);
    //     const collection = db.collection('user');
    //     //到数据库查询
    //     collection.findOne({
    //         username
    //     }, (req, doc) => {
    //         if (doc) {
    //             result.status = 1,
    //                 result.message = '用户名存在';
    //             res.json(result);
    //         } else {
    //             //用户名不存在 插入到数据库中
    //             collection.insertOne({
    //                 username,
    //                 password
    //             }, (err, doc) => {
    //                 if (!doc) {
    //                     result.status = 2,
    //                         result.message = '注册失败';
    //                     res.json(result);
    //                 } else {
    //                     res.json(result);
    //                 }
    //             });
    //         }
    //     });
    // });
}
//获取登录页面
exports.getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/view/login.html'));
}
//获取验证码
exports.getvCode = (req, res) => {
    const vCode = parseInt(Math.random() * 9000 + 1000);
    var p = new captchapng(80, 30, vCode);
    //将数据存入到session中
    req.session.vCode = vCode;

    p.color(0, 0, 0, 0);
    p.color(80, 80, 80, 255);

    var img = p.getBase64();
    var imgbase64 =Buffer.from(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}
//设置登录信息
exports.setLogin = (req, res) => {
    //校验验证码
    let result = {
        status: 0,
        message: '成功'
    }
    if (req.body.vcode != req.session.vCode) {
        result.status = 1;
        result.message = '验证码错误';
        res.json(result);
        return false;
    } else {
        //拿到数据后到服务器比对是否存在用户名和密码
        const {
            username,
            password
        } = req.body;
        console.log(username,password);
        
        db.findYige('user',{username,password},(err,doc)=>{
            console.log(doc);
            if (!doc) {
                result.status = 1,
                result.message = '登录失败';
                res.json(result);
            } else {
                req.session.loginName=username;
                //登录成功
                res.json(result);
            }
        });
        
    }

}