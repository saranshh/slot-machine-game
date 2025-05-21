import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-purple-950/80 border-t-4 border-yellow-400 p-4 text-center text-white">
      <div className="container mx-auto">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Vegas Jackpot. All rights reserved.
        </p> 
      </div>
    </footer>
  );
};

export default Footer;