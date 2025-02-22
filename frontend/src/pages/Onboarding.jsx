import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import coffeevsTV from "../assets/coffeevsTV.png";
import beefvsCar from "../assets/beefvsCar.png";
import chocolatevsPhone from "../assets/chocolatevsPhone.png";
import greenvsTransport from "../assets/greenvsTransport.png";

const slides = [
    {
      title: "Coffee vs TV",
      description: "A cup of coffee that’s roughly equivalent to watching TV for about 2-4 hours",
      image: coffeevsTV
    },
  {
    title: "Beef vs car ride",
    description: "Eating 1kg of beef that's roughly equivalent to driving an average gasoline car for 150-230km",
    image: beefvsCar    
  },
  {
    title: "Chocolate vs mobile phone",
    description: "1 kg of milk chocolate that’s roughly equivalent to charging a smartphone every day for 2-4 years",
    image: chocolatevsPhone
},
  {
    title: "Greenhouse tomatoes vs public transport",
    description: "1kg of tomatoes grown in heated greenhouses that’s roughly equivalent to riding a bus for 50-70 km",
    image: greenvsTransport
},
  {
    title: "Milk vs household lighting",
    description: "1 liter of milk that’s roughly equivalent to leaving 5 LED bulbs on for a whole day, ~20-24 hours",
  },
];

const Onboarding = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();  

  const nextSlide = () => {
    if (index < slides.length - 1) {
      setIndex(index + 1);
    }
  };

  const skipOnboarding = () => {
    navigate("/");  
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-screen bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center h-[100vh]">
        {/* Image Display */}
        <img
          src={slides[index].image} // Dynamically set the image source
          alt={slides[index].title}
          className="w-70 h-90 bg-gray-300 rounded-xl border-2 border-blue-400 flex-shrink-0 mt-10"
        />

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mt-25 text-center">{slides[index].title}</h2>

        {/* Description */}
        <p className="text-gray-500 text-center text-base mt-2 px-4 leading-relaxed">
          {slides[index].description}
        </p>

        {/* Pagination Dots */}
        <div className="flex gap-2 mt-auto mb-6">
          {slides.map((_, i) => (
            <span key={i} className={`w-3 h-3 rounded-full ${i === index ? "bg-orange-500" : "bg-orange-200"}`}></span>
          ))}
        </div>

        {/* Buttons */}
        <button
          className={`w-full py-3 rounded-lg text-lg font-semibold ${
            index < slides.length - 1 ? "bg-orange-500 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={nextSlide}
          disabled={index === slides.length - 1}
        >
          {index < slides.length - 1 ? "NEXT" : "DONE"}
        </button>
        <button className="text-gray-500 text-sm mt-3" onClick={skipOnboarding}>
          Skip
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
