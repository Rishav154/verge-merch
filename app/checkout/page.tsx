"use client"

import type React from "react"
import { SiteHeader } from "@/components/site-header"
import { useCart } from "@/components/store/use-cart"
import { useState } from "react"

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart()
  const [placed, setPlaced] = useState(false)

  function placeOrder(e: React.FormEvent) {
    e.preventDefault()
    setPlaced(true)
    clear()
  }

  return (
    <main>
      <SiteHeader />
      <section className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h1 className="font-serif text-2xl text-primary neon">Checkout</h1>
          <p className="text-sm text-foreground/70 mt-1">This is a demo checkout. Integrate payments later.</p>

          {!placed ? (
            <form onSubmit={placeOrder} className="mt-6 space-y-4">
              <Input label="Full name" />
              <Input label="Email" type="email" />
              <Input label="Shipping address" />
              <div className="grid grid-cols-2 gap-3">
                <Input label="City" />
                <Input label="Postal code" />
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold"
              >
                Place order (${subtotal.toFixed(2)})
              </button>
            </form>
          ) : (
            <div className="mt-6 rounded-md border p-4">
              <h2 className="font-serif text-primary neon">Order placed</h2>
              <p className="text-sm text-foreground/85 mt-1">
                Thanks for supporting Verge! You’ll receive a confirmation email shortly.
              </p>
            </div>
          )}
        </div>

        <div>
          <h2 className="font-serif text-xl text-primary neon">Order summary</h2>
          <div className="mt-3 space-y-3">
            {items.length === 0 && <p className="text-sm text-foreground/70">Cart is empty.</p>}
            {items.map((i) => (
              <div key={i.id} className="flex items-center gap-3 border rounded-md p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={i.image || "/placeholder.svg"} alt="" className="w-16 h-16 object-cover rounded" />
                <div className="flex-1 text-sm">
                  <p className="font-medium">{i.name}</p>
                  <p className="text-foreground/70">Qty {i.qty}</p>
                </div>
                <div className="text-sm font-medium">${(i.price * i.qty).toFixed(2)}</div>
              </div>
            ))}
            <div className="flex items-center justify-between border-t pt-3">
              <span>Total</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function Input({ label, type = "text" }: { label: string; type?: string }) {
  const id = label.toLowerCase().replace(/\s+/g, "-")
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-sm">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required
        className="rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
      />
    </div>
  )
}
