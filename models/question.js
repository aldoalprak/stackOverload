const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const questionSchema = new Schema({
    title: {
        type:String,
        unique:true
    },
    content: String,
    votes:[],
    answerId:[{
        type: ObjectId,
        ref: "Answer"
    }],
    userId: {
        type: ObjectId,
        ref: "User"
    }
},{timestamps:true})

const QuestionModel = mongoose.model("Question",questionSchema)

module.exports = QuestionModel