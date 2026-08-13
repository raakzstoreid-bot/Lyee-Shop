'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Filter, X, ShoppingCart, Check, Copy, Loader,
  Server, Zap, Shield, Users, Cloud, MessageSquare, Send,
  QrCode, Image, Wallet, Star, Tag, TrendingUp, ExternalLink,
  CreditCard
} from 'lucide-react'
import toast from 'react-hot-toast'
import { PRODUCTS, CATS, STORE } from '@/lib/config'
import type { Product } from '@/lib/config'

const iconMap: Record<string, React.ElementType> = { Server, Zap, Shield, Users, Cloud, MessageSquare, Send }

/* PRODUCT CARD */
export function ProductCard({ product, onSelect }: { product: Product; onSelect: (p: Product) => void }) {
  const Icon = iconMap[product.icon] || ShoppingCart
  const bc: Record<string, string> = {
    'Laris': 'from-orange-500 to-red-500',
    'Best': 'from-blue-500 to-purple-500',
    'New': 'from-green-500 to-emerald-500',
  }
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -6, scale: 1.02 }} className="group relative bg-card rounded-2xl border border-border overflow-hidden card-hover cursor-pointer" onClick={() => onSelect(product)}>
      {product.badge && <div className="absolute top-3 right-3 z-10"><span className={'inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ' + (bc[product.badge] || 'from-gray-500 to-gray-600') + ' shadow-lg'}><Star className="w-3 h-3"/><span>{product.badge}</span></span></div>}
      <div className="h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="p-6">
        <div className="flex items-start space-x-4 mb-4"><div className="p-3 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl group-hover:scale-110 transition-transform"><Icon className="w-7 h-7 text-blue-500"/></div><div className="flex-1 min-w-0"><h3 className="text-lg font-bold truncate">{product.name}</h3><p className="text-xs text-secondary mt-0.5">{product.category}</p></div></div>
        <div className="mb-4"><div className="flex items-baseline space-x-1"><span className="text-sm text-secondary">Rp</span><span className="text-2xl font-extrabold gradient-text">{product.price.toLocaleString()}</span></div></div>
        <div className="space-y-2 mb-5">{product.features.slice(0,3).map((f,i)=><div key={i} className="flex items-center text-sm"><div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center mr-2 flex-shrink-0"><Check className="w-3 h-3 text-green-500"/></div><span className="text-secondary truncate">{f}</span></div>)}</div>
        <button onClick={(e)=>{e.stopPropagation();onSelect(product)}} disabled={!product.available} className={'w-full py-3 rounded-xl font-semibold text-sm transition-all '+(product.available?'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 active:scale-95':'bg-input text-secondary cursor-not-allowed')}>{product.available?'Beli Sekarang':'Tidak Tersedia'}</button>
      </div>
    </motion.div>
  )
}

/* SEARCH & FILTER */
export function SearchFilter({ onSearch, onFilter, onSort }: { onSearch: (q: string) => void; onFilter: (c: string) => void; onSort: (s: string) => void }) {
  const [sq, setSq] = useState(''); const [sc, setSc] = useState(''); const [show, setShow] = useState(false)
  return <div className="space-y-4 mb-10">
    <div className="relative flex items-center bg-card border-2 border-border rounded-2xl overflow-hidden focus-within:border-blue-500/50 transition-all"><Search className="w-5 h-5 text-secondary ml-4 flex-shrink-0"/><input type="text" placeholder="Cari produk..." value={sq} onChange={e=>{setSq(e.target.value);onSearch(e.target.value)}} className="flex-1 px-3 py-3.5 bg-transparent text-sm"/><button onClick={()=>setShow(!show)} className={'p-3 mr-2 rounded-xl transition-all '+(show?'bg-blue-500 text-white':'hover:bg-input')}><Filter className="w-5 h-5"/></button></div>
    <AnimatePresence>{show && <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}} className="bg-card border border-border rounded-2xl p-6 space-y-5 overflow-hidden">
      <div><label className="flex items-center text-sm font-semibold mb-3"><Tag className="w-4 h-4 mr-2 text-blue-500"/>Kategori</label><div className="flex flex-wrap gap-2"><button onClick={()=>{setSc('');onFilter('')}} className={'px-4 py-2 rounded-xl text-sm font-medium transition-all '+(!sc?'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg':'bg-input hover:bg-border')}>Semua</button>{CATS.map(c=><button key={c} onClick={()=>{setSc(c);onFilter(c)}} className={'px-4 py-2 rounded-xl text-sm font-medium transition-all '+(sc===c?'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg':'bg-input hover:bg-border')}>{c}</button>)}</div></div>
      <div><label className="flex items-center text-sm font-semibold mb-3"><TrendingUp className="w-4 h-4 mr-2 text-blue-500"/>Urutkan</label><select onChange={e=>onSort(e.target.value)} className="w-full px-4 py-3 bg-input rounded-xl border-2 border-border focus:border-blue-500/50 transition-all"><option value="">Default</option><option value="lowest">Harga Terendah</option><option value="highest">Harga Tertinggi</option><option value="popular">Paling Populer</option></select></div>
    </motion.div>}</AnimatePresence>
  </div>
}

