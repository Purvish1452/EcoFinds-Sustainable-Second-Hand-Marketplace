import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Navigation } from "@/components/layout/navigation"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { ProfileSection } from "@/components/dashboard/profile-section"
import { RecentOrders } from "@/components/dashboard/recent-orders"
import { AccountStats } from "@/components/dashboard/account-stats"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Get recent orders
  const { data: recentOrders } = await supabase
    .from("orders")
    .select(
      `
      *,
      order_items (
        *,
        products (name, image_url)
      )
    `,
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5)

  // Get cart items count
  const { count: cartItemsCount } = await supabase
    .from("cart_items")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)

  // Get total orders count
  const { count: totalOrders } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)

  // Calculate total spent
  const { data: orderTotals } = await supabase
    .from("orders")
    .select("total_amount")
    .eq("user_id", user.id)
    .eq("status", "completed")

  const totalSpent = orderTotals?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <DashboardOverview user={user} profile={profile} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <AccountStats totalOrders={totalOrders || 0} totalSpent={totalSpent} cartItems={cartItemsCount || 0} />
            <RecentOrders orders={recentOrders || []} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ProfileSection user={user} profile={profile} />
          </div>
        </div>
      </div>
    </div>
  )
}
