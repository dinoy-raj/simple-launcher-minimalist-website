import React, { useState, useEffect } from 'react';
import { Plus, X, ExternalLink, Edit3 } from 'lucide-react';

interface Shortcut {
  id: string;
  name: string;
  url: string;
}

const Shortcuts: React.FC = () => {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>(() => {
    const saved = localStorage.getItem('customShortcuts');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', url: '' });

  useEffect(() => {
    localStorage.setItem('customShortcuts', JSON.stringify(shortcuts));
  }, [shortcuts]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.url.trim()) return;

    let url = formData.url.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    if (editingId) {
      setShortcuts(prev => prev.map(shortcut => 
        shortcut.id === editingId 
          ? { ...shortcut, name: formData.name.trim(), url }
          : shortcut
      ));
      setEditingId(null);
    } else {
      const newShortcut: Shortcut = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        url
      };
      setShortcuts(prev => [...prev, newShortcut]);
    }

    setFormData({ name: '', url: '' });
    setIsAdding(false);
  };

  const handleEdit = (shortcut: Shortcut) => {
    setFormData({ name: shortcut.name, url: shortcut.url });
    setEditingId(shortcut.id);
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    setShortcuts(prev => prev.filter(shortcut => shortcut.id !== id));
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({ name: '', url: '' });
  };

  const openShortcut = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Your Shortcuts
        </h3>
        
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm">Add Shortcut</span>
          </button>
        )}
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Shortcut name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-900 dark:text-white"
              required
            />
            <input
              type="url"
              placeholder="Website URL"
              value={formData.url}
              onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
              className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-900 dark:text-white"
              required
            />
          </div>
          
          <div className="flex space-x-3">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              {editingId ? 'Update' : 'Add'} Shortcut
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500/50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {shortcuts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {shortcuts.map((shortcut) => (
            <div
              key={shortcut.id}
              className="group relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 dark:border-gray-700 hover:bg-white/80 dark:hover:bg-gray-800/80 hover:shadow-lg transition-all duration-200"
            >
              <button
                onClick={() => openShortcut(shortcut.url)}
                className="w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-lg"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <ExternalLink className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 dark:text-white truncate">
                      {shortcut.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {new URL(shortcut.url).hostname}
                    </p>
                  </div>
                </div>
              </button>
              
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-1">
                <button
                  onClick={() => handleEdit(shortcut)}
                  className="p-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs transition-colors duration-200"
                >
                  <Edit3 className="w-3 h-3" />
                </button>
                <button
                  onClick={() => handleDelete(shortcut.id)}
                  className="p-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs transition-colors duration-200"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : !isAdding && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            No custom shortcuts yet
          </p>
          <button
            onClick={() => setIsAdding(true)}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            Add your first shortcut
          </button>
        </div>
      )}
    </div>
  );
};

export default Shortcuts;