# nEDI Platform

An Electronic Data Interchange (EDI) platform for produce vendors, built with Next.js.

## Features

- **Vendor Portal**: Web interface for vendors to create Purchase Orders (EDI 850) and upload Advance Ship Notices (856) and Invoices (810)
- **Admin Dashboard**: Internal tools for managing EDI transactions and NetSuite integration
- **EDI Processing**: Generate and parse X12 EDI files (850, 856, 810)
- **NetSuite Integration**: Planned integration with NetSuite for ERP

## EDI Transaction Sets Supported

- **850 Purchase Order**: Generated and sent to vendors
- **856 Advance Ship Notice**: Received and parsed from vendors
- **810 Invoice**: Received and parsed from vendors

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/app/` - Next.js App Router pages and API routes
- `src/components/` - Reusable React components
- `src/lib/` - Utility functions and EDI processing

## Usage

### Vendor Portal
- Create Purchase Orders (850) with item details
- Upload and parse ASN (856) and Invoice (810) files

### Admin Dashboard
- View transaction statistics
- Monitor EDI processing status
- Configure NetSuite integration

## Next Steps

- Implement full EDI parsing with edi-parser library
- Add database for transaction storage
- Implement authentication and user management
- Develop NetSuite API integration
- Add real-time EDI transmission capabilities