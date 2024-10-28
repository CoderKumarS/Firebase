import React from "react";

interface Step {
  title: string;
  description: string;
  icon: string; // You can replace this with an SVG or image
}

const steps: Step[] = [
  {
    title: "Sign Up",
    description:
      "Create an account in just a few minutes and start managing your community.",
    icon: "📝",
  },
  {
    title: "Set Up Your Profile",
    description:
      "Customize your profile with relevant information and preferences.",
    icon: "👤",
  },
  {
    title: "Create Events",
    description:
      "Organize events easily and invite your community members to join.",
    icon: "📅",
  },
  {
    title: "Engage with Members",
    description:
      "Utilize various tools to communicate and interact with your community effectively.",
    icon: "💬",
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-700">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
