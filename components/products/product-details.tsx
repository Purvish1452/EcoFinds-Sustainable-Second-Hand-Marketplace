"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Leaf, ArrowLeft, Plus, Minus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { addToCart } from "@/lib/actions/cart"
import { formatPrice } from "@/lib/utils"

interface Product {
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

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const isInStock = product.stock_quantity > 0

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= product.stock_quantity) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = async () => {
    setIsLoading(true)
    try {
      await addToCart(product.id, quantity)
    } catch (error) {
      console.error("Failed to add to cart:", error)
      alert("Failed to add item to cart. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link href="/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src={product.image_url || "/placeholder.svg?height=600&width=600&query=eco-friendly product"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                {!isInStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="destructive" className="text-lg px-4 py-2">
                      Out of Stock
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge variant="outline" className="mb-2">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold text-foreground mb-4">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < product.eco_rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">Eco Rating: {product.eco_rating}/5</span>
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                <Leaf className="h-3 w-3 mr-1" />
                Eco-Friendly
              </Badge>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed">{product.description}</p>
          </div>

          {/* Sustainability Features */}
          {product.sustainability_features && product.sustainability_features.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">Sustainability Features</h3>
              <div className="flex flex-wrap gap-2">
                {product.sustainability_features.map((feature, index) => (
                  <Badge key={index} variant="secondary" className="bg-green-50 text-green-700">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Price and Stock */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
              <span className="text-muted-foreground">
                {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : "Out of stock"}
              </span>
            </div>

            {/* Quantity Selector */}
            {isInStock && (
              <div className="flex items-center gap-4 mb-6">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock_quantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            <Button onClick={handleAddToCart} disabled={!isInStock || isLoading} size="lg" className="w-full">
              {isLoading
                ? "Adding to Cart..."
                : isInStock
                  ? `Add ${quantity} to Cart - ${formatPrice(product.price * quantity)}`
                  : "Out of Stock"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
