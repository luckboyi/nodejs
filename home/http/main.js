var http = require('http');
http.createServer(function (request, response) {
    // response.writeHead(200, { 'Content-Type': 'text-plain' });
    // response.end('Hello World\n');
    response.writeHead(200,{'content-Type':'text/plain'})
    let body = []
    console.log(request.method)
    console.log(request.headers)
    request.on('data', chunk => {
      response.write(chunk)
    })
    request.on('end',()=>{
      // body = Buffer.concat(body)
      // console.log(body.toString())
      response.end('this is demo!')
    })
}).listen(8124);