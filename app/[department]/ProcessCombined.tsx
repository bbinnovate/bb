'use client';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';


const webProcess = [
  { num: '01', title: 'Discovery Call', desc: 'Aligning on business goals and requirements.' },
  { num: '02', title: 'Research & Planning', desc: 'Competitor analysis and site architecture.' },
  { num: '03', title: 'UI/UX Design', desc: 'Mapping user journeys & high fidelity mockups.' },
  { num: '04', title: 'Development', desc: 'Building on blazing fast modern stacks.' },
  { num: '05', title: 'Testing & QA', desc: 'Rigorous cross device testing.' },
  { num: '06', title: 'Deployment', desc: 'Seamless handoff to production.' },
  { num: '07', title: 'Maintenance', desc: 'Monthly retainer for speed & security.' },
];

const pmProcess = [
  { num: '01', title: 'Business Analysis', desc: 'Auditing your current funnel bottlenecks.' },
  { num: '02', title: 'Competitor Intel', desc: 'Reverse engineering rival strategies.' },
  { num: '03', title: 'Audience Matrix', desc: 'Deep dive demographic and intent targeting.' },
  { num: '04', title: 'Campaign Setup', desc: 'Structuring Pixel, CAPI, and tracking tags.' },
  { num: '05', title: 'Creative Testing', desc: 'Deploying hook driven organic style ads.' },
  { num: '06', title: 'Optimization', desc: 'Daily bid adjustment based on live ROAS.' },
  { num: '07', title: 'Scaling', desc: 'Vertical scaling constraints unlocked.' },
];

const smmProcess = [
  { num: '01', title: 'Brand Audit', desc: 'Evaluating current social presence and voice.' },
  { num: '02', title: 'Strategy Dev', desc: 'Platform specific content pillars & planning.' },
  { num: '03', title: 'Content Creation', desc: 'Designing eye catching posts and videos.' },
  { num: '04', title: 'Scheduling', desc: 'Automated publishing at peak engagement times.' },
  { num: '05', title: 'Community', desc: 'Active engagement with followers and leads.' },
  { num: '06', title: 'Analytics', desc: 'Tracking reach, engagement, and conversions.' },
  { num: '07', title: 'Iteration', desc: 'Refining approach based on data insights.' },
];

const seoProcess = [
  { num: '01', title: 'Tech Audit', desc: 'Identifying crawl errors and speed bottlenecks.' },
  { num: '02', title: 'Keyword Research', desc: 'Finding high intent, low competition terms.' },
  { num: '03', title: 'On-Page SEO', desc: 'Optimizing titles, meta descriptions, and content.' },
  { num: '04', title: 'Content Strategy', desc: 'Planning blog posts and pillar pages.' },
  { num: '05', title: 'Link Building', desc: 'Securing high quality backlinks from niche sites.' },
  { num: '06', title: 'Local SEO', desc: 'Optimizing GMB and local citations.' },
  { num: '07', title: 'Tracking', desc: 'Monitoring rankings and organic traffic growth.' },
];

const pageContent: Record<string, any> = {
  "/website-development-services": {
    title: (
      <>
         Design That {" "}
        <span className="text-highlight">
         Speaks Before
        </span>{" "}
        You Do.{" "}
      </>
    ),
    subtitle: "Modern, responsive websites with intuitive UI/UX that engage users and drive business growth.",
    process: webProcess
  },
  "/social-media-management": {
    title: (
      <>
       Making Brands {" "}
        <span className="text-highlight">
        Impossible To Ignore.
        </span>{" "}
      </>
    ),
    subtitle: "We help brands grow through strategic social media marketing, engaging content, and data driven campaigns that build awareness, strengthen communities, and drive measurable business growth.",
    process: smmProcess
  },
  "/performance-marketing-services": {
    title: (
      <>
        Mumbai's Growth Focused {" "}
        <span className="text-highlight">
          Performance Marketing
        </span>{" "}
       Agency{" "}
      </>
    ),
    subtitle: "Trusted by ambitious brands to drive customer acquisition, revenue growth, and industry leading marketing performance.",
    process: pmProcess
  },
  "/seo": {
    title: (
      <>
        Improve Rankings With{" "}
        <span className="text-highlight">
          SEO
        </span>{" "}
        That Drives{" "}
        <span className="text-highlight">
          Organic Growth
        </span>
      </>
    ),
    subtitle: "Increase visibility, traffic, and leads through comprehensive SEO strategies focused on long term growth and sustainable search performance.",
    process: seoProcess
  },
  "default": {
    title: (
      <>
        How We <span className="text-highlight">Execute.</span>
      </>
    ),
    subtitle: "Transparency is everything. Here is the exact playbook we use to generate predictable results.",
    process: pmProcess
  }
};

export default function ProcessCombined() {
  const pathname = usePathname();
  const currentContent = pageContent[pathname as string] || pageContent["default"];

  return (
    <section className="container py-10 sm:py-15 lg:py-20 relative ">
      <div >
    
        <div className="text-center ">
          <motion.h6 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
             className=" inline-block text-center font-outfit  text-black"

          >
             {currentContent.title}
          </motion.h6>
          <p className="lg:mt-4 mt-1 max-w-2xl mx-auto text-black subtitle">
           {currentContent.subtitle}
           </p>




        </div>

        <div className="relative lg:mt-10 mt-5">
           {/* Horizontal Line Desktop */}
           <div className="absolute top-6 left-0 right-0 h-1 bg-[#fab31e]  hidden lg:block rounded-full">
             <motion.div 
               initial={{ width: 0 }}
               whileInView={{ width: '100%' }}
               viewport={{ once: true, amount: 0.5 }}
               transition={{ duration: 2, ease: "easeOut" }}
               className="h-full bg-[#fab31e]  relative rounded-full"
             />
           </div>

           {/* Vertical Line Mobile */}
           <div className="absolute left-3.5 top-0 bottom-0 w-1 bg-[#fab31e] lg:hidden rounded-full opacity-30"></div>

           <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 lg:gap-4 relative z-10 pl-12 lg:pl-0">
             {currentContent.process.map((step: any, i: number) => (
               <div key={i} className="relative group">
                 {/* Mobile Node */}
                 <div className="absolute -left-[47px] top-1 w-8 h-8 rounded-full border-4 border-[#f7f7f7] bg-[#fab31e] lg:hidden shadow-sm"></div>
                 
                 {/* Desktop Node */}
                 <div className="hidden lg:flex w-12 h-12 bg-white rounded-full border-4 border-[#f7f7f7] bg-[#fab31e] text-[#fab31e] /30 shadow-sm items-center justify-center font-[500]  mx-auto mb-6 group-hover:border-[#fab31e]  group-hover:text-highlight transition-all relative z-10 bg-clip-padding group-hover:-translate-y-1 group-hover:shadow-lg">
                   {step.num}
                 </div>

                 <div className="lg:text-center mt-2 lg:mt-0 bg-white lg:bg-transparent p-5 lg:p-0 rounded-2xl shadow-sm lg:shadow-none border border-[#111111]/5 lg:border-none">
                   <span className="block font-outfit text-xl lg:text-lg font-[500] text-black mb-2 flex items-center gap-2 lg:justify-center">
                     <span className="lg:hidden text-highlight font-[500] text-2xl">{step.num}</span> 
                     {step.title}
                   </span>
                   <span className="block subtitle text-black">{step.desc}</span>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </section>
  );
}
