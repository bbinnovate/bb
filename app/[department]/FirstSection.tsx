"use client";

import { usePathname } from "next/navigation";

const pageContent = {
  "/website-development-services": {
    title: (
      <>
  Website Development{" "}
  <span className="text-highlight">
    Investment Estimator
  </span>
</>
    ),
    subtitle:
      "Whether you're scaling a D2C brand, growing a service business, or expanding a retail store, know exactly what your website needs to succeed. Get a free website audit.",
  },

  "/performance-marketing-services": {
    title: (
      <>
       Performance Marketing{" "}
       <span className="text-highlight">
    Investment Estimator
  </span>
     
      </>
    ),
    subtitle:
      "Whether you want more leads, online sales, or stronger brand awareness, see exactly what a results-driven campaign will cost and how it'll perform. Get your free audit below.",
  },

  "/social-media-management": {
    title: (
      <>
        Social Media{" "}
        <span className="text-highlight">
         Investment Estimator
        </span>{" "}
      
      </>
    ),
    subtitle:
      "We create strategic social media campaigns and engaging content that increase audience engagement, strengthen brand awareness, and drive measurable business growth.",
  },

"/seo": {
  title: (
    <>
      SEO{" "}
      <span className="text-highlight">
       Investment Estimator
      </span>
    </>
  ),
  subtitle:
    "Whether you're looking to generate more qualified leads, increase online sales, or dominate local search results, discover exactly what your SEO strategy will cost and how it can grow your business. Get your free SEO audit below.",
},
};

type FirstsectionProps = {
  department?: string;
};

export default function Firstsection({ department }: FirstsectionProps) {
  const pathname = usePathname();
  const pathKey = department ? `/${department}` : pathname;

  const content =
    pageContent[pathKey as keyof typeof pageContent] ||
    pageContent["/website-development-services"];

  return (
    <section className="container pb-0 lg:py-0 lg:mt-30 mt-0 px-4 sm:px-6 lg:px-8">
            
      <div className="flex flex-col">
        <div className="flex-1">
           <a
  className="black-text max-w-full lg:max-w-[1300px] font-outfit text-[28px] lg:text-[60px] leading-[1em] "
>
  {content.title}
</a>

          {/* <p className="mt-4 max-w-4xl  text-black subtitle">
            {content.subtitle}
          </p> */}
        </div>
      </div>
    </section>
  );
}