'use client'

import React, { useState } from 'react'
import Header from '../components/Header'

import NotAChart from '../components/NotAChart'
import MemeGenerator from '../components/MemeGenerator'
import StrategyRoulette from '../components/StrategyRoulette'
import MarketSentimentAnalyzer from '../components/MarketSentimentAnalyzer'
import ChatRoom from '../components/ChatRoom'
import RealTimePrices from '../components/RealTimePrices'
import Footer from '../components/Footer'

export default function Home() {
  const [activeSection, setActiveSection] = useState('prices')

  const sections = [
    { id: 'prices', name: 'Real-time Prices', icon: '💰' },
    { id: 'chart', name: 'Abstract Chart', icon: '📊' },
    { id: 'sentiment', name: 'Market Sentiment', icon: '😨' },
    { id: 'meme', name: 'Meme Generator', icon: '🎭' },
    { id: 'chat', name: 'Chat Room', icon: '💬' },
    { id: 'roulette', name: 'Strategy Roulette', icon: '🎰' },
  ]

  const renderSection = () => {
    switch (activeSection) {
      case 'prices':
        return <RealTimePrices />
      case 'chart':
        return <NotAChart />
      case 'sentiment':
        return <MarketSentimentAnalyzer />
      case 'meme':
        return <MemeGenerator />
      case 'chat':
        return <ChatRoom />
      case 'roulette':
        return <StrategyRoulette />
      default:
        return <RealTimePrices />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-nostrategy-dark via-purple-900 to-black">
      <Header />
      
      {/* Navigation Menu */}
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

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-fade-in">
          {renderSection()}
        </div>
      </main>

      <Footer />
    </div>
  )
} 