const router = require('express').Router()
const Answer = require('../controllers/answers_controller')

router.post('/add',Answer.add)
router.get('/showbypostid/:id',Answer.showByPostId)
router.delete('/delete/:id',Answer.delete)
router.put('/update/:id',Answer.update)
router.put('/upvote/:id',Answer.upvote)
router.put('/downvote/:id',Answer.downvote)

module.exports = router