const router = require('express').Router()
const Answer = require('../controllers/answers_controller')

router.post('/add',Answer.add)
router.get('/showbypostid/:id',Answer.showByPostId)
router.delete('/delete/:id',Answer.delete)
router.put('/update/:id',Answer.update)

module.exports = router