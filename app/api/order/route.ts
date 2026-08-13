import { NextRequest, NextResponse } from 'next/server'
import { genOrderId, getProduct, getDiscount, calcDiscount, saveOrder, getOrder, validPhone, sanitize, createMyDuitInvoice } from '@/lib/server'

export async function POST(request: NextRequest) {
  try {
    const { productId, customerName, customerPhone, usernamePanel, notes, discountCode, paymentMethod } = await request.json()

    if (!productId || !customerName || !customerPhone || !paymentMethod) {
      return NextResponse.json({ success: false, error: { code: 'INVALID_INPUT', message: 'Data tidak lengkap.' } }, { status: 400 })
    }

    const sn = sanitize(customerName)
    const sp = customerPhone.replace(/[^0-9]/g, '')
    const su = usernamePanel ? sanitize(usernamePanel) : ''
    const snotes = notes ? sanitize(notes) : ''

    if (sn.length < 2 || sn.length > 100) {
      return NextResponse.json({ success: false, error: { code: 'INVALID_NAME', message: 'Nama 2-100 karakter.' } }, { status: 400 })
    }
    if (!validPhone(sp)) {
      return NextResponse.json({ success: false, error: { code: 'INVALID_PHONE', message: 'Nomor tidak valid.' } }, { status: 400 })
    }

    const product = getProduct(productId)
    if (!product || !product.available) {
      return NextResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'Produk tidak tersedia.' } }, { status: 404 })
    }
    if (product.requiresUsername && !su) {
      return NextResponse.json({ success: false, error: { code: 'USERNAME_REQUIRED', message: 'Username panel wajib diisi.' } }, { status: 400 })
    }

    // Harga
    let oa = product.price, dp = 0, da = 0, fa = oa, vdc: string | null = null

    if (discountCode) {
      const discount = getDiscount(discountCode.toUpperCase())
      if (discount) {
        vdc = discount.code; dp = discount.percent
        const calc = calcDiscount(oa, dp); da = calc.amount; fa = calc.final
        if (fa < 500) {
          return NextResponse.json({ success: false, error: { code: 'MIN_PAYMENT', message: 'Total di bawah minimum.' } }, { status: 400 })
        }
      } else {
        return NextResponse.json({ success: false, error: { code: 'INVALID_DISCOUNT', message: 'Kode diskon tidak valid.' } }, { status: 400 })
      }
    }

    const oid = genOrderId()

    // Buat invoice MyDuit untuk QRIS Otomatis
    let invoiceData: any = null
    if (paymentMethod === 'qris_auto') {
      invoiceData = await createMyDuitInvoice(fa, oid)
    }

    const orderData = {
      order_id: oid,
      product_id: product.id,
      product_name: product.name,
      product_category: product.category,
      customer_name: sn,
      customer_phone: sp,
      username_panel: su,
      notes: snotes,
      discount_code: vdc,
      discount_percent: dp,
      discount_amount: da,
      original_amount: oa,
      final_amount: fa,
      payment_method: paymentMethod,
      invoice_id: invoiceData?.invoice_id || null,
      invoice_data: invoiceData,
      payment_status: 'pending_payment',
      order_status: 'pending_payment',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      paid_at: null,
      completed_at: null,
    }

    const saved = saveOrder(orderData)

    return NextResponse.json({
      success: true,
      data: {
        order_id: saved.order_id,
        product_name: saved.product_name,
        original_amount: saved.original_amount,
        final_amount: saved.final_amount,
        discount_code: saved.discount_code,
        discount_percent: saved.discount_percent,
        discount_amount: saved.discount_amount,
        payment_method: saved.payment_method,
        invoice_id: saved.invoice_id,
        invoice_data: saved.invoice_data,
        payment_status: saved.payment_status,
        order_status: saved.order_status,
        created_at: saved.created_at,
      }
    })
  } catch {
    return NextResponse.json({ success: false, error: { code: 'SERVER_ERROR', message: 'Terjadi kesalahan.' } }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const oid = request.nextUrl.searchParams.get('orderId')
  if (!oid) {
    return NextResponse.json({ success: false, error: { code: 'INVALID_INPUT', message: 'Order ID diperlukan.' } }, { status: 400 })
  }
  const order = getOrder(oid.toUpperCase().trim())
  if (!order) {
    return NextResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'Pesanan tidak ditemukan.' } }, { status: 404 })
  }
  return NextResponse.json({
    success: true,
    data: {
      order_id: order.order_id,
      product_name: order.product_name,
      product_category: order.product_category,
      username_panel: order.username_panel,
      discount_code: order.discount_code,
      discount_percent: order.discount_percent,
      discount_amount: order.discount_amount,
      original_amount: order.original_amount,
      final_amount: order.final_amount,
      payment_method: order.payment_method,
      invoice_id: order.invoice_id,
      invoice_data: order.invoice_data,
      payment_status: order.payment_status,
      order_status: order.order_status,
      created_at: order.created_at,
      paid_at: order.paid_at,
      completed_at: order.completed_at,
    }
  })
}
