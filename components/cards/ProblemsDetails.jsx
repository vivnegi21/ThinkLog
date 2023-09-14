'use client'
import React, { useState } from 'react'
import { Progress } from '../ui/progress';

const ProblemsDetails = ({details}) => {
  const [circleVal,setCircleVal] = useState(details.len);
  return (
    <div className='flex-col shadow shadow-light-3 items-center justify-center h-full'><p className='w=full text-center my-4 '>Problems Solved</p>
    <div className='flex flex-row gap-6 p-3 '>
      <p className='flex w-20 h-20 items-center justify-center border border-light-4 rounded-full text-2xl text-center'>
          {circleVal}
      </p>
      <div className="flex flex-col gap-4 items-start justify-start h-full w-2/3">

        <div
          className="flex-col gap-2 items-start w-full"
          onMouseOver={()=>setCircleVal(details.category['Easy'])}
          onMouseLeave={()=>setCircleVal(details.len)}>
          <p className='text-md'>Easy Problems: {details.category['Easy']}</p>
          <Progress value={details.category['Easy']*100/details.len} className="w-full" />
        </div>

        <div
          className="flex-col gap-2 items-start w-full"
          onMouseOver={()=>setCircleVal(details.category['Medium'])}
          onMouseLeave={()=>setCircleVal(details.len)}>

          <p className='text-md'>Medium Problems: {details.category['Medium']}</p>
          <Progress value={details.category['Medium']*100/details.len} className="w-full" />
        </div>

        <div
          className="flex-col gap-2 items-start w-full"
          onMouseOver={()=>setCircleVal(details.category['Hard'])}
          onMouseLeave={()=>setCircleVal(details.len)}>

          <p className='text-md'>Hard Problems: {details.category['Hard']}</p>
          <Progress value={details.category['Hard']*100/details.len} className="w-full" />
        </div>
      </div>
    </div>
    </div>
  )
}

export default ProblemsDetails
