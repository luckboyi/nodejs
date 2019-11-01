let child_process = require('child_process')
let util = require('util')
function copy(source,target,callback){
  child_process.exec(
    util.format('cp -r &s/* %s',source,target),callback)
}
copy('a','b',(err) => {
  console.log(err)
})