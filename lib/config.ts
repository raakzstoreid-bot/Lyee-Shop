export const STORE = {
  name: 'Lyeepedia Shop',
  whatsapp: '082218343405',
  telegram: '@LyeepediaID',
  telegramBot: '@Lyeepedia_Bot',
  whatsappChannel: 'https://whatsapp.com/channel/0029Vb86XOLGehEHo1tx5v30',
  logo: 'https://files.catbox.moe/lmkkol.png',
  qris: 'https://files.catbox.moe/yof8sx.jpg',
  dana: '082231042760',
}

export interface Product {
  id: string; slug: string; name: string; category: string
  price: number; description: string; features: string[]
  available: boolean; badge?: string; requiresUsername: boolean; icon: string
}

export const PRODUCTS: Product[] = [
  // Panel Pterodactyl
  { id: 'p1', slug: 'panel-1gb', name: 'Paket 1GB', category: 'Panel Pterodactyl', price: 1000, description: 'Panel Hosting Bot/Game', features: ['1 GB RAM', 'CPU 30%', 'Full Garansi'], available: true, requiresUsername: true, icon: 'Server' },
  { id: 'p2', slug: 'panel-2gb', name: 'Paket 2GB', category: 'Panel Pterodactyl', price: 2000, description: 'Panel Hosting Bot/Game', features: ['2 GB RAM', 'CPU 60%', 'Full Garansi'], available: true, requiresUsername: true, icon: 'Server' },
  { id: 'p3', slug: 'panel-3gb', name: 'Paket 3GB', category: 'Panel Pterodactyl', price: 3000, description: 'Panel Hosting Bot/Game', features: ['3 GB RAM', 'CPU 90%', 'Full Garansi'], available: true, requiresUsername: true, icon: 'Server' },
  { id: 'p4', slug: 'panel-4gb', name: 'Paket 4GB', category: 'Panel Pterodactyl', price: 4000, description: 'Panel Hosting Bot/Game', features: ['4 GB RAM', 'CPU 120%', 'Full Garansi'], available: true, badge: 'Laris', requiresUsername: true, icon: 'Server' },
  { id: 'p5', slug: 'panel-5gb', name: 'Paket 5GB', category: 'Panel Pterodactyl', price: 5000, description: 'Panel Hosting Bot/Game', features: ['5 GB RAM', 'CPU 150%', 'Full Garansi'], available: true, requiresUsername: true, icon: 'Server' },
  { id: 'p6', slug: 'panel-6gb', name: 'Paket 6GB', category: 'Panel Pterodactyl', price: 6000, description: 'Panel Hosting Bot/Game', features: ['6 GB RAM', 'CPU 180%', 'Full Garansi'], available: true, requiresUsername: true, icon: 'Server' },
  { id: 'p7', slug: 'panel-7gb', name: 'Paket 7GB', category: 'Panel Pterodactyl', price: 7000, description: 'Panel Hosting Bot/Game', features: ['7 GB RAM', 'CPU 210%', 'Full Garansi'], available: true, requiresUsername: true, icon: 'Server' },
  { id: 'p8', slug: 'panel-8gb', name: 'Paket 8GB', category: 'Panel Pterodactyl', price: 8000, description: 'Panel Hosting Bot/Game', features: ['8 GB RAM', 'CPU 240%', 'Full Garansi'], available: true, requiresUsername: true, icon: 'Server' },
  { id: 'p9', slug: 'panel-9gb', name: 'Paket 9GB', category: 'Panel Pterodactyl', price: 9000, description: 'Panel Hosting Bot/Game', features: ['9 GB RAM', 'CPU 270%', 'Full Garansi'], available: true, requiresUsername: true, icon: 'Server' },
  { id: 'p10', slug: 'panel-10gb', name: 'Paket 10GB', category: 'Panel Pterodactyl', price: 10000, description: 'Panel Hosting Bot/Game', features: ['10 GB RAM', 'CPU 300%', 'Full Garansi'], available: false, requiresUsername: false, icon: 'Server' },
  { id: 'pu', slug: 'panel-unlimited', name: 'Paket Unlimited', category: 'Panel Pterodactyl', price: 12000, description: 'Resource maksimal', features: ['Unlimited RAM', 'Unmetered CPU'], available: true, badge: 'Best', requiresUsername: true, icon: 'Zap' },
  { id: 'pr', slug: 'reseller', name: 'Reseller Panel', category: 'Panel Pterodactyl', price: 15000, description: 'Jual kembali panel', features: ['Kelola User', 'Resource Besar'], available: true, requiresUsername: true, icon: 'Users' },
  { id: 'pa', slug: 'admin', name: 'Admin Panel', category: 'Panel Pterodactyl', price: 25000, description: 'Akses penuh', features: ['Node & Nest', 'Kontrol Total'], available: true, requiresUsername: true, icon: 'Shield' },

  // Script Bot WhatsApp
  { id: 'sw1', slug: 'bot-multi-device', name: 'Bot Multi Device', category: 'Script Bot WhatsApp', price: 45000, description: 'Bot WhatsApp Multi Device', features: ['Support Multi Device', 'Anti Delay Sistem', 'Full Source Code'], available: true, requiresUsername: false, icon: 'MessageSquare' },
  { id: 'sw2', slug: 'bot-rpg', name: 'Bot RPG (Game)', category: 'Script Bot WhatsApp', price: 55000, description: 'Bot WhatsApp RPG Game', features: ['Fitur Leveling & Ekonomi', 'Petualangan & Inventory', 'Full Database'], available: true, requiresUsername: false, icon: 'MessageSquare' },
  { id: 'sw3', slug: 'bot-jaga-group', name: 'Bot Jaga Group & Push', category: 'Script Bot WhatsApp', price: 35000, description: 'Bot WhatsApp Jaga Group', features: ['Auto Welcome/Leave', 'Push Kontak Cepat', 'Anti Link / Spam'], available: true, requiresUsername: false, icon: 'MessageSquare' },
  { id: 'sw4', slug: 'bot-convert', name: 'Bot Convert & Downloader', category: 'Script Bot WhatsApp', price: 40000, description: 'Bot WhatsApp Converter', features: ['Tiktok/IG/YT Downloader', 'Auto Image to Sticker', 'HD Image Convert'], available: true, requiresUsername: false, icon: 'MessageSquare' },
  { id: 'sw5', slug: 'bot-ai', name: 'Bot Auto AI', category: 'Script Bot WhatsApp', price: 50000, description: 'Bot WhatsApp AI', features: ['Integrasi ChatGPT / Gemini', 'AI Image Generator', 'Respons Cerdas & Alami'], available: true, requiresUsername: false, icon: 'MessageSquare' },
  { id: 'sw6', slug: 'bot-paygate', name: 'Bot Auto Order PayGate', category: 'Script Bot WhatsApp', price: 80000, description: 'Bot WhatsApp Payment Gateway', features: ['Auto Create Panel / Akun', 'Integrasi QRIS & E-Wallet', 'Sistem Saldo Member'], available: true, badge: 'Best', requiresUsername: false, icon: 'MessageSquare' },

  // VPS
  { id: 'v1', slug: 'vps-1', name: 'VPS Starter', category: 'VPS', price: 50000, description: 'VPS kecil', features: ['1 Core', '1 GB RAM', '20 GB SSD'], available: true, requiresUsername: true, icon: 'Cloud' },
  { id: 'v2', slug: 'vps-2', name: 'VPS Standard', category: 'VPS', price: 100000, description: 'VPS menengah', features: ['2 Core', '2 GB RAM', '40 GB SSD'], available: true, requiresUsername: true, icon: 'Cloud' },
]

