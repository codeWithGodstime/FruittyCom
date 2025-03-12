import { HeartIcon, MapPin, ShoppingBasket } from "lucide-react"
import Link from "next/link"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

const Header = () => {
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
                        <Link href={"/login"} className="hover:text-primary">Sign In</Link>
                        <span>/</span>
                        <Link href={"/register"} className="hover:text-primary">Sign Up</Link>
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
                        <Button variant={'icon'}>
                            <HeartIcon />
                        </Button>
                        <span>|</span>
                        <span className="flex items-center gap-1">
                            <Button variant={'icon'} className={"relative"}>
                                <span className="bg-accent rounded-full p-1 text-background absolute right-0 top-0 w-4 h-4 text-xs flex items-center justify-center">2</span>
                                <ShoppingBasket />
                            </Button>

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
        </div>
    )
}

export default Header