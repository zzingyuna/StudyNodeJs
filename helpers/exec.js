var finalhandler = require('finalhandler')
var http = require('http')
var serveStatic = require('serve-static')

// Serve up public folder
var serve = serveStatic('D:\\work\\public\\', { 'index': ['index.html', 'index.html']})

// Create server
var server = http.createServer(function onRequest (req, res) {
    serve(req, res, finalhandler(req, res))
})

// Listen
server.listen(3000)
console.log('Server running on 3000 ...');