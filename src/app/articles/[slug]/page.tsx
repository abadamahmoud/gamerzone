"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const apiKey = process.env.SMMRY_API_KEY! as string || "DEECD9747F";
const SMMRY_API_URL = "https://api.smmry.com";

const ArticlePage = () => {
  const [summary, setSummary] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [reduction, setReduction] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const link = searchParams.get("link");

  const handleSummarize = async (link: string) => {
    try {
      setLoading(true);
      setError(null);

      if (!apiKey) {
        throw new Error("SMMRY API Key not found. Ensure it is set in environment variables.");
      }

      if (!link) {
        throw new Error("No URL provided for summarization.");
      }

      const response = await axios.get(SMMRY_API_URL, {
        params: {
          SM_API_KEY: apiKey,
          SM_URL: link,
        },
      });

      if (response.data.sm_api_error) {
        throw new Error(`SMMRY API error: ${response.data.sm_api_message}`);
      }

      setTitle(response.data.sm_api_title || "No title available");
      setSummary(response.data.sm_api_content || "No summary available");
      setReduction(response.data.sm_api_content_reduced || "Unknown reduction");
    } catch (error: any) {
      console.error("Error:", error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data.sm_api_message : error.message || "Failed to summarize article.");
      !error && setError("Failed to summarize article")
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (link) {
      handleSummarize(link);
    } else {
      setError("No URL provided in the query parameters.");
      setLoading(false); 
    }
  }, [link]);

  return (
    <div className="container mb-20 min-h-[80%] h-auto md:mb-0 mt-16 mx-auto max-w-xl lg:max-w-3xl">
      <div className="flex justify-between items-center ">
        <a href="/" rel="noopener noreferrer" className="text-blue-500 block border w-fit p-2 mt-2">
          Back to Homepage
        </a>
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 block border w-fit p-2 mt-2">
            Read Full Article
          </a>
        )}
      </div>
      {loading ? (
        <p className="mt-4 ml-2 dark:text-gray-200 text-xl text-gray-800">Loading Summarized Article...</p>
      ) : (
        <>
          {title && <h1 className="text-2xl mt-8 font-bold mb-4">{title}</h1>}
          <hr />
          {summary && (
            <>
              <p className="text-lg px-6 my-2">{summary}</p>
              <hr />
              <p className="mt-2">Content reduced by: {reduction}</p>
            </>
          )}
          {error && <p className="text-red-500 capitalize text-lg mt-2">Error: {error.toLocaleLowerCase()}</p>}
        </>
      )}
    </div>
  );
};

export default ArticlePage;
