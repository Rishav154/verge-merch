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
  {
    id: "verge-mug",
    name: "Neon Mug",
    price: 14,
    image: "/verge-neon-mug.png",
    description: "Ceramic mug with glow-ink VERGE logotype.",
    tags: ["accessories", "mug"],
  },
  {
    id: "verge-poster",
    name: "Event Poster",
    price: 12,
    image: "/verge-event-poster-cyber.png",
    description: "A3 poster with cyber grid artwork and dates.",
    tags: ["poster", "collectible"],
  },
  {
    id: "verge-tote",
    name: "Utility Tote",
    price: 19,
    image: "/verge-tote-bag-tech.png",
    description: "Heavy canvas tote with reflective edge piping.",
    tags: ["bag", "accessories"],
  },
  {
    id: "verge-oversize-tee",
    name: "Oversize Tee",
    price: 34,
    image: "/verge-oversize-tee.png",
    description: "Boxy cut tee with oversized VERGE monogram.",
    tags: ["apparel", "tee"],
  },
  {
    id: "verge-socks",
    name: "Grid Socks",
    price: 11,
    image: "/verge-socks-grid.png",
    description: "Crew socks with neon grid and wordmark.",
    tags: ["apparel", "socks"],
  },
  {
    id: "verge-lanyard",
    name: "Reflective Lanyard",
    price: 8,
    image: "/verge-reflective-lanyard.png",
    description: "Badge lanyard with reflective weave and clip.",
    tags: ["accessories"],
  },
  {
    id: "verge-keychain",
    name: "Acrylic Keychain",
    price: 7,
    image: "/verge-acrylic-keychain.png",
    description: "Clear acrylic charm with neon edge glow.",
    tags: ["accessories"],
  },
  {
    id: "verge-phone-case",
    name: "Grid Phone Case",
    price: 22,
    image: "/verge-grid-phone-case.png",
    description: "Shock case with cyber grid pattern and crest.",
    tags: ["accessories", "case"],
  },
]
