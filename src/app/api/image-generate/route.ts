import { NextResponse } from "next/server";
import https from 'https';

const rapidApiOptions = {
  hostname: 'ai-text-to-image-generator-api.p.rapidapi.com',
  path: '/realistic',
  method: 'POST',
  headers: {
    'x-rapidapi-key': process.env.RAPIDAPI_KEY || '5da58acae9mshaca9e06ba0032afp175489jsn9e4219e979ab',
    'x-rapidapi-host': 'ai-text-to-image-generator-api.p.rapidapi.com',
    'Content-Type': 'application/json'
  }
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required." },
        { status: 400 }
      );
    }

    // Enhanced prompt template for corporate events
    const enhancedPrompt = `Professional corporate foundation day celebration showing:
${prompt}
- Diverse team of employees celebrating
- Company branding visible
- High-quality photorealistic style
- 8K resolution, cinematic lighting`;

    const imageUrl = await callRapidAPI(enhancedPrompt);
    
    return NextResponse.json({ 
      imageUrl,
      service: "rapidapi"
    }, { status: 200 });

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { 
        error: error.message || "Image generation failed",
        details: error.response?.data || null
      },
      { status: error.status || 500 }
    );
  }
}

// Helper function for RapidAPI call
function callRapidAPI(prompt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const req = https.request(rapidApiOptions, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (res.statusCode === 200 && parsed.imageUrl) {
            resolve(parsed.imageUrl);
          } else {
            reject(new Error(parsed.message || 'RapidAPI generation failed'));
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(JSON.stringify({ prompt }));
    req.end();
  });
}