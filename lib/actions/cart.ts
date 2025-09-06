"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function addToCart(productId: string, quantity = 1) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Check if item already exists in cart
  const { data: existingItem } = await supabase
    .from("cart_items")
    .select("*")
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .single()

  if (existingItem) {
    // Update quantity if item exists
    const { error } = await supabase
      .from("cart_items")
      .update({ quantity: existingItem.quantity + quantity })
      .eq("id", existingItem.id)

    if (error) {
      throw new Error("Failed to update cart item")
    }
  } else {
    // Add new item to cart
    const { error } = await supabase.from("cart_items").insert({
      user_id: user.id,
      product_id: productId,
      quantity,
    })

    if (error) {
      throw new Error("Failed to add item to cart")
    }
  }

  revalidatePath("/cart")
  return { success: true }
}

export async function updateCartItemQuantity(cartItemId: string, quantity: number) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  if (quantity <= 0) {
    // Remove item if quantity is 0 or less
    const { error } = await supabase.from("cart_items").delete().eq("id", cartItemId).eq("user_id", user.id)

    if (error) {
      throw new Error("Failed to remove cart item")
    }
  } else {
    // Update quantity
    const { error } = await supabase.from("cart_items").update({ quantity }).eq("id", cartItemId).eq("user_id", user.id)

    if (error) {
      throw new Error("Failed to update cart item")
    }
  }

  revalidatePath("/cart")
  return { success: true }
}

export async function removeFromCart(cartItemId: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { error } = await supabase.from("cart_items").delete().eq("id", cartItemId).eq("user_id", user.id)

  if (error) {
    throw new Error("Failed to remove cart item")
  }

  revalidatePath("/cart")
  return { success: true }
}

export async function createOrder(shippingAddress: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get cart items with product details
  const { data: cartItems, error: cartError } = await supabase
    .from("cart_items")
    .select(
      `
      *,
      products (*)
    `,
    )
    .eq("user_id", user.id)

  if (cartError || !cartItems || cartItems.length === 0) {
    throw new Error("No items in cart")
  }

  // Calculate total amount
  const totalAmount = cartItems.reduce((sum, item) => {
    return sum + item.products.price * item.quantity
  }, 0)

  // Create order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      total_amount: totalAmount,
      status: "pending",
      shipping_address: shippingAddress,
    })
    .select()
    .single()

  if (orderError) {
    throw new Error("Failed to create order")
  }

  // Create order items
  const orderItems = cartItems.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    price: item.products.price,
  }))

  const { error: orderItemsError } = await supabase.from("order_items").insert(orderItems)

  if (orderItemsError) {
    throw new Error("Failed to create order items")
  }

  // Clear cart
  const { error: clearCartError } = await supabase.from("cart_items").delete().eq("user_id", user.id)

  if (clearCartError) {
    throw new Error("Failed to clear cart")
  }

  revalidatePath("/cart")
  revalidatePath("/dashboard")
  redirect(`/orders/${order.id}`)
}
