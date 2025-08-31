import { SiteHeader } from "@/components/site-header"
import { CyberHero } from "@/components/cyber-hero"
import { PRODUCTS } from "@/lib/products"
import { ProductCard } from "@/components/product-card"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <CyberHero />
      <section id="featured" className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="font-serif text-2xl text-primary neon">Featured</h2>
          <a href="/shop" className="text-sm text-foreground/80 hover:text-primary">
            View all →
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRODUCTS.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2 text-sm font-medium text-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
            aria-label="See all Verge merchandise"
          >
            <span>See all products</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  )
}
