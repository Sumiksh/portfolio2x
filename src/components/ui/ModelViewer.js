import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Stage, Center } from '@react-three/drei'

// The actual 3D Model logic
function Model({ path }) {
  const { scene } = useGLTF(path)
  return <primitive object={scene} />
}

// The Reusable Viewer Component
export default function ModelViewer({ modelPath }) {
  return (

    <div style={{ 
      position: 'fixed', // Fixed keeps it in place while you scroll
      top: 0, 
      left: 0, 
      width: '100vw', 
      height: '100vh', 
      zIndex: -1,      // Put it behind everything
      pointerEvents: 'none' // Optional: lets you click "through" it to text
    }}>
      <Canvas shadows camera={{ position: [-100, 70, 150] }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.5} adjustCamera>
             <Model path={modelPath} />
          </Stage>
        </Suspense>
        {/* Remove OrbitControls if you don't want the user to rotate the background */}
      </Canvas>
    </div>
  )
}