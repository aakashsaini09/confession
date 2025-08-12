import React from 'react'
import Card from './ui/card';
// import Cards from './ui/card'
export interface confessionType{
    text: string;
    likes: number;
    dislikes: number;
    date: string

}
const HomePage = () => {
    const confessions = [
        { text: "I love coding", likes: 150, dislikes: 13, date: "01-04-2024" },
        { text: "I was the one who left the computer on.", likes: 2, dislikes: 30, date: "22-01-2024" },
        { text: "The is no placements in this university.", likes: 10, dislikes: 13, date: "03-01-2024" },
        { text: "I don't like the way RK sir teaches.", likes: 73, dislikes: 13, date: "12-01-2024" },
        { text: "I follow only harkirat singh when it comes to coding.", likes: 20, dislikes: 3, date: "22-01-2024" },
    ];

    return (
        <div className='grid sm:grid-cols-1 grid-cols-3 gap-4'>
            {confessions.map((con, index) => {
                return (
                    <div key={index}>
                        <Card data={con}/>
                    </div>
                );
            })}
        </div>
    );
};

export default HomePage;
