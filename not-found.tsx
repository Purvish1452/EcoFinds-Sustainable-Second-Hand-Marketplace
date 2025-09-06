import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Home, Search } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardContent className="p-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">EcoFinds</span>
          </div>

          <div className="mb-6">
            <h1 className="text-6xl font-bold text-primary mb-2">404</h1>
            <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
            <p className="text-muted-foreground">
              The page you're looking for doesn't exist or has been moved to a more sustainable location.
            </p>
          </div>

          <div className="space-y-3">
            <Link href="/" className="block">
              <Button className="w-full">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Button>
            </Link>
            <Link href="/products" className="block">
              <Button variant="outline" className="w-full bg-transparent">
                <Search className="h-4 w-4 mr-2" />
                Browse Products
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
