'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Loader, MessageSquare, Package, Clock, CheckCircle, Copy } from 'lucide-react'
import toast from 'react-hot-toast'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { StatusBadge } from '@/components/Store'
import { STORE } from '@/lib/config'

export default function OrderPage() {
  const [oid, setOid] = useState('')
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const formatWA = (num: string) => {
    let c = num.replace(/[^0-9]/g, '')
    if (c.startsWith('0')) c = '62' + c.substring(1)
    else if (c.startsWith('8')) c = '62' + c
    return c
  }

  const handleSearch = async () => {
    if (!oid.trim()) {
      toast.error('Masukkan Order ID')
      return
    }
    setLoading(true)
    setError('')
    setOrder(null)
    try {
      const r = await fetch('/api/order?orderId=' + encodeURIComponent(oid.toUpperCase().trim()))
      const d = await r.json()
      if (d.success && d.data) {
        setOrder(d.data)
        toast.success('Pesanan ditemukan')
      } else {
        setError('Pesanan tidak ditemukan. Periksa kembali Order ID Anda.')
        toast.error('Pesanan tidak ditemukan')
      }
    } catch {
      setError('Gagal menghubungi server. Periksa koneksi internet Anda.')
      toast.error('Gagal mencari pesanan')
    }
    setLoading(false)
  }

  const handleCopy = (t: string) => {
    navigator.clipboard.writeText(t)
    toast.success('Disalin')
  }

  const steps = [
    { label: 'Pesanan Dibuat', done: true },
    { label: 'Menunggu Pembayaran', done: ['pending_payment','pending_verification','paid','processing','completed'].includes(order?.order_status) },
    { label: 'Pembayaran Berhasil', done: ['paid','processing','completed'].includes(order?.order_status) },
    { label: 'Pesanan Diproses', done: ['processing','completed'].includes(order?.order_status) },
    { label: 'Pesanan Selesai', done: order?.order_status === 'completed' },
  ]

  const waNum = formatWA(STORE.whatsapp)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-bold mb-2">Cek Pesanan</h1>
            <p className="text-secondary mb-8">Masukkan Order ID untuk melacak status pesanan Anda.</p>

            {/* Search */}
            <div className="bg-card border-2 border-border rounded-2xl p-6 mb-8">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={oid}
                  onChange={e => setOid(e.target.value.toUpperCase())}
                  placeholder="LYP-20260812-XXXX"
                  className="flex-1 px-4 py-3.5 bg-input rounded-xl border-2 border-border focus:border-blue-500/50 font-mono text-lg tracking-wider text-center"
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                />
                <button
                  onClick={handleSearch}
                  disabled={loading}
                  className="px-6 py-3.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold hover:shadow-lg disabled:opacity-50 transition-all flex items-center justify-center space-x-2"
                >
                  {loading ? <Loader className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                  <span>{loading ? 'Mencari...' : 'Cari'}</span>
                </button>
              </div>
            </div>

            {/* Error */}
            {error && !loading && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center mb-8">
                <p className="text-red-500 font-medium">{error}</p>
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div className="text-center py-12">
                <Loader className="w-10 h-10 animate-spin text-blue-500 mx-auto mb-4" />
                <p className="text-secondary">Mencari pesanan...</p>
              </div>
            )}

            {/* Result */}
            {order && !loading && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-lg">{order.product_name}</h2>
                    <StatusBadge status={order.order_status} />
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-secondary">Order ID</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-bold">{order.order_id}</span>
                        <button onClick={() => handleCopy(order.order_id)} className="p-1.5 hover:bg-input rounded-lg transition-colors" title="Salin Order ID">
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-secondary">Harga</span>
                      <span>Rp{order.original_amount?.toLocaleString()}</span>
                    </div>
                    {order.discount_code && (
                      <div className="flex justify-between py-2 border-b border-border text-green-500">
                        <span>Diskon ({order.discount_percent}%)</span>
                        <span>-Rp{order.discount_amount?.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-2 font-bold text-lg">
                      <span>Total</span>
                      <span className="gradient-text">Rp{order.final_amount?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-2 border-t border-border">
                      <span className="text-secondary">Metode</span>
                      <span className="font-medium">{order.payment_method === 'qris_auto' ? 'QRIS Otomatis (MyDuit)' : order.payment_method === 'qris_manual' ? 'QRIS Manual' : order.payment_method === 'dana' ? 'DANA' : order.payment_method}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-secondary">Tanggal</span>
                      <span>{new Date(order.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="font-bold mb-6">Status Pesanan</h3>
                  <div className="space-y-0">
                    {steps.map((step, i) => (
                      <div key={i} className="flex">
                        <div className="flex flex-col items-center mr-4">
                          <div className={'w-10 h-10 rounded-full flex items-center justify-center ' + (step.done ? 'bg-green-500 text-white shadow-lg' : 'bg-input')}>
                            {step.done ? <CheckCircle className="w-5 h-5" /> : <Clock className="w-5 h-5 text-secondary" />}
                          </div>
                          {i < steps.length - 1 && (
                            <div className={'w-0.5 h-10 ' + (steps[i + 1].done ? 'bg-green-500' : 'bg-border')} />
                          )}
                        </div>
                        <div className="pb-8 pt-1">
                          <p className={'font-semibold ' + (step.done ? 'text-foreground' : 'text-secondary')}>{step.label}</p>
                          {step.done && <p className="text-xs text-green-500 mt-0.5">Selesai</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href={'https://wa.me/' + waNum + '?text=' + encodeURIComponent('Halo, saya ingin konfirmasi pesanan ' + order.order_id)}
                  target="_blank"
                  className="flex items-center justify-center w-full py-3.5 bg-green-500 text-white rounded-2xl font-bold hover:bg-green-600 transition-all space-x-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Konfirmasi via WhatsApp</span>
                </a>
              </motion.div>
            )}

            {/* Empty state */}
            {!order && !loading && !error && (
              <div className="text-center py-16">
                <div className="w-20 h-20 rounded-full bg-input flex items-center justify-center mx-auto mb-4">
                  <Package className="w-10 h-10 text-secondary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Cek Status Pesanan</h3>
                <p className="text-secondary text-sm">Masukkan Order ID Anda untuk melihat detail dan status pesanan.</p>
              </div>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
