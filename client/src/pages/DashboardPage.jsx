function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['Providers', 'Interactions', 'AI Insights'].map((label) => (
          <div
            key={label}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <h2 className="text-lg font-semibold text-gray-700">{label}</h2>
            <p className="mt-2 text-gray-400 text-sm">No data yet.</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DashboardPage
