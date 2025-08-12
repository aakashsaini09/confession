import HomePage from "@/components/Home";
import Navbar from "@/components/Navbar";
// import { Button } from "@/components/ui/button";
// import Card from "@/components/ui/card";

export default function Home() {
  return (
    <>
    <section className="container sm:px-4 md:px-40">
        <Navbar/>
        <HomePage/>
    </section>
    </>
  );
}
