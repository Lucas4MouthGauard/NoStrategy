'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useWallet } from './SimpleWalletProvider'
import SimpleWalletButton from './SimpleWalletButton'

interface ChatMessage {
  id: string
  user: string
  avatar: string
  message: string
  timestamp: number
  type: 'text' | 'meme' | 'strategy' | 'chart'
  imageUrl?: string
  likes: number
  isLiked: boolean
}

interface ChatRoom {
  id: string
  name: string
  emoji: string
  description: string
  userCount: number
  messages: ChatMessage[]
}

const ChatRoom = () => {
  const { publicKey, connected } = useWallet()
  const [message, setMessage] = useState('')
  const [selectedRoom, setSelectedRoom] = useState('general')
  const [activeTab, setActiveTab] = useState<'chat' | 'rooms' | 'trending'>('chat')
  const [isTyping, setIsTyping] = useState(false)
  const [onlineUsers, setOnlineUsers] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([
    {
      id: 'general',
      name: '通用讨论',
      emoji: '💬',
      description: '一般性讨论和闲聊',
      userCount: 156,
      messages: []
    },
    {
      id: 'strategy',
      name: '策略分享',
      emoji: '📈',
      description: '分享投资策略和心得',
      userCount: 89,
      messages: []
    },
    {
      id: 'meme',
      name: 'Meme分享',
      emoji: '🎭',
      description: '分享有趣的Meme',
      userCount: 234,
      messages: []
    },
    {
      id: 'charts',
      name: '图表分析',
      emoji: '📊',
      description: '讨论技术分析和图表',
      userCount: 67,
      messages: []
    },
    {
      id: 'news',
      name: '新闻资讯',
      emoji: '📰',
      description: '加密货币新闻和资讯',
      userCount: 123,
      messages: []
    }
  ])

  // 模拟用户头像
  const userAvatars = ['🐕', '🐸', '🚀', '💎', '🔥', '⭐', '🌙', '⚡', '🎯', '🏆']

  // 模拟消息数据
  const mockMessages: ChatMessage[] = [
    {
      id: '1',
      user: 'DogeMaster',
      avatar: '🐕',
      message: '今天SOL又涨了！🚀',
      timestamp: Date.now() - 300000,
      type: 'text',
      likes: 12,
      isLiked: false
    },
    {
      id: '2',
      user: 'PepeTrader',
      avatar: '🐸',
      message: '我的策略：HODL到月球！',
      timestamp: Date.now() - 240000,
      type: 'strategy',
      likes: 8,
      isLiked: true
    },
    {
      id: '3',
      user: 'RocketMan',
      avatar: '🚀',
      message: '刚刚分享了一个新的Meme，大家看看怎么样？',
      timestamp: Date.now() - 180000,
      type: 'meme',
      imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDE9IjAiIHkxPSIwIiB4Mj0iMjAwIiB5Mj0iMjAwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmZjAwMDA7c3RvcC1vcGFjaXR5OjEiLz4KPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMDAwMGZmO3N0b3Atb3BhY2l0eToxIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPHN2Zz4=',
      likes: 15,
      isLiked: false
    },
    {
      id: '4',
      user: 'DiamondHands',
      avatar: '💎',
      message: '这个图表看起来很有潜力！',
      timestamp: Date.now() - 120000,
      type: 'chart',
      imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDE9IjAiIHkxPSIwIiB4Mj0iMjAwIiB5Mj0iMjAwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmZmZmMDA7c3RvcC1vcGFjaXR5OjEiLz4KPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZmYwMDAwO3N0b3Atb3BhY2l0eToxIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPHN2Zz4=',
      likes: 6,
      isLiked: false
    }
  ]

  // 初始化聊天室消息
  useEffect(() => {
    setChatRooms(prev => prev.map(room => ({
      ...room,
      messages: room.id === selectedRoom ? mockMessages : []
    })))
  }, [selectedRoom])

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatRooms])

  // 模拟在线用户数
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers(Math.floor(Math.random() * 100) + 200)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // 发送消息
  const sendMessage = () => {
    if (!message.trim() || !connected) return

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      user: publicKey?.toString().slice(0, 8) + '...' || 'Anonymous',
      avatar: userAvatars[Math.floor(Math.random() * userAvatars.length)],
      message: message,
      timestamp: Date.now(),
      type: 'text',
      likes: 0,
      isLiked: false
    }

    setChatRooms(prev => prev.map(room => 
      room.id === selectedRoom 
        ? { ...room, messages: [...room.messages, newMessage] }
        : room
    ))

    setMessage('')
  }

  // 点赞消息
  const likeMessage = (messageId: string) => {
    setChatRooms(prev => prev.map(room => ({
      ...room,
      messages: room.messages.map(msg => 
        msg.id === messageId 
          ? { ...msg, likes: msg.isLiked ? msg.likes - 1 : msg.likes + 1, isLiked: !msg.isLiked }
          : msg
      )
    })))
  }

  // 格式化时间
  const formatTime = (timestamp: number) => {
    const now = Date.now()
    const diff = now - timestamp
    
    if (diff < 60000) return '刚刚'
    if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`
    return new Date(timestamp).toLocaleDateString()
  }

  // 获取当前房间
  const currentRoom = chatRooms.find(room => room.id === selectedRoom)

  if (!connected) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 text-center">
          <div className="text-6xl mb-4">💬</div>
          <h2 className="text-2xl font-bold text-white mb-4">实时聊天室</h2>
          <p className="text-gray-300 mb-6">连接钱包以参与讨论</p>
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
          <h1 className="text-3xl font-bold text-white mb-2">💬 实时聊天室</h1>
          <p className="text-gray-300">与其他用户讨论策略、分享Meme</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-white font-semibold">{onlineUsers} 在线</div>
            <div className="text-gray-400 text-sm">活跃用户</div>
          </div>
          <SimpleWalletButton />
        </div>
      </div>

      {/* 标签页导航 */}
      <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 mb-6">
        <div className="flex space-x-4">
          {[
            { id: 'chat', name: '聊天', icon: '💬' },
            { id: 'rooms', name: '房间', icon: '🏠' },
            { id: 'trending', name: '热门', icon: '🔥' }
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

      {/* 聊天界面 */}
      {activeTab === 'chat' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 聊天室列表 */}
          <div className="lg:col-span-1">
            <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-4">
              <h3 className="text-lg font-bold text-white mb-4">🏠 聊天室</h3>
              <div className="space-y-2">
                {chatRooms.map((room) => (
                  <button
                    key={room.id}
                    onClick={() => setSelectedRoom(room.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedRoom === room.id
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        : 'bg-black/30 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">{room.emoji}</span>
                      <div className="flex-1">
                        <div className="font-semibold">{room.name}</div>
                        <div className="text-sm opacity-75">{room.description}</div>
                      </div>
                      <div className="text-xs bg-white/20 px-2 py-1 rounded">
                        {room.userCount}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 聊天区域 */}
          <div className="lg:col-span-3">
            <div className="bg-black/50 backdrop-blur-sm rounded-2xl h-[600px] flex flex-col">
              {/* 聊天室标题 */}
              <div className="p-4 border-b border-gray-700">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{currentRoom?.emoji}</span>
                  <div>
                    <h3 className="font-bold text-white">{currentRoom?.name}</h3>
                    <p className="text-sm text-gray-400">{currentRoom?.description}</p>
                  </div>
                </div>
              </div>

              {/* 消息列表 */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {currentRoom?.messages.map((msg) => (
                  <div key={msg.id} className="flex space-x-3">
                    <div className="text-2xl">{msg.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-white">{msg.user}</span>
                        <span className="text-xs text-gray-400">{formatTime(msg.timestamp)}</span>
                        {msg.type !== 'text' && (
                          <span className="text-xs bg-purple-600 px-2 py-1 rounded">
                            {msg.type === 'meme' ? '🎭' : msg.type === 'strategy' ? '📈' : '📊'}
                          </span>
                        )}
                      </div>
                      
                      <div className="bg-black/30 rounded-lg p-3">
                        <p className="text-gray-200 mb-2">{msg.message}</p>
                        {msg.imageUrl && (
                          <img
                            src={msg.imageUrl}
                            alt="Shared content"
                            className="w-full max-w-xs rounded-lg mb-2"
                          />
                        )}
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => likeMessage(msg.id)}
                            className={`flex items-center space-x-1 text-sm transition-all ${
                              msg.isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                            }`}
                          >
                            <span>{msg.isLiked ? '❤️' : '🤍'}</span>
                            <span>{msg.likes}</span>
                          </button>
                          <button className="text-gray-400 hover:text-white text-sm">
                            💬 回复
                          </button>
                          <button className="text-gray-400 hover:text-white text-sm">
                            📤 分享
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* 输入区域 */}
              <div className="p-4 border-t border-gray-700">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="输入消息..."
                    className="flex-1 bg-black/30 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!message.trim()}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    发送
                  </button>
                </div>
                <div className="flex space-x-2 mt-2">
                  <button className="text-gray-400 hover:text-white text-sm">
                    🎭 分享Meme
                  </button>
                  <button className="text-gray-400 hover:text-white text-sm">
                    📈 分享策略
                  </button>
                  <button className="text-gray-400 hover:text-white text-sm">
                    📊 分享图表
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 房间管理 */}
      {activeTab === 'rooms' && (
        <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">🏠 聊天室管理</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {chatRooms.map((room) => (
              <div key={room.id} className="bg-black/30 rounded-xl p-4 hover:bg-black/50 transition-all">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-3xl">{room.emoji}</span>
                  <div>
                    <h4 className="font-semibold text-white">{room.name}</h4>
                    <p className="text-sm text-gray-400">{room.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">{room.userCount} 用户</span>
                  <button className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition-all">
                    加入
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 热门话题 */}
      {activeTab === 'trending' && (
        <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">🔥 热门话题</h3>
          
          <div className="space-y-4">
            {[
              { topic: '#Solana', count: 1234, trend: 'up' },
              { topic: '#MemeCoins', count: 987, trend: 'up' },
              { topic: '#DeFi', count: 756, trend: 'down' },
              { topic: '#NFT', count: 543, trend: 'up' },
              { topic: '#Bitcoin', count: 432, trend: 'down' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{item.trend === 'up' ? '📈' : '📉'}</span>
                  <div>
                    <div className="font-semibold text-white">{item.topic}</div>
                    <div className="text-sm text-gray-400">{item.count} 讨论</div>
                  </div>
                </div>
                <button className="text-purple-400 hover:text-purple-300">
                  查看 →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatRoom 