import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { q = 'music', per_page = 20 } = req.query;
  try {
    const response = await fetch(`http://localhost:8000/freepik/tracks?q=${q}&per_page=${per_page}`);
    if (!response.ok) {
      throw new Error(`Backend error: ${response.statusText}`);
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tracks' });
  }
}