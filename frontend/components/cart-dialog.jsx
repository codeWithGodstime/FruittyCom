import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { ShoppingBasket, X } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"


const SingleCartItem = () => {

    return <div className="flex items-center justify-between p-2 gap-2">
        {/* image */}
        <Image height={50} width={50} src={`/next.svg`} />
        <div className="grow">
            <p className="font-bold">Fresh Orange Juice</p>
            <p><span>1</span>X <span>200</span></p>
        </div>
        <Button type="icon" variant={'ghost'} ><X /></Button>
    </div>
}


export function CartDialog() {

    const router = useRouter()

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant={'icon'} className={"relative"}>
                    <span className="bg-accent rounded-full p-1 text-background absolute right-0 top-0 w-4 h-4 text-xs flex items-center justify-center">2</span>
                    <ShoppingBasket />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Shopping Cart <span>(2)</span></SheetTitle>
                </SheetHeader>
                <div className="grid gap-4 py-4 px-3">
                    {
                        ["", ""].map((product, index) => {
                            return <SingleCartItem key={index} />
                        })
                    }
                </div>
                <SheetFooter>
                    <div className="flex justify-between items-center px-2">
                        <span className="">2 Product</span>
                        <span className="font-bold">$26.00</span>
                    </div>
                    <div className="space-y-5">
                        <Button onClick={()=> router.push("/checkout")} className={'w-full'}>Checkout</Button>
                        <Button onClick={()=> router.push("/cart")} className={'w-full'}  variant="ghost">Go to Cart</Button>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
