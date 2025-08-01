'use client'

import React from 'react'
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <footer className="bg-black/80 backdrop-blur-md border-t border-purple-500/30 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo和描述 */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-2xl">🚀</div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  NoStrategy
                </h3>
                <p className="text-sm text-gray-400">嘲讽微策略的Meme网站</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              NoStrategy是一个专门为散户打造的meme网站，我们相信"策略是骗人的，感觉才是真实的！"
              在这里，你可以找到共鸣，分享你的投资"智慧"，让更多人看到你的"策略"！
            </p>
          </div>

          {/* 快速链接 */}
          <div>
            <h4 className="text-white font-semibold mb-4">快速链接</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  📈 Stonks追踪
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  📊 抽象图表
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  🎭 Meme生成器
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  🎰 策略轮盘
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  🏆 排行榜
                </a>
              </li>
            </ul>
          </div>

          {/* 社交媒体 */}
          <div>
            <h4 className="text-white font-semibold mb-4">关注我们</h4>
            <div className="space-y-2">
              <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors text-sm">
                <span>🐦</span>
                <span>Twitter</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors text-sm">
                <span>📱</span>
                <span>Telegram</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors text-sm">
                <span>💬</span>
                <span>Discord</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors text-sm">
                <span>📧</span>
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* 底部信息 */}
        <div className="border-t border-purple-500/30 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 NoStrategy. 所有权利保留。
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                隐私政策
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                服务条款
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                免责声明
              </a>
            </div>
          </div>
        </div>

        {/* 免责声明 */}
        <div className="mt-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
          <p className="text-red-300 text-xs text-center">
            ⚠️ 免责声明：本网站仅供娱乐目的，不构成投资建议。加密货币投资存在高风险，
            请谨慎投资，不要投入超过你能承受损失的资金。记住：策略是骗人的，感觉才是真实的！
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 