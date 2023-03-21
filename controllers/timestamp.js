const { StatusCodes } = require('http-status-codes')

const getTimeStamp = (req, res) => {
	let { date: newDate } = req.params
	if (!newDate) {
		const currentUnix = new Date().getTime()
		const currentUtc = new Date().toUTCString()
		return res
			.status(StatusCodes.OK)
			.json({ unix: currentUnix, utc: currentUtc })
	}

	//if the params received is an unix, we need to parseInt it first to create the date
	;/^\d+$/.test(newDate)
		? (newDate = new Date(parseInt(newDate)))
		: (newDate = new Date(newDate))

	//checking if the params received is a valid date format.
	if (isNaN(newDate)) {
		return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid Date' })
	}
	const unixTime = Number(newDate.getTime())
	const utcTime = newDate.toUTCString()

	res.status(StatusCodes.OK).json({
		unix: unixTime,
		utc: utcTime,
	})
}

module.exports = { getTimeStamp }
