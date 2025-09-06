"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter, useSearchParams } from "next/navigation"

const categories = [
  { value: "all", label: "All Products" },
  { value: "home", label: "Home & Garden" },
  { value: "personal-care", label: "Personal Care" },
  { value: "clothing", label: "Clothing" },
  { value: "electronics", label: "Electronics" },
  { value: "food", label: "Food & Beverages" },
  { value: "cleaning", label: "Cleaning" },
]

interface ProductFiltersProps {
  currentCategory?: string
}

export function ProductFilters({ currentCategory = "all" }: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (category === "all") {
      params.delete("category")
    } else {
      params.set("category", category)
    }
    router.push(`/products?${params.toString()}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium mb-3">Categories</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={currentCategory === category.value ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleCategoryChange(category.value)}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3">Sustainability Features</h4>
          <div className="space-y-2">
            <Badge variant="outline" className="block w-fit">
              Organic
            </Badge>
            <Badge variant="outline" className="block w-fit">
              Recyclable
            </Badge>
            <Badge variant="outline" className="block w-fit">
              Carbon Neutral
            </Badge>
            <Badge variant="outline" className="block w-fit">
              Fair Trade
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
