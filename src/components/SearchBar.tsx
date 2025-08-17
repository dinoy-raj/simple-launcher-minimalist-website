import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [searchEngine, setSearchEngine] = useState('google');

  const searchEngines = {
    google: 'https://www.google.com/search?q=',
    bing: 'https://www.bing.com/search?q=',
    duckduckgo: 'https://duckduckgo.com/?q=',
    yahoo: 'https://search.yahoo.com/search?p='
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Check if it's a URL
      if (query.includes('.') && !query.includes(' ')) {
        window.open(query.startsWith('http') ? query : `https://${query}`, '_blank');
      } else {
        window.open(`${searchEngines[searchEngine as keyof typeof searchEngines]}${encodeURIComponent(query)}`, '_blank');
      }
      setQuery('');
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative group">
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <Search className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the web or enter a URL..."
          className="w-full h-14 pl-12 pr-32 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl"
          autoFocus
        />

        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
          <select
            value={searchEngine}
            onChange={(e) => setSearchEngine(e.target.value)}
            className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="google">Google</option>
            <option value="bing">Bing</option>
            <option value="duckduckgo">DuckDuckGo</option>
            <option value="yahoo">Yahoo</option>
          </select>
          
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;