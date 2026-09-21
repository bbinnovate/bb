import React from 'react'
import Navbar from '../components/Navbar'
import Firstsection from '@/app/components/ClientRegistration/Firstsection'
import SecondSection from '../components/ClientRegistration/SecondSection'
// import Testimonials from '../components/Testimonials'
import SeventhSection from '../components/ServicesInternal/WebsiteDesign/SeventhSection'
import Footer from '../components/Footer'
// import ClientScripts from '../components/ClientScripts'
import Taxi from '../components/Taxi'
import MobilePopup from '../components/MobilePopup'
import SmoothScroll from '../components/SmoothScroll'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Connect with Us | Bombay Blokes",
  description: "Can't reach us? Want to connect? Fill the form and we will reach out to you soon!",
};
const Index = () => {
  return (
    <div>
      {/* <ClientScripts/> */}
       {/* <MobilePopup/> */}
       <SmoothScroll> 
        <Taxi/>
        <Navbar />
        <Firstsection/>
        <SecondSection/>
        {/* <Testimonials/> */}
        <SeventhSection/>
        <Footer />
       </SmoothScroll>
    </div>
  )
}

export default Index