const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const questionSchema = new Schema({
    content: String,
    like:[],
    answers:[],
    userId: {
        type: ObjectId,
        ref: "User"
    }
},{timestamps:true})

const QuestionModel = mongoose.model("Question",questionSchema)

module.exports = QuestionModel