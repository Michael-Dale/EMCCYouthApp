import PageTransition from "../components/PageTransition";
import DirectionCard from "../components/DirectionCard";
import GoogleFormLink from '../components/GoogleFormLink';
import MusicPlayer from "../components/MusicPlayer";




export default function Info() {
  // const img = "/pics/img.jpg";
  const img = "/pics/Facebook.png";
  return (
    <PageTransition>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Info</h1>
        {/* Your contact page content here */}
        <DirectionCard />
        <GoogleFormLink
        formTitle="Google Form"
        formDescription="Sign up for our next event!"
        googleFormUrl="https://forms.gle/examplelink"
        imagePath={img}
      />
       <MusicPlayer
        playlistUrl="https://www.youtube.com/watch?v=85B_DpmMunk&list=PLhQKtlhr7fgMF-WTGil-6ic8S4g5IM40P&pp=iAQB"
      />
      </div>
    </PageTransition>
  );
}
