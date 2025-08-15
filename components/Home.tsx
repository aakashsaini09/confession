import React, { useEffect, useState } from 'react'
import Card from './ui/card';
import axios from 'axios';
import { Confession } from '@/types';
// import Cards from './ui/card'
// export interface Confession {
//   _id?: string;
//   text: string;
//   likes: number;
//   dislikes: number;
//   createdAt?: Date;
// }
const HomePage = () => {
    // const confessions = [
    //     { text: "I love coding", likes: 150, dislikes: 13, date: "01-04-2024" },
    //     { text: "I was the one who left the computer on.", likes: 2, dislikes: 30, date: "22-01-2024" },
    //     { text: "The is no placements in this university. The is no placements in this university. The is no placements in this university. this is ok", likes: 10, dislikes: 13, date: "03-01-2024" },
    //     { text: "I don't like the way RK sir teaches.", likes: 73, dislikes: 13, date: "12-01-2024" },
    //     { text: "I follow only harkirat singh when it comes to coding.", likes: 20, dislikes: 3, date: "22-01-2024" },
    // ];

    const [confession, setconfession] = useState<Confession[]>([])
    const [loading, setloading] = useState(false)
    const newPost = async () => {
        setloading(true)
        const res = await axios.get("/api/confessions");
        setconfession(res.data)
        setloading(false)
    };
    useEffect(() => {
      newPost()
    }, [])
    
    return (
        <div>
        <div className='grid sm:grid-cols-1 md:grid-cols-3 gap-4 px-20 py-10'>
            {confession ? confession.map((con, index) => {
                return (
                    <div key={index}>
                        <Card data={con}/>
                    </div>
                );
            }): <div>loading</div>}
        </div>
        </div>
    );
};

export default HomePage;
