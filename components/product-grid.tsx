"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Heart, ShoppingCart, Star } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  image_url: string
  slug: string
  rating: number
  review_count: number
}

interface ProductGridProps {
  featured?: boolean
}

export default function ProductGrid({ featured = false }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock products - in production, fetch from API
    const mockProducts: Product[] = [
      {
        id: "1",
        name: "Pro Wireless Headphones",
        price: 199.99,
        image_url: "/wireless-headphones.jpg",
        slug: "pro-wireless-headphones",
        rating: 4.8,
        review_count: 234,
      },
      {
        id: "2",
        name: "Smart Watch Pro",
        price: 349.99,
        image_url: "/modern-smartwatch.png",
        slug: "smart-watch-pro",
        rating: 4.6,
        review_count: 156,
      },
      {
        id: "3",
        name: "USB-C Fast Charger",
        price: 49.99,
        image_url: "/usb-charger.jpg",
        slug: "usb-c-fast-charger",
        rating: 4.7,
        review_count: 892,
      },
      {
        id: "4",
        name: "Portable SSD 1TB",
        price: 129.99,
        image_url: "/portable-ssd.jpg",
        slug: "portable-ssd-1tb",
        rating: 4.9,
        review_count: 450,
      },
    ]

    setProducts(mockProducts)
    setLoading(false)
  }, [featured])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-muted rounded-lg h-64 animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
          <Link href={`/products/${product.slug}`}>
            <div className="relative aspect-square overflow-hidden bg-muted">
              <img
                src={product.image_url || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <button className="absolute top-3 right-3 p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors opacity-0 group-hover:opacity-100 transition-opacity">
                <Heart className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </Link>

          <div className="p-4 space-y-3">
            <Link href={`/products/${product.slug}`}>
              <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-2">
                {product.name}
              </h3>
            </Link>

            {/* Rating */}
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">({product.review_count})</span>
            </div>

            {/* Price and CTA */}
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <span className="font-bold text-lg text-foreground">${product.price.toFixed(2)}</span>
              <Button size="sm" className="gap-2">
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">Add</span>
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
