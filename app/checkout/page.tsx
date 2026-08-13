'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ArrowLeft, Loader, Check, MessageSquare, ExternalLink } from 'lucide-react'
import toast from 'react-hot-toast'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { DiscountInput, PaymentSelector, Modal, QRManualDisplay, CopyBtn } from '@/components/Store'
import { PRODUCTS, STORE } from '@/lib/config'

function CheckoutContent() {
  const sp = useSearchParams(); const router = useRouter(); const pid = sp.get('product')
  const [product, setProduct] = useState<any>(null)
  const [name, setName] = useState(''); const [phone, setPhone] = useState('')
  const [username, setUsername] = useState(''); const [notes, setNotes] = useState('')
  const [discount, setDiscount] = useState<any>(null); const [dc, setDc] = useState('')
  const [pm, setPm] = useState('qris_auto')
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [showPay, setShowPay] = useState(false)

  const formatWA = (num: string) => { let c = num.replace(/[^0-9]/g, ''); if (c.startsWith('0')) c = '62' + c.substring(1); else if (c.startsWith('8')) c = '62' + c; return c }

  useEffect(() => { if (pid) { const p = PRODUCTS.find(x => x.id === pid); if (p) setProduct(p); else router.push('/catalog') } else router.push('/catalog') }, [pid])

  const handleDiscount = async (code: string) => {
    try {
      const r = await fetch('/api/discount', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ productId: pid, discountCode: code }) })
      const d = await r.json()
      if (d.success) { setDiscount(d.data); setDc(code); toast.success('Diskon diterapkan!') }
      else toast.error(d.error?.message || 'Kode tidak valid')
    } catch { toast.error('Gagal') }
  }

  const handleSubmit = async () => {
    if (!name || !phone) { toast.error('Nama dan nomor WA wajib diisi'); return }
    setLoading(true)
    try {
      const r = await fetch('/api/order', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ productId: pid, customerName: name, customerPhone: phone, usernamePanel: username, notes, discountCode: dc || null, paymentMethod: pm }) })
      const d = await r.json()
      if (d.success) { setOrder(d.data); setShowPay(true); toast.success('Pesanan berhasil dibuat!') }
      else toast.error(d.error?.message || 'Gagal')
    } catch { toast.error('Error server') }
    setLoading(false)
  }

  const waLink = (text: string) => { return 'https://wa.me/' + formatWA(STORE.whatsapp) + '?text=' + encodeURIComponent(text) }
  const op = product?.price || 0; const fp = discount?.finalPrice || op; const da = discount?.discountAmount || 0

  if (!product) return <div className="min-h-screen flex items-center justify-center"><Loader className="w-8 h-8 animate-spin"/></div>

  return <div className="min-h-screen bg-background"><Navbar/>
    <main className="pt-24 pb-16"><div className="max-w-2xl mx-auto px-4">
      <button onClick={()=>router.back()} className="flex items-center text-secondary hover:text-foreground mb-8"><ArrowLeft className="w-4 h-4 mr-2"/>Kembali</button>
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="bg-card border border-border rounded-2xl p-6 mb-6"><h2 className="font-bold text-lg mb-3">{product.name}</h2><p className="text-sm text-secondary mb-2">{product.category}</p><ul className="space-y-1">{product.features.map((f:string,i:number)=><li key={i} className="text-sm flex items-center"><Check className="w-3 h-3 text-green-500 mr-2"/>{f}</li>)}</ul></div>

      <div className="bg-card border border-border rounded-2xl p-6 mb-6 space-y-4"><h2 className="font-bold text-lg">Data Customer</h2>
        <div><label className="text-sm mb-1 block font-medium">Nama *</label><input type="text" placeholder="Nama lengkap" value={name} onChange={e=>setName(e.target.value)} className="w-full px-4 py-3 bg-input rounded-xl border-2 border-border focus:border-blue-500/50 transition-all"/></div>
        <div><label className="text-sm mb-1 block font-medium">WhatsApp *</label><input type="tel" placeholder="082218343405" value={phone} onChange={e=>setPhone(e.target.value.replace(/[^0-9]/g,''))} className="w-full px-4 py-3 bg-input rounded-xl border-2 border-border focus:border-blue-500/50 transition-all"/></div>
        {product.requiresUsername && <div><label className="text-sm mb-1 block font-medium">Username Panel *</label><input type="text" placeholder="Username panel" value={username} onChange={e=>setUsername(e.target.value)} className="w-full px-4 py-3 bg-input rounded-xl border-2 border-border focus:border-blue-500/50 transition-all"/></div>}
        <div><label className="text-sm mb-1 block font-medium">Catatan</label><textarea placeholder="Tambahkan catatan..." value={notes} onChange={e=>setNotes(e.target.value)} rows={3} className="w-full px-4 py-3 bg-input rounded-xl border-2 border-border focus:border-blue-500/50 transition-all resize-none"/></div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 mb-6"><DiscountInput onApply={handleDiscount} onRemove={()=>{setDiscount(null);setDc('')}} applied={discount}/></div>
      <div className="bg-card border border-border rounded-2xl p-6 mb-6"><PaymentSelector selected={pm} onSelect={setPm}/></div>

      <div className="bg-card border border-border rounded-2xl p-6 mb-6"><h2 className="font-bold text-lg mb-4">Ringkasan Pesanan</h2><div className="space-y-2 text-sm"><div className="flex justify-between"><span className="text-secondary">Harga</span><span>Rp{op.toLocaleString()}</span></div>{discount&&<div className="flex justify-between text-green-500"><span>Diskon ({discount.discountPercent}%)</span><span>-Rp{da.toLocaleString()}</span></div>}<div className="border-t pt-2 flex justify-between font-bold text-lg"><span>Total</span><span className="gradient-text">Rp{fp.toLocaleString()}</span></div></div></div>

      <button onClick={handleSubmit} disabled={loading} className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-blue-500/30 disabled:opacity-50 transition-all active:scale-95">{loading?<Loader className="w-6 h-6 animate-spin mx-auto"/>:'Buat Pesanan'}</button>

      {showPay&&order&&<Modal isOpen={showPay} onClose={()=>setShowPay(false)}><div className="p-6">
        <div className="text-center mb-6"><div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-3"><Check className="w-8 h-8 text-green-500"/></div><h2 className="text-xl font-bold">Pesanan Berhasil!</h2><p className="text-sm text-secondary">Silakan lakukan pembayaran</p></div>

        {/* QRIS AUTO - MyDuit */}
        {pm==='qris_auto' && <div className="text-center mb-6">
          <p className="text-sm font-semibold mb-3">QRIS Otomatis via MyDuit</p>
          {order.invoice_data?.qris_image ? (
            <div className="bg-white rounded-2xl p-4 inline-block mb-4 shadow-lg">
              <img src={order.invoice_data.qris_image} alt="QRIS MyDuit" className="w-56 h-56 mx-auto" />
              <p className="text-xs text-gray-500 mt-2">Scan QR di atas untuk membayar</p>
            </div>
          ) : (
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-6 mb-4">
              <p className="text-sm text-yellow-600">QR Code sedang dimuat...</p>
              <p className="text-xs text-secondary mt-2">Atau gunakan link pembayaran:</p>
              {order.invoice_data?.payment_link && (
                <a href={order.invoice_data.payment_link} target="_blank" className="text-blue-500 text-sm underline mt-1 inline-block">
                  Buka Link Pembayaran <ExternalLink className="w-3 h-3 inline" />
                </a>
              )}
            </div>
          )}
          {order.invoice_data && (
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl mb-4">
              <p className="text-xs text-secondary">Invoice ID: <span className="font-mono font-bold">{order.invoice_id}</span></p>
              <p className="text-xs text-secondary">Total: <span className="font-bold">Rp{order.invoice_data.total?.toLocaleString() || fp.toLocaleString()}</span></p>
              <p className="text-xs text-secondary">Expired: <span className="font-bold">{order.invoice_data.expired_at || '-'}</span></p>
            </div>
          )}
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4 text-left text-xs">
            <p className="font-semibold mb-2">Instruksi:</p>
            <ol className="list-decimal pl-4 space-y-1 text-secondary">
              <li>Scan QR code di atas via aplikasi pembayaran</li>
              <li>Pastikan nominal sesuai</li>
              <li>Pembayaran terverifikasi otomatis oleh MyDuit</li>
              <li>Klik tombol konfirmasi di bawah setelah bayar</li>
            </ol>
          </div>
        </div>}

        {/* QRIS MANUAL - Catbox */}
        {pm==='qris_manual' && <div className="mb-6"><QRManualDisplay amount={fp} orderId={order.order_id}/><div className="mt-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4 text-left text-xs"><p className="font-semibold mb-2">Instruksi:</p><ol className="list-decimal pl-4 space-y-1 text-secondary"><li>Scan QR code di atas</li><li>Masukkan nominal: <b>Rp{fp.toLocaleString()}</b></li><li>Selesaikan pembayaran</li><li>Klik tombol konfirmasi di bawah</li></ol></div></div>}

        {/* DANA */}
        {pm==='dana' && <div className="text-center mb-6"><div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-6 mb-4"><p className="text-sm text-secondary mb-2">Transfer ke DANA</p><p className="text-3xl font-bold font-mono mb-3">{STORE.dana}</p><CopyBtn text={STORE.dana} label="Salin Nomor"/></div><div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl mb-4"><p className="text-xs text-secondary mb-1">Nominal Transfer</p><p className="text-2xl font-extrabold gradient-text">Rp{fp.toLocaleString()}</p></div><CopyBtn text={fp.toString()} label="Salin Nominal"/></div>}

        <div className="space-y-2 mt-6">
          <a href={waLink('Halo, saya sudah melakukan pembayaran.\n\nOrder ID: '+order.order_id+'\nProduk: '+order.product_name+'\nTotal: Rp'+fp.toLocaleString()+'\nMetode: '+(pm==='qris_auto'?'QRIS Otomatis (MyDuit)':pm==='qris_manual'?'QRIS Manual':'DANA')+'\n\nMohon diproses. Terima kasih.')} target="_blank" className="flex items-center justify-center w-full py-3.5 bg-green-500 text-white rounded-2xl font-bold hover:bg-green-600 transition-all"><MessageSquare className="w-5 h-5 mr-2"/>{pm==='dana'?'Saya Sudah Transfer':'Saya Sudah Bayar'}</a>
          <button onClick={()=>router.push('/order?orderId='+order.order_id)} className="w-full py-3.5 bg-blue-500 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all">Cek Status Pesanan</button>
          <button onClick={()=>{setShowPay(false);router.push('/catalog')}} className="w-full py-3 bg-input rounded-2xl font-medium">Kembali ke Katalog</button>
        </div>
      </div></Modal>}
    </div></main>
    <Footer/>
  </div>
}

export default function CheckoutPage() {
  return <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader className="w-8 h-8 animate-spin"/></div>}><CheckoutContent/></Suspense>
}
