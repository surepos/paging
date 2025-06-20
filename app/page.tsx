'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaCalendar, FaHourglassHalf } from 'react-icons/fa';
import { FiClock } from 'react-icons/fi';
import { GoGraph } from 'react-icons/go';
import me from '@/public/me.jpg';

export default function Home() {
  const router = useRouter();
  const [showName, setShowName] = useState(false);
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 p-4">
      <div className="grid grid-cols-2 gap-5 w-[70%] max-w-2xl">
      
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          data-tooltip-id="fcfs-tooltip"
          className="aspect-square bg-[#6E45E2] text-white flex flex-col items-center justify-center rounded-2xl border border-white/10 hover:border-white/20 shadow-[0_8px_32px_-8px_rgba(110,69,226,0.3)] hover:shadow-[0_8px_32px_-8px_rgba(110,69,226,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-95 group"
          onClick={() => router.push('/clock')}
        >
          <FiClock className="text-4xl mb-3 text-white/90 group-hover:text-white group-hover:rotate-12 transition-all" />
          <span className="text-lg font-semibold text-white/90 group-hover:text-white">Clock</span>
          <span className="text-sm mt-1 text-white/60 group-hover:text-white/80">Referance bit based</span>
        </motion.button>

        <motion.button
          onClick={() => router.push('/lru')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          data-tooltip-id="sjf-tooltip"
          className="aspect-square  bg-[#00B09B]  text-white flex flex-col items-center justify-center rounded-2xl border border-white/10 hover:border-white/20 shadow-[0_8px_32px_-8px_rgba(0,176,155,0.3)] hover:shadow-[0_8px_32px_-8px_rgba(0,176,155,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-95 group"
        >
           <FaHourglassHalf className="text-4xl mb-3 text-white/90 group-hover:text-white group-hover:rotate-12 transition-all" />
          <span className="text-lg font-semibold text-white/90 group-hover:text-white">LRU</span>
          <span className="text-sm mt-1 text-white/60 group-hover:text-white/80">Least recently used out</span>
        </motion.button>

        <motion.button
          onClick={() => router.push('/optimal')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          data-tooltip-id="priority-tooltip"
          className="aspect-square bg-[#FF5E62] text-white flex flex-col items-center justify-center rounded-2xl border border-white/10 hover:border-white/20 shadow-[0_8px_32px_-8px_rgba(255,94,98,0.3)] hover:shadow-[0_8px_32px_-8px_rgba(255,94,98,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-95 group"
        >
          <FaCalendar className="text-4xl mb-3 text-white/90 group-hover:text-white group-hover:rotate-12 transition-all" />
          <span className="text-lg font-semibold text-white/90 group-hover:text-white">Optimal</span>
          <span className="text-sm mt-1 text-white/60 group-hover:text-white/80">Farthest future use out</span>
        </motion.button>

        <motion.button
          onClick={() => router.push('/custom')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          data-tooltip-id="rr-tooltip"
          className="aspect-square bg-[#8E54E9] text-white flex flex-col items-center justify-center rounded-2xl border border-white/10 hover:border-white/20 shadow-[0_8px_32px_-8px_rgba(71,118,230,0.3)] hover:shadow-[0_8px_32px_-8px_rgba(71,118,230,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-95 group"
        >
          <GoGraph className="text-4xl mb-3 text-white/90 group-hover:text-white group-hover:rotate-12 transition-all" />
          <span className="text-lg font-semibold text-white/90 group-hover:text-white">Weighted Frequency-Recency</span>
          <span className="text-sm mt-1 text-white/60 group-hover:text-white/80">More frequent & older page stays</span>
        </motion.button>
      </div>
      <div className="fixed bottom-10 right-10 text-amber-50">
      <AnimatePresence>
        {showName && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-20 right-0 mt-2 p-5 rounded-lg bg-dark-secondary border border-neutral-700 shadow-lg md:w-100 w-70 text-white">
            <p className="mb-1 text-[10px] md:text-sm tracking-wide text-gray-300">
              Created by <strong className="text-white">Sura</strong>
            </p>
            <p className="text-[10px] md:text-sm text-gray-400 leading-relaxed">
            This website will help you to simulate and visualize popular page replacement algorithms like FIFO, LRU, Optimal, and my custom algorithm.
            </p>
            <p className="mt-2 text-[10px] md:text-sm text-blue-400 hover:underline">
              <a
                href="https://portfolio-xyz-gamma.vercel.app/"
                target="_blank"
                rel="noopener noreferrer">
                ↗ Visit my portfolio
              </a>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className="md:w-16 md:h-16 w-10 h-10 cursor-pointer"
        onClick={() => setShowName(!showName)}>
        <Image src={me} alt="Me" className="rounded-full" />
      </div>
    </div>
    </main>
  );
}