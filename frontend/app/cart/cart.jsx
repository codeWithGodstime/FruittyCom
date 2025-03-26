"use client"

import Image from "next/image"
import Link from "next/link"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import QuantitySelector from "@/components/quantity-selector"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { removeFromFavourite } from "@/lib/utils"
import axiosInstance from "@/lib/axiosInstance"


const getUserCart = async (page = 1) => {
  try {
    const response = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/get_user_cart/`,
      {
        params: { page },
      }
    );

    return response.data; // Assuming DRF pagination structure
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    throw error; // Propagate error for handling in UI
  }
};

export default function CartPage() {
  const cartItems = [
    {
      id: 1,
      name: "Fresh Cabbage",
      price: 14.99,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "Red Capsicum",
      price: 22.0,
      quantity: 2,
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const discount = 5.0
  const tax = 2.0
  const total = subtotal - discount + tax

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-8">My Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-4">Product</th>
                      <th className="text-center p-4">Price</th>
                      <th className="text-center p-4">Quantity</th>
                      <th className="text-center p-4">Total</th>
                      <th className="p-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={60}
                              height={60}
                              className="rounded-md"
                            />
                            <span>{item.name}</span>
                          </div>
                        </td>
                        <td className="text-center p-4">${item.price.toFixed(2)}</td>
                        <td className="p-4">
                          <div className="flex justify-center">
                            <QuantitySelector quantity={item.quantity} onIncrement={() => {}} onDecrement={() => {}} />
                          </div>
                        </td>
                        <td className="text-center p-4">${(item.price * item.quantity).toFixed(2)}</td>
                        <td className="p-4 text-center">
                          <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between mt-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    className="px-4 py-2 border rounded-md bg-gray-50 w-64"
                  />
                  <Button className="absolute right-0 top-0 bottom-0 rounded-l-none bg-black hover:bg-gray-800">
                    Apply Coupon
                  </Button>
                </div>
                <Button variant="outline">Update Cart</Button>
              </div>
            </div>

            <div>
              <div className="border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Cart Total</h2>
                <div className="space-y-3 border-b pb-4 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex justify-between font-bold mb-6">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <Button className="w-full">Proceed to Checkout</Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Newsletter */}
      <div className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h3 className="text-xl font-bold mb-2">Subscribe our Newsletter</h3>
            <p className="text-gray-600">Subscribe to our newsletter to get updates about our latest products.</p>
          </div>
          <div className="flex max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 border rounded-l-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-600"
            />
            <Button className="rounded-l-none bg-green-600 hover:bg-green-700">Subscribe</Button>
          </div>
        </div>
      </div>

      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-1 text-green-500 font-bold text-xl mb-4">
                <span>♥</span> Ecobazar
              </div>
              <p className="text-gray-400 text-sm mb-4">
                We are a team of designers and developers that create high quality products.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400">(219) 555-0114</span>
                <span className="text-gray-400">|</span>
                <span className="text-green-500">info@ecobazar.com</span>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-4">My Account</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/account" className="hover:text-green-500">
                    My Account
                  </Link>
                </li>
                <li>
                  <Link href="/orders" className="hover:text-green-500">
                    Order History
                  </Link>
                </li>
                <li>
                  <Link href="/cart" className="hover:text-green-500">
                    Shopping Cart
                  </Link>
                </li>
                <li>
                  <Link href="/wishlist" className="hover:text-green-500">
                    Wishlist
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Helps</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/contact" className="hover:text-green-500">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/faqs" className="hover:text-green-500">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-green-500">
                    Terms & Condition
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-green-500">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Categories</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/category/fruits" className="hover:text-green-500">
                    Fruits & Vegetables
                  </Link>
                </li>
                <li>
                  <Link href="/category/meat" className="hover:text-green-500">
                    Meat & Fish
                  </Link>
                </li>
                <li>
                  <Link href="/category/snacks" className="hover:text-green-500">
                    Snacks
                  </Link>
                </li>
                <li>
                  <Link href="/category/beverages" className="hover:text-green-500">
                    Beverages
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

