const ServerClass = require("./server")

ServerClass.prototype.serveKoa = function () {
  console.log("serves koa!")
}

module.exports = ServerClass
