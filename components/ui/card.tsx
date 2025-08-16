import React, { useState } from 'react'
import img from '@/public/img2.png'
import Image from 'next/image'
import { Confession } from '@/types'
import { formatDistanceToNow, format, differenceInMinutes, differenceInHours } from "date-fns";
import axios from 'axios';
const Card = ({ data }: { data: Confession }) => {
  const fullText = data?.text ?? ''
  const isLong = fullText.length >= 115
  const preview = isLong ? fullText.slice(0, 114) + '…' : fullText
  const [liked, setliked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [likes, setLikes] = useState(data.likes);       // keep local count
  const [dislikes, setDislikes] = useState(data.dislikes);

  const handleReadMore = () => {
    window.dispatchEvent(new CustomEvent('confession:open', { detail: data }))
  }

  function dateFormater(
    input: string | Date | { createdAt: string } | undefined | null
  ): string {
    if (!input) return '';

    let dateObj: Date | null = null;

    if (input instanceof Date) {
      dateObj = input;
    } else {
      const createdAt = typeof input === 'string' ? input : input?.createdAt;
      if (!createdAt) return '';
      dateObj = new Date(createdAt);
    }

    const minutesDiff = differenceInMinutes(new Date(), dateObj);
    const hoursDiff = differenceInHours(new Date(), dateObj);

    if (minutesDiff < 60) {
      return formatDistanceToNow(dateObj, { addSuffix: true }); // "5 minutes ago"
    }

    if (hoursDiff < 24) {
      // Show in hours if less than a day old
      return formatDistanceToNow(dateObj, { addSuffix: true }); // "5 hours ago"
    }

    // Otherwise show full date
    return format(dateObj, 'hh:mma MMM yyyy');
  }
  const finalValue = dateFormater(data.createdAt)
  const likeDislikeFunction = async (id: string, operation: boolean, e?: React.MouseEvent<HTMLDivElement>) => {
    e?.preventDefault();
    let newLikes = likes;
    let newDislikes = dislikes;

    if (operation) {
      // 👍 User clicked Like
      if (liked) {
        // undo like
        newLikes -= 1;
        setliked(false);
      } else {
        // add like
        newLikes += 1;
        setliked(true);

        // if previously disliked, undo dislike
        if (disliked) {
          newDislikes -= 1;
          setDisliked(false);
        }
      }
    } else {
      // 👎 User clicked Dislike
      if (disliked) {
        // undo dislike
        newDislikes -= 1;
        setDisliked(false);
      } else {
        // add dislike
        newDislikes += 1;
        setDisliked(true);

        // if previously liked, undo like
        if (liked) {
          newLikes -= 1;
          setliked(false);
        }
      }
    }

    // Update UI immediately
    setLikes(newLikes);
    setDislikes(newDislikes);

    // Send update to backend
    try {
      const res = await axios.put(`/api/like-dislike/${id}`, { operation });
      if (res.status !== 200) {
        console.error("API error:", res);
        // optional: rollback if API fails
      }
    } catch (err) {
      console.error("Request failed:", err);
    }
  };
  return (
    <>

      <a href="#" className="flex flex-col bg-white border border-gray-900 rounded-lg shadow-sm md:flex-row sm:max-w-lg md:max-w-xl sm:h-36 md:h-52 hover:bg-gray-100">
        <div className="flex flex-col justify-between p-4 leading-normal">
          <div className='flex items-center gap-3'>
            <Image className='w-14 h-14 bg-transparent border-1 border-black rounded-full' src={img} alt='not found' /><h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Annonymous</h5>
          </div>
          <p className="min-h-24 py-2 font-normal text-gray-900">
            {preview}{' '}
            {isLong && (
              <button
                type="button"
                onClick={handleReadMore}
                className="text-blue-600 hover:underline"
              >
                Read more
              </button>
            )}
          </p>
          <div className='w-full flex gap-5'>
            {liked ? 
             <div className='flex gap-1'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
            </svg>{likes}
            </div>
            : 
            <div className='flex gap-1' onClick={(e) => likeDislikeFunction(data._id, true, e)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
              </svg>{likes}
            </div>
            }
            {disliked ?
            <div className='flex gap-1'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path d="M15.73 5.5h1.035A7.465 7.465 0 0 1 18 9.625a7.465 7.465 0 0 1-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 0 1-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.499 4.499 0 0 0-.322 1.672v.633A.75.75 0 0 1 9 22a2.25 2.25 0 0 1-2.25-2.25c0-1.152.26-2.243.723-3.218.266-.558-.107-1.282-.725-1.282H3.622c-1.026 0-1.945-.694-2.054-1.715A12.137 12.137 0 0 1 1.5 12.25c0-2.848.992-5.464 2.649-7.521C4.537 4.247 5.136 4 5.754 4H9.77a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23ZM21.669 14.023c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.958 8.958 0 0 1-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227Z" />
              </svg> {dislikes}
              </div> :
              <div className='flex gap-1' onClick={(e) => likeDislikeFunction(data._id, false, e)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54" />
                </svg> {dislikes}
              </div> 
            }
            <div className='text-[15px] md:text-[18px] capitalize'>
              • {finalValue}
            </div>
          </div>
        </div>
      </a>

    </>
  )
}

export default Card
