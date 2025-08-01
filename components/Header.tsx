'use client'

import React from 'react'
import { useWallet } from './SimpleWalletProvider'
import SimpleWalletButton from './SimpleWalletButton'

const Header = () => {
  const { connected } = useWallet()

  return (
    <header className="bg-black/80 backdrop-blur-md border-b border-purple-500/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">🚀</div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                NoStrategy
              </h1>
              <p className="text-xs text-gray-400">嘲讽微策略的Meme网站</p>
            </div>
          </div>

          <div className="hidden md:block text-center">
            <p className="text-lg font-semibold text-yellow-400 animate-pulse">
              "策略是骗人的，感觉才是真实的！"
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {connected && (
              <div className="text-sm text-green-400">
                ✅ 已连接
              </div>
            )}
            <SimpleWalletButton className="wallet-button" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 