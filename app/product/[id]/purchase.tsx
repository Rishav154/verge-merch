"use client"

import type { FullProduct } from "@/lib/products"
import { useCart } from "@/components/store/use-cart"

export function AddToCart({ product }: { product: FullProduct }) {
  const { add } = useCart()
  return (
    <button
      onClick={() => add({ id: product.id, image: product.image, name: product.name, price: product.price }, 1)}
      className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold"
    >
      Add to cart
    </button>
  )
}
