import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.JAMENDO_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json({ error: "Jamendo API key is missing" }, { status: 500 });
  }

  // Define a list of genres to query (based on Jamendo's suggested genres)
  const genres = [
    "electronic",
    "ambient",
    "jazz",
    "rock",
    "pop",
    "hiphop",
    "classical",
    "lounge",
    "relaxation",
    "songwriter",
    "world",
    "metal",
    "soundtrack",
  ];

  try {
    // Fetch track counts for each genre
    const genrePromises = genres.map(async (genre) => {
      const response = await fetch(
        `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=json&limit=1&tags=${genre}&order=popularity_total_desc`
      );
      const data = await response.json();
      if (data.headers.status !== "success") {
        console.error(`Error fetching genre ${genre}:`, data.headers.error_message);
        return { name: genre, tracks: 0, image: "/placeholder.svg?height=120&width=120", color: "from-[#5F85DB] to-[#7B68EE]" };
      }
      // Use results_count for the number of tracks in the genre
      return {
        name: genre.charAt(0).toUpperCase() + genre.slice(1), // Capitalize genre name
        tracks: data.headers.results_count || 0,
        image: data.results[0]?.album_image || "/placeholder.svg?height=120&width=120",
        color: getGenreColor(genre), // Assign a color based on genre
      };
    });

    const genreData = await Promise.all(genrePromises);

    // Sort genres by track count (descending) and take top 4
    const topGenres = genreData
      .sort((a, b) => b.tracks - a.tracks)
      .slice(0, 4);

    return NextResponse.json(topGenres);
  } catch (error) {
    console.error("Error fetching genres:", error);
    return NextResponse.json({ error: "Failed to fetch genres" }, { status: 500 });
  }
}

// Helper function to assign colors to genres
function getGenreColor(genre: string) {
  const colorMap: { [key: string]: string } = {
    electronic: "from-[#5F85DB] to-[#7B68EE]",
    ambient: "from-[#4ECDC4] to-[#44A08D]",
    jazz: "from-[#FF6B6B] to-[#FF8E53]",
    rock: "from-[#FFD93D] to-[#FF6B6B]",
    pop: "from-[#FF6B6B] to-[#FF8E53]",
    hiphop: "from-[#5F85DB] to-[#7B68EE]",
    classical: "from-[#4ECDC4] to-[#44A08D]",
    lounge: "from-[#FF6B6B] to-[#FF8E53]",
    relaxation: "from-[#4ECDC4] to-[#44A08D]",
    songwriter: "from-[#FFD93D] to-[#FF6B6B]",
    world: "from-[#5F85DB] to-[#7B68EE]",
    metal: "from-[#FFD93D] to-[#FF6B6B]",
    soundtrack: "from-[#4ECDC4] to-[#44A08D]",
  };
  return colorMap[genre] || "from-[#5F85DB] to-[#7B68EE]";
}