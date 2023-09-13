import AccountProfile from '@/components/forms/AccountProfile'
import React from 'react'
import { currentUser } from '@clerk/nextjs'
import { fetchUser } from '@/lib/actions/users.actions';

const Page = async () => {
  const user = await currentUser();
  if(!user) return null;

  const userInfo = await fetchUser(user.id);

  const userData = {
    id:user.id,
    username:user.username,
    email:user.emailAddresses[0].emailAddress,
    name:userInfo?.name || user?.firstname || "",
    image:userInfo?.image || user.imageUrl,
  };

  return (
    <div className=" mt-16 mx-auto flex w-96 max-md:w-11/12 flex-col  gap-8 justify-start shadow-light-4 shadow p-4 rounded-xl bg-light-2 text-dark-1">
      <p className='mt-3 text-base text-center'>Complete Your Profile</p>
        <AccountProfile user={userData} btnTitle="Edit Profile" />
    </div>
  )
}

export default Page
