"use client"

import Link from "next/link"

export default function UsersAdmin() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Users</h1>
          <Link href="/admin" className="text-sm text-primary hover:text-primary/80">
            Back to Admin
          </Link>
        </div>

        <div className="text-center py-16 border border-border rounded-lg bg-card">
          <p className="text-muted-foreground">User management features coming soon</p>
        </div>
      </div>
    </main>
  )
}
