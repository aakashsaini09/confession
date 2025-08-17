import React from 'react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import Card from '@/components/ui/card'
import { Confession } from '@/types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
const Confessions = () => {
    const [message, setmessage] = useState("")
    const [loading, setloading] = useState(false)
    const [confession, setconfession] = useState<Confession[]>([])
    const [filter, setFilter] = useState<"new" | "liked">("new");
    const filteredConfessions = [...confession].sort((a, b) => {
    if (filter === "liked") {
      return b.likes - a.likes;
    }
    return new Date(b.createdAt ?? "").getTime() - new Date(a.createdAt ?? "").getTime();
  });
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
        try {

          const res = await axios.post("/api/add", {
              text: message
          }, { 
              headers: {
                  'Content-Type': 'application/json'
              }
          });
          console.log("res: ", res)
        } catch (error) {
          console.log("Error while uploading (frontend): ", error)
        }
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
        <div className='flex justify-between'>
          <Button disabled={loading} className='my-2' onClick={newPost} >Confess</Button>
          <Select onValueChange={(value) => setFilter(value as "new" | "liked")}>
            <SelectTrigger className="w-[100px] md:w-[150px] my-auto">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New First</SelectItem>
              <SelectItem value="liked">Most Liked</SelectItem>
            </SelectContent>
          </Select>
        </div>
      <div>
        <div className='grid sm:grid-cols-1 md:grid-cols-3 gap-4'>
{filteredConfessions.length > 0 ? (
        filteredConfessions.map((con, index) => (
          <div key={con._id ?? index}>
            <Card data={con} />
          </div>
        ))
      ) : (
        <div>Loading…</div>
      )}
        </div>
      </div>
    </div>
    </>
  )
}
export default Confessions
