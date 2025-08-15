"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import Navbar from '@/components/Navbar'
import Card from '@/components/ui/card'
import { Confession } from '@/types'

const Page = () => {
    const [message, setmessage] = useState("")
    const [loading, setloading] = useState(false)
    const [confession, setconfession] = useState<Confession[]>([])
       const getAll = async () => {
           setloading(true)
           const res = await axios.get("/api/confessions");
           setconfession(res.data)
           setloading(false)
       };
       useEffect(() => {
         getAll()
       }, [])
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
    getAll()
    setmessage("")
    setloading(false)
};
  return (
    <>
    <Navbar/> 
    <div className='px-20 py-10'>
      
      <textarea 
        name="" 
        id=""
        value={message}
        className='border border-black px-5 py-3 text-black font-bold'
        placeholder='Enter your amazing confession'
        onChange={(e)=> setmessage(e.target.value)}
    />
      <Button disabled={loading} className='' onClick={newPost}>Click to Post</Button>
      <div>
        <div className='grid sm:grid-cols-1 md:grid-cols-3 gap-4'>
            {confession ? confession.map((con, index) => {
                return (
                    <div key={index}>
                        <Card data={con}/>
                    </div>
                );
            }): <div>loading</div>}
        </div>
        </div>
    </div>
    </>
  )
}

export default Page
