"use client"
import Link from 'next/link';
import React from 'react'
import { Download, FileText } from "lucide-react";
const notes = [
  { title: "Mohommad Ibrahim Linux", file: "https://docs.google.com/document/d/1X-eLnrAa32QwfBz1FKx_JCaOjW-NUyhz/edit?usp=sharing&ouid=112781596509393198941&rtpof=true&sd=true" },
  { title: "Operating System",file: "https://docs.google.com/document/d/1X-eLnrAa32QwfBz1FKx_JCaOjW-NUyhz/edit?usp=sharing&ouid=112781596509393198941&rtpof=true&sd=true" },
  { title: "Chemistry Notes", file: "https://docs.google.com/document/d/1X-eLnrAa32QwfBz1FKx_JCaOjW-NUyhz/edit?usp=sharing&ouid=112781596509393198941&rtpof=true&sd=true" },
  { title: "Chemistry Notes", file: "https://docs.google.com/document/d/1X-eLnrAa32QwfBz1FKx_JCaOjW-NUyhz/edit?usp=sharing&ouid=112781596509393198941&rtpof=true&sd=true" },
  { title: "Chemistry Notes", file: "https://docs.google.com/document/d/1X-eLnrAa32QwfBz1FKx_JCaOjW-NUyhz/edit?usp=sharing&ouid=112781596509393198941&rtpof=true&sd=true" },
  { title: "Chemistry Notes", file: "https://docs.google.com/document/d/1X-eLnrAa32QwfBz1FKx_JCaOjW-NUyhz/edit?usp=sharing&ouid=112781596509393198941&rtpof=true&sd=true" },
  { title: "Chemistry Notes", file: "https://docs.google.com/document/d/1X-eLnrAa32QwfBz1FKx_JCaOjW-NUyhz/edit?usp=sharing&ouid=112781596509393198941&rtpof=true&sd=true" },
  { title: "Chemistry Notes", file: "https://docs.google.com/document/d/1X-eLnrAa32QwfBz1FKx_JCaOjW-NUyhz/edit?usp=sharing&ouid=112781596509393198941&rtpof=true&sd=true" },
  { title: "Chemistry Notes", file: "https://docs.google.com/document/d/1X-eLnrAa32QwfBz1FKx_JCaOjW-NUyhz/edit?usp=sharing&ouid=112781596509393198941&rtpof=true&sd=true" },
];
const Page = () => {

  return (
    <>
      <div className="mx-auto px-6 py-12 bg-black text-white h-screen w-full font-serif">
      <div className="mb-8 flex w-full justify-between items-center px-10">
        <h1 className="text-2xl font-medium cursor-pointer"><Link href={'/'}>The KUK Hub</Link></h1>
        <h1 className="text-3xl font-bold text-white">📚 MCA Previous Year Papers </h1>
        <span className="font-bold text-2xl text-red-900">Help</span>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 container mx-auto">
        {notes.map((note, index) => (
          <div
            key={index}
            className="bg-gray-600 p-6 rounded-2xl shadow-md hover:shadow-xl transition border flex flex-col justify-between"
          >
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-semibold">{note.title}</h2>
            </div>

            <a href={note.file} download target="_blank" className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
              <Download className="w-4 h-4" />
              Download
            </a>
          </div>
        ))}
      </div>
     
    </div>
    </>
  )
}

export default Page
