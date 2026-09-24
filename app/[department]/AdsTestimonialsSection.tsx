"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";



const testimonials = {
  "performance-marketing-services": [
    {
      brand: "Lemonade India",
      text: "Bombay Blokes helped us identify a clear brand direction and strengthen our digital presence. Their strategic approach and commitment to growth have made them an invaluable partner.",
      name: "~ Gunjan Malhotra",
      maintext: "★★★★★ 5/5",
    },
    {
      brand: "Nurrish",
      text: "The team took complete ownership of our advertising efforts and delivered a noticeable increase in sales within the first month. Their proactive approach and performance-driven mindset set them apart.",
      name: "~ Sanaya Mehta",
      maintext: "★★★★★ 5/5",
    },
    {
      brand: "India Grooming Club",
      text: "Working with Bombay Blokes has been seamless from day one. Their understanding of digital marketing and ability to execute consistently has helped us achieve our business objectives.",
      name: "~ Kaushik Shah",
      maintext: "★★★★★ 5/5",
    },
    {
      brand: "Client Success",
      text: "From website development to e-commerce solutions, the team demonstrated exceptional expertise and professionalism. They are a partner that genuinely cares about business growth.",
      name: "~ Alex Kriplani",
      maintext: "★★★★★ 5/5",
    },
    {
      brand: "Client Success",
      text: "Bombay Blokes truly offers some of the best digital services in the industry. From social media marketing to web development, they consistently deliver outstanding results.",
      name: "~ Tilika Vispute",
      maintext: "★★★★★ 5/5",
    },
    // {
    //   brand: "Client Feedback",
    //   text: "Their combination of creativity, strategy, and performance marketing expertise helped us unlock new growth opportunities while maintaining complete transparency.",
    //   name: "~ Client Feedback",
    //   maintext: "★★★★★ 5/5",
    // },
  ],

  seo: [
    {
      brand: "Lemonade India",
      text: "The SEO strategy developed by Bombay Blokes significantly improved our search visibility and organic traffic. Their expertise helped us reach the right audience and generate consistent business growth.",
      name: "~ Gunjan Malhotra",
      maintext: "★★★★★ 5/5",
    },
    {
      brand: "Nurrish",
      text: "Bombay Blokes took a strategic approach to SEO, helping us rank for relevant keywords and improve our online presence. The results have been both measurable and sustainable.",
      name: "~ Sanaya Mehta",
      maintext: "★★★★★ 5/5",
    },
    {
      brand: "India Grooming Club",
      text: "Their SEO team understands both technical optimization and content strategy. We've seen a noticeable improvement in our search rankings and organic lead generation.",
      name: "~ Kaushik Shah",
      maintext: "★★★★★ 5/5",
    },
    {
      brand: "Client Success",
      text: "The team delivered a well-planned SEO strategy backed by regular reporting and transparent communication. They made the entire process seamless and highly effective.",
      name: "~ Alex Kriplani",
      maintext: "★★★★★ 5/5",
    },
    {
      brand: "Client Success",
      text: "Bombay Blokes helped us build a stronger online presence through smart SEO strategies and continuous optimization. Their commitment to results truly sets them apart.",
      name: "~ Tilika Vispute",
      maintext: "★★★★★ 5/5",
    },
  ],

  "social-media-management": [
    {
      brand: "Lemonade India",
      text: "Bombay Blokes completely transformed our social media presence. Their creative direction, content strategy, and consistent execution helped us build a stronger brand and engage our audience like never before.",
      name: "~ Gunjan Malhotra",
      maintext: "★★★★★ 5/5",
    },
    {
      brand: "Nurrish",
      text: "The team understands what modern brands need on social media. Every post, campaign, and reel was thoughtfully planned, helping us increase engagement and strengthen our online presence.",
      name: "~ Sanaya Mehta",
      maintext: "★★★★★ 5/5",
    },
    {
      brand: "India Grooming Club",
      text: "Working with Bombay Blokes has been a fantastic experience. Their ability to combine creativity with strategy has made a noticeable difference in our brand visibility and audience engagement.",
      name: "~ Kaushik Shah",
      maintext: "★★★★★ 5/5",
    },
    {
      brand: "Client Success",
      text: "The creativity, consistency, and professionalism of the Bombay Blokes team are exceptional. They truly understand how to create content that connects with the right audience.",
      name: "~ Alex Kriplani",
      maintext: "★★★★★ 5/5",
    },
    {
      brand: "Client Success",
      text: "From content creation to social media management, every deliverable exceeded our expectations. The team is proactive, innovative, and genuinely invested in our brand's growth.",
      name: "~ Tilika Vispute",
      maintext: "★★★★★ 5/5",
    },
    {
      brand: "Client Review",
      text: "Bombay Blokes doesn't just post content—they build brands. Their strategic approach, creative excellence, and dedication to delivery exceeded our expectations.",
      name: "~ Client Review",
      maintext: "★★★★★ 5/5",
    },
  ],

  
  "website-development-services": [
  {
    brand: "Client Review",
    text: "Young, energetic team with a sharp eye for modern design. Creative, fresh ideas delivered with a smooth, collaborative process.",
    name: "~ Monil Shah",
    maintext: "★★★★★ 5.0",
  },
  {
    brand: "The Feline Foundation",
    text: "BB built The Feline Foundation's website and nailed the brief perfectly   warm, impactful, and nothing like a typical non-profit site. It drives real fundraising and volunteering results.",
    name: "~ Pallavi Kamath",
    maintext: "★★★★★ 5.0",
  },
  {
    brand: "Client Review",
    text: "Incredible work on our website, especially the complex mascot animations. Patient, skilled team   highly recommend for anything creative and technical.",
    name: "~ Jash Chheda",
    maintext: "★★★★★ 5.0",
  },
  {
    brand: "Client Review",
    text: "Transparent, fast, and high quality across both app development and marketing. A team that genuinely goes the extra mile and earns your trust.",
    name: "~ Akshat Adani",
    maintext: "★★★★★ 5.0",
  },
  {
    brand: "Client Review",
    text: "Helped us launch our e-commerce website from scratch with patience and expertise. Highly recommend Bombay Blokes for web development.",
    name: "~ Chirag Vora",
    maintext: "★★★★★ 5.0",
  },
],
};
type Testimonial = {
  brand: string;
  text: string;
  name: string;
  maintext: string;
};

