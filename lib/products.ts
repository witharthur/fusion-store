export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  images?: string[]
  category?: string
}

// This is the source of truth for all products.
// All UI to display products should pull from this array.
// IDs passed to the checkout session should be the same as IDs from this array.
export const PRODUCTS: Product[] = [
  {
    id: "wireless-earbuds",
    name: "Premium Wireless Earbuds",
    description: "High-quality wireless earbuds with noise cancellation and 30-hour battery life",
    priceInCents: 9999,
    category: "Audio",
    images: ["/wireless-headphones.jpg"],
  },
  {
    id: "smart-watch",
    name: "Smart Watch Pro",
    description: "Advanced fitness tracking and notification smartwatch with AMOLED display",
    priceInCents: 29999,
    category: "Wearables",
    images: ["/modern-smartwatch.png"],
  },
  {
    id: "usb-c-cable",
    name: "Premium USB-C Cable",
    description: "Durable 2m USB-C cable with fast charging support up to 100W",
    priceInCents: 1999,
    category: "Accessories",
    images: ["/usb-c-cable.jpg"],
  },
  {
    id: "phone-stand",
    name: "Adjustable Phone Stand",
    description: "Universal adjustable phone stand for desk, works with all phones",
    priceInCents: 1499,
    category: "Accessories",
    images: ["/minimalist-wooden-phone-stand.png"],
  },
  {
    id: "portable-charger",
    name: "Portable Power Bank 20000mAh",
    description: "Fast-charging power bank with dual USB ports and LED display",
    priceInCents: 3999,
    category: "Power",
    images: ["/portable-charger.jpg"],
  },
  {
    id: "screen-protector",
    name: "Tempered Glass Screen Protector",
    description: "Pack of 2 premium tempered glass protectors for smartphones",
    priceInCents: 999,
    category: "Accessories",
    images: ["/screen-protector.png"],
  },
]
