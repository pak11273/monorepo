"use strict"
var exec = require("child_process").exec
var parser = require("../utilities/response-parser")

exports.connection = function (credentials, raw) {
  function run(command, cb) {
    // console.log(command);
    exec(command, function (error, stdout, stderr) {
      try {
        var response = parser.parse(stdout, raw)
        cb(null, response)
      } catch (e) {
        cb(e, null)
      }
    }).on("error", function (err) {
      cb(err, null)
    })
  }

  return {
    get: function (url, data, cb) {
      var command = 'curl --GET --user "' + credentials + '" ' + url
      if (cb) {
        var datums = data.split("&")
        datums.forEach(function (d) {
          command += " --data " + d
        })
      } else {
        cb = data
      }
      run(command, cb)
    },

    post: function (url, data, cb) {
      var command =
        'curl --user "' + credentials + '" ' + url + ' --data "' + data + '"'
      // console.log(command);
      run(command, cb)
    },

    put: function (url, data, cb) {
      if (!data) {
        data = '""'
      }
      var command =
        'curl --request PUT --user "' +
        credentials +
        '" ' +
        url +
        ' --data "' +
        data +
        '"'
      run(command, cb)
    },

    del: function (url, cb) {
      var command =
        'curl --include --request DELETE --user "' + credentials + '" ' + url
      run(command, cb)
    },
  }
}
