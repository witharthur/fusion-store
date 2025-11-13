"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { PRODUCTS } from "@/lib/products"
import ProductCardEnhanced from "@/components/product-card-enhanced"
import { Heart } from "lucide-react"

export default function WishlistPage() {
  const [wishlistIds, setWishlistIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load wishlist from localStorage
    const saved = localStorage.getItem("wishlist")
    if (saved) {
      setWishlistIds(JSON.parse(saved))
    }
    setLoading(false)
  }, [])

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id))

  if (loading) {
    return <div className="text-center py-16">Loading wishlist...</div>
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">My Wishlist</h1>
            <p className="text-muted-foreground">{wishlistProducts.length} items saved</p>
          </div>
          <Link href="/products" className="text-sm text-primary hover:text-primary/80">
            Continue Shopping
          </Link>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-16 border border-border rounded-lg bg-card">
            <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground mb-6">Your wishlist is empty</p>
            <Link
              href="/products"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              Start Adding Items
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistProducts.map((product) => (
              <ProductCardEnhanced key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
