'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import { Input } from '../ui/input';
import {Select,SelectContent,SelectGroup,SelectItem,SelectLabel,SelectTrigger,SelectValue} from "@/components/ui/select"
import { Button } from '../ui/button';
import Image from 'next/image'

const SearchBar = ({routeType}) => {
    const [title,setTitle]=useState('');
    const [difficulty,setDifficulty]=useState('');
    const [tags,setTags]=useState('');
    const router = useRouter();
    
    useEffect(()=>{
        // console.log({title,difficulty,tags});
        const delayDebounceFn = setTimeout(() => {
            if (title || difficulty || tags) {
              router.push(`/${routeType}?title=` + title+`&difficulty=`+difficulty+`&tags=`+tags);
            } else {
              router.push(`/${routeType}`);
            }
          }, 300);
      
        return () => clearTimeout(delayDebounceFn);
    },[title,difficulty,tags,routeType]);
    return(
        <div className="flex flex-col lg:w-1/3 shadow shadow-light-3 dark:shadow-white items-center justify-center h-fit m-auto p-4 lg:fixed  lg:top-60 lg:right-2">
            <p className='w-full text-center mb-5'>Search Form</p>
            <div className="flex flex-col max-lg:flex-col gap-3 justify-evenly lg:justify-center lg:w-full items-center px-1">
                <div className='flex gap-2 w-full lg:flex-col'>
                    
                    {/* Question Title */}
                    <div className="flex flex-col gap-1 items-start max-lg:w-1/2 w-full">
                        <p className="text-light-3">Question Title</p>
                        <Input placeholder='Search Title' onChange={(e)=> setTitle(e.target.value)} className='text-dark-1' />
                    </div>

                    {/* Difficulty */}
                    <div className='flex flex-col gap-1 items-start max-lg:w-1/2'>
                        <p className='text-light-3 '>Difficulty</p>
                        <Select onValueChange={(e)=>setDifficulty(e)} value={difficulty} className='text-dark-1' >
                            <SelectTrigger className='text-gray-1'>
                                <SelectValue placeholder="Difficulty" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectLabel>Difficulty</SelectLabel>
                                <SelectItem value="Easy">Easy</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="Hard">Hard</SelectItem>
                                
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>   
                </div>
                <div className='flex w-full lg:flex-col gap-5'>
                    
                    {/* Question Tags */}
                    <div className="flex flex-col gap-1 items-start max-lg:w-full w-full">
                        <p className="text-light-3">Question Tags</p>
                        <Input placeholder='Search Tags' onChange={(e)=> setTags(e.target.value)} className='text-dark-1' />
                    </div>
                    {/* Reset Button */}
                    <div className="flex w-1/3 max-lg:items-end justify-end lg:w-full ">
                        <Button className='p-3 w-fit' onClick={()=>{setTitle("");setDifficulty('');setTags("");}}>
                            <Image src='/assets/reset.png' width={16} height={16} alt='reset'/>
                            <p className="max-lg:hidden">&nbsp; Reset</p>
                        </Button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default SearchBar
            // <Button className=' p-2 w-fit' onClick={()=>{
            //     setTitle("");
            //     setDifficulty('');
            //     setTags("");
            // }}><Image src='/assets/reset.png' width={14} height={14} alt="reset"/>
            //     <p className='max-lg:hidden'>Reset</p>
            // </Button>
