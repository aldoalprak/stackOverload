const QuestionModel = require('../models/question.js')
const jwt = require("jsonwebtoken")

class Question {

    static add(req,res) {
        const decoded = jwt.verify(req.headers.token,process.env.JWT_SALT)
        const dataQuestion = {
            title: req.body.title,
            content: req.body.content,
            votes:[],
            answerId:[]
        }
        console.log(dataQuestion.content,"xxxxxxxxxx");
        
        dataQuestion.userId = decoded.userId
        QuestionModel.create(dataQuestion)
        .then(dataQuestion=>{
            res.status(200).json({message:"post sent!!",dataQuestion})
        })
        .catch(err=>{
            res.status(500).json({message:err.message})
        })
    }

    static show(req,res) {
        QuestionModel.find()
        .populate('userId','username')
        .exec(function(err,dataQuestions){
            if(err) {
                res.status(500).json({message:err.message})
            }else{
                res.status(200).json({message:"show questions",dataQuestions})
            }
        })
    }

    static showOne(req,res){
        console.log(req.params.id); 
        QuestionModel.findById(req.params.id)
        .populate('userId','username')
        .exec(function(err,dataQuestion){
            if(err) {
                res.status(500).json({message:err.message})
            }else{
                res.status(200).json({dataQuestion})
            }
        })
    }
    static delete(req,res) {
        QuestionModel.deleteOne({_id:req.params.id})
        .then(result=>{
            console.log("masuk",req.params.id);
            res.status(200).json({message:"question deleted",result})
        })
        .catch(err=>{
            res.status(500).json({message:err.message})
        })
    }

    static update(req,res) {
        QuestionModel.updateOne({_id:req.params.id},{$set:req.body})
        .then(result=>{
            res.status(200).json({message:"question updated",result})
        })
        .catch(err=>{
            res.status(500).json({message:err.message})
        })
    }

    static upvote(req,res) {
        console.log(req.params.id,"asdasdasdasd");
        QuestionModel.findById(req.params.id)
        .then(dataQuestion=>{
            dataQuestion.votes.push(req.body.userId)
            dataQuestion.save()
            res.status(200).json(dataQuestion)
        })
    }

    static downvote(req,res) {
        QuestionModel.findById(req.params.id)
        .then(dataQuestion=>{
            dataQuestion.votes = req.body.currVotes
            dataQuestion.save()
            res.status(200).json(dataQuestion)
        })
    }

}

module.exports = Question