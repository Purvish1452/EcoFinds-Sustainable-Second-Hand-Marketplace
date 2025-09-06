"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, Eye, Search, Filter, Download, RefreshCw, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { reorderItems } from "@/lib/actions/orders"
import { formatPrice } from "@/lib/utils"

interface Order {
  id: string
  created_at: string
  total_amount: number
  status: string
  order_items: Array<{
    id: string
    quantity: number
    price: number
    products: {
      name: string
      image_url: string
      category: string
      eco_rating: number
    }
  }>
}

interface PurchaseHistoryViewProps {
  orders: Order[]
  currentFilters: {
    status?: string
    search?: string
    sort?: string
  }
}

export function PurchaseHistoryView({ orders, currentFilters }: PurchaseHistoryViewProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(currentFilters.search || "")
  const [reorderingOrders, setReorderingOrders] = useState<Set<string>>(new Set())

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== "all") {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/orders?${params.toString()}`)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateFilters("search", searchQuery)
  }

  const handleReorder = async (orderId: string) => {
    setReorderingOrders((prev) => new Set(prev).add(orderId))
    try {
      await reorderItems(orderId)
      router.push("/cart")
    } catch (error) {
      console.error("Failed to reorder:", error)
      alert("Failed to reorder items. Please try again.")
    } finally {
      setReorderingOrders((prev) => {
        const newSet = new Set(prev)
        newSet.delete(orderId)
        return newSet
      })
    }
  }

  const exportOrders = () => {
    const csvContent = [
      ["Order ID", "Date", "Status", "Items", "Total"].join(","),
      ...orders.map((order) =>
        [
          order.id.slice(0, 8).toUpperCase(),
          new Date(order.created_at).toLocaleDateString(),
          order.status,
          order.order_items.length,
          formatPrice(Number(order.total_amount)),
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "order-history.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & Search
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={exportOrders}>
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
              <Link href="/dashboard">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search orders..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>

            {/* Status Filter */}
            <Select value={currentFilters.status || "all"} onValueChange={(value) => updateFilters("status", value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select
              value={currentFilters.sort || "created_at-desc"}
              onValueChange={(value) => updateFilters("sort", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="created_at-desc">Newest First</SelectItem>
                <SelectItem value="created_at-asc">Oldest First</SelectItem>
                <SelectItem value="total_amount-desc">Highest Amount</SelectItem>
                <SelectItem value="total_amount-asc">Lowest Amount</SelectItem>
              </SelectContent>
            </Select>

            {/* Results Count */}
            <div className="flex items-center justify-center text-sm text-muted-foreground">
              {orders.length} order{orders.length !== 1 ? "s" : ""} found
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      {orders.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No orders found</h2>
            <p className="text-muted-foreground mb-6">
              {currentFilters.search || currentFilters.status
                ? "Try adjusting your filters or search terms"
                : "Start shopping for eco-friendly products"}
            </p>
            <Link href="/products">
              <Button>Browse Products</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const isReordering = reorderingOrders.has(order.id)
            return (
              <Card key={order.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Order #{order.id.slice(0, 8).toUpperCase()}</CardTitle>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span>{new Date(order.created_at).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{order.order_items.length} items</span>
                        <span>•</span>
                        <span className="font-semibold text-primary">{formatPrice(Number(order.total_amount))}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={order.status === "completed" ? "default" : "secondary"}
                        className={
                          order.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : order.status === "cancelled"
                              ? "bg-red-100 text-red-700"
                              : ""
                        }
                      >
                        {order.status}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReorder(order.id)}
                        disabled={isReordering}
                      >
                        {isReordering ? (
                          <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                        ) : (
                          <RefreshCw className="h-4 w-4 mr-1" />
                        )}
                        Reorder
                      </Button>
                      <Link href={`/orders/${order.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {order.order_items.slice(0, 4).map((item) => (
                      <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={
                              item.products.image_url ||
                              "/placeholder.svg?height=48&width=48&query=eco-friendly product" ||
                              "/placeholder.svg" ||
                              "/placeholder.svg"
                            }
                            alt={item.products.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm line-clamp-1">{item.products.name}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <span>{item.products.category}</span>
                            <span>•</span>
                            <span>Qty: {item.quantity}</span>
                          </div>
                          <div className="text-sm font-semibold text-primary">
                            {formatPrice(Number(item.price) * item.quantity)}
                          </div>
                        </div>
                      </div>
                    ))}
                    {order.order_items.length > 4 && (
                      <div className="flex items-center justify-center p-3 border rounded-lg bg-muted/50">
                        <span className="text-sm text-muted-foreground">
                          +{order.order_items.length - 4} more items
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
