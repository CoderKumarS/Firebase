import React from "react";
interface Benefit {
  title: string;
  description: string;
}
const benefits: Benefit[] = [
  {
    title: "Increased Engagement",
    description:
      "Foster a thriving community with tools designed to boost member interaction.",
  },
  {
    title: "Streamlined Communication",
    description:
      "Simplify discussions and announcements with integrated messaging features.",
  },
  {
    title: "Enhanced Collaboration",
    description:
      "Create a space where members can collaborate on projects and initiatives effortlessly.",
  },
  {
    title: "Data-Driven Insights",
    description:
      "Utilize analytics to track community health and make informed decisions.",
  },
];

const BenefitsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Benefits of Our System</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-700">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
