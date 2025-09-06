import { createClient } from "@/lib/supabase/server"
import { ProductDetails } from "@/components/products/product-details"
import { notFound } from "next/navigation"
import { Leaf } from "lucide-react"
import Link from "next/link"

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: product, error } = await supabase.from("products").select("*").eq("id", id).single()

  if (error || !product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">EcoFinds</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/products" className="text-foreground hover:text-primary font-medium">
                Products
              </Link>
              <Link href="/dashboard" className="text-muted-foreground hover:text-primary">
                Dashboard
              </Link>
              <Link href="/cart" className="text-muted-foreground hover:text-primary">
                Cart
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <ProductDetails product={product} />
      </div>
    </div>
  )
}
