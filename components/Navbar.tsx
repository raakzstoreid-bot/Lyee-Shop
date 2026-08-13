'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Menu, X, Sun, Moon, Home, Package, ClipboardList, MessageCircle, Send } from 'lucide-react'
import { STORE } from '@/lib/config'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [sc, setSc] = useState(false)
  const { theme, setTheme } = useTheme()
  const [m, setM] = useState(false)

  useEffect(() => {
    setM(true)
    const h = () => setSc(window.scrollY > 20)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  if (!m) return null

  const nav = [
    { href: '/', label: 'Beranda', icon: Home },
    { href: '/catalog', label: 'Katalog', icon: Package },
    { href: '/order', label: 'Cek Pesanan', icon: ClipboardList },
  ]

  // Format nomor WA: 082218343405 -> 6282218343405
  const wanum = STORE.whatsapp.replace(/[^0-9]/g, '')
  const wafinal = wanum.startsWith('0') ? '62' + wanum.substring(1) : wanum
  const wa = 'https://wa.me/' + wafinal
  const tg = 'https://t.me/' + STORE.telegram.replace('@', '')

  return (
    <nav className={'fixed top-0 w-full z-50 transition-all duration-500 ' + (sc ? 'glass shadow-lg' : '')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3 group">
            <img src={STORE.logo} alt="Logo" className="h-10 w-10 rounded-xl shadow-lg group-hover:scale-105 transition-transform" />
            <span className="font-bold text-lg gradient-text">{STORE.name}</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {nav.map(l => (
              <Link key={l.href} href={l.href} className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-sm font-medium hover:bg-input transition-all hover:scale-105">
                <l.icon className="w-4 h-4" />
                <span>{l.label}</span>
              </Link>
            ))}
            <div className="w-px h-6 bg-border mx-2" />
            <a href={wa} target="_blank" className="p-2.5 rounded-xl hover:bg-green-500/10 hover:text-green-500 transition-all" title="WhatsApp">
              <MessageCircle className="w-5 h-5" />
            </a>
            <a href={tg} target="_blank" className="p-2.5 rounded-xl hover:bg-blue-500/10 hover:text-blue-500 transition-all" title="Telegram">
              <Send className="w-5 h-5" />
            </a>
            <div className="w-px h-6 bg-border mx-2" />
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2.5 rounded-xl hover:bg-input transition-all">
              {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-blue-600" />}
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-1">
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2">
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={() => setOpen(!open)} className="p-2">
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden glass border-t border-border">
          <div className="px-4 py-4 space-y-2">
            {nav.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-input">
                <l.icon className="w-5 h-5" />
                <span className="font-medium">{l.label}</span>
              </Link>
            ))}
            <div className="pt-2 border-t border-border">
              <a href={wa} target="_blank" className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-green-500/10 text-green-500 font-medium">
                <MessageCircle className="w-5 h-5" />
                <span>Chat WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
