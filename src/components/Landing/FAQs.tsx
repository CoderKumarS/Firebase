import React from "react";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What is a Community Management System?",
    answer:
      "A Community Management System helps organizations manage their community interactions, events, and member engagement.",
  },
  {
    question: "How do I sign up?",
    answer:
      'You can sign up by clicking the "Get Started" button on our homepage and filling out the registration form.',
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes! We offer a 14-day free trial for new users to explore all our features without any commitment.",
  },
];

const FAQs: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b pb-4">
              <h3 className="font-semibold">{faq.question}</h3>
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
