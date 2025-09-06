"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

interface ProfileData {
  full_name: string
  phone: string
  address: string
  city: string
  postal_code: string
  country: string
}

export async function updateProfile(profileData: ProfileData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Check if profile exists
  const { data: existingProfile } = await supabase.from("profiles").select("id").eq("id", user.id).single()

  if (existingProfile) {
    // Update existing profile
    const { error } = await supabase
      .from("profiles")
      .update({
        ...profileData,
        email: user.email,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)

    if (error) {
      throw new Error("Failed to update profile")
    }
  } else {
    // Create new profile
    const { error } = await supabase.from("profiles").insert({
      id: user.id,
      email: user.email,
      ...profileData,
    })

    if (error) {
      throw new Error("Failed to create profile")
    }
  }

  revalidatePath("/dashboard")
  return { success: true }
}
