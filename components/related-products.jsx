import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function RelatedProducts() {
  const products = [
    {
      id: 1,
      name: "Green Apple",
      price: 14.99,
      originalPrice: 20.99,
      rating: 5,
      image: "/placeholder.svg?height=200&width=200",
      sale: true,
    },
    {
      id: 2,
      name: "Fresh Cauliflower",
      price: 13.99,
      originalPrice: null,
      rating: 4,
      image: "/placeholder.svg?height=200&width=200",
      sale: false,
    },
    {
      id: 3,
      name: "Green Bell Pepper",
      price: 14.99,
      originalPrice: null,
      rating: 5,
      image: "/placeholder.svg?height=200&width=200",
      sale: false,
    },
    {
      id: 4,
      name: "Green Onion",
      price: 11.99,
      originalPrice: 13.99,
      rating: 4,
      image: "/placeholder.svg?height=200&width=200",
      sale: false,
    },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden group">
            <div className="relative">
              {product.sale && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
                  Sale!
                </span>
              )}
              <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full bg-white">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              <Link href={`/product/${product.id}`}>
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="object-cover w-full h-48"
                />
              </Link>
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 flex justify-center p-2 translate-y-full group-hover:translate-y-0 transition-all">
                <Button className="bg-green-600 hover:bg-green-700 text-xs h-8">
                  <ShoppingBag className="h-3 w-3 mr-1" />
                  Add to Cart
                </Button>
              </div>
            </div>
            <div className="p-4">
              <Link href={`/product/${product.id}`} className="hover:text-green-600">
                <h3 className="font-medium mb-1">{product.name}</h3>
              </Link>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-3 w-3 ${star <= product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-gray-400 text-sm line-through">${product.originalPrice}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

