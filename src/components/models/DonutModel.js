import React, { Suspense } from 'react';
import { useGLTF } from '@react-three/drei';

const DonutModel = ({ position }) => {
  const url = 'https://raw.githubusercontent.com/pmndrs/drei-assets/master/models/donut.glb';
  const { scene } = useGLTF(url);

  useGLTF.preload(url);

  return (
    <Suspense fallback={null}>
      <primitive object={scene} position={position} scale={0.8} />
    </Suspense>
  );
};

export default DonutModel;