const { StatusCodes } = require('http-status-codes')

const getTimeStamp = (req, res) => {
	let { date: newDate } = req.params

	//if the params received is an unix, we need to parseInt it first to create the date
	;/^\d+$/.test(newDate)
		? (newDate = new Date(parseInt(newDate)))
		: (newDate = new Date(newDate))

	//checking if the params received is a valid date format.
	if (isNaN(newDate)) {
		console.log(newDate) //throw expection...
	}

	console.log(
		`unix:${newDate.getTime()}    exerciseUnix:${newDate.toUTCString()}`
	)
	res.status(StatusCodes.OK).json({
		unix: newDate.getTime(),
		utc: newDate.toUTCString(),
	})
}

module.exports = { getTimeStamp }
