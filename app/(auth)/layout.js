import React from "react";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "@/app/globals.css";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata= {
  title: "Auth",
  description: "Generated by create next app",
};

export default function RootLayout({children}) {
  return (
    <ClerkProvider>
      <html lang='en'>
      <body className={`${inter.className}`}>
        <main className='flex min-h-screen flex-1 flex-row max-md:flex-col items-center justify-center pb-10 pt-16 max-md:pb-32 px-10  max-md:gap-5'>
          {/* LeftSection */}
          <section className="flex flex-col gap-2 items-start justify-center py-2 px-4 max-md:mt-16">
            <div className="flex flex-row gap-2 items-start justify-center">
              <Image src='/assets/logo.png' width={60} height={60} alt="logo"/>
              <h1 className="text-5xl flex gap-3">Think<span className="text-navbar">Log</span></h1>
            </div>
            <h2 className="text-2xl mt-3">Creating a <span className="text-navbar">centralized repository</span> for your DSA problems and solutions
            is an ideal way to consolidate and facilitate <span className="text-navbar">easy revision</span> in the future.</h2>
          </section>
          {/* RightLogInSection */}
          <section className=' max-md:mt-52'>{children}</section>
        </main>
      </body>
      </html>
    </ClerkProvider>
  );
}