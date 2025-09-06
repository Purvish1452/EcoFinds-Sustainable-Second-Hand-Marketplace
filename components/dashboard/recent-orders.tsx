import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { formatPrice } from "@/lib/utils"

interface Order {
  id: string
  created_at: string
  total_amount: number
  status: string
  order_items: Array<{
    quantity: number
    products: {
      name: string
      image_url: string
    }
  }>
}

interface RecentOrdersProps {
  orders: Order[]
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  if (orders.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Recent Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">No orders yet</h3>
            <p className="text-muted-foreground mb-4">Start shopping for eco-friendly products</p>
            <Link href="/products">
              <Button>Browse Products</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Recent Orders
          </CardTitle>
          <Link href="/orders">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="flex items-center gap-4 p-4 border rounded-lg">
              {/* Order Items Preview */}
              <div className="flex -space-x-2">
                {order.order_items.slice(0, 3).map((item, index) => (
                  <div
                    key={index}
                    className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-background"
                  >
                    <Image
                      src={item.products.image_url || "/placeholder.svg?height=40&width=40&query=eco-friendly product"}
                      alt={item.products.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
                {order.order_items.length > 3 && (
                  <div className="w-10 h-10 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium">
                    +{order.order_items.length - 3}
                  </div>
                )}
              </div>

              {/* Order Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">Order #{order.id.slice(0, 8).toUpperCase()}</span>
                  <Badge variant="secondary" className="text-xs">
                    {order.status}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {new Date(order.created_at).toLocaleDateString()} • {order.order_items.length} items
                </div>
              </div>

              {/* Order Total and Action */}
              <div className="text-right">
                <div className="font-semibold text-primary">{formatPrice(Number(order.total_amount))}</div>
                <Link href={`/orders/${order.id}`}>
                  <Button variant="outline" size="sm" className="mt-1 bg-transparent">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
