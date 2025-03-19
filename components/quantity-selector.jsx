"use client"

import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function QuantitySelector({ quantity, onIncrement, onDecrement }) {
  return (
    <div className="flex items-center border rounded-md">
      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-none border-r" onClick={onDecrement}>
        <Minus className="h-4 w-4" />
      </Button>
      <div className="w-12 text-center">{quantity}</div>
      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-none border-l" onClick={onIncrement}>
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )
}

