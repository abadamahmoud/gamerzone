"use client"

import { useState } from 'react';
import axios from 'axios';

const apiKey = process.env.SMMRY_API_KEY as string || 'DEECD9747F'; // Ensure fallback or handle undefined safely
const SMMRY_API_URL = 'https://api.smmry.com';

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
      // Ensure API key is available
      if (!apiKey) {
        throw new Error('SMMRY API Key not found. Ensure it is set in environment variables.');
      }

      // Make sure URL is provided
      if (!url) {
        throw new Error('URL is required.');
      }

      const response = await axios.get(SMMRY_API_URL, {
        params: {
          SM_API_KEY: apiKey,
          SM_URL: url,
        },
      });

      // Check for errors from SMMRY API
      if (response.data.sm_api_error) {
        throw new Error(response.data.sm_api_error);
      }

      // Update state with summary data
      setTitle(response.data.sm_api_title || '');
      setSummary(response.data.sm_api_content || '');
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while summarizing the article.');
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
