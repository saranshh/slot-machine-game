import React from "react";
import { motion } from "framer-motion";

interface SlotReelProps {
  symbol: string;
  spinning: boolean;
}

const SlotReel: React.FC<SlotReelProps> = ({ symbol, spinning }) => {
  const getSymbolClass = (sym: string) => {
    switch (sym) {
      case "C":
        return "bg-red-600 text-white";
      case "L":
        return "bg-yellow-400 text-black";
      case "O":
        return "bg-orange-500 text-white";
      case "W":
        return "bg-green-600 text-white";
    }
  };

  return (
    <div className="slot-window h-32 flex items-center justify-center relative overflow-hidden">
      {spinning ? (
        <motion.div
          animate={{ y: [0, -100, 0] }}
          transition={{
            repeat: Infinity,
            duration: 0.9,
            ease: "linear",
          }}
          className="text-5xl font-bold"
        >
          X
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0.5, opacity: 0, y: 0 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className={`w-20 h-20 ${getSymbolClass(
            symbol
          )} rounded-lg flex items-center justify-center shadow-md`}
        >
          <span className="text-4xl font-bold">{symbol}</span>
        </motion.div>
      )}
    </div>
  );
};

export default SlotReel;
