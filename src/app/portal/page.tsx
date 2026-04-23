'use client';

import { useState } from 'react';

export default function Portal() {
  const [poForm, setPoForm] = useState({
    poNumber: '',
    date: '',
    vendorId: '',
    items: [{ lineNumber: 1, itemId: '', quantity: 0, unitPrice: 0, description: '' }]
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<any>(null);

  const handlePoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Generate EDI 850
    const response = await fetch('/api/edi/generate-850', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(poForm)
    });
    const result = await response.json();
    alert('PO Generated: ' + result.edi);
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedFile) return;

    const formData = new FormData();
    formData.append('file', uploadedFile);

    const response = await fetch('/api/edi/parse', {
      method: 'POST',
      body: formData
    });
    const result = await response.json();
    setParsedData(result);
  };

  const addItem = () => {
    setPoForm({
      ...poForm,
      items: [...poForm.items, { lineNumber: poForm.items.length + 1, itemId: '', quantity: 0, unitPrice: 0, description: '' }]
    });
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Vendor Portal</h1>

      {/* Create Purchase Order */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Create Purchase Order (EDI 850)</h2>
        <form onSubmit={handlePoSubmit} className="space-y-4">
          <div>
            <label className="block">PO Number</label>
            <input
              type="text"
              value={poForm.poNumber}
              onChange={(e) => setPoForm({ ...poForm, poNumber: e.target.value })}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block">Date (YYYYMMDD)</label>
            <input
              type="text"
              value={poForm.date}
              onChange={(e) => setPoForm({ ...poForm, date: e.target.value })}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block">Vendor ID</label>
            <input
              type="text"
              value={poForm.vendorId}
              onChange={(e) => setPoForm({ ...poForm, vendorId: e.target.value })}
              className="border p-2 w-full"
              required
            />
          </div>

          <h3 className="text-lg font-semibold">Items</h3>
          {poForm.items.map((item, index) => (
            <div key={index} className="border p-4 space-y-2">
              <div>
                <label>Item ID</label>
                <input
                  type="text"
                  value={item.itemId}
                  onChange={(e) => {
                    const newItems = [...poForm.items];
                    newItems[index].itemId = e.target.value;
                    setPoForm({ ...poForm, items: newItems });
                  }}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div>
                <label>Quantity</label>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => {
                    const newItems = [...poForm.items];
                    newItems[index].quantity = Number(e.target.value);
                    setPoForm({ ...poForm, items: newItems });
                  }}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div>
                <label>Unit Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={item.unitPrice}
                  onChange={(e) => {
                    const newItems = [...poForm.items];
                    newItems[index].unitPrice = Number(e.target.value);
                    setPoForm({ ...poForm, items: newItems });
                  }}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div>
                <label>Description</label>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => {
                    const newItems = [...poForm.items];
                    newItems[index].description = e.target.value;
                    setPoForm({ ...poForm, items: newItems });
                  }}
                  className="border p-2 w-full"
                  required
                />
              </div>
            </div>
          ))}
          <button type="button" onClick={addItem} className="bg-blue-500 text-white px-4 py-2 rounded">Add Item</button>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded ml-4">Generate PO</button>
        </form>
      </div>

      {/* Upload ASN/Invoice */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Upload ASN (856) or Invoice (810)</h2>
        <form onSubmit={handleFileUpload} className="space-y-4">
          <div>
            <label className="block">Select EDI File</label>
            <input
              type="file"
              accept=".edi,.txt"
              onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
              className="border p-2"
              required
            />
          </div>
          <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded">Upload and Parse</button>
        </form>
        {parsedData && (
          <div className="mt-4 p-4 border">
            <h3 className="font-semibold">Parsed Data:</h3>
            <pre>{JSON.stringify(parsedData, null, 2)}</pre>
          </div>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">Transaction History</h2>
        <p>View your EDI transactions here.</p>
        {/* Placeholder for transaction list */}
      </div>
    </div>
  );
}