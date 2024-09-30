'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';

interface ShowMoreTextProps {
  text: string;
  maxRows: number; // Maximum number of rows to display initially
}

const ShowMoreText = ({ text, maxRows }: ShowMoreTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const lineHeight = parseFloat(
        getComputedStyle(textRef.current).lineHeight,
      );
      const maxHeight = lineHeight * maxRows;
      if (textRef.current.scrollHeight > maxHeight) {
        setIsTruncated(true);
      }
    }
  }, [text, maxRows]);

  return (
    <div className="flex flex-wrap text-lg">
      <div
        ref={textRef}
        style={{
          maxHeight: isExpanded ? 'none' : `${maxRows * 1.5}em`,
          overflow: 'hidden',
        }}
        className="relative "
      >
        {text}
      </div>
      {isTruncated && (
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-1 inline-block p-0 text-lg text-gray-600 hover:bg-transparent dark:text-slate-400"
        >
          {isExpanded ? ' Show Less' : '...more'}
        </Button>
      )}
    </div>
  );
};

export default ShowMoreText;
