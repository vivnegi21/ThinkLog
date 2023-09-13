"use client"
import { useForm } from 'react-hook-form'
import { questionValidation } from '@/lib/validations/questions'
import {zodResolver} from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { addQuestion, editQuestion } from '@/lib/actions/questions.actions';
import { useRouter } from 'next/navigation';
// const AddQuestion = ({title,questionLink,hint,solutionLink,tags,createdBy,difficulty,questionId='',userID}) => {
const AddQuestion = ({userId,question}) => {
    const router = useRouter();
    question=JSON.parse(question);
    userId=JSON.parse(userId);
    const form = useForm({
        resolver: zodResolver(questionValidation),
        defaultValues: {
            title: question.title||"",
            questionLink: question.questionLink||"",
            hint: question.hint||"",
            difficulty: question.difficulty||"",
            solutionLink: question.solutionLink||"",
            tags: question.tags||"",
            createdBy: userId,
        }
    })

    async function onSubmit(values){
        //make tags an lowercase array of string seperated by commas
        // console.log("Buitton Pressed");
        const tagList = values.tags.toLowerCase().split(",");
        // console.log(addQuestionOpt);
        // TODO: make addQuestion(addQuestionOpt) function to add them to mongoDB
        if(question._id===''){
            await addQuestion({
            title:values.title,
            questionLink:values.questionLink,
            hint : 	values.hint ,
            solutionLink:values.solutionLink,
            tags:[...tagList],
            createdBy: userId,
            difficulty: values.difficulty
        });
        router.push('/');

        } else{
            await editQuestion({
                title:values.title,
                questionLink:values.questionLink,
                hint : 	values.hint ,
                solutionLink:values.solutionLink,
                tags:[...tagList],
                difficulty: values.difficulty,
                createdBy: userId,
                questionId:question._id
            })
            router.push('/');
        }

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="m-5 flex flex-col justify-start gap-5 z-10 shadow-light-4 shadow p-4 rounded-xl w-1/2 max-md:w-11/12">
                <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem className='flex flex-col w-full gap-1'>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                        <Input placeholder="Add Question Title" {...field} className='text-dark-2' />
                    </FormControl>
                    {/* <FormDescription>
                        Add the Name of Question
                    </FormDescription> */}
                    <FormMessage />
                    </FormItem>
                )}
                />
                {/* QUesiton and SOlution Links */}
                <div className='flex flex-row gap-2 items-center justify-between'>
                
                <FormField
                control={form.control}
                name="questionLink"
                render={({ field }) => (
                    <FormItem className='flex-col w-full gap-1'>
                    <FormLabel>Question Link</FormLabel>
                    <FormControl>
                        <Input placeholder="Add Question Link..." {...field} className='text-dark-2' />
                    </FormControl>
                    {/* <FormDescription>
                        Add the Name of Question
                    </FormDescription> */}
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="solutionLink"
                render={({ field }) => (
                    <FormItem className='flex-col w-full gap-1'>
                    <FormLabel>Solution Link</FormLabel>
                    <FormControl>
                        <Input placeholder="Add Solution Link..." {...field} className='text-dark-2' />
                    </FormControl>
                    {/* <FormDescription>
                        Add the Name of Question
                    </FormDescription> */}
                    <FormMessage />
                    </FormItem>
                )}
                />
                </div>
                {/* Difficulty */}
                <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                    <FormItem className='flex-col w-full gap-1'>
                    <FormLabel>Difficulty</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger {...field} className='text-dark-2'>
                            <SelectValue placeholder="Select difficulty of the Question" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="Easy" >Easy</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Hard">Hard</SelectItem>
                        </SelectContent>
                    </Select>
                    {/* <FormDescription>
                        Add the Name of Question
                    </FormDescription> */}
                    <FormMessage />
                    </FormItem>
                )}
                />
                {/* Hints */}
                <FormField
                control={form.control}
                name="hint"
                render={({ field }) => (
                    <FormItem className='flex-col w-full gap-1'>
                    <FormLabel>Hint</FormLabel>
                    <FormControl>
                        <Textarea row={10} placeholder="Add hints" {...field} className='text-dark-2' />
                    </FormControl>
                    {/* <FormDescription>
                        Add the Name of Question
                    </FormDescription> */}
                    <FormMessage />
                    </FormItem>
                )}
                />
                {/* Tags */}
                <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                    <FormItem className='flex flex-col w-full gap-1'>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                        <Input placeholder="Add comma seperated tags" {...field} className='text-dark-2' />
                    </FormControl>
                    {/* <FormDescription>
                        Add the Name of Question
                    </FormDescription> */}
                    <FormMessage />
                    </FormItem>
                )}
                />

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
  
}

export default AddQuestion