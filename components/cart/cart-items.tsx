"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Minus, Trash2, Leaf } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { updateCartItemQuantity, removeFromCart } from "@/lib/actions/cart"
import { useState } from "react"
import { formatPrice } from "@/lib/utils"

interface CartItem {
  id: string
  quantity: number
  products: {
    id: string
    name: string
    description: string
    price: number
    image_url: string
    category: string
    eco_rating: number
    sustainability_features: string[]
    stock_quantity: number
  }
}

interface CartItemsProps {
  items: CartItem[]
}

export function CartItems({ items }: CartItemsProps) {
  const [loadingItems, setLoadingItems] = useState<Set<string>>(new Set())

  const handleQuantityChange = async (cartItemId: string, newQuantity: number) => {
    setLoadingItems((prev) => new Set(prev).add(cartItemId))
    try {
      await updateCartItemQuantity(cartItemId, newQuantity)
    } catch (error) {
      console.error("Failed to update quantity:", error)
    } finally {
      setLoadingItems((prev) => {
        const newSet = new Set(prev)
        newSet.delete(cartItemId)
        return newSet
      })
    }
  }

  const handleRemoveItem = async (cartItemId: string) => {
    setLoadingItems((prev) => new Set(prev).add(cartItemId))
    try {
      await removeFromCart(cartItemId)
    } catch (error) {
      console.error("Failed to remove item:", error)
    } finally {
      setLoadingItems((prev) => {
        const newSet = new Set(prev)
        newSet.delete(cartItemId)
        return newSet
      })
    }
  }

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const isLoading = loadingItems.has(item.id)
        const isOutOfStock = item.quantity > item.products.stock_quantity

        return (
          <Card key={item.id} className={`${isLoading ? "opacity-50" : ""} transition-opacity`}>
            <CardContent className="p-4">
              <div className="flex gap-4">
                {/* Product Image */}
                <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.products.image_url || "/placeholder.svg?height=80&width=80&query=eco-friendly product"}
                    alt={item.products.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <Link
                        href={`/products/${item.products.id}`}
                        className="font-semibold text-lg hover:text-primary transition-colors line-clamp-1"
                      >
                        {item.products.name}
                      </Link>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {item.products.category}
                        </Badge>
                        <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                          <Leaf className="h-3 w-3 mr-1" />
                          {item.products.eco_rating}/5
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{item.products.description}</p>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">{formatPrice(item.products.price)}</div>
                      <div className="text-sm text-muted-foreground">each</div>
                    </div>
                  </div>

                  {/* Quantity Controls and Actions */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Quantity:</span>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={isLoading || item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          disabled={isLoading || item.quantity >= item.products.stock_quantity}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      {isOutOfStock && (
                        <Badge variant="destructive" className="text-xs">
                          Exceeds stock
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="font-semibold">{formatPrice(item.products.price * item.quantity)}</div>
                        <div className="text-xs text-muted-foreground">{item.products.stock_quantity} available</div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveItem(item.id)}
                        disabled={isLoading}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
