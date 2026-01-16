import React from 'react';
import { motion } from 'framer-motion';
import './EntryScreen.css';

const EntryScreen = ({ onContinue }) => {
  return (
    <motion.section
      className="entry-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <div className="entry-content">
        <motion.h1
          className="entry-line"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1.5 }}
        >
          Some people stay without being asked.
        </motion.h1>
        
        <motion.div
          className="entry-button-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
        >
          <motion.button
            className="continue-button"
            onClick={onContinue}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Continue</span>
            <motion.div
              className="button-glow"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default EntryScreen;
