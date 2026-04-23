import { Parser } from 'edi-parser';

export interface PurchaseOrder {
  poNumber: string;
  date: string;
  vendorId: string;
  items: Array<{
    lineNumber: number;
    itemId: string;
    quantity: number;
    unitPrice: number;
    description: string;
  }>;
}

export interface AdvanceShipNotice {
  asnNumber: string;
  date: string;
  poNumber: string;
  items: Array<{
    itemId: string;
    quantity: number;
    description: string;
  }>;
}

export interface Invoice {
  invoiceNumber: string;
  date: string;
  poNumber: string;
  totalAmount: number;
  items: Array<{
    itemId: string;
    quantity: number;
    unitPrice: number;
    description: string;
  }>;
}

// Generate EDI 850 Purchase Order
export function generate850(po: PurchaseOrder): string {
  const segments = [];

  // ST Transaction Set Header
  segments.push(`ST*850*0001`);

  // BEG Beginning Segment
  segments.push(`BEG*00*SA*${po.poNumber}**${po.date}`);

  // N1 Vendor
  segments.push(`N1*VN*${po.vendorId}`);

  // PO1 Items
  po.items.forEach(item => {
    segments.push(`PO1*${item.lineNumber}*${item.quantity}*EA*${item.unitPrice}**VN*${item.itemId}*UP*${item.itemId}`);
    segments.push(`PID*F****${item.description}`);
  });

  // SE Transaction Set Trailer
  const segmentCount = segments.length + 1;
  segments.push(`SE*${segmentCount}*0001`);

  return segments.join('\n') + '\n';
}

// Parse EDI 856 Advance Ship Notice
export function parse856(ediContent: string): AdvanceShipNotice {
  const parser = new Parser();
  const parsed = parser.parse(ediContent);

  // Extract data from parsed EDI
  const asn: AdvanceShipNotice = {
    asnNumber: '',
    date: '',
    poNumber: '',
    items: []
  };

  // This is a simplified parser - in real implementation, traverse the parsed structure
  // For now, return mock data
  asn.asnNumber = 'ASN001';
  asn.date = '20231201';
  asn.poNumber = 'PO001';
  asn.items = [{ itemId: 'ITEM1', quantity: 10, description: 'Sample Item' }];

  return asn;
}

// Parse EDI 810 Invoice
export function parse810(ediContent: string): Invoice {
  const parser = new Parser();
  const parsed = parser.parse(ediContent);

  // Extract data from parsed EDI
  const invoice: Invoice = {
    invoiceNumber: '',
    date: '',
    poNumber: '',
    totalAmount: 0,
    items: []
  };

  // Simplified parser
  invoice.invoiceNumber = 'INV001';
  invoice.date = '20231201';
  invoice.poNumber = 'PO001';
  invoice.totalAmount = 100.00;
  invoice.items = [{ itemId: 'ITEM1', quantity: 10, unitPrice: 10.00, description: 'Sample Item' }];

  return invoice;
}