import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { PRODUCTS } from "@/lib/products"
import { AddToCart } from "./purchase"

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = PRODUCTS.find((p) => p.id === params.id)
  if (!product) return notFound()

  return (
    <main>
      <SiteHeader />
      <section className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image || "/placeholder.svg"}
          alt={`${product.name} product image`}
          className="w-full rounded-lg border object-cover"
        />
        <div>
          <h1 className="font-serif text-3xl text-primary neon">{product.name}</h1>
          <p className="mt-2 text-foreground/85 leading-relaxed">{product.description}</p>
          <p className="mt-4 text-xl font-semibold">${product.price.toFixed(2)}</p>
          <div className="mt-6">
            <AddToCart product={product} />
          </div>
        </div>
      </section>
    </main>
  )
}
