import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { FilterIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox";
import { Star } from "lucide-react";


const ProductSidebar = () => {
    return (
        <div className="space-y-5 hidden md:block">
            <Button className={"sticky"}>
                Filter
                <FilterIcon />
            </Button>
            <Accordion type="multiple" collapsible={false} className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>All Categories</AccordionTrigger>
                    <AccordionContent>
                        <RadioGroup defaultValue="comfortable">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="default" id="r1" />
                                <Label htmlFor="r1">Gym Shoes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="comfortable" id="r2" />
                                <Label htmlFor="r2">Comfortable</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="compact" id="r3" />
                                <Label htmlFor="r3">Casual & Lifestyle</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="lux" id="r4" />
                                <Label htmlFor="r3">Luxury</Label>
                            </div>
                        </RadioGroup>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Price</AccordionTrigger>
                    <AccordionContent>
                        Yes. It comes with default styles that matches the other
                        components&apos; aesthetic.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Rating</AccordionTrigger>
                    <AccordionContent className={"space-y-4"}>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="5" />
                            <label
                                htmlFor="5"
                                className="text-sm font-thin text-gray-400 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                5 stars
                            </label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox id="4" />
                            <label
                                htmlFor="4"
                                className="text-sm font-thin text-gray-400 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                4 stars
                            </label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox id="3" />
                            <label
                                htmlFor="3"
                                className="text-sm font-thin text-gray-400 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                3 stars
                            </label>
                        </div>


                        <div className="flex items-center space-x-2">
                            <Checkbox id="2" />
                            <label
                                htmlFor="2"
                                className="text-sm font-thin text-gray-400 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                2 stars
                            </label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox id="5" />
                            <label
                                htmlFor="5"
                                className="text-sm font-thin text-gray-400 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                1 stars
                            </label>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default ProductSidebar