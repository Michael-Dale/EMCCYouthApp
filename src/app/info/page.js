import PageTransition from "../components/PageTransition";
const sender = require("../components/Emailer");
import DirectionCard from "../components/DirectionCard";
import YouTubeEmbed from "../components/YouTubevideo";
export default function Info() {
  // sender();
  return (
    <PageTransition>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Info</h1>
        {/* Your contact page content here */}
        <DirectionCard />
        <YouTubeEmbed />
      </div>
    </PageTransition>
  );
}
