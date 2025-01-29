import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: "2023-01-01",
});

type CartItem = {
  name: string;
  price: number;
  quantity: number;
};

export async function POST(req: Request) {
  try {
    const { name, email, phone, address, cartItems, total }: {
      name: string;
      email: string;
      phone: string;
      address: string;
      cartItems: CartItem[];
      total: number;
    } = await req.json();

    if (!name || !email || !phone || !address || !cartItems.length) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Create order document
    const orderDoc = {
      _type: "order",
      customerName: name,
      email,
      phone,
      address,
      total,
      items: cartItems.map((item) => ({
        _type: "object",
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    };

    const result = await sanityClient.create(orderDoc);

    return NextResponse.json({ message: "Order placed successfully!", order: result }, { status: 200 });
  } catch (error) {
    console.error("Order placement error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
