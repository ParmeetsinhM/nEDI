import { NextRequest, NextResponse } from 'next/server';
import { generate850, PurchaseOrder } from '@/lib/edi';

export async function POST(request: NextRequest) {
  try {
    const po: PurchaseOrder = await request.json();
    const ediContent = generate850(po);

    return NextResponse.json({ success: true, edi: ediContent });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate EDI' }, { status: 500 });
  }
}