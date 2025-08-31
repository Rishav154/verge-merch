"use client"

import Link from "next/link"
import { useCart } from "./use-cart"

export function CartPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, remove, update, subtotal, clear } = useCart()

  return (
    <div className={`fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!open}>
      <div
        className={`absolute inset-0 bg-black/60 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-background border-l transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="font-serif text-primary neon">Your Cart</h2>
          <button onClick={onClose} className="text-sm text-foreground/70 hover:text-foreground">
            Close
          </button>
        </div>

        <div className="p-4 flex flex-col h-[calc(100%-48px)]">
          <div className="space-y-4 overflow-auto pr-1 flex-1">
            {items.length === 0 && <p className="text-sm text-foreground/70">Your cart is empty.</p>}
            {items.map((i) => (
              <div key={i.id} className="flex items-center gap-3 border rounded-md p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={i.image || "/placeholder.svg"} alt="" className="w-16 h-16 object-cover rounded" />
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium">{i.name}</p>
                      <p className="text-xs text-foreground/70">${i.price.toFixed(2)}</p>
                    </div>
                    <button onClick={() => remove(i.id)} className="text-xs text-foreground/70 hover:text-accent">
                      Remove
                    </button>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <label htmlFor={`qty-${i.id}`} className="sr-only">
                      Quantity
                    </label>
                    <input
                      id={`qty-${i.id}`}
                      type="number"
                      min={1}
                      value={i.qty}
                      onChange={(e) => update(i.id, Number(e.target.value))}
                      className="w-16 rounded border bg-background px-2 py-1 text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-3">
            <div className="flex items-center justify-between text-sm">
              <span>Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={clear}
                className="w-1/3 rounded-md border text-primary px-3 py-2 text-sm hover:bg-primary/10"
              >
                Clear
              </button>
              <Link
                href="/checkout"
                onClick={onClose}
                className="w-2/3 inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm font-semibold"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
