import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import Lines from "./component/lines";
import { OrbitControls, Stats, axesHelper } from "@react-three/drei";
import * as XLSX from "xlsx";

/* load 'fs' for readFile and writeFile support */

function App() {
  const [members, setMembers] = useState([]);
  const [nodes, setNodes] = useState([]);

  const loadExcelFile = async () => {
    const response = await fetch("./Sample.xlsx"); // Adjust path if needed
    const arrayBuffer = await response.arrayBuffer(); // Convert to array buffer

    const workbook = XLSX.read(arrayBuffer, { type: "array" }); // Read workbook
    const sheetNameA = workbook.SheetNames[0]; // Get first sheet
    const worksheetA = workbook.Sheets[sheetNameA]; // Access worksheet
    const jsonDataA = XLSX.utils.sheet_to_json(worksheetA); // Convert to JSON

    const sheetNameB = workbook.SheetNames[1]; // Get second sheet
    const worksheetB = workbook.Sheets[sheetNameB]; // Access worksheet
    const jsonDataB = XLSX.utils.sheet_to_json(worksheetB);
    setMembers(jsonDataA); // Store data in state
    //console.log(jsonDataA);
    setNodes(jsonDataB);
    // console.log(jsonDataB);
  };

  // Run load function on component mount
  useEffect(() => {
    loadExcelFile();
    console.log("members:- " + members);
    console.log("nodes:- " + nodes);
  }, []);

  const startNode = [-75, 0, 43];
  const endNode = [-11, 0, 6.53];

  return (
    <div id="canvas-container" style={{ height: "500px" }}>
      <Canvas camera={{ position: [150, 150, 150], fov: 75 }}>
        <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[0, 0, 5]} />

        {members.map((member, index) => {
          let { Member, "Start Node": startNode, "End Node": endNode } = member;

          let startNodeData = nodes.find((node) => node.Node === startNode);

          let startCoord = [startNodeData.X, startNodeData.Y, startNodeData.Z];
          console.log(startCoord + " start");
          let endNodeData = nodes.find((node) => node.Node === endNode);

          let endCoord = [endNodeData.X, endNodeData.Y, endNodeData.Z];
          console.log(endCoord + " end");
          return (
            <mesh key={index}>
              <Lines startCoord={startCoord} endCoord={endCoord} />
            </mesh>
          );
        })}

        <axesHelper args={[1]} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
