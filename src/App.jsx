import React, { useState, useEffect, useRef, createRef } from 'react'
import Draggable from 'react-draggable'
import { Resizable } from 'react-resizable'
import { motion, useMotionValue, AnimatePresence } from 'framer-motion'

import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import './App.css'

// --- Advanced Components Moved OUTSIDE to Prevent Re-creation on every state change ---



const AdvancedDesigner = ({ id, children, uiLayout, setUiLayout, handleUIDrag, designMode, hideLabel = false }) => {

  const nodeRef = useRef(null)
  const layout = uiLayout[id] || { x: 0, y: 0, w: 400, h: 300 }
  const [isResizing, setIsResizing] = useState(false)

  return (
    <Draggable
      nodeRef={nodeRef}
      position={{ x: layout.x, y: layout.y }}
      onStart={(e) => {
        if (designMode && !layout.locked) {
          e.stopPropagation();
        }
      }}
      onStop={(e, data) => handleUIDrag(id, { ...layout, x: data.x, y: data.y })}
      disabled={!designMode || isResizing}
      cancel=".resizer-handle"
    >
      <div
        ref={nodeRef}
        style={{
          position: 'absolute',
          width: layout.w,
          height: layout.h,
          zIndex: layout.z !== undefined ? layout.z : (designMode ? 1000 : 5),
          cursor: designMode ? (layout.locked ? 'not-allowed' : (isResizing ? 'se-resize' : 'move')) : 'inherit',
          pointerEvents: designMode && layout.locked ? 'none' : 'auto',
          border: designMode && layout.selected ? '2px solid #00ff00' : 'none'
        }}
        className={`${designMode ? "advanced-designable active" : ""} ${isResizing ? "resizing" : ""}`}
        onClickCapture={(e) => {
          if (designMode && !layout.locked) {
            // Select on click if not locked
            // We rely on parent selection handler if possible, otherwise simple internal effect
          }
        }}
      >
        <Resizable
          width={layout.w}
          height={layout.h}
          onResizeStart={() => setIsResizing(true)}
          onResizeStop={() => setIsResizing(false)}
          onResize={(e, { size }) => {
            setUiLayout(prev => ({
              ...prev,
              [id]: { ...prev[id], w: size.width, h: size.height }
            }))
          }}
          minConstraints={[100, 50]}
          draggableOpts={{ disabled: !designMode }}
          handle={<div className="resizer-handle" />}
        >
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            {children}
          </div>
        </Resizable>
        {designMode && !hideLabel && (
          <div className="design-label-adv">
            {id} | x:{Math.round(layout.x)} y:{Math.round(layout.y)} w:{Math.round(layout.w)} h:{Math.round(layout.h)}
          </div>
        )}
      </div>
    </Draggable>
  )
}

const Designable = ({ id, children, position, designMode, handleUIDrag, hideLabel = false, selected = false, locked = false, customStyle = {} }) => {
  const elementRef = useRef(null)
  return (
    <Draggable
      nodeRef={elementRef}
      position={position}
      onStart={(e) => {
        if (designMode && !locked) {
          e.stopPropagation();
        }
      }}
      onStop={(e, data) => handleUIDrag(id, data)}
      disabled={!designMode || locked}
    >
      <div
        ref={elementRef}
        className={designMode ? "designable-active" : ""}
        style={{
          position: 'relative',
          zIndex: position && position.z !== undefined ? position.z : (designMode ? 1000 : 'auto'),
          cursor: designMode ? (locked ? 'not-allowed' : 'move') : 'inherit',
          pointerEvents: designMode && locked ? 'none' : 'auto',
          outline: designMode && selected ? '2px solid #00ff00' : 'none',
          opacity: designMode && locked ? 0.6 : 1,
          ...customStyle
        }}
      >
        {children}
        {designMode && !hideLabel && <span className="design-label">{id}</span>}
      </div>
    </Draggable>
  )
}

const ThrowablePillow = ({ id, src, initialPos, designMode, handleUIDrag, lightsOn }) => {
  const x = useMotionValue(initialPos.x)
  const y = useMotionValue(initialPos.y)
  const size = initialPos.size || 260
  const offset = size / 2

  return (
    <motion.div
      drag={true}
      onPointerDown={(e) => {
        if (designMode) {
          e.stopPropagation();
        }
      }}
      dragMomentum={!designMode}
      dragTransition={{ bounceStiffness: 100, bounceDamping: 15 }}
      whileTap={{ scale: 1.1, rotate: 5 }}
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        x: x,
        y: y,
        width: size !== 260 ? `${size}px` : 'clamp(100px, 20vw, 260px)',
        height: 'auto',
        cursor: designMode ? 'move' : 'grab',
        zIndex: initialPos.z || 100,
        touchAction: 'none',
        marginLeft: size !== 260 ? `-${offset}px` : '-130px',
        marginTop: size !== 260 ? `-${offset}px` : '-130px',
        transition: 'transform 0.1s linear',
        '--room-pillow-filter': lightsOn
          ? 'drop-shadow(0 20px 40px rgba(0,0,0,0.4)) brightness(0.92) contrast(0.96)'
          : 'drop-shadow(0 10px 20px rgba(0,0,0,0.6)) brightness(0.25) contrast(1.1)'
      }}
      onDragEnd={(e, info) => {
        if (designMode) {
          handleUIDrag(id, { x: x.get(), y: y.get() })
        }
      }}
    >
      <img
        src={src}
        alt="Pillow"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          pointerEvents: 'none',
          filter: 'var(--room-pillow-filter)'
        }}
        draggable="false"
      />
      {designMode && <span className="design-label" style={{ top: -20, right: 0 }}>{id}</span>}
    </motion.div>
  )
}





