import React, { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Spline from '@splinetool/react-spline'
import { ShoppingBag, Menu, X, Search, User, ChevronRight, Star } from 'lucide-react'
import './index.css'

const BRAND = {
  name: 'CTRL-Z',
  tagline: 'Undo Limits. Define You.',
  colors: {
    bg: '#000000',
    gray: '#1A1A1A',
    neon: '#00FFFF',
    crimson: '#FF004C',
    white: '#FFFFFF'
  }
}

const useApi = () => {
  const base = import.meta.env.VITE_BACKEND_URL || ''
  const fetchJson = async (url) => {
    const res = await fetch(base + url)
    if (!res.ok) throw new Error('Network error')
    return res.json()
  }
  return { fetchJson, base }
}

function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-white tracking-widest font-semibold text-xl">
          <span className="relative inline-block">
            <span className="pr-1">CTRL</span>
            <span className="text-cyan-300">-Z</span>
            <span className="absolute left-0 top-0 translate-x-[1px] translate-y-[-1px] text-cyan-500/40 select-none pointer-events-none">CTRL-Z</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-neutral-200">
          <Link to="/shop" className="hover:text-cyan-300 transition-colors">Shop</Link>
          <Link to="/about" className="hover:text-cyan-300 transition-colors">About</Link>
          <Link to="/account" className="hover:text-cyan-300 transition-colors">Account</Link>
          <Link to="/contact" className="hover:text-cyan-300 transition-colors">Support</Link>
          <Search className="w-5 h-5" />
          <ShoppingBag className="w-5 h-5" />
        </div>
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="md:hidden bg-black/80 backdrop-blur border-t border-white/10">
            <div className="px-4 py-4 flex flex-col gap-3 text-neutral-200">
              <Link to="/shop" onClick={() => setOpen(false)}>Shop</Link>
              <Link to="/about" onClick={() => setOpen(false)}>About</Link>
              <Link to="/account" onClick={() => setOpen(false)}>Account</Link>
              <Link to="/contact" onClick={() => setOpen(false)}>Support</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function GlitchCTA({ children }) {
  return (
    <button className="relative overflow-hidden group px-6 py-3 rounded-md border border-cyan-400/50 text-white">
      <span className="relative z-10 tracking-widest">
        {children}
      </span>
      <span className="absolute inset-0 bg-cyan-500/10 translate-y-full group-hover:translate-y-0 transition-transform" />
      <span className="absolute inset-x-0 -inset-y-1 bg-[linear-gradient(90deg,transparent,rgba(0,255,255,0.35),transparent)] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
    </button>
  )
}

function Marquee() {
  const text = 'CTRL-Z // UNDO LIMITS // FUTURE MODE ON // '
  return (
    <div className="w-full border-t border-b border-white/10 py-2 overflow-hidden">
      <div className="animate-[marquee_18s_linear_infinite] whitespace-nowrap text-neutral-300 tracking-widest">
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className="mx-4">{text}</span>
        ))}
      </div>
      <style>{`@keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }`}</style>
    </div>
  )
}

function Hero() {
  return (
    <section className="relative h-[90vh] w-full bg-black">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/Gt5HUob8aGDxOUep/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-4">
        <div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl sm:text-6xl md:text-7xl font-semibold text-white tracking-tight">
            CTRL<span className="text-cyan-300">-Z</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className="mt-3 text-neutral-300 text-lg">
            Undo Limits. Define You.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="mt-8 flex items-center gap-4">
            <Link to="/shop"><GlitchCTA>Shop Now</GlitchCTA></Link>
            <a href="#story" className="text-neutral-300 hover:text-white inline-flex items-center gap-1">Learn more <ChevronRight className="w-4 h-4"/></a>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <Marquee />
      </div>
    </section>
  )
}

function ProductCard({ p }) {
  return (
    <motion.div whileHover={{ y: -4 }} className="group bg-[#0b0b0b] border border-white/10 rounded-xl overflow-hidden">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img src={p.images?.[0]} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_50%_120%,rgba(0,255,255,0.0),rgba(0,255,255,0.15))]" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-medium truncate">{p.name}</h3>
          <span className="text-cyan-300">${p.price}</span>
        </div>
        <p className="text-neutral-400 text-sm mt-1">{p.category}</p>
        <Link to={`/product/${p.id}`} className="inline-flex items-center gap-1 text-cyan-300 mt-3">View <ChevronRight className="w-4 h-4"/></Link>
      </div>
    </motion.div>
  )
}

