import { useEffect, useState } from 'react';
import { useGameSession } from './hooks/useGameSession';
import SlotMachine from './components/SlotMachine';
import Header from './components/Header';
import Footer from './components/Footer';
import CashoutButton from './components/CashoutButton';
import { toast } from 'react-toastify';
import { CoinsIcon } from 'lucide-react';

function App() {
  const { 
    session, 
    credits, 
    loading, 
    spinning, 
    error, 
    initSession, 
    pullLever, 
    cashOut 
  } = useGameSession();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => { 
    if (!session && !loading) {
      initSession();
    }
  }, [session, loading, initSession]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    initSession();
  };

  const handleCashOut = async () => {
    try {
      const result = await cashOut();
      toast.success(`Successfully cashed out ${result.credits} credits!`);
    } catch (error) {
      toast.error('Failed to cash out. Try again!');
    }
  };

  if (error) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-4">
        <div className="bg-red-800/80 p-6 rounded-lg max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p className="mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-spin px-4 py-2"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="bg-purple-900/90 p-8 rounded-xl max-w-md w-full text-center border-4 border-yellow-400">
            <h2 className="text-4xl font-bold mb-6 text-yellow-400">Welcome to Vegas Jackpot!</h2>
            <p className="mb-6 text-lg">Try your luck with our virtual slot machine.</p>
            <button 
              onClick={handleLogin} 
              className="btn-spin w-full flex items-center justify-center space-x-2"
            > 
              <span>Start Playing</span>
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div className="flex justify-between items-center mb-4 bg-purple-950/80 p-4 rounded-lg border-2 border-yellow-500">
            <div className="flex items-center">
              <CoinsIcon className="text-yellow-400 mr-2" />
              <span className="text-xl font-bold">{credits} Credits</span>
            </div>
            <CashoutButton onCashOut={handleCashOut} />
          </div>
          
          <SlotMachine 
            spinning={spinning} 
            onSpin={pullLever} 
            disabled={spinning || credits < 1}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;