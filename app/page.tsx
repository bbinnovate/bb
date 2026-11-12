
import Navbar from "./components/Navbar";
import Firstsection from "./components/HomePage/Firstsection";
import SecondSection from "./components/HomePage/SecondSection";
import StudioSection from "./components/HomePage/StudioSection"
import PaperGun from "./components/HomePage/PaperGun"
import ThirdSection from "./components/HomePage/ThirdSection";
import WorkCard from "./components/HomePage/WorkCard";
import PerformanceROI from "./components/HomePage/PerformanceROI"
import BombAISection from "./components/HomePage/BombAISection";
import RubberSection from "./components/HomePage/RubberSection";
import CardCarousel from "./components/HomePage/CardCarousel";
// import Testimonials from "@/app/components/Testimonials";
import SeventhSection from "./components/ServicesInternal/WebsiteDesign/SeventhSection";
import Footer from "./components/Footer";
import Taxi from "./components/Taxi";
import MobilePopup from "./components/MobilePopup";
// import ClientScripts from "./components/ClientScripts";

import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Mumbai’s leading Digital Marketing Agency | Bombay Blokes",
  description: "Looking for a Digital Marketing agency in Mumbai? Want a partner that's dedicated to your success? Choose Bombay Blokes for customized and result-driven Digital Solutions. Visit us now!",
  openGraph: {
    title: "Bombay Blokes",
    description:
      "Mumbai’s leading Digital Marketing Agency | Bombay Blokes.",
    url: "https://bombayblokes.com",
    siteName: "Bombay Blokes",
    images: [
      {
        url: "https://blokesarea.com/wp-content/uploads/favicon.png", // IMPORTANT
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};
export default function Home() {
  return (
    <div>
      {/* <ClientScripts/> */}
      <Taxi/>
      {/* <MobilePopup/> */}
      <Navbar />
      <Firstsection/>
      <SecondSection/>
      <PaperGun />
      {/* <ThirdSection/> */}
      <WorkCard />
      <StudioSection/>
      {/* <PerformanceROI/> */}
      <BombAISection/>
      <RubberSection/>
      {/* <CardCarousel/> */}
      {/* <Testimonials/> */}
      <SeventhSection/>
      <Footer />
    </div>
    
  );
}
