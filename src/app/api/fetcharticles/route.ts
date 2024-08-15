// src/app/api/fetch-articles/route.ts

import { NextResponse } from 'next/server';
import { aggregateRSSFeed } from '@/lib/rssFeed';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const startIndex = url.searchParams.get('startIndex');
  const limit = url.searchParams.get('limit');

  // Validate query parameters
  if (startIndex === null || limit === null) {
    return NextResponse.json({ error: 'Invalid query parameters' }, { status: 400 });
  }

  // Convert query parameters to numbers
  const startIndexNum = parseInt(startIndex, 10);
  const limitNum = parseInt(limit, 10);

  // Fetch articles
  try {
    const articles = await aggregateRSSFeed(startIndexNum, limitNum);
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}
