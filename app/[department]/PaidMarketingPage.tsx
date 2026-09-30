import { SiteNav } from "@/app/components/ADS/src/components/landing/SiteNav";
import { Hero } from "@/app/components/ADS/src/components/landing/Hero";
import LogoMarquee from "@/app/components/ADS/src/components/landing/LogoMarquee";
import { Services } from "@/app/components/ADS/src/components/landing/Services";
import { CaseStudies } from "@/app/components/ADS/src/components/landing/CaseStudies";
import { WhyUs } from "@/app/components/ADS/src/components/landing/WhyUs";
import { Process } from "@/app/components/ADS/src/components/landing/Process";
import { Testimonials } from "@/app/components/ADS/src/components/landing/Testimonials";
import { FAQ } from "@/app/components/ADS/src/components/landing/FAQ";
import { FinalCTA, Footer } from "@/app/components/ADS/src/components/landing/FinalCTA";
import ShopifyNotification from "@/app/components/ADS/src/components/landing/ShopifyNotification";

export default function PaidMarketingPage() {
  return (
    <main>
      <SiteNav />
      <Hero />
      <LogoMarquee />
      <Services />
      <CaseStudies />
      <WhyUs />
      <Process />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
      <ShopifyNotification />
    </main>
  );
}
