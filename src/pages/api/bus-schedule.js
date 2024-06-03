export default async function handler(req, res) {
    const stopId = "70106";
    const routesUrl = `http://telematics.oasa.gr/api/?act=webRoutesForStop&p1=${stopId}`;
    const arrivalsUrl = `http://telematics.oasa.gr/api/?act=getStopArrivals&p1=${stopId}`;
  
    try {
      const [routesResponse, arrivalsResponse] = await Promise.all([
        fetch(routesUrl),
        fetch(arrivalsUrl)
      ]);
  
      const routesContentType = routesResponse.headers.get('content-type');
      const arrivalsContentType = arrivalsResponse.headers.get('content-type');
  
      if (!routesContentType.includes('application/json') || !arrivalsContentType.includes('application/json')) {
        const routesText = await routesResponse.text();
        const arrivalsText = await arrivalsResponse.text();
  
        console.error('Routes (HTML):', routesText);
        console.error('Arrivals (HTML):', arrivalsText);
  
        return res.status(500).json({ error: "Received HTML instead of JSON" });
      }
  
      const [routes, arrivals] = await Promise.all([
        routesResponse.json(),
        arrivalsResponse.json()
      ]);
  
      console.log('Routes:', routes);
      console.log('Arrivals:', arrivals);
  
      res.status(200).json({ routes, arrivals });
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: "Failed to fetch data" });
    }
  }
  