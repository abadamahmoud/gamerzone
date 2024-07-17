"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const apiKey = process.env.NEXT_PUBLIC_SMMRY_API_KEY || "DEECD9747F";
const SMMRY_API_URL = "https://api.smmry.com";

const ArticlePage = () => {
  const [summary, setSummary] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [reduction, setReduction] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const link = searchParams.get("link");

  const handleSummarize = async (link: string) => {
    try {
      setLoading(true);
      setError("");

      if (!apiKey) {
        throw new Error("SMMRY API Key not found. Ensure it is set in environment variables.");
      }

      if (!link) {
        throw new Error("There is no URL.");
      }

      const response = await axios.get(SMMRY_API_URL, {
        params: {
          SM_API_KEY: apiKey,
          SM_URL: link,
        },
      });
      console.log("Response:", response.data);

    

      if (response.data.sm_api_error) {
        throw new Error(response.data.sm_api_error);
      }

      setTitle(response.data.sm_api_title || "");
      setSummary(response.data.sm_api_content || "");
      setReduction(response.data.sm_api_content_reduced || "")
    } catch (error: any) {
      console.error("Error:", error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data.error : error.message || "Failed to summarize article.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (link) {
      handleSummarize(link);
    }
  }, [link]);

  return (
    <div className="container border rounded-sm mt-24 mx-auto max-w-xl lg:max-w-3xl p-4">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="flex justify-between items-center ">
            <a href="/"  rel="noopener noreferrer"        className="text-blue-500 block border w-fit p-2 mt-2">
              Back to Homepage
            
            </a>
          {link && (
            <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 block border w-fit p-2 mt-2">
              Read Full Article
            </a>
          )}
          </div>
          <h1 className="text-2xl mt-8 font-bold mb-4">{title}</h1> <hr/>
          {summary && <><p className="text-lg px-6 my-2">{summary}</p> <hr/>
           <p className="mt-2">Content reduced by: {reduction}</p></>}
          {error && <p className="text-red-500 mt-2">{error}</p>}
          
        </>
      )}
    </div>
  );
};

export default ArticlePage;
