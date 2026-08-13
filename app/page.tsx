'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Zap, Shield, HeadphonesIcon, CreditCard, Search, ShoppingCart, ArrowRight, Package, Users, Sparkles } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { STORE, FAQ } from '@/lib/config'

export default function Home() {
  const benefits = [
    { icon: Zap, title: 'Proses Cepat', desc: 'Sistem otomatis dan terstruktur untuk pengalaman terbaik.', color: 'from-yellow-500 to-orange-500' },
    { icon: Package, title: 'Produk Lengkap', desc: 'Panel, Bot, VPS, Hosting, Domain dan jasa IT.', color: 'from-blue-500 to-cyan-500' },
    { icon: Shield, title: 'Garansi Produk', desc: 'Garansi sesuai ketentuan untuk ketenangan Anda.', color: 'from-green-500 to-emerald-500' },
    { icon: HeadphonesIcon, title: 'Support', desc: 'Hubungi via WhatsApp dan Telegram kapan saja.', color: 'from-purple-500 to-pink-500' },
    { icon: CreditCard, title: 'Bayar Fleksibel', desc: 'QRIS Otomatis, Manual dan DANA tersedia.', color: 'from-pink-500 to-rose-500' },
    { icon: Search, title: 'Order Tracking', desc: 'Cek status pesanan real-time dengan Order ID.', color: 'from-indigo-500 to-blue-500' },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" style={{ animation: 'float 6s ease-in-out infinite' }} />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" style={{ animation: 'float 6s ease-in-out 2s infinite' }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-blue-500">#1 Digital Store Indonesia</span>
            </motion.div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              <span className="gradient-text">Sistem Otomatisasi</span><br />
              <span className="text-foreground">100% Aktif 24/7</span>
            </h1>
            <p className="text-xl sm:text-2xl text-secondary mb-4 font-medium">Semua Kebutuhan Hosting & Digital Dalam Satu Tempat</p>
            <p className="text-base text-secondary/70 mb-10 max-w-2xl mx-auto leading-relaxed">Nikmati layanan hosting, server, bot, produk digital, dan jasa IT dengan harga bersahabat dan proses yang praktis.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/catalog" className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:scale-105">
                <ShoppingCart className="w-5 h-5 mr-2" />Lihat Katalog<ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/order" className="inline-flex items-center justify-center px-8 py-4 bg-card border-2 border-border rounded-2xl font-bold text-lg hover:border-blue-500/50 transition-all hover:scale-105">
                <Search className="w-5 h-5 mr-2" />Cek Pesanan
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Kenapa Pilih <span className="gradient-text">Lyeepedia Shop</span>?</h2>
            <p className="text-secondary max-w-2xl mx-auto">Kami hadir dengan layanan digital terlengkap untuk kebutuhan Anda.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group bg-card border border-border rounded-2xl p-6 card-hover">
                <div className={'p-3 rounded-xl bg-gradient-to-r ' + b.color + ' text-white inline-block mb-4 shadow-lg group-hover:scale-110 transition-transform'}>
                  <b.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">{b.title}</h3>
                <p className="text-sm text-secondary leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Pertanyaan Umum</h2>
          </motion.div>
          <div className="space-y-4">
            {FAQ.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="bg-card border border-border rounded-2xl p-6 hover:border-blue-500/30 transition-all">
                <h3 className="font-bold mb-2">{f.q}</h3>
                <p className="text-sm text-secondary">{f.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-card/30 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl p-10 sm:p-16 shadow-2xl shadow-blue-500/30">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Siap Memulai?</h2>
            <p className="text-white/80 text-lg mb-8">Pilih layanan terbaik untuk kebutuhan digital Anda.</p>
            <Link href="/catalog" className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-xl">
              Lihat Katalog Sekarang<ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
