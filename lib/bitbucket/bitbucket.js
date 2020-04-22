"use strict"
var Repository = require("./bitbucketRepo")
var EventEmitter = require("events").EventEmitter
var qs = require("querystring")
var connection = require("./curl-transport").connection

function BitBucket(options) {
  this.username = options.username
  this.password = options.password
  this.root = "api.bitbucket.org"
  this.version = "1.0"
  this.getCredentials = function () {
    return this.username + ":" + this.password
  }
  this.getUrl = function () {
    return "https://" + this.root + "/" + this.version
  }
}

BitBucket.prototype.getRepository = function (repository, cb) {
  if (!repository.slug) {
    return cb(new Error("Repository slug is required."), null)
  }
  if (!repository.owner) {
    return cb(new Error("Repository owner is required."), null)
  }
  if (!cb) {
    return cb(new Error("Callback is required."), null)
  }
  var self = this
  var url =
    self.getUrl() + "/repositories/" + repository.owner + "/" + repository.slug
  connection(self.getCredentials()).get(url, function (err, data) {
    if (err) {
      cb(err, null)
    } else {
      cb(err, new Repository(self, data))
    }
  })
}

BitBucket.prototype.newUser = function (account, cb) {
  var self = this
  var url = self.getUrl() + "/newuser/"
  connection(self.getCredentials()).post(url, qs.stringify(account), cb)
}

BitBucket.prototype.repositories = function (cb) {
  var self = this
  self.user().repositories().getAll(cb)
}

BitBucket.prototype.user = function () {
  var self = this
  var url = self.getUrl() + "/user"
  return {
    follows: function (cb) {
      connection(self.getCredentials()).get(url + "/follows/", cb)
    },
    get: function (cb) {
      connection(self.getCredentials()).get(url, cb)
    },
    privileges: function (cb) {
      connection(self.getCredentials()).get(url + "/privileges/", cb)
    },
    update: function (user, cb) {
      connection(self.getCredentials()).put(url, qs.stringify(user), cb)
    },
    repositories: function () {
      return {
        dashboard: function (cb) {
          connection(self.getCredentials()).get(
            url + "/repositories/dashboard/",
            cb
          )
        },
        following: function (cb) {
          connection(self.getCredentials()).get(
            url + "/repositories/overview/",
            cb
          )
        },
        getAll: function (cb) {
          connection(self.getCredentials()).get(url + "/repositories/", cb)
        },
      }
    },
  }
}

