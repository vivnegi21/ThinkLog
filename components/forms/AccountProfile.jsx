"use client"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage} from "@/components/ui/form"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import {zodResolver} from "@hookform/resolvers/zod";
import { userValidation } from "@/lib/validations/user";
import { useState } from "react"
import { isBase64Image } from "@/lib/utils"
import {useUploadThing} from '@/lib/uploadthing';
import { updateUser } from "@/lib/actions/users.actions"
import { usePathname, useRouter } from 'next/navigation';

// Component Account Profile
const AccountProfile = ({user,btnTitle}) => {

  const [files,setFiles] = useState([]);
  const {startUpload} = useUploadThing("media");
  const form= useForm({
    resolver: zodResolver(userValidation),
    defaultValues:{
      profile_photo :user?.image || "",
      name:user?.name ||'',
    }
  });
  const router = useRouter();
  const pathname = usePathname();

  const handleImage= (e,fieldChange)=>{
    e.preventDefault();
    const filereader= new FileReader();
    if(e.target.files && e.target.files.length>0){
      const file = e.target.files[0];

      setFiles(Array.from(e.target.files));
      
      if(!file.type.includes('image')) return;
      
      filereader.onload = async (event)=>{
        const imageData = event.target?.result?.toString() || '';
        fieldChange(imageData);
      }
      
      filereader.readAsDataURL(file);
    }
  } 
  // Upload form data on backend
  async function onSubmit(values)
  {
    const blob = values.profile_photo;

    const hasImageChanged = isBase64Image(blob);
    if(hasImageChanged){
      const imgRes = await startUpload(files);
      if(imgRes && imgRes[0].url){
        values.profile_photo = imgRes[0].fileUrl;
      }
    }

    // TODO: backend Function to upload user profile
    await updateUser({
      userId:user.id,
      username:user.username,
      email:user.email,
      name:values.name,
      image:values.profile_photo,
      path:pathname
    });
    if(pathname==="/profile/edit"){
        router.back();
    }else{
      router.push("/");
    }
  }

   return (
    <div className="">
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start gap-9">
      {/* Image Input FormField */}
      <FormField
        control={form.control}
        name="profile_photo"
        render={({ field }) => (
          <FormItem className='flex gap-2 items-center'>
            <FormLabel className='flex h-24 w-24 items-center justify-center rounded-full bg-dark-4 !important'>
              {field.value? (
              <Image src={field.value} alt = "profile_photo" width={96} height={96} priority className="rounded-full object-contain" />):(
              <Image src="/assets/profile.svg" alt = "profile_photo" width={24} height={24} className="object-contain" />
              )}
            </FormLabel>
            <FormControl className="flex-1 flex-col text-base-semibold text-grey-200">
              <Input
              type="file"
              accept="image/*"
              placeholder="Upload A photo"
              className="cursor-pointer border-none bg-transparent outline-none file:text-blue"
              onChange={(e)=>handleImage(e,field.onChange)}
              />
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
        />

      {/* Name Text type FormField */}
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className='flex flex-col gap-1 w-full'>
            <FormLabel className='text-base'>Full Name</FormLabel>
            <FormControl>
              <Input
              className="border border-dark-4 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
              {...field}
              />
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
      />
      
      {/* Button to submit the object */}
      <Button type="submit" className="bg-blue">{btnTitle}</Button>
    </form>
  </Form>
  </div>
   )
}

export default AccountProfile