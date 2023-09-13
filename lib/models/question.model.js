import mongoose  from "mongoose";
/*
Schema for questions
title: Question Name (given on question)
questionLink: Hyperlink
description: Short desc of question
solution: Short desc of solution approach
solitionLink: Hyperlink
category: tags of topics used in question
difficultyLevel: Difficulty level of the question
createdBy: UserId
*/
const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    questionLink:{
        type:String,
        required:true,
    },
    hint: {
        type: String,
    },
    solutionLink: {
        type: String,
    },
    tags: [
        {
            type: String,
            required: true,
        }
    ],
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // If you have a User model for authentication
        required: true,
    },
    createdAt:{
        type: Date,
        default:Date.now,
    },
    isPublic:{
        type:Boolean,
        default: true,
    }
});

const Questions = mongoose.models?.Questions || mongoose.model('Questions',questionSchema);
export default Questions;