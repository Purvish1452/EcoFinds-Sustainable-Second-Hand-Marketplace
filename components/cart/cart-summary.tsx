"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Truck, Leaf, CreditCard } from "lucide-react"
import { createOrder } from "@/lib/actions/cart"
import { useState } from "react"
import { formatPrice } from "@/lib/utils"

interface CartItem {
  id: string
  quantity: number
  products: {
    id: string
    name: string
    price: number
    stock_quantity: number
  }
}

interface CartSummaryProps {
  items: CartItem[]
  totalAmount: number
}

export function CartSummary({ items, totalAmount }: CartSummaryProps) {
  const [shippingAddress, setShippingAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const shippingCost = totalAmount > 4000 ? 0 : 199 // Free shipping over ₹4000, otherwise ₹199
  const finalTotal = totalAmount + shippingCost

  // Check if any items are out of stock
  const hasOutOfStockItems = items.some((item) => item.quantity > item.products.stock_quantity)

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!shippingAddress.trim() || hasOutOfStockItems) return

    setIsLoading(true)
    try {
      await createOrder(shippingAddress)
    } catch (error) {
      console.error("Checkout failed:", error)
      alert("Checkout failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Order Details */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Items ({itemCount})</span>
            <span>{formatPrice(totalAmount)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-1">
              <Truck className="h-3 w-3" />
              Shipping
            </span>
            <span>{shippingCost === 0 ? "FREE" : formatPrice(shippingCost)}</span>
          </div>
          {shippingCost === 0 && (
            <div className="text-xs text-green-600 flex items-center gap-1">
              <Leaf className="h-3 w-3" />
              Free carbon-neutral shipping on orders over ₹4,000
            </div>
          )}
          <Separator />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span className="text-primary">{formatPrice(finalTotal)}</span>
          </div>
        </div>

        {/* Sustainability Badge */}
        <Badge variant="secondary" className="w-full justify-center bg-primary/10 text-primary">
          <Leaf className="h-3 w-3 mr-1" />
          100% Carbon Neutral Shipping
        </Badge>

        {/* Shipping Address Form */}
        <form onSubmit={handleCheckout} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="shipping">Shipping Address</Label>
            <Textarea
              id="shipping"
              placeholder="Enter your full shipping address..."
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              required
              rows={3}
            />
          </div>

          {hasOutOfStockItems && (
            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
              Some items in your cart exceed available stock. Please adjust quantities before checkout.
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isLoading || !shippingAddress.trim() || hasOutOfStockItems}
          >
            {isLoading ? "Processing..." : `Checkout - ${formatPrice(finalTotal)}`}
          </Button>
        </form>

        <div className="text-xs text-muted-foreground text-center">
          Secure checkout powered by eco-friendly practices
        </div>
      </CardContent>
    </Card>
  )
}
