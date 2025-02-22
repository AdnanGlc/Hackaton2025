import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import coffeevsTV from "../assets/coffeevsTV.png";
import beefvsCar from "../assets/beefvsCar.png";
import chocolatevsPhone from "../assets/chocolatevsPhone.png";
import greenvsTransport from "../assets/greenvsTransport.png";

const slides = [
  { title: "Coffee vs TV", description: "A cup of coffee = watching TV for 2-4 hours", image: coffeevsTV },
  { title: "Beef vs car ride", description: "1kg beef = driving a car for 150-230km", image: beefvsCar },
  { title: "Chocolate vs mobile phone", description: "1kg chocolate = charging a phone daily for 2-4 years", image: chocolatevsPhone },
  { title: "Greenhouse tomatoes vs public transport", description: "1kg tomatoes = bus ride for 50-70km", image: greenvsTransport },
  { title: "Milk vs lighting", description: "1L milk = 5 LED bulbs for 20-24 hours" },
];

const Onboarding = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () => {
    if (index < slides.length - 1) {
      setIndex(index + 1);
    } else {
      localStorage.setItem("onboardingCompleted", "true");
      navigate("/");
    }
  };

  const skipOnboarding = () => {
    localStorage.setItem("onboardingCompleted", "true");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-screen bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center h-[100vh]">
        <img src={slides[index].image} alt={slides[index].title} className="w-70 h-90 bg-gray-300 rounded-xl border-2 border-blue-400 mt-10" />
        <h2 className="text-2xl font-bold text-gray-900 mt-5 text-center">{slides[index].title}</h2>
        <p className="text-gray-500 text-center text-base mt-2 px-4 leading-relaxed">{slides[index].description}</p>
        <div className="flex gap-2 mt-auto mb-6">
          {slides.map((_, i) => (
            <span key={i} className={`w-3 h-3 rounded-full ${i === index ? "bg-orange-500" : "bg-orange-200"}`}></span>
          ))}
        </div>
        <button
          className={`w-full py-3 rounded-lg text-lg font-semibold ${index < slides.length - 1 ? "bg-orange-500 text-white" : "bg-gray-300 text-gray-500"}`}
          onClick={nextSlide}
        >
          {index < slides.length - 1 ? "NEXT" : "DONE"}
        </button>
        <button className="text-gray-500 text-sm mt-3" onClick={skipOnboarding}>Skip</button>
      </div>
    </div>
  );
};

export default Onboarding;