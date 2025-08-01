import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SimpleWalletProvider from '../components/SimpleWalletProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NoStrategy - 嘲讽微策略的Meme网站',
  description: 'NoStrategy - 一个专门嘲讽微策略的meme网站，让散户找到共鸣！',
  keywords: 'NoStrategy, meme, 微策略, 加密货币, 散户',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <SimpleWalletProvider>
          {children}
        </SimpleWalletProvider>
      </body>
    </html>
  )
} 