import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Copy, Check, Trophy, Users, Link as LinkIcon, Loader2, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { getUserByEmail } from '../services/firebaseService';
import type { AppState } from '../App';

interface UserData {
  id: string;
  name: string;
  email: string;
  referralCode: string;
  referralCount: number;
  rank: number;
}

interface UserLookupProps {
  onNavigate: (page: AppState) => void;
}

export const UserLookup: React.FC<UserLookupProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setUserData(null);

    try {
      if (!email.trim()) {
        throw new Error('Please enter your email address');
      }

      const user = await getUserByEmail(email.trim());

      if (!user) {
        throw new Error('No account found with this email address');
      }

      setUserData(user);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getReferralLink = () => {
    if (!userData) return '';
    return `${window.location.origin}?ref=${userData.referralCode}`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getReferralLink());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700"
        >
          {/* Back Button */}
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            {/* <span>Back to Home</span> */}
          </button>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Check Your Status
            </h1>
            <p className="text-gray-400">
              Enter your email to view your waitlist dashboard
            </p>
          </div>

          <form onSubmit={handleSearch} className="mb-8">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-white">
                  Email Address
                </Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="bg-gray-900/50 border-gray-600 text-white flex-1"
                    required
                  />
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Search className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>

              {error && (
                <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg">
                  {error}
                </div>
              )}
            </div>
          </form>

          {userData && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              {/* User Info Card */}
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Welcome back, {userData.name}!
                </h2>
                <div className="space-y-3 text-gray-300">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <span className="text-gray-400 flex-shrink-0">Email:</span>
                    <span className="font-medium break-all text-sm sm:text-base">{userData.email}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <span className="text-gray-400 flex-shrink-0">Username:</span>
                    <span className="font-medium break-words text-sm sm:text-base">{userData.name}</span>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Referral Count */}
                <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-xl p-6 border border-blue-500/30">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Users className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="text-gray-400 font-medium">Total Referrals</h3>
                  </div>
                  <p className="text-4xl font-bold text-white">
                    {userData.referralCount}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    {userData.referralCount === 1 ? 'person' : 'people'} joined through your link
                  </p>
                </div>

                {/* Leaderboard Rank */}
                <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 rounded-xl p-6 border border-yellow-500/30">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-yellow-500/20 rounded-lg">
                      <Trophy className="h-6 w-6 text-yellow-400" />
                    </div>
                    <h3 className="text-gray-400 font-medium">Your Rank</h3>
                  </div>
                  <p className="text-4xl font-bold text-white">
                    #{userData.rank}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    on the leaderboard
                  </p>
                </div>
              </div>

              {/* Referral Link */}
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <LinkIcon className="h-5 w-5 text-purple-400" />
                  </div>
                  <h3 className="text-white font-semibold">Your Referral Link</h3>
                </div>
                <div className="flex gap-2">
                  <Input
                    value={getReferralLink()}
                    readOnly
                    className="bg-gray-800/50 border-gray-600 text-gray-300 flex-1"
                  />
                  <Button
                    onClick={copyToClipboard}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-sm text-gray-400 mt-3">
                  Share this link with friends to earn more referrals and climb the leaderboard!
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};