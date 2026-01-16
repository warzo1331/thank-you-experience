import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './MessageForm.css';

const MessageForm = ({ onSubmit, onCancel }) => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim().length === 0) return;

    setIsSubmitting(true);
    const success = await onSubmit(message.trim());
    setIsSubmitting(false);

    if (success) {
      setMessage('');
    }
  };

  return (
    <motion.form
      className="message-form"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="form-group">
        <textarea
          className="message-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your message..."
          rows="4"
          maxLength={500}
          disabled={isSubmitting}
        />
        <div className="char-count">{message.length}/500</div>
      </div>

      <div className="form-actions">
        <motion.button
          type="button"
          className="cancel-button"
          onClick={onCancel}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isSubmitting}
        >
          Cancel
        </motion.button>
        <motion.button
          type="submit"
          className="submit-button"
          disabled={isSubmitting || message.trim().length === 0}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isSubmitting ? 'Saving...' : 'Save'}
        </motion.button>
      </div>
    </motion.form>
  );
};

export default MessageForm;
