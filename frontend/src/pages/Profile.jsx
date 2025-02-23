import React, { useState, useEffect } from "react";
import UserIcon from "../assets/UserIcon.png";

const Profile = () => {
  const [user, setUser] = useState({
    id: null,
    points: 0,
    userName: "",
    email: "",
  });
  const [userPurchases, setUserPurchases] = useState([]);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/GetUserData", {
          method: "GET",
          credentials: "include", // Ensures cookies are sent with the request
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const updatedUser = {
          id: data.id,
          points: data.points || 0,
          userName: data.userName,
          email: data.email,
          progress: data.co2ThisMonth,
        };

        setUser(updatedUser);
        console.log(user.progress);
        console.log("User Data:", updatedUser);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Fetch user purchases when user ID is available
  useEffect(() => {
    if (!user.id) return; // Only fetch if user ID exists

    const fetchUserPurchases = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/UserGetProducts?request=${user.id}`,
          {
            method: "GET", // Use GET instead of POST
            headers: {
              Accept: "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setUserPurchases(data);
        console.log("User Purchases:", data);
      } catch (error) {
        console.error("Error fetching user purchases:", error);
      }
    };

    fetchUserPurchases();
  }, [user.id]);

  const profileData = {
    photo: UserIcon,
    username: user.userName,
    email: user.email,
    points: user.points,
    progress: user.progress,
  };

  const progressPercentage = (profileData.progress / 400) * 100;

  const getProgressBarColor = () => {
    if (progressPercentage >= 80) return "bg-red-600";
    if (progressPercentage >= 50) return "bg-amber-500";
    return "bg-amber-400";
  };
  const handleRemoveProduct = async (productId) => {
    const userId = user.id; // userId should be a string representing GUID

    if (!userId || !productId) {
      console.error("Invalid userId or productId:", userId, productId);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/UserProductRemove",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // If you're using cookies for session management
          body: JSON.stringify({ userId: userId, productId: productId }),
        }
      );

      if (response.ok) {
        // Successfully removed product, update the UI
        setUserPurchases(
          userPurchases.filter((purchase) => purchase.productId !== productId)
        );
        console.log("Product removed successfully");
      } else {
        console.error("Error removing product", response.statusText);
      }
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center space-x-4">
            <img
              src={
                "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/480px-User_icon_2.svg.png"
              }
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold">{profileData.username}</h1>
              <p className="text-gray-600">{profileData.email}</p>
              <p className="text-gray-800 mt-1">Coins: {profileData.points}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Progress
            </label>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
              <div
                className={`${getProgressBarColor()} h-2.5 rounded-full`}
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {profileData.progress} / 400
            </p>
          </div>
        </div>

        {/* Customer Purchases */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Available Products</h2>
          <div className="space-y-4">
            {userPurchases.length > 0 ? (
              userPurchases.map((purchase) => (
                <div
                  key={purchase.productId} // Use productId directly
                  className="flex justify-between items-center p-2 border-b border-gray-200"
                >
                  <div>
                    <p className="font-medium text-gray-800">{purchase.name}</p>
                    <p className="text-sm text-gray-600">
                      {purchase.co2PerKg} CO2/kg
                    </p>
                    <p className="text-sm text-gray-600">
                      Points Earned: {purchase.points}
                    </p>
                  </div>
                  <p className="text-gray-800 font-bold">
                    {purchase.quantityKg} kg
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    onClick={() => handleRemoveProduct(purchase.productId)} // Ensure correct productId
                    className="cursor-pointer text-red-600"
                  >
                    <path d="M19 13H5v-2h14v2z" fill="currentColor" />
                  </svg>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No purchases yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
