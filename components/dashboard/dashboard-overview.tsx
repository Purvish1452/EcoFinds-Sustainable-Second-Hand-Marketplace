import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { User, Leaf, ShoppingBag, Settings } from "lucide-react"
import Link from "next/link"

interface DashboardOverviewProps {
  user: any
  profile: any
}

export function DashboardOverview({ user, profile }: DashboardOverviewProps) {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, {profile?.full_name || user.email?.split("@")[0] || "there"}!
          </h1>
          <p className="text-muted-foreground mt-1">Manage your eco-friendly shopping experience</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            <Leaf className="h-3 w-3 mr-1" />
            Eco Warrior
          </Badge>
          <Link href="/profile/settings">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/products">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Browse Products
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <ShoppingBag className="h-4 w-4 mr-2" />
                View Cart
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <User className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
