"use client"

import { useMemo, useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { ProductCard } from "@/components/product-card"
import { PRODUCTS } from "@/lib/products"

const TAGS = ["all", "apparel", "hoodie", "tee", "accessories"]

export default function ShopPage() {
  const [tag, setTag] = useState("all")
  const list = useMemo(() => (tag === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.tags?.includes(tag))), [tag])

  return (
    <main>
      <SiteHeader />
      <section className="max-w-6xl mx-auto px-4 py-10">
        <header className="mb-6">
          <h1 className="font-serif text-3xl text-primary neon">Shop</h1>
          <p className="text-sm text-foreground/70 mt-1">Curated drops for the Verge tech fest.</p>
        </header>

        <div className="mb-6 flex flex-wrap items-center gap-2">
          {TAGS.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`rounded-md border px-3 py-1.5 text-sm transition ${
                t === tag
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-primary hover:bg-primary/10"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </main>
  )
}
