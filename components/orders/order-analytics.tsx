import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Package, DollarSign, Calendar, Leaf } from "lucide-react"
import { formatPrice } from "@/lib/utils"

interface Order {
  total_amount: number
  created_at: string
  status: string
}

interface OrderAnalyticsProps {
  orders: Order[]
}

export function OrderAnalytics({ orders }: OrderAnalyticsProps) {
  const totalSpent = orders.reduce((sum, order) => sum + Number(order.total_amount), 0)
  const completedOrders = orders.filter((order) => order.status === "completed").length
  const averageOrderValue = orders.length > 0 ? totalSpent / orders.length : 0

  // Calculate monthly spending
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  const monthlySpent = orders
    .filter((order) => {
      const orderDate = new Date(order.created_at)
      return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear
    })
    .reduce((sum, order) => sum + Number(order.total_amount), 0)

  // Calculate eco impact (simplified)
  const ecoImpactScore = Math.round(totalSpent * 0.1) // Simplified calculation

  return (
    <div className="mb-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Purchase History & Analytics</h1>
        <p className="text-muted-foreground">Track your eco-friendly shopping journey and environmental impact</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
            <p className="text-xs text-muted-foreground">{completedOrders} completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(totalSpent)}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(monthlySpent)}</div>
            <p className="text-xs text-muted-foreground">Current month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(averageOrderValue)}</div>
            <p className="text-xs text-muted-foreground">Average value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eco Impact</CardTitle>
            <Leaf className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{ecoImpactScore}</div>
            <p className="text-xs text-muted-foreground">Impact points</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
              <Leaf className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">Your Environmental Impact</h3>
              <p className="text-muted-foreground">
                Through your {orders.length} eco-friendly purchases, you've contributed to sustainable practices and
                reduced environmental impact.
              </p>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Eco Warrior Level {Math.floor(ecoImpactScore / 10) + 1}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
