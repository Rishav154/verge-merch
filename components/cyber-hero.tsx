"use client"

import TechBg from "./effects/tech-bg"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ShoppingBag, MoveRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function CyberHero() {
  const prefersReducedMotion = useReducedMotion()
  const headingRef = useRef<HTMLHeadingElement | null>(null)
  const [beamYs, setBeamYs] = useState<number[]>([])

  useEffect(() => {
    if (prefersReducedMotion) return
    const update = () => {
      const el = headingRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      setBeamYs([
        rect.top + rect.height * 0.2,
        rect.top + rect.height * 0.3,
        rect.top + rect.height * 0.5,
        rect.top + rect.height * 0.7,
        rect.top + rect.height * 0.85,
      ])
    }
    update()
    window.addEventListener("resize", update)
    window.addEventListener("scroll", update, { passive: true })
    return () => {
      window.removeEventListener("resize", update)
      window.removeEventListener("scroll", update)
    }
  }, [prefersReducedMotion])

  return (
    <section className="relative overflow-hidden min-h-[60vh] sm:min-h-[70vh] flex items-center">
      <TechBg />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4">
        <div className="flex flex-col items-center text-center gap-6">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.2em] text-primary/90"
          >
            Verge Official Merch
          </motion.span>

          <motion.h1
            ref={headingRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="relative inline-block text-balance text-5xl sm:text-6xl font-semibold uppercase neon md:text-8xl tracking-widest font-serif overflow-hidden"
          >
            <span className="relative z-10">VERGE</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-2xl text-foreground/70 leading-relaxed"
          >
            Neon-ready tees, hoodies, and accessories. Built for late-night hacking, bright lights, and the Verge crowd.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-2 flex items-center gap-3"
          >
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2 text-sm font-medium text-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
              aria-label="Shop Verge merchandise"
            >
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              <span>Shop now</span>
            </Link>
            <Link
              href="#featured"
              className="inline-flex items-center gap-2 rounded-md border border-foreground/15 px-5 py-2 text-sm font-medium text-foreground/90 transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              aria-label="See featured products"
            >
              <span>See featured</span>
              <MoveRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </div>
      {!prefersReducedMotion && beamYs.length >= 5 && (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none fixed left-0 w-screen h-0 z-20"
            style={{ top: beamYs[0] }}
          >
            <span className="laser-beam" style={{ animationDuration: "2.1s", animationDelay: "0s" }} />
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none fixed left-0 w-screen h-0 z-20"
            style={{ top: beamYs[1] }}
          >
            <span className="laser-beam" style={{ animationDuration: "2.1s", animationDelay: "0.25s" }} />
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none fixed left-0 w-screen h-0 z-20"
            style={{ top: beamYs[2] }}
          >
            <span className="laser-beam" style={{ animationDuration: "2.1s", animationDelay: "0.5s" }} />
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none fixed left-0 w-screen h-0 z-20"
            style={{ top: beamYs[3] }}
          >
            <span className="laser-beam" style={{ animationDuration: "2.1s", animationDelay: "0.75s" }} />
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none fixed left-0 w-screen h-0 z-20"
            style={{ top: beamYs[4] }}
          >
            <span className="laser-beam" style={{ animationDuration: "2.1s", animationDelay: "1s" }} />
          </span>
        </>
      )}
    </section>
  )
}
