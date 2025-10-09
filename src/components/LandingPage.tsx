import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Navbar } from './Navbar';
import { WaitlistModal } from './WaitlistModal';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { AppState, User } from '../App';

interface LandingPageProps {
  onNavigate: (page: AppState, user?: User) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [waitlistForm, setWaitlistForm] = useState({
    firstName: '',
    email: ''
  });

  const handleModalSuccess = (user: User) => {
    onNavigate('success', user);
  };

  const handleQuickJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    // For the quick join form, open the modal for complete signup
    setIsModalOpen(true);
  };

  const coreFeatures = [
    {
      title: 'Learn-to-Earn Rewards',
      description: 'Every lesson, quiz, or activity that are completed will earn you tokens.',
      icon: '📚'
    },
    {
      title: 'NFT-Based Content',
      description: 'All course and educational materials will be created as unique NFTs.',
      icon: '🎯'
    },
    {
      title: 'Blockchain Credentials',
      description: 'Certificates issued as NFTs for instant global verification.',
      icon: '🔗'
    },
    {
      title: 'Deflationary Tokenomics',
      description: 'Ecosystem burns will create scarcity to maintain an sustainable ecosystem.',
      icon: '🔥'
    }
  ];

  const whyLearnFi = [
    {
      title: 'For Learners',
      description: 'LearnFi allows the ability to gain knowledge while earning tokens from their courses, certifications, or based within the ecosystem.',
      icon: '👨‍🎓'
    },
    {
      title: 'For Creators',
      description: 'LearnFi allows the ability for creators to protect and monetize educational content as NFTs, ensuring ownership and continuous revenue.',
      icon: '👨‍💻'
    },
    {
      title: 'For Institutions & Employers',
      description: 'LearnFi allows the ability to access verified blockchain certificates, making skill verification fast and reliable.',
      icon: '🏢'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar 
        onJoinWaitlist={() => setIsModalOpen(true)}
        onNavigateToLeaderboard={() => onNavigate('leaderboard')}
      />

      {/* Hero Section */}
      <section className="py-16  px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl mb-4 text-blue-400"
          >
            Where Learning Meets Earning
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto space-y-4 mb-12"
          >
            <p className="text-lg text-blue-300">
              Education is powerful, but in today's world, it often comes expensive, inaccessible and hard to 
              verify. LearnFi changes this by combining education, blockchain and decentralized finance
            </p>
            <p className="text-lg text-blue-300">
              into a single ecosystem that rewards both learners and creators.
            </p>
            <p className="text-lg text-blue-300">
              LearnFi is a learn-to-earn platform where users are rewarded for engaging with 
              educational content and creators are empowered to monetize their knowledge through 
              blockchain technology. By leveraging Web3 so secure, LearnFi builds a sustainable and 
              transparent ecosystem for knowledge.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Features Section */}
      <section id="features" className=" px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl text-center mb-16 text-blue-400"
          >
            Core Features
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {coreFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-blue-600 p-6 rounded-lg border border-blue-500"
              >
             <div className="flex flex-col sm:flex-row items-start sm:space-x-4 space-y-4 sm:space-y-0">
  <div className="text-2xl">{feature.icon}</div>
  <div className="flex-1">
    <h3 className="text-xl mb-2 text-white">{feature.title}</h3>
    <p className="text-blue-100">{feature.description}</p>
  </div>
</div>

              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why LearnFi Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl text-center mb-16 text-blue-400"
          >
            Why LearnFi?
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {whyLearnFi.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-900 border border-gray-700 p-6 rounded-lg text-center"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-xl mb-4 text-blue-400">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Waitlist Section */}
      {/* <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-blue-600 rounded-lg p-8 text-center"
          >
            <h2 className="text-3xl mb-8 text-white">Join Waitlist</h2>
            
            <form onSubmit={handleQuickJoin} className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <Input
                type="text"
                placeholder="First name"
                value={waitlistForm.firstName}
                onChange={(e) => setWaitlistForm({ ...waitlistForm, firstName: e.target.value })}
                className="bg-white text-black border-none max-w-xs"
                required
              />
              <Input
                type="email"
                placeholder="Email address"
                value={waitlistForm.email}
                onChange={(e) => setWaitlistForm({ ...waitlistForm, email: e.target.value })}
                className="bg-white text-black border-none max-w-xs"
                required
              />
              <Button 
                type="submit"
                className="bg-black hover:bg-gray-800 text-white px-8"
              >
                Submit
              </Button>
            </form>
          </motion.div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="bg-blue-600 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-white rounded-full"></div>
                <span className="text-white text-lg">LearnFi</span>
              </div>
              <p className="text-blue-100 mb-4 text-sm">Empowering education through decentralized finance.</p>
              <div className="flex space-x-4">
                <div className="w-6 h-6 bg-black rounded-full"></div>
                <div className="w-6 h-6 bg-black rounded-full"></div>
                <div className="w-6 h-6 bg-black rounded-full"></div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white mb-4 text-sm font-medium">Support</h4>
              <div className="space-y-2 text-blue-100">
                <p className="text-sm">Help</p>
                <p className="text-sm">FAQ</p>
                <p className="text-sm">Contact</p>
              </div>
            </div>
            
          <div>
  <h4 className="text-white mb-4 text-sm font-medium">Talk to Us</h4>
  <div className="space-y-2 text-blue-100">
    <a href="http://X.com/learn__Fi" target="_blank" rel="noopener noreferrer">
      <p className="text-sm hover:text-white transition">Twitter</p>
    </a>
    <a href="https://discord.gg/hYQa64Xt" target="_blank" rel="noopener noreferrer">
      <p className="text-sm hover:text-white transition">Discord</p>
    </a>
    
  </div>
</div>

<div>
  <h4 className="text-white mb-4 text-sm font-medium">Resources</h4>
  <div className="space-y-2 text-blue-100">
    <a href="https://eu.docworkspace.com/d/sIMmq5JjYAZu2uMYG?sa=601.1123" target="_blank" rel="noopener noreferrer">
      <p className="text-sm hover:text-white transition">Documentation</p>
    </a>
    <a href="https://github.com/Ezekiel544" target="_blank" rel="noopener noreferrer">
      <p className="text-sm hover:text-white transition">Developer</p>
    </a>
  </div>
</div>

          </div>
        </div>
      </footer>

      <WaitlistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
};