"use client"

import Link from "next/link"
import { BarChart3, Package, ShoppingCart, Users } from "lucide-react"

export default function AdminDashboard() {
  const stats = [
    { label: "Total Products", value: "6", icon: Package, href: "/admin/products" },
    { label: "Total Orders", value: "0", icon: ShoppingCart, href: "/admin/orders" },
    { label: "Active Users", value: "0", icon: Users, href: "/admin/users" },
    { label: "Revenue", value: "$0", icon: BarChart3, href: "/admin/analytics" },
  ]

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-foreground">Admin Dashboard</h1>
          <Link href="/" className="text-sm text-primary hover:text-primary/80">
            ← Back to Store
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Link key={stat.label} href={stat.href}>
                <div className="p-6 border border-border rounded-lg bg-card hover:border-primary/50 transition cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-muted-foreground">{stat.label}</h3>
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-6 border border-border rounded-lg bg-card">
            <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                href="/admin/products/new"
                className="block w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 text-center font-medium"
              >
                Add New Product
              </Link>
              <Link
                href="/admin/products"
                className="block w-full px-4 py-3 border border-border text-foreground rounded-lg hover:bg-muted text-center font-medium"
              >
                Manage Products
              </Link>
              <Link
                href="/admin/orders"
                className="block w-full px-4 py-3 border border-border text-foreground rounded-lg hover:bg-muted text-center font-medium"
              >
                View Orders
              </Link>
            </div>
          </div>

          <div className="p-6 border border-border rounded-lg bg-card">
            <h2 className="text-xl font-bold text-foreground mb-4">Store Information</h2>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">Platform</p>
                <p className="text-foreground font-medium">FusionStore - Next.js + Stripe</p>
              </div>
              <div>
                <p className="text-muted-foreground">Status</p>
                <p className="text-foreground font-medium">Operational</p>
              </div>
              <div>
                <p className="text-muted-foreground">Last Updated</p>
                <p className="text-foreground font-medium">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
