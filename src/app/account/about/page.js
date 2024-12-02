"use client";
import { useState } from 'react';

const faqData = [
  {
    question: "Why is 'Add to iOS Calendar' not working?",
    answer: "Unfortunately, Apple only allows an event to be added to the iOS calendar through the Safari browser."    
  },
  {
    question: "How long does shipping take?",
    answer: "Shipping usually takes between 5-7 business days depending on your location. You’ll receive a tracking number once your order ships.",
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship to many countries worldwide. Shipping costs and delivery times may vary depending on the destination.",
  },
  {
    question: "Can I change or cancel my order?",
    answer: "Once an order is placed, we try to process it as quickly as possible. If you need to make changes, please contact us within 24 hours.",
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
