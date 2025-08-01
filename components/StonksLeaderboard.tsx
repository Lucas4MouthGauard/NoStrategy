'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface LeaderboardEntry {
  id: number
  username: string
  avatar: string
  strategy: string
  profit: number
  profitPercentage: number
  votes: number
  isLiked: boolean
}

const StonksLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([
    {
      id: 1,
      username: "CryptoWhale",
      avatar: "🐋",
      strategy: "梭哈SOL，信仰充值！",
      profit: 15420.50,
      profitPercentage: 245.3,
      votes: 1287,
      isLiked: false
    },
    {
      id: 2,
      username: "DiamondHands",
      avatar: "💎",
      strategy: "HODL到月球，永不卖出！",
      profit: 8750.25,
      profitPercentage: 187.6,
      votes: 956,
      isLiked: false
    },
    {
      id: 3,
      username: "RocketMan",
      avatar: "🚀",
      strategy: "感觉对了就买，错了就装死！",
      profit: 6320.80,
      profitPercentage: 156.8,
      votes: 743,
      isLiked: false
    },
    {
      id: 4,
      username: "LuckyGambler",
      avatar: "🎰",
      strategy: "随机买入，随机卖出！",
      profit: 4210.30,
      profitPercentage: 98.5,
      votes: 521,
      isLiked: false
    },
    {
      id: 5,
      username: "FOMOKing",
      avatar: "👑",
      strategy: "看到别人赚钱就FOMO！",
      profit: 3150.75,
      profitPercentage: 76.2,
      votes: 398,
      isLiked: false
    },
    {
      id: 6,
      username: "PaperHands",
      avatar: "📄",
      strategy: "涨一点就卖，跌一点就买！",
      profit: 2100.40,
      profitPercentage: 45.8,
      votes: 267,
      isLiked: false
    },
    {
      id: 7,
      username: "BagHolder",
      avatar: "👜",
      strategy: "买在高点，卖在低点！",
      profit: 1250.90,
      profitPercentage: 23.4,
      votes: 189,
      isLiked: false
    },
    {
      id: 8,
      username: "NoobTrader",
      avatar: "🤡",
      strategy: "完全不懂，全靠感觉！",
      profit: 850.60,
      profitPercentage: 12.7,
      votes: 145,
      isLiked: false
    }
  ])

  const [filter, setFilter] = useState<'profit' | 'votes'>('profit')

  const handleVote = (id: number) => {
    setLeaderboard(prev => prev.map(entry => {
      if (entry.id === id) {
        return {
          ...entry,
          votes: entry.isLiked ? entry.votes - 1 : entry.votes + 1,
          isLiked: !entry.isLiked
        }
      }
      return entry
    }))
  }

  const sortedLeaderboard = [...leaderboard].sort((a, b) => {
    if (filter === 'profit') {
      return b.profit - a.profit
    } else {
      return b.votes - a.votes
    }
  })

  const getRankBadge = (index: number) => {
    switch (index) {
      case 0: return '🥇'
      case 1: return '🥈'
      case 2: return '🥉'
      default: return `#${index + 1}`
    }
  }

  const getProfitColor = (profit: number) => {
    if (profit > 10000) return 'text-green-400'
    if (profit > 5000) return 'text-blue-400'
    if (profit > 1000) return 'text-yellow-400'
    return 'text-gray-400'
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold text-white mb-4">
          🏆 Stonks排行榜
        </h2>
        <p className="text-gray-300 text-lg">
          最赚钱/最离谱策略用户榜单，支持点赞、投票
        </p>
      </motion.div>

      {/* 筛选器 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex justify-center space-x-4"
      >
        <button
          onClick={() => setFilter('profit')}
          className={`px-6 py-3 rounded-lg transition-all duration-300 ${
            filter === 'profit'
              ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
              : 'bg-white/10 text-gray-300 hover:text-white'
          }`}
        >
          💰 按收益排序
        </button>
        <button
          onClick={() => setFilter('votes')}
          className={`px-6 py-3 rounded-lg transition-all duration-300 ${
            filter === 'votes'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
              : 'bg-white/10 text-gray-300 hover:text-white'
          }`}
        >
          👍 按点赞排序
        </button>
      </motion.div>

      {/* 排行榜 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30"
      >
        <div className="space-y-4">
          {sortedLeaderboard.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              {/* 排名 */}
              <div className="text-2xl font-bold text-yellow-400 min-w-[3rem]">
                {getRankBadge(index)}
              </div>

              {/* 头像 */}
              <div className="text-3xl">{entry.avatar}</div>

              {/* 用户信息 */}
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-white">{entry.username}</h3>
                  {index < 3 && (
                    <span className="text-xs bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full">
                      热门
                    </span>
                  )}
                </div>
                <p className="text-gray-400 text-sm">{entry.strategy}</p>
              </div>

              {/* 收益信息 */}
              <div className="text-right">
                <div className={`font-bold text-lg ${getProfitColor(entry.profit)}`}>
                  ${entry.profit.toLocaleString()}
                </div>
                <div className={`text-sm ${
                  entry.profitPercentage >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {entry.profitPercentage >= 0 ? '+' : ''}{entry.profitPercentage}%
                </div>
              </div>

              {/* 投票按钮 */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleVote(entry.id)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                    entry.isLiked
                      ? 'bg-red-500 text-white'
                      : 'bg-white/10 text-gray-300 hover:text-white'
                  }`}
                >
                  <span>{entry.isLiked ? '❤️' : '🤍'}</span>
                  <span className="text-sm">{entry.votes}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 统计信息 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-2xl p-6 border border-green-500/30 text-center">
          <div className="text-3xl font-bold text-green-400">
            ${leaderboard.reduce((sum, entry) => sum + entry.profit, 0).toLocaleString()}
          </div>
          <div className="text-gray-300">总收益</div>
        </div>

        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-6 border border-purple-500/30 text-center">
          <div className="text-3xl font-bold text-purple-400">
            {leaderboard.reduce((sum, entry) => sum + entry.votes, 0).toLocaleString()}
          </div>
          <div className="text-gray-300">总点赞数</div>
        </div>

        <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl p-6 border border-blue-500/30 text-center">
          <div className="text-3xl font-bold text-blue-400">
            {leaderboard.length}
          </div>
          <div className="text-gray-300">参与用户</div>
        </div>
      </motion.div>

      {/* 提交策略 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-2xl p-6 border border-yellow-500/30"
      >
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">🎯 提交你的策略</h3>
          <p className="text-gray-300">
            分享你的NoStrategy心得，让更多人看到你的"智慧"！
          </p>
          <button className="wallet-button">
            📝 提交策略
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default StonksLeaderboard 