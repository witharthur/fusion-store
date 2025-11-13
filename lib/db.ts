import { neon } from "@neondatabase/serverless"

let sql: ReturnType<typeof neon> | null = null

export function getDatabase() {
  if (!sql) {
    const dbUrl = process.env.NEON_DATABASE_URL
    if (!dbUrl) {
      throw new Error("DATABASE_URL environment variable is not set")
    }
    sql = neon(dbUrl)
  }
  return sql
}

export const db = new Proxy(
  {},
  {
    get: (target, prop) => {
      const database = getDatabase()
      return (database as any)[prop]
    },
  },
)
