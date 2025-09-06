import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Home, User, Shirt, Smartphone, Coffee, Sparkles } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    id: "home",
    name: "Home & Garden",
    description: "Sustainable living essentials for your home",
    icon: Home,
    color: "bg-green-100 text-green-700",
    count: "200+ products",
  },
  {
    id: "personal-care",
    name: "Personal Care",
    description: "Natural beauty and wellness products",
    icon: User,
    color: "bg-blue-100 text-blue-700",
    count: "150+ products",
  },
  {
    id: "clothing",
    name: "Clothing",
    description: "Ethical fashion and sustainable apparel",
    icon: Shirt,
    color: "bg-purple-100 text-purple-700",
    count: "300+ products",
  },
  {
    id: "electronics",
    name: "Electronics",
    description: "Energy-efficient and eco-friendly tech",
    icon: Smartphone,
    color: "bg-orange-100 text-orange-700",
    count: "100+ products",
  },
  {
    id: "food",
    name: "Food & Beverages",
    description: "Organic and locally sourced products",
    icon: Coffee,
    color: "bg-yellow-100 text-yellow-700",
    count: "180+ products",
  },
  {
    id: "cleaning",
    name: "Cleaning",
    description: "Non-toxic and biodegradable cleaners",
    icon: Sparkles,
    color: "bg-teal-100 text-teal-700",
    count: "80+ products",
  },
]

export function CategoryShowcase() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Shop by <span className="text-primary">Category</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find sustainable products across all categories, from home essentials to personal care items.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Card key={category.id} className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${category.color}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{category.description}</p>
                      <Badge variant="secondary" className="mb-4">
                        {category.count}
                      </Badge>
                      <div>
                        <Link href={`/products?category=${category.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                          >
                            Browse Category
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
