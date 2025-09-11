"use client"
import { Download, FileText } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useEdgeStore } from '@/lib/edgestore';
import axios from "axios";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
export interface responseFromEdgeStore {
  title?: string,
  url: string,
  size: number,
  thumbnail?: File,
  updatedAt?: string
}


export default function NotesPage() {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [loading, setloading] = useState(false);
  const [notes, setNotes] = useState<responseFromEdgeStore[]>([])
  const [Progress, setProgress] = useState(0)
  const [title, settitle] = useState("")
  const saveToMongo = (res: responseFromEdgeStore) => {
    setloading(true)
    newPost(res)
    console.log("response is: ", res)
  }
  const newPost = async (response: responseFromEdgeStore) => {
    setloading(true)
    if (title.length < 5) {
      alert("Title must have atleast 5 character")
      setloading(false)
    } else {
      try {
        const res = await axios.post("/api/upload-notes", 
          { title: title, url: response.url, size: response.size }, { headers: { 'Content-Type': 'application/json' } });
        console.log("res: ", res)
        setloading(false)
        settitle("")
        setFile(undefined)
        setProgress(0);
        getAll()
        document.getElementById("closeBtn")?.click()
      } catch (error) {
        console.log("Error while uploading (frontend): ", error)
        setloading(false)
        setProgress(0);
      }
    }
  }
  const getAll = async () => {
    setloading(true)
    const res = await axios.get("/api/notes");
    console.log(res.data)
    setNotes(res.data)
    setloading(false)
  };
  useEffect(() => {
    getAll()
  }, [])
  return (
    <div className="mx-auto px-6 py-12 bg-black text-white h-auto w-full font-serif">
      <div className="mb-8 flex w-full justify-between items-center px-10">
        <h1 className="text-2xl font-medium cursor-pointer"><Link href={'/'}>The KUK Hub</Link></h1>
        <h1 className="text-3xl font-bold text-white">📚 Class Notes</h1>
        <span className="font-bold text-2xl text-red-900">Help</span>
      </div>
      <div className="w-full">
        <div className="w-full flex justify-center items-center">
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <Button variant="outline" className="my-10">Upload Notes <FileText className="w-6 h-6 text-white" /></Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-accent">
                <DialogHeader>
                  <DialogTitle>Upload Notes</DialogTitle>
                  <DialogDescription>
                    Please make sure to add relevent title.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="name-1">File</Label>
                    <Input id="name-1" name="name" type="file" className="mx-2" onChange={(e) => { setFile(e.target.files?.[0]); }} />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="username-1">Title</Label>
                    <Input id="username-1" name="username" value={title} onChange={e => settitle(e.target.value)} />
                  </div>
                  {loading ? <div className="h-[8px] w-44 border border-white flex rounded my-6 text-center mx-auto">
                    <div style={{ width: `${Progress}%` }} className="h-full bg-white transition-all duration-150"></div>
                  </div>: <></>}
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button id="closeBtn" variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={async () => {
                    if (file) {
                      const res = await edgestore.publicFiles.upload({
                        file, onProgressChange: (progress) => { setProgress(progress) },
                      });
                      saveToMongo(res)
                    } }}>Upload</Button>    
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        </div>
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
            <a href={note.url} download target="_blank" className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
              <Download className="w-4 h-4" />
              Download
            </a>
          </div>
        ))}
      </div>

    </div>
  );
}
