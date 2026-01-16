import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './StorytellingSection.css';

const StorytellingSection = ({ onContinue }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);

  const fullText = "This was made quietly. Just like you stayed. Without fanfare, without expectation. You were there. And that was enough.";

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 50); // Typewriter speed

      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => setShowButton(true), 1000);
    }
  }, [currentIndex, fullText]);

  return (
    <motion.section
      className="storytelling-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="storytelling-container">
        <motion.div
          className="storytelling-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <p className="typewriter-text">
            {displayedText}
            <motion.span
              className="cursor"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              |
            </motion.span>
          </p>
        </motion.div>

        {showButton && (
          <motion.div
            className="storytelling-continue"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.button
              className="continue-button"
              onClick={onContinue}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default StorytellingSection;
