const head = require('./head')
const body = require('./body')
exports.create = function (name) {
    return {
        name:name,
        head:head.create(),
        body:body.create()
    }
}