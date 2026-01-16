import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './DiscoverySection.css';

const DiscoverySection = ({ onContinue }) => {
  const [revealed, setRevealed] = useState([]);
  const [canContinue, setCanContinue] = useState(false);

  const discoveries = [
    { id: 1, text: "You were calm when everything else was noise." },
    { id: 2, text: "Your presence made the ordinary feel special." },
    { id: 3, text: "You listened when words weren't enough." },
  ];

  const handleReveal = (id) => {
    if (!revealed.includes(id)) {
      setRevealed([...revealed, id]);
      if (revealed.length + 1 === discoveries.length) {
        setTimeout(() => setCanContinue(true), 2000);
      }
    }
  };

  return (
    <motion.section
      className="discovery-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="discovery-container">
        <motion.h2
          className="discovery-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Discover
        </motion.h2>

        <div className="discoveries-grid">
          {discoveries.map((discovery, index) => (
            <motion.div
              key={discovery.id}
              className={`discovery-card ${revealed.includes(discovery.id) ? 'revealed' : ''}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.3, duration: 0.8 }}
              whileHover={{ scale: 1.05, y: -5 }}
              onClick={() => handleReveal(discovery.id)}
            >
              <AnimatePresence>
                {revealed.includes(discovery.id) ? (
                  <motion.p
                    className="discovery-text"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    {discovery.text}
                  </motion.p>
                ) : (
                  <motion.div
                    className="discovery-placeholder"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="hover-hint">Hover or click</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {canContinue && (
            <motion.div
              className="discovery-continue"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
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
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default DiscoverySection;
