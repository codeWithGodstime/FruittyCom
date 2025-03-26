import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"

const queryClient = useQueryClient()


export const removeFavouriteMutation = useMutation({
    mutationFn: (productId) => removeFromFavourite(productId),
    onMutate: async (productId) => {
        await queryClient.cancelQueries(["wishlist"]);
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

export const favouriteMutation = useMutation({
    mutationFn: (productId) => addToFavourite(productId),
    onMutate: async (productId) => {
        await queryClient.cancelQueries(["wishlist"]);

        const previousFavourites = queryClient.getQueryData(["wishlist"]);

        queryClient.setQueryData(["wishlist"], (old) =>
            old?.map((p) =>
                p.id === productId ? { ...p, isFavourite: true } : p
            )
        );

        return { previousFavourites };
    },
    onError: (err, productId, context) => {
        queryClient.setQueryData(["wishlist"], context.previousFavourites);
    },
    onSettled: () => {
        queryClient.invalidateQueries(["wishlist"]);
    },
});

export const addToCartMutation = useMutation({
    mutationFn: (productId) => addToFavourite(productId),
    onMutate: async (productId) => {
        await queryClient.cancelQueries(["wishlist"]);

        const previousFavourites = queryClient.getQueryData(["wishlist"]);

        queryClient.setQueryData(["wishlist"], (old) =>
            old?.map((p) =>
                p.id === productId ? { ...p, isFavourite: true } : p
            )
        );

        return { previousFavourites };
    },
    onError: (err, productId, context) => {
        queryClient.setQueryData(["wishlist"], context.previousFavourites);
    },
    onSettled: () => {
        queryClient.invalidateQueries(["wishlist"]);
    },
});