// let mysql = require('mysql')
// //创建一个connection

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("runoob");
    var myobj = { name: "菜鸟教程", url: "www.runoob" };
    // dbo.collection("site").insertOne(myobj, function(err, res) {
    //     if (err) throw err;
    //     console.log("文档插入成功");
    //     db.close();
    // });
    // insetOneFn(sql,db,myobj)
    let sql = dbo.collection("site")
    var myobj2 =  [
        { name: '菜鸟工具', url: 'https://c.runoob.com', type: 'cn'},
        { name: 'Google', url: 'https://www.google.com', type: 'en'},
        { name: 'Facebook', url: 'https://www.google.com', type: 'en'}
       ];
    insetManyFn(sql,db,myobj2)
   

    //查询指定条件的数据
    let whereStr ={name:"test", url: "www.runoob" } ; //查询条件
    dbo.collection('site').find(whereStr).toArray( (err,result) => {
        if(err) throw err;
        console.log(result )
        if(result == ''){
            console.log('查询为空')
            //insetOneFn(sql,db,myobj)
        }
        db.close()
    })
    let up = {name:'菜鸟工具'}
    updateStr = {$set:{url:'https//baidu.com'}}
    updateFn(sql,db,up,updateStr)
    //查询数据
    dbo.collection('site').find({}).toArray( (err,result)=>{
        //返回集合中所有数据
        if(err) throw err;
        console.log(result)
        db.close()
    })
    
});

//查询数据
function insetOneFn(obj,db,data){
    obj.insertOne(data, function(err, res) {
        if (err) throw err;
        console.log("文档插入成功");
        db.close();
    });
}
function insetManyFn(obj,db,data){
    obj.insertMany(data, function(err, res) {
        if (err) throw err;
        console.log("插入的文档数量为: " + res.insertedCount);
        db.close();
    });
}
function updateFn(obj,db,oldData,data){
    obj.updateOne(oldData,data,(err,res) =>{
        if(err) throw err;
        console.log('文档更新成功！')
        db.close()
    })
}

