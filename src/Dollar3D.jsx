
import React, { useRef } from 'react'
import { useGLTF, OrbitControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'

function Model(props) {
    // Use a try-catch pattern indirectly by checking what we get back
    const gltf = useGLTF('/dollar_rain_3d.glb')

    // Debug log to see what's inside if it fails (visible in browser console)
    // console.log("GLTF Data:", gltf)

    const group = useRef()

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        if (group.current) {
            // Gentle floating animation ONLY (OrbitControls handles rotation)
            // We keep slight auto-tilt or bobbing
            group.current.position.y = Math.sin(t * 0.8) * 0.2
        }
    })

    // GLTF loader usually returns a 'scene' property for the root
    const scene = gltf.scene || gltf.scenes[0]

    if (!scene) return null

    return (
        <group ref={group} {...props} dispose={null}>
            <primitive object={scene} />
        </group>
    )
}

export default function Dollar3D() {
    const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Canvas camera={{ position: [0, 0, 15], fov: 45 }} gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}>
                <ambientLight intensity={1.2} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />
                <React.Suspense fallback={null}>
                    {/* Use a responsive hook or simple media query logic if available, otherwise just use a safe middle ground */}
                    {/* Scale slightly larger on mobile since we zoom out far */}
                    <Model scale={isTouch ? 0.7 : 0.5} position={[0, -0.5, 0]} />
                </React.Suspense>
                {/* Enable zoom for trackpads/touch/mouse - user accepts scroll trapping trade-off for full control */}
                <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={2} enablePan={false} />
            </Canvas>
        </div>
    )
}

useGLTF.preload('/dollar_rain_3d.glb')
