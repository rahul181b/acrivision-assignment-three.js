import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { Line } from "three";

const Lines = ({ startCoord, endCoord }) => {
  const lineRef = useRef();

  useEffect(() => {
    const points = [
      new THREE.Vector3(startCoord[0], startCoord[1], startCoord[2]), // Point 1-75, 0, 43
      new THREE.Vector3(endCoord[0], endCoord[1], endCoord[2]),
      // Point 2
    ];

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    lineRef.current.geometry = geometry;
  }, []);
  return (
    <line ref={lineRef}>
      <bufferGeometry />
      <lineBasicMaterial color="black" linewidth={2} />
    </line>
  );
};

export default Lines;
