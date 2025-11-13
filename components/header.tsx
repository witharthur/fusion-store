"use client"

import Link from "next/link"
import { ShoppingCart, Search, Menu, X, Heart } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)

  useEffect(() => {
    const updateCounts = () => {
      const cart = localStorage.getItem("cart")
      const wishlist = localStorage.getItem("wishlist")

      const cartItems = cart ? JSON.parse(cart) : []
      const wishlistItems = wishlist ? JSON.parse(wishlist) : []

      const totalCartCount = cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0)
      setCartCount(totalCartCount)
      setWishlistCount(wishlistItems.length)
    }

    updateCounts()
    window.addEventListener("storage", updateCounts)
    return () => window.removeEventListener("storage", updateCounts)
  }, [])

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-lg">
              F
            </div>
            <span className="font-bold text-lg hidden sm:inline-block text-foreground group-hover:text-primary transition-colors">
              FusionStore
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Products
            </Link>
            <Link href="/wishlist" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Wishlist
            </Link>
            <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Admin
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link
              href="/wishlist"
              className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link href="/cart" className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link href="/auth/login" className="hidden sm:block">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden border-t border-border py-4 space-y-3">
            <Link
              href="/products"
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              Products
            </Link>
            <Link
              href="/wishlist"
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              Wishlist ({wishlistCount})
            </Link>
            <Link
              href="/admin"
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              Admin
            </Link>
            <Link href="/auth/login" className="block pt-2">
              <Button variant="outline" className="w-full bg-transparent">
                Sign In
              </Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