/* DISCOUNT INPUT */
export function DiscountInput({ onApply, onRemove, applied }: { onApply: (c: string) => void; onRemove: () => void; applied: any }) {
  const [code, setCode] = useState(''); const [loading, setLoading] = useState(false)
  return <div className="space-y-3"><label className="flex items-center text-sm font-semibold"><Tag className="w-4 h-4 mr-2 text-blue-500"/>Kode Diskon</label>
    {applied ? <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 rounded-2xl"><div className="flex items-center space-x-3"><div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center"><Check className="w-5 h-5 text-green-500"/></div><div><p className="font-semibold text-green-600">Diskon {applied.discountPercent}%</p><p className="text-xs text-secondary">Potongan Rp{applied.discountAmount?.toLocaleString()}</p></div></div><button onClick={onRemove} className="p-2 hover:bg-red-500/10 rounded-xl"><X className="w-5 h-5 text-red-500"/></button></div>
    : <div className="flex space-x-2"><input type="text" value={code} onChange={e=>setCode(e.target.value.toUpperCase())} placeholder="Masukkan kode promo" className="flex-1 px-4 py-3 bg-input border-2 border-border rounded-xl focus:border-blue-500/50 uppercase placeholder:normal-case"/><button onClick={()=>{setLoading(true);onApply(code);setTimeout(()=>setLoading(false),500)}} disabled={loading||!code} className="px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg disabled:opacity-50 transition-all">{loading?<Loader className="w-5 h-5 animate-spin"/>:'Pakai'}</button></div>}
  </div>
}

/* PAYMENT SELECTOR */
export function PaymentSelector({ selected, onSelect }: { selected: string; onSelect: (m: string) => void }) {
  const methods = [
    { id: 'qris_auto', name: 'QRIS Otomatis', desc: 'Via MyDuit Gateway', available: true, icon: CreditCard, color: 'from-blue-500 to-cyan-500' },
    { id: 'qris_manual', name: 'QRIS Manual', desc: 'Scan QR Manual', available: true, icon: Image, color: 'from-purple-500 to-pink-500' },
    { id: 'dana', name: 'DANA', desc: 'Transfer E-Wallet', available: true, icon: Wallet, color: 'from-blue-400 to-blue-600' },
  ]
  return <div className="space-y-3"><label className="flex items-center text-sm font-semibold"><Wallet className="w-4 h-4 mr-2 text-blue-500"/>Metode Pembayaran</label><div className="grid grid-cols-1 gap-2">
    {methods.map(m=>{const Icon=m.icon;const is=selected===m.id;return <button key={m.id} onClick={()=>m.available&&onSelect(m.id)} disabled={!m.available} className={'flex items-center p-4 rounded-2xl border-2 transition-all '+(is?'border-blue-500 bg-blue-500/5 shadow-lg shadow-blue-500/10':m.available?'border-border hover:border-blue-500/30 hover:bg-input/50':'border-border opacity-40 cursor-not-allowed')}><div className={'p-2.5 rounded-xl bg-gradient-to-r '+m.color+' text-white mr-4'}><Icon className="w-6 h-6"/></div><div className="text-left flex-1"><p className="font-semibold">{m.name}</p><p className="text-xs text-secondary">{m.desc}</p></div><div className={'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all '+(is?'border-blue-500 bg-blue-500':'border-border')}>{is&&<Check className="w-3 h-3 text-white"/>}</div></button>})}
  </div></div>
}

/* STATUS BADGE */
export function StatusBadge({ status }: { status: string }) {
  const m: Record<string,{l:string;c:string}> = { pending_payment:{l:'Menunggu Bayar',c:'bg-yellow-500/10 text-yellow-600 border-yellow-500/30'}, pending_verification:{l:'Verifikasi',c:'bg-blue-500/10 text-blue-600 border-blue-500/30'}, paid:{l:'Dibayar',c:'bg-green-500/10 text-green-600 border-green-500/30'}, processing:{l:'Diproses',c:'bg-purple-500/10 text-purple-600 border-purple-500/30'}, completed:{l:'Selesai',c:'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'}, cancelled:{l:'Batal',c:'bg-red-500/10 text-red-600 border-red-500/30'}, expired:{l:'Kedaluwarsa',c:'bg-gray-500/10 text-gray-600 border-gray-500/30'}, failed:{l:'Gagal',c:'bg-red-500/10 text-red-600 border-red-500/30'} }
  const x=m[status]||{l:status,c:'bg-gray-500/10 text-gray-600 border-gray-500/30'}
  return <span className={'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border '+x.c}>{x.l}</span>
}

