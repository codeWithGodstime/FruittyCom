import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { DialogCloseButton } from "./dialog-content";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToFavourite, removeFromFavourite } from "@/lib/utils";

export function ProductCard({ product }) {
    const queryClient = useQueryClient();

    // Optimistic Mutation for Adding to Favorites
    const favouriteMutation = useMutation({
        mutationFn: (productId) => addToFavourite(productId),
        onMutate: async (productId) => {
            await queryClient.cancelQueries(["wishlist"]);

            const previousFavourites = queryClient.getQueryData(["wishlist"]);

            queryClient.setQueryData(["wishlist"], (old) => ({
                ...old,
                results: old?.results?.filter((p) => p.id !== productId),
            }));

            return { previousFavourites };
        },
        onError: (err, productId, context) => {
            queryClient.setQueryData(["wishlist"], context.previousFavourites);
        },
        onSettled: () => {
            queryClient.invalidateQueries(["wishlist"]);
        },
    });

    // Optimistic Mutation for Removing from Favorites
    const removeFavouriteMutation = useMutation({
        mutationFn: (productId) => removeFromFavourite(productId),
        onMutate: async (productId) => {
            await queryClient.cancelQueries(["wishlist"]);

            const previousFavourites = queryClient.getQueryData(["wishlist"]);

            queryClient.setQueryData(["wishlist"], (old) => ({
                ...old,
                results: old?.results?.filter((p) => p.id !== productId),
            }));

            return { previousFavourites };
        },
        onError: (err, productId, context) => {
            queryClient.setQueryData(["wishlist"], context.previousFavourites);
        },
        onSettled: () => {
            queryClient.invalidateQueries(["wishlist"]);
        },
    });

    const handleFavouriteToggle = () => {
        favouriteMutation.mutate(product.id);

        // if (product?.isFavourite) {
        //     removeFavouriteMutation.mutate(product.id);
        // } else {
        //     console.log("added")
        //     favouriteMutation.mutate(product.id);
        // }
    };

    return (
        <Card className="relative border rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg">
            {/* Badge */}
            {product.discount_percentage && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    Sale {product.discount_percentage}%
                </span>
            )}

            {/* Product Image */}
            <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />

                <div className="absolute top-2 right-2 flex flex-col space-y-2">
                    <Button
                        className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
                        onClick={handleFavouriteToggle}
                        disabled={favouriteMutation.isLoading || removeFavouriteMutation.isLoading}
                    >
                        <Heart
                            size={18}
                            className={product.isFavourite ? "text-red-500" : "text-gray-700"}
                        />
                    </Button>
                    <DialogCloseButton />
                </div>
            </div>

            <div className="flex justify-between p-2 items-center">
                {/* Product Info */}
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                        <span className="text-lg font-bold">${product.price}</span>
                        {product.oldPrice && (
                            <span className="text-sm text-gray-400 line-through">${product.oldPrice}</span>
                        )}
                    </div>
                    <div className="flex space-x-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < product.rating ? "text-yellow-400" : "text-gray-300"}>
                                ★
                            </span>
                        ))}
                    </div>
                </div>

                {/* Add to Cart Button */}
                <Button className={``} size={"icon"}>
                    <ShoppingBag size={20} />
                </Button>
            </div>
        </Card>
    );
}
