//readfile.js
//引入fs模块
const fs = require("fs")
//调用fs模块中读取文件的方法，该方法接收两个参数
//第一个参数是读取文件的地址，第二个参数为回调函数
//回调函数第一个参数为错误信息对象，如果读取错误，错误信息将包含在该文件中，第二个参数是读取成功返回的数据
//数据以二级制的方式返回，可以通过data.toString()转换为字符串

fs.readFile('./db.json',(err,data) => {
    if(err){
        return console.log("readFile failed,please check file address")
    }
    let list = JSON.parse(data).list
    console.log(list)
    fs.writeFile('./copy.json',list,(err) => {
        if(err) throw err;
        console.log("the file has been saved")
    })
})
