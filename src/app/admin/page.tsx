import { useState, useEffect } from 'react';

export default function Admin() {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    // In a real app, fetch from API
    // For now, mock data
    setTransactions([
      { id: 1, type: '850', status: 'Sent', date: '2023-12-01' },
      { id: 2, type: '856', status: 'Received', date: '2023-12-02' },
      { id: 3, type: '810', status: 'Received', date: '2023-12-03' }
    ]);
  }, []);

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">EDI Transaction Overview</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-100 p-4 rounded">
            <h3 className="font-semibold">Purchase Orders Sent</h3>
            <p className="text-2xl">{transactions.filter(t => t.type === '850').length}</p>
          </div>
          <div className="bg-green-100 p-4 rounded">
            <h3 className="font-semibold">ASNs Received</h3>
            <p className="text-2xl">{transactions.filter(t => t.type === '856').length}</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded">
            <h3 className="font-semibold">Invoices Received</h3>
            <p className="text-2xl">{transactions.filter(t => t.type === '810').length}</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(tx => (
              <tr key={tx.id}>
                <td className="border p-2">{tx.id}</td>
                <td className="border p-2">{tx.type}</td>
                <td className="border p-2">{tx.status}</td>
                <td className="border p-2">{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">NetSuite Integration</h2>
        <p>Configure integration with NetSuite for automated data sync.</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Configure NetSuite</button>
      </div>
    </div>
  );
}