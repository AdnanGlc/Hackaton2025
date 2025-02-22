import React from 'react';
import UserIcon from "../assets/UserIcon.png";

const Profile = () => {
  // Sample data for the profile (you can replace this with dynamic data from an API)
  const profileData = {
    photo: UserIcon,
    username: "JohnDoe123",
    email: "john.doe@example.com",
    points: 850,
    progress: 200, // Progress now ranges from 0 to 10,000
  };

  // Sample customer purchases with points earned (you can expand this with more data or fetch from an API)
  const purchases = [
    { id: 1, product: "Product 1", CO2: "2 CO2/kg", amount: "40 BAM", pointsEarned: 140 },
    { id: 2, product: "Product 2", CO2: "1.2 CO2/kg", amount: "60 BAM", pointsEarned: 200 },
    { id: 3, product: "Product 3", CO2: "2.1 CO2/kg", amount: "75 BAM", pointsEarned: 250 },
  ];

  // Calculate the percentage for the progress bar (0-100%) based on 0-10,000 scale
  const progressPercentage = (profileData.progress / 400) * 100;

  // Determine the progress bar color based on progress percentage
  const getProgressBarColor = () => {
    if (progressPercentage >= 80) {
      return 'bg-red-600'; // Red for 80% or higher (close to 10,000)
    } else if (progressPercentage >= 50) {
      return 'bg-amber-500'; // Medium orange for 50%–79%
    } else {
      return 'bg-amber-400'; // Light orange for 0%–49%
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center space-x-4">
            <img
              src={profileData.photo}
              alt={`${profileData.username}'s profile`}
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
            <label className="block text-sm font-medium text-gray-700">Progress</label>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
              <div
                className={`${getProgressBarColor()} h-2.5 rounded-full`}
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-1">{profileData.progress} / 400</p>
          </div>
        </div>

        {/* Customer Purchases */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Customer Purchases</h2>
          <div className="space-y-4">
            {purchases.map((purchase) => (
              <div key={purchase.id} className="flex justify-between items-center p-2 border-b border-gray-200">
                <div>
                  <p className="font-medium text-gray-800">{purchase.product}</p>
                  <p className="text-sm text-gray-600">{purchase.CO2}</p>
                  <p className="text-sm text-gray-600">Coins Earned: {purchase.pointsEarned}</p>
                </div>
                <p className="text-gray-800 font-bold">{purchase.amount}</p>
              </div>
            ))}
          </div>
          {purchases.length === 0 && (
            <p className="text-center text-gray-500">No purchases yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;