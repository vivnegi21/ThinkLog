import React from 'react'

const SkillsDetails = ({details}) => {

  return (
    <div className="flex flex-col gap-4 items-start shadow shadow-light-3 w-full min-h-full p-4">
      <p className='text-gray text-2xl text-center font-bold w-full font-serif'>Skills</p>
      {Object.entries(details).map((value,index)=>{
        return(
          <div className="flex-col gap-2 items-start" key={index}>
            <p key={index}>{value[0]}</p>
            <div className='flex gap-3 items-start w-full flex-wrap'>
              {
                Object.entries(value[1]).map((values, index)=>{
                  return (
                    <div className=" flex justify-center items-center gap-1" key={index}>
                      <p className='bg-navbar hover:bg-navbar/50 text-white w-fit px-2 py-1 rounded-2xl'>{values[0]}</p>
                      <span className="text-gray">x {values[1]}</span>
                    </div>
                  )
                })
              }
            </div>

          </div>
        )
      })

      }
      
    </div>
  )
}

export default SkillsDetails

// const skills = {
//   'Easy': Object.fromEntries(skillsDetails['Easy']),
//   'medium':Object.fromEntries(skillsDetails["Medium"]),
//   "hard":Object.fromEntries(skillsDetails["Hard"])

// {"Easy":{},
// "medium":{"c++":2,"java":2,"two pointer":2,"hash table":2,"python":2,"o(N)":1,"optimized":1},
// "hard":{"recursion":1,"backtracking":1,"DP":1}
// }