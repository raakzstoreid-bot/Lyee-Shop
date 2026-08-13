'use client'
import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ShoppingCart, Package } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ProductCard, SearchFilter } from '@/components/Store'
import { PRODUCTS } from '@/lib/config'
import type { Product } from '@/lib/config'

export default function CatalogPage() {
  const router = useRouter()
  const [sq, setSq] = useState('')
  const [sc, setSc] = useState('')
  const [ss, setSs] = useState('')

  const filtered = useMemo(() => {
    let r = PRODUCTS
    if (sq) { const q = sq.toLowerCase(); r = r.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)) }
    if (sc) r = r.filter(p => p.category === sc)
    if (ss === 'lowest') r = [...r].sort((a, b) => a.price - b.price)
    if (ss === 'highest') r = [...r].sort((a, b) => b.price - a.price)
    if (ss === 'popular') r = [...r].sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0))
    return r
  }, [sq, sc, ss])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
              <Package className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-blue-500">Katalog Produk</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">Pilih Layanan <span className="gradient-text">Terbaik</span> Anda</h1>
            <p className="text-secondary max-w-xl mx-auto">Temukan berbagai produk digital berkualitas dengan harga terjangkau.</p>
          </motion.div>
          <SearchFilter onSearch={setSq} onFilter={setSc} onSort={setSs} />
          {filtered.length > 0 ? (
            <>
              <p className="text-sm text-secondary mb-6">Menampilkan <span className="font-bold text-foreground">{filtered.length}</span> produk</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filtered.map((p, i) => (
                  <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <ProductCard product={p} onSelect={(p: Product) => router.push('/checkout?product=' + p.id)} />
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <div className="w-24 h-24 rounded-full bg-input flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="w-10 h-10 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Produk Tidak Ditemukan</h3>
              <p className="text-secondary">Coba kata kunci atau filter yang berbeda.</p>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
