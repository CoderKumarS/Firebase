import React from "react";
interface Feature {
  title: string;
  description: string;
  icon: string;
}

const features: Feature[] = [
  {
    title: "Event Management",
    description:
      "Easily create and manage events, send invites, and track RSVPs.",
    icon: "📅", // You can replace this with an SVG or image
  },
  {
    title: "Member Engagement Tools",
    description:
      "Engage members through polls, discussions, and announcements.",
    icon: "💬",
  },
  {
    title: "Analytics & Reporting",
    description: "Get insights into community activity and member engagement.",
    icon: "📊",
  },
  {
    title: "Customizable Profiles",
    description:
      "Allow members to create profiles that showcase their interests and skills.",
    icon: "🧑‍🤝‍🧑",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
