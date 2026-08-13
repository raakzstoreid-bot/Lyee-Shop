import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    return NextResponse.json({ success: true, message: 'Webhook received.' })
  } catch {
    return NextResponse.json({ success: false, error: { code: 'SERVER_ERROR', message: 'Error.' } }, { status: 500 })
  }
}
