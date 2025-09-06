import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Navigation } from "@/components/layout/navigation"
import { PurchaseHistoryView } from "@/components/orders/purchase-history-view"
import { OrderAnalytics } from "@/components/orders/order-analytics"

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string; sort?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Build query based on filters
  let query = supabase
    .from("orders")
    .select(
      `
      *,
      order_items (
        *,
        products (name, image_url, category, eco_rating)
      )
    `,
    )
    .eq("user_id", user.id)

  // Apply status filter
  if (params.status && params.status !== "all") {
    query = query.eq("status", params.status)
  }

  // Apply search filter
  if (params.search) {
    query = query.or(`id.ilike.%${params.search}%`)
  }

  // Apply sorting
  const sortBy = params.sort || "created_at"
  const isAscending = sortBy.includes("asc")
  const sortField = sortBy.replace("-asc", "").replace("-desc", "")
  query = query.order(sortField, { ascending: isAscending })

  const { data: orders, error } = await query

  if (error) {
    console.error("Error fetching orders:", error)
  }

  // Get analytics data
  const { data: analyticsData } = await supabase
    .from("orders")
    .select("total_amount, created_at, status")
    .eq("user_id", user.id)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <OrderAnalytics orders={analyticsData || []} />
        <PurchaseHistoryView orders={orders || []} currentFilters={params} />
      </div>
    </div>
  )
}
