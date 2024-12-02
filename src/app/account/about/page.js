"use client";
import { useState } from 'react';

const faqData = [
  {
    question: "Why is 'Add to iOS Calendar' not working?",
    answer: "Unfortunately, Apple only allows an event to be added to the iOS calendar through the Safari browser."    
  },
  {
    question: "What does 'Submit anonymously' mean?",
    answer:  "When you submit a query/suggestion, etc., and the 'Submit anonymously' option is selected, all of your information will be hidden and replaced with 'N/A'. This will ensure that you are completely anonymous.",
  },
  {
    question: "Who can see my profile picture?",
    answer: "You are the only person using the app who can see this, but please try to keep it appropriate. Admins will be able to see your profile picture.",
  },
];

const FaqPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h1>
      
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div key={index} className="border-b pb-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleAnswer(index)}
            >
              <h2 className="text-xl font-semibold">{faq.question}</h2>
              <span className={`transform ${activeIndex === index ? 'rotate-180' : 'rotate-0'}`}>
                &#9660;
              </span>
            </div>
            {activeIndex === index && (
              <p className="text-gray-700 mt-2">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqPage;
