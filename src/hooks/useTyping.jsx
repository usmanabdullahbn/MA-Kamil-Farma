import { useState, useEffect } from 'react';

/**
 * Hook for typing animation effect
 * @param {string} text - Text to type
 * @param {number} speed - Speed of typing in milliseconds per character (default: 50)
 * @param {boolean} enabled - Whether animation should play (default: true)
 * @returns {string} - Partially typed text
 */
export function useTyping(text, speed = 50, enabled = true) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (!enabled) {
      setDisplayedText(text);
      return;
    }

    let index = 0;
    setDisplayedText('');

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.substring(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, enabled]);

  return displayedText;
}
