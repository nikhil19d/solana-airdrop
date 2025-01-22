import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      <title>Solana Airdrop</title>
      </head>
      <body className={`${inter.className} bg-gray-900 text-gray-100`}>
          {children}
      </body>
    </html>
  )
}

