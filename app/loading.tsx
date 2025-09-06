import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Leaf } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Leaf className="h-8 w-8 text-primary animate-pulse" />
          <span className="text-2xl font-bold text-primary">EcoFinds</span>
        </div>
        <LoadingSpinner size="lg" className="text-primary" />
        <p className="text-muted-foreground">Loading sustainable products...</p>
      </div>
    </div>
  )
}
