import React from "react";

const IngredientList = () => {
    const ingredients = [
        { src: "https://cdn.builder.io/api/v1/image/assets/c3576bb934964cda99a86429ad19bef0/755a8c26979d54d21032342f6b34d6b58072ece5bff1b7e8b5a1a4f1c43577ce?apiKey=c3576bb934964cda99a86429ad19bef0&", alt: "Ingredient 1" },
        { src: "https://cdn.builder.io/api/v1/image/assets/c3576bb934964cda99a86429ad19bef0/ee3db733398745b5598849c7e9cb5f6c3025abbc7251b975144c1e27a058e5f9?apiKey=c3576bb934964cda99a86429ad19bef0&", alt: "Ingredient 2" },
        { src: "https://cdn.builder.io/api/v1/image/assets/c3576bb934964cda99a86429ad19bef0/7ac475b9f4943913d0bfe73279a75c54d287b3fe47c597238974a1b34fd05ebb?apiKey=c3576bb934964cda99a86429ad19bef0&", alt: "Ingredient 3" },
        { src: "https://cdn.builder.io/api/v1/image/assets/c3576bb934964cda99a86429ad19bef0/9650912063ba65f6f0ac441d88f9195ade984a6be9a3a5e4d88363e569999e10?apiKey=c3576bb934964cda99a86429ad19bef0&", alt: "Ingredient 4" },
        { src: "https://cdn.builder.io/api/v1/image/assets/c3576bb934964cda99a86429ad19bef0/17110d572630f501a4036e877c45c12f440c5274e3dffda4d2fb8b23e77ecb83?apiKey=c3576bb934964cda99a86429ad19bef0&", alt: "Ingredient 5" },
    ];

    return (
        <div className="flex gap-5 self-stretch mt-5">
            {ingredients.map((ingredient, index) => (
                <div key={index} className="flex flex-col justify-center items-center px-2.5 bg-rose-100 h-[50px] rounded-[100px] w-[50px]">
                    <img
                        loading="lazy"
                        src={ingredient.src}
                        className="object-contain w-6 aspect-square"
                        alt={ingredient.alt}
                    />
                </div>
            ))}
        </div>
    );
};

export default IngredientList;