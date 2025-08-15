"use client"
import React, { useState } from 'react'
import HomePage from '@/components/Home'
import { Button } from '@/components/ui/button'
import axios from 'axios'

const Page = () => {
    const [message, setmessage] = useState("")
    const [loading, setloading] = useState(false)
    const newPost = async () => {
        setloading(true)
    await axios.post("/api/add", {
        text: message
    }, { 
        headers: {
            'Content-Type': 'application/json'
        }
    });
    alert("Posted!!")
    setmessage("")
    setloading(false)
};
  return (
    <div>
      <HomePage/>
      <textarea 
        name="" 
        id=""
        value={message}
        className='border border-black px-5 py-3 text-black font-bold'
        placeholder='Enter your amazing confession'
        onChange={(e)=> setmessage(e.target.value)}
    />
      <Button disabled={loading} className='' onClick={newPost}>Click to Post</Button>
    </div>
  )
}

export default Page
