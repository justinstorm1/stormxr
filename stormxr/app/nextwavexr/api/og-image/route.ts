import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');
  if (!url) return NextResponse.json({ image: null, title: null, author: null, category: null, date: null });
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });
    const html = await res.text();

    // og:image
    const imageMatch =
      html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);

    // og:title
    const titleMatch =
      html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:title["']/i);

    // Author — UploadVR puts it in an anchor like: /writer/craigstorm/
    const authorMatch = html.match(/href="\/writer\/[^"]+">([^<]+)<\/a>/i);

    // Category — UploadVR puts it in an anchor like: /category/fitness/
    const categoryMatch = html.match(/\/category\/[^"]+">([^<]+)<\/a>/i);

    const dateMatch = html.match(/<time[^>]+datetime=["']([^"']+)["']/i);

    // Extract just the YYYY-MM-DD part so the client never misreads it as UTC midnight
    const rawDate = dateMatch?.[1] ?? null;
    const date = rawDate ? rawDate.split('T')[0] : null;

    return NextResponse.json({
      image: imageMatch?.[1] ?? null,
      title: titleMatch?.[1] ?? null,
      author: authorMatch?.[1] ?? null,
      category: categoryMatch?.[1] ?? null,
      date,
    });
  } catch {
    return NextResponse.json({ image: null, title: null, author: null, category: null, date: null });
  }
}