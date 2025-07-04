import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { DndContext, useDroppable } from '@dnd-kit/core';
import DessertList from './DessertList';
import '../styles/CustomBoxDesigner.css';
import CupcakeModel from './models/CupcakeModel';
import DonutModel from './models/DonutModel';
import MacaronModel from './models/MacaronModel';
import StickerSelector, { stickers as STICKER_OPTIONS } from './StickerSelector';

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

const DESSERT_PRICES = {
  cupcake: 3000,
  donut: 2500,
  macaron: 2000,
};

const CHAR_PRICE = 100;

const CustomBoxDesigner = () => {
  const [placedDesserts, setPlacedDesserts] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);

  // workflow step: 1 arrange, 2 decorate
  const [step, setStep] = useState(1);

  // Decoration selections
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [customText, setCustomText] = useState('');

  const calcPrice = useCallback(() => {
    const dessertTotal = placedDesserts.reduce((sum, d) => sum + (DESSERT_PRICES[d.id] || 0), 0);
    const stickerCost = selectedSticker ? selectedSticker.price : 0;
    const textCost = customText.length * CHAR_PRICE;
    return dessertTotal + stickerCost + textCost;
  }, [placedDesserts, selectedSticker, customText]);

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

  const totalPrice = calcPrice();

  return (
    <section className="designer-wrapper">
      <h2 className="designer-title">나만의 디저트 박스 만들기</h2>

      {step === 1 && (
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

          {/* Next button */}
          <button
            className="next-btn"
            disabled={placedDesserts.length === 0}
            onClick={() => setStep(2)}
          >
            다음 단계 (스티커 & 문구)
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="decorate-layout">
          <div className="decorate-controls">
            <h3>스티커 선택</h3>
            <StickerSelector
              selectedId={selectedSticker?.id}
              onSelect={(s) => setSelectedSticker(s)}
            />

            <h3>문구 입력</h3>
            <input
              type="text"
              maxLength={30}
              placeholder="최대 30자"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
            />

            <h3>가격</h3>
            <p>{totalPrice.toLocaleString()} 원</p>

            <button className="prev-btn" onClick={() => setStep(1)}>이전</button>
            <button className="confirm-btn" disabled={placedDesserts.length === 0}>주문 확정</button>
          </div>

          {/* Reuse preview */}
          {previewUrl && (
            <div className="designer-preview">
              <h3>샘플(배치)</h3>
              <img src={previewUrl} alt="sample preview" style={{ maxWidth: '300px', border: '1px solid #ccc' }} />
              {selectedSticker && (
                <p>스티커: {selectedSticker.label}</p>
              )}
              {customText && (
                <p>문구: {customText}</p>
              )}
            </div>
          )}
        </div>
      )}
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