"use client";
import { useCart } from "@/context/context";
import { useState } from "react";

export default function CheckoutPage() {
  const { cart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);

    // Create order data
    const orderData = {
      name: formData.get("name")?.toString().trim(),
      email: formData.get("email")?.toString().trim(),
      phone: formData.get("phone")?.toString().trim(),
      address: formData.get("address")?.toString().trim(),
      cartItems: cart.map((item) => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity ?? 1,
      })),
      total: cart.reduce((acc, item) => acc + item.price * (item.quantity ?? 1), 0),
    };

    if (!orderData.name || !orderData.email || !orderData.phone || !orderData.address) {
      alert("Please fill all required fields.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/createOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const responseData = await response.json();
        alert("Order placed successfully!");
        console.log("Order saved to Sanity:", responseData.order);
      } else {
        const errorData = await response.json();
        alert(`Failed to place the order! ${errorData.error || ""}`);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen font-poppins">
      <main className="py-8 px-4">
        <form onSubmit={handleSubmit}>
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Checkout</h2>

            {/* Inputs */}
            <div className="mb-4">
              <input type="text" name="name" placeholder="Full Name" required className="input w-full" />
            </div>
            <div className="mb-4">
              <input type="email" name="email" placeholder="Email" required className="input w-full" />
            </div>
            <div className="mb-4">
              <input type="tel" name="phone" placeholder="Phone Number" required className="input w-full" />
            </div>
            <div className="mb-4">
              <textarea name="address" placeholder="Address" required className="input w-full"></textarea>
            </div>

            {/* Order Summary */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Order Summary</h3>
              {cart.map((item) => (
                <div key={item._id} className="flex justify-between my-2">
                  <p>{item.name} x {item.quantity ?? 1}</p>
                  <p>₹{(item.price * (item.quantity ?? 1)).toFixed(2)}</p>
                </div>
              ))}
              <div className="flex justify-between font-bold mt-4">
                <p>Total:</p>
                <p>₹{cart.reduce((acc, item) => acc + item.price * (item.quantity ?? 1), 0).toFixed(2)}</p>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800" disabled={isLoading}>
              {isLoading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}