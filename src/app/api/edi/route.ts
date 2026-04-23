import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Placeholder for EDI processing
  const body = await request.json();
  console.log('Received EDI data:', body);

  return NextResponse.json({ message: 'EDI processed successfully', data: body });
}

export async function GET() {
  // Placeholder for getting EDI status
  return NextResponse.json({ status: 'EDI service running' });
}