'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';

interface ShowMoreTextProps {
  text: string;
  maxLength: number; // Maximum length of text to display initially
}

const ShowMoreText = ({ text, maxLength }: ShowMoreTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const textContainerRef = useRef<HTMLSpanElement | null>(null);
  const previousScrollPositionRef = useRef<number>(0);

  // Determine whether to show truncated or full text
  const displayedText =
    isExpanded || text.length <= maxLength
      ? text
      : `${text.slice(0, maxLength)}`;

  useEffect(() => {
    if (isExpanded && textContainerRef.current) {
      textContainerRef.current.focus();
    } else if (!isExpanded) {
      window.scrollTo(0, previousScrollPositionRef.current);
    }
  }, [isExpanded]);

  const handleButtonClick = () => {
    if (!isExpanded) {
      previousScrollPositionRef.current = window.scrollY;
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <span className="text-lg">
      <span ref={textContainerRef} tabIndex={-1}>
        {displayedText}
        {text.length > maxLength && (
          <Button
            variant="ghost"
            onClick={handleButtonClick}
            className="ml-1 inline-block p-0 text-lg text-gray-600 hover:bg-transparent"
          >
            {isExpanded ? ' Show Less' : '...more'}
          </Button>
        )}
      </span>
    </span>
  );
};

export default ShowMoreText;
