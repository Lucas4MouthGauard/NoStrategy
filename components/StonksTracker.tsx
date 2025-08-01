'use client'

import React, { useState, useEffect } from 'react'
import { useWallet } from './SimpleWalletProvider'
import SimpleWalletButton from './SimpleWalletButton'

interface Token {
  symbol: string
  name: string
  value: number
  change24h: number
  icon: string
  price: number
  marketCap: number
  volume24h: number
}

const mockTokens: Token[] = [
  {
    symbol: "SOL",
    name: "Solana",
    value: 10000,
    change24h: 5.2,
    icon: "☀️",
    price: 150,
    marketCap: 65000000000,
    volume24h: 2000000000
  },
  {
    symbol: "BONK",
    name: "Bonk",
    value: 5000,
    change24h: -8.1,
    icon: "🐶",
    price: 0.00002,
    marketCap: 1200000000,
    volume24h: 300000000
  },
  {
    symbol: "WIF",
    name: "dogwifhat",
    value: 4200,
    change24h: 15.7,
    icon: "🐕",
    price: 3.5,
    marketCap: 3500000000,
    volume24h: 500000000
  },
  {
    symbol: "BOME",
    name: "BOOK OF MEME",
    value: 2000,
    change24h: -2.3,
    icon: "🐸",
    price: 0.01,
    marketCap: 600000000,
    volume24h: 150000000
  },
]

