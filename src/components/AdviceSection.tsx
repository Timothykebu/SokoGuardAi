import Markdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, Info, TrendingUp, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

interface AdviceSectionProps {
  advice: string | null;
  isLoading: boolean;
}

export function AdviceSection({ advice, isLoading }: AdviceSectionProps) {
  return (
    <div className="w-full max-w-xl mx-auto mt-12">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center p-12 text-center"
          >
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 180, 270, 360] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-16 h-16 border-4 border-soko-green rounded-2xl opacity-20"
              />
              <ShieldCheck className="w-8 h-8 text-soko-green absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <p className="mt-6 text-neutral-500 font-medium">Scanning Gikomba and Wakulima price trends...</p>
          </motion.div>
        ) : advice ? (
          <motion.div
            key="advice"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-neutral-100 relative overflow-hidden"
          >
            {/* Vibe indicators */}
            <div className="absolute top-0 left-0 w-2 h-full bg-soko-red" />
            
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-soko-red/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-soko-red" />
              </div>
              <div>
                <h3 className="text-lg font-display font-extrabold text-neutral-900 leading-tight uppercase tracking-tight">
                  Expert Guard Advice
                </h3>
                <p className="text-xs font-bold text-soko-red uppercase tracking-widest mt-1">Verified Street-Smart Data</p>
              </div>
            </div>

            <div className="markdown-body">
              <Markdown>{advice}</Markdown>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-neutral-400 font-medium">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                Updated minutes ago
              </div>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-xs font-bold text-soko-green hover:underline uppercase tracking-wider"
              >
                New Assessment
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-neutral-200 rounded-3xl text-center"
          >
            <Info className="w-8 h-8 text-neutral-300 mb-4" />
            <p className="text-neutral-400 text-sm font-medium">
              Put details hapo juu tukuambie ukweli wa soko.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
