const router = require('express').Router()
const Question = require('../controllers/questions_controller')

router.post('/add',Question.add)
router.get('/show',Question.show)
router.get('/showone/:id',Question.showOne)

module.exports = router