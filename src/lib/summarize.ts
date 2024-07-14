import axios from 'axios';
import { NextRequest } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser();

export const POST = async (req: NextRequest) => {
  const { url } = await req.json();

  if (!url) {
    return new Response(JSON.stringify({ error: 'URL is required' }), { status: 400 });
  }

  try {
    // Fetch the RSS feed
    const feed = await parser.parseURL(url);

    // Extract the content of the first item (article)
    const article = feed.items[0];
    const articleContent = article.contentSnippet || article.content || article.description;

    // Summarize the article content using OpenAI API
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      {
        prompt: `Summarize the following article:\n\n${articleContent}\n\nSummary:`,
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const summary = response.data.choices[0].text.trim();
    return new Response(JSON.stringify({ summary, title: article.title }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error summarizing the text' }), { status: 500 });
  }
};
