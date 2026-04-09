'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface HUDContextType {
  hudActive: boolean
  toggleHUD: () => void
}

const HUDContext = createContext<HUDContextType | undefined>(undefined)

export function HUDProvider({ children }: { children: ReactNode }) {
  const [hudActive, setHudActive] = useState(false)

  const toggleHUD = () => setHudActive((prev) => !prev)

  return (
    <HUDContext.Provider value={{ hudActive, toggleHUD }}>
      {children}
    </HUDContext.Provider>
  )
}

export function useHUD() {
  const context = useContext(HUDContext)
  if (context === undefined) {
    throw new Error('useHUD must be used within a HUDProvider')
  }
  return context
}
