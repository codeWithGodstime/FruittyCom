import products from "@/data/products"
import { ProductCard } from "./cards"

const ProductList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {
            products.map((product, index)=> (
                <ProductCard key={index} product={product} />
            ))
        }
    </div>
  )
}

export default ProductList