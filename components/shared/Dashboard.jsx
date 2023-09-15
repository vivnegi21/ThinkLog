'use client'
import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import QuestionCard from '../cards/QuestionCard';

const Dashboard = ({key,index,question,userId}) => { 
    const questionParsed=JSON.parse(question);
    // console.log(question);
    // const question={
    //     "title": title||"",
    //     "hint": hint||"",
    //     'solution link': solutionLink||'' ,
    //     "tags":[...new Set(tags)]||[],
    //     "question link":questionLink||""
    // } ;
    const [showCard,setShowCard] = useState(false);
    
    return (
        <>
        <div className='mt-1 flex justify-between w-full no-scrollbar h-fit' >
            <Table>
            <TableBody>
                <TableRow className='w-full '>
                    <TableCell className='w-1/12'>{index+1}</TableCell>
                    <TableCell className='w-1/3 flex-wrap'>
                        <Link href={question.questionLink} target='_blank'>{questionParsed.title}
                    </Link>
                    </TableCell>
                    <TableCell className='w-full flex flex-row gap-1 h-fit flex-wrap items-center '>
                        {questionParsed.tags.map((tag,idx)=>{
                            if(idx<5) return(
                                <h1 key={idx} className=' max-md:text-xs rounded-full whitespace-nowrap p-1 bg-navbar text-white hover:bg-navbar/80'>{tag}</h1>
                            )
                        })
                        } 
                    </TableCell>
                    <TableCell className='w-1/12 items-center'><Button className='bg-navbar rounded-lg w-8 h-8' onClick={()=>{setShowCard(true)}}>{">"}</Button> </TableCell>
                </TableRow>
            </TableBody>
            </Table>
        </div>
        <QuestionCard
            isVisible={showCard}
            key={question._id}
            question={question}
            onClose={()=>setShowCard(false)}
            userId={userId}
        />
        
        </>
    )       
}

export default Dashboard
