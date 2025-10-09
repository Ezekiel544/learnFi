import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Trophy, Medal, Award, Crown, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { getLeaderboard } from '../services/firebaseService';
import { AppState, User } from '../App';

interface LeaderboardPageProps {
  onNavigate: (page: AppState) => void;
}

export const LeaderboardPage: React.FC<LeaderboardPageProps> = ({ onNavigate }) => {
  const [leaderboardData, setLeaderboardData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        setIsLoading(true);
        const users = await getLeaderboard();
        setLeaderboardData(users);
      } catch (err: any) {
        console.error('Error loading leaderboard:', err);
        setError(err.message || 'Failed to load leaderboard');
        
        // Fallback to mock data if Firebase fails
        const mockUsers: User[] = [
          {
            id: '1',
            name: 'Alex Johnson',
            email: 'alex@example.com',
            referralCode: 'ALEX123',
            referralCount: 25,
            createdAt: new Date('2024-01-15')
          },
          {
            id: '2',
            name: 'Sarah Williams',
            email: 'sarah@example.com',
            referralCode: 'SARAH456',
            referralCount: 18,
            createdAt: new Date('2024-01-18')
          },
          {
            id: '3',
            name: 'Mike Chen',
            email: 'mike@example.com',
            referralCode: 'MIKE789',
            referralCount: 15,
            createdAt: new Date('2024-01-20')
          }
        ];
        setLeaderboardData(mockUsers);
      } finally {
        setIsLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  // Sort users by referral count
  const sortedUsers = leaderboardData.sort((a, b) => b.referralCount - a.referralCount);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Crown className="w-6 h-6 text-yellow-400" />;
      case 1:
        return <Trophy className="w-6 h-6 text-gray-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <Award className="w-6 h-6 text-blue-400" />;
    }
  };

  const getRankBadge = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black';
      case 1:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-black';
      case 2:
        return 'bg-gradient-to-r from-amber-500 to-amber-700 text-white';
      default:
        return 'bg-gradient-to-r from-blue-500 to-blue-700 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Button
            onClick={() => onNavigate('landing')}
            // variant="outline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
          </Button>
          
          <h1 className="text-2xl text-blue-400">Leaderboard</h1>
          
          <div className="w-32"></div> {/* Spacer for centering */}
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 py-8">
        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-gray-900 border border-gray-700 p-6 rounded-lg text-center">
            <div className="text-3xl mb-2">👥</div>
            <h3 className="text-xl mb-2 text-blue-400">Total Users</h3>
            <p className="text-2xl">{sortedUsers.length}</p>
          </div>
          
          <div className="bg-gray-900 border border-gray-700 p-6 rounded-lg text-center">
            <div className="text-3xl mb-2">🔗</div>
            <h3 className="text-xl mb-2 text-green-400">Total Referrals</h3>
            <p className="text-2xl">{sortedUsers.reduce((sum, user) => sum + user.referralCount, 0)}</p>
          </div>
          
          <div className="bg-gray-900 border border-gray-700 p-6 rounded-lg text-center">
            <div className="text-3xl mb-2">🏆</div>
            <h3 className="text-xl mb-2 text-yellow-400">Top Referrer</h3>
            <p className="text-lg">{sortedUsers[0]?.name || 'No users yet'}</p>
          </div>
        </motion.div>

        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden"
        >
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-2xl text-blue-400">Top Referrers</h2>
            <p className="text-gray-400">Ranking based on successful referrals</p>
            {error && (
              <p className="text-sm text-red-400 mt-2">
                Using demo data - {error}
              </p>
            )}
          </div>

          <div className="divide-y divide-gray-700">
            {isLoading ? (
              <div className="p-12 text-center">
                <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin text-blue-400" />
                <p className="text-gray-400">Loading leaderboard...</p>
              </div>
            ) : (
              <>
                {sortedUsers.slice(0, 10).map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`p-6 flex items-center justify-between hover:bg-gray-800 transition-colors ${
                  index < 3 ? 'bg-gray-800/50' : ''
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getRankBadge(index)}`}>
                    <span className="font-bold">#{index + 1}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {getRankIcon(index)}
                    <div>
                      <h3 className="text-lg">{user.name}</h3>
                      <p className="text-sm text-gray-400">Code: {user.referralCode}</p>
                    </div>
                  </div>
                </div>
                     
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-md">{user.referralCount} referrals</p>
                      <p className="text-sm text-green-400">{user.referralCount * 100} points</p>
                    </div>
                    
                    {/* {index < 3 && (
                      <div className="text-2xl">
                        {index === 0 && '🥇'}
                        {index === 1 && '🥈'}
                        {index === 2 && '🥉'}
                      </div>
                    )} */}
                  </div>
                </div>
              </motion.div>
            ))}

                {sortedUsers.length === 0 && !isLoading && (
                  <div className="p-12 text-center text-gray-400">
                    <Trophy className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-xl mb-2">No users yet!</p>
                    <p>Be the first to join and top the leaderboard.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>

        {/* Achievement Levels */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 bg-gray-900 border border-gray-700 rounded-lg p-6"
        >
          <h3 className="text-xl mb-6 text-blue-400">Achievement Levels</h3>
          
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-800 rounded-lg">
              <div className="text-2xl mb-2">🥉</div>
              <h4 className="mb-2">Bronze</h4>
              <p className="text-sm text-gray-400">5+ referrals</p>
              <p className="text-green-400">500 bonus points</p>
            </div>
            
            <div className="text-center p-4 bg-gray-800 rounded-lg">
              <div className="text-2xl mb-2">🥈</div>
              <h4 className="mb-2">Silver</h4>
              <p className="text-sm text-gray-400">10+ referrals</p>
              <p className="text-green-400">1,000 bonus points</p>
            </div>
            
            <div className="text-center p-4 bg-gray-800 rounded-lg">
              <div className="text-2xl mb-2">🥇</div>
              <h4 className="mb-2">Gold</h4>
              <p className="text-sm text-gray-400">20+ referrals</p>
              <p className="text-green-400">2,500 bonus points</p>
            </div>
            
            <div className="text-center p-4 bg-gray-800 rounded-lg">
              <div className="text-2xl mb-2">💎</div>
              <h4 className="mb-2">Diamond</h4>
              <p className="text-sm text-gray-400">50+ referrals</p>
              <p className="text-green-400">10,000 bonus points</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};