'use server'
import { connectToDB } from "@/mongoose";
import Questions from "../models/question.model";
import  User from "../models/user.model";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function editQuestion({title,questionLink,hint,solutionLink,tags,createdBy,difficulty,questionId}){
    try {
        connectToDB();
        const question = await Questions.findById(questionId);
        console.log(JSON.stringify(question.createdBy));
        console.log(questionId);
        const questionCreator = JSON.stringify(question.createdBy).slice(1,-1);
        if(createdBy===questionCreator){
            await Questions.findByIdAndUpdate(questionId,{$set:{
                title:title,
                questionLink:questionLink,
                solutionLink:solutionLink,
                hint:hint,
                tags:tags,
                createdBy:createdBy,
                difficulty:difficulty
            }});

        } else{
            const result = await Questions.create({title,questionLink,hint,solutionLink,tags,createdBy,difficulty});
            await User.findByIdAndUpdate(createdBy,{$push:{userQuestions:result._id}});
        }
    } catch (error) {
        throw new Error(`Cannot Add new Question:  ${error.message}`);
    }
}

export async function addQuestion({title,questionLink,hint,solutionLink,tags,createdBy,difficulty}){
    try {
        connectToDB();
        const result = await Questions.create({title,questionLink,hint,solutionLink,tags,createdBy,difficulty});
        await User.findByIdAndUpdate(createdBy,{$push:{userQuestions:result._id}});

    } catch (error) {
        throw new Error(`Cannot Add new Question:  ${error.message}`);
    }
}

export async function fetchQuestions(userId=''){
    try {
        connectToDB();
        let result;
        if(userId) result =await Questions.find({createdBy:userId}).populate('createdBy','_id id username');
        else result=await Questions.find().populate('createdBy','_id id username');
        return result.reverse();
    } catch (error) {
        throw new Error(`Cannot Fetch Questions: ${error.message}`);
    }
}
export async function searchQuestions({title='',difficulty='',tags='',pageNumber = 1,pageSize = 20,sortBy = "desc"}){
    try {
        connectToDB();
        // Calculate the number of users to skip based on the page number and page size.
        const skipAmount = (pageNumber - 1) * pageSize;

        // Create a case-insensitive regular expression for the provided search string.
        const regexTitle = new RegExp(title, "i");
        const tagsList = tags.split(',');
        console.log(tagsList)
        const query={};
        if(title!=='' && difficulty!=='' && tags!==''){
            query.$and=[{"title":regexTitle},{"difficulty":difficulty},{'tags':{$all:tagsList}}];
        }
        else if(title!==''){
            query.title = regexTitle
        }
        else if(difficulty!=='') query.difficulty=difficulty
        else if(tags!=='') query.tags = {$all:tagsList}
        
        const result = await Questions.find(query).populate('createdBy','_id id username');
        // console.log(result);
        return result;

    } catch (error) {
        throw new Error(`Cannot Fetch Questions: ${error.message}`);
    }
}

export async function fetchQuestionWithID(questionId){
    try {
        connectToDB();
        const question= await Questions.findById(questionId);
        return question ;
    } catch (error) {
        throw new Error(`Error Fetching Question: ${error.message}`)
    }
}
