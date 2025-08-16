import React from 'react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import Card from '@/components/ui/card'
import { Confession } from '@/types'
const Confessions = () => {
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
      <div className='px-[12px] py-[6px] sm:px-8 sm:pb-4 md:px-20 md:pb-10'>
      <textarea 
        name="" 
        id=""
        value={message}
        className='border border-black px-2 py-3 text-black font-medium rounded-xl w-full'
        placeholder='Enter your amazing confession'
        onChange={(e)=> setmessage(e.target.value)}></textarea>
      <Button disabled={loading} className='my-2' onClick={newPost} >Confess</Button>
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

export default Confessions
