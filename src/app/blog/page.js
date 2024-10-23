import PageTransition from "../components/PageTransition";
import DevotionalPost from "../components/DevotionalPost";
import PdfThumbnail from "../components/PdfThumbnail";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Blog() {
  return (
    <PageTransition>
        <h1 className="text-2xl font-bold mb-4">Blog</h1>
        {/* Your contact page content here */}
       
      <div className="border border-gray-300 rounded-2xl p-4 shadow-md max-w-md mx-auto my-4 bg-white transition-shadow duration-200 hover:shadow-lg">
  <h2 className="text-gray-800 text-2xl font-semibold text-center">Latest Devotion</h2>
  <DevotionalPost
    verse={`Isaiah 41:10 
“Fear not, for I am with you;
Be not dismayed, for I am your God. 
I will strengthen you,
I will uphold you with My righteous right hand”`}
    message="Remember, with faith and determination, you can overcome any challenge.
    Remember, with faith and determination, you can overcome any challenge.
    Remember, with faith and determination, you can overcome any challenge.
    Remember, with faith and determination, y."
    date="2024/10/11"
    username="ConnectYouth"
    profilePic="/icons/connect youth logo.svg"
  />
  <div className="text-center mt-4">
    <Link
      href="/blog/devotions"
      className="inline-flex items-center justify-center w-full sm:w-auto px-4 py-2 text-sm font-medium text-black hover:bg-black hover:text-white rounded-md transition-colors duration-300 ease-in-out"
    >
      <span>View all devotions</span>
      <ArrowRight className="ml-2 h-4 w-4" />
    </Link>
  </div>
</div>

<div className="border border-gray-300 rounded-2xl p-4 shadow-md max-w-md mx-auto my-4 bg-white transition-shadow duration-200 hover:shadow-lg">
  <h2 className="text-gray-800 text-2xl font-semibold text-center">Latest Sermon</h2>
  <PdfThumbnail
        pdfUrl="/docs/Beginners Guide Coding.pdf"  // Replace with your actual PDF path
        title="Sample PDF 1"
        imgSrc="/pics/img.jpg" 
      />
  <div className="text-center mt-4">
    <Link
      href="/blog/sermons"
      className="inline-flex items-center justify-center w-full sm:w-auto px-4 py-2 text-sm font-medium text-black hover:bg-black hover:text-white rounded-md transition-colors duration-300 ease-in-out"
    >
      <span>View all sermons</span>
      <ArrowRight className="ml-2 h-4 w-4" />
    </Link>
  </div>
</div>

<div className="border border-gray-300 rounded-2xl p-4 shadow-md max-w-md mx-auto my-4 bg-white transition-shadow duration-200 hover:shadow-lg">
  <h2 className="text-gray-800 text-2xl font-semibold text-center">Latest Testimony</h2>
 
  <div className="text-center mt-4">
    <Link
      href="/blog/testimonies"
      className="inline-flex items-center justify-center w-full sm:w-auto px-4 py-2 text-sm font-medium text-black hover:bg-black hover:text-white rounded-md transition-colors duration-300 ease-in-out"
    >
      <span>View all testimonies</span>
      <ArrowRight className="ml-2 h-4 w-4" />
    </Link>
  </div>
</div>



    </PageTransition>
  );
}
