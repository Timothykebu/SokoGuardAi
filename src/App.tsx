import React from 'react';
import { MarketForm } from './components/MarketForm';
import { AdviceSection } from './components/AdviceSection';
import { getSokoAdvice } from './lib/gemini';
import { motion } from 'motion/react';
import { ShieldAlert } from 'lucide-react';

export default function App() {
  const [advice, setAdvice] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSokoCheck = async (data: { location: string; item: string; question: string }) => {
    setIsLoading(true);
    setAdvice(null);
    try {
      const result = await getSokoAdvice(data.location, data.item, data.question);
      setAdvice(result || "Kuna shida na mtandao, jaribu tena baadaye.");
    } catch (error: any) {
      if (error.message === "QUOTA_EXCEEDED") {
        setAdvice("⚠️ **SokoGuard is at full capacity right now.** \n\nQuota ya Gemini imefika limit. Jaribu tena baada ya dakika chache hivi brokers wakishatulia.");
      } else {
        setAdvice("⚠️ Kuna shida kidogo na mtandao. Cheki kama uko online kisha ujaribu tena.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden selection:bg-soko-red/20 selection:text-soko-red">
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: `radial-gradient(#00843D 2px, transparent 2px)`, backgroundSize: '32px 32px' }} />
      
      {/* Content */}
      <main className="relative z-10 container mx-auto px-4 py-12 md:py-20 lg:py-24">
        <header className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 bg-soko-red text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-soko-red/30"
          >
            <ShieldAlert className="w-4 h-4" />
            Protecting Your Profit
          </motion.div>
          
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-display font-extrabold tracking-tighter text-soko-black leading-[0.9]"
          >
            Soko<span className="text-soko-green">Guard</span> AI
          </motion.h1>
          
          <motion.p 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-neutral-500 text-lg max-w-lg mx-auto font-medium"
          >
            Expert market intelligence for the Kenyan trader. <br />
            <span className="text-soko-black font-semibold text-sm">Usikubali kugongwa na brokers.</span>
          </motion.p>
        </header>

        <MarketForm onSubmit={handleSokoCheck} isLoading={isLoading} />
        
        <AdviceSection advice={advice} isLoading={isLoading} />

        <footer className="mt-20 text-center space-y-6 pb-12">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <span className="text-xs font-bold text-neutral-300 uppercase tracking-[0.2em]">Authentic</span>
            <span className="text-xs font-bold text-neutral-300 uppercase tracking-[0.2em]">Street-Smart</span>
            <span className="text-xs font-bold text-neutral-300 uppercase tracking-[0.2em]">Real-Time</span>
          </div>
          <p className="text-[10px] text-neutral-400 font-medium max-w-xs mx-auto leading-relaxed">
            SokoGuard AI uses advanced intelligence to track regional Kenyan markets. Always confirm with multiple sources before large transactions.
          </p>
        </footer>
      </main>

      {/* Decorative Accents */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-soko-green/[0.04] blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-soko-red/[0.03] blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
    </div>
  );
}

