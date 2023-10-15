'use client'
import { navLinks } from '@/constants'
import { SignOutButton, SignedIn, useAuth, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter,usePathname } from 'next/navigation'


const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const {userId} = useAuth();
  return (
    
    <nav className='fixed top-0 z-30 flex w-full items-center justify-between px-6  py-2 max-md:py-2 bg-navbar text-white'>
      {/* LOGO */}
      <Link href='/' className='flex flex-row items-center gap-4'>
        <Image src='/assets/logo.png' width={28} height={28} alt="Logo" className=''/>
        <p className="text-white max-sm:hidden "> ThinkLog</p>
      </Link>

      {/* Navigation Link */}
      <div className='flex flex-row items-center gap-5 max-sm:mt-2'>
          {
            navLinks.map((links)=>{
              const isActive = (pathname.includes(links.route) && links.route.at.length>1) || pathname===links.route;
              if(links.route==='/profile'){
                links.route = `${links.route}/${userId}`
              }
              return (
                <Link href={links.route} key={links.label} className={`flex flex-col items-center ${isActive && "text-highlight"}`}>
                  <Image src={links.imgURL} width={24} height={24} alt={links.label}/>
                  <Image src='/assets/line.svg' alt='active_line' width={24} height={1} className={`sm:hidden -mt-3  ${!isActive && "invisible"}`}/>
                  <p className='max-sm:hidden'>{links.label}</p>
                </Link>
              )
            })
          }
      </div> 
      {/* LogOut Button */}
      <div>
      <SignedIn>
            <SignOutButton signOutCallback={()=>{
              router.push('/sign-in');
            }}>
              <div className="flex items-center cursor-pointer">
                <Image src='/assets/logout.svg' alt='logout' width={20} height={20}/>
                <p className="max-lg:hidden ">Log Out</p>
              </div>
            </SignOutButton>
          </SignedIn>
      </div>       
    </nav>
  )
}

export default Navbar
