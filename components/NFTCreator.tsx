'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useWallet } from './SimpleWalletProvider'
import SimpleWalletButton from './SimpleWalletButton'

interface NFTMetadata {
  name: string
  description: string
  image: string
  attributes: {
    trait_type: string
    value: string
  }[]
  strategy?: string
  meme?: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  mintDate: number
  tokenId?: string
}

interface NFTCategory {
  id: string
  name: string
  emoji: string
  description: string
  templates: string[]
}

const NFTCreator = () => {
  const { publicKey, connected } = useWallet()
  const [selectedCategory, setSelectedCategory] = useState<string>('meme')
  const [nftName, setNftName] = useState('')
  const [nftDescription, setNftDescription] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [customText, setCustomText] = useState('')
  const [rarity, setRarity] = useState<'common' | 'rare' | 'epic' | 'legendary'>('common')
  const [isCreating, setIsCreating] = useState(false)
  const [createdNFTs, setCreatedNFTs] = useState<NFTMetadata[]>([])
  const [activeTab, setActiveTab] = useState<'create' | 'gallery' | 'marketplace'>('create')
  const [previewImage, setPreviewImage] = useState<string>('')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // NFT分类
  const nftCategories: NFTCategory[] = [
    {
      id: 'meme',
      name: 'Meme NFT',
      emoji: '🎭',
      description: '将你的Meme制作成NFT',
      templates: ['doge', 'pepe', 'wojak', 'chad', 'diamond', 'rocket']
    },
    {
      id: 'strategy',
      name: '策略NFT',
      emoji: '📈',
      description: '将投资策略制作成NFT',
      templates: ['hodl', 'fomo', 'dca', 'swing', 'scalp', 'yolo']
    },
    {
      id: 'chart',
      name: '图表NFT',
      emoji: '📊',
      description: '将K线图制作成NFT',
      templates: ['bull', 'bear', 'sideways', 'breakout', 'breakdown', 'consolidation']
    },
    {
      id: 'custom',
      name: '自定义NFT',
      emoji: '🎨',
      description: '上传自定义图片制作NFT',
      templates: []
    }
  ]

  // 稀有度配置
  const rarityConfig = {
    common: { color: 'text-gray-400', bg: 'bg-gray-600', chance: 60 },
    rare: { color: 'text-blue-400', bg: 'bg-blue-600', chance: 25 },
    epic: { color: 'text-purple-400', bg: 'bg-purple-600', chance: 10 },
    legendary: { color: 'text-yellow-400', bg: 'bg-yellow-600', chance: 5 }
  }

  // 生成随机稀有度
  const generateRandomRarity = (): 'common' | 'rare' | 'epic' | 'legendary' => {
    const rand = Math.random() * 100
    if (rand < 5) return 'legendary'
    if (rand < 15) return 'epic'
    if (rand < 40) return 'rare'
    return 'common'
  }

  // 生成NFT预览
  const generatePreview = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 设置画布尺寸
    canvas.width = 400
    canvas.height = 400

    // 绘制背景
    const gradient = ctx.createLinearGradient(0, 0, 400, 400)
    gradient.addColorStop(0, '#1e1b4b')
    gradient.addColorStop(1, '#7c3aed')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 400, 400)

    // 绘制稀有度边框
    const rarityColor = rarityConfig[rarity].color.replace('text-', '')
    ctx.strokeStyle = rarityColor === 'gray-400' ? '#9ca3af' : 
                     rarityColor === 'blue-400' ? '#60a5fa' :
                     rarityColor === 'purple-400' ? '#a78bfa' : '#fbbf24'
    ctx.lineWidth = 8
    ctx.strokeRect(4, 4, 392, 392)

    // 绘制图标
    const category = nftCategories.find(cat => cat.id === selectedCategory)
    if (category) {
      ctx.font = '80px Arial'
      ctx.fillStyle = 'white'
      ctx.textAlign = 'center'
      ctx.fillText(category.emoji, 200, 180)
    }

    // 绘制文字
    if (customText) {
      ctx.font = 'bold 24px Arial'
      ctx.fillStyle = 'white'
      ctx.textAlign = 'center'
      ctx.fillText(customText, 200, 280)
    }

    // 绘制稀有度标签
    ctx.font = 'bold 16px Arial'
    ctx.fillStyle = rarityConfig[rarity].color.replace('text-', '#')
    ctx.fillText(rarity.toUpperCase(), 200, 350)

    // 更新预览
    setPreviewImage(canvas.toDataURL())
  }

  // 创建NFT
  const createNFT = async () => {
    if (!connected || !nftName || !nftDescription) {
      alert('请连接钱包并填写NFT信息')
      return
    }

    setIsCreating(true)

    try {
      // 生成预览
      generatePreview()

      // 模拟创建过程
      await new Promise(resolve => setTimeout(resolve, 2000))

      const newNFT: NFTMetadata = {
        name: nftName,
        description: nftDescription,
        image: previewImage,
        rarity: generateRandomRarity(),
        mintDate: Date.now(),
        tokenId: `NFT-${Date.now()}`,
        attributes: [
          { trait_type: 'Category', value: selectedCategory },
          { trait_type: 'Rarity', value: rarity },
          { trait_type: 'Created', value: new Date().toISOString() },
          { trait_type: 'Creator', value: publicKey?.toString().slice(0, 8) + '...' || 'Unknown' }
        ]
      }

      if (selectedCategory === 'strategy') {
        newNFT.strategy = customText
      } else if (selectedCategory === 'meme') {
        newNFT.meme = customText
      }

      setCreatedNFTs(prev => [newNFT, ...prev])
      
      // 重置表单
      setNftName('')
      setNftDescription('')
      setCustomText('')
      setSelectedTemplate('')
      setRarity('common')
      setPreviewImage('')

      alert('NFT创建成功！')
    } catch (error) {
      console.error('Error creating NFT:', error)
      alert('创建NFT时出错')
    } finally {
      setIsCreating(false)
    }
  }

  // 上传自定义图片
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    if (selectedCategory && customText) {
      generatePreview()
    }
  }, [selectedCategory, customText, rarity])

  if (!connected) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 text-center">
          <div className="text-6xl mb-4">🎨</div>
          <h2 className="text-2xl font-bold text-white mb-4">NFT创建器</h2>
          <p className="text-gray-300 mb-6">连接钱包以创建你的专属NFT</p>
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
          <h1 className="text-3xl font-bold text-white mb-2">🎨 NFT创建器</h1>
          <p className="text-gray-300">将你的Meme和策略制作成独特的NFT</p>
        </div>
        <SimpleWalletButton />
      </div>

      {/* 标签页导航 */}
      <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 mb-6">
        <div className="flex space-x-4">
          {[
            { id: 'create', name: '创建NFT', icon: '🎨' },
            { id: 'gallery', name: '我的NFT', icon: '🖼️' },
            { id: 'marketplace', name: 'NFT市场', icon: '🏪' }
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

      {/* 创建NFT */}
      {activeTab === 'create' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 创建表单 */}
          <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">📝 NFT信息</h3>
            
            {/* 分类选择 */}
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">选择分类</label>
              <div className="grid grid-cols-2 gap-2">
                {nftCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`p-3 rounded-lg text-left transition-all ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        : 'bg-black/30 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="text-2xl mb-1">{category.emoji}</div>
                    <div className="font-semibold">{category.name}</div>
                    <div className="text-sm opacity-75">{category.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 基本信息 */}
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">NFT名称</label>
              <input
                type="text"
                value={nftName}
                onChange={(e) => setNftName(e.target.value)}
                className="w-full bg-black/30 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
                placeholder="输入NFT名称"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-300 mb-2">描述</label>
              <textarea
                value={nftDescription}
                onChange={(e) => setNftDescription(e.target.value)}
                className="w-full bg-black/30 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none h-20"
                placeholder="输入NFT描述"
              />
            </div>

            {/* 自定义内容 */}
            {selectedCategory === 'custom' ? (
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">上传图片</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full bg-black/30 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
                />
              </div>
            ) : (
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">自定义文字</label>
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="w-full bg-black/30 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
                  placeholder="输入自定义文字"
                />
              </div>
            )}

            {/* 稀有度选择 */}
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">稀有度</label>
              <div className="grid grid-cols-4 gap-2">
                {Object.entries(rarityConfig).map(([key, config]) => (
                  <button
                    key={key}
                    onClick={() => setRarity(key as any)}
                    className={`p-2 rounded-lg text-center transition-all ${
                      rarity === key
                        ? `${config.bg} text-white`
                        : 'bg-black/30 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="font-semibold capitalize">{key}</div>
                    <div className="text-xs">{config.chance}%</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 创建按钮 */}
            <button
              onClick={createNFT}
              disabled={isCreating || !nftName || !nftDescription}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCreating ? '🔄 创建中...' : '🎨 创建NFT'}
            </button>
          </div>

          {/* 预览区域 */}
          <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">👀 预览</h3>
            
            {previewImage ? (
              <div className="text-center">
                <img
                  src={previewImage}
                  alt="NFT Preview"
                  className="w-full max-w-sm mx-auto rounded-xl border-4 border-purple-500"
                />
                <div className="mt-4 text-gray-300">
                  <p>稀有度: <span className={rarityConfig[rarity].color}>{rarity.toUpperCase()}</span></p>
                  <p>分类: {nftCategories.find(cat => cat.id === selectedCategory)?.name}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <div className="text-6xl mb-4">🎨</div>
                <p>填写信息后查看预览</p>
              </div>
            )}

            <canvas ref={canvasRef} className="hidden" />
          </div>
        </div>
      )}

      {/* 我的NFT */}
      {activeTab === 'gallery' && (
        <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">🖼️ 我的NFT</h3>
          
          {createdNFTs.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <div className="text-6xl mb-4">🖼️</div>
              <p>还没有创建任何NFT</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {createdNFTs.map((nft, index) => (
                <div key={index} className="bg-black/30 rounded-xl p-4 hover:bg-black/50 transition-all">
                  <img
                    src={nft.image}
                    alt={nft.name}
                    className="w-full rounded-lg mb-3"
                  />
                  <h4 className="font-semibold text-white mb-1">{nft.name}</h4>
                  <p className="text-gray-300 text-sm mb-2">{nft.description}</p>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-semibold ${rarityConfig[nft.rarity].color}`}>
                      {nft.rarity.toUpperCase()}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {new Date(nft.mintDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* NFT市场 */}
      {activeTab === 'marketplace' && (
        <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">🏪 NFT市场</h3>
          
          <div className="text-center py-12 text-gray-400">
            <div className="text-6xl mb-4">🏪</div>
            <p>NFT市场功能即将上线</p>
            <p className="text-sm mt-2">支持NFT交易、拍卖等功能</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default NFTCreator 