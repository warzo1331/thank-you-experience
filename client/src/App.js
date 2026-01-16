import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import EntryScreen from './components/EntryScreen';
import DiscoverySection from './components/DiscoverySection';
import StorytellingSection from './components/StorytellingSection';
import FinalReveal from './components/FinalReveal';
import ParticleBackground from './components/ParticleBackground';
import FloatingMessages from './components/FloatingMessages';
import './App.css';


const ACCESS_TOKEN = 'special-moment-2024'; // Change this to your desired token

function App() {
  const [currentSection, setCurrentSection] = useState('entry');
  const [messages, setMessages] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse movement for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Fetch messages on mount
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/messages`, {
        headers: {
          'x-access-token': ACCESS_TOKEN,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const handleMessageSubmit = async (text) => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [data.data, ...prev]);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to submit message:', error);
      return false;
    }
  };

  const handleContinue = () => {
    if (currentSection === 'entry') {
      setCurrentSection('discovery');
    } else if (currentSection === 'discovery') {
      setCurrentSection('storytelling');
    } else if (currentSection === 'storytelling') {
      setCurrentSection('final');
    }
  };

  return (
    <div className="app">
      <ParticleBackground mousePosition={mousePosition} />
      
      <AnimatePresence mode="wait">
        {currentSection === 'entry' && (
          <EntryScreen key="entry" onContinue={handleContinue} />
        )}
        {currentSection === 'discovery' && (
          <DiscoverySection key="discovery" onContinue={handleContinue} />
        )}
        {currentSection === 'storytelling' && (
          <StorytellingSection key="storytelling" onContinue={handleContinue} />
        )}
        {currentSection === 'final' && (
          <FinalReveal 
            key="final" 
            onMessageSubmit={handleMessageSubmit}
            messages={messages}
          />
        )}
      </AnimatePresence>

      {currentSection === 'final' && messages.length > 0 && (
        <FloatingMessages messages={messages} />
      )}
    </div>
  );
}

export default App;
