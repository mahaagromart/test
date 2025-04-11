// pages/search.js
import { useState, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';

// Debounce function to limit how often we call the API
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

export default function MobileSearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debounced search functionjj
  const debouncedSearch = debounce(async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error('Search failed');
      }
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, 300); // 300ms delay

  // Trigger search when query changes
  useEffect(() => {
    debouncedSearch(query);
    
    // Cleanup function
    return () => {
      // Cancel any pending debounced calls if component unmounts
      debouncedSearch.cancel?.();
    };
  }, [query]);

  // Optional: Handle form submission (if you want to keep it)
  const handleSubmit = (e) => {
    e.preventDefault();
    debouncedSearch(query);
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-green-700 mb-8">Search Page</h1>
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="flex-grow p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-5 py-3 flex items-center gap-2 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <Search size={20} />
              )}
            </button>
          </div>
        </form>
        
        <div>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="animate-spin text-green-600" size={32} />
            </div>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : results.length > 0 ? (
            results.map((result, index) => (
              <div key={index} className="bg-black p-5 mb-4 rounded-xl shadow text-white">
                <h2 className="text-2xl font-semibold text-green-400">{result.title}</h2>
                <p className="text-gray-300">{result.description}</p>
              </div>
            ))
          ) : query ? (
            <p className="text-center text-gray-500">No results found.</p>
          ) : (
            <p className="text-center text-gray-500">Start typing to search</p>
          )}
        </div>
      </div>
    </div>
  );
}