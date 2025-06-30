// import type { NextApiRequest, NextApiResponse } from 'next';
// import axios from 'axios';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     const { query } = req.query;

//     if (!query || typeof query !== 'string') {
//         return res.status(400).json({ error: 'Missing or invalid query parameter.' });
//     }

//     try {
//         const response = await axios.get('https://full-downloader-social-media.p.rapidapi.com/api', {
//             params: { url: query }, 
//             headers: {
//                 'X-RapidAPI-Key': '5da58acae9mshaca9e06ba0032afp175489jsn9e4219e979ab',
//                 'X-RapidAPI-Host': 'full-downloader-social-media.p.rapidapi.com'
//             }
//         });

//         res.status(200).json(response.data);
//     } catch (error: any) {
//         console.error('Scraper API error:', error?.response?.data || error.message);
//         res.status(500).json({ 
//             error: 'Failed to fetch data from scraper API.',
//             details: error?.response?.data || error.message 
//         });
//     }
// }