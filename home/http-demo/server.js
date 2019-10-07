// 引入 http模块
const http = require('http')
// 通过http对象 创建服务器
const app = http.createServer()
//监听服务器的请求，并打印请求的url地址

app.on('request',(req,res) => {
    //获取请求的url
    const url = req.url
    console.log(req.url)
    //通过对url的判断
    switch (url) {
        case '/':
            res.end('Welcome to login page')
            break;
        case '/home':
            res.end('Welcome to home page')
            break;
        case '/login':
            res.end('come to login your account')
            break;
        case '/register':
            res.end('Welcome to register page')
            break;
        default:
            res.end('404 not found')
            break;
    }
    // if(url === '/'|| url === '/home'){
    //     res.end
    // }
})
//指定服务器的端口号，以及服务器正常启动之后的回调函数

app.listen(3000,() =>{
    console.log("server is running on localhost:3000")
})
