import React from 'react'; 

const Header: React.FC = () => {
  return (
    <header className="bg-purple-950/80 border-b-4 border-yellow-400 p-4 text-center">
      <div className="container mx-auto flex items-center justify-center"> 
        <h1 className="text-4xl font-bold text-white">
          <span className="text-yellow-400">Vegas</span> Jackpot
        </h1> 
      </div>
    </header>
  );
};

export default Header;