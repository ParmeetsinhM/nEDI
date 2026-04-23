import { NextRequest, NextResponse } from 'next/server';
import { parse856, parse810 } from '@/lib/edi';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const content = await file.text();

    // Determine EDI type based on content
    let parsedData;
    if (content.includes('856')) {
      parsedData = parse856(content);
    } else if (content.includes('810')) {
      parsedData = parse810(content);
    } else {
      return NextResponse.json({ error: 'Unsupported EDI type' }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: parsedData });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to parse EDI' }, { status: 500 });
  }
}