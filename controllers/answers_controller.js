const AnswerModel = require('../models/answer.js')
const QuestionModel = require('../models/question.js')
const jwt = require("jsonwebtoken")

class Answer {

    static add(req,res) {
        const decoded = jwt.verify(req.headers.token,"helloworld123")
        const dataAnswer = {
            content: req.body.content,
            votes:[],
            questionId:req.body.questionId
        }
        dataAnswer.userId = decoded.userId
        AnswerModel.create(dataAnswer)
        .then(dataAnswer=>{
            QuestionModel.findOne({_id:req.body.questionId})
            .then(dataQuestion=>{
                dataQuestion.answerId.push(dataAnswer._id)
                dataQuestion.save()
            })
            res.status(200).json({message:"post sent!!",dataAnswer})
        })
        .catch(err=>{
            res.status(500).json({message:err.message})
        })
    }

    static showByPostId(req,res) {
        AnswerModel.find({questionId:req.params.id})
        .populate('userId','username')
        .then(dataAnswer=>{
            res.status(200).json({dataAnswer})
        })
        .catch(err=>{
            res.status(500).json({message:err.message})
        })
    }

    static delete(req,res) {
        AnswerModel.deleteOne({_id:req.params.id})
        .then(result=>{
            res.status(200).json({message:"answer deleted",result})
        })
        .catch(err=>{
            res.status(500).json({message:err.message})
        })
    }

}

module.exports = Answer