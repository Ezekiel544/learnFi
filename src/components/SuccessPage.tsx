import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Check, ArrowLeft, Share2 } from 'lucide-react';
import { Button } from './ui/button';
import { AppState, User } from '../App';

interface SuccessPageProps {
  user: User;
  onNavigate: (page: AppState) => void;
}

export const SuccessPage: React.FC<SuccessPageProps> = ({ user, onNavigate }) => {
  const [copied, setCopied] = useState(false);
  
  const referralLink = `${window.location.origin}?ref=${user.referralCode}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const shareViaWebAPI = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join LearnFi - Where Learning Meets Earning',
          text: 'Join me on LearnFi and start earning while you learn!',
          url: referralLink,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          {/* <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-12 h-12 text-white" />
          </div>
           */}
          <h1 className="text-4xl md:text-5xl mb-4 text-green-400">
            🎉 Congratulations!
          </h1>
          
          <p className="text-xl text-gray-300 mb-8">
            Welcome to LearnFi, {user.name}! You've successfully joined our waitlist.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-gray-900 border border-gray-700 rounded-lg p-8 mb-8"
        >
          <h2 className="text-1xl mb-6 text-blue-400">Your Referral Link</h2>
          
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 mb-6">
            <p className="text-gray-300 mb-2">Share this link and earn bonus points!</p>
            <div className="flex items-center justify-between bg-gray-700 p-3 rounded">
              <span className="text-blue-300 text-sm break-all mr-2">{referralLink}</span>
              <Button
                onClick={copyToClipboard}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 ml-2"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-600/20 border border-blue-500 p-4 rounded-lg">
              <h3 className="text-lg mb-2 text-blue-400">Your Referral Code</h3>
              <p className=" text-white">{user.referralCode}</p>
            </div>
            
            <div className="bg-green-600/20 border border-green-500 p-4 rounded-lg">
              <h3 className="text-lg mb-2 text-green-400">Bonus Points</h3>
              <p className="text-2xl text-white">{user.referralCount * 100}</p>
              <p className="text-sm text-gray-400">100 points per referral</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={shareViaWebAPI}
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share Link
            </Button>
            
            <Button
              onClick={() => onNavigate('leaderboard')}
              variant="outline"
              className="border-gray-600  hover:bg-gray-800"
            >
              View Leaderboard
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <h3 className="text-xl mb-4 text-blue-400">What's Next?</h3>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-900 border border-gray-700 p-4 rounded-lg">
              <div className="text-2xl mb-2">📧</div>
              <h4 className="mb-2">Stay Updated</h4>
              <p className="text-sm text-gray-400">Get notified about platform launch and updates</p>
            </div>
            
            <div className="bg-gray-900 border border-gray-700 p-4 rounded-lg">
              <div className="text-2xl mb-2">🚀</div>
              <h4 className="mb-2">Early Access</h4>
              <p className="text-sm text-gray-400">Be among the first to try LearnFi when we launch</p>
            </div>
            
            <div className="bg-gray-900 border border-gray-700 p-4 rounded-lg">
              <div className="text-2xl mb-2">🎁</div>
              <h4 className="mb-2">Bonus Rewards</h4>
              <p className="text-sm text-gray-400">Earn extra tokens for being an early supporter</p>
            </div>
          </div>

          <Button
            onClick={() => onNavigate('landing')}
            variant="outline"
            className="border-gray-600  hover:bg-gray-800"
          >
            {/* <ArrowLeft className="w-4 h-4 mr-2" /> */}
            Back to Home
          </Button>
        </motion.div>
      </div>
    </div>
  );
};