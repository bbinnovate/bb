
import React from 'react'
import Navbar from '../components/Navbar'
import Firstsection from '../components/Services/Firstsection'
import SecondSection from '../components/Services/SecondSection'
import ThirdSection from '../components/Services/ThirdSection'
// import WorkCard from '../components/HomePage/WorkCard'
import Intro from "../components/Services/Intro";
import PinSection from "../components/Services/PinSection";
import SeventhSection from '../components/ServicesInternal/WebsiteDesign/SeventhSection'
import Footer from '../components/Footer'
import Taxi from '../components/Taxi'
import MobilePopup from '@/app/components/MobilePopup'
import { Metadata } from 'next'
import SmoothScroll from '../components/SmoothScroll'
import CurvedScroll from  "../components/Services/CurvedScroll"

export const metadata: Metadata = {
  title: "Digital Marketing Services in Mumbai | Bombay Blokes",
  description: "Grow your brand with Bombay Blokes — Mumbai’s trusted digital marketing agency offering SEO, performance marketing, social media, web design & content strategy that drives results.",
};

const page = () => {
  return (
    <div>

       <SmoothScroll>
       <Taxi/>
       {/* <MobilePopup/> */}
        <Navbar />
        <Firstsection />
        <SecondSection />
         {/* <CurvedScroll /> */}
        
        {/* <Intro /> */}
        {/* <PinSection /> */}
      
        <ThirdSection/>
        {/* <WorkCard/> */}
        <SeventhSection/>

       
        <Footer />
       </SmoothScroll>
    </div>
  )
}

export default page