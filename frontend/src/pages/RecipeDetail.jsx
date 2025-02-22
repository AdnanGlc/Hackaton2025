import React, { useEffect, useState } from "react";
import IngredientList from "../components/Ingredients";
import Footer from "../components/RecipeFooter";
import { useParams } from "react-router-dom";

const BurgerBistro = () => {
    const { id } = useParams();
    console.log(id);
    const [recipe, setRecipe] = useState(null);

    const blobBaseUrl = "https://euniversitystorage.blob.core.windows.net/hackaton2025/";

    useEffect(() => {
        const fetchRecipeDetail = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/RecipeGetById?request=${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch recipe details.");
                }

                const data = await response.json();
                setRecipe(data);
                console.log(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchRecipeDetail();
    }, [id]);

    return (
        <div className="flex overflow-hidden flex-col mx-auto w-full bg-white">
            {recipe ? (
                <>
                    <img
                        loading="lazy"
                        src={`${blobBaseUrl}${recipe.image}`}
                        className="object-cover w-full aspect-[1]"
                        alt={recipe.name}
                    />
                    <div className="flex flex-col items-start px-6 mt-[-20px] w-full rounded-t-4xl bg-white pt-[20px]">
                        <div className="text-xl font-bold text-gray-900">{recipe.name}</div>
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
                        </div>
                        <div className="self-stretch mt-5 text-sm leading-6 text-gray-400">{recipe.description}
                        </div>
                        <IngredientList />
                    </div>
                </>
            ) : (
                <div className="text-center p-10">Loading recipe details...</div>
            )
            }
        </div >
    );
};

export default BurgerBistro;