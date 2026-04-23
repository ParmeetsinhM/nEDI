export default function Admin() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <p>Manage the nEDI platform settings and EDI processing.</p>
      {/* Placeholder for future features */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Admin Features:</h2>
        <ul className="list-disc list-inside mt-4">
          <li>EDI file processing</li>
          <li>Vendor management</li>
          <li>System configuration</li>
          <li>NetSuite integration setup</li>
        </ul>
      </div>
    </div>
  );
}