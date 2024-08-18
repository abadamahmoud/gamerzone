import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;
const HUGGING_FACE_API_URL = process.env.HUGGING_FACE_API_URL;

export async function POST(request: Request) {
  try {
    const { link } = await request.json();

    if (!HUGGING_FACE_API_KEY) {
      return NextResponse.json({ error: "Hugging Face API Key not found. Ensure it is set in environment variables." }, { status: 500 });
    }

    if (!link) {
      return NextResponse.json({ error: "No URL provided for summarization." }, { status: 400 });
    }

    // Fetch the article content from the provided link
    const articleResponse = await axios.get(link);
    const $ = cheerio.load(articleResponse.data);

    // Extract the main content of the article
    let articleText = $('article').text() || $('main').text() || $('body').text();

    // Remove any unnecessary elements
    articleText = articleText
      .replace(/(<([^>]+)>)/gi, '') // Remove any remaining HTML tags
      .replace(/\n\s*\n/g, '\n') // Remove multiple newlines
      .replace(/\s{2,}/g, ' ') // Replace multiple spaces with a single space
      .replace(/http[s]?:\/\/[^\s]*/gi, '') // Remove URLs
      .replace(/[^\w\s.,!?]/gi, '') // Remove special characters except for punctuation
      .replace(/(?:\bPublished\b|\bUpdated\b).*/gi, '') // Remove dates (basic removal, can be customized)
      .replace(/\bBy\b.*(?:\n|\r\n)/gi, '') // Remove author information
      .replace(/(Photo|Image|Screenshot|Video).*\n/gi, ''); // Remove captions like "Photo:", "Image:", etc.

    articleText = articleText.trim(); // Final trim to remove leading/trailing spaces

    if (!articleText) {
      return NextResponse.json({ error: "Could not extract article text. Please check the URL or content structure." }, { status: 400 });
    }

    // Calculate the original text length
    const originalTextLength = articleText.length;

    // Handle text length
    const maxInputLength = 3000; // Adjust as needed for your use case
    let truncatedText = articleText;

    if (truncatedText.length > maxInputLength) {
      // Truncate text at the last sentence before reaching maxInputLength
      const lastSentenceEnd = truncatedText.lastIndexOf('.', maxInputLength);
      truncatedText = truncatedText.substring(0, lastSentenceEnd + 1);
    }

    // Send the truncated text to Hugging Face for summarization
    const response = await axios.post(
      HUGGING_FACE_API_URL!,
      { inputs: truncatedText },
      {
        headers: {
          Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        params: {
          min_length: 500, // Minimum length of the summary
          max_length: 850, // Maximum length of the summary
          top_k: 50, // Limit to top k tokens
          top_p: 0.95, // Nucleus sampling with p=0.95
          temperature: 0.9, // Adjust temperature for better balance
          repetition_penalty: 1.2, // Penalty to avoid repetition
          max_time: 60, // Maximum time for the request
          use_cache: true, // Use cache for faster results
          wait_for_model: false, // Do not wait if model is not ready
        },
      }
    );

    const summary = response.data[0]?.summary_text || "Summary could not be generated.";

    // Calculate the summarized text length
    const summarizedTextLength = summary.length;


    // Calculate reduction percentage
    const reductionPercentage = (((originalTextLength - summarizedTextLength) / originalTextLength) * 100).toFixed(2);

    return NextResponse.json({ summary, reductionPercentage });

  } catch (error: any) {
    console.error('Error occurred:', error.response ? error.response.data : error.message);
    return NextResponse.json({ error: 'Failed to summarize article. Please try again later.' }, { status: 500 });
  }
}






