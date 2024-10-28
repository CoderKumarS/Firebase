import React from "react";

interface UseCase {
  title: string;
  description: string;
  icon: string; // You can replace this with an SVG or image
}

const useCases: UseCase[] = [
  {
    title: "Clubs & Organizations",
    description:
      "Manage events, communicate with members, and keep everyone informed about club activities.",
    icon: "🏛️",
  },
  {
    title: "Professional Associations",
    description:
      "Provide networking opportunities, resources, and support for industry professionals.",
    icon: "👔",
  },
  {
    title: "Online Communities",
    description:
      "Foster discussions, share content, and build connections among members with shared interests.",
    icon: "💻",
  },
  {
    title: "Nonprofit Organizations",
    description:
      "Engage volunteers, organize events, and manage donations effectively.",
    icon: "❤️",
  },
];

const UseCases: React.FC = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Use Cases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              <div className="text-4xl mb-4">{useCase.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
              <p className="text-gray-700">{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
