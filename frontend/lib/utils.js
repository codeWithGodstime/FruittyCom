import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import axiosInstance from "./axiosInstance";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export async function addToFavourite(product_id) {
  console.log("📢 Calling addToFavourite with product_id:", product_id);

  try {
    const data = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/add_to_wishlist/`,
      { product: product_id }
    );
    
    console.log("✅ addToFavourite Success:", data);
    return data;
  } catch (error) {
    console.error("❌ addToFavourite Error:", error);
    throw error;
  }
}

export async function removeFromFavourite(product_id) {
  console.log("📢 Calling remove with product_id:", product_id);
  try {
    const data = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/remove_from_wishlist/`,
      { product_id: product_id }
    );
    
    console.log("✅ remove Success:", data);
    return data;
  } catch (error) {
    console.error("❌ addToFavourite Error:", error);
    throw error;
  }
}

export async function addToCart(product_id) {
  
}

export async function removeFromCart(product_id) {
  
}