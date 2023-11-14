import Navbar from '@/components/shared/Navbar'
import '../globals.css'
import { Inter } from 'next/font/google'
import { ClerkLoaded, ClerkLoading, ClerkProvider } from '@clerk/nextjs'
import Image from 'next/image'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Think Log',
  description: 'ThinkLog is not just another note-taking app; it is a strategic partner in your personal growth and development journey. Whether you are a student, a professional, or a problem solver, ThinkLog simplifies the process of capturing, categorizing, and retrieving your valuable insights. Its your digital thinking assistant, always at your service.',
  icons: {
    icon: '/assets/logo.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    
    <html lang="en">
      <body className={`${inter.className}`}>
        <Navbar/>
        <main className='flex min-h-screen flex-1 flex-col pb-10 pt-16 max-md:pb-32 sm:px-10'>
          <ClerkLoading>
            <div className='w-fit h-fit m-auto '>
              <Image src='/assets/loading.svg' width={300} height={300} alt='loading page' className='bg-none'/>
            </div>
          </ClerkLoading>
          <ClerkLoaded>
            <section className='h-min-screen'>{children}</section>
          </ClerkLoaded>
        </main>
        </body>
    </html>
    </ClerkProvider>
  )
}
