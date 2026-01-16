import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MessageForm from './MessageForm';
import './FinalReveal.css';

const FinalReveal = ({ onMessageSubmit, messages }) => {
  const [showForm, setShowForm] = useState(false);
  const [messageSubmitted, setMessageSubmitted] = useState(false);

  const handleMessageSubmit = async (text) => {
    const success = await onMessageSubmit(text);
    if (success) {
      setMessageSubmitted(true);
      setShowForm(false);
    }
    return success;
  };

  return (
    <motion.section
      className="final-reveal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <div className="final-container">
        <motion.div
          className="final-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.5 }}
        >
          <motion.h1
            className="final-title"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            Thank You
          </motion.h1>

          <motion.p
            className="final-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1.5 }}
          >
            For being you.
            <br />
            For staying.
            <br />
            For everything.
          </motion.p>

          <AnimatePresence>
            {!showForm && !messageSubmitted && (
              <motion.div
                className="final-invitation"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 3.5, duration: 1 }}
              >
                <p className="invitation-text">
                  If you'd like, leave a small message below.
                </p>
                <motion.button
                  className="message-button"
                  onClick={() => setShowForm(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Leave a Message
                </motion.button>
              </motion.div>
            )}

            {showForm && (
              <motion.div
                className="form-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <MessageForm
                  onSubmit={handleMessageSubmit}
                  onCancel={() => setShowForm(false)}
                />
              </motion.div>
            )}

            {messageSubmitted && (
              <motion.div
                className="submission-confirmation"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p>Your message has been saved.</p>
                <p className="confirmation-subtext">It will always be here.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FinalReveal;
