'use client';
import Graph from '@/components/Graph';
import { useState } from 'react';
type SimulationStep = {
  reference: string;
  frames: string[];
  referenceBits: number[];
  clockPos: number;
  status: 'Hit' | 'Page Fault';
  isReplacementStep?: boolean;
};

export default function Clock() {
  const [referenceString, setReferenceString] = useState('7, 0, 1, 2, 0, 3, 0, 4');
  const [frameCount, setFrameCount] = useState(3);
  const [steps, setSteps] = useState<SimulationStep[]>([]);
  const [pageFaults, setPageFaults] = useState(0);
  const [faultHistory, setFaultHistory] = useState<number[]>([]);

  const simulateClock = () => {
    const references = referenceString.split(',').map(ref => ref.trim());
    const frames = Array(frameCount).fill('-');
    const referenceBits = Array(frameCount).fill(0);
    let clockPos = 0;
    let faults = 0;
    const stepDetails: SimulationStep[] = [];
    const faultHistoryTemp: number[] = [];
  
    references.forEach(ref => {
      const hitIndex = frames.indexOf(ref);
      if (hitIndex !== -1) {
        referenceBits[hitIndex] = 1;
        stepDetails.push({
          reference: ref,
          frames: [...frames],
          referenceBits: [...referenceBits],
          clockPos,
          status: 'Hit'
        });
        faultHistoryTemp.push(faults); 
        return;
      }
  
      faults++;
      let replacementHappened = false;
      const initialClockPos = clockPos;
      let replacementStep: SimulationStep | null = null;
  
      while (!replacementHappened) {
        if (frames[clockPos] === '-') {
          frames[clockPos] = ref;
          referenceBits[clockPos] = 1;
          replacementHappened = true;
          clockPos = (clockPos + 1) % frameCount;
        } else if (referenceBits[clockPos] === 0) {
          replacementStep = {
            reference: ref,
            frames: [...frames],
            referenceBits: [...referenceBits],
            clockPos,
            status: 'Page Fault',
            isReplacementStep: true
          };
          
          frames[clockPos] = ref;
          referenceBits[clockPos] = 1;
          replacementHappened = true;
          clockPos = (clockPos + 1) % frameCount;
        } else {
          referenceBits[clockPos] = 0;
          clockPos = (clockPos + 1) % frameCount;
          
          if (clockPos === initialClockPos) {
            replacementStep = {
              reference: ref,
              frames: [...frames],
              referenceBits: [...referenceBits],
              clockPos,
              status: 'Page Fault',
              isReplacementStep: true
            };
            
            frames[clockPos] = ref;
            referenceBits[clockPos] = 1;
            replacementHappened = true;
            clockPos = (clockPos + 1) % frameCount;
          }
        }
      }
  
      if (replacementStep) {
        stepDetails.push(replacementStep);
        faultHistoryTemp.push(faults - 1);
      }
  
      stepDetails.push({
        reference: ref,
        frames: [...frames],
        referenceBits: [...referenceBits],
        clockPos,
        status: 'Page Fault'
      });
      faultHistoryTemp.push(faults); 
    });
  
    setSteps(stepDetails);
    setPageFaults(faults);
    setFaultHistory(faultHistoryTemp);
  };

  const renderReferenceBits = (bits: number[]) => {
    return `[${bits.join(', ')}]`;
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white uppercase text-center">
            Clock Page Replacement Algorithm
          </h1>
        </header>

        <div className="bg-dark-secondary border border-neutral-700 rounded-lg p-6 mb-8 shadow-md">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Reference String
              </label>
              <input
                type="text"
                value={referenceString}
                onChange={(e) => setReferenceString(e.target.value)}
                className="w-full border border-neutral-700 rounded-md px-4 py-2 focus:outline-none text-white"
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
                className="w-full border border-neutral-700 rounded-md px-4 py-2 focus:outline-none text-white"
              />
            </div>
          </div>
          <button
            onClick={simulateClock}
            className="w-full md:w-auto bg-blue-600 text-white font-medium py-2 px-6 rounded-md hover:bg-blue-700 transition-colors shadow-sm">
            Run Simulation
          </button>
        </div>
       

        {steps.length > 0 && (
           <>
          <div className="bg-dark-secondary border border-neutral-700 rounded-lg p-6 shadow-md overflow-x-auto mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-white">
                Simulation Results
              </h2>
              <div className="bg-dark-bg px-4 py-2 rounded-full">
                <span className="text-white mr-2">Page Faults:</span>
                <span className="font-bold text-red-600">{pageFaults}</span>
              </div>
            </div>

            <table className="min-w-full divide-y divide-neutral-700">
              <thead className="">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white tracking-wider">
                    Reference
                  </th>
                  {Array.from({ length: frameCount }).map((_, i) => (
                    <th key={i} className="px-6 py-3 text-center text-xs font-medium text-white  tracking-wider">
                      Frame {i + 1}
                    </th>
                  ))}
                  <th className="px-6 py-3 text-center text-xs font-medium text-white tracking-wider">
                    Reference Bits
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-white  tracking-wider">
                    Clock Pos
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-white tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className=" divide-y divide-neutral-700">
                {steps.map((step, index) => (
                  <tr key={index} className={step.isReplacementStep ? 'bg-dark-tertiary' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-white">
                      {step.reference}
                    </td>
                    {step.frames.map((frame, i) => (
                      <td 
                        key={i} 
                        className={`px-6 py-4 whitespace-nowrap text-sm text-center font-mono ${
                          i === step.clockPos ? 'font-bold text-blue-600' : 'text-white'
                        }`}
                      >
                        {frame}
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-mono text-white">
                      {renderReferenceBits(step.referenceBits)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-mono text-white">
                      {step.clockPos + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                          step.status === 'Page Fault'
                            ? 'bg-red-900 text-white'
                                : 'bg-green-900 text-white'
                        }`}
                      >
                        {step.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
           <Graph
                        labels={steps.map((_, i) => `Step ${i + 1}`)}
                        dataPoints={faultHistory}
                        title="Clock Page Faults Progression"
                        lineColor="#8b5cf6"
                        pointColor="#ec4899"
                      />
                    </>
        )}
      </div>
    </div>
  );
}