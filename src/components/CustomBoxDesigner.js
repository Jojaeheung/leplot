import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { DndContext, useDroppable } from '@dnd-kit/core';
import DessertList from './DessertList';
import '../styles/CustomBoxDesigner.css';
import CupcakeModel from './models/CupcakeModel';
import DonutModel from './models/DonutModel';
import MacaronModel from './models/MacaronModel';

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

// Capture canvas to dataURL anytime desserts change
const PreviewCapturer = ({ trigger, onCapture }) => {
  const { gl, scene, camera } = useThree();

  useEffect(() => {
    // Wait for next render frame
    const handle = requestAnimationFrame(() => {
      gl.render(scene, camera);
      const dataUrl = gl.domElement.toDataURL('image/png');
      onCapture(dataUrl);
    });
    return () => cancelAnimationFrame(handle);
  }, [trigger]);

  return null;
};

const CustomBoxDesigner = () => {
  const [placedDesserts, setPlacedDesserts] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);

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
              <Canvas camera={{ position: [5, 5, 5], fov: 50 }} shadows preserveDrawingBuffer>
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

                {/* Capture preview when desserts update */}
                <PreviewCapturer trigger={placedDesserts} onCapture={setPreviewUrl} />
              </Canvas>
            </BoxDropZone>
          </div>
        </DndContext>

        {previewUrl && (
          <div className="designer-preview">
            <h3>샘플 미리보기</h3>
            <img src={previewUrl} alt="sample preview" style={{ maxWidth: '300px', border: '1px solid #ccc' }} />
          </div>
        )}
      </div>
    </section>
  );
};

// Mapping id -> component renderer
const dessertMeshFactory = {
  cupcake: CupcakeModel,
  donut: DonutModel,
  macaron: MacaronModel,
};

export default CustomBoxDesigner;