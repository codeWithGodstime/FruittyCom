"use client"
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "./cards";
import axiosInstance from "@/lib/axiosInstance";

const fetchProducts = async () => {
  const { data } = await axiosInstance.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/`);
  return data.results;
};

const ProductList = () => {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });


  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
