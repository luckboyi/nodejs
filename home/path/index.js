const path = require("path")
const dirname = path.resolve(__dirname)
const filename = path.resolve(__filename)
const curDir = process.cwd()
console.log("__dirname======",dirname)
console.log("__filename=====",filename)
console.log("__donodeDir=====",curDir)
const fs = require("fs")

const name = path.basename(dirname)
const name2 = path.basename(filename)
const name3 = path.extname(filename)  //返回后缀名

console.log(name)
console.log(name2)
console.log(name3)
console.log(name3)
console.log(name3)
fs.readFile(filename,(err,data)=>{
    if(err) return console.log(err) ;
    //console.log(data.toString())
})