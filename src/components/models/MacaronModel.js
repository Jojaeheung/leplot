import React, { Suspense } from 'react';
import { useGLTF } from '@react-three/drei';

const MacaronModel = ({ position }) => {
  const url = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Avocado/glTF/Avocado.gltf';
  const { scene } = useGLTF(url);

  useGLTF.preload(url);

  return (
    <Suspense fallback={null}>
      <primitive object={scene} position={position} scale={1.2} />
    </Suspense>
  );
};

export default MacaronModel;