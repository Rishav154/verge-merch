"use client"

import useSWR, { mutate } from "swr"
import { useMemo, useEffect } from "react"

type CartItem = {
  id: string
  name: string
  price: number
  image: string
  qty: number
}

const CART_KEY = "verge-cart"

function readCart(): CartItem[] {
  if (typeof window === "undefined") return []
  const raw = localStorage.getItem(CART_KEY)
  try {
    return raw ? (JSON.parse(raw) as CartItem[]) : []
  } catch {
    return []
  }
}

function writeCart(items: CartItem[]) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items))
  } catch {
    // ignore quota/serialisation errors
  }
}

export function useCart() {
  const { data } = useSWR<CartItem[]>(CART_KEY, async () => readCart(), {
    fallbackData: [],
    revalidateOnFocus: false,
  })
  const items = data || []

  function set(next: CartItem[]) {
    writeCart(next)
    // ensure we don't trigger a revalidation request; update cache immediately
    mutate(CART_KEY, next, { revalidate: false })
  }

  function add(item: Omit<CartItem, "qty">, qty = 1) {
    const safeQty = Math.max(1, Math.floor(Number(qty) || 1))
    const current = readCart()
    const next = [...current]
    const found = next.find((i) => i.id === item.id)
    if (found) {
      found.qty += safeQty
    } else {
      next.push({ ...item, image: item.image || "/diverse-products-still-life.png", qty: safeQty })
    }
    set(next)
  }

  function remove(id: string) {
    set(items.filter((i) => i.id !== id))
  }

  function update(id: string, qty: number) {
    if (qty <= 0) return remove(id)
    set(items.map((i) => (i.id === id ? { ...i, qty } : i)))
  }

  function clear() {
    set([])
  }

  // keep in sync across tabs/windows
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === CART_KEY) {
        mutate(CART_KEY, readCart(), { revalidate: false })
      }
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.qty, 0), [items])

  return { items, add, remove, update, clear, subtotal }
}

export function useCartCount() {
  const { data } = useSWR<CartItem[]>(CART_KEY, async () => readCart(), {
    fallbackData: [],
    revalidateOnFocus: false,
  })
  return (data || []).reduce((sum, i) => sum + i.qty, 0)
}
