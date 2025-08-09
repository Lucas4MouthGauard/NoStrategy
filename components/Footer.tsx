'use client'

import React from 'react'
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <footer className="bg-black/80 backdrop-blur-md border-t border-purple-500/30 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-2xl">🚀</div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  NoStrategy
                </h3>
                <p className="text-sm text-gray-400">Meme Site Mocking MicroStrategy</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              NoStrategy is a meme site dedicated to retail investors, we believe "Strategy is fake, feeling is real!"
              Here, you can find resonance, share your investment "wisdom", and let more people see your "strategy"!
            </p>
          </div>



          {/* Social Media */}
          <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="space-y-2">
              <a href="https://x.com/No_Strategy_sol" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors text-sm">
                <span>🐦</span>
                <span>Twitter</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Information */}
        <div className="border-t border-purple-500/30 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 NoStrategy. All rights reserved.
            </div>

          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
          <p className="text-red-300 text-xs text-center">
            ⚠️ Disclaimer: This website is for entertainment purposes only and does not constitute investment advice. Cryptocurrency investment involves high risks.
            Please invest carefully and do not invest more than you can afford to lose. Remember: Strategy is fake, feeling is real!
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 