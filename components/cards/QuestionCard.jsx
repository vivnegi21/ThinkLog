'use client'
import React from 'react'
import { Button, buttonVariants } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';

const QuestionCard =({isVisible,key,question,userId,onClose}) => {
    if(!isVisible) return null;
    
    question=JSON.parse(question);
    userId=JSON.parse(userId);
    
    const hintPara = question.hint.split('\n');

    return (
        <div className={`inset-0 fixed backdrop-blur-sm flex items-center max-md:-mt-12 justify-center w-screen max-h-screen`}>
            <div className='flex flex-col w-5/6 h-5/6 max-md:h-full mx-2 items-center justify-center max-md:w-full'>
                {/* Button */}
                <div className='flex justify-end items-end w-full max-md:2-11/12'>
                    <Button onClick={()=>onClose()} className='bg-transparent text-black'><Image src='/assets/close.svg' width={20} height={20} alt="close"/></Button>
                </div>

                {/* Card Data Frame */}
                <div className='border w-full h-11/12 max-md:h-2/3 max-md:w-11/12 overflow-y-auto items-center justify-center  bg-white  text-dark-1'>
                    
                    {/* CreatedAt and Created By */}
                    <div className="flex flex-col items-end">
                        {question.createdBy._id===userId?(<p></p>):(<Link href={`/profile/${question.createdBy.id}`} className='text-sm text-gray'>Created By: {question.createdBy.username}</Link>)}
                        <p className='text-sm text-gray'>Created On: {(new Date(question.createdAt)).toLocaleString()}</p>
                    </div>
                    <div className='flex flex-col gap-5 h-fit p-2 py-3 scroll-m-0 justify-between '>
                        
                        {/* Title */}
                        <Link href={question.questionLink} target='_blank'>
                            <h1 className='text-3xl underline text-center mx-4 text-navbar underline-offset-8'>{question.title}</h1>
                        </Link>
                        {/* Hints: */}
                        <div>
                            <p className="text-left text-2xl">Hints:</p>
                            <p className='shadow shadow-light-3 p-2 text-base text-left flex flex-col gap-2 pb-16'>
                                {hintPara.map((hnt,index)=>(
                                    <p key={index}>{hnt}</p>
                                    ))}
                            </p>
                        </div>
                        {/* Tags */}
                        <div>
                            <p className="text-left text-2xl">Tags:</p>
                            <p className='px-2 py-4 text-base text-left flex gap-2 shadow shadow-light-3'>
                                {question.tags.map((tag,index)=>(
                                <p key={index} className='max-md:text-xs  rounded-full whitespace-nowrap p-1 bg-navbar hover:bg-navbar/50 text-white'>{tag}</p>
                                ))}
                            </p>
                        </div>
                        <div className="flex flex-row justify-between p-4">
                        <Link className={buttonVariants({ variant: "outline" })} href={question.solutionLink} target='_blank'>Solution</Link>
                        <Link className={buttonVariants({ variant: "outline" })} href={`/edit/${question._id}`}> Edit Answer </Link>
                        </div>
                    </div>
                </div>
            </div>
         </div>
    )
}

export default QuestionCard
