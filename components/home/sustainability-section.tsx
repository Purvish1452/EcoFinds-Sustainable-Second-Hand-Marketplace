import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Leaf, Recycle, Heart, Globe } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Leaf,
    title: "100% Sustainable",
    description: "Every product is carefully vetted for environmental impact and sustainability credentials.",
  },
  {
    icon: Recycle,
    title: "Carbon Neutral Shipping",
    description: "We offset all shipping emissions and use eco-friendly packaging materials.",
  },
  {
    icon: Heart,
    title: "Ethical Sourcing",
    description: "Supporting fair trade practices and ethical manufacturing processes worldwide.",
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "Join thousands of customers making a positive difference for our planet.",
  },
]

export function SustainabilitySection() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="bg-primary/10 text-primary mb-4">
            <Leaf className="h-3 w-3 mr-1" />
            Our Commitment
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Why Choose <span className="text-primary">EcoFinds</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We're more than just a marketplace. We're a community dedicated to making sustainable living accessible and
            affordable for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mx-auto mb-4">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center bg-gradient-to-r from-primary/10 to-emerald-500/10 rounded-2xl p-8 lg:p-12">
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            Ready to Make a <span className="text-primary">Difference</span>?
          </h3>
          <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
            Join our community of eco-conscious shoppers and start your sustainable living journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg">Create Account</Button>
            </Link>
            <Link href="/products">
              <Button variant="outline" size="lg">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
