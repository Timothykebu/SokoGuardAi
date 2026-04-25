import React from 'react';
import { ShieldCheck, MapPin, ShoppingBag, MessageCircle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface MarketFormProps {
  onSubmit: (data: { location: string; item: string; question: string }) => void;
  isLoading: boolean;
}

export function MarketForm({ onSubmit, isLoading }: MarketFormProps) {
  const [formData, setFormData] = React.useState({
    location: '',
    item: '',
    question: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.location || !formData.item || !formData.question) return;
    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl mx-auto bg-white rounded-3xl shadow-xl shadow-soko-green/10 border border-neutral-100 overflow-hidden"
    >
      <div className="bg-soko-green p-6 text-white">
        <h2 className="text-xl font-display font-bold flex items-center gap-2">
          <ShieldCheck className="w-6 h-6" />
          Soko Assessment
        </h2>
        <p className="text-emerald-50 text-sm mt-1">Tuambie soko yako tusaidie usigongwe.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-2">
              <MapPin className="w-3 h-3 text-soko-red" />
              Soko Gani? (Location)
            </label>
            <input
              type="text"
              placeholder="e.g. Wakulima, Nairobi"
              className="w-full p-4 bg-neutral-50 rounded-2xl border-none ring-1 ring-neutral-200 focus:ring-2 focus:ring-soko-green transition-all outline-none"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-2">
              <ShoppingBag className="w-3 h-3 text-soko-red" />
              Bidhaa Gani? (Item)
            </label>
            <input
              type="text"
              placeholder="e.g. Gunia ya Vitunguu 90kg"
              className="w-full p-4 bg-neutral-50 rounded-2xl border-none ring-1 ring-neutral-200 focus:ring-2 focus:ring-soko-green transition-all outline-none"
              value={formData.item}
              onChange={(e) => setFormData({ ...formData, item: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-2">
              <MessageCircle className="w-3 h-3 text-soko-red" />
              Shida yako? (Your Concern)
            </label>
            <textarea
              placeholder="e.g. Broker ananiambia 4k pekee. Ni robbery au ni soko?"
              className="w-full p-4 bg-neutral-50 rounded-2xl border-none ring-1 ring-neutral-200 focus:ring-2 focus:ring-soko-green transition-all outline-none min-h-[100px] resize-none"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            "w-full bg-soko-black text-white p-4 rounded-2xl font-display font-bold flex items-center justify-center gap-2 hover:bg-neutral-800 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100",
            isLoading && "cursor-not-allowed"
          )}
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
            />
          ) : (
            <>
              Check Bei ya Soko
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}
