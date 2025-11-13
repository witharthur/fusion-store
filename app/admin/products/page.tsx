"use client"

import Link from "next/link"
import { PRODUCTS } from "@/lib/products"
import { Edit2, Trash2, Plus } from "lucide-react"

export default function ProductsAdmin() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Manage Products</h1>
          <div className="flex gap-2">
            <Link
              href="/admin"
              className="px-4 py-2 text-sm border border-border text-foreground rounded-lg hover:bg-muted"
            >
              Back to Admin
            </Link>
            <Link
              href="/admin/products/new"
              className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </Link>
          </div>
        </div>

        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Product</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Category</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Price</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {PRODUCTS.map((product) => (
                <tr key={product.id} className="border-b border-border hover:bg-muted/50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-foreground">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{product.category || "General"}</td>
                  <td className="px-6 py-4 font-medium text-primary">${(product.priceInCents / 100).toFixed(2)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-destructive hover:bg-destructive/10 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
