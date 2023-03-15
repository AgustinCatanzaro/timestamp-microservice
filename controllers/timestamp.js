const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')

const getTimeStamp = (req, res) => {
	let { date: newDate } = req.params

	//if the params received is an unix, we need to parseInt it first to create the date
	;/^\d+$/.test(newDate)
		? (newDate = new Date(parseInt(newDate)))
		: (newDate = new Date(newDate))

	//checking if the params received is a valid date format.
	if (isNaN(newDate)) {
		throw new BadRequestError('Please provide a valid Date format')
	}

	res.status(StatusCodes.OK).json({
		unix: newDate.getTime(),
		utc: newDate.toUTCString(),
	})
}

module.exports = { getTimeStamp }
