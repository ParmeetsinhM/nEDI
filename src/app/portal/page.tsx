export default function Portal() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Vendor Portal</h1>
      <p>Welcome to the nEDI Vendor Portal. Here you can manage your EDI transactions.</p>
      {/* Placeholder for future features */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Upcoming Features:</h2>
        <ul className="list-disc list-inside mt-4">
          <li>Upload EDI files</li>
          <li>View transaction history</li>
          <li>Download processed files</li>
          <li>Real-time status updates</li>
        </ul>
      </div>
    </div>
  );
}