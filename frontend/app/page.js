import ProductList from "@/components/product-list";
import ProductSidebar from "@/components/sidebar";
import { FilterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-[300px_1fr] container mx-auto my-10 gap-10">
      <Button size={"lg"}  className={"md:hidden w-1/2"}>
        Filter
        <FilterIcon />
      </Button>
      <ProductSidebar />
      <ProductList />
    </main>
  );
}
