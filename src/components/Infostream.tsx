'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const DATA_POINTS = [
  "PROJECT_DELTA: SYNC_ACTIVE",
  "LND_NODE: ONLINE_STATUS_OK",
  "ARCHITECTURAL_INTEGRITY: 100%",
  "GEOGRAPHICAL_COORD: 51.5074 N, 0.1278 W",
  "SYSTEM_LATENCY: 12ms",
  "TRV_HUB: OPTIMIZING_LOAD",
  "DXB_NODE: STANDBY_MODE",
  "ZRH_UPLINK: ENCRYPTED_STREAMS",
  "GLOBAL_EXPERIENCE: INITIALIZING",
  "CORE_SYNCHRONIZATION: COMPLETED",
]

export default function Infostream() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  // Triple the array to ensure a perfectly seamless loop without gaps
  const tickerItems = [...DATA_POINTS, ...DATA_POINTS, ...DATA_POINTS]

  if (!mounted) return null

  return (
    <div className="fixed bottom-10 left-0 right-0 z-[8000] pointer-events-none h-6 bg-hp-black border-t border-hp-white flex items-center overflow-hidden">
      <motion.div
        animate={{ x: [0, -1000] }} // Approximate width of one set of items
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop"
        }}
        className="flex gap-16 whitespace-nowrap px-8"
      >
        {tickerItems.map((item, i) => (
          <div key={i} className="flex items-center gap-4">
            <span className="w-1 h-1 bg-hp-maroon rounded-full shadow-[0_0_10px_#4A0F1C]" />
            <span className="font-mono text-[8px] tracking-[0.2em] text-hp-white uppercase">
              {item}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
