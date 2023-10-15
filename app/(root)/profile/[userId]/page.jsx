import ProblemsDetails from "@/components/cards/ProblemsDetails";
import ProfileDetails from "@/components/cards/ProfileDetails";
import SkillsDetails from "@/components/cards/SkillsDetails";
import { fetchUser, fetchUserWithQuestions } from "@/lib/actions/users.actions";
import { currentUser } from "@clerk/nextjs";
import { EventTypeExampleOut } from "svix";

const page = async ({params}) => {
    //user auth
    let user = await currentUser();
    if(!user) return null;
    const userInfo = await fetchUser(user.id);
    if(!userInfo || userInfo?.onboarding==false) redirect('/onboarding');

    //fetching user details from mongo
    const paramsInfo=await fetchUserWithQuestions(params.userId);

    //To show Edit Button in card
    let selfProfile= false;
    if(user.id===params.userId) selfProfile=true;

    //fetching questions from user's Id
    let questions = paramsInfo?.userQuestions;

    // Params Account Details Card
    const userDetails = {
      username:paramsInfo.username,     
      name:paramsInfo.name,
      email:paramsInfo.email,
      profile_photo:paramsInfo.image,
    }

    
    //params for ProblemsDetails Card
    let category={'Easy':0,'Medium':0,'Hard':0};
    questions.forEach(({difficulty,...rest})=>{
      category[difficulty]++;
    });
    
    const problemDetails = {len: questions.length,category};
    

    //params for SkillsDetails Card
    let skillsDetails = {'Easy':new Map(),'Medium': new Map(),'Hard':  new Map()};
    
    questions.forEach((question)=>{

      const diff= question.difficulty;

      question.tags.forEach((tag)=>{

        if(skillsDetails[diff].has(tag)){

          const num=skillsDetails[diff].get(tag);
          skillsDetails[diff].set(tag,num+1);
        }
        else{
          skillsDetails[diff].set(tag,1);
        }
      })
    });

    //converting Map to Array of Objects
    const skills = {
      'Easy': Object.fromEntries(skillsDetails['Easy']),
      'medium':Object.fromEntries(skillsDetails["Medium"]),
      "hard":Object.fromEntries(skillsDetails["Hard"])
    }

    
    return (
      <div className="flex  h-full  m-4 gap-3 max-md:flex-col ">
        <div className="flex flex-col gap-5">
        {/* Profile Detail */}
          <ProfileDetails isSelf={selfProfile} userDetails={userDetails}/>
        {/* Problems Detail */}
          <ProblemsDetails details={problemDetails} />
        </div>

        <div className='w-full'>
        <SkillsDetails details={skills}/>
        </div> 
      </div>
  )
}

export default page