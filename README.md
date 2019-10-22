<!--
 * @Author: your name
 * @Date: 2019-10-07 13:45:48
 * @LastEditTime: 2019-10-22 14:47:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /f:\project\node\README.md
 -->
# NodeJS基础

## 什么是Nodejs基础

Js是脚本语言，脚本语言都需要一个解析器才能运行。对于卸载html页面里的js，浏览器充当了解析器的角色。而对于需要独立运行的JS，nodejs就是一个解析器

每一种解析器都需要一个运行环境，不但允许js定义各种数据结构，进行各种计算，还允许JS使用运行环境提供的内置对象和方法做一些事情。例如运行在浏览器中的js的用途是操作Dom,浏览器就提供了`document`之类的内置对象。而运行在Nodejs中的JS的用途是操作磁盘文件或者搭建HTTP服务器，NodeJs就相应提供了`fs、http`等内置对象

### 有什么作用

尽管存在一听说可以直接允许JS文件就觉得很酷的童鞋，但大多数童鞋在接触新东西时首先关心的是有啥用处，以及能带来啥价值。

Nodejs的作者说，他创造Nodejs的目的是为了实现高性能web服务器，他首先看重的是事件机制和异步IO模型的优越性，而不是JS。但是他需要选择一种编程语言实现他的想法，这种编程语言不能自带IO功能，并且需要能良好支持事件机制。JS没有自带IO功能，天生就用于处理浏览器中的DOM事件，并且拥有一大群程序员，因此就成为了天然的选择。

如他所愿，NodeJs在服务端活跃起来，出现了大批基于nodejs的web服务。而另一方面，nodejs让前端如获神器，终于可以让自己的能力覆盖范围跳出浏览器窗口。

对于前端来说，NodeJs不是需要人人都要写一个服务器程序，但简单可至使用交互模式调试JS代码片段，复杂可至编写工具提升工作效率。

***

## 模块

编写稍微大一点的程序时一般都会将代码模块化。在NodeJs中，一般将代码合理拆分到不同的JS文件中，每一个文件就是一个模块，而文件路径就是模块名。在编写每个模块时，都有`require、exports、module`三个预先定义好的变量可供使用

### ***require***

`require` 函数用于在当前模块中加载和使用别的模块，传入一个模块名，返回一个模块导出对象，模块名可使用相对路径（./）或者绝对路径（/或C：之类的盘符开头）。另外，模块名中的.JS扩展名可以省略。


### ***exports***

`exports`对象是当前模块的导出对象，用于导出模块公有方法和属性。别的模块通过`require`函数使用当前模块时得到的就是当前模块的`exports`对象。
`
exports.hello = function(){console.log('hello world !')}
`
### ***module***

通过`module`对象是当前模块的导出对象，用于导出模块公有方法和属性。别的模块通过`require`函数使用当前模块时得到的就是当前模块的`exports`对象。

*ps:*
module.exports = () => {
  console.log("hello world!")
}


### ***二进制模块***

Nodejs也支持使用C/C++编写二进制模块。编译好的二进制模块除了文件扩展名是.node外，和JS模块的使用方式相同


### 代码的组织和部署

***模块路径解析规则***
require函数支持斜杠（/）或盘符（C：）开头的绝对路径，也支持./开头的相对路径。当这两种路径在模块之间简历强耦合关系，一旦某个模块文件的存放位置需要变更，使用该模块的其他模块的代码也需要跟着调整，变得牵一发动全身。因此，`require`函数支持第三种形式的路径，写法类似于`foo/bar`，并依次按照以下规则解析路径，知道找到模块位置。

* 内置模块

  如果传递给`require`函数的是NodeJS内置模块名称，不用做路径解析，直接返回内部模块的导出对象，例如`require('fs')`
* node_modules目录
  NodeJs定义了一个特殊的`node_modules`目录用于存放模块。例如某个模块的绝对路径是`/home/user/hello.js`,在该模块中使用`require（'foo/bar'）`方式加载模块时，则NodeJs一次尝试使用以下路径。


* NODE_PATH环境变量
  与PATH环境变量类似，NodeJs允许通过NODE_PATH环境变量来指定额外的模块搜索路径。NODE_PATH环境变量中包含一到多个目录路径，路径之间在linux下使用`：`分割，在windows下使用`；`分割。例如定义了以下NODE_PATH环境变量：

  `NODE_PATH=/home/hello/main`

  当使用`require('foo/bar')`的方式加载模块时，则NodeJS依次尝试以下路径。

  `
  /home/user/lib/foo/bar
  /home/lib/foo/bar
  `

