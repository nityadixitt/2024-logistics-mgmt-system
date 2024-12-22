// Graph Representation
const graph = {
  "Delhi": { "Jaipur": 270, "Kanpur": 500 },
  "Jaipur": { "Delhi": 270, "Mumbai": 1100 },
  "Kanpur": { "Delhi": 500, "Nagpur": 710 },
  "Mumbai": { "Jaipur": 1100, "Bangalore": 980 },
  "Nagpur": { "Kanpur": 710, "Bangalore": 1000 },
  "Bangalore": { "Mumbai": 980, "Nagpur": 1000 }
};

// Dijkstra's Algorithm (No Changes)
function dijkstra(graph, start, end) {
  const distances = {};
  const visited = {};
  const previous = {};
  const queue = [];

  for (const city in graph) {
    distances[city] = Infinity;
    previous[city] = null;
  }
  distances[start] = 0;
  queue.push({ city: start, distance: 0 });

  while (queue.length > 0) {
    queue.sort((a, b) => a.distance - b.distance);
    const { city } = queue.shift();

    if (visited[city]) continue;
    visited[city] = true;

    for (const neighbor in graph[city]) {
      const distance = graph[city][neighbor];
      const newDistance = distances[city] + distance;

      if (newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance;
        previous[neighbor] = city;
        queue.push({ city: neighbor, distance: newDistance });
      }
    }
  }

  const path = [];
  let currentCity = end;
  while (currentCity) {
    path.unshift(currentCity);
    currentCity = previous[currentCity];
  }

  return { path, distance: distances[end] };
}

// Leaflet Map Initialization
let map = L.map('map').setView([28.7041, 77.1025], 5); // Default view for Delhi
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '© OpenStreetMap'
}).addTo(map);

// Function to find shortest path and display on map
function findShortestPath() {
  const fromCity = document.getElementById("fromCity").value;
  const toCity = document.getElementById("toCity").value;

  if (!graph[fromCity] || !graph[toCity]) {
    alert("Invalid cities entered! Please use valid cities.");
    return;
  }

  const { path, distance } = dijkstra(graph, fromCity, toCity);

  if (distance === Infinity) {
    document.getElementById("results").innerHTML = "<p>No route available!</p>";
    return;
  }

  // Display the results
  document.getElementById("results").innerHTML = `
    <h2>Shortest Route</h2>
    <p>From: <strong>${fromCity}</strong> To: <strong>${toCity}</strong></p>
    <p>Route: ${path.join(" ➡ ")} </p>
    <p>Total Distance: <strong>${distance} km</strong></p>
  `;

  // Clear previous map layers
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker || layer instanceof L.Polyline) {
      map.removeLayer(layer);
    }
  });

  // Add markers for "From" and "To" cities
  const cityCoordinates = {
    "Delhi": [28.7041, 77.1025],
    "Jaipur": [26.9124, 75.7873],
    "Kanpur": [26.4499, 80.3319],
    "Mumbai": [19.076, 72.8777],
    "Nagpur": [21.1458, 79.0882],
    "Bangalore": [12.9716, 77.5946]
  };

  const startCoord = cityCoordinates[fromCity];
  const endCoord = cityCoordinates[toCity];

  const markers = [
    L.marker(startCoord).addTo(map).bindPopup(`From: ${fromCity}`).openPopup(),
    L.marker(endCoord).addTo(map).bindPopup(`To: ${toCity}`)
  ];

  // Draw polyline for the route
  const routeCoordinates = path.map(city => cityCoordinates[city]);
  L.polyline(routeCoordinates, { color: 'blue' }).addTo(map);

  // Adjust map view to fit the route
  const bounds = L.latLngBounds(routeCoordinates);
  map.fitBounds(bounds);
}
