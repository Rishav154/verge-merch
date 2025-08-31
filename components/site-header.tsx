"use client"

import type React from "react"

import Link from "next/link"
import { useCartCount } from "./store/use-cart"
import { motion } from "framer-motion"
import { ShoppingCart, ArrowRight } from "lucide-react"

export function SiteHeader() {
  const count = useCartCount()

  return (
    <header className="sticky top-0 z-40 bg-background/75 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="group inline-flex items-center gap-2">
          <motion.span
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="font-serif text-xl tracking-wide text-primary neon"
          >
            VERGE
          </motion.span>
          <span className="sr-only">Verge Home</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/shop">Shop</NavLink>
          <NavLink href="/checkout">Checkout</NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center gap-2 text-sm text-foreground/80 hover:text-primary transition"
          >
            Explore
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          <Link
            href="/cart"
            className="relative inline-flex items-center justify-center rounded-md border px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10"
            aria-label="Go to cart"
          >
            <ShoppingCart className="h-5 w-5" aria-hidden="true" />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 inline-flex min-w-5 h-5 items-center justify-center rounded-sm bg-accent text-background text-[11px] px-1 neon-accent">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-sm text-foreground/80 hover:text-primary transition">
      {children}
    </Link>
  )
}
