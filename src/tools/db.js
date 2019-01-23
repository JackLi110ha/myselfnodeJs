//导入mongodb
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'test';

//查询多条语句
const findMore=(collectionName,data,callback)=>{
    MongoClient.connect(url, useNewUrlParser=true, function(err, client) {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.find(data).toArray(function(err, docs) {
           callback(err,docs);
           //关闭数据库
           client.close();
        });
    });
}
//查询一条语句
const findYige=(collectionName,data,callback)=>{
    MongoClient.connect(url, useNewUrlParser=true, function(err, client) {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.findOne(data,(err,doc)=>{
            callback(err,doc);
            //关闭数据库
            client.close();
        });
       
    });
}

//插入一条数据
const insertYige=(collectionName,data,callback)=>{
    MongoClient.connect(url, useNewUrlParser=true, function(err, client) {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.insertOne(data,(err,doc)=>{
            callback(err,doc);
            //关闭数据库
            client.close();
        });
    });
}
//更改一条数据
const updataYige=(collectionName,condition,data,callback)=>{
    MongoClient.connect(url, useNewUrlParser=true, function(err, client) {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.updateOne(condition,{$set:data},(err,doc)=>{
            callback(err,doc);
            //关闭数据库
            client.close();
        });
    });
}
//删除一条数据
const deleteYige=(collectionName,data,callback)=>{
    MongoClient.connect(url, useNewUrlParser=true, function(err, client) {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.deleteOne(data,(err,doc)=>{
            callback(err,doc);
            //关闭数据库
            client.close();
        });
    });
}

module.exports={
    findMore,
    findYige,
    insertYige,
    updataYige,
    deleteYige,
    ObjectID
}