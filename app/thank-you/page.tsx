import React from 'react'
import Thankyou from '../components/Thankyou'
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';
import Taxi from '../components/Taxi';

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You | Bombay Blokes",
  description:
    "Thank you for reaching out to Bombay Blokes. Your submission has been received successfully and our team will get back to you shortly.",
};


const Index = () => {
  return (
    <div>
        <Taxi/>
        <Navbar />
        <Thankyou />
        <Footer />      
    </div>




    
  )
}

export default Index