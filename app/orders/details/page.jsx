import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function OrderDetailsPage() {
  const orderDetails = {
    id: "B-1012",
    date: "April 24, 2023",
    status: "Completed",
    paymentMethod: "Paypal",
    billingAddress: {
      name: "Dianne Russell",
      address: "3605 Parker Rd. Allentown, New Mexico 31134",
      email: "dianne.russell@gmail.com",
      phone: "(671) 555-0110",
    },
    shippingAddress: {
      name: "Dianne Russell",
      address: "3605 Parker Rd. Allentown, New Mexico 31134",
      email: "dianne.russell@gmail.com",
      phone: "(671) 555-0110",
    },
    items: [
      {
        id: 1,
        name: "Red Capsicum",
        price: 14.0,
        quantity: 5,
        total: 70.0,
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: 2,
        name: "Green Capsicum",
        price: 14.0,
        quantity: 2,
        total: 28.0,
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: 3,
        name: "Green Chili",
        price: 15.7,
        quantity: 10,
        total: 157.0,
        image: "/placeholder.svg?height=60&width=60",
      },
    ],
    subtotal: 255.0,
    discount: 20,
    shipping: 0,
    total: 204.0,
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Order Details</h1>
        <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
          Back to list
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden mb-8">
        <div className="bg-blue-50 p-4 border-b">
          <div className="flex flex-wrap justify-between gap-4">
            <div>
              <span className="text-gray-500 text-sm">Order ID:</span>
              <span className="ml-2 font-medium">{orderDetails.id}</span>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Date:</span>
              <span className="ml-2 font-medium">{orderDetails.date}</span>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Payment Method:</span>
              <span className="ml-2 font-medium">{orderDetails.paymentMethod}</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="font-medium mb-4 text-gray-500">BILLING ADDRESS</h2>
              <div className="space-y-2">
                <p className="font-medium">{orderDetails.billingAddress.name}</p>
                <p>{orderDetails.billingAddress.address}</p>
                <p className="text-gray-500">Email: {orderDetails.billingAddress.email}</p>
                <p className="text-gray-500">Phone: {orderDetails.billingAddress.phone}</p>
              </div>
            </div>

            <div>
              <h2 className="font-medium mb-4 text-gray-500">SHIPPING ADDRESS</h2>
              <div className="space-y-2">
                <p className="font-medium">{orderDetails.shippingAddress.name}</p>
                <p>{orderDetails.shippingAddress.address}</p>
                <p className="text-gray-500">Email: {orderDetails.shippingAddress.email}</p>
                <p className="text-gray-500">Phone: {orderDetails.shippingAddress.phone}</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white">1</div>
                <span className="font-medium">Order Placed</span>
              </div>
              <div className="flex-1 mx-4 h-1 bg-green-600"></div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white">2</div>
                <span className="font-medium">Processing</span>
              </div>
              <div className="flex-1 mx-4 h-1 bg-green-600"></div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white">3</div>
                <span className="font-medium">On The Way</span>
              </div>
              <div className="flex-1 mx-4 h-1 bg-green-600"></div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white">4</div>
                <span className="font-medium">Delivered</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-medium mb-4 text-gray-500">PRODUCT</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-500">PRODUCT</th>
                    <th className="text-center p-4 font-medium text-gray-500">PRICE</th>
                    <th className="text-center p-4 font-medium text-gray-500">QUANTITY</th>
                    <th className="text-right p-4 font-medium text-gray-500">SUBTOTAL</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {orderDetails.items.map((item) => (
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
                      <td className="p-4 text-center">${item.price.toFixed(2)}</td>
                      <td className="p-4 text-center">x{item.quantity}</td>
                      <td className="p-4 text-right">${item.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end mt-6">
              <div className="w-full max-w-md">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${orderDetails.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount</span>
                    <span>{orderDetails.discount}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>{orderDetails.shipping === 0 ? "Free" : `$${orderDetails.shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span>${orderDetails.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

