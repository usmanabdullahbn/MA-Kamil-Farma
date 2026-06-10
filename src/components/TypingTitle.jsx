import { useTyping } from '../hooks/useTyping';

/**
 * TypingTitle Component
 * Displays text with a typing animation effect
 */
export function TypingTitle({ text, speed = 30, className = '' }) {
  const displayedText = useTyping(text, speed, true);
  
  return (
    <h1 className={className}>
      {displayedText}
      {displayedText.length < text.length && <span className="typing-cursor">|</span>}
    </h1>
  );
}
