import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SlotReel from './SlotReel';
import { Play } from 'lucide-react';

interface SlotMachineProps {
  spinning: boolean;
  onSpin: () => Promise<any>;
  disabled: boolean;
}

const SlotMachine: React.FC<SlotMachineProps> = ({ spinning, onSpin, disabled }) => {
  const [results, setResults] = useState<string[]>(['?', '?', '?']);
  const [showResults, setShowResults] = useState<boolean[]>([false, false, false]);
  const [winner, setWinner] = useState(false);

  useEffect(() => {
    if (!spinning && results[0] !== '?') {
      const isWinner = results[0] === results[1] && results[1] === results[2];
      
      const timers: NodeJS.Timeout[] = [];
      
      timers.push(setTimeout(() => {
        setShowResults([true, false, false]);
      }, 500));
      
      timers.push(setTimeout(() => {
        setShowResults([true, true, false]);
      }, 1500));
      
      timers.push(setTimeout(() => {
        setShowResults([true, true, true]);
        setWinner(isWinner);
      }, 2500));
      
      return () => timers.forEach(timer => clearTimeout(timer));
    }
  }, [spinning, results]);

  const handleSpin = async () => {
    setShowResults([false, false, false]);
    setWinner(false);
    
    try {
      const response = await onSpin();
      setResults(response.symbols);
    } catch (error) {
      console.error('Error spinning:', error);
    }
  };

  return (
    <div className="slot-machine">
      <div className="bg-green p-4 rounded-lg mb-4">
        <h2 className="text-center text-2xl font-bold mb-4 text-yellow-400">
          {winner ? '🎉 WINNER! 🎉' : 'Try Your Luck!'}
        </h2>
        
        <div className="grid grid-cols-3 gap-2 mb-6">
          <SlotReel symbol={results[0]} spinning={spinning || !showResults[0]} />
          <SlotReel symbol={results[1]} spinning={spinning || !showResults[1]} />
          <SlotReel symbol={results[2]} spinning={spinning || !showResults[2]} />
        </div>
      </div>
      
      <div className="flex justify-center">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="btn-spin flex items-center space-x-2"
          onClick={handleSpin}
          disabled={disabled}
        >
          <Play size={20} />
          <span>{spinning ? 'Spinning...' : 'Pull Lever'}</span>
        </motion.button>
      </div>
      
      <div className="grid grid-cols-4 gap-2 mt-6 text-center">
        <div className="bg-red-600 p-2 rounded">
          <div className="text-lg font-bold">C</div>
          <div className="text-sm">Cherry</div>
          <div className="text-xs">10 credits</div>
        </div>
        <div className="bg-yellow-400 text-black p-2 rounded">
          <div className="text-lg font-bold">L</div>
          <div className="text-sm">Lemon</div>
          <div className="text-xs">20 credits</div>
        </div>
        <div className="bg-orange-500 p-2 rounded">
          <div className="text-lg font-bold">O</div>
          <div className="text-sm">Orange</div>
          <div className="text-xs">30 credits</div>
        </div>
        <div className="bg-green-600 p-2 rounded">
          <div className="text-lg font-bold">W</div>
          <div className="text-sm">Watermelon</div>
          <div className="text-xs">40 credits</div>
        </div>
      </div>
    </div>
  );
};

export default SlotMachine;