/* COPY BUTTON */
export function CopyBtn({ text, label }: { text: string; label?: string }) {
  return <button onClick={()=>{navigator.clipboard.writeText(text);toast.success('Berhasil disalin!')}} className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-input hover:bg-border rounded-lg text-xs font-medium transition-all active:scale-95"><Copy className="w-3.5 h-3.5"/>{label&&<span>{label}</span>}</button>
}

/* MODAL */
export function Modal({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) {
  return <AnimatePresence>{isOpen && <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}><motion.div initial={{scale:0.9,opacity:0,y:20}} animate={{scale:1,opacity:1,y:0}} exit={{scale:0.9,opacity:0,y:20}} transition={{type:'spring',damping:25}} onClick={e=>e.stopPropagation()} className="bg-card rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-border">{children}</motion.div></motion.div>}</AnimatePresence>
}

/* QR AUTO - MyDuit Gateway */
export function QRAutoDisplay({ amount, orderId }: { amount: number; orderId: string }) {
  const [fs, setFs] = useState(false)
  return <>
    <div className="text-center">
      <p className="text-sm font-semibold mb-2">Pembayaran via MyDuit Gateway</p>
      <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl p-6 mb-4">
        <CreditCard className="w-16 h-16 text-blue-500 mx-auto mb-3" />
        <p className="text-xs text-secondary mb-3">QRIS Otomatis - Scan & Bayar</p>
        <div className="bg-white rounded-2xl p-4 inline-block cursor-pointer" onClick={()=>setFs(true)}>
          <QrCode className="w-40 h-40 text-black" />
          <p className="text-xs text-gray-500 mt-2">Tap untuk scan</p>
        </div>
      </div>
      <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
        <p className="text-xs text-secondary mb-1">Total Pembayaran</p>
        <p className="text-2xl font-extrabold gradient-text">Rp{amount.toLocaleString()}</p>
      </div>
      <p className="text-xs text-secondary mt-2">Order ID: <span className="font-mono font-bold">{orderId}</span></p>
    </div>
    <AnimatePresence>{fs && <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[100] flex items-center justify-center bg-black p-4" onClick={()=>setFs(false)}><button onClick={()=>setFs(false)} className="absolute top-4 right-4 p-3 bg-white/10 rounded-full"><X className="w-7 h-7 text-white"/></button><div className="bg-white rounded-3xl p-8"><QrCode className="w-64 h-64 text-black"/><p className="text-center text-black font-bold mt-4 text-xl">Rp{amount.toLocaleString()}</p></div></motion.div>}</AnimatePresence>
  </>
}

/* QR MANUAL - Gambar dari Catbox */
export function QRManualDisplay({ amount, orderId }: { amount: number; orderId: string }) {
  const [fs, setFs] = useState(false)
  return <>
    <div className="text-center">
      <p className="text-sm font-semibold mb-3">Scan QRIS Manual</p>
      <div className="relative inline-block cursor-pointer" onClick={()=>setFs(true)}>
        <img src={STORE.qris} alt="QRIS Manual" className="w-56 h-56 mx-auto rounded-2xl border-2 border-border shadow-lg" />
        <div className="absolute bottom-3 right-3 bg-black/60 p-2 rounded-xl"><ExternalLink className="w-4 h-4 text-white"/></div>
      </div>
      <p className="text-xs text-secondary mt-2">Tap untuk memperbesar</p>
      <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
        <p className="text-xs text-secondary mb-1">Total Pembayaran</p>
        <p className="text-2xl font-extrabold gradient-text">Rp{amount.toLocaleString()}</p>
      </div>
      <p className="text-xs text-secondary mt-2">Order ID: <span className="font-mono font-bold">{orderId}</span></p>
    </div>
    <AnimatePresence>{fs && <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[100] flex items-center justify-center bg-black p-4" onClick={()=>setFs(false)}><button onClick={()=>setFs(false)} className="absolute top-4 right-4 p-3 bg-white/10 rounded-full"><X className="w-7 h-7 text-white"/></button><motion.img initial={{scale:0.5}} animate={{scale:1}} exit={{scale:0.5}} src={STORE.qris} alt="QRIS Fullscreen" className="max-w-full max-h-[85vh] rounded-3xl shadow-2xl" onClick={e=>e.stopPropagation()}/><p className="absolute bottom-8 text-white text-center bg-black/50 px-6 py-3 rounded-2xl backdrop-blur"><span className="text-2xl font-bold">Rp{amount.toLocaleString()}</span><br/><span className="text-sm opacity-70">{orderId}</span></p></motion.div>}</AnimatePresence>
  </>
}
