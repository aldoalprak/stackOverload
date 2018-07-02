const QuestionModel = require('../models/question.js')
const jwt = require("jsonwebtoken")

class Question {

    static add(req,res) {
        const decoded = jwt.verify(req.headers.token,"helloworld123")
        const dataPost = {
            content: req.body.content,
            like:[],
            content:[]
        }
        dataPost.userId = decoded.userId
        postModel.create(dataPost)
        .then(dataPost=>{
            res.status(200).json({message:"post sent!!",dataPost})
        })
        .catch(err=>{
            res.status(500).json({message:err.message})
        })
    }

    static show(req,res) {
        
    }

}

module.exports = Question