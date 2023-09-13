import AddQuestion from "@/components/forms/AddQuestion"
import { fetchUser } from "@/lib/actions/users.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";


const Page = async () => {

  const user = await currentUser();
  if(!user) return null;
  
  const userInfo = await fetchUser(user.id);

  if(!userInfo) redirect('/onboarding')
  if(userInfo?.onboarded==false) redirect('/onboarding');

  let question ={
    _id:"",
    title: "",
    questionLink: "",
    hint: "",
    difficulty: "",
    solutionLink: "",
    tags: "",
    createdBy: {
      _id:userInfo._id,
      username:userInfo.username,
      }
  };
  question = JSON.stringify(question);
  console.log(typeof(question));
  return (
    <div className='mt-5 flex flex-col gap-2 items-center justify-center'>
        <h2 className="text-2xl">Add Question</h2>
        <AddQuestion userId={JSON.stringify(userInfo._id)} question={question}/>
    </div>
  )
}

export default Page