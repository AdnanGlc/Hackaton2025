import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AddNewItems() {
  const [recipeName, setRecipeName] = useState("");
  const [details, setDetails] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const navigate = useNavigate();

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const fetchIngredients = async () => {
    try {
      const response = await fetch(
        "https://iotimages-f9fegmephhc5c8e7.canadacentral-01.azurewebsites.net/api/ProductGetAllEndpoint",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      if (data) setIngredients(data);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    }
  };

  const handleIngredientSelect = (id) => {
    setSelectedIngredients(
      (prevSelected) =>
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

    // Step 1: Post the Recipe without ingredients
    const formData = new FormData();
    formData.append("Image", photo);
    formData.append("Name", recipeName);
    formData.append("Description", details);
    formData.append("UserId", userId);

    try {
      const response = await fetch(
        "https://iotimages-f9fegmephhc5c8e7.canadacentral-01.azurewebsites.net/api/RecipeUpdateOrInsertEndpoint",
        {
          method: "POST",
          body: formData,
        }
      );

      console.log(response);

      if (response.ok) {
        const responseBody = await response.text(); // Read as text first to check if it has any content

        if (responseBody) {
          try {
            const recipeData = JSON.parse(responseBody); // Parse the JSON content

            // Step 2: Post the Ingredients
            const products = selectedIngredients.map((id) => ({
              productId: id,
              quantityKg: 1,
            }));

            const ingredientsResponse = await fetch(
              "https://iotimages-f9fegmephhc5c8e7.canadacentral-01.azurewebsites.net/api/RecipeAddProducts",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                  recipeId: recipeData,
                  products: products,
                  quantityKg: 1,
                }),
              }
            );

            if (ingredientsResponse.ok) {
              alert("Recipe and ingredients added successfully!");
              setRecipeName("");
              setDetails("");
              setPhoto(null);
              setPhotoPreview(null);
              setSelectedIngredients([]);
            } else {
              alert("Failed to add ingredients.");
            }
          } catch (jsonError) {
            console.error("Error parsing response as JSON:", jsonError);
            alert("Failed to parse recipe response.");
          }
        } else {
          alert("No content returned from the server.");
        }
      } else {
        alert("Failed to add recipe.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add recipe and ingredients.");
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  return (
    <div className="flex overflow-hidden flex-col items-start p-5 mx-auto w-full bg-white rounded-3xl max-w-[480px]">
      <div className="text-sm tracking-wide uppercase text-neutral-700">
        Name
      </div>
      <input
        type="text"
        className="px-4 py-3 mt-2 w-full text-xs bg-white rounded-xl border border-gray-200 text-zinc-400"
        placeholder="Name of your recipe"
        value={recipeName}
        onChange={(e) => setRecipeName(e.target.value)}
      />

      <div className="mt-5 text-sm tracking-wide uppercase text-neutral-700">
        Description
      </div>
      <textarea
        className="px-4 py-3 mt-2 w-full text-xs bg-white rounded-xl border border-gray-200 text-zinc-400"
        placeholder="Enter recipe details"
        rows="4"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />

      <div className="mt-5 text-sm tracking-wide uppercase text-neutral-700">
        Upload photo
      </div>
      <div className="flex gap-5 justify-between self-stretch mt-4 text-sm text-zinc-400">
        {photoPreview && (
          <img
            src={photoPreview}
            alt="Preview"
            className="object-cover rounded-3xl h-[101px] w-[150px]"
          />
        )}
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            className="block w-full"
            onChange={handlePhotoUpload}
          />
        </div>
      </div>

      <div className="flex justify-between mt-5 text-sm tracking-wide w-full">
        <div className="uppercase text-neutral-700">Ingredients</div>
      </div>

      <div className="grid grid-cols-3 gap-3 self-stretch mt-3 overflow-x-auto pb-3 scrollbar-hide">
        {ingredients.map((ingredient) => (
          <div
            key={ingredient.id}
            onClick={() => handleIngredientSelect(ingredient.id)}
            className={`flex flex-col items-center gap-1 cursor-pointer flex-shrink-0 w-[80px] 
                            ${
                              selectedIngredients.includes(ingredient.id)
                                ? "bg-orange-100 border border-orange-500 rounded-xl"
                                : ""
                            }`}
          >
            <div className="text-md p-2 text-black text-center flex items-center justify-center">
              {ingredient.name}
            </div>
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
