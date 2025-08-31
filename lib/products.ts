export type FullProduct = {
  id: string
  name: string
  price: number
  image: string
  description: string
  badge?: string
  tags?: string[]
}

export const PRODUCTS: FullProduct[] = [
  {
    id: "verge-tee-cyan",
    name: "Verge Neon Tee",
    price: 29,
    image: "/verge-neon-tee-on-dark-background.png",
    description: "Ultra-soft cotton tee with a neon Verge crest. Built for late nights and bright ideas.",
    badge: "New",
    tags: ["apparel", "tee"],
  },
  {
    id: "verge-hoodie-grid",
    name: "Gridline Hoodie",
    price: 59,
    image: "/gridline-hoodie-cyber-grid-print.png",
    description: "Heavyweight hoodie with cyber grid back print and reflective sleeve tag.",
    tags: ["apparel", "hoodie"],
  },
  {
    id: "verge-cap",
    name: "Stealth Cap",
    price: 24,
    image: "/stealth-cap-reflective-underbill.png",
    description: "Low-profile cap with embroidered VERGE lettering and reflective underbill.",
    tags: ["accessories"],
  },
  {
    id: "verge-sticker-pack",
    name: "Sticker Pack",
    price: 9,
    image: "/verge-sticker-pack-vinyl.png",
    description: "8-piece vinyl sticker set with neon-retro icons.",
    badge: "Hot",
    tags: ["accessories"],
  },
]
