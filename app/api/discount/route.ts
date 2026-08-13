import { NextRequest, NextResponse } from 'next/server'
import { getProduct, getDiscount, calcDiscount } from '@/lib/server'

export async function POST(request: NextRequest) {
  try {
    const { productId, discountCode } = await request.json()
    if (!productId || !discountCode) {
      return NextResponse.json({ success: false, error: { code: 'INVALID_INPUT', message: 'Data tidak lengkap.' } }, { status: 400 })
    }
    const product = getProduct(productId)
    if (!product) {
      return NextResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'Produk tidak ditemukan.' } }, { status: 404 })
    }
    const discount = getDiscount(discountCode.toUpperCase())
    if (!discount) {
      return NextResponse.json({ success: false, error: { code: 'INVALID_DISCOUNT', message: 'Kode diskon tidak valid.' } }, { status: 400 })
    }
    const { amount, final } = calcDiscount(product.price, discount.percent)
    if (final < 500) {
      return NextResponse.json({ success: false, error: { code: 'MIN_PAYMENT', message: 'Total di bawah minimum transaksi.' } }, { status: 400 })
    }
    return NextResponse.json({
      success: true,
      data: { valid: true, discountPercent: discount.percent, discountAmount: amount, originalPrice: product.price, finalPrice: final }
    })
  } catch {
    return NextResponse.json({ success: false, error: { code: 'SERVER_ERROR', message: 'Terjadi kesalahan.' } }, { status: 500 })
  }
}
