"use client"

import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { removeFromFavourite } from "@/lib/utils"
import axiosInstance from "@/lib/axiosInstance"


const getUserWishlist = async (page = 1) => {
  try {
    const response = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/get_wishlists/`,
      {
        params: { page }, // Pass pagination parameter
      }
    );

    return response.data; // Assuming DRF pagination structure
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    throw error; // Propagate error for handling in UI
  }
};


export default function WishlistPage() {
  const queryClient = useQueryClient()

  const removeFavouriteMutation = useMutation({
    mutationFn: (productId) => removeFromFavourite(productId),
    onMutate: async (productId) => {
      await queryClient.cancelQueries(["wishlist"]);
      console.log("Mutionation hanppend")
      const previousFavourites = queryClient.getQueryData(["wishlist"]);

      queryClient.setQueryData(["wishlist"], (old) => ({
        ...old,
        results: old?.results?.filter((p) => p.id !== productId),
      }));

      console.log("halloebd")
      return { previousFavourites };
    },
    onError: (err, productId, context) => {
      queryClient.setQueryData(["wishlist"], context.previousFavourites);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["wishlist"]);
    },
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['wishlist'],
    queryFn: () => getUserWishlist()
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <p className="text-lg font-semibold">Loading Wishlist...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-red-500">
        <p className="text-lg font-semibold">Failed to load wishlist.</p>
        <p className="text-sm">{error.message}</p>
      </div>
    );
  }


  const wishlistItems = data.results

  return (
    <div className="container mx-auto px-4 py-12">
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
                    <span className="font-medium">{item.product_name}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">${item.product_price}</span>
                    {/* {item.originalPrice && (
                      <span className="text-gray-400 line-through text-sm">${item.originalPrice.toFixed(2)}</span>
                    )} */}
                  </div>
                </td>
                <td className="p-4">
                  {item.in_stock ? (
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
                    className={`bg-green-600 hover:bg-green-700 text-white ${!item.in_stock ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={!item.in_stock}
                  >
                    Add to Cart
                  </Button>
                </td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => { removeFavouriteMutation.mutate(item.product) }}
                    className="text-gray-400 hover:text-gray-600">
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