const RotateDevicePrompt = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: '#000000',
      zIndex: 100000,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff',
      fontFamily: 'sans-serif'
    }}>
      <div style={{
        width: 60,
        height: 100,
        border: '3px solid white',
        borderRadius: 10,
        marginBottom: 30,
        animation: 'rotatePhone 2s infinite ease-in-out'
      }} />
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', textAlign: 'center' }}>Please Rotate Device</h2>
      <p style={{ opacity: 0.7, textAlign: 'center', padding: '0 20px' }}>For the best experience, view vertically or in a wider window.</p>
      <style>{`
        @keyframes rotatePhone {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(90deg); }
          100% { transform: rotate(0deg); }
        }
      `}</style>
    </div>
  )
}

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [scrollY, setScrollY] = useState(0)


  // --- Workshop Scaling Engine ---
  const boardWidth = 1725;
  const boardHeight = 1131;
  const [boardScale, setBoardScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const s = Math.max(window.innerWidth / boardWidth, window.innerHeight / boardHeight);
      setBoardScale(s);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Video Autoplay Logic ---
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVideoPlaying(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) observer.observe(videoRef.current);

    return () => observer.disconnect();
  }, []);

  // Designer Mode State & Selection
  const [designMode, setDesignMode] = useState(false)
  const [mobilePreview, setMobilePreview] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [isJoinHovered, setIsJoinHovered] = useState(false)

  // Cloud Data Presets
  const desktopCloudData = [
    {
      "id": "c1",
      "src": "/cloud_new_1.png",
      "className": "c1",
      "x": 115.33333333333331,
      "y": -12.666666666666742
    },
    {
      "id": "c3",
      "src": "/cloud_new_3.png",
      "className": "c3",
      "x": 861,
      "y": -44
    },
    {
      "id": "c4",
      "src": "/cloud_new_1.png",
      "className": "c4",
      "x": 467.33333333333314,
      "y": 27.999999999999943
    },
    {
      "id": "c6",
      "src": "/cloud_new_3.png",
      "className": "c6",
      "x": 606.3333333333335,
      "y": 2.3333333333332575
    },
    {
      "id": "c3_copy_1769687040434",
      "src": "/cloud_new_3.png",
      "className": "c3",
      "x": -531,
      "y": -33
    },
    {
      "id": "c6_copy_1769688285584",
      "src": "/cloud_new_3.png",
      "className": "c6",
      "x": -57.66666666666676,
      "y": 12.6666666666668
    },
    {
      "id": "c4_copy_1769690562836",
      "src": "/cloud_new_1.png",
      "className": "c4",
      "x": 868,
      "y": 66
    },
    {
      "id": "c4_copy_1769690583619",
      "src": "/cloud_new_1.png",
      "className": "c4",
      "x": 389.99999999999994,
      "y": 30.666666666666686
    },
    {
      "id": "c4_copy_1769690757189",
      "src": "/cloud_new_1.png",
      "className": "c4",
      "x": 1348,
      "y": 58
    }
  ]

  const mobileCloudData = [
    {
      "id": "c1",
      "src": "/cloud_new_1.png",
      "className": "c1",
      "x": 115.33333333333331,
      "y": -12.666666666666742
    },
    {
      "id": "c3",
      "src": "/cloud_new_3.png",
      "className": "c3",
      "x": 861,
      "y": -44
    },
    {
      "id": "c4",
      "src": "/cloud_new_1.png",
      "className": "c4",
      "x": 467.33333333333314,
      "y": 27.999999999999943
    },
    {
      "id": "c6",
      "src": "/cloud_new_3.png",
      "className": "c6",
      "x": 606.3333333333335,
      "y": 2.3333333333332575
    },
    {
      "id": "c3_copy_1769687040434",
      "src": "/cloud_new_3.png",
      "className": "c3",
      "x": -531,
      "y": -33
    },
    {
      "id": "c6_copy_1769688285584",
      "src": "/cloud_new_3.png",
      "className": "c6",
      "x": -57.66666666666676,
      "y": 12.6666666666668
    },
    {
      "id": "c4_copy_1769690562836",
      "src": "/cloud_new_1.png",
      "className": "c4",
      "x": 868,
      "y": 66
    },
    {
      "id": "c4_copy_1769690583619",
      "src": "/cloud_new_1.png",
      "className": "c4",
      "x": 389.99999999999994,
      "y": 30.666666666666686
    },
    {
      "id": "c4_copy_1769690757189",
      "src": "/cloud_new_1.png",
      "className": "c4",
      "x": 1348,
      "y": 58
    }
  ]

  // Initialize clouds state based on screen size
  const [clouds, setClouds] = useState(
    window.innerWidth <= 1024 ? mobileCloudData : desktopCloudData
  )

  // --- UI Elements Layout State ---
  const desktopUiLayout = {
    "heroTitle": {
      "x": 12,
      "y": -126,
      "z": 50
    },
    "heroPara": {
      "x": 32,
      "y": -119,
      "z": 50
    },
    "heroBtn": {
      "x": 0,
      "y": 0,
      "z": 50
    },
    "skyTitle": {
      "x": -25,
      "y": 228
    },
    "skyPara": {
      "x": -4,
      "y": 358
    },
    "serviceSlider": {
      "x": 0,
      "y": 0
    },
    "lightSwitch": {
      "x": 0,
      "y": 0,
      "z": 9999
    },
    "pillow1": {
      "x": -242.3515625,
      "y": 13.23046875,
      "z": 1
    },
    "pillow2": {
      "x": -190.3203125,
      "y": 21.421875,
      "z": 1
    },
    "founder1": {
      "x": 0,
      "y": 0
    },
    "founder2": {
      "x": 0,
      "y": 0
    },
    "founder3": {
      "x": 0,
      "y": 0,
      "locked": false
    },
    "founder4": {
      "x": 0,
      "y": 0
    },
    "founder5": {
      "x": 0,
      "y": 0
    },
    "pegboard": {
      "x": 1050,
      "y": 480,
      "w": 644,
      "h": 892,
      "locked": false
    },
    "labNote": {
      "x": 100,
      "y": 350,
      "w": 240,
      "h": 120
    },
    "statusLabel": {
      "x": 1018,
      "y": -771,
      "w": 180,
      "h": 40
    },
    "gearTag": {
      "x": 970,
      "y": 92,
      "w": 140,
      "h": 35
    },
    "laptopVideo": {
      "x": 289,
      "y": 405,
      "w": 232,
      "h": 148
    },
    "workshopBg": {
      "x": -51,
      "y": -82,
      "w": 1725,
      "h": 1131,
      "locked": false
    },
    "foundersContainer": {
      "x": 0,
      "y": 0
    },
    "joinInvitation": {
      "x": 0,
      "y": -50,
      "z": 100
    }
  }

  const mobileUiLayout = {
    "heroTitle": {
      "x": -9.333333333333371,
      "y": -32.999999999999986,
      "z": 50
    },
    "heroPara": {
      "x": -3.6666666666668277,
      "y": -57.999999999999986,
      "z": 50
    },
    "heroBtn": {
      "x": 0,
      "y": 0,
      "z": 50
    },
    "skyTitle": {
      "x": 25.666666666666572,
      "y": 62.333333333333314
    },
    "skyPara": {
      "x": 24,
      "y": 133.66666666666652
    },
    "serviceSlider": {
      "x": 0,
      "y": 0
    },
    "lightSwitch": {
      "x": 345.33333333333337,
      "y": -16.333333333333314,
      "z": 9999
    },
    "pillow1": {
      "x": -92.66666666666663,
      "y": 11.666666666666686,
      "size": 90,
      "z": 1
    },
    "pillow2": {
      "x": -137,
      "y": 10.666666666666629,
      "size": 90,
      "z": 1
    },
    "founder1": {
      "x": 0,
      "y": 0
    },
    "founder2": {
      "x": 0,
      "y": 0
    },
    "founder3": {
      "x": 0,
      "y": 0,
      "locked": false
    },
    "founder4": {
      "x": 0,
      "y": 0
    },
    "founder5": {
      "x": 0,
      "y": 0
    },
    "pegboard": {
      "x": 1250,
      "y": 480,
      "w": 600,
      "h": 800,
      "locked": false
    },
    "labNote": {
      "x": 100,
      "y": 350,
      "w": 240,
      "h": 120
    },
    "statusLabel": {
      "x": 1018,
      "y": -771,
      "w": 180,
      "h": 40
    },
    "gearTag": {
      "x": 970,
      "y": 92,
      "w": 140,
      "h": 35
    },
    "laptopVideo": {
      "x": 289,
      "y": 405,
      "w": 232,
      "h": 148
    },
    "workshopBg": {
      "x": -183,
      "y": -106,
      "w": 1725,
      "h": 1131,
      "locked": true
    },
    "foundersContainer": {
      "x": 123.6666666666668,
      "y": 1
    },
    "joinInvitation": {
      "x": 0,
      "y": 0,
      "z": 100
    }
  }

  // State split to persist edits across resizes
  const [desktopUi, setDesktopUi] = useState(desktopUiLayout)
  const [mobileUi, setMobileUi] = useState(mobileUiLayout)
  // Mobile & Orientation State
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024)
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      const mobileStatus = window.innerWidth <= 1024 || mobilePreview
      setIsMobile(mobileStatus)
      setIsPortrait(window.innerHeight > window.innerWidth)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [mobilePreview])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => elements.forEach(el => observer.unobserve(el));
  }, [scrolled, designMode]); // Re-run if layout changes significantly

  // Derived current layout
  const uiLayout = isMobile ? mobileUi : desktopUi

  // Wrapper for child components to update the correct state
  const setUiLayout = (updater) => {
    const setter = isMobile ? setMobileUi : setDesktopUi
    setter(updater)
  }

  const [lightsOn, setLightsOn] = useState(true)
  const heroContentRef = useRef(null)
  const panelRef = useRef(null)

  // Video Playlist
  const videoList = ['YykjpeuMNEk', 'eJnQBXmZ7Ek']
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const nextVideo = () => setCurrentVideoIndex(prev => (prev + 1) % videoList.length)

  // Programmatic Mechanical Click Sound Generator
  const playSwitchSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioCtx.createOscillator()
      const gainNode = audioCtx.createGain()

      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(300, audioCtx.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.03)

      gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.03)

      oscillator.connect(gainNode)
      gainNode.connect(audioCtx.destination)

      oscillator.start()
      oscillator.stop(audioCtx.currentTime + 0.03)
    } catch (e) {
      console.warn("Audio Context error:", e)
    }
  }

  // Update UI positions
  const handleUIDrag = (key, data) => {
    const setter = isMobile ? setMobileUi : setDesktopUi
    setter(prev => ({
      ...prev,
      [key]: { ...prev[key], x: data.x, y: data.y }
    }))
  }

  // Bring element to front (increase Z-Index)
  const bringToFront = (key) => {
    const setter = isMobile ? setMobileUi : setDesktopUi
    setter(prev => {
      // Find max Z
      let maxZ = 0
      Object.values(prev).forEach(item => {
        if (item.z && item.z > maxZ) maxZ = item.z
      })
      // Set new Z
      return {
        ...prev,
        [key]: { ...prev[key], z: maxZ + 1 }
      }
    })
  }

  // Toggle Lock
  const toggleLock = (key) => {
    const setter = isMobile ? setMobileUi : setDesktopUi
    setter(prev => ({
      ...prev,
      [key]: { ...prev[key], locked: !prev[key].locked }
    }))
  }

  // Refs map for dynamic clouds
  const nodeRefs = useRef(new Map())
  const getRef = (id) => {
    if (!nodeRefs.current.has(id)) {
      nodeRefs.current.set(id, createRef())
    }
    return nodeRefs.current.get(id)
  }

  // Update positions
  const handleDrag = (id, e, data) => {
    setClouds(prev => prev.map(c =>
      c.id === id ? { ...c, x: data.x, y: data.y } : c
    ))
  }

  // Clone a cloud
  const duplicateCloud = (cloud) => {
    const newId = `${cloud.className}_copy_${Date.now()}`
    const newCloud = {
      ...cloud,
      id: newId,
      x: cloud.x + 40,
      y: cloud.y + 40
    }
    setClouds(prev => [...prev, newCloud])
  }

  // Delete a cloud
  const deleteCloud = (id) => {
    setClouds(prev => prev.filter(c => c.id !== id))
  }

  // Save layout (Copy to clipboard)
  const saveLayout = () => {
    const fullLayout = {
      clouds,
      ui: uiLayout
    }
    const json = JSON.stringify(fullLayout, null, 2)
    navigator.clipboard.writeText(json)
    alert("Full Layout JSON copied to clipboard!")
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setScrolled(window.scrollY > 50)
    }

    const handleResize = () => {
      setClouds(prev => {
        // Logic could be added here to re-distribute clouds on resize if strictly needed
        // But usually we just swap the dataset on full reload or significant breakpoint change
        return prev
      })
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [designMode])



  // Helpers for workshop section
  const renderLaptopIframe = () => (
    <div ref={videoRef} style={{ width: '100%', height: '100%', position: 'relative', group: 'video-player' }}>
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoList[currentVideoIndex]}?autoplay=${videoPlaying ? 1 : 0}&mute=0&controls=1&modestbranding=1`}
        title="Laptop Screen Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      {/* Subtle Playlist Control */}
      <button
        onClick={(e) => { e.stopPropagation(); nextVideo(); }}
        title="Next Video"
        style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          background: 'rgba(0,0,0,0.6)',
          border: '1px solid rgba(255,255,255,0.2)',
          color: 'white',
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 20,
          fontSize: '10px',
          backdropFilter: 'blur(4px)'
        }}
      >
        ⏭
      </button>
    </div>
  )

  const renderPegboardContent = () => (
    <div className="pegboard-overlay">
      <button
        className="peg-nav-btn left"
        onClick={(e) => { e.stopPropagation(); prevWork(); }}
        style={{ position: 'absolute', left: '-60px', top: '50%', transform: 'translateY(-50%)', zIndex: 2000, cursor: 'pointer', background: 'rgba(255,255,255,0.7)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.2)', pointerEvents: 'auto' }}
      >
        ←
      </button>

      <div className="pegboard-content" style={{ position: 'relative', width: '100%', height: '100%' }}>
        <AnimatePresence initial={false}>
          {[
            (activeWork - 1 + clientWorks.length) % clientWorks.length,
            activeWork,
            (activeWork + 1) % clientWorks.length
          ].map((index, i) => {
            const work = clientWorks[index];
            const isActive = i === 1;
            return (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, x: i === 0 ? '-150%' : i === 2 ? '50%' : '-50%', scale: 0.8 }}
                animate={{
                  opacity: isActive ? 1 : 0.6,
                  scale: isActive ? 1.05 : 0.75,
                  x: i === 0 ? '-115%' : i === 2 ? '15%' : '-50%',
                  y: '-50%',
                  zIndex: isActive ? 100 : 50,
                  rotate: i === 0 ? -12 : i === 2 ? 12 : -1
                }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                drag={designMode ? true : (isActive ? "x" : false)}
                dragConstraints={designMode ? false : { left: 0, right: 0 }}
                onDragEnd={(e, info) => {
                  if (!designMode) {
                    if (info.offset.x > 80) prevWork();
                    else if (info.offset.x < -80) nextWork();
                  }
                }}
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 },
                  scale: { type: "spring", stiffness: 300, damping: 30 }
                }}
                className={`work-card ${isActive ? 'active' : 'side'}`}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transformOrigin: 'center center',
                  scale: 'var(--peg-scale, 1)',
                  cursor: designMode ? 'move' : (isActive ? 'grab' : 'default')
                }}
              >
                <div className="card-pin"></div>
                <div className="client-tag">{work.project}</div>
                {work.image && (
                  <div className="client-card-image" style={{ position: 'relative' }}>
                    <img src={work.image} alt={work.name} />

                  </div>
                )}
                <h4>{work.name}</h4>
                <p>"{work.quote}"</p>
                {work.instagram && (
                  <a
                    href={work.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="client-insta-link"
                    onPointerDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    style={{ pointerEvents: 'auto', position: 'relative', zIndex: 50 }}
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    {work.instagram.replace('https://www.instagram.com/', '@').replace(/\/$/, '')}
                  </a>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <button
        className="peg-nav-btn right"
        onClick={(e) => { e.stopPropagation(); nextWork(); }}
        style={{ position: 'absolute', right: '-60px', top: '50%', transform: 'translateY(-50%)', zIndex: 2000, cursor: 'pointer', background: 'rgba(255,255,255,0.7)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.2)', pointerEvents: 'auto' }}
      >
        →
      </button>
    </div>
  )

  // Unified Cloud Renderer
  const renderCloud = (cloud) => {
    const { id, className, src, x, y } = cloud
    return (
      <Draggable
        key={id}
        nodeRef={getRef(id)}
        position={{ x, y }}
        onStop={(e, data) => handleDrag(id, e, data)}
        disabled={!designMode}
      >
        <div
          ref={getRef(id)}
          style={{
            position: 'absolute',
            zIndex: designMode ? 9999 : 30,
            cursor: designMode ? 'move' : 'default',
            border: designMode ? '2px dashed #ffff00' : 'none',
            pointerEvents: designMode ? 'auto' : 'none'
          }}
        >
          <img
            src={src}
            className={`cloud ${className}`}
            alt=""
            draggable="false"
            style={{
              position: 'relative',
              top: 0,
              left: 0,
              pointerEvents: designMode ? 'auto' : 'none'
            }}
          />
          {designMode && (
            <div style={{
              background: 'black', color: 'yellow', fontSize: 10, fontWeight: 'bold',
              position: 'absolute', top: -25, left: 0, padding: '2px 4px',
              display: 'flex', gap: 5, pointerEvents: 'auto'
            }}>
              <span>{id}</span>
              <button onClick={(e) => { e.stopPropagation(); duplicateCloud(cloud); }} style={{ cursor: 'pointer', background: '#444', color: '#fff', border: 'none', padding: '2px 4px' }}>📋</button>
              <button onClick={(e) => { e.stopPropagation(); deleteCloud(id); }} style={{ cursor: 'pointer', background: '#900', color: '#fff', border: 'none', padding: '2px 4px' }}>❌</button>
            </div>
          )}
        </div>
      </Draggable>
    )
  }

  // Services Data
  const services = [
    { id: 1, tag: "LIVE", title: "The Founders Lab", description: "At Highp haus, Gen Z builders are crafting AI, robotics, and hardware solutions — reminiscent of early Silicon Valley energy.", link: "READ ARTICLE ↗" },
    { id: 2, tag: "CRAFT", title: "Media Production", description: "We help high-growth founders tell their stories through cinematic video, high-end editorial, and viral storytelling.", link: "VIEW WORKS ↗" },
    { id: 3, tag: "SPACE", title: "Shared Environments", description: "Access to private labs and shared making-spaces designed for 24/7 building, learning, and radical collaboration.", link: "APPLY NOW ↗" }
  ]
  const [activeService, setActiveService] = useState(0)
  const nextService = () => setActiveService((prev) => (prev + 1) % services.length)
  const prevService = () => setActiveService((prev) => (prev - 1 + services.length) % services.length)

  // Client Works Data for Pegboard
  const clientWorks = [
    {
      id: 1,
      name: 'NutriBrunch',
      project: 'NUTRITION PLATFORM',
      image: '/nutribrunch.png',
      quote: "NutriBrunch is a nutrition-first food platform delivering fresh, Indian-inspired fruit and protein bowls. We focus on real food and oil-free recipes that fit naturally into daily routines. Through simple, affordable subscription plans, we help you build long-term healthy habits—one bowl at a time.",
      instagram: 'https://www.instagram.com/nutribrunch.in/',
      link: 'https://nutribrunch.in'
    },
    { id: 2, name: 'Vidhi', project: 'ELARA', quote: "Highphaus connected me with a community of builders who challenged me to think bigger. The energy here gave me the confidence to go all in on my startup and set it on a path to grow." },
    { id: 3, name: 'Dev Mandal', project: 'MARKOV', quote: "Being at Highphaus was simply the most productive, fun and exhilarating months of my life! It gave me exactly the environment needed to launch my startup and meet incredible people." },
    { id: 4, name: 'Dheemanth', project: 'MAYA RESEARCH', quote: "The drive to build something bold and useful has always been inside me. Highp Haus provided the early support and radical collaboration that meant everything to our progress." }
  ]
  const [activeWork, setActiveWork] = useState(0)
  const nextWork = () => setActiveWork(prev => (prev + 1) % clientWorks.length)
  const prevWork = () => setActiveWork(prev => (prev - 1 + clientWorks.length) % clientWorks.length)

  // Founders Carousel Data & State
  const [founderIndex, setFounderIndex] = useState(0)
  const allFounders = [
    { id: "founder1", src: "/founder_anim_1.png" },
    { id: "founder2", src: "/founder_anim_2.png" },
    { id: "founder3", src: "/founder_anim_3.png", note: "A WEB3 BUILDER SHIPPING ONCHAIN PRODUCT" },
    { id: "founder4", src: "/founder_anim_4.png" },
    { id: "founder5", src: "/founder_anim_5.png" },
    { id: "upcoming_1", isPlaceholder: true },
    { id: "upcoming_2", isPlaceholder: true },
    { id: "upcoming_3", isPlaceholder: true }
  ]
  const visibleFoundersCount = 5
  // Calculate visible slice in a circular manner
  const visibleFounders = []
  for (let i = 0; i < visibleFoundersCount; i++) {
    visibleFounders.push(allFounders[(founderIndex + i) % allFounders.length])
  }

  const nextFounder = () => setFounderIndex(prev => (prev + 1) % allFounders.length)
  const prevFounder = () => setFounderIndex(prev => (prev - 1 + allFounders.length) % allFounders.length)




  return (
    <div className={`app ${mobilePreview ? 'mobile-preview' : ''} ${isMobile ? 'mobile-scroll' : ''}`}>
      {isMobile && isPortrait && !mobilePreview && <RotateDevicePrompt />}
      <div
        className="fixed-hero"
        style={{
          '--room-pillow-filter': lightsOn
            ? 'drop-shadow(0 20px 40px rgba(0,0,0,0.4)) brightness(0.92) contrast(0.96)'
            : 'drop-shadow(0 10px 20px rgba(0,0,0,0.6)) brightness(0.25) contrast(1.1)'
        }}
      >
        <img
          src={lightsOn ? "/hero_bg.jpg" : "/hero_bg_dark.jpg"}
          className="video-bg"
          alt="Workspace"
          fetchPriority="high"
          loading="eager"
        />
        <div className="gradient-bg"></div>

        <header className="hero">
          <div ref={heroContentRef} className="container hero-content">
            <Designable
              id="lightSwitch"
              position={uiLayout.lightSwitch}
              designMode={designMode}
              handleUIDrag={handleUIDrag}
              selected={heroContentRef && selectedId === "lightSwitch"}
              locked={uiLayout.lightSwitch?.locked}
              customStyle={{
                position: 'absolute',
                top: isMobile ? '30px' : '5%',
                left: isMobile ? '50%' : '91%'
              }}
            >
              <div
                onClick={() => { setLightsOn(!lightsOn); playSwitchSound(); }}
                className="light-interaction-area"
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'transparent',
                  border: 'none',
                  boxShadow: 'none',
                  transition: 'all 0.3s ease',
                  zIndex: 99999
                }}
              >
              </div>
            </Designable>


            <Designable id="heroTitle" position={uiLayout.heroTitle} designMode={designMode} handleUIDrag={handleUIDrag}>
              <h1 style={{ transform: `translateY(${scrollY * 0.2}px)`, opacity: Math.max(0, 1 - scrollY / 400), filter: `blur(${0.2 + scrollY * 0.02}px)` }}>
                <span className="animate-on-scroll" style={{ display: 'block' }}>The media × startup lab</span>
                <span className="animate-on-scroll delay-100" style={{ display: 'block' }}>empowering founders.</span>
              </h1>
            </Designable>
            <Designable id="heroPara" position={uiLayout.heroPara} designMode={designMode} handleUIDrag={handleUIDrag}>
              <p style={{ transform: `translateY(${scrollY * 0.1}px)`, opacity: Math.max(0, 1 - scrollY / 300) }}>
                <span className="animate-on-scroll delay-200" style={{ display: 'inline-block' }}>Highphaus brings young builders into shared environments labs, programs, and gatherings designed for making, learning, and shipping</span>
              </p>
            </Designable>


            <ThrowablePillow id="pillow1" src="/pillow_1.png" initialPos={uiLayout.pillow1} designMode={designMode} handleUIDrag={handleUIDrag} lightsOn={lightsOn} />
            <ThrowablePillow id="pillow2" src="/pillow_3.png" initialPos={uiLayout.pillow2} designMode={designMode} handleUIDrag={handleUIDrag} lightsOn={lightsOn} />
          </div>
        </header>
      </div >

      <div className="cloud-bridge">{clouds.map(cloud => renderCloud(cloud))}</div>
      <div className="scrolling-content" style={{ minHeight: '150vh', position: 'relative' }}>

        <div className="container sky-content-container" style={{ position: 'relative', zIndex: 51, pointerEvents: 'none' }}>
          <section className="content-section">
            <Designable id="skyTitle" position={uiLayout.skyTitle} designMode={designMode} handleUIDrag={handleUIDrag}>
              <h2 className="big-headline animate-on-scroll">For the world’s best talents to go<br />full-time on what they love.</h2>
            </Designable>
            <Designable id="skyPara" position={uiLayout.skyPara} designMode={designMode} handleUIDrag={handleUIDrag}>
              <p className="sky-description animate-on-scroll delay-100" style={{ marginTop: '2rem' }}>
                At Highp haus, builders work alongside other builders designers, developers, marketers, and founders — sharing context, feedback, and energy in real time.
              </p>
            </Designable>

          </section>


        </div>
      </div>

      <section className="black-section">
        <div className="container page-core">
          <Designable id="pageTitle" position={uiLayout.pageTitle || { x: 0, y: 0 }} designMode={designMode} handleUIDrag={handleUIDrag}>
            <h2 className="misfit-headline animate-on-scroll">A mix of every <span>kind of modern builder.</span></h2>
          </Designable>

          <p className="misfit-copy animate-on-scroll delay-100" style={{ marginTop: '2rem' }}>
            Builders, digital marketers, editors, videographers, and content creators — all under one roof.
            <br /><br />
            On any given day, you might be shipping a product next to someone editing a video, planning a campaign, or shaping content for the next launch.
          </p>

          <div className="misfit-row-container reveal">
            <div className="watermark-bg">be m</div>
            <div className="founders-carousel-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>

              <div className="founders-horizontal-row">
                {isMobile ? (
                  /* Unified Mobile Container */
                  <Designable id="foundersContainer" position={uiLayout.foundersContainer || { x: 0, y: 0 }} designMode={designMode} handleUIDrag={handleUIDrag}>
                    <div style={{ display: 'flex', gap: '15px' }}>
                      {visibleFounders.map((f, index) => (
                        <motion.div
                          key={f.id}
                          className={`founder-circle ${f.isPlaceholder ? 'placeholder' : ''}`}
                          initial={{ opacity: 0, scale: 0.2 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ type: "spring", stiffness: 260, damping: 20 }}
                          style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
                        >
                          {f.isPlaceholder ? (
                            <div className="placeholder-content">???</div>
                          ) : (
                            <img src={f.src} alt="" />
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </Designable>
                ) : (
                  /* Desktop Individual Items */
                  visibleFounders.map((f, index) => (
                    <Designable key={f.id} id={f.id} position={uiLayout[f.id] || { x: 0, y: 0 }} designMode={designMode} handleUIDrag={handleUIDrag}>
                      <motion.div
                        className={`founder-circle ${f.isPlaceholder ? 'placeholder' : ''}`}
                        initial={{ opacity: 0, scale: 0.2 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
                      >
                        {f.isPlaceholder ? (
                          <div className="placeholder-content">???</div>
                        ) : (
                          <>
                            <img src={f.src} alt="" />
                            {f.note && (
                              <div className="founder-overlay">
                                <span>{f.note}</span>
                              </div>
                            )}
                          </>
                        )}
                      </motion.div>
                    </Designable>
                  ))
                )}
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className="workshop-zone">
        {/* Scaling Wrapper that maintains board ratio regardless of viewport */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) scale(${boardScale})`,
          width: boardWidth,
          height: boardHeight,
          backgroundImage: designMode ? 'none' : 'url("/new workspace.png")',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          zIndex: 1,
          transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1.0)',
          willChange: 'transform'
        }}>
          {designMode ? (
            <AdvancedDesigner id="workshopBg" uiLayout={uiLayout} setUiLayout={setUiLayout} handleUIDrag={handleUIDrag} designMode={designMode} hideLabel={true}>
              <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                <img src="/new workspace.png" alt="Workshop" className="workshop-bg-img" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />

                <AdvancedDesigner id="pegboard" uiLayout={uiLayout} setUiLayout={setUiLayout} handleUIDrag={handleUIDrag} designMode={designMode} hideLabel={false}>
                  {renderPegboardContent()}
                </AdvancedDesigner>

                <div className="laptop-screen-link" style={{ position: 'absolute', top: '45.18%', left: '27.36%', width: '13.45%', height: '13.08%', overflow: 'hidden', background: '#000', zIndex: 20, pointerEvents: 'none' }}>
                  {renderLaptopIframe()}
                </div>
              </div>
            </AdvancedDesigner>
          ) : (
            <>
              {/* Items stay proportionally fixed because parent is scaled container */}
              <div
                style={{
                  position: 'absolute',
                  left: `${uiLayout.pegboard?.x || 1050}px`,
                  top: `${uiLayout.pegboard?.y || 480}px`,
                  width: `${uiLayout.pegboard?.w || 644}px`,
                  height: `${uiLayout.pegboard?.h || 892}px`,
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none',
                  zIndex: 30
                }}
              >
                <div style={{ pointerEvents: 'auto', width: '100%', height: '100%' }}>
                  {renderPegboardContent()}
                </div>
              </div>

              <div
                className="laptop-screen-link"
                style={{
                  position: 'absolute',
                  top: '45.18%',
                  left: '27.36%',
                  width: '13.45%',
                  height: '13.08%',
                  overflow: 'hidden',
                  background: '#000',
                  zIndex: 50,
                  pointerEvents: 'auto',
                  touchAction: 'auto'
                }}
              >
                {renderLaptopIframe()}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="join-section" id="join-section">
        <div className="join-bg-wrapper">
          <motion.img
            src="/faq_bg_money.png"
            alt="Money Background"
            className="join-bg-money"
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: (window.innerWidth <= 768 || isJoinHovered) ? 0.45 : 0
            }}
            animate={{
              opacity: (window.innerWidth <= 768 || isJoinHovered) ? 0.45 : 0
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
            viewport={{ amount: 0.6 }}
          />
        </div>
        <div className="join-content-cinematic">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="join-bg-spotlight"></div>

            <motion.h2 className="join-title-cinematic">
              {"The doors are open.".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  style={{ display: 'inline-block', marginRight: '0.25em' }}
                  variants={{
                    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
                    visible: {
                      opacity: 1,
                      y: 0,
                      filter: 'blur(0px)',
                      transition: {
                        duration: 0.8,
                        delay: i * 0.2,
                        ease: [0.2, 0.65, 0.3, 0.9]
                      }
                    }
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h2>

            <motion.p
              className="join-subtitle-cinematic"
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 1, ease: "easeOut" } }
              }}
            >
              Join the founders lab and work alongside the world's best talents.
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 1.4, ease: "easeOut" } }
              }}
            >
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSc1KtAXFQGX-yP_pQnV233r1T-awidpjVGefWdE6Ciqg4Ocsw/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="join-btn-cinematic"
                onMouseEnter={() => setIsJoinHovered(true)}
                onMouseLeave={() => setIsJoinHovered(false)}
              >
                JOIN THE HAUS ↗
              </a>
            </motion.div>
          </motion.div>
        </div>

        <div className="footer-section">
          <a
            href="https://www.instagram.com/highphaus.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-insta-link"
          >
            Instagram ↗
          </a>
        </div>
      </section>


      <div className="loader"><div className="loader-text">highphaus</div></div>
      <Analytics />
      <SpeedInsights />
    </div >
  )
}

export default App
