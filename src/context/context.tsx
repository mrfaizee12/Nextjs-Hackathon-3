"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

type ProviderContextType = {
  children: React.ReactNode;
};

export interface Products {
  _id: string;
  id: string;
  name: string;
  inventory: number;
  price: number;
  status: string;
  category: string;
  size: string[];
  colors: string[];
  image: string;
  quantity?: number;
}

interface CreateContextType {
  cart: Products[];
  countWish: number;
  count: number;
  addToCart: (data: Products) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  addToWishlist: (data: Products) => void;
  wishlist: Products[];
  removeFromWishlist: (id: string) => void;
}

export const CartContext = createContext<CreateContextType | null>(null);

export default function Context({ children }: ProviderContextType) {
  const [cart, setCart] = useState<Products[]>([]);
  const [count, setCount] = useState<number>(0);
  const [countWish, setCountWish] = useState<number>(0);
  const [wishlist, setWishlist] = useState<Products[]>([]);

  // Load cart and wishlist from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
      setCount(JSON.parse(storedCart).length);
    }

    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
      setCountWish(JSON.parse(storedWishlist).length);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    setCount(cart.length); // Update count based on cart length
  }, [cart]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    setCountWish(wishlist.length); // Update countWish based on wishlist length
  }, [wishlist]);

  // Add item to cart
  const addToCart = (data: Products) => {
    const existingProduct = cart.find((item) => item._id === data._id);

    if (existingProduct) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item._id === data._id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...data, quantity: 1 }]);
    }

    toast("Item added to cart!", {
      description: `${data.name} has been successfully added to your cart.`,
      action: {
        label: "View Cart",
        onClick: () => console.log("cart"), // Or navigate to cart page
      },
    });
  };

  // Remove item from cart
  const removeFromCart = (_id: string) => {
    setCart((prevItems) => prevItems.filter((item) => item._id !== _id));
    toast("Item removed from cart!", {
      description: "The item has been successfully removed from your cart.",
    });
  };

  // Update item quantity in cart
  const updateCartQuantity = (id: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id ? { ...item, quantity } : item
      )
    );
  };

  // Add item to wishlist
  const addToWishlist = (data: Products) => {
    const updatedWishlist = wishlist.some((p) => p._id === data._id)
      ? wishlist.filter((p) => p._id !== data._id) // Remove if already exists
      : [...wishlist, data]; // Add if not exists

    setWishlist(updatedWishlist);

    toast("Item added to wishlist!", {
      description: `${data.name} has been successfully added to your wishlist.`,
      action: {
        label: "View Wishlist",
        onClick: () => console.log("wishlist"), // Or navigate to wishlist page
      },
    });
  };

  // Remove item from wishlist
  const removeFromWishlist = (id: string) => {
    setWishlist((prevWish) => prevWish.filter((item) => item._id !== id));
    toast("Item removed from wishlist!", {
      description: "The item has been successfully removed from your wishlist.",
    });
  };

  return (
    <CartContext.Provider
      value={{
        count,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        addToWishlist,
        wishlist,
        countWish,
        removeFromWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};