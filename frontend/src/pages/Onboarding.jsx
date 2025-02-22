import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom"
import sijalica from '../assets/sijalica.svg';
import kuhanje from '../assets/kuhanje.svg';
import shopping from '../assets/shopping.svg';
import eco from '../assets/eco.svg';
import recipe from '../assets/recipe.svg';

const slides = [
  { title: "Did you know?", description: "The food industry is responsible for about 25% of global greenhouse gas emissions! But small changes in our food choices can make a BIG impact on the planet. Join us in making sustainable eating easy and rewarding!", image: sijalica },
  { title: `Welcome to CO${"\u2082"}OK`, description: "Discover delicious recipes made with low CO2 ingredients. Join the movement to help the planet, one meal at a time. Swipe to see how it works!", image: kuhanje },
  { title: "Scan What You Buy", description: "Simply scan the products you buy at the store using our app. We’ll automatically calculate your impact on the planet based on your purchases.", image: shopping },
  { title: "Help the Earth, Get Discounts!", description: "The more sustainable products you buy, the bigger the discounts you'll get! Track your CO2 savings and enjoy rewards for your positive impact.", image: eco },
  { title: "Find Recipes, Share Your Journey", description: "Explore a wide range of recipes using low CO2 ingredients and share your favorites with friends! Every step you take helps the Earth — and now, it's even easier to do with great meals to try!", image: recipe },
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
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="w-full max-w-screen bg-white rounded-2xl p-8 flex flex-col items-center justify-center h-11/12">
        <img src={slides[index].image} alt={slides[index].title} className="mb-6" />
        <h2 className="text-2xl font-bold text-gray-900 text-center">{slides[index].title}</h2>
        <p className="text-gray-500 text-center text-base mt-2 px-4 leading-relaxed">{slides[index].description}</p>
      </div>
      <div className="w-full flex flex-col items-center h-fit p-8">
        <div className="flex gap-2 mt-auto mb-6">
          {slides.map((_, i) => (
            <span key={i} className={`w-3 h-3 rounded-full ${i === index ? "bg-orange-500" : "bg-orange-200"}`}></span>
          ))}
        </div>
        <button
          className={`w-full py-3 rounded-lg text-lg font-semibold ${index < slides.length - 1 ? "bg-orange-500 text-white" : "bg-orange-500 text-white"}`}
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