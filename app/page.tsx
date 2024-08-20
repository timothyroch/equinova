import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Footer from "./_components/Footer";
import More from "./_components/More";

export default function Home() {
  return (
    <div className="relative">
<div
  className="fixed inset-0 z-[-1] bg-cover bg-center"
  style={{ backgroundImage: 'url(/v882batch2-kul-13-e.jpg)' }}
></div>
      <Header />
      <Hero />
      <ContainerScroll
  titleComponent={
    <h1 className="text-4xl font-semibold text-black dark:text-white text-center">
      Manage your Money with clarity like a professional <br />
      <span className="text-4xl md:text-[6rem] text-blue-800 font-bold mt-1 leading-none">
        Finance Advisor
      </span>
    </h1>
  }
>
  <Image
    src={`/equinova.png`}
    alt="hero"
    height={720}
    width={1400}
    className="mx-auto rounded-2xl object-cover h-full object-left-top"
    draggable={false}
  />
</ContainerScroll>
<More/>
<Footer/>
    </div>
  );
}
