'use client'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <Toaster position="top-center" toastOptions={{ style: { borderRadius: '14px', padding: '10px 16px', fontSize: '14px' } }} />
      {children}
    </ThemeProvider>
  )
}
