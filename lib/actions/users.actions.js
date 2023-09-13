"use server"

import { connectToDB } from "@/mongoose"
import Questions from "../models/question.model"
import User from "../models/user.model"
import { revalidatePath} from "next/cache"

export async function fetchUser(userId){
    try {
        connectToDB();
        return await User.findOne({id: userId});

    } catch (error) {
        throw new Error(`Error Fetching User: ${error.message}`);
    }
}
export async function fetchUserWithQuestions(userId){
    try {
        connectToDB();
        return await User.findOne({id: userId}).populate('userQuestions',"_id tags difficulty");

    } catch (error) {
        throw new Error(`Error Fetching User: ${error.message}`);
    }
}

export async function updateUser({userId,email,username,name,image,path
}){
    try {
        connectToDB();
        await User.findOneAndUpdate(
            {id:userId},
            {
                username:username,
                email:email,
                image:image,
                name:name,
                onboarded:true
            },
            {upsert:true},
        );
        if(path === '/profile/edit'){
            revalidatePath(path);
        }

    } catch (error) {
        throw new Error(`Cannot Update User ${error.message}`);
    }
}