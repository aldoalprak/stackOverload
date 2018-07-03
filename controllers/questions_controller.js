const QuestionModel = require('../models/question.js')
const jwt = require("jsonwebtoken")

class Question {

    static add(req,res) {
        const decoded = jwt.verify(req.headers.token,"helloworld123")
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

}

module.exports = Question