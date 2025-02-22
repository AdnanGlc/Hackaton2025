import React from "react";

const RecipeInfo = () => {
    return (
        <>
            <div className="text-xl font-bold text-gray-900">Burger Bistro</div>
            <div className="flex gap-3 mt-2 text-sm text-gray-900">
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/c3576bb934964cda99a86429ad19bef0/b0c710f6d792ad6e339de09025c97cf70ed535daabf85a1124162893f313b65e?apiKey=c3576bb934964cda99a86429ad19bef0&"
                    className="object-contain shrink-0 rounded-full aspect-square w-[22px]"
                    alt="Rose Garden icon"
                />
                <div className="my-auto">Rose Garden</div>
            </div>
            <div className="flex gap-5 justify-between mt-5 w-full text-gray-900 max-w-[264px]">
                <div className="flex gap-2.5 text-base font-bold whitespace-nowrap">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/c3576bb934964cda99a86429ad19bef0/9ace731e1c12fa8e06757442c0ec178b351d84edd2e19658de142b58525d4f68?apiKey=c3576bb934964cda99a86429ad19bef0&"
                        className="object-contain shrink-0 w-5 aspect-square"
                        alt="Rating star"
                    />
                    <div>4.7</div>
                </div>
                <div className="flex gap-10 my-auto text-sm">
                    <div>Free</div>
                    <div>20 min</div>
                </div>
            </div>
        </>
    );
};

export default RecipeInfo;