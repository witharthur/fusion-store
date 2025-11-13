"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, ShoppingCart, Star, Truck, Shield, RotateCcw } from "lucide-react"
import Link from "next/link"

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  // Mock product - in production, fetch from API
  const product = {
    id: "1",
    name: "Pro Wireless Headphones",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.8,
    reviewCount: 234,
    description: "Premium noise-canceling headphones with 30-hour battery life and superior sound quality",
    longDescription:
      "Experience immersive audio with our Pro Wireless Headphones. Featuring active noise cancellation technology, a 30-hour battery life, and premium sound drivers, these headphones are perfect for work, travel, and entertainment. With comfortable ear cushions and an adjustable headband, you can enjoy all-day comfort.",
    inStock: true,
    images: ["/wireless-headphones.jpg", "/headphones-side-view.jpg", "/headphones-detail.jpg"],
    features: [
      "Active Noise Cancellation (ANC)",
      "30-hour battery life",
      "Bluetooth 5.0 connectivity",
      "Premium sound drivers",
      "Comfortable ear cushions",
      "Built-in microphone",
    ],
    specifications: {
      brand: "TechPro",
      color: "Black",
      connectivity: "Bluetooth 5.0",
      batteryLife: "30 hours",
      warranty: "2 years",
      weight: "250g",
    },
  }

  const [selectedImage, setSelectedImage] = useState(product.images[0])

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-foreground">
            Products
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden flex items-center justify-center">
              <img
                src={selectedImage || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {product.images.map((img) => (
                <button
                  key={img}
                  onClick={() => setSelectedImage(img)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === img ? "border-primary" : "border-border hover:border-primary/50"
                  }`}
                >
                  <img src={img || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title & Rating */}
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-3">{product.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-foreground">${product.price.toFixed(2)}</span>
                <span className="text-lg text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
                <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% Off
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {product.inStock ? (
                  <span className="text-accent font-semibold">In Stock</span>
                ) : (
                  <span className="text-destructive font-semibold">Out of Stock</span>
                )}
              </p>
            </div>

            {/* Description */}
            <p className="text-muted-foreground">{product.description}</p>

            {/* Features */}
            <div className="bg-card border border-border rounded-lg p-4 space-y-2">
              {product.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Quantity & CTA */}
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <label htmlFor="quantity" className="text-sm font-medium">
                  Quantity:
                </label>
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    −
                  </button>
                  <input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                    className="w-12 px-2 py-2 text-center border-x border-border bg-background focus:outline-none"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1" size="lg">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={isWishlisted ? "bg-accent/10" : ""}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-accent text-accent" : ""}`} />
                </Button>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-3 border-t pt-6">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Free Shipping</p>
                  <p className="text-xs text-muted-foreground">On orders over $100</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Secure Payment</p>
                  <p className="text-xs text-muted-foreground">100% secure checkout</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Easy Returns</p>
                  <p className="text-xs text-muted-foreground">30-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <Card className="p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Specifications</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key}>
                <p className="text-sm font-medium text-muted-foreground capitalize mb-1">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </p>
                <p className="font-semibold text-foreground">{value}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
