import type { Metadata } from 'next'
import { Poppins, Work_Sans } from 'next/font/google'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import { siteConfig } from '@/config/site'

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700'],
})

const work_sans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: [
    {
      url: '/logo.png',
      href: '/logo.png',
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={cn('antialiased', work_sans.variable, poppins.variable)}>{children}</body>
    </html>
  )
}
