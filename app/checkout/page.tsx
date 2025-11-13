"use client"

import { Suspense } from "react"
import Checkout from "@/components/checkout"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

function CheckoutContent() {
  const searchParams = useSearchParams()
  const productId = searchParams.get("product")

  if (!productId) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Invalid Checkout</h1>
          <p className="text-muted-foreground mb-8">Please select a product to checkout</p>
          <Link
            href="/products"
            className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <Link href="/products" className="text-sm text-primary hover:text-primary/80 mb-8 inline-block">
          ← Back to Products
        </Link>
        <h1 className="text-3xl font-bold text-foreground mb-8">Complete Your Purchase</h1>
        <Checkout productId={productId} />
      </div>
    </main>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="text-center py-16">Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  )
}
