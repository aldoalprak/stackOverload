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
        const decoded = jwt.verify(req.headers.token,"helloworld123")
        AnswerModel.findById({_id:req.params.id})
        .then(dataAnswer=>{
            if(dataAnswer) {
                if(dataAnswer.userId == decoded.userId) {
                    AnswerModel.deleteOne({_id:req.params.id})
                    .then(result=>{
                        res.status(200).json({message:"answer deleted",result})
                    })
                    .catch(err=>{
                        res.status(500).json({message:err.message})
                    })
                }else{
                    res.status(500).json({message:"you dont have authorized"})
                }    
            }else{
                res.status(500).json({message:"answer not found"})
            }
        })
        .catch(err=>{
            res.status(500).json({message:err.message})
        })
    }

    static update(req,res) {
        AnswerModel.find({_id:req.params.id})
        .then(dataAnswer=>{
            if(dataAnswer) {
                const decoded = jwt.verify(req.headers.token,"helloworld123")
                if(dataAnswer[0].userId == decoded.userId) {
                    AnswerModel.updateOne({_id:req.params.id},{$set:req.body})
                    .then(result=>{
                        res.status(200).json({message:"answer updated",result})
                    })
                    .catch(err=>{
                        res.status(500).json({message:err.message})
                    })
                }else{
                    console.log("xx")
                    res.status(500).json({message:"you dont have authorized"})
                }
            }else{
                res.status(500).json({message:"answer not found"})
            }
        })
        .catch(err=>{
            console.log(dataArticle,"====")
            res.status(500).json({message:err.message})
        })
        
    }

    

}

module.exports = Answer