BitBucket.prototype.users = function (nameOrEmail) {
  var self = this
  var accounUrl = self.getUrl() + "/users/" + nameOrEmail
  return {
    account: function () {
      return {
        followers: function (cb) {
          connection(self.getCredentials()).get(accounUrl + "/followers", cb)
        },
        get: function (cb) {
          connection(self.getCredentials()).get(accounUrl, cb)
        },
        plan: function (cb) {
          connection(self.getCredentials()).get(accounUrl + "/plan", cb)
        },
      }
    },
    emails: function () {
      var url = accounUrl + "/emails"
      return {
        add: function (email, cb) {
          connection(self.getCredentials()).put(
            url + "/" + email,
            qs.stringify({ email: email }),
            cb
          )
        },
        get: function (email, cb) {
          connection(self.getCredentials()).get(url + "/" + email, cb)
        },
        getAll: function (cb) {
          connection(self.getCredentials()).get(url, cb)
        },
        setAsPrimary: function (email, cb) {
          connection(self.getCredentials()).put(
            url + "/" + email,
            qs.stringify({ primary: true }),
            cb
          )
        },
      }
    },
    invitations: function () {
      var url = accounUrl + "/invitations"
      return {
        add: function (options, cb) {
          if (
            options.email_address &&
            options.group_owner &&
            options.group_slug
          ) {
            var createUrl =
              url +
              "/" +
              options.email_address +
              "/" +
              options.group_owner +
              "/" +
              options.group_slug
            connection(self.getCredentials(), true).put(createUrl, "", cb)
          } else {
            cb(new Error("Invalid arguments"), null)
          }
        },
        get: function (options, cb) {
          var pendingUrl
          var raw = false
          if (!cb && options.apply) {
            cb = options
            pendingUrl = url
          }
          if (options.toLowerCase) {
            pendingUrl = url + "/" + options
          }
          if (
            options.email_address &&
            options.group_owner &&
            options.group_slug
          ) {
            pendingUrl =
              url +
              "/" +
              options.email_address +
              "/" +
              options.group_owner +
              "/" +
              options.group_slug
            raw = true
          }
          if (!pendingUrl) {
            cb(new Error("Insuficient arguments"), null)
          } else {
            connection(self.getCredentials(), raw).get(pendingUrl, cb)
          }
        },
        remove: function (options, cb) {
          var pendingUrl
          if (options.toLowerCase) {
            pendingUrl = url + "/" + options
          }
          if (
            options.email_address &&
            options.group_owner &&
            options.group_slug
          ) {
            pendingUrl =
              url +
              "/" +
              options.email_address +
              "/" +
              options.group_owner +
              "/" +
              options.group_slug
          }
          if (!pendingUrl) {
            cb(new Error("Invalid arguments"), null)
          } else {
            connection(self.getCredentials()).del(pendingUrl, cb)
          }
        },
      }
    },
    oauth: function () {
      var url = accounUrl + "/consumers/"
      return {
        create: function (consumer, cb) {
          connection(self.getCredentials()).post(
            url,
            qs.stringify(consumer),
            cb
          )
        },
        getAll: function (cb) {
          connection(self.getCredentials()).get(url, cb)
        },
        update: function (id, consumer, cb) {
          connection(self.getCredentials()).put(
            url + id,
            qs.stringify(consumer),
            cb
          )
        },
        remove: function (id, cb) {
          connection(self.getCredentials()).del(url + id, cb)
        },
      }
    },
    privileges: function () {
      var url = accounUrl + "/privileges"
      function getCreateUpdateUrl(options) {
        var postUrl = url
        if (
          !(options && options.owner && options.group_slug && options.privilege)
        ) {
          throw new Error(
            "Owner, group_slug and privilege options are mandatory."
          )
        }
        if (
          options.privilege.toLowerCase() !== "admin" ||
          options.privilege.toLowerCase() !== "collaborator"
        ) {
          throw new Error("Privilege can only be admin or collaborator")
        }
        return url + "/" + options.owner + "/" + options.group_slug
      }
      return {
        create: function (options, cb) {
          try {
            var postUrl = getCreateUpdateUrl(options)
            connection(self.getCredentials()).post(
              postUrl,
              qs.stringify({ privileges: options.privilege }),
              cb
            )
          } catch (e) {
            cb(e, null)
          }
        },
        getAll: function (options, cb) {
          var getUrl = url
          if (!cb) {
            cb = options
          }
          if (options && options.owner && options.group_slug) {
            getUrl += "/" + options.owner + "/" + options.group_slug
          }
          connection(self.getCredentials()).get(getUrl, cb)
        },
        update: function (options, cb) {
          try {
            var postUrl = getCreateUpdateUrl(options)
            connection(self.getCredentials()).put(
              postUrl,
              qs.stringify({ privileges: options.privilege }),
              cb
            )
          } catch (e) {
            cb(e, null)
          }
        },
        remove: function (options, cb) {
          if (!(options && options.owner && options.group_slug)) {
            return cb(
              new Error("Owner and group_slug options are mandatory."),
              null
            )
          }
          var deleteUrl = url + "/" + options.owner + "/" + options.group_slug
          connection(self.getCredentials()).del(deleteUrl, cb)
        },
      }
    },
    sshKeys: function () {
      var url = self.getUrl() + "/ssh-keys"
      return {
        create: function (key, cb) {
          connection(self.getCredentials()).post(url, qs.stringify(key), cb)
        },

        getById: function (id, cb) {
          connection(self.getCredentials()).get(url + "/" + id + "/", cb)
        },

        getAll: function (cb) {
          connection(self.getCredentials()).get(url, cb)
        },

        update: function (id, key, cb) {
          connection(self.getCredentials()).put(
            url + "/" + id + "/",
            qs.stringify(key),
            cb
          )
        },

        remove: function (id, cb) {
          connection(self.getCredentials()).del(url + "/" + id + "/", cb)
        },
      }
    },
  }
}

exports.createClient = function (options) {
  if (!options.username) {
    throw new Error("Username is required")
  }
  if (!options.password) {
    throw new Error("Password is required")
  }
  return new BitBucket(options)
}
