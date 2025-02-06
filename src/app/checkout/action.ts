"use server";

import Stripe from "stripe";

export async function createPaymentIntent({
  amount,
  customerDetails,
  cartItems,
}: {
  amount: number;
  customerDetails: { name: string; email: string; phone: string };
  cartItems: { name: string; price: number; quantity: number; image: string }[];
}) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-01-27.acacia",
  });

  try {
    // Create a customer
    const customer = await stripe.customers.create({
      name: customerDetails.name,
      email: customerDetails.email,
      phone: customerDetails.phone,
    });

    // Create payment intent and associate with the customer
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        // Add product details to metadata
        products: JSON.stringify(
          cartItems.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          }))
        ),
        customerName: customerDetails.name,
        customerEmail: customerDetails.email,
        customerPhone: customerDetails.phone,
      },
    });

    return {
      clientSecret: paymentIntent.client_secret,
    };
  } catch (error) {
    console.error("Stripe Error:", error);
    throw error;
  }
}
