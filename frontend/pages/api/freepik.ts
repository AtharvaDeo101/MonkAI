import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { q = "", limit = "20" } = req.query;
  console.log(`Fetching tracks with query: q=${q}, limit=${limit}`);
  try {
    const response = await fetch(`http://localhost:8000/jamendo/tracks?q=${encodeURIComponent(q as string)}&limit=${limit}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`Backend error: ${response.status} - ${errorData.detail || response.statusText}`);
      throw new Error(errorData.detail || `Backend error: ${response.statusText}`);
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error: any) {
    console.error("API route error:", error.message);
    res.status(500).json({ error: `Failed to fetch tracks from backend: ${error.message}` });
  }
}
