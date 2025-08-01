'use client'

import React from 'react'
import { useWallet } from './SimpleWalletProvider'

interface SimpleWalletButtonProps {
  className?: string
}

const SimpleWalletButton: React.FC<SimpleWalletButtonProps> = ({ className = '' }) => {
  const { connected, connect, disconnect } = useWallet()

  return (
    <button
      onClick={connected ? disconnect : connect}
      className={`wallet-button ${className}`}
    >
      {connected ? '🔗 断开钱包' : '🔗 连接钱包'}
    </button>
  )
}

export default SimpleWalletButton 