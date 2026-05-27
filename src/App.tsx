import { ELEMENTS } from "./types/spell";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";

export default function App() {
  const [currentSpell, setCurrentSpell] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 flex justify-center">
      <div className="w-1/4">
        <div>
          {ELEMENTS.map((element) => (
            <button
              key={element.name}
              className="flex flex-col"
              onClick={() => setCurrentSpell(element.name)}
            >
              <span
                className="text-lg font-bold"
                style={{
                  color: element.color,
                  borderBottom:
                    currentSpell === element.name
                      ? `2px solid ${element.color}`
                      : "none",
                }}
              >
                {element.name}{" "}
                <span className="text-sm text-slate-400">
                  ({element.alt_name})
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="w-3/4 bg-gray-800 rounded-lg overflow-hidden relative">
        <Canvas camera={{ position: [0, -1.5, 4] }}>
          <Scene currentSpell={currentSpell} />
        </Canvas>
        <div
          id="camera-debug"
          className="absolute bottom-2 left-2 text-xs font-mono bg-black/60 text-slate-300 px-2 py-1 rounded"
        >
          pos: [?, ?, ?]  |  rot: [?, ?, ?]
        </div>
      </div>
    </div>
  );
}
