let bin = new Buffer([0x68,0x65,0x6c,0x6c,0x6f])
bin[1] = 0x60
let msg = bin[2]
let utf = bin.toString('utf-8')
let bin2 = new Buffer('I im  from China','utf-8')
let sub = bin.slice(2)
console.log(bin)
console.log(msg)
console.log(utf)
console.log(bin2)
console.log(sub)