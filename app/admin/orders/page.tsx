"use client"

import Link from "next/link"

export default function OrdersAdmin() {
  const orders = [] // Would be fetched from database

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Orders</h1>
          <Link href="/admin" className="text-sm text-primary hover:text-primary/80">
            Back to Admin
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16 border border-border rounded-lg bg-card">
            <p className="text-muted-foreground mb-4">No orders yet</p>
            <Link href="/" className="text-sm text-primary hover:text-primary/80">
              View Store
            </Link>
          </div>
        ) : (
          <div className="border border-border rounded-lg overflow-hidden">{/* Orders table would go here */}</div>
        )}
      </div>
    </main>
  )
}
