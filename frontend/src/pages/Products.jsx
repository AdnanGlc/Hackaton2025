import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

const Products = () => {
  const [cart, setCart] = useState([]);
  const [discountedTotal, setDiscountedTotal] = useState(0);
  const [showDiscount, setShowDiscount] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showBuyPopup, setShowBuyPopup] = useState(false);
  const [products, setProducts] = useState([]); // State for storing products from API
  const [user, setUser] = useState({ id: null, points: 0 }); // Initial state with id and points
  const [dummyUser, setDummyUser] = useState({ id: null, points: 0 });
  useEffect(() => {
    // Fetch user data from API
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "https://iotimages-f9fegmephhc5c8e7.canadacentral-01.azurewebsites.net/api/GetUserData",
          {
            method: "GET",
            credentials: "include", // This ensures cookies are sent with the request
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        // Extract the userId and points and update the state
        const updatedUser = {
          id: data.id, // Assuming `id` in the response is the userId
          points: data.points || 0,
          name: data.userName, // Default to 0 if points are not provided
        };
        setDummyUser(updatedUser);
        setUser(updatedUser);
        console.log(updatedUser);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  useEffect(() => {
    // Fetch products from the backend
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://iotimages-f9fegmephhc5c8e7.canadacentral-01.azurewebsites.net/api/ProductGetAllEndpoint"
        );
        const data = await response.json();
        setProducts(data); // Set the products state with the fetched data
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    if (showDiscount) {
      applyDiscount();
    }
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      // Check if the product is already in the cart
      if (!prevCart.find((item) => item.id === product.id)) {
        return [...prevCart, product]; // Add the product if it's not already in the cart
      }
      return prevCart; // Do nothing if the product is already in the cart
    });
  };

  const clearCart = () => {
    console.log(cart);
    setCart([]);
    setShowDiscount(false);
    setDiscountedTotal(0);
    localStorage.removeItem("cart");
  };

  const applyDiscount = () => {
    const total = cart.reduce((acc, item) => acc + item.price, 0); // No quantity, just price of selected items
    const discount = dummyUser.points * 0.01;
    setDiscountedTotal(Math.max(total - discount, 0));
  };

  const checkout = () => {
    applyDiscount();
    setShowDiscount(true);
  };

  const usePoints = async () => {
    if (cart.length === 0) return;
    const totalPoints = cart.reduce((acc, item) => acc + item.points, 0);
    dummyUser.points = totalPoints;
    const userId = user.id; // Get userId from the session/cookie or state
    const receipt = cart.map((item) => ({
      productId: item.id, // mapping 'id' to 'productId'
      points: item.points, // directly using 'points'
      co2PerKg: item.co2PerKg, // directly using 'co2PerKg'
      quantityKg: item.quantityKg, // directly using 'quantityKg'
    }));
    console.log(receipt);
    const requestBody = {
      userID: userId,
      receipt: receipt,
    };

    try {
      const response = await fetch(
        "https://iotimages-f9fegmephhc5c8e7.canadacentral-01.azurewebsites.net/api/UserZeroPoints",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(requestBody),
          credentials: "include", // Send cookies with the request
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update points");
      }

      const data = await response.json();
      // Handle success (e.g., update the user points in the state)
      setShowBuyPopup(true);
      confetti({ particleCount: 200, spread: 70, origin: { y: 0.6 } });
      setTimeout(() => {
        setShowBuyPopup(false);
        clearCart();
      }, 2000);
      console.log("Points updated:", data);
    } catch (error) {
      console.error("Error claiming points:", error);
    }
  };

  const claimPoints = async () => {
    if (cart.length === 0) return;
    const totalPoints = cart.reduce((acc, item) => acc + item.points, 0);
    dummyUser.points = totalPoints;
    const userId = user.id; // Get userId from the session/cookie or state
    const receipt = cart.map((item) => ({
      productId: item.id, // mapping 'id' to 'productId'
      points: item.points, // directly using 'points'
      co2PerKg: item.co2PerKg, // directly using 'co2PerKg'
      quantityKg: item.quantityKg, // directly using 'quantityKg'
    }));
    console.log(receipt);
    const requestBody = {
      userID: userId,
      receipt: receipt,
    };

    try {
      const response = await fetch(
        "https://iotimages-f9fegmephhc5c8e7.canadacentral-01.azurewebsites.net/api/UserAddPoints",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(requestBody),
          credentials: "include", // Send cookies with the request
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update points");
      }

      const data = await response.json();
      // Handle success (e.g., update the user points in the state)
      console.log("Points updated:", data);
      setShowPopup(true);
      confetti({ particleCount: 200, spread: 70, origin: { y: 0.6 } });
      setTimeout(() => {
        setShowPopup(false);
        clearCart();
      }, 2000);
    } catch (error) {
      console.error("Error claiming points:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 relative flex flex-col items-center justify-center z-0">
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg text-center">
            <p className="text-lg font-bold">🎉 Points Added!</p>
          </div>
        </div>
      )}
      {showBuyPopup && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg text-center">
            <p className="text-lg font-bold">🎉 Points Used!</p>
          </div>
        </div>
      )}
      <div className="max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Our Products</h2>
        <div className="space-y-2">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between min-h-[6rem]"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-24 h-24 rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{product.name}</h3>
                  <p className="text-sm text-gray-600">
                    {product.co2PerKg} Co2/kg
                  </p>
                  <p className="text-lg font-bold text-gray-900 mt-1">
                    ${product.price}
                  </p>
                  <p className="text-sm text-green-700 font-semibold">
                    Points: {product.points}
                  </p>
                </div>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-2xl leading-none"
              >
                <span className="relative top-[-3px]">+</span>
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 mt-6">
          <h2 className="text-xl font-bold mb-4">🛒 Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <div className="space-y-2">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-gray-100 p-3 rounded-md"
                >
                  <div>
                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-600">${item.price}</p>
                    <p className="text-sm text-green-700">
                      Points: {item.points}
                    </p>
                  </div>
                  <p className="text-lg font-bold text-gray-900">
                    ${item.price}
                  </p>
                </div>
              ))}
            </div>
          )}

          {showDiscount && (
            <div className="mt-4 p-2 bg-green-100 text-green-800 rounded-md text-center transition-opacity duration-500">
              <p className="text-lg font-semibold">Discount Applied!</p>
              <p className="text-gray-600 line-through">
                Total: ${cart.reduce((acc, item) => acc + item.price, 0)}
              </p>
              <p className="text-2xl font-bold text-green-600">
                New Total: ${discountedTotal}
              </p>
              <button
                onClick={usePoints}
                className="bg-green-500 text-white px-4 py-2 rounded-md mt-1"
              >
                Use Points
              </button>
            </div>
          )}
          <div className="flex justify-between mt-4 gap-1">
            <button
              onClick={checkout}
              className="bg-blue-500 text-white px-4 py-2 rounded-xl w-1/3 h-15"
            >
              Checkout
            </button>
            <button
              onClick={clearCart}
              className="bg-red-500 text-white px-4 py-2 rounded-xl w-1/3 h-15"
            >
              Clear Cart
            </button>
            <button
              onClick={claimPoints}
              disabled={cart.length === 0}
              className={`px-4 py-2 rounded-xl w-1/3 h-15 ${
                cart.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 text-white"
              }`}
            >
              Claim Points
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
