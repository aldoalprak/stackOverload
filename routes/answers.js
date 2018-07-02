const router = require('express').Router()
const Answer = require('../controllers/answers_controller')

router.get('/add',Answer.add)

module.exports = router