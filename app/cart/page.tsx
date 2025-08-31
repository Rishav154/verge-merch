"use client"

import Link from "next/link"
import { useMemo } from "react"
import { useCart } from "@/components/store/use-cart"
import { Minus, Plus, Trash2, ArrowRight, CreditCard } from "lucide-react"

export default function CartPage() {
  const { items, update, remove, clear, subtotal } = useCart()

  const count = useMemo(() => items.reduce((sum, it) => sum + (Number(it.qty) || 1), 0), [items])

  const shipping = subtotal > 0 ? 0 : 0
  const tax = Math.round(subtotal * 0.0)
  const total = subtotal + shipping + tax

  return (
    <main className="container mx-auto max-w-5xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-pretty">Your Cart</h1>
        <p className="text-muted-foreground">
          {count} item{count === 1 ? "" : "s"} in cart
        </p>
      </header>

      {items.length === 0 ? (
        <section className="rounded-lg border p-8 text-center">
          <p className="mb-4 text-muted-foreground">Your cart is empty.</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:opacity-90 transition"
          >
            Continue shopping
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>
      ) : (
        <div className="grid gap-8 md:grid-cols-[1fr_360px]">
          <section aria-label="Cart items" className="space-y-4">
            {items.map((it) => (
              <article key={it.id} className="flex items-center gap-4 rounded-lg border p-4">
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={it.image || "/placeholder.svg?height=80&width=80&query=product%20image"}
                    alt={it.name || "Product image"}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                  <h3 className="truncate text-sm font-medium">{it.name}</h3>
                  <p className="mt-1 text-sm font-semibold">₹{Number(it.price || 0).toFixed(2)}</p>

                  <div className="mt-3 inline-flex items-center gap-2">
                    <button
                      aria-label="Decrease quantity"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border hover:bg-muted"
                      onClick={() => {
                        const next = Math.max(1, Number(it.qty || 1) - 1)
                        update(it.id, next)
                      }}
                    >
                      <Minus className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <span className="min-w-6 text-center text-sm tabular-nums">{Number(it.qty || 1)}</span>
                    <button
                      aria-label="Increase quantity"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border hover:bg-muted"
                      onClick={() => {
                        const next = Number(it.qty || 1) + 1
                        update(it.id, next)
                      }}
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button
                      aria-label="Remove item"
                      className="ml-3 inline-flex items-center gap-2 rounded-md border px-2 py-1 text-sm hover:bg-muted"
                      onClick={() => remove(it.id)}
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <aside aria-label="Order summary" className="space-y-4 rounded-lg border p-4">
            <h2 className="text-lg font-semibold">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Tax</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="mt-2 flex items-center justify-between border-t pt-2 text-base font-semibold">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <button
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:opacity-90 transition"
                onClick={() => alert("Mock checkout — integrate Stripe for real payments.")}
              >
                <CreditCard className="h-4 w-4" aria-hidden="true" />
                Proceed to Checkout
              </button>

              <button
                className="inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2 hover:bg-muted transition"
                onClick={() => clear()}
                aria-label="Clear cart"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
                Clear cart
              </button>

              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 hover:underline"
              >
                Continue shopping
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>
      )}
    </main>
  )
}
