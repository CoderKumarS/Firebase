import React from "react";
import HeroSection from "../components/Landing/HeroSection";
import FeaturesSection from "../components/Landing/Feature";
import BenefitsSection from "../components/Landing/BenefitsSection";
import HowItWorks from "../components/Landing/HowItWorks";
import Testimonials from "../components/Landing/Testinomials";
import UseCases from "../components/Landing/UseCases";
import FAQs from "../components/Landing/FAQs";
import CallToAction from "../components/Landing/CallToAction";
import BlogResources from "../components/Landing/BlogResources";
import ContactUs from "../components/Landing/ContactUs";
import Footer from "../components/Landing/Footer";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <BenefitsSection />
      <HowItWorks />
      <Testimonials />
      <UseCases />
      <FAQs />
      <CallToAction />
      <BlogResources />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Home;