### 包（package）
  我们已经知道了js模块的基本单位是单个JS文件，但复杂些的模块往往由多个子模块组成。为了便于管理和使用，我们可以把由多个子模块组成的大模块称作包，并把所有的子模块放在同一个目录里。
  在组成一个包的所有子模块中，需要有一个入口模块，入口模块的导出对象被作为包的导出对象

  在其他模块里使用包的时候，需要加载包的入口模块。接着上列，使用`require（）`能达到目的，但是入口模块名称出现在路径里看上去不是个好主意。因此我们需要做点额外的工作，让包使用起来更像是单个模块。

  index.js
  当模块的文件名是`index.js`,加载模块时可以使用模块所在目录的路径代替模块文件路径

  *package.json*
  如果想自定义入口模块的文件名和存放位置，就需要在包目录下包含一个package.json文件，并在其中指定入口模块的路径。

    `
    {
      "name":"",//文件名
      "main":"" //文件路径
    }
    `
  如此一来，就同样可以使用`require('/home/user/lib/cat')`的方式加载模块。Nodejs会根据包目录下的package.json找到入口模块所在位置

  ### 命令行程序

  ### ***NPM***
    MPM是随同Nodejs一起安装的包管理工具，能解决Nodejs代码部署上的很多问题，常见的使用场景有以下几种：
    * 允许用户从npm服务器下载比尔人编写的第三方包到本地使用
    * 允许用户从NPM服务器下载并安装别人编写的命令行程序到本地使用
    * 允许用户将自己编写的包或命令行程序上传到NPM服务器供别人使用
    可以看到，npm建立了一个庞大的nodejs生态圈，nodejs开发者和用户可以在里吧互通有无。
  ***下载第三方包***

   需要使用三方包时，通过 `npm install`



   ## **文件操作**

    *小文件copy*

    `
    var fs = require("fs")
    function copy(src,dst){
      fs.writeFileSync(dst,fs.readFileSync(src));
    }
   
    function main(argv){
      copy(argv[0],argv[1])
    }
    main(process.argv.slice(2))

    `


  ### 提供了那些Api

  * js语音自身只有字符串数据类型，没有二进制数据类型，因此Nodejs提供了一个与String对等的全局构造函数`buffer`来提供对二进制数据的操作。除了可以读取文件得到`buffer`的实例外，   还能够直接构造   
     `
      var bin = new Buffer([0x68,0x65,0x6c,0x6c,06xf])
     `

     `Buffer`与字符串类型，除了可以用`.length`属性来得到字节长度外，还可用【index】方式读取指定位置的字节

     `
      bin[0]
     `
    `Buffer`与字符串能够户型转化，例如可以使用指定编码将二进制数据转化为字符串；
    `
    let str = bin.toString(bin) //
    `
    反之，将字符串转化为指定编码下的二进制
    `
    let bin = new Buffer('hello','utf-8')
    `
  `buffer`与字符串有一个重要区别。字符串是只读的，并且对字符串的任何修改得到的都是一个新字符串，原字符串保持不变。至于`buffer`，更像是可以做指针操作的C语言数组。ps： 可以用【index】方式直接修改某个位置的字节
  而`.splice`方法也不是返回一个新的`buffer`，而更像是返回了指定原`buffer`中间的某个位置的指针。


### ***stream***
当内存中无法一次装下需要处理的数据时，或者一边读取一边处理更加高效时，我们就需要用到数据流。Nodejs中通过各种`stream`来提供对数据流的操作。
以上边的大文件拷贝程序为例，我们可以为数据来源创建一个只读数据流，实例
> `
  let rs = fs.createReadStream(pathname)
  rs.on('data',function(chunk){
    doSomething(chunk)
  })
  rs.on('end',function(){
    cleanUp()
  })
`

***ps:Stream基于事件机制工作，所有stream的实例都继承与Nodejs提供的EventEmitter***
上边的代码中`data`事件会源源不断的被处罚，不管`dosomething`函数是否处理得过来。代码可以继续做如下改造。
> `
let rs = fs.createReadStream(src)
rs.on('data',(chunk) => {
  rs.pause()
  doSomething(chunk,() => {
    rs.resume()
  })
})
rs.on('end',() => {
  cleanUp()
})
`

以上代码给`doSomething`函数加了回调，因此我们可以在处理数据前暂停数据读取，并在处理数据后继续读取数据
此外，我们也可以为数据模板创建一个只写数据流，示例如下：
>`
 let rs = fs.createReadStream(src)
 let ws = fs.createWriteSteam(dst)
 rs.on('data',(chunk) => {
   ws.write(chunk)
 })
 rs.on('end',() =>{
   ws.end()
 })
`

>ps:Steam基于事件机制工作，所有`stream`的实例都继承与nodejs提供的EventEmitter

上边的代码中`data`事件会源源不断的被触发，不管dosomething函数是否处理得过来。

>`
  let rs = fs.createReadStream(src)
  rs.on('data',(chunk) => {
    rs.pause()
    doSomething(chunk, () => {
      rs.resume()
    })
  })
`

### File System (文件系统)

NodeJs通过`fs`内置模块提供对文件的操作。fs模块提供的Api基本上可以分为以下三类：
* 文件属性读写
  其中常用的有`fs.stat`、`fs.chmod`、`fs.chown`等等
* 文件内容读写
  其中常用的有`fs.readFile`、`fs.readdir`、`fs.mkdir`等等
* 底层文件操作
  其中常用的有`fs.open`、`fs.read`、`fs.close`等等

Nodejs最精华的异步IO模型在`fs`模块里有着充分的提现，例如上边提到的这些API都通过回调函数传递结果。以`fs.readFile`为例
如上边代码所示，基本上所有`fs`模块api的回调参数都有两个。第一个参数是再有错误发生时等于异常对象，第二个参数始终用于返回api方法执行结果