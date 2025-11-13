import bcrypt from "bcryptjs"
import { getDatabase } from "./db"
import { cookies } from "next/headers"

const db = getDatabase()

export interface User {
  id: string
  email: string
  first_name: string | null
  last_name: string | null
  avatar_url: string | null
  created_at: string
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

// Verify password
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

// Create user
export async function createUser(
  email: string,
  password: string,
  firstName?: string,
  lastName?: string,
): Promise<User> {
  const passwordHash = await hashPassword(password)
  const result = await db`
    INSERT INTO users (email, password_hash, first_name, last_name)
    VALUES (${email}, ${passwordHash}, ${firstName || null}, ${lastName || null})
    RETURNING id, email, first_name, last_name, avatar_url, created_at
  `
  return result[0]
}

// Get user by email
export async function getUserByEmail(email: string): Promise<User | null> {
  const result = await db`
    SELECT id, email, first_name, last_name, avatar_url, created_at
    FROM users WHERE email = ${email}
  `
  return result[0] || null
}

// Get user by ID
export async function getUserById(id: string): Promise<User | null> {
  const result = await db`
    SELECT id, email, first_name, last_name, avatar_url, created_at
    FROM users WHERE id = ${id}
  `
  return result[0] || null
}

// Get user with password hash (for authentication)
export async function getUserWithPassword(email: string) {
  const result = await db`
    SELECT id, email, password_hash, first_name, last_name, avatar_url, created_at
    FROM users WHERE email = ${email}
  `
  return result[0] || null
}

// Set auth session cookie
export async function setAuthCookie(userId: string, expiresIn: number = 7 * 24 * 60 * 60 * 1000) {
  const cookieStore = await cookies()
  cookieStore.set("auth_user_id", userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: expiresIn / 1000,
  })
}

// Get current user from session
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies()
  const userId = cookieStore.get("auth_user_id")?.value

  if (!userId) return null

  return getUserById(userId)
}

// Clear auth session
export async function clearAuthCookie() {
  const cookieStore = await cookies()
  cookieStore.delete("auth_user_id")
}
