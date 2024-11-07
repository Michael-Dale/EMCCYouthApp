import PageTransition from "../components/PageTransition";
const sender = require("../components/Emailer");
import DirectionCard from "../components/DirectionCard";
<<<<<<< Updated upstream
import YouTubeEmbed from "../components/YoutTubeCard";
=======
import YouTubeEmbed from "../components/YouTubevideo";
import GoogleFormLink from '../components/GoogleFormLink';



>>>>>>> Stashed changes
export default function Info() {
  // const img = "/pics/img.jpg";
  const img = "/pics/Facebook.png";
  // sender();
  return (
    <PageTransition>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Info</h1>
        {/* Your contact page content here */}
        <DirectionCard />
        <YouTubeEmbed />
        <GoogleFormLink
        formTitle="Google Form"
        formDescription="Sign up for our next event!"
        googleFormUrl="https://forms.gle/examplelink"
        imagePath={img}
      />
      </div>
    </PageTransition>
  );
}
