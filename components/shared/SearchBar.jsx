'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import { Input } from '../ui/input';
import {Select,SelectContent,SelectGroup,SelectItem,SelectLabel,SelectTrigger,SelectValue} from "@/components/ui/select"
import { Button } from '../ui/button';
import Image from 'next/image'

const SearchBar = ({routeType}) => {
    const router = useRouter();
    const [title,setTitle]=useState('');
    const [difficulty,setDifficulty]=useState('');
    const [tags,setTags]=useState('');

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
        <div className="flex flex-col md:w-1/3 shadow shadow-light-3 dark:shadow-white items-center justify-center h-fit p-4">
            <p className='w-full text-center mb-5'>Search Form</p>
            <div className="flex flex-col max-md:flex-col gap-3 justify-evenly md:justify-center md:w-full items-center px-1">
                <div className='flex gap-2 w-full md:flex-col'>
                    
                    {/* Question Title */}
                    <div className="flex flex-col gap-1 items-start max-md:w-1/2 w-full">
                        <p className="text-light-3">Question Title</p>
                        <Input placeholder='Search Title' onChange={(e)=> setTitle(e.target.value)} className='text-dark-1' />
                    </div>

                    {/* Difficulty */}
                    <div className='flex flex-col gap-1 items-start max-md:w-1/2'>
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
                <div className='flex w-full md:flex-col gap-5'>
                    
                    {/* Question Tags */}
                    <div className="flex flex-col gap-1 items-start max-md:w-full w-full">
                        <p className="text-light-3">Question Tags</p>
                        <Input placeholder='Search Tags' onChange={(e)=> setTags(e.target.value)} className='text-dark-1' />
                    </div>
                    {/* Reset Button */}
                    <div className="flex w-1/3 max-md:items-end justify-end md:w-full ">
                        <Button className='p-3 w-fit' onClick={()=>{setTitle("");setDifficulty('');setTags("");}}>
                            <Image src='/assets/reset.png' width={16} height={16} alt='reset'/>
                            <p className="max-md:hidden">&nbsp; Reset</p>
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
            //     <p className='max-md:hidden'>Reset</p>
            // </Button>
