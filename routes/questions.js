const router = require('express').Router()
const Question = require('../controllers/questions_controller')

router.get('/add',Question.add)

module.exports = router