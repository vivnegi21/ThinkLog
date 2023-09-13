import Dashboard from '@/components/shared/Dashboard';
import { fetchQuestions } from '@/lib/actions/questions.actions';
import { fetchUser } from '@/lib/actions/users.actions';
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation';
import React from 'react'
import { Table, TableHead, TableHeader, TableRow} from '../../components/ui/table';

const page = async () => {
  const user = await currentUser();
  if(!user) return null;

  const userInfo = await fetchUser(user.id);
  if(!userInfo || userInfo?.onboarding==false) redirect('/onboarding');  
  
  const questions = await fetchQuestions(userInfo._id);   //userInfo._id
  
  return (
    <div className='flex flex-col justify-between px-2 w-full '>    {/* w-4/6 when button pressed*/}
      <Table>
        <TableHeader>
            <TableRow>
            <TableHead className="w-1/12 text-start">S.No</TableHead>
            <TableHead className="w-1/3 text-start">Question</TableHead>
            <TableHead className="w-2/3 text-start">Tags</TableHead>
            <TableHead className="w-1/12 text-start">Link</TableHead>
            </TableRow>
        </TableHeader>
      </Table>
      {questions.length>0?(
      questions.map((question,index)=>{
        question = JSON.stringify(question);
        const userId = JSON.stringify(userInfo._id);
        return(
      <Dashboard 
          key={question._id}
          index={index}
          question={question}
          userId={userId}
      />
      )})
      ):(<p className='text-center mt-10'>No Data Found ,Add Questions To Your Log</p>)
      }
      
    </div>
  )
}

export default page