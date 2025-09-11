"use client"
import { Download, FileText } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const notes = [
  { title: "Mohommad Ibrahim Linux", file: "https://docs.google.com/document/d/1X-eLnrAa32QwfBz1FKx_JCaOjW-NUyhz/edit?usp=sharing&ouid=112781596509393198941&rtpof=true&sd=true" },
  { title: "Operating System", file: "/notes/physics.pdf" },
  { title: "Chemistry Notes", file: "/notes/chemistry.docx" },
  { title: "Chemistry Notes", file: "/notes/chemistry.docx" },
  { title: "Chemistry Notes", file: "/notes/chemistry.docx" },
  { title: "Chemistry Notes", file: "/notes/chemistry.docx" },
  { title: "Chemistry Notes", file: "/notes/chemistry.docx" },
  { title: "Chemistry Notes", file: "/notes/chemistry.docx" },
  { title: "Chemistry Notes", file: "/notes/chemistry.docx" },
];

export default function NotesPage() {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    console.log("file: ", file)
  };  
  return (
    <div className="mx-auto px-6 py-12 bg-black text-white h-screen w-full font-serif">
      <div className="mb-8 flex w-full justify-between items-center px-10">
        <h1 className="text-2xl font-medium cursor-pointer"><Link href={'/'}>The KUK Hub</Link></h1>
        <h1 className="text-3xl font-bold text-white">📚 Class Notes</h1>
        <span className="font-bold text-2xl text-red-900">Help</span>
      </div>
       <div className="p-4 w-full justify-center border-white text-center py-5 mb-6">
      <input type="file" accept="application/pdf" id="custom-file-input" style={{ display: 'none' }} onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <label htmlFor="custom-file-input" className="custom-file-button font-bold p-5">
        Upload Your notes here...
      </label>
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg mt-3"
      >
        Upload
      </button>
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
  );
}
