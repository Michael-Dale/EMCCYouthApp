import PageTransition from "../components/PageTransition";
import SocialLinks from "../components/SocialLinks.jsx";

export default function Contact() {
  return (
    <>
     <PageTransition>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Contact</h1>
        {/* Your contact page content here */}
      </div>
    </PageTransition>
          <SocialLinks />
    
    </>
   
  );
}
