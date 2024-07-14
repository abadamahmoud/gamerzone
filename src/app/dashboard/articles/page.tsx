// pages/summarize-url.tsx

import { useState } from 'react';
import axios from 'axios';

export default function SummarizeURL() {
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSummarize = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/summarize-url', { url });
      setSummary(response.data.summary);
      setTitle(response.data.title);
    } catch (error) {
      setError('Error summarizing text');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Article Summarizer from URL</h1>
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter the URL here..."
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSummarize}
        disabled={loading}
      >
        {loading ? 'Summarizing...' : 'Summarize'}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {summary && (
        <div className="mt-4 p-4 border border-gray-300 rounded">
          <h2 className="text-xl mb-2">{title}</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}
