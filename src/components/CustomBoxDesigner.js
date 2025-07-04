import React, { useRef, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { DndContext, useDroppable } from '@dnd-kit/core';
import DessertList from './DessertList';
import '../styles/CustomBoxDesigner.css';

// Temporary placeholder mesh for the dessert box.
const RotatingBox = () => {
  const meshRef = useRef();

  // Rotate the box every frame.
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#f5deb3" wireframe={false} />
    </mesh>
  );
};

// Simple 3D dessert placeholder meshes
const CupcakeMesh = ({ position }) => (
  <mesh position={position} castShadow>
    <cylinderGeometry args={[0.6, 0.8, 1.2, 32]} />
    <meshStandardMaterial color="#ffb6c1" />
  </mesh>
);

const DonutMesh = ({ position }) => (
  <mesh position={position} castShadow>
    <torusGeometry args={[0.7, 0.25, 16, 100]} />
    <meshStandardMaterial color="#ffefd5" />
  </mesh>
);

const MacaronMesh = ({ position }) => (
  <group position={position} castShadow>
    <mesh>
      <cylinderGeometry args={[0.8, 0.8, 0.4, 32]} />
      <meshStandardMaterial color="#d8bfd8" />
    </mesh>
    <mesh position={[0, 0.3, 0]}>
      <cylinderGeometry args={[0.8, 0.8, 0.4, 32]} />
      <meshStandardMaterial color="#dcd0ff" />
    </mesh>
  </group>
);

// Mapping id -> component renderer
const dessertMeshFactory = {
  cupcake: CupcakeMesh,
  donut: DonutMesh,
  macaron: MacaronMesh,
};

// Droppable overlay component to register drop target
const BoxDropZone = ({ children }) => {
  const { setNodeRef } = useDroppable({ id: 'box-dropzone' });
  return (
    <div ref={setNodeRef} className="box-dropzone-overlay">
      {children}
    </div>
  );
};

// Generates a random position within the box boundaries
const randomPosition = () => {
  const range = 0.8; // keep inside box
  const x = (Math.random() - 0.5) * 2 * range;
  const z = (Math.random() - 0.5) * 2 * range;
  const y = 1; // fixed height
  return [x, y, z];
};

const CustomBoxDesigner = () => {
  const [placedDesserts, setPlacedDesserts] = useState([]);

  const handleDragEnd = useCallback((event) => {
    const { over, active } = event;
    if (over && over.id === 'box-dropzone') {
      // Add dessert with random position
      setPlacedDesserts((prev) => [
        ...prev,
        { id: active.id, key: `${active.id}-${Date.now()}`, position: randomPosition() },
      ]);
    }
  }, []);

  return (
    <section className="designer-wrapper">
      <h2 className="designer-title">나만의 디저트 박스 만들기</h2>
      <div className="designer-layout">
        <DessertList />

        <DndContext onDragEnd={handleDragEnd}>
          <div className="designer-canvas-container">
            {/* Droppable overlay wraps the Canvas */}
            <BoxDropZone>
              <Canvas camera={{ position: [5, 5, 5], fov: 50 }} shadows>
                {/* Lighting */}
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 10, 5]} intensity={0.8} castShadow />

                {/* Base rotating box to represent container */}
                <RotatingBox />

                {/* Render placed desserts */}
                {placedDesserts.map((dessert) => {
                  const MeshComponent = dessertMeshFactory[dessert.id];
                  if (!MeshComponent) return null;
                  return <MeshComponent key={dessert.key} position={dessert.position} />;
                })}

                <OrbitControls enablePan enableZoom />
              </Canvas>
            </BoxDropZone>
          </div>
        </DndContext>
      </div>
    </section>
  );
};

export default CustomBoxDesigner;