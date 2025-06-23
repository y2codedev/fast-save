import { NextRequest, NextResponse } from 'next/server';
export const dynamic = "force-dynamic";
interface ReelData {
  url: string;
  title: string;
  thumbnail: string;
  profile_pic: string;
  video_url: string;
  description: string;
  error?: string;
  width?: number;
  height?: number;
  duration?: number;
}

export async function POST(request: NextRequest) {
  try {

    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    const instagramReelRegex = /^https?:\/\/(www\.)?instagram\.com\/(reel|p)\/([A-Za-z0-9_-]+)\/?/;
    if (!instagramReelRegex.test(url)) {
      return NextResponse.json(
        { error: 'Invalid Instagram Reel URL' },
        { status: 400 }
      );
    }

    const apiUrl = `https://instagram.y2code.com/get-reel?url=${encodeURIComponent(url)}`;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!data || data.error) {
      return NextResponse.json(
        { error: data?.error || 'Failed to fetch reel data' },
        { status: 400 }
      );
    }

    const reelData: ReelData = {
      url: data.url || url,
      title: data.title || 'Instagram Reel',
      thumbnail: data.thumbnail || '',
      profile_pic: data.profile_pic || '',
      video_url: data.videoUrl || '',
      description: data.description || '',
    };

    return NextResponse.json(reelData);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}