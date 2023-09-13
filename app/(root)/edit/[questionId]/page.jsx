import AddQuestion from '@/components/forms/AddQuestion';
import { fetchQuestionWithID } from '@/lib/actions/questions.actions';
import { fetchUser } from '@/lib/actions/users.actions';
import { currentUser } from '@clerk/nextjs';
import React from 'react'

const page = async ({params}) => {
  const user = await currentUser();
  if(!user) return null;

  const userInfo = await fetchUser(user.id);
  if(!userInfo) redirect('/onboarding');

  if(userInfo?.onboarded==false) redirect('/onboarding');

  let question = await fetchQuestionWithID(params.questionId);

  // making tags from Array to string

  question.tags = question.tags.join(",");
  question = JSON.stringify(question);
  return(
    <div className='mt-5 flex flex-col gap-2 items-center justify-center'>
        <h2 className=" w-full text-center text-2xl">Edit Question</h2>
        <AddQuestion
          userId={JSON.stringify(userInfo._id)}
          question={question}
        />
    </div>
  )
  
}

export default page