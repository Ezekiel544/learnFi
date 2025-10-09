import React from 'react';
import { motion } from 'motion/react';
import logo from './figma/logo.png'
export const Preloader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center space-x-2">
          <div className="w-8 h-8 rounded-full"><img src={logo} alt="" srcset=""   className="w-8 h-8 rounded-full"/></div>
            <span className="text-white text-2xl font-medium">LearnFi</span>
          </div>
        </motion.div>
        
        <div className="flex space-x-2 justify-center">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-3 h-3 bg-blue-500 rounded-full"
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.2
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};