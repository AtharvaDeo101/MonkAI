import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit") || "10";
    const response = await fetch(`http://localhost:8000/jamendo/radios?limit=${limit}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Backend error:", errorData);
      return NextResponse.json({ error: errorData.detail || "Failed to fetch radios" }, { status: response.status });
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("API route error:", err);
    return NextResponse.json({ error: "Failed to fetch radios: " + err.message }, { status: 500 });
  }
}