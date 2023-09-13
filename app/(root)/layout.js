import Navbar from '@/components/shared/Navbar'
import '../globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
