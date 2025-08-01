'use client'

import React, { useState, useEffect } from 'react'
import { useWallet } from './SimpleWalletProvider'
import SimpleWalletButton from './SimpleWalletButton'

interface SentimentData {
  fearGreedIndex: number
  marketMood: string
  volatility: number
  momentum: number
  socialSentiment: number
  newsSentiment: number
  overallScore: number
  recommendation: string
  riskLevel: 'low' | 'medium' | 'high' | 'extreme'
  confidence: number
}

interface TokenSentiment {
  symbol: string
  name: string
  sentiment: number
  volume: number
  priceChange: number
  socialMentions: number
  newsCount: number
  trend: 'bullish' | 'bearish' | 'neutral'
}

const MarketSentimentAnalyzer = () => {
  const { publicKey, connected } = useWallet()
  const [sentimentData, setSentimentData] = useState<SentimentData | null>(null)
  const [tokenSentiments, setTokenSentiments] = useState<TokenSentiment[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h')
  const [showDetails, setShowDetails] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'tokens' | 'news' | 'social'>('overview')

  // 模拟市场情绪数据
  const generateSentimentData = (): SentimentData => {
    const fearGreedIndex = Math.floor(Math.random() * 100)
    const volatility = Math.random() * 100
    const momentum = Math.random() * 200 - 100
    const socialSentiment = Math.random() * 100
    const newsSentiment = Math.random() * 100
    
    const overallScore = (fearGreedIndex + socialSentiment + newsSentiment) / 3
    const confidence = Math.random() * 100

    let marketMood = '中性'
    let recommendation = '观望'
    let riskLevel: 'low' | 'medium' | 'high' | 'extreme' = 'medium'

    if (overallScore > 70) {
      marketMood = '极度贪婪'
      recommendation = '小心泡沫，考虑减仓'
      riskLevel = 'extreme'
    } else if (overallScore > 55) {
      marketMood = '贪婪'
      recommendation = '市场乐观，但需谨慎'
      riskLevel = 'high'
    } else if (overallScore > 45) {
      marketMood = '中性'
      recommendation = '市场平衡，适合定投'
      riskLevel = 'medium'
    } else if (overallScore > 30) {
      marketMood = '恐惧'
      recommendation = '市场恐慌，可能是机会'
      riskLevel = 'medium'
    } else {
      marketMood = '极度恐惧'
      recommendation = '极度恐慌，考虑抄底'
      riskLevel = 'low'
    }

    return {
      fearGreedIndex,
      marketMood,
      volatility,
      momentum,
      socialSentiment,
      newsSentiment,
      overallScore,
      recommendation,
      riskLevel,
      confidence
    }
  }

  // 模拟代币情绪数据
  const generateTokenSentiments = (): TokenSentiment[] => {
    const tokens = [
      { symbol: 'SOL', name: 'Solana' },
      { symbol: 'BONK', name: 'Bonk' },
      { symbol: 'WIF', name: 'dogwifhat' },
      { symbol: 'BOME', name: 'BOOK OF MEME' },
      { symbol: 'JUP', name: 'Jupiter' },
      { symbol: 'RAY', name: 'Raydium' }
    ]

    return tokens.map(token => {
      const sentiment = Math.random() * 100
      const volume = Math.random() * 1000000
      const priceChange = Math.random() * 200 - 100
      const socialMentions = Math.floor(Math.random() * 10000)
      const newsCount = Math.floor(Math.random() * 100)
      
      let trend: 'bullish' | 'bearish' | 'neutral' = 'neutral'
      if (sentiment > 60 && priceChange > 0) trend = 'bullish'
      else if (sentiment < 40 && priceChange < 0) trend = 'bearish'

      return {
        ...token,
        sentiment,
        volume,
        priceChange,
        socialMentions,
        newsCount,
        trend
      }
    })
  }

  const fetchSentimentData = async () => {
    setLoading(true)
    
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const sentiment = generateSentimentData()
    const tokens = generateTokenSentiments()
    
    setSentimentData(sentiment)
    setTokenSentiments(tokens)
    setLoading(false)
  }

  useEffect(() => {
    if (connected) {
      fetchSentimentData()
    }
  }, [connected, selectedTimeframe])

  const getSentimentColor = (score: number) => {
    if (score > 70) return 'text-red-500'
    if (score > 55) return 'text-orange-500'
    if (score > 45) return 'text-yellow-500'
    if (score > 30) return 'text-blue-500'
    return 'text-green-500'
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-500'
      case 'medium': return 'text-yellow-500'
      case 'high': return 'text-orange-500'
      case 'extreme': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'bullish': return '🚀'
      case 'bearish': return '📉'
      default: return '➡️'
    }
  }

  if (!connected) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 text-center">
          <div className="text-6xl mb-4">📊</div>
          <h2 className="text-2xl font-bold text-white mb-4">市场情绪分析器</h2>
          <p className="text-gray-300 mb-6">连接钱包以获取实时市场情绪分析</p>
          <SimpleWalletButton />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* 标题和连接状态 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">📊 市场情绪分析器</h1>
          <p className="text-gray-300">实时分析加密货币市场情绪，预测市场走势</p>
        </div>
        <SimpleWalletButton />
      </div>

      {/* 时间框架选择 */}
      <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 mb-6">
        <div className="flex space-x-2">
          {['1h', '4h', '24h', '7d'].map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedTimeframe === timeframe
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {timeframe}
            </button>
          ))}
        </div>
      </div>

      {/* 标签页导航 */}
      <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 mb-6">
        <div className="flex space-x-4">
          {[
            { id: 'overview', name: '市场概览', icon: '📊' },
            { id: 'tokens', name: '代币分析', icon: '🪙' },
            { id: 'news', name: '新闻情绪', icon: '📰' },
            { id: 'social', name: '社交媒体', icon: '📱' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 text-center">
          <div className="animate-spin text-4xl mb-4">🔄</div>
          <p className="text-gray-300">正在分析市场情绪...</p>
        </div>
      ) : (
        <>
          {/* 市场概览 */}
          {activeTab === 'overview' && sentimentData && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* 恐惧贪婪指数 */}
              <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">😨 恐惧贪婪指数</h3>
                <div className="text-center">
                  <div className={`text-6xl font-bold mb-2 ${getSentimentColor(sentimentData.fearGreedIndex)}`}>
                    {sentimentData.fearGreedIndex}
                  </div>
                  <div className="text-2xl font-semibold text-white mb-2">{sentimentData.marketMood}</div>
                  <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
                    <div 
                      className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 h-4 rounded-full transition-all duration-1000"
                      style={{ width: `${sentimentData.fearGreedIndex}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-300">{sentimentData.recommendation}</p>
                </div>
              </div>

              {/* 综合指标 */}
              <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">📈 综合指标</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">整体评分</span>
                    <span className={`font-bold ${getSentimentColor(sentimentData.overallScore)}`}>
                      {sentimentData.overallScore.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">波动性</span>
                    <span className="font-bold text-orange-500">{sentimentData.volatility.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">动量</span>
                    <span className={`font-bold ${sentimentData.momentum > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {sentimentData.momentum > 0 ? '+' : ''}{sentimentData.momentum.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">风险等级</span>
                    <span className={`font-bold ${getRiskColor(sentimentData.riskLevel)}`}>
                      {sentimentData.riskLevel.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">置信度</span>
                    <span className="font-bold text-blue-500">{sentimentData.confidence.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 代币分析 */}
          {activeTab === 'tokens' && (
            <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">🪙 代币情绪分析</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 text-gray-300">代币</th>
                      <th className="text-left py-3 text-gray-300">情绪评分</th>
                      <th className="text-left py-3 text-gray-300">价格变化</th>
                      <th className="text-left py-3 text-gray-300">成交量</th>
                      <th className="text-left py-3 text-gray-300">社交提及</th>
                      <th className="text-left py-3 text-gray-300">趋势</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tokenSentiments.map((token, index) => (
                      <tr key={token.symbol} className="border-b border-gray-800 hover:bg-white/5">
                        <td className="py-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{token.symbol === 'SOL' ? '☀️' : '🪙'}</span>
                            <div>
                              <div className="font-semibold text-white">{token.symbol}</div>
                              <div className="text-sm text-gray-400">{token.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          <div className={`font-bold ${getSentimentColor(token.sentiment)}`}>
                            {token.sentiment.toFixed(1)}
                          </div>
                        </td>
                        <td className="py-3">
                          <div className={`font-bold ${token.priceChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {token.priceChange > 0 ? '+' : ''}{token.priceChange.toFixed(2)}%
                          </div>
                        </td>
                        <td className="py-3 text-gray-300">
                          ${(token.volume / 1000000).toFixed(1)}M
                        </td>
                        <td className="py-3 text-gray-300">
                          {token.socialMentions.toLocaleString()}
                        </td>
                        <td className="py-3">
                          <div className="flex items-center space-x-1">
                            <span className="text-lg">{getTrendIcon(token.trend)}</span>
                            <span className="text-gray-300 capitalize">{token.trend}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 新闻情绪 */}
          {activeTab === 'news' && (
            <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">📰 新闻情绪分析</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black/30 rounded-xl p-4">
                  <h4 className="font-semibold text-white mb-2">新闻情绪评分</h4>
                  <div className={`text-3xl font-bold mb-2 ${getSentimentColor(sentimentData?.newsSentiment || 0)}`}>
                    {sentimentData?.newsSentiment.toFixed(1)}
                  </div>
                  <p className="text-gray-300 text-sm">基于最近24小时新闻分析</p>
                </div>
                <div className="bg-black/30 rounded-xl p-4">
                  <h4 className="font-semibold text-white mb-2">热门新闻</h4>
                  <div className="space-y-2">
                    {[
                      'Solana生态快速发展，DeFi项目激增',
                      '比特币ETF资金流入创历史新高',
                      '监管机构对加密货币态度趋严',
                      '机构投资者加速布局Web3'
                    ].map((news, index) => (
                      <div key={index} className="text-sm text-gray-300 border-l-2 border-purple-500 pl-2">
                        {news}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 社交媒体 */}
          {activeTab === 'social' && (
            <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">📱 社交媒体情绪</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black/30 rounded-xl p-4">
                  <h4 className="font-semibold text-white mb-2">社交情绪评分</h4>
                  <div className={`text-3xl font-bold mb-2 ${getSentimentColor(sentimentData?.socialSentiment || 0)}`}>
                    {sentimentData?.socialSentiment.toFixed(1)}
                  </div>
                  <p className="text-gray-300 text-sm">基于Twitter、Reddit等平台分析</p>
                </div>
                <div className="bg-black/30 rounded-xl p-4">
                  <h4 className="font-semibold text-white mb-2">热门话题</h4>
                  <div className="space-y-2">
                    {[
                      '#Solana #SOL',
                      '#Bitcoin #BTC',
                      '#MemeCoins',
                      '#DeFi #Web3'
                    ].map((topic, index) => (
                      <div key={index} className="text-sm text-blue-400">
                        {topic}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 刷新按钮 */}
          <div className="text-center mt-6">
            <button
              onClick={fetchSentimentData}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              🔄 刷新数据
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default MarketSentimentAnalyzer 