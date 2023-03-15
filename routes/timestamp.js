const express = require('express')
const router = express.Router()

const { getTimeStamp } = require('../controllers/timestamp')

router.route('/:date').get(getTimeStamp)

module.exports = router
