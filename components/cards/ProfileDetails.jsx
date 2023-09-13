'use client'
import React from 'react'
import { Button } from '../ui/button';
import Image from 'next/image'
import { useRouter } from 'next/navigation';

const ProfileDetails = ({isSelf,userDetails}) => {
  const router = useRouter();

  return (
    <div className='flex flex-col gap-6 p-5 shadow shadow-light-4 items-start justify-center'>
      <p className='text-center w-full mb-2'>Profile Details</p>
      <div className="flex flex-row gap-2">
        <div className='h-32 w-32 items-center justify-center rounded-lg'>
          <Image src={userDetails.profile_photo} width={500} height={500} alt='profile_pic' className='h-32 w-32 rounded-lg'/>
        </div>
        <div className='ml-4'>
          <p className=''>{userDetails.name}</p>
          <p className=' text-gray'>@{userDetails.username}</p>
        </div>
      </div>
      <p className=''>Email: {userDetails.email}</p>
      {/* edit BUtton */}
      {(isSelf)?(
        <Button onClick={()=>{console.log('button pressed');router.push('/profile/edit')}} className='bg-navbar text-white font-bold w-full'>Edit Profile</Button>
      ):(<p></p>)

      }
    </div>
  )
}

export default ProfileDetails
