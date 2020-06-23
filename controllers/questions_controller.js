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
        const decoded = jwt.verify(req.headers.token,process.env.JWT_SALT)
        QuestionModel.findById({_id:req.params.id})
        .then(dataQuestion=>{
            if(dataQuestion) {
                if(dataQuestion.userId == decoded.userId) {
                    QuestionModel.deleteOne({_id:req.params.id})
                    .then(result=>{
                        res.status(200).json({message:"question deleted",result})
                    })
                    .catch(err=>{
                        res.status(500).json({message:err.message})
                    })
                }else{
                    res.status(500).json({message:"you dont have authorized"})
                }    
            }else{
                res.status(500).json({message:"question not found"})
            }
        })
        .catch(err=>{
            res.status(500).json({message:err.message})
        })
    }

    static update(req,res) {
      QuestionModel.find({_id:req.params.id})
      .then(dataQuestion=>{
          if(dataQuestion) {
              const decoded = jwt.verify(req.headers.token,process.env.JWT_SALT)
              if(dataQuestion[0].userId == decoded.userId) {
                QuestionModel.updateOne({_id:req.params.id},{$set:req.body})
                .then(result=>{
                    res.status(200).json({message:"question updated",result})
                })
                .catch(err=>{
                    res.status(500).json({message:err.message})
                })
              }else{
                  console.log("xx")
                  res.status(500).json({message:"you dont have authorized"})
              }
          }else{
              res.status(500).json({message:"question not found"})
          }
      })
      .catch(err=>{
          res.status(500).json({message:err.message})
      })
    }

    static upvote(req,res) {
        try {
          const decoded = jwt.verify(req.headers.token,process.env.JWT_SALT)
          QuestionModel.findById(req.params.id)
          .then(dataQuestion=>{
              dataQuestion.votes.push(decoded.userId)
              dataQuestion.save()
              res.status(200).json(dataQuestion)
          }) 
        } catch (err) {
            res.status(500).json({message:err.message})
        }
    }

    static downvote(req,res) {
      try {
        const decoded = jwt.verify(req.headers.token,process.env.JWT_SALT)
        QuestionModel.findById(req.params.id)
        .then(dataQuestion=>{
          const votesArr= dataQuestion.votes
          const deleteIndex = votesArr.indexOf(decoded.userId)
          if(deleteIndex > -1) {
            votesArr.splice(deleteIndex, 1)
            dataQuestion.votes = votesArr
            dataQuestion.save()
            res.status(200).json(dataQuestion)
          } else {
            res.status(200).json({message: "userId not found"})
          }
        })
      } catch (err) {
          res.status(500).json({message:err.message})
      }
       
    }

}

module.exports = Question