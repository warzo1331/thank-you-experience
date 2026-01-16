import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './FloatingMessages.css';

const FloatingMessages = ({ messages }) => {
  const [displayedMessages, setDisplayedMessages] = useState([]);

  useEffect(() => {
    if (messages.length > 0) {
      // Show messages one by one with delay
      messages.forEach((msg, index) => {
        setTimeout(() => {
          setDisplayedMessages((prev) => [...prev, msg]);
        }, index * 2000);
      });
    }
  }, [messages]);

  const getRandomPosition = () => ({
    left: `${Math.random() * 80 + 10}%`,
    top: `${Math.random() * 80 + 10}%`,
    rotation: (Math.random() - 0.5) * 10,
  });

  return (
    <div className="floating-messages-container">
      {displayedMessages.map((message, index) => {
        const position = getRandomPosition();
        return (
          <motion.div
            key={message._id || index}
            className="floating-message"
            initial={{
              opacity: 0,
              scale: 0.8,
              x: position.left,
              y: position.top,
              rotate: position.rotation,
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0.8, 1, 1, 0.8],
              y: [position.top, `${parseFloat(position.top) - 20}%`],
            }}
            transition={{
              duration: 8,
              delay: index * 0.5,
              ease: 'easeInOut',
            }}
            style={{
              left: position.left,
              top: position.top,
            }}
          >
            <div className="message-bubble">
              {message.text}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingMessages;
