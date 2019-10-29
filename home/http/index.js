const http = require('http')
const zlib = require('zlib')
// const fs = require('fs')
// let options = {
//   key:fs.readFilesSync('./ssl/default.key'),
//   cert:fs.readFilesSync('./ssl/default.cer')
// }
// let server = https.createServer(options, (request,response) => {
//   console.log(request)
//   console.log(response)
// })
http.createServer(function (request, response) {
  var i = 1024,
      data = '';

  while (i--) {
      data += '.';
  }

  if ((request.headers['accept-encoding'] || '').indexOf('gzip') !== -1) {
      zlib.gzip(data, function (err, data) {
          response.writeHead(200, {
              'Content-Type': 'text/plain',
              'Content-Encoding': 'gzip'
          });
          response.end(data);
      });
  } else {
      response.writeHead(200, {
          'Content-Type': 'text/plain'
      });
      response.end(data);
  }
}).listen(8090);