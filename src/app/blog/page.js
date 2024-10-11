import PageTransition from "../components/PageTransition";
import DevotionalPost from '../components/DevotionalPost';

export default function Blog() {
  return (
    <PageTransition>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Blog</h1>
        {/* Your contact page content here */}
        <DevotionalPost
        verse="Philippians 4:13 - I can do all things through Christ who strengthens me."
        message="Remember, with faith and determination, you can overcome any challenge."
        date="2024/10/11"
      />
      </div>
    </PageTransition>
  );
}
