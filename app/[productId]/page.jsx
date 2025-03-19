"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RelatedProducts from "@/components/related-products"
import QuantitySelector from "@/components/quantity-selector"

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)

  const thumbnails = [
    "/placeholder.svg?height=80&width=80",
    "/placeholder.svg?height=80&width=80",
    "/placeholder.svg?height=80&width=80",
    "/placeholder.svg?height=80&width=80",
  ]

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-4">
            {thumbnails.map((thumb, index) => (
              <div
                key={index}
                className={`border rounded-md p-1 cursor-pointer ${activeImage === index ? "border-green-500" : "border-gray-200"}`}
                onClick={() => setActiveImage(index)}
              >
                <Image
                  src={thumb || "/placeholder.svg"}
                  alt={`Chinese Cabbage thumbnail ${index + 1}`}
                  width={60}
                  height={60}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="flex-1">
            <Image
              src="/placeholder.svg?height=500&width=500"
              alt="Chinese Cabbage"
              width={500}
              height={500}
              className="object-cover rounded-md"
            />
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded">In Stock</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Chinese Cabbage</h1>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${star <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">4 Reviews</span>
            <span className="text-sm text-gray-500">SKU: 2451584</span>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 line-through">$48.00</span>
              <span className="text-2xl font-bold">$17.28</span>
              <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">64% Off</span>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-gray-600 w-16">Brand:</span>
              <div className="flex items-center gap-2">
                <Image
                  src="/placeholder.svg?height=24&width=24"
                  alt="Brand logo"
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <span className="text-sm">Ecobazar</span>
              </div>
            </div>

            <p className="text-gray-600 mb-6">
              Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla nisl
              diam, blandit vel consequat nec, ultrices et ipsum. Nulla varius magna a consequat pulvinar.
            </p>

            <div className="flex items-center gap-4 mb-6">
              <QuantitySelector quantity={quantity} onIncrement={incrementQuantity} onDecrement={decrementQuantity} />

              <Button className="flex-1 bg-green-600 hover:bg-green-700">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>

              <Button variant="outline" size="icon" className="rounded-full">
                <Heart className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-600 w-16">Category:</span>
                <Link href="/category/vegetables" className="text-gray-800 hover:text-green-600">
                  Vegetables
                </Link>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-gray-600 w-16">Tags:</span>
                <div className="flex flex-wrap gap-1">
                  <Link href="/tag/vegetables" className="text-gray-800 hover:text-green-600">
                    Vegetables,
                  </Link>
                  <Link href="/tag/healthy" className="text-gray-800 hover:text-green-600">
                    Healthy,
                  </Link>
                  <Link href="/tag/chinese" className="text-gray-800 hover:text-green-600">
                    Chinese,
                  </Link>
                  <Link href="/tag/cabbage" className="text-gray-800 hover:text-green-600">
                    Cabbage,
                  </Link>
                  <Link href="/tag/green-cabbage" className="text-gray-800 hover:text-green-600">
                    Green Cabbage
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-gray-600 w-16">Share Item:</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                    <span className="text-blue-600">f</span>
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                    <span className="text-blue-400">t</span>
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                    <span className="text-red-600">p</span>
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                    <span className="text-pink-600">i</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <Tabs defaultValue="descriptions" className="mb-12">
        <TabsList className="border-b w-full justify-start rounded-none h-auto p-0 bg-transparent space-x-8">
          <TabsTrigger
            value="descriptions"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:text-green-600 pb-2 px-0"
          >
            Descriptions
          </TabsTrigger>
          <TabsTrigger
            value="additional"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:text-green-600 pb-2 px-0"
          >
            Additional Information
          </TabsTrigger>
          <TabsTrigger
            value="feedback"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:text-green-600 pb-2 px-0"
          >
            Customer Feedback
          </TabsTrigger>
        </TabsList>
        <TabsContent value="descriptions" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 text-gray-600 space-y-4">
              <p>
                Sed commodo aliquam dui ac porta. Fusce ipsum felis, imperdiet at posuere ac, viverra at mauris.
                Maecenas tincidunt ligula a sem vestibulum pharetra. Maecenas auctor tortor lacus, nec laoreet nisi
                porttitor vel. Etiam tincidunt metus vel dui interdum sollicitudin. Mauris sem ante, vestibulum nec eros
                vitae, aliquam mollis lacus. Sed et condimentum arcu, id molestie tellus. Nulla facilisis. Nam
                scelerisque vitae justo a convallis. Morbi urna ipsum, placerat quis commodo quis, egestas elementum
                leo. Donec convallis mollis enim. Aliquam id mi quam. Phasellus nec fringilla elit.
              </p>
              <p>
                Nulla mauris tellus, feugiat quis pharetra sed, gravida ac dui. Sed laculis, metus faucibus elementum
                tincidunt, turpis mi viverra velit, pellentesque tristique neque mi eget nulla. Proin luctus elementum
                neque et pharetra.
              </p>

              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-green-600 bg-green-100 rounded-full p-1">✓</span>
                  <span>100 g of fresh leaves provides:</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600 bg-green-100 rounded-full p-1">✓</span>
                  <span>Aliquam ac erat at augue volutpat elementum.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600 bg-green-100 rounded-full p-1">✓</span>
                  <span>Quisque nisl enim aget sapien molestie.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600 bg-green-100 rounded-full p-1">✓</span>
                  <span>Proin convallis odio volutpat finibus posuere.</span>
                </li>
              </ul>

              <p>
                Cras et diam maximus, accumsan sapien et, sollicitudin velit. Nulla blandit eros non turpis lobortis
                iaculis at ut massa.
              </p>
            </div>
            <div>
              <div className="relative rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Delivery person with groceries"
                  width={300}
                  height={300}
                  className="object-cover w-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button className="rounded-full bg-green-600 hover:bg-green-700 h-12 w-12">
                    <span className="text-white text-xl">▶</span>
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-green-600 font-semibold">64% Discount</span>
                  </div>
                  <p className="text-sm text-gray-600">Save your 64% money with us</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-green-600 font-semibold">100% Organic</span>
                  </div>
                  <p className="text-sm text-gray-600">100% Organic Vegetables</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="additional" className="pt-6">
          <div className="text-gray-600">
            <p>Additional product information will be displayed here.</p>
          </div>
        </TabsContent>
        <TabsContent value="feedback" className="pt-6">
          <div className="text-gray-600">
            <p>Customer reviews and feedback will be displayed here.</p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      <RelatedProducts />

      {/* Newsletter */}
      <div className="border-t mt-12 pt-12">
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
  )
}

