import Link from 'next/link'
import { MessageSquare, Send, Bot, Share2 } from 'lucide-react'
import { STORE } from '@/lib/config'

export default function Footer() {
  const wanum = STORE.whatsapp.replace(/[^0-9]/g, '')
  const wafinal = wanum.startsWith('0') ? '62' + wanum.substring(1) : wanum

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img src={STORE.logo} alt="Logo" className="h-10 w-10 rounded-xl" />
              <span className="font-bold text-lg gradient-text">{STORE.name}</span>
            </div>
            <p className="text-sm text-secondary leading-relaxed">Solusi lengkap kebutuhan hosting, panel, bot, VPS, domain dan produk digital Anda.</p>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-sm uppercase tracking-wider">Menu</h3>
            <ul className="space-y-2.5">
              <li><Link href="/" className="text-sm text-secondary hover:text-blue-500 transition-colors">Beranda</Link></li>
              <li><Link href="/catalog" className="text-sm text-secondary hover:text-blue-500 transition-colors">Katalog</Link></li>
              <li><Link href="/order" className="text-sm text-secondary hover:text-blue-500 transition-colors">Cek Pesanan</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-sm uppercase tracking-wider">Kontak</h3>
            <ul className="space-y-2.5">
              <li>
                <a href={'https://wa.me/' + wafinal} target="_blank" className="flex items-center space-x-2 text-sm text-secondary hover:text-green-500 transition-colors">
                  <MessageSquare className="w-4 h-4" /><span>WhatsApp</span>
                </a>
              </li>
              <li>
                <a href={'https://t.me/' + STORE.telegram.replace('@', '')} target="_blank" className="flex items-center space-x-2 text-sm text-secondary hover:text-blue-500 transition-colors">
                  <Send className="w-4 h-4" /><span>Telegram</span>
                </a>
              </li>
              <li>
                <a href={'https://t.me/' + STORE.telegramBot.replace('@', '')} target="_blank" className="flex items-center space-x-2 text-sm text-secondary hover:text-purple-500 transition-colors">
                  <Bot className="w-4 h-4" /><span>Telegram Bot</span>
                </a>
              </li>
              <li>
                <a href={STORE.whatsappChannel} target="_blank" className="flex items-center space-x-2 text-sm text-secondary hover:text-teal-500 transition-colors">
                  <Share2 className="w-4 h-4" /><span>Channel</span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-sm uppercase tracking-wider">Legal</h3>
            <ul className="space-y-2.5">
              <li><Link href="/" className="text-sm text-secondary hover:text-blue-500 transition-colors">Syarat & Ketentuan</Link></li>
              <li><Link href="/" className="text-sm text-secondary hover:text-blue-500 transition-colors">Kebijakan Privasi</Link></li>
              <li><Link href="/" className="text-sm text-secondary hover:text-blue-500 transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-border text-center text-sm text-secondary">
          <p>&copy; 2026 {STORE.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
