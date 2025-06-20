'use client';
'use client';
import Graph from '@/components/Graph';
import { useState } from 'react';

type Step = {
  reference: string;
  frames: string[];
  status: 'Hit' | 'Page Fault';
};

export default function Optimal() {
  const [referenceString, setReferenceString] = useState(
    '7, 0, 1, 2, 0, 3, 0, 4'
  );
  const [frameCount, setFrameCount] = useState(3);
  const [steps, setSteps] = useState<Step[]>([]);
  const [pageFaults, setPageFaults] = useState(0);
  const [faultHistory, setFaultHistory] = useState<number[]>([]);

  const simulateOptimal = () => {
    const references = referenceString.split(',').map((ref) => ref.trim());
    const frames: string[] = Array(frameCount).fill('-'); 
    const stepDetails: Step[] = [];
    const faultHistoryTemp: number[] = [];
    let faults = 0;
  
    references.forEach((ref, currentIndex) => {
      const step: Step = {
        reference: ref,
        frames: [...frames], 
        status: 'Hit'
      };
  
      if (!frames.includes(ref)) {
        faults++;
        step.status = 'Page Fault';
  
        if (frames.includes('-')) {
          const firstEmpty = frames.indexOf('-');
          frames[firstEmpty] = ref;
        } else {
          let farthest = -1;
          let replaceIndex = 0;
  
          for (let i = 0; i < frames.length; i++) {
            const framePage = frames[i];
            const nextUse = references.slice(currentIndex + 1).indexOf(framePage);
            
            if (nextUse === -1) {
              replaceIndex = i;
              break;
            } else if (nextUse > farthest) {
              farthest = nextUse;
              replaceIndex = i;
            }
          }
  
          frames[replaceIndex] = ref; 
        }
      }
  
      step.frames = [...frames]; 
      faultHistoryTemp.push(faults);
      stepDetails.push(step);
    });
  
    setSteps(stepDetails);
    setPageFaults(faults);
    setFaultHistory(faultHistoryTemp);
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-white text-center uppercase">
          Optimal Page Replacement
          </h1>
        </header>

        <div className="bg-dark-secondary rounded-xl p-6 mb-8 border border-neutral-700 shadow-lg">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Reference String
              </label>
              <input
                type="text"
                value={referenceString}
                onChange={(e) => setReferenceString(e.target.value)}
                className="w-full border border-neutral-700 rounded-lg px-4 py-2 text-white  focus:border-transparent"
                placeholder="e.g., 7, 0, 1, 2, 0, 3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Number of Frames
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={frameCount}
                onChange={(e) => setFrameCount(parseInt(e.target.value))}
                className="w-full border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-transparent"
              />
            </div>
          </div>
          <button
            onClick={simulateOptimal}
            className="mt-6 bg-blue-primary text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            Run Simulation
          </button>
        </div>
        {steps.length > 0 && (
          <>
            <div className="bg-dark-secondary rounded-xl p-6 border border-neutral-700 shadow-lg mt-8 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-white">
                  Simulation Results
                </h2>
                <div className="bg-gray-800 px-4 py-2 rounded-full">
                  <span className="text-gray-300 mr-2">Page Faults:</span>
                  <span className="font-bold text-red-400">{pageFaults}</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-white">
                      <th className="px-6 py-3 text-left rounded-tl-lg">
                        Reference
                      </th>
                      {Array.from({ length: frameCount }).map((_, i) => (
                        <th key={i} className="px-6 py-3 text-center">
                          Frame {i + 1}
                        </th>
                      ))}
                      <th className="px-6 py-3 text-right rounded-tr-lg">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {steps.map((step, index) => (
                      <tr key={index} className={`border-b border-neutral-700`}>
                        <td className="px-6 py-4 font-mono text-white">
                          {step.reference}
                        </td>
                        {Array.from({ length: frameCount }).map((_, i) => (
                          <td
                            key={i}
                            className="px-6 py-4 text-center font-mono">
                            {step.frames[i] || (
                              <span className="text-gray-500">-</span>
                            )}
                          </td>
                        ))}
                        <td className="px-6 py-4 text-right">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              step.status === 'Page Fault'
                                ? 'bg-red-900 text-white'
                                : 'bg-green-900 text-white'
                            }`}>
                            {step.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <Graph
              labels={steps.map((_, i) => `Step ${i + 1}`)}
              dataPoints={faultHistory}
              title="Optimal Page Faults Progression"
              lineColor="#8b5cf6"
              pointColor="#ec4899"
            />
          </>
        )}
      </div>
    </div>
  );
}
