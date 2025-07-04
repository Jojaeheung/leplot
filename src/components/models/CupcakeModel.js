import React, { Suspense } from 'react';
import { useGLTF } from '@react-three/drei';

const CupcakeModel = ({ position }) => {
  const url = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Cake/glTF/Cake.gltf';
  const { scene } = useGLTF(url);

  useGLTF.preload(url);

  return (
    <Suspense fallback={null}>
      <primitive object={scene} position={position} scale={0.5} />
    </Suspense>
  );
};

export default CupcakeModel;