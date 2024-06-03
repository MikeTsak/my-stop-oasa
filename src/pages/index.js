import { useEffect, useState } from 'react';

export default function HomePage() {
  const [busData, setBusData] = useState({ routes: [], arrivals: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/bus-schedule');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBusData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching bus data: {error}</div>;
  }

  return (
    <div>
      <h1>Bus Schedule</h1>
      <h2>Routes</h2>
      <ul>
        {busData.routes.map(route => (
          <li key={route.line_code}>
            Route Code: {route.route_code}, Line Code: {route.line_code}
          </li>
        ))}
      </ul>
      <h2>Arrivals</h2>
      <ul>
        {busData.arrivals.map(arrival => (
          <li key={arrival.veh_code}>
            Route Code: {arrival.route_code}, Vehicle Code: {arrival.veh_code}, Arrival in: {arrival.btime2} minutes
          </li>
        ))}
      </ul>
    </div>
  );
}
