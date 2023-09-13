import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: {type:String,required:true},
    username :{type:String,required:true,unique:true},
    name: {type:String,required:true},
    image:{type:String},
    email: {
        type: String,
        required: true,
        unique: true,
    },
    onboarded:{
        type:Boolean,
        default:false
    },
    // Add a reference to UserQuestions
    userQuestions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Questions', // Reference to the UserQuestion schema
        },
    ],

});

const User = mongoose.models.User || mongoose.model('User',userSchema);
export default User;