export const DISCOUNTS = [
  { code: 'SUBS-LYEEPEDIA', percent: 10, active: true },
  { code: 'AYO-LYEEPED555', percent: 20, active: false },
  { code: 'LYEEPED-30OFF', percent: 30, active: false },
  { code: 'LYEEPED-40OFF', percent: 40, active: false },
  { code: 'LYEEPED-50OFF', percent: 50, active: false },
  { code: 'LYEEPED-60OFF', percent: 60, active: false },
  { code: 'LYEEPED-70OFF', percent: 70, active: false },
  { code: 'LYEEPED-80OFF', percent: 80, active: false },
  { code: 'LYEEPED-90OFF', percent: 90, active: false },
]

export const CATS = ['Panel Pterodactyl', 'Script Bot WhatsApp', 'Jasa Hosting']

export const FAQ = [
  { q: 'Bagaimana cara membeli?', a: 'Pilih produk dari katalog, klik Beli Sekarang, isi data, pilih pembayaran, dan selesaikan pembayaran.' },
  { q: 'Bagaimana pembayaran QRIS?', a: 'Scan QR code yang muncul di halaman pembayaran menggunakan aplikasi pembayaran Anda.' },
  { q: 'Bagaimana pembayaran DANA?', a: 'Transfer ke nomor DANA yang tertera, lalu konfirmasi via WhatsApp.' },
  { q: 'Berapa lama proses?', a: '1-24 jam setelah pembayaran diverifikasi.' },
  { q: 'Bagaimana cara cek pesanan?', a: 'Gunakan menu Cek Pesanan dan masukkan Order ID Anda.' },
]
