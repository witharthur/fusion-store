import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Shield, Truck } from "lucide-react"
import ProductGrid from "@/components/product-grid"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Premium Tech for Your <span className="text-primary">Digital Life</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Discover cutting-edge electronics, accessories, and wearables curated for tech enthusiasts and
                professionals.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button size="lg" className="w-full sm:w-auto">
                  Explore Products
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/categories">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                  Browse Categories
                </Button>
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="flex flex-col gap-2">
                <Zap className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">Fast Shipping</span>
              </div>
              <div className="flex flex-col gap-2">
                <Shield className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">Secure Payment</span>
              </div>
              <div className="flex flex-col gap-2">
                <Truck className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">Easy Returns</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="hidden md:flex items-center justify-center">
            <div className="w-full aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center">
              <img
                src="/premium-tech-products.jpg"
                alt="Premium Tech Products"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-card border-t border-border py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Featured Products</h2>
              <p className="text-muted-foreground">Check out our handpicked selection of premium tech gear</p>
            </div>
            <Link href="/products?featured=true">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <ProductGrid featured={true} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 md:p-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Join Our Tech Community</h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive deals, product launches, and tech tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-3 rounded-lg bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 flex-1 sm:flex-none"
            />
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
