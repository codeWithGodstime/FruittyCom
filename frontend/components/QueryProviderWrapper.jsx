"use client"
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient()

export default function QueryWrapper({ children }) {
    return <SessionProvider>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    </SessionProvider>
}