const AdsTestimonialsSection = () => {
  const { department } = useParams();

  const testimonialList: Testimonial[] =
    testimonials[
      (department as keyof typeof testimonials) ?? "paid-marketing"
    ] || testimonials["paid-marketing"];

  const [currentGroup, setCurrentGroup] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 3,
      spacing: 16,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: { perView: 2, spacing: 16 },
      },
      "(max-width: 640px)": {
        slides: { perView: 1, spacing: 15 },
      },
    },
    slideChanged(slider) {
      const perGroup = Math.ceil(testimonialList.length / 3);
      const currentIdx = slider.track.details.rel;
      setCurrentGroup(Math.floor(currentIdx / perGroup));
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 5000);

    return () => clearInterval(interval);
  }, [instanceRef]);

  // SVG for glowing quote mark
  const QuoteIcon = () => (
    <svg className="w-8 h-8 md:w-10 md:h-10 text-[var(--color-highlight)] opacity-40 mb-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M14.017 21v-7.391c0-5.714 4.026-9.609 9.983-9.609v3.652c-2.8 0-4.041 1.761-4.041 4.566v1.391h4.041v7.391h-10.083zm-14.017 0v-7.391c0-5.714 4.026-9.609 9.983-9.609v3.652c-2.8 0-4.041 1.761-4.041 4.566v1.391h4.041v7.391h-10.083z" />
    </svg>
  );

  return (
    <div className="container py-10 sm:py-15 lg:py-20 relative">
      <div className="text-center ">
        

         <h6 className="inline-block lg:w-[950px] mx-auto text-center font-outfit text-black">
     What <span className="text-highlight">Our Clients Say </span>
  </h6>


      </div>

      <div ref={sliderRef} className="keen-slider lg:mt-10 mt-5">
        {testimonialList.map((item, index) => (
          <div
            key={index}
            className="keen-slider__slide overflow-visible relative h-auto flex"
          >
            <div className="flex flex-col justify-between min-h-[300px] sm:min-h-[320px] w-full bg-black border border-[var(--color-highlight)] shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 rounded-[20px] p-6 sm:p-8 relative overflow-hidden group ">
              
              {/* Subtle gradient glow in the corner on hover */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-highlight)] opacity-0 group-hover:opacity-10 blur-[50px] transition-opacity duration-500 rounded-full z-0"></div>
              
              <div className="z-10 relative">
                <QuoteIcon />
                
                <div className="flex items-center gap-1 mb-4 text-[var(--color-highlight)] text-[16px] sm:text-[18px]">
                  <span>★★★★★</span>
                  <span className="text-white ml-2 text-[14px] opacity-90 font-medium">5.0</span>
                </div>

                <p className="white-text subtitle text-[15px] sm:text-[17px] leading-[1.6] opacity-95">
                  "{item.text}"
                </p>
              </div>

              <div className="flex flex-col text-left z-10 relative mt-6 sm:mt-8 pt-6 border-t border-[#333]">
                <p className="font-[500] white-text text-[14px] sm:text-[18px] tracking-wide">{item.name}</p>
                {/* <p className="text-sm text-gray-400 mt-1 uppercase tracking-wider text-[12px]">{item.brand}</p> */}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8 gap-1">
        {[0, 1, 2].map((dot) => (
          <button
            key={dot}
            className="flex items-center justify-center cursor-pointer group"
            onClick={() => {
              const perGroup = Math.ceil(testimonialList.length / 3);
              instanceRef.current?.moveToIdx(dot * perGroup);
            }}
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                currentGroup === dot ? "bg-[var(--color-highlight)] w-8 h-3" : "bg-gray-400 w-3 h-3 group-hover:bg-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdsTestimonialsSection;