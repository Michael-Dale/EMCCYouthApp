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
        username="ConnectYouth"
        profilePic="/icons/connect youth logo.svg"
      />
        <DevotionalPost
        verse="Isaiah 41:10 
“Fear not, for I am with you;
Be not dismayed, for I am your God. 
I will strengthen you,
I will uphold you with My righteous right hand”"
        message="What an amazing promise! God is telling you not to fear or be dismayed. Dismay is another word for distress (extreme anxiety, sorrow or pain) Why shouldn’t you fear or be dismayed? Because He is always with you! There is no reason to fear, regardless of your situation or circumstances. God is always with you, and He is telling you in this scripture He won’t leave you alone. 

God promises that He will strengthen and help you! When you’re feeling like you can’t go on or you just don’t know how you’re going to get through the day, God will be right with you to provide you with the strength and help you need, to get through whatever you’re facing.

God promises to uphold you. More than that, He promises to uphold you with His righteous right hand. Righteous: (good, pure, honest, worthy, sinless, virtuous). That means, when you lose your footing, He’s going to be there to hold you up, if you’ll trust in Him. Regardless of your circumstances, God is righteous. And He will uphold you with His right hand! Throughout scripture, God’s right hand is mentioned several times. Historically, to be put on someone’s right hand is to be held in equal honour. God’s right hand also symbolizes His power and His greatness.

When you feel anxious, fearful or dismayed. I encourage to focus your mind back on God and claim the promises he makes in Isaiah 41:10! 
Focus your mind on Christ through Breath Prayers:
Breath Prayers are short, simple prayers inspired by scripture. Breath Prayers help you focus on God as you take calming, deep breaths, which quickly relieves anxiety. 

Breath Prayer: Isaiah 41:10
Inhale: I won’t be afraid
Exhale: For you are with me"
        date="2024/10/11"
        username="ConnectYouth"
        profilePic="/icons/connect youth logo.svg"
      />

<DevotionalPost
        verse="Isaiah 41:10 
“Fear not, for I am with you;
Be not dismayed, for I am your God. 
I will strengthen you,
I will uphold you with My righteous right hand”"
        message="Remember, with faith and determination, you can overcome any challenge.
Remember, with faith and determination, you can overcome any challenge.
Remember, with faith and determination, you can overcome any challenge.
Remember, with faith and determination, y."
        date="2024/10/11"
        username="ConnectYouth"
        profilePic="/icons/connect youth logo.svg"
      />
      </div>
    </PageTransition>
  );
}
