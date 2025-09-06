"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Leaf } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { addToCart } from "@/lib/actions/cart"
import { useState } from "react"
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

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const isInStock = product.stock_quantity > 0

  const handleAddToCart = async () => {
    setIsLoading(true)
    try {
      await addToCart(product.id, 1)
    } catch (error) {
      console.error("Failed to add to cart:", error)
      alert("Failed to add item to cart. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
          <Image
            src={product.image_url || "/placeholder.svg?height=300&width=300&query=eco-friendly product"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              <Leaf className="h-3 w-3 mr-1" />
              {product.eco_rating}/5
            </Badge>
          </div>
          {!isInStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive">Out of Stock</Badge>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="mb-2">
            <Badge variant="outline" className="text-xs">
              {product.category}
            </Badge>
          </div>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{product.description}</p>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < product.eco_rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">Eco Rating</span>
          </div>
          {product.sustainability_features && product.sustainability_features.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {product.sustainability_features.slice(0, 2).map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {feature}
                </Badge>
              ))}
              {product.sustainability_features.length > 2 && (
                <Badge variant="secondary" className="text-xs">
                  +{product.sustainability_features.length - 2} more
                </Badge>
              )}
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">{formatPrice(product.price)}</span>
            <span className="text-sm text-muted-foreground">{product.stock_quantity} in stock</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex gap-2 w-full">
          <Button asChild variant="outline" className="flex-1 bg-transparent">
            <Link href={`/products/${product.id}`}>View Details</Link>
          </Button>
          <Button onClick={handleAddToCart} disabled={!isInStock || isLoading} className="flex-1">
            {isLoading ? "Adding..." : isInStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
