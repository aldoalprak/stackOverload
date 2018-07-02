const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const answerSchema = new Schema({
    content: String,
    like:[],
    questionId:{
        type: ObjectId,
        ref: "Question"
    },
    userId: {
        type: ObjectId,
        ref: "User"
    }
},{timestamps:true})

const AnswerModel = mongoose.model("Answer",answerSchema)

module.exports = AnswerModel