import React from 'react';
import { ExternalLink } from 'lucide-react';

interface QuickLink {
  name: string;
  url: string;
  icon: string;
  color: string;
}

const QuickLinks: React.FC = () => {
  const links: QuickLink[] = [
    { name: 'Gmail', url: 'https://gmail.com', icon: '📧', color: 'from-red-500 to-red-600' },
    { name: 'YouTube', url: 'https://youtube.com', icon: '📺', color: 'from-red-600 to-red-700' },
    { name: 'GitHub', url: 'https://github.com', icon: '💻', color: 'from-gray-700 to-gray-800' },
    { name: 'Twitter', url: 'https://twitter.com', icon: '🐦', color: 'from-blue-500 to-blue-600' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: '💼', color: 'from-blue-600 to-blue-700' },
    { name: 'Reddit', url: 'https://reddit.com', icon: '🔗', color: 'from-orange-500 to-orange-600' },
    { name: 'Wikipedia', url: 'https://wikipedia.org', icon: '📚', color: 'from-gray-600 to-gray-700' },
    { name: 'Amazon', url: 'https://amazon.com', icon: '🛒', color: 'from-yellow-600 to-orange-600' }
  ];

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6 text-center">
        Quick Access
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {links.map((link) => (
          <button
            key={link.name}
            onClick={() => handleLinkClick(link.url)}
            className="group relative flex flex-col items-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 hover:bg-white/80 dark:hover:bg-gray-800/80 hover:shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <div className={`w-12 h-12 bg-gradient-to-r ${link.color} rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-200`}>
              <span className="text-xl">{link.icon}</span>
            </div>
            
            <span className="text-sm font-medium text-gray-900 dark:text-white mb-1">
              {link.name}
            </span>
            
            <ExternalLink className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;