function Shop() {
  const { fetchJson } = useApi()
  const [items, setItems] = useState([])
  const [filter, setFilter] = useState('All')
  useEffect(() => {
    fetchJson('/api/products').then(setItems).catch(() => setItems([]))
  }, [])

  const filtered = useMemo(() => {
    if (filter === 'All') return items
    return items.filter(i => i.category?.toLowerCase() === filter.toLowerCase())
  }, [items, filter])

  const cats = ['All', 'Men', 'Women', 'Unisex', 'Accessories']

  return (
    <main className="bg-black min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <h2 className="text-white text-2xl">Shop</h2>
          <div className="flex gap-2">
            {cats.map(c => (
              <button key={c} onClick={() => setFilter(c)} className={`px-3 py-1 rounded-full text-sm border ${filter===c? 'border-cyan-400 text-cyan-300':'border-white/10 text-neutral-300'} hover:border-cyan-400/70`}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {filtered.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      </div>
    </main>
  )
}

function About() {
  return (
    <main className="bg-black min-h-screen pt-24 text-neutral-300">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-white text-3xl">Rebellion, Creative Freedom, Individuality</h2>
        <p className="mt-4">CTRL-Z is a Gen Z streetwear lab. We explore the edges of tech and fashion—minimal silhouettes with glitch DNA.</p>
        <div id="story" className="mt-10 grid gap-6">
          {["2019 — Concept born in a dorm.", "2021 — First drop sells out in 48h.", "2023 — AR try-on beta.", "2025 — Global collective."]
            .map((t,i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i*0.1 }} className="border-l-2 border-cyan-400/50 pl-4">
                <p>{t}</p>
              </motion.div>
            ))}
        </div>
      </div>
    </main>
  )
}

function Contact() {
  return (
    <main className="bg-black min-h-screen pt-24 text-neutral-300">
      <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-white text-3xl">Z-BOT Support</h2>
          <p className="mt-2">Ask anything. The bot usually replies in 0.7s in our dreams.</p>
          <div className="mt-6 rounded-xl border border-white/10 p-4 bg-[#0b0b0b]">
            <div className="text-neutral-400 text-sm">Coming soon.</div>
          </div>
        </div>
        <div>
          <h3 className="text-white text-xl">Email us</h3>
          <form className="mt-4 grid gap-3">
            <input placeholder="Your email" className="bg-black border border-white/10 rounded px-3 py-2 text-white"/>
            <textarea placeholder="Message" rows={5} className="bg-black border border-white/10 rounded px-3 py-2 text-white"/>
            <GlitchCTA>Send</GlitchCTA>
          </form>
        </div>
      </div>
    </main>
  )
}

function Account() {
  const [tab, setTab] = useState('login')
  return (
    <main className="bg-black min-h-screen pt-24 text-neutral-300">
      <div className="max-w-md mx-auto px-4">
        <div className="flex gap-2 border border-white/10 rounded-lg p-1 bg-[#0b0b0b]">
          {['login','signup'].map(t => (
            <button key={t} onClick={()=>setTab(t)} className={`flex-1 py-2 rounded-md ${tab===t? 'bg-cyan-500/20 text-white':'text-neutral-300'}`}>{t.toUpperCase()}</button>
          ))}
        </div>
        <div className="mt-6">
          <form className="grid gap-3">
            <input placeholder="Email" className="bg-black border border-white/10 rounded px-3 py-2 text-white"/>
            <input placeholder="Password" type="password" className="bg-black border border-white/10 rounded px-3 py-2 text-white"/>
            <GlitchCTA>{tab==='login'?'Login':'Create Account'}</GlitchCTA>
          </form>
        </div>
      </div>
    </main>
  )
}

function Home() {
  const { fetchJson } = useApi()
  const [featured, setFeatured] = useState([])
  useEffect(() => { fetchJson('/api/products').then(setFeatured).catch(()=>{}) }, [])
  return (
    <main className="bg-black min-h-screen">
      <Hero />
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h3 className="text-white text-2xl">Featured Drops</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {featured.slice(0,3).map(p => <ProductCard key={p.id} p={p}/>)}
        </div>
      </section>
    </main>
  )
}

function Layout() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/account" element={<Account />} />
      </Routes>
      <footer className="border-t border-white/10 mt-24">
        <div className="max-w-7xl mx-auto px-4 py-10 text-neutral-400 text-sm flex flex-col md:flex-row gap-4 justify-between">
          <div>© {new Date().getFullYear()} CTRL-Z — Undo Limits.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}
