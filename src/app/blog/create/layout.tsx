import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function BlogCreateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-900 text-slate-100`}>
        {children}
      </body>
    </html>
  )
}