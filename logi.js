// Content Data for Each Feature
const featureContent = {
  routeOptimization: `
    <h2>🚚 Route Optimization</h2>
    <p>Optimize routes to ensure efficient delivery. This feature minimizes delays and fuel usage using AI-driven algorithms.</p>
  `,
  alerts: `
    <h2>⚠️ Issue Alerts</h2>
    <p>Get notified of any delays or deviations in transport routes. Alerts can be sent via email, SMS, or the dashboard.</p>
  `,
  inventoryManagement: `
    <h2>📦 Inventory Management</h2>
    <p>Manage warehouse inventory efficiently with synchronized updates upon dispatch and delivery.</p>
  `,
  synchronization: `
    <h2>🔄 Inventory Synchronization</h2>
    <p>Prevent overstocking or shortages by synchronizing inventory levels with transport schedules in real-time.</p>
  `,
  crossDocking: `
    <h2>🚢 Cross-Docking</h2>
    <p>Support just-in-time and cross-docking systems to reduce storage costs and improve operational efficiency.</p>
  `
};

// Function to Load Feature Content on Single Click
function loadFeature(featureKey) {
  const contentArea = document.getElementById('content');
  contentArea.innerHTML = featureContent[featureKey] || '<p>Feature not found.</p>';
}

// Function to Redirect on Double Click
function openFeaturePage(featureKey) {
  // Mapping features to their respective HTML pages
  const featurePages = {
    routeOptimization: 'route_optimization.html',
    alerts: 'alerts.html',
    inventoryManagement: 'inventory_management.html',
    synchronization: 'synchronization.html',
    crossDocking: 'cross_docking.html'
  };

  // Redirect to the specific page
  const page = featurePages[featureKey];
  if (page) {
    window.location.href = page;
  } else {
    alert('Feature page not available.');
  }
}

// Event Listeners for Buttons
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.feature-btn');

  buttons.forEach(button => {
    // Fetch the feature key from button text (adjust based on need)
    const featureKey = button.getAttribute('data-feature');

    // Single Click
    button.addEventListener('click', () => loadFeature(featureKey));

    // Double Click
    button.addEventListener('dblclick', () => openFeaturePage(featureKey));
  });
});

  