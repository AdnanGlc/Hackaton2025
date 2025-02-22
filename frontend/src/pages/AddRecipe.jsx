import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AddNewItems() {
    const [recipeName, setRecipeName] = useState("");
    const [details, setDetails] = useState("");
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [ingredients, setIngredients] = useState([]);

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
            console.log(data);
            if (data) {
                setIngredients(data); // Assuming the response has an 'ingredients' field
            }
        } catch (error) {
            console.error("Error fetching ingredients:", error);
        }
    };

    const handleSaveChanges = async () => {
        const formData = new FormData();
        formData.append("name", recipeName);
        formData.append("details", details);
        formData.append("photo", photo);

        try {
            const response = await fetch("/api/recipes", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("Recipe added successfully!");
                setRecipeName("");
                setDetails("");
                setPhoto(null);
                setPhotoPreview(null);
            } else {
                alert("Failed to add recipe.");
            }
        } catch (error) {
            console.error("Error adding recipe:", error);
            alert("Failed to add recipe.");
        }
    };

    // Fetch ingredients when component mounts
    useEffect(() => {
        fetchIngredients();
    }, []);

    return (
        <div className="flex overflow-hidden flex-col items-start p-5 mx-auto w-full bg-white rounded-3xl max-w-[480px]">
            <div className="flex justify-between w-full items-center">
                <button
                    className="p-2 bg-gray-200 rounded-xl text-black font-bold"
                    onClick={() => navigate(-1)} // Navigate back to the previous route
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M5 12l14 0" />
                        <path d="M5 12l6 6" />
                        <path d="M5 12l6 -6" />
                    </svg>
                </button>
                <div className="text-lg leading-none text-neutral-700">
                    Add New Recipe
                </div>
                <button
                    className="my-auto text-sm text-right text-orange-500 uppercase"
                >
                    Reset
                </button>
            </div>
            <div className="mt-9 text-sm tracking-wide uppercase text-neutral-700">
                Name
            </div>
            <input
                type="text"
                className="px-4 py-3 mt-2 w-full text-xs tracking-wide bg-white rounded-xl border border-gray-200 text-zinc-400"
                placeholder="Name of your recipe"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
            />
            <div className="mt-5 text-sm tracking-wide uppercase text-neutral-700">
                Description
            </div>
            <textarea
                className="px-4 py-3 mt-2 w-full text-xs tracking-wide bg-white rounded-xl border border-gray-200 text-zinc-400"
                placeholder="Enter recipe details"
                rows="4"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
            />
            <div className="mt-5 text-sm tracking-wide uppercase text-neutral-700">
                Upload photo
            </div>
            <div className="flex gap-5 justify-between self-stretch mt-4 text-sm whitespace-nowrap text-zinc-400">
                <div className="">{photoPreview && (
                    <img
                        src={photoPreview}
                        alt="Preview"
                        className="object-cover rounded-3xl h-[101px] w-[150px]"
                    />
                )}</div>
                <div className="mt-5 w-full">
                    <label className="text-sm tracking-wide uppercase text-neutral-700">Upload photo</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="block w-full mt-2"
                        onChange={handlePhotoUpload}
                    />
                </div>
            </div>
            <div className="flex justify-between mt-5 text-sm tracking-wide w-full">
                <div className="uppercase text-neutral-700">
                    Ingredients
                </div>
                <div className="flex gap-1.5 text-zinc-400">
                    <div>See All</div>
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/c3576bb934964cda99a86429ad19bef0/6ad7ff3c56c14d329873d9363c1bab1e9e1aed82cf120fc41e911e93c5f7eb99?apiKey=c3576bb934964cda99a86429ad19bef0&"
                        className="object-contain shrink-0 my-auto w-2 aspect-[1.6]"
                        alt=""
                    />
                </div>
            </div>
            <div className="flex gap-3 self-stretch mt-3 overflow-x-auto whitespace-nowrap pb-3 scrollbar-hide">
                {ingredients.map((ingredient, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center gap-1 text-orange-500 flex-shrink-0 w-[80px]"
                    >
                        <div className="bg-white shadow-2xl rounded-full p-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="50"
                                height="50"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="icon icon-tabler icons-tabler-filled icon-tabler-chef-hat"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M19 19.002v1.998a1 1 0 0 1 -.883 .993l-.117 .007h-12a1 1 0 0 1 -1 -1v-1.994a1 1 0 0 1 1 -1l12 -.004a1 1 0 0 1 1 1" />
                                <path d="M12 2a5 5 0 0 1 4.533 2.888l.06 .137l.136 -.009a5 5 0 0 1 4.99 3.477l.063 .213a5 5 0 0 1 -2.696 5.831l-.087 .037v1.428a1 1 0 0 1 -1 1l-12 .004a1 1 0 0 1 -.993 -.883l-.007 -.117v-1.433l-.123 -.055a5 5 0 0 1 -2.6 -3.001l-.064 -.223a5 5 0 0 1 5.193 -6.27l.066 -.142a5 5 0 0 1 4.302 -2.877z" />
                            </svg>
                        </div>
                        <div className="flex gap-6 text-xs tracking-wide text-center whitespace-nowrap text-black">
                            <div className="grow">{ingredient.name}</div>
                        </div>
                    </div>
                ))}
            </div>
            <button
                className="px-16 py-5 mt-8 text-lg text-center text-white uppercase bg-orange-500 rounded-xl w-full"
                onClick={handleSaveChanges}
            >
                Save Changes
            </button>
        </div>
    );
}

export default AddNewItems;
