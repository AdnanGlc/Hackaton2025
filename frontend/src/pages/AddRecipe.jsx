import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AddNewItems() {
    const [recipeName, setRecipeName] = useState("");
    const [details, setDetails] = useState("");
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]); // ✅ Selected ingredients state

    const navigate = useNavigate();

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
        setPhotoPreview(URL.createObjectURL(file));
    };

    const fetchIngredients = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/ProductGetAllEndpoint", {
                method: "GET",
            });
            const data = await response.json();
            if (data) setIngredients(data);
        } catch (error) {
            console.error("Error fetching ingredients:", error);
        }
    };

    const handleIngredientSelect = (id) => {
        setSelectedIngredients((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((ingredientId) => ingredientId !== id) // Deselect
                : [...prevSelected, id] // Select
        );
    };

    const handleSaveChanges = async () => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        const userId = userData?.id;

        if (!userId) {
            alert("User information is missing. Please log in again.");
            navigate("/login");
            return;
        }

        if (!recipeName || !details || !photo || selectedIngredients.length === 0) {
            alert("Please fill all fields and select at least one ingredient.");
            return;
        }

        // Prepare the products array
        const products = selectedIngredients.map((id) => ({
            productId: id,
            quantityKg: 1, // ✅ Fixed quantity for each product
        }));

        // Create FormData object to send both image and other data
        const formData = new FormData();
        formData.append("photo", photo); // Append the image file
        formData.append("Name", recipeName);
        formData.append("Description", details);
        formData.append("UserId", userId);
        formData.append("Products", JSON.stringify(products)); // Send as string

        try {
            const response = await fetch('http://localhost:5000/api/RecipeUpdateOrInsertEndpoint', {
                method: "POST", // Using POST to send form data
                body: formData, // Send the formData with all the fields, including the image
            });

            if (response.ok) {
                alert("Recipe added successfully!");
                setRecipeName("");
                setDetails("");
                setPhoto(null);
                setPhotoPreview(null);
                setSelectedIngredients([]);
            } else {
                alert("Failed to add recipe.");
            }
        } catch (error) {
            console.error("Error adding recipe:", error);
            alert("Failed to add recipe.");
        }
    };


    useEffect(() => {
        fetchIngredients();
    }, []);

    return (
        <div className="flex overflow-hidden flex-col items-start p-5 mx-auto w-full bg-white rounded-3xl max-w-[480px]">
            <div className="flex justify-between w-full items-center">
                <button
                    className="p-2 bg-gray-200 rounded-xl text-black font-bold"
                    onClick={() => navigate(-1)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M5 12l6 6M5 12l6-6" />
                    </svg>
                </button>
                <div className="text-lg leading-none text-neutral-700">Add New Recipe</div>
                <button
                    className="my-auto text-sm text-right text-orange-500 uppercase"
                    onClick={() => {
                        setRecipeName("");
                        setDetails("");
                        setPhoto(null);
                        setPhotoPreview(null);
                        setSelectedIngredients([]);
                    }}
                >
                    Reset
                </button>
            </div>

            <div className="mt-9 text-sm tracking-wide uppercase text-neutral-700">Name</div>
            <input
                type="text"
                className="px-4 py-3 mt-2 w-full text-xs bg-white rounded-xl border border-gray-200 text-zinc-400"
                placeholder="Name of your recipe"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
            />

            <div className="mt-5 text-sm tracking-wide uppercase text-neutral-700">Description</div>
            <textarea
                className="px-4 py-3 mt-2 w-full text-xs bg-white rounded-xl border border-gray-200 text-zinc-400"
                placeholder="Enter recipe details"
                rows="4"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
            />

            <div className="mt-5 text-sm tracking-wide uppercase text-neutral-700">Upload photo</div>
            <div className="flex gap-5 justify-between self-stretch mt-4 text-sm text-zinc-400">
                {photoPreview && (
                    <img src={photoPreview} alt="Preview" className="object-cover rounded-3xl h-[101px] w-[150px]" />
                )}
                <div className="mt-5 w-full">
                    <input
                        type="file"
                        accept="image/*"
                        className="block w-full mt-2"
                        onChange={handlePhotoUpload}
                    />
                </div>
            </div>

            <div className="flex justify-between mt-5 text-sm tracking-wide w-full">
                <div className="uppercase text-neutral-700">Ingredients</div>
                <div className="flex gap-1.5 text-zinc-400 cursor-pointer">
                    <div>See All</div>
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/c3576bb934964cda99a86429ad19bef0/6ad7ff3c56c14d329873d9363c1bab1e9e1aed82cf120fc41e911e93c5f7eb99"
                        className="object-contain shrink-0 my-auto w-2"
                        alt=""
                    />
                </div>
            </div>

            <div className="flex gap-3 self-stretch mt-3 overflow-x-auto pb-3 scrollbar-hide">
                {ingredients.map((ingredient) => (
                    <div
                        key={ingredient.id}
                        onClick={() => handleIngredientSelect(ingredient.id)}
                        className={`flex flex-col items-center gap-1 cursor-pointer flex-shrink-0 w-[80px] 
                            ${selectedIngredients.includes(ingredient.id)
                                ? "bg-orange-100 border border-orange-500 rounded-xl"
                                : ""}`}
                    >
                        <div className="bg-white shadow-2xl rounded-full p-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor">
                                <path d="M19 19.002v1.998a1 1 0 0 1-.883.993H6a1 1 0 0 1-1-1v-1.994a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1z" />
                                <path d="M12 2a5 5 0 0 1 4.533 2.888 5 5 0 0 1 4.99 3.477 5 5 0 0 1-2.696 5.831V16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-1.433a5 5 0 0 1-2.6-3.001 5 5 0 0 1 5.193-6.27A5 5 0 0 1 12 2z" />
                            </svg>
                        </div>
                        <div className="text-xs text-black">{ingredient.name}</div>
                    </div>
                ))}
            </div>

            <button
                className="px-16 py-5 mt-8 text-lg text-white uppercase bg-orange-500 rounded-xl w-full"
                onClick={handleSaveChanges}
            >
                Save Changes
            </button>
        </div>
    );
}

export default AddNewItems;
