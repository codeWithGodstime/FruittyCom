"use client"
import { HeartIcon, MapPin } from "lucide-react"
import Link from "next/link"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { CartDialog } from "./cart-dialog"
import { useRouter } from "next/navigation"

const Header = () => {
    const router = useRouter()


    return (
        <div>
            {/* top header */}
            <div className="bg-secondary-foreground text-background">
                <div className="container mx-auto flex justify-between p-2">
                    <div className="flex gap-2 items-center">
                        <MapPin width={20} height={20} />
                        <span>Uyo</span>
                    </div>

                    <div className="space-x-2">
                        <Link href={"/auth/signin"} className="hover:text-primary">Sign In</Link>
                        <span>/</span>
                        <Link href={"/auth/register"} className="hover:text-primary">Sign Up</Link>
                    </div>
                </div>
            </div>

            {/* main navigation */}
            <div className="border-b border-gray-400">
                <div className="container mx-auto flex items-center justify-between p-2">
                    <Link href={"/"}>Logo</Link>

                    {/* search */}
                    <div className="items-stretch hidden md:flex">
                        <Input placeholder={"Search..."} type={"search"} />
                        <Button className={"rounded-sm"}>Search</Button>
                    </div>

                    <div className="flex gap-1 items-center">
                        <Button onClick={()=> router.push("/wishlist")} variant={'icon'}>
                            <HeartIcon />
                        </Button>
                        <span>|</span>
                        <span className="flex items-center gap-1">
                            <CartDialog />

                            <div className="flex flex-col text-xs ">
                                <span className="text-[10px]">Shopping cart</span>
                                <span className="font-bold">N
                                    <span>57.00</span>
                                </span>
                            </div>
                        </span>
                    </div>

                </div>
            </div>

            <div className="bg-black text-white py-2">
                <div className="container mx-auto px-4 flex items-center gap-4 text-sm">
                    <Link href="/" className="hover:text-green-400">
                        Home
                    </Link>
                    <Link href="/shop" className="hover:text-green-400">
                        Shop
                    </Link>
                    <Link href="/pages" className="hover:text-green-400">
                        Pages
                    </Link>
                    <Link href="/blog" className="hover:text-green-400">
                        Blog
                    </Link>
                    <Link href="/about" className="hover:text-green-400">
                        About Us
                    </Link>
                    <Link href="/contact" className="hover:text-green-400">
                        Contact Us
                    </Link>
                </div>


            </div>

            {/* breadcrumps */}
            <div
                className="bg-cover bg-center h-24 bg-accent-foreground"
                style={{ backgroundImage: "url('/placeholder.svg?height=100&width=1200')" }}
            >
                <div className="container mx-auto px-4 h-full flex items-center">
                    <div className="flex items-center gap-2 text-sm">
                        <Link href="/" className="text-gray-600">
                            Home
                        </Link>
                        <span className="text-gray-400">/</span>
                        <Link href="/category/vegetables" className="text-gray-600">
                            Vegetables
                        </Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-800">Chinese Cabbage</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header