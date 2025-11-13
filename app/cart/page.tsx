"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { PRODUCTS } from "@/lib/products"

interface CartItem {
  productId: string
  quantity: number
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load cart from localStorage
    const saved = localStorage.getItem("cart")
    if (saved) {
      setCartItems(JSON.parse(saved))
    }
    setLoading(false)
  }, [])

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    const updated = cartItems.map((item) => (item.productId === productId ? { ...item, quantity } : item))
    setCartItems(updated)
    localStorage.setItem("cart", JSON.stringify(updated))
  }

  const removeItem = (productId: string) => {
    const updated = cartItems.filter((item) => item.productId !== productId)
    setCartItems(updated)
    localStorage.setItem("cart", JSON.stringify(updated))
  }

  const cartTotal = cartItems.reduce((total, item) => {
    const product = PRODUCTS.find((p) => p.id === item.productId)
    return total + (product?.priceInCents || 0) * item.quantity
  }, 0)

  if (loading) {
    return <div className="text-center py-16">Loading cart...</div>
  }

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-6">Your cart is empty</p>
            <Link
              href="/products"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => {
                const product = PRODUCTS.find((p) => p.id === item.productId)
                if (!product) return null

                return (
                  <div key={product.id} className="flex gap-4 p-4 border border-border rounded-lg">
                    <div className="w-24 h-24 bg-muted rounded flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
                      <p className="text-sm font-medium text-primary">${(product.priceInCents / 100).toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(product.id, item.quantity - 1)}
                        className="px-2 py-1 text-sm border border-border rounded hover:bg-muted"
                      >
                        −
                      </button>
                      <span className="px-3 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, item.quantity + 1)}
                        className="px-2 py-1 text-sm border border-border rounded hover:bg-muted"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="text-destructive hover:text-destructive/80 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="p-6 border border-border rounded-lg bg-card sticky top-4">
              <h2 className="text-xl font-bold text-foreground mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="text-foreground">${(cartTotal / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping:</span>
                  <span className="text-foreground">Free</span>
                </div>
                <div className="border-t border-border pt-2 mt-2 flex justify-between font-bold">
                  <span className="text-foreground">Total:</span>
                  <span className="text-primary">${(cartTotal / 100).toFixed(2)}</span>
                </div>
              </div>

              {cartItems.length > 0 && (
                <Link
                  href={`/checkout?product=${cartItems[0].productId}`}
                  className="block w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 text-center font-medium"
                >
                  Proceed to Checkout
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
