"use client";
import { useCart } from "@/context/context";
import { useState, useEffect } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "./action";

// Stripe configuration
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

// Define the interface for order data
interface OrderData {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  cartItems: {
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  total: number;
}

export default function CheckoutPage() {
  const { cart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);

    const orderData: OrderData = {
      customerName: formData.get("name")?.toString().trim() ?? '',
      email: formData.get("email")?.toString().trim() ?? '',
      phone: formData.get("phone")?.toString().trim() ?? '',
      address: formData.get("address")?.toString().trim() ?? '',
      city: formData.get("city")?.toString().trim() ?? '',
      cartItems: cart.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity ?? 1,
        image: item.image,
      })),
      total: cart.reduce(
        (acc, item) => acc + item.price * (item.quantity ?? 1),
        0
      ),
    };

    if (
      !orderData.customerName ||
      !orderData.email ||
      !orderData.phone ||
      !orderData.address ||
      !orderData.city
    ) {
      alert("Please fill all required fields.");
      setIsLoading(false);
      return;
    }

    setOrderData(orderData);
    setIsLoading(false);
  };

  useEffect(() => {
    if (orderData) {
      createPaymentIntent({
        amount: orderData.total * 100,
        customerDetails: {
          name: orderData.customerName,
          email: orderData.email,
          phone: orderData.phone,
        },
        cartItems: orderData.cartItems,
      })
        .then((res) => setClientSecret(res.clientSecret))
        .catch((error) => console.error("Error creating payment intent:", error));
    }
  }, [orderData]);

  if (!clientSecret) {
    return (
      <div className="bg-gray-100 min-h-screen font-poppins">
        <main className="py-8 px-4">
          <form onSubmit={handleSubmit}>
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Checkout</h2>

              {/* Inputs */}
              <div className="mb-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  className="input w-full"
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="input w-full"
                />
              </div>
              <div className="mb-4">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  required
                  className="input w-full"
                />
              </div>
              <div className="mb-4">
                <textarea
                  name="address"
                  placeholder="Address"
                  required
                  className="input w-full"
                ></textarea>
              </div>
              <div className="mb-4">
                <input
                  name="city"
                  placeholder="City"
                  required
                  className="input w-full"
                />
              </div>

              {/* Order Summary */}
              <div className="mb-4">
                <h3 className="text-xl font-semibold">Order Summary</h3>
                {cart.map((item) => (
                  <div key={item._id} className="flex justify-between my-2">
                    <Image
                      src={urlFor(item.image).width(200).url()}
                      alt={"product image"}
                      width={200}
                      height={200}
                    />

                    <p>
                      {item.name} x {item.quantity ?? 1}
                    </p>
                    <p>₹{(item.price * (item.quantity ?? 1)).toFixed(2)}</p>
                  </div>
                ))}
                <div className="flex justify-between font-bold mt-4">
                  <p>Total:</p>
                  <p>
                    ₹
                    {cart
                      .reduce(
                        (acc, item) => acc + item.price * (item.quantity ?? 1),
                        0
                      )
                      .toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
                disabled={isLoading}
              >
                {isLoading ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </form>
        </main>
      </div>
    );
  }

  // Inside the CheckoutPage component

return (
  <div className="bg-gray-100 min-h-screen font-poppins">
    <main className="py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Payment</h2>

        {/* Conditionally render PaymentForm only when orderData is not null */}
        {orderData ? (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentForm orderData={orderData} />
          </Elements>
        ) : (
          <p>Loading...</p> // Optionally show a loading message
        )}
      </div>
    </main>
  </div>
);
}

function PaymentForm({ orderData }: { orderData: OrderData }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message || "An unknown error occurred");
      setIsProcessing(false);
    } else {
      setErrorMessage(null);
      alert("Payment successful!");

      // Save order to Sanity after successful payment
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
        setIsProcessing(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Order Summary */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Order Summary</h3>
        {orderData.cartItems.map((item) => (
          <div key={item.name} className="flex justify-between my-2">
            <Image
              src={urlFor(item.image).width(200).url()}
              alt={"product image"}
              width={200}
              height={200}
            />
            <p>
              {item.name} x {item.quantity ?? 1}
            </p>
            <p>₹{(item.price * (item.quantity ?? 1)).toFixed(2)}</p>
          </div>
        ))}
        <div className="flex justify-between font-bold mt-4">
          <p>Total:</p>
          <p>₹{orderData.total.toFixed(2)}</p>
        </div>
      </div>

      {/* Stripe Payment Element */}
      <PaymentElement />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
        disabled={isProcessing}
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>

      {/* Error message */}
      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
    </form>
  );
}
