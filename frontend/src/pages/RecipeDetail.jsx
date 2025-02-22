import React from "react";
import Header from "../components/RecipeHeader";
import RestaurantInfo from "../components/RecipeInfo";
import Description from "../components/RecipeDescription";
import IngredientList from "../components/Ingredients";
import Footer from "../components/RecipeFooter";

const BurgerBistro = () => {
    return (
        <div className="flex overflow-hidden flex-col mx-auto w-full bg-white max-w-[480px] rounded-[30px]">
            <Header />
            <div className="flex flex-col items-start px-6 mt-6 w-full">
                <RestaurantInfo />
                <Description />
                <IngredientList />
            </div>
            <Footer />
        </div>
    );
};

export default BurgerBistro;