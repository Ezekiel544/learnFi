import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LandingPage } from './components/LandingPage';
import { SuccessPage } from './components/SuccessPage';
import { LeaderboardPage } from './components/LeaderboardPage';
import { Preloader } from './components/Preloader';

export type User = {
  id: string;
  name: string;
  email: string;
  referralCode: string;
  referredBy?: string;
  referralCount: number;
  createdAt: Date;
};

export type AppState = 'landing' | 'success' | 'leaderboard';

function App() {
  const [currentPage, setCurrentPage] = useState<AppState>('landing');
  const [isLoading, setIsLoading] = useState(true);
  const [pageTransition, setPageTransition] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Initial preloader
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handlePageChange = (page: AppState, user?: User) => {
    setPageTransition(true);
    
    setTimeout(() => {
      setCurrentPage(page);
      if (user) setCurrentUser(user);
      setPageTransition(false);
    }, 1000);
  };

  if (isLoading) {
    return <Preloader />;
  }

  if (pageTransition) {
    return <Preloader />;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {currentPage === 'landing' && (
        <LandingPage onNavigate={handlePageChange} />
      )}
      {currentPage === 'success' && currentUser && (
        <SuccessPage 
          user={currentUser} 
          onNavigate={handlePageChange} 
        />
      )}
      {currentPage === 'leaderboard' && (
        <LeaderboardPage onNavigate={handlePageChange} />
      )}
    </div>
  );
}

export default App;