import Dashboard from '@/components/shared/Dashboard';
import { fetchQuestions, searchQuestions } from '@/lib/actions/questions.actions';
import { fetchUser } from '@/lib/actions/users.actions';
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation';
import React from 'react'
import { Table, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import SearchBar from '@/components/shared/SearchBar';

const page = async ({searchParams}) => {
  const user = await currentUser();
  if(!user) return null;

  const userInfo = await fetchUser(user.id);
  if(!userInfo || userInfo?.onboarding==false) redirect('/onboarding');  
  
  const questions = await searchQuestions({
    title:searchParams.title,
    difficulty:searchParams.difficulty,
    tags:searchParams.tags,
  });   //userInfo._id
  
  return (
    <div className='flex flex-row items-start w-full mt-4 max-lg:flex-col-reverse gap-3 max-lg:gap-6 no-scrollbar '>    {/* w-4/6 when button pressed*/}
        <div className='flex-col justify-start px-2 w-2/3 max-lg:w-full'>
        <Table className=''>
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
        ):(<p className='text-center mt-10'>No Data found similar to searched tags inserted to Website , Add Questions To Your Log</p>)
      }

      </div>
      <hr className='border border-white w-11/12 my-3 lg:hidden m-auto'/>
     
        <SearchBar routeType='search'/>
      
    </div>
  )
}

export default page