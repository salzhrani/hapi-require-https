'use strict'

const register = function (server, options) {
  server.ext('onRequest', function (request, h) {
    // console.log('request', options, server.info)
    var redirect = options.proxy !== false
      ? request.headers['x-forwarded-proto'] === 'http'
      : server.info.protocol === 'http'
    var host = request.headers['x-forwarded-host'] || request.headers.host

    if (redirect) {
      const response = h.response().takeover().redirect('https://' + host + request.url.path).code(301)
      return response
    }
    return h.continue
  })
}

exports.plugin = {
  pkg: require('./package.json'),
  register
}
