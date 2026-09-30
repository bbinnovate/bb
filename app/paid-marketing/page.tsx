import { SiteNav } from "@/app/components/ADS/src/components/landing/SiteNav";
import { Hero } from "@/app/components/ADS/src/components/landing/Hero";
import  LogoMarquee  from "@/app/components/ADS/src/components/landing/LogoMarquee";
import { Services } from "@/app/components/ADS/src/components/landing/Services";
import Problems from "@/app/components/ADS/src/components/landing/Problems";
import Creativeproblem from "@/app/components/ADS/src/components/landing/Creativeproblem";
import { CaseStudies } from "@/app/components/ADS/src/components/landing/CaseStudies";
import { WhyUs } from "@/app/components/ADS/src/components/landing/WhyUs";
import { Process } from "@/app/components/ADS/src/components/landing/Process";
import { Testimonials } from "@/app/components/ADS/src/components/landing/Testimonials";
import { FAQ } from "@/app/components/ADS/src/components/landing/FAQ";
import { FinalCTA , Footer} from "@/app/components/ADS/src/components/landing/FinalCTA";
import Mobilecta from "@/app/components/ADS/src/components/landing/Mobilecta";
import SectionPopup from "@/app/components/ADS/src/components/landing/SectionPopup";
import ShopifyNotification from "@/app/components/ADS/src/components/landing/ShopifyNotification";

import "./lovable-compiled.css";

export default function PaidMarketingPage() {
  return (
    <main className="lovable-page">
      <SiteNav />
      <Hero />
      <LogoMarquee />
      <WhyUs />
      <CaseStudies />
      <Problems />
      <Creativeproblem/>
      <Services />
      <Process />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
      <Mobilecta/>
      <SectionPopup />
      <ShopifyNotification />
    </main>
  );
}
