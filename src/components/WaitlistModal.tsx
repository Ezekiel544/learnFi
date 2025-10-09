import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { addUserToWaitlist, checkEmailExists } from '../services/firebaseService';
import type { User } from '../App';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User) => void;
}

export const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Validate form data
      if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
        throw new Error('Please fill in all fields');
      }

      if (formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      // Check if email already exists
      const emailExists = await checkEmailExists(formData.email);
      if (emailExists) {
        throw new Error('An account with this email already exists');
      }
      
      // Check if user was referred (from URL params)
      const urlParams = new URLSearchParams(window.location.search);
      const referredBy = urlParams.get('ref');
      
      // Add user to waitlist using Firebase
      const userData = await addUserToWaitlist(
        formData.name.trim(),
        formData.email.trim(),
        formData.password,
        referredBy || undefined
      );

      onSuccess(userData);
      onClose();
      
      // Reset form
      setFormData({ name: '', email: '', password: '' });
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gray-900 rounded-lg p-6 w-full max-w-md border border-gray-700"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl text-white">Join the Waitlist</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-white">Full Name</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-gray-800 border-gray-600 text-white"
              required
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-white">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-gray-800 border-gray-600 text-white"
              required
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-white">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="bg-gray-800 border-gray-600 text-white"
              required
              minLength={6}
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              'Submit'
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};