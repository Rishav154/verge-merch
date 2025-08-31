"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import type { FullProduct } from "@/lib/products"
import { useCart } from "./store/use-cart"
import { useState } from "react"
import { ShoppingCart } from "lucide-react"

export function ProductCard({ product }: { product: FullProduct }) {
  const { add } = useCart()
  const [adding, setAdding] = useState(false)
  const [added, setAdded] = useState(false)

  function handleAdd() {
    if (adding) return
    setAdding(true)
    add({ id: product.id, name: product.name, price: product.price, image: product.image }, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 900)
    setTimeout(() => setAdding(false), 250)
  }

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      className="group rounded-lg border overflow-hidden bg-card text-card-foreground"
    >
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image || "/placeholder.svg?height=800&width=800&query=verge%20merch"}
            alt={`${product.name} product image`}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          />
          {product.badge && (
            <span className="absolute left-2 top-2 rounded-sm bg-accent text-accent-foreground text-[11px] px-2 py-1 neon-accent">
              {product.badge}
            </span>
          )}
        </div>
      </Link>
      <div className="p-4 flex items-center justify-between">
        <div>
          <h3 className="font-medium text-base text-foreground">{product.name}</h3>
          <p className="text-foreground/70 text-sm">${product.price.toFixed(2)}</p>
        </div>
        <motion.button
          onClick={handleAdd}
          disabled={adding}
          whileTap={{ scale: 0.95 }}
          className={`inline-flex items-center gap-2 rounded-md border text-sm px-4 py-2 transition-colors ${
            added
              ? "bg-primary text-primary-foreground border-primary"
              : "text-primary border-border hover:bg-primary/10"
          }`}
          aria-label={`Add ${product.name} to cart`}
          aria-live="polite"
        >
          <ShoppingCart className="h-4 w-4" aria-hidden="true" />
          {added ? "Added ✓" : "Add"}
        </motion.button>
      </div>
    </motion.article>
  )
}