const StonksTracker = () => {
  const { publicKey, connected } = useWallet()
  const [walletData, setWalletData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [selectedToken, setSelectedToken] = useState<Token | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [connectionStep, setConnectionStep] = useState(0)

  const fetchWalletBalance = async () => {
    if (!publicKey) return

    setLoading(true)
    setConnectionStep(1)

    try {
      // 模拟获取钱包数据
      const mockBalance = Math.random() * 1000 + 100
      const totalValue = mockBalance * 100 + mockTokens.reduce((sum, token) => sum + token.value, 0)
      const totalChange = mockTokens.reduce((sum, token) => sum + token.change24h, 0) / mockTokens.length

      setConnectionStep(2)

      setWalletData({
        address: publicKey,
        balance: mockBalance,
        change24h: totalChange,
        totalValue: totalValue,
        totalChange: totalChange,
        tokens: mockTokens
      })

      setLoading(false)
      setConnectionStep(0)
    } catch (error) {
      console.error('Error fetching wallet data:', error)
      setLoading(false)
      setConnectionStep(0)
    }
  }

  // 当钱包连接时自动获取数据
  useEffect(() => {
    if (connected && publicKey) {
      fetchWalletBalance()
    }
  }, [connected, publicKey])

  const generateMemeReport = () => {
    if (!walletData) return

    const totalValue = walletData.tokens.reduce((sum: number, token: Token) => sum + token.value, 0)
    const avgChange = walletData.tokens.reduce((sum: number, token: Token) => sum + token.change24h, 0) / walletData.tokens.length

    let memeTitle = ""
    let memeEmoji = ""
    let memeDescription = ""

    if (avgChange > 10) {
      memeTitle = "🚀 暴富预警！"
      memeEmoji = "🌕"
      memeDescription = "你的策略简直是神来之笔，财富自由指日可待！"
    } else if (avgChange > 0) {
      memeTitle = "📈 稳健增长！"
      memeEmoji = "💰"
      memeDescription = "虽然不多，但至少没亏，这在币圈就是胜利！"
    } else if (avgChange > -10) {
      memeTitle = "📉 小幅回调！"
      memeEmoji = "💧"
      memeDescription = "别慌，这只是技术性调整，抄底的机会来了！"
    } else {
      memeTitle = "💀 归零警告！"
      memeEmoji = "👻"
      memeDescription = "恭喜你，成功实践了NoStrategy的精髓，感受到了真实的痛！"
    }

    return (
      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-6 border border-purple-500/30 text-center animate-fade-in">
        <h3 className="text-2xl font-bold text-white mb-3">{memeTitle} {memeEmoji}</h3>
        <p className="text-gray-300 text-lg">{memeDescription}</p>
        <p className="text-xl font-bold text-white mt-4">
          总资产: <span className="text-green-400">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </p>
        <p className={`text-xl font-bold ${avgChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          24小时变化: {avgChange >= 0 ? '+' : ''}{avgChange.toFixed(2)}%
        </p>
      </div>
    )
  }

  const getConnectionStepText = () => {
    switch (connectionStep) {
      case 1: return "🔍 检测钱包..."
      case 2: return "🔗 获取余额..."
      case 3: return "📊 分析数据..."
      default: return "🔗 连接钱包"
    }
  }

  const getConnectionStepIcon = () => {
    switch (connectionStep) {
      case 1: return "🔍"
      case 2: return "🔗"
      case 3: return "📊"
      default: return "🔗"
    }
  }

  const handleTokenClick = (token: Token) => {
    setSelectedToken(token)
    setShowDetails(true)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          📈 Stonks 追踪器
        </h2>
        <p className="text-gray-300 text-lg">
          连接你的SOL钱包，自动生成Meme报告
        </p>
      </div>

      {!connected ? (
        <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30">
          <div className="text-center space-y-6">
            <div className="text-6xl animate-bounce-slow">🔗</div>
            <h3 className="text-2xl font-bold text-white">
              连接你的钱包
            </h3>
            <p className="text-gray-400">
              支持 Phantom、Solflare 等主流钱包
            </p>

            {loading && (
              <p className="text-purple-400 text-lg animate-pulse">
                {getConnectionStepText()}
              </p>
            )}

            <div className="flex justify-center">
              <SimpleWalletButton className="wallet-button text-lg px-8 py-4" />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* 钱包概览 */}
          <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">
                {publicKey?.slice(0, 8)}...{publicKey?.slice(-8)}
              </span>
            </div>
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg p-4">
              <p className="text-gray-400 text-sm">总余额</p>
              <p className="text-2xl font-bold text-white">
                ${walletData?.balance?.toLocaleString() || '0'}
              </p>
            </div>
            <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-lg p-4">
              <p className="text-gray-400 text-sm">24小时变化</p>
              <p className={`text-2xl font-bold ${
                (walletData?.change24h || 0) >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {(walletData?.change24h || 0) >= 0 ? '+' : ''}{(walletData?.change24h || 0).toFixed(2)}%
              </p>
            </div>
            <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Token数量</p>
              <p className="text-2xl font-bold text-white">
                {walletData?.tokens?.length || 0}
              </p>
            </div>
          </div>

          {/* Meme报告 */}
          {walletData && generateMemeReport()}

          {/* Token列表 */}
          {walletData?.tokens && (
            <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
              <h3 className="text-xl font-bold text-white mb-4">Token 持仓</h3>
              <div className="space-y-3">
                {walletData.tokens.map((token: Token, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                    onClick={() => handleTokenClick(token)}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{token.icon}</span>
                      <div>
                        <p className="text-white font-semibold">{token.symbol}</p>
                        <p className="text-gray-400 text-sm">{token.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">${token.value.toLocaleString()}</p>
                      <p className={`text-sm ${token.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {token.change24h >= 0 ? '+' : ''}{token.change24h}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Token详情弹窗 */}
          {showDetails && selectedToken && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
              <div className="bg-gradient-to-br from-purple-900 to-black rounded-2xl p-8 border border-purple-500/50 max-w-md w-full relative">
                <button
                  onClick={() => setShowDetails(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
                >
                  &times;
                </button>
                <h3 className="text-3xl font-bold text-white mb-4 text-center flex items-center justify-center space-x-2">
                  <span>{selectedToken.icon}</span>
                  <span>{selectedToken.name} ({selectedToken.symbol})</span>
                </h3>
                <div className="space-y-3 text-lg text-gray-300">
                  <p><strong>价格:</strong> <span className="text-white">${selectedToken.price.toLocaleString()}</span></p>
                  <p><strong>24小时变化:</strong> <span className={`${selectedToken.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>{selectedToken.change24h >= 0 ? '+' : ''}{selectedToken.change24h}%</span></p>
                  <p><strong>市值:</strong> <span className="text-white">${selectedToken.marketCap.toLocaleString()}</span></p>
                  <p><strong>24小时交易量:</strong> <span className="text-white">${selectedToken.volume24h.toLocaleString()}</span></p>
                  <p><strong>你的持仓:</strong> <span className="text-white">${selectedToken.value.toLocaleString()}</span></p>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <button className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-center">
                    <div className="text-2xl mb-2">📈</div>
                    <div className="text-sm text-gray-300">查看图表</div>
                  </button>
                  <button
                    onClick={fetchWalletBalance}
                    className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-center"
                  >
                    <div className="text-2xl mb-2">🔄</div>
                    <div className="text-sm text-gray-300">刷新数据</div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default StonksTracker 