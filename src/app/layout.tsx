import AuthContext from '../contexts/AuthContext'
import { ThemeProvider } from '../contexts/ThemeContext'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Caddy UI - Reverse Proxy Manager',
  description: 'A beautiful web UI for managing Caddy reverse proxies',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </AuthContext>
      </body>
    </html>
  )
}
