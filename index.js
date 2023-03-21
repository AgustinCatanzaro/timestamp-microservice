// index.js
// where your node app starts

// init project
var express = require('express')
var app = express()

//error-handlers
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

//routers
const timestampRouter = require('./routes/timestamp')

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors')
app.use(cors({ optionsSuccessStatus: 200 })) // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

app.use(express.json())

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/views/index.html')
})

//routes
app.use('/api', timestampRouter)

// your first API endpoint...
app.get('/api/hello', function (req, res) {
	res.json({ greeting: 'hello API' })
})

//error handler after endpoints
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
	console.log('Your app is listening on port ' + listener.address().port)
})
