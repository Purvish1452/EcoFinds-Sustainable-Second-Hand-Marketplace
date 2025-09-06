import { createClient } from "@/lib/supabase/server"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturedProducts } from "@/components/home/featured-products"
import { CategoryShowcase } from "@/components/home/category-showcase"
import { SustainabilitySection } from "@/components/home/sustainability-section"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"

export default async function HomePage() {
  const supabase = await createClient()

  // Get featured products (latest 6 products)
  const { data: featuredProducts } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(6)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturedProducts products={featuredProducts || []} />
        <CategoryShowcase />
        <SustainabilitySection />
      </main>
      <Footer />
    </div>
  )
}
