'use client'

import React, { useState } from 'react'
import Header from '../components/Header'
import StonksTracker from '../components/StonksTracker'
import NotAChart from '../components/NotAChart'
import MemeGenerator from '../components/MemeGenerator'
import StrategyRoulette from '../components/StrategyRoulette'
import StonksLeaderboard from '../components/StonksLeaderboard'
import MarketSentimentAnalyzer from '../components/MarketSentimentAnalyzer'
import NFTCreator from '../components/NFTCreator'
import ChatRoom from '../components/ChatRoom'
import Footer from '../components/Footer'

export default function Home() {
  const [activeSection, setActiveSection] = useState('stonks')

  const sections = [
    { id: 'stonks', name: 'Stonks追踪', icon: '📈' },
    { id: 'chart', name: '抽象图表', icon: '📊' },
    { id: 'sentiment', name: '情绪分析', icon: '😨' },
    { id: 'meme', name: 'Meme生成器', icon: '🎭' },
    { id: 'nft', name: 'NFT创建器', icon: '🎨' },
    { id: 'chat', name: '聊天室', icon: '💬' },
    { id: 'roulette', name: '策略轮盘', icon: '🎰' },
    { id: 'leaderboard', name: '排行榜', icon: '🏆' },
  ]

  const renderSection = () => {
    switch (activeSection) {
      case 'stonks':
        return <StonksTracker />
      case 'chart':
        return <NotAChart />
      case 'sentiment':
        return <MarketSentimentAnalyzer />
      case 'meme':
        return <MemeGenerator />
      case 'nft':
        return <NFTCreator />
      case 'chat':
        return <ChatRoom />
      case 'roulette':
        return <StrategyRoulette />
      case 'leaderboard':
        return <StonksLeaderboard />
      default:
        return <StonksTracker />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-nostrategy-dark via-purple-900 to-black">
      <Header />
      
      {/* 导航菜单 */}
      <nav className="bg-black/50 backdrop-blur-sm border-b border-purple-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto py-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-xl">{section.icon}</span>
                <span className="font-semibold">{section.name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* 主内容区域 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-fade-in">
          {renderSection()}
        </div>
      </main>

      <Footer />
    </div>
  )
} 