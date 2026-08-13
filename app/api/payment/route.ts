import { NextRequest, NextResponse } from 'next/server'
import { getOrder, checkMyDuitStatus, updateOrder } from '@/lib/server'

export async function GET(request: NextRequest) {
  const oid = request.nextUrl.searchParams.get('orderId')
  if (!oid) {
    return NextResponse.json({ success: false, error: { code: 'INVALID_INPUT', message: 'Order ID diperlukan.' } }, { status: 400 })
  }

  const order = getOrder(oid.toUpperCase().trim())
  if (!order) {
    return NextResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'Pesanan tidak ditemukan.' } }, { status: 404 })
  }

  // Cek status MyDuit kalau ada invoice
  let myduitStatus = null
  if (order.invoice_id) {
    myduitStatus = await checkMyDuitStatus(order.invoice_id)
    // Update status kalau sudah paid
    if (myduitStatus?.status === 'paid' && order.payment_status !== 'paid') {
      updateOrder(order.order_id, {
        payment_status: 'paid',
        order_status: 'processing',
        paid_at: new Date().toISOString(),
      })
    }
  }

  return NextResponse.json({
    success: true,
    data: {
      payment_status: order.payment_status,
      order_status: order.order_status,
      myduit: myduitStatus,
    }
  })
}
