import { PRODUCTS, DISCOUNTS } from './config'
import crypto from 'crypto'

const orders = new Map()
const MYDUIT_API = 'https://app.nevapedia.com/api'
const MYDUIT_APIKEY = 'SKY_2f6f3e0b62f94ebf'

export function genOrderId(): string {
  const d = new Date()
  const ds = d.toISOString().split('T')[0].replace(/-/g, '')
  const r = crypto.randomBytes(2).toString('hex').toUpperCase()
  return 'LYP-' + ds + '-' + r
}

export function getProduct(id: string) {
  return PRODUCTS.find(p => p.id === id) || null
}

export function getDiscount(code: string) {
  return DISCOUNTS.find(d => d.code === code && d.active) || null
}

export function calcDiscount(price: number, pct: number) {
  const a = Math.floor(price * pct / 100)
  return { amount: a, final: price - a }
}

export function saveOrder(o: any) {
  orders.set(o.order_id, o)
  return o
}

export function getOrder(id: string) {
  return orders.get(id) || null
}

export function updateOrder(id: string, u: any) {
  const o = orders.get(id)
  if (!o) return null
  const up = { ...o, ...u, updated_at: new Date().toISOString() }
  orders.set(id, up)
  return up
}

export function validPhone(p: string): boolean {
  return /^[0-9]{10,13}$/.test(p.replace(/[\s\-\+]/g, ''))
}

export function sanitize(s: string): string {
  return s.replace(/[<>{}]/g, '').trim()
}

// MyDuit - Buat Invoice QRIS
export async function createMyDuitInvoice(amount: number, orderId: string): Promise<any> {
  try {
    const url = `${MYDUIT_API}/invoice?apikey=${MYDUIT_APIKEY}&amount=${amount}`
    const r = await fetch(url)
    const d = await r.json()
    if (d.success) {
      return {
        success: true,
        invoice_id: d.invoice_id,
        amount: d.amount,
        fee: d.fee,
        total: d.total,
        qris_image: d.qris_image,
        payment_link: d.payment_link,
        expired_at: d.expired_at,
      }
    }
    return { success: false, error: 'Gagal membuat invoice MyDuit' }
  } catch (e) {
    console.error('MyDuit invoice error:', e)
    return { success: false, error: 'Gagal terhubung ke MyDuit' }
  }
}

// MyDuit - Cek Status Invoice
export async function checkMyDuitStatus(invoiceId: string): Promise<any> {
  try {
    const url = `${MYDUIT_API}/invoice/status?apikey=${MYDUIT_APIKEY}&invoice_id=${invoiceId}`
    const r = await fetch(url)
    const d = await r.json()
    return d
  } catch (e) {
    console.error('MyDuit status error:', e)
    return { status: 'error' }
  }
}
