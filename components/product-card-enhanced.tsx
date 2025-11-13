"use client"

import Link from "next/link"
import { Heart } from "lucide-react"
import { useState, useEffect } from "react"
import type { Product } from "@/lib/products"

interface ProductCardEnhancedProps {
  product: Product
}

export default function ProductCardEnhanced({ product }: ProductCardEnhancedProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("wishlist")
    const wishlist = saved ? JSON.parse(saved) : []
    setIsWishlisted(wishlist.includes(product.id))
  }, [product.id])

  const toggleWishlist = () => {
    const saved = localStorage.getItem("wishlist")
    const wishlist = saved ? JSON.parse(saved) : []

    if (isWishlisted) {
      const filtered = wishlist.filter((id: string) => id !== product.id)
      localStorage.setItem("wishlist", JSON.stringify(filtered))
    } else {
      wishlist.push(product.id)
      localStorage.setItem("wishlist", JSON.stringify(wishlist))
    }

    setIsWishlisted(!isWishlisted)
    window.dispatchEvent(new Event("storage"))
  }

  if (!mounted) return null

  return (
    <div className="group border border-border rounded-lg overflow-hidden bg-card hover:border-primary/50 transition hover:shadow-lg">
      <div className="relative w-full aspect-square bg-muted overflow-hidden">
        <img
          src={product.images?.[0] || "/placeholder.svg?key=default"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition"
        />
        <button
          onClick={toggleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition ${
            isWishlisted ? "bg-red-500/80 text-white" : "bg-black/20 text-white hover:bg-black/40"
          }`}
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
        </button>
      </div>

      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-foreground hover:text-primary mb-1 line-clamp-2">{product.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">${(product.priceInCents / 100).toFixed(2)}</span>
          <Link
            href={`/checkout?product=${product.id}`}
            className="px-3 py-2 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90"
          >
            Buy
          </Link>
        </div>
      </div>
    </div>
  )
}
