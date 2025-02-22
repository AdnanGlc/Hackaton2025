import React, { useState } from "react";

const ingredients = [
    { name: "Salt", image: "https://cdn.builder.io/api/v1/image/assets/c3576bb934964cda99a86429ad19bef0/f30a5576a3e8ba0465d730fce1651bb16acdfd43c06744dfbf7980d31696f134?apiKey=c3576bb934964cda99a86429ad19bef0&" },
    { name: "Chicken", image: "https://cdn.builder.io/api/v1/image/assets/c3576bb934964cda99a86429ad19bef0/edf2e1487021b3eb0c108e2fe7f6bf15d354a7e1b9b540986470f17389cf8a48?apiKey=c3576bb934964cda99a86429ad19bef0&" },
    { name: "Onion", image: "https://cdn.builder.io/api/v1/image/assets/c3576bb934964cda99a86429ad19bef0/3e73a1536ca3b04419536b3d76c38d57450f3613d9614759efd59f383a132214?apiKey=c3576bb934964cda99a86429ad19bef0&" },
    { name: "Garlic", image: "https://cdn.builder.io/api/v1/image/assets/c3576bb934964cda99a86429ad19bef0/cccbd0111448cf01c30e0e4f85b05f1515f82bbe15e35a09989b1f4e2bd755bc?apiKey=c3576bb934964cda99a86429ad19bef0&" },
    { name: "Pappers", image: "https://cdn.builder.io/api/v1/image/assets/c3576bb934964cda99a86429ad19bef0/44d44215b53ff2b7012450e44ba8a7bb9c807a0dcce068ecf040e0c9e235bb1a?apiKey=c3576bb934964cda99a86429ad19bef0&" },
    { name: "Ginger", image: "https://cdn.builder.io/api/v1/image/assets/c3576bb934964cda99a86429ad19bef0/ce190f21a4aea6a290dee75b343dfdf447e48217caf1fae5bbb7917c7c9e7717?apiKey=c3576bb934964cda99a86429ad19bef0&" },
];

const fruits = [
    { name: "Avocado", image: "https://cdn.builder.io/api/v1/image/assets/c3576bb934964cda99a86429ad19bef0/3fca4510fa5335f33732bfce67b7a51567b1d3c0e9544f8d658f3f9fe5795b19?apiKey=c3576bb934964cda99a86429ad19bef0&" },
    { name: "Apple", image: "https://cdn.builder.io/api/v1/image/assets/c3576bb934964cda99a86429ad19bef0/b0e553af5a519fe0109f9646ef67209d908eb40fd40dc5bfa3cbebe172e5702c?apiKey=c3576bb934964cda99a86429ad19bef0&" },
    { name: "Blueberry", image: "https://cdn.builder.io/api/v1/image/assets/c3576bb934964cda99a86429ad19bef0/27009ddb09ad7c0c321c1b715ec8db07121284f070b9fe6983c430197ec15bd0?apiKey=c3576bb934964cda99a86429ad19bef0&" },
    { name: "Broccoli", image: "https://cdn.builder.io/api/v1/image/assets/c3576bb934964cda99a86429ad19bef0/52feb8aaca9cab5a592ef1ec0d22988968643a4bcfbe02e08eea6533bc1dba1e?apiKey=c3576bb934964cda99a86429ad19bef0&" },
    { name: "Orange", image: "https://cdn.builder.io/api/v1/image/assets/c3576bb934964cda99a86429ad19bef0/4586419f0e9f2e85ad8c6c4a9fdec600255bc79271026bfb13e21cde934096b1?apiKey=c3576bb934964cda99a86429ad19bef0&" },
    { name: "Walnut", image: "https://cdn.builder.io/api/v1/image/assets/c3576bb934964cda99a86429ad19bef0/da901296437357a952f4f35eb8333301ae16b89a5284c9894cab79e42649aa33?apiKey=c3576bb934964cda99a86429ad19bef0&" },
];

function AddNewItems() {
    const [recipeName, setRecipeName] = useState("");
    const [details, setDetails] = useState("");
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
        setPhotoPreview(URL.createObjectURL(file));
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

    return (
        <div className="flex overflow-hidden flex-col items-start p-5 mx-auto w-full bg-white rounded-3xl max-w-[480px]">
            <div className="flex justify-between w-full items-center">
                <button className="p-2 bg-gray-200 rounded-xl text-black font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l14 0" /><path d="M5 12l6 6" /><path d="M5 12l6 -6" /></svg>
                </button>
                <div className="text-lg leading-none text-neutral-700">
                    Add New Items
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
                    ingridents
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
            <div className="flex gap-3 self-stretch mt-3">
                {ingredients.map((ingredient, index) => (
                    <div key={index} className="flex flex-col items-center gap-1">
                        <img
                            loading="lazy"
                            src={ingredient.image}
                            className="object-contain shrink-0 self-start aspect-square rounded-[100px] w-[50px]"
                            alt={ingredient.name}
                        />
                        <div className="flex gap-6 text-xs tracking-wide text-center whitespace-nowrap text-zinc-400">
                            <div className="grow">
                                {ingredient.name}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-5 text-sm tracking-wide uppercase text-neutral-700">
                Details
            </div>
            <textarea
                className="px-4 py-3 mt-2 w-full text-xs tracking-wide bg-white rounded-xl border border-gray-200 text-zinc-400"
                placeholder="Enter recipe details"
                rows="4"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
            />
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