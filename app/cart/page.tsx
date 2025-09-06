import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { CartItems } from "@/components/cart/cart-items"
import { CartSummary } from "@/components/cart/cart-summary"
import { Navigation } from "@/components/layout/navigation"
import { ShoppingCart } from "lucide-react"

export default async function CartPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get cart items with product details
  const { data: cartItems, error } = await supabase
    .from("cart_items")
    .select(
      `
      *,
      products (*)
    `,
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching cart items:", error)
  }

  const items = cartItems || []
  const totalAmount = items.reduce((sum, item) => sum + item.products.price * item.quantity, 0)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <ShoppingCart className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
          </div>
          <p className="text-muted-foreground">
            {items.length === 0
              ? "Your cart is empty"
              : `${items.length} item${items.length > 1 ? "s" : ""} in your cart`}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Start shopping to add items to your cart</p>
            <a
              href="/products"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Browse Products
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CartItems items={items} />
            </div>
            <div className="lg:col-span-1">
              <CartSummary items={items} totalAmount={totalAmount} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
