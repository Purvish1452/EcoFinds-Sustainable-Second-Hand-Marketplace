"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function reorderItems(orderId: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get order items
  const { data: orderItems, error } = await supabase
    .from("order_items")
    .select(
      `
      *,
      products (*)
    `,
    )
    .eq("order_id", orderId)

  if (error || !orderItems) {
    throw new Error("Failed to fetch order items")
  }

  // Add items to cart
  for (const item of orderItems) {
    // Check if item already exists in cart
    const { data: existingItem } = await supabase
      .from("cart_items")
      .select("*")
      .eq("user_id", user.id)
      .eq("product_id", item.product_id)
      .single()

    if (existingItem) {
      // Update quantity if item exists
      const { error: updateError } = await supabase
        .from("cart_items")
        .update({ quantity: existingItem.quantity + item.quantity })
        .eq("id", existingItem.id)

      if (updateError) {
        throw new Error("Failed to update cart item")
      }
    } else {
      // Add new item to cart
      const { error: insertError } = await supabase.from("cart_items").insert({
        user_id: user.id,
        product_id: item.product_id,
        quantity: item.quantity,
      })

      if (insertError) {
        throw new Error("Failed to add item to cart")
      }
    }
  }

  revalidatePath("/cart")
  return { success: true }
}
