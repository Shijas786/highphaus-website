import React, { useRef } from 'react'
import { useGLTF, OrbitControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'

function Model(props) {
    const gltf = useGLTF('/dollar_rain_3d.glb')
    const group = useRef()

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        if (group.current) {
            group.current.position.y = Math.sin(t * 0.8) * 0.2
        }
    })

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
        <div style={{ width: '100%', height: '100%', cursor: 'grab', touchAction: 'none' }}>
            <Canvas camera={{ position: [0, 0, 15], fov: 45 }} gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}>
                <ambientLight intensity={1.2} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />
                <React.Suspense fallback={null}>
                    {/* Scale reduced and tilted for a more dynamic "floating" angle */}
                    <Model scale={isTouch ? 0.5 : 0.35} position={[0, -0.5, 0]} rotation={[0.5, 0, 0.2]} />
                </React.Suspense>
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} enablePan={false} />
            </Canvas>
        </div>
    )
}

useGLTF.preload('/dollar_rain_3d.glb')
