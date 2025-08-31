"use client"

import { useEffect, useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"

type Drop = { x: number; y: number; speed: number; char: string; color: string; fontSize: number }

const ENABLE_CODE_RAIN = false

export default function TechBg({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const dropsRef = useRef<Drop[]>([])
  const lastTsRef = useRef<number>(0)
  const isHiddenRef = useRef<boolean>(false)
  const prefersReducedMotion = useReducedMotion()

  const step = (ts: number) => {
    if (isHiddenRef.current || !ENABLE_CODE_RAIN) {
      rafRef.current = requestAnimationFrame(step)
      return
    }
    const prev = lastTsRef.current || ts
    const dt = Math.min(32, ts - prev)
    lastTsRef.current = ts

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const w = canvas.width / dpr
    const h = canvas.height / dpr

    // subtle trail to create code rain persistence
    ctx.fillStyle = "rgba(0, 0, 0, 0.08)"
    ctx.fillRect(0, 0, w, h)

    dropsRef.current.forEach((d) => {
      ctx.save()
      ctx.font = `${d.fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`
      ctx.fillStyle = d.color
      ctx.shadowColor = d.color
      ctx.shadowBlur = 8
      ctx.fillText(d.char, d.x, d.y)
      ctx.restore()

      d.y += d.speed * (dt * 0.06)

      if (d.y > h + d.fontSize) {
        d.y = -Math.random() * 200
        d.x = Math.random() * w
        d.speed = 30 + Math.random() * 50
        d.fontSize = 10 + Math.floor(Math.random() * 6) // 10-15px
        d.char = pickChar()
        d.color = pickColor()
      } else if (Math.random() < 0.02) {
        // occasional glyph change
        d.char = pickChar()
      }
    })

    rafRef.current = requestAnimationFrame(step)
  }

  useEffect(() => {
    if (!ENABLE_CODE_RAIN) return
    const onVis = () => {
      isHiddenRef.current = document.hidden
      if (!document.hidden && rafRef.current == null && !prefersReducedMotion) {
        rafRef.current = requestAnimationFrame(step)
      }
    }
    document.addEventListener("visibilitychange", onVis)
    return () => document.removeEventListener("visibilitychange", onVis)
  }, [prefersReducedMotion])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const resize = () => {
      const parent = canvas.parentElement
      const w = parent?.clientWidth ?? window.innerWidth
      const h = parent?.clientHeight ?? window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initDrops(w, h)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement || document.body)
    resize()

    function initDrops(w: number, h: number) {
      const count = Math.min(220, Math.floor((w * h) / 16000))
      const arr: Drop[] = []
      for (let i = 0; i < count; i++) {
        arr.push({
          x: Math.random() * w,
          y: Math.random() * h,
          speed: 30 + Math.random() * 50,
          char: pickChar(),
          color: pickColor(),
          fontSize: 10 + Math.floor(Math.random() * 6), // 10-15px
        })
      }
      dropsRef.current = arr
    }

    if (!prefersReducedMotion && ENABLE_CODE_RAIN) {
      rafRef.current = requestAnimationFrame(step)
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      ro.disconnect()
    }
  }, [prefersReducedMotion])

  function pickChar() {
    const chars = "01<>[]{}|/\\-+=*:#$@ABCDEF0123456789"
    return chars.charAt(Math.floor(Math.random() * chars.length))
  }
  function pickColor() {
    const palette = [
      "rgba(0,229,255,0.75)", // neon cyan
      "rgba(255,62,219,0.70)", // neon magenta
      "rgba(255,255,255,0.40)", // soft white
    ]
    return palette[Math.floor(Math.random() * palette.length)]
  }

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}>
      {!prefersReducedMotion && (
        <motion.div
          aria-hidden
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,229,255,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,229,255,0.14) 1px, transparent 1px)",
            backgroundSize: "48px 48px, 48px 48px",
            willChange: "background-position",
          }}
          animate={{ backgroundPositionX: ["0px", "48px"], backgroundPositionY: ["0px", "48px"] }}
          transition={{ duration: 24, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
        />
      )}

      {/* perspective grid kept minimal */}
      {!prefersReducedMotion && (
        <div
          aria-hidden
          className="absolute bottom-[-8%] left-0 right-0 h-2/3 opacity-30"
          style={{
            transform: "perspective(900px) rotateX(60deg)",
            transformOrigin: "50% 100%",
            backgroundImage:
              "repeating-linear-gradient(to right, rgba(0,229,255,0.14) 0px, rgba(0,229,255,0.14) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(to top, rgba(0,229,255,0.14) 0px, rgba(0,229,255,0.14) 1px, transparent 1px, transparent 40px)",
            backgroundSize: "auto",
            maskImage: "linear-gradient(to top, black 25%, rgba(0,0,0,0.75) 55%, rgba(0,0,0,0.0) 100%)",
            WebkitMaskImage: "linear-gradient(to top, black 25%, rgba(0,0,0,0.75) 55%, rgba(0,0,0,0.0) 100%)",
          }}
        />
      )}

      {/* scanlines */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-15 mix-blend-soft-light"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 2px, transparent 4px)",
        }}
      />
    </div>
  )
}
