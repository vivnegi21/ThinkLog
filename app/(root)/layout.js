import Navbar from '@/components/shared/Navbar'
import '../globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

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
          <section className=''>{children}</section>
        </main>
        </body>
    </html>
    </ClerkProvider>
  )
}
