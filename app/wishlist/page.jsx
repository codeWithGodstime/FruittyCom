"use client"

import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WishlistPage() {
  const wishlistItems = [
    {
      id: 1,
      name: "Green Capsicum",
      price: 14.99,
      originalPrice: 20.0,
      image: "/placeholder.svg?height=80&width=80",
      inStock: true,
    },
    {
      id: 2,
      name: "Chinese Cabbage",
      price: 45.0,
      originalPrice: null,
      image: "/placeholder.svg?height=80&width=80",
      inStock: true,
    },
    {
      id: 3,
      name: "Fresh Support Mango",
      price: 80.0,
      originalPrice: null,
      image: "/placeholder.svg?height=80&width=80",
      inStock: false,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-2xl font-bold mb-8">My Wishlist</h1>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4 font-medium text-gray-500 uppercase text-xs tracking-wider">Product</th>
              <th className="text-left p-4 font-medium text-gray-500 uppercase text-xs tracking-wider">Price</th>
              <th className="text-left p-4 font-medium text-gray-500 uppercase text-xs tracking-wider">Stock Status</th>
              <th className="p-4"></th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {wishlistItems.map((item) => (
              <tr key={item.id}>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-md"
                    />
                    <span className="font-medium">{item.name}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">${item.price.toFixed(2)}</span>
                    {item.originalPrice && (
                      <span className="text-gray-400 line-through text-sm">${item.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  {item.inStock ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      In Stock
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Out of Stock
                    </span>
                  )}
                </td>
                <td className="p-4">
                  <Button
                    className={`bg-green-600 hover:bg-green-700 text-white ${!item.inStock ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={!item.inStock}
                  >
                    Add to Cart
                  </Button>
                </td>
                <td className="p-4 text-center">
                  <button className="text-gray-400 hover:text-gray-600">
                    <X className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex items-center gap-2">
        <span className="text-gray-600">Share:</span>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
            <span className="text-blue-600">f</span>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
            <span className="text-blue-400">t</span>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
            <span className="text-red-600">p</span>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
            <span className="text-pink-600">i</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

