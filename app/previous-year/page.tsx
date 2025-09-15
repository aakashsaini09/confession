"use client"
import Link from 'next/link';
import React, { useEffect } from 'react'
import { Download, FileText } from "lucide-react";

const Page = () => {
   useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.style.scrollBehavior = "smooth";
    }
  }, []);

const semesters = [
    {
      id: "sem1",
      name: "1st Sem",
      subjects: [
        { name: "Linux OS", link: "https://drive.google.com/file/d/1_o7XjNlukfu3-KksATsZUlFOWEj0kZF_/view?usp=sharing" },
        { name: "Client Side Web", link: "https://drive.google.com/file/d/1ogod1rxqknTPQYKjX8VM6M_p9_aGjTK1/view?usp=sharing" },
        { name: "Computer Fundamentals", link: "https://drive.google.com/file/d/1vP0euYgdMn89o_HXIRRwrE8Y9tbA0YIO/view?usp=sharing" },
        { name: "Data Structure", link: "https://drive.google.com/file/d/1Rm_LmjrqQ4rcpVTDT1MXA1xdYBa9l7p0/view?usp=sharing" },
        { name: "Programming in Java", link: "https://drive.google.com/file/d/1hyMSUmjj1equwjoVdf-TOd1Y6G0R_HZm/view?usp=sharing" },
      ],
    },
    {
      id: "sem2",
      name: "2nd Sem",
      subjects: [
        { name: "Advance Database System", link: "https://drive.google.com/file/d/1GpKPFz7OVQ77pM64-wJUafB-1VJEKWCd/view?usp=sharing" },
        { name: "Compiler Design", link: "https://drive.google.com/file/d/1R7XPrO6RQjm4n--x496M3i4E72Fp-3Jp/view?usp=sharing" },
        { name: "Linux and Shell Programming", link: "https://drive.google.com/file/d/1QBV-DsJEPWIGyrY4PzgNTOpSYM2vEGtM/view?usp=sharing" },
        { name: "Principles of Programming", link: "https://drive.google.com/file/d/1prvuU3JGQ_e5MzARoc06WipINf9EYab3/view?usp=sharing" },
        { name: "Security in Computing", link: "https://drive.google.com/file/d/10A2TlxhXT4DsELTCMhq4d1rjOhklyPEV/view?usp=sharing" },
        { name: "Web Technology", link: "https://drive.google.com/file/d/1b08dvFxs3wjWMwY2VKlMhCSVb_hrtbvd/view?usp=sharing" },
        { name: "Theory of Computation", link: "https://drive.google.com/file/d/1g97s-7gikG94AG5kJ_Tbdfz1oYQll3Ky/view?usp=sharing" },
        { name: "Design and Analysis of Algo", link: "https://drive.google.com/file/d/1ATOkjxVW65nnR3_vxrDc8-Vzwo_L_Byb/view?usp=sharing" },
      ],
    },
    {
      id: "sem3",
      name: "3rd Sem",
      subjects: [
        { name: "Advance Web Technologies", link: "https://drive.google.com/file/d/1-5O6_XWbHNDhiXwoisGCpa0RPqK_GZyv/view?usp=sharing" },
        { name: "Advances in JAVA", link: "https://drive.google.com/file/d/1_zE186fV8Z_BZeqCPOYlCXXIudN_VvBN/view?usp=sharing" },
        { name: "Artificial Intelligence", link: "https://drive.google.com/file/d/1m_P_1juJIew0Bh5uLLnBf4n9mED2nJWy/view?usp=sharing" },
        { name: "Cloud Computing", link: "https://drive.google.com/file/d/1KgGe3T4MJKvpwSGyeqJB05n0XmefQUDq/view?usp=sharing" },
        { name: "Cyber Security", link: "https://drive.google.com/file/d/1izfFDBqu0lCUCyioQjLIVqnD_YOrwNp7/view?usp=sharing" },
        { name: "Data Mining", link: "https://drive.google.com/file/d/1qKT6knWk7ZzkNTPpQL9wERcPlez93OXh/view?usp=sharing" },
        { name: "Programming in Kotlin", link: "https://drive.google.com/file/d/1PSsmC1IW8Uoe6s-D864i47wkJlaOEWWT/view?usp=sharing" },
        { name: "Digital Marketing", link: "https://drive.google.com/file/d/1baDDE_OGjf5CTf_uoSB6Tf6iR3n7GG31/view?usp=sharing" },
        { name: "Computer Architecture", link: "https://drive.google.com/file/d/1sYtGeiM9dAiMQXKCizyiXquuYgO4qaG4/view?usp=sharing" },
      ],
    },
    {
      id: "sem4",
      name: "4th Sem",
      subjects: [
        { name: "Big Data and Pattern Recognition", link: "https://drive.google.com/file/d/1yn_zkEQtXfZyI4wpi7qOdq9c8dcdCDgj/view?usp=sharing" },
        { name: "Blockchain Technology", link: "https://drive.google.com/file/d/1fV3eCnKAxpK19KZP-CHDhy1lAmuaGwn7/view?usp=sharing" },
        { name: "Computer Graphics and Animations", link: "https://drive.google.com/file/d/1LC4hfdtPiJHJJlYkqVmVoQ6oiD0uUM8Q/view?usp=sharing" },
        { name: "Information Systems", link: "https://drive.google.com/file/d/14dVmfZK8ITwA05KrR71rQB-HsFnz90eK/view?usp=sharing" },
        { name: "Machine Learning", link: "https://drive.google.com/file/d/1L9BOscupiwvNDtOXIgnz_haVq0yWDvKz/view?usp=sharing" },
        { name: "Mobile Application", link: "https://drive.google.com/file/d/1gCikkDkfjsYNxCwDapVcTgQs-upKWiH9/view?usp=sharing" },
        { name: "Soft Computing", link: "https://drive.google.com/file/d/1Iex84FNK-6y5y4TQOEv8AcyFrR8SwapA/view?usp=sharing" },
      ],
    },
  ];

  // Example subjects (replace or extend as needed)
  // const subjects = ["Mathematics", "Data Structures", "Operating Systems", "DBMS", "Java Programming", "Linux OS"];
  return (
    <>
    <div className="min-h-screen bg-black text-gray-100 font-mono">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 shadow-md py-4 bg-black/50 p-4 md:px-6 backdrop-blur mb-0 ">
        <div className="max-w-5xl mx-auto flex justify-between items-center px-4 py-1">
          <Link href={'/'} className="text-xl font-bold text-gray-200">The KUK Hub</Link>
          <div className="flex gap-5 flex-wrap">
            {semesters.map((sem) => (
              <a
                key={sem.id}
                href={`#${sem.id}`}
                className="px-3 py-1 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-500 transition"
              >
                {sem.name}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-16">
        <h1 className='font-bold text-4xl font-mono text-blue-600 text-center'>MCA Question Papers</h1>
        {semesters.map((sem) => (
          <section key={sem.id} id={sem.id} className="scroll-mt-20">
          <hr className='my-12 border border-gray-200' />
            <h2 className="text-3xl font-bold text-gray-100 mb-6 mt-16">
              {sem.name} - Previous Year Papers
            </h2>

            {/* 2024 Papers */}
            <div className="mb-10">
              <h3 className="text-lg font-medium text-gray-300 mb-4">2024</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {sem.subjects.map((subj, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-[#110f0f] rounded-xl shadow hover:shadow-lg hover:bg-[#1a1717] transition"
                  >
                    <p className="font-medium text-gray-100 mb-2 gap-1 flex"><FileText/>{subj.name}</p>
                    <a
                      href={subj.link}
                      target='_blank'
                      className="flex py-3  px-3 text-center items-center justify-center gap-3 bg-green-600 text-white rounded-lg text-md font-semibold hover:bg-green-500"
                    >
                      Download <Download/>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* 2023 Papers */}
            {/* <div>
              <h3 className="text-lg font-medium text-gray-300 mb-4">2023</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {sem.subjects.map((subj, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-[#110f0f] rounded-xl shadow hover:shadow-lg hover:bg-[#1a1717] transition"
                  >
                    <p className="font-medium text-gray-100 mb-2 gap-1 flex"><FileText/>{subj.name}</p>
                    <a
                      href={subj.link}
                      className="flex py-3  px-3 text-center bg-green-600 text-white rounded-lg text-sm hover:bg-green-500"
                    >
                      Download
                    </a>
                  </div>
                ))}
              </div>
            </div> */}
          </section>
        ))}
      </main>
    </div>
    </>
  )
}

export default Page
