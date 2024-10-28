import React from "react";

interface Testimonial {
  name: string;
  role: string;
  message: string;
  avatar: string; // URL or path to avatar image
}

const testimonials: Testimonial[] = [
  {
    name: "Alice Johnson",
    role: "Community Manager",
    message:
      "This platform has transformed our community engagement! The tools are intuitive and effective.",
    avatar: "https://via.placeholder.com/100", // Replace with actual image URL
  },
  {
    name: "Mark Smith",
    role: "Event Organizer",
    message:
      "Organizing events has never been easier. Our attendance rates have skyrocketed!",
    avatar: "https://via.placeholder.com/100", // Replace with actual image URL
  },
  {
    name: "Sarah Brown",
    role: "Admin",
    message:
      "The analytics features provide invaluable insights. We can now tailor our content to our members’ needs.",
    avatar: "https://via.placeholder.com/100", // Replace with actual image URL
  },
  {
    name: "John Doe",
    role: "User",
    message:
      "I love the seamless communication tools. It’s made connecting with other members effortless!",
    avatar: "https://via.placeholder.com/100", // Replace with actual image URL
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              <img
                src={testimonial.avatar}
                alt={`${testimonial.name}'s avatar`}
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{testimonial.name}</h3>
              <p className="text-gray-500 mb-2">{testimonial.role}</p>
              <p className="text-gray-700 italic">"{testimonial.message}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
