import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const TimeDisplay: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-4">
        <Clock className="w-6 h-6 text-gray-400 mr-2" />
        <time className="text-5xl md:text-6xl font-light text-gray-900 dark:text-white tabular-nums">
          {formatTime(time)}
        </time>
      </div>
      <div className="text-lg text-gray-600 dark:text-gray-400">
        {formatDate(time)}
      </div>
    </div>
  );
};

export default TimeDisplay;