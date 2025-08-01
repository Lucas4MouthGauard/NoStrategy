'use client'

import React, { FC, ReactNode, createContext, useContext, useState } from 'react'

interface WalletContextType {
  connected: boolean
  publicKey: string | null
  connect: () => void
  disconnect: () => void
  signTransaction: (transaction: any) => Promise<any>
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

interface SimpleWalletProviderProps {
  children: ReactNode
}

const SimpleWalletProvider: FC<SimpleWalletProviderProps> = ({ children }) => {
  const [connected, setConnected] = useState(false)
  const [publicKey, setPublicKey] = useState<string | null>(null)

  const connect = () => {
    // 模拟钱包连接
    setConnected(true)
    setPublicKey('DemoWallet' + Math.random().toString(36).substr(2, 9))
  }

  const disconnect = () => {
    setConnected(false)
    setPublicKey(null)
  }

  const signTransaction = async (transaction: any) => {
    // 模拟签名
    return {
      signatures: [{
        signature: Buffer.from('demo-signature-' + Date.now())
      }]
    }
  }

  const value: WalletContextType = {
    connected,
    publicKey,
    connect,
    disconnect,
    signTransaction
  }

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = () => {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within a SimpleWalletProvider')
  }
  return context
}

export default SimpleWalletProvider 