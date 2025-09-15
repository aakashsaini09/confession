"use client"
import { Button } from '@/components/ui/button'
import React from 'react'

const Page = () => {
  function copyFunction(){
    navigator.clipboard.writeText("kukuniversity009@gmail.com");
    alert("Gmail copied.  ")
  }
  return (
    <div className='h-screen flex flex-col font-bold text-3xl justify-center items-center'>
      <h1 className='py-5'>Working on it...</h1>
      <h2 className='text-xl text-gray-200 font-medium my-4'>Looking for a UI/UX guy</h2>
      <Button className='py-5 cursor-pointer' onClick={copyFunction}>Lets Connect</Button>
    </div>
  )
}

export default Page
