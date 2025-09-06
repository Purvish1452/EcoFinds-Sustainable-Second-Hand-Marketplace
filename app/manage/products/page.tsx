import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ProductManagement } from "@/components/admin/product-management"
import { Leaf } from "lucide-react"
import Link from "next/link"

export default async function ManageProductsPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  const { data: products } = await supabase.from("products").select("*").order("created_at", { ascending: false })

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
              <Link href="/products" className="text-muted-foreground hover:text-primary">
                Products
              </Link>
              <Link href="/dashboard" className="text-muted-foreground hover:text-primary">
                Dashboard
              </Link>
              <Link href="/manage/products" className="text-foreground hover:text-primary font-medium">
                Manage Products
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <ProductManagement products={products || []} />
      </div>
    </div>
  )
}
