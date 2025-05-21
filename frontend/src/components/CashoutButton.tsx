import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';

interface CashoutButtonProps {
  onCashOut: () => Promise<void>;
}

const CashoutButton: React.FC<CashoutButtonProps> = ({ onCashOut }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClickable, setIsClickable] = useState(true);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = () => {
    // 50% chance the button moves
    if (Math.random() < 0.5) {
      const newX = (Math.random() - 0.5) * 300;
      const newY = (Math.random() - 0.5) * 300;
      
      // Make sure the button stays within the viewport
      if (buttonRef.current) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Adjust x to keep button in viewport
        if (buttonRect.left + newX < 0) {
          setPosition(prev => ({ ...prev, x: -buttonRect.left + 10 }));
        } else if (buttonRect.right + newX > viewportWidth) {
          setPosition(prev => ({ ...prev, x: viewportWidth - buttonRect.right - 10 }));
        } else {
          setPosition(prev => ({ ...prev, x: newX }));
        }
        
        // Adjust y to keep button in viewport
        if (buttonRect.top + newY < 0) {
          setPosition(prev => ({ ...prev, y: -buttonRect.top + 10 }));
        } else if (buttonRect.bottom + newY > viewportHeight) {
          setPosition(prev => ({ ...prev, y: viewportHeight - buttonRect.bottom - 10 }));
        } else {
          setPosition(prev => ({ ...prev, y: newY }));
        }
      } else {
        setPosition({ x: newX, y: newY });
      }
    }
    
    // 40% chance the button becomes unclickable
    if (Math.random() < 0.4) {
      setIsClickable(false);
      setTimeout(() => setIsClickable(true), 2000);
    }
  };

  const handleClick = async () => {
    if (isClickable) {
      setPosition({ x: 0, y: 0 });
      await onCashOut();
    }
  };

  return (
    <motion.button
      ref={buttonRef}
      className={`btn-cashout flex items-center space-x-2 ${!isClickable ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      animate={{ x: position.x, y: position.y }}
      disabled={!isClickable}
      whileHover={{ scale: isClickable ? 1.05 : 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 25 }}
    >
      <DollarSign size={20} />
      <span>CASH OUT</span>
    </motion.button>
  );
};

export default CashoutButton;