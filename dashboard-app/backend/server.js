// --- Conceptual Backend Service (Node.js/Express) ---
// File: backend/server.js

require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());

// --- Configuration (Loaded from .env file) ---
const SUPERSET_BASE_URL = process.env.SUPERSET_BASE_URL;
const SUPERSET_ADMIN_USERNAME = process.env.SUPERSET_ADMIN_USERNAME;
const SUPERSET_ADMIN_PASSWORD = process.env.SUPERSET_ADMIN_PASSWORD;
// const SUPERSET_API_CLIENT_ID = process.env.SUPERSET_API_CLIENT_ID; // Uncomment if using API key auth
// const SUPERSET_API_CLIENT_SECRET = process.env.SUPERSET_API_CLIENT_SECRET; // Uncomment if using API key auth
const BACKEND_PORT = process.env.PORT || 3000;
const ANGULAR_APP_SECRET_KEY = process.env.YOUR_ANGULAR_APP_SECRET_KEY;
const CORS_ALLOWED_ORIGIN = process.env.CORS_ALLOWED_ORIGIN;

// --- CORS Configuration ---
if (CORS_ALLOWED_ORIGIN) {
  app.use(cors({ origin: CORS_ALLOWED_ORIGIN }));
  console.log(\`CORS enabled for origin: \${CORS_ALLOWED_ORIGIN}\`);
} else {
  console.warn('CORS_ALLOWED_ORIGIN not set. CORS is not explicitly enabled.');
  // Consider adding a default restrictive CORS policy if needed.
}

// --- Middleware for Authenticating Requests from Angular App ---
function authenticateRequestFromAngular(req, res, next) {
  const authToken = req.headers.authorization;
  if (authToken === \`Bearer \${ANGULAR_APP_SECRET_KEY}\`) {
    // In a real app, you might decode a JWT here to get user details
    // For now, just attach a dummy app user if authenticated
    req.appUser = {
      id: 'angular_app_user_1',
      username: 'angular_user',
      // Example: Define permissions that could influence RLS or dashboard access
      // permissions: { canAccessDashboardX: true, department: 'Sales' }
    };
    next();
  } else {
    console.warn('Unauthorized attempt to access backend API from Angular.');
    res.status(401).json({ error: 'Unauthorized: Missing or invalid token for backend service.' });
  }
}

// --- Superset API Interaction ---

// Function to get an admin/API access token from Superset
async function getSupersetAccessToken() {
  // TODO: Implement logic to use API Key/Secret if provided, otherwise use admin user/pass
  // For now, using username/password
  if (!SUPERSET_ADMIN_USERNAME || !SUPERSET_ADMIN_PASSWORD) {
    throw new Error('Superset admin credentials are not configured.');
  }
  try {
    console.log(\`Attempting to log into Superset at \${SUPERSET_BASE_URL} as user \${SUPERSET_ADMIN_USERNAME}\`);
    const response = await axios.post(\`\${SUPERSET_BASE_URL}/api/v1/security/login\`, {
      provider: 'db', // or 'ldap', adjust as per your Superset setup
      username: SUPERSET_ADMIN_USERNAME,
      password: SUPERSET_ADMIN_PASSWORD,
      refresh: false,
    });
    console.log('Successfully logged into Superset.');
    return response.data.access_token;
  } catch (error) {
    console.error(
      'Error getting Superset access token:',
      error.response ? \`\${error.response.status} \${JSON.stringify(error.response.data)}\` : error.message
    );
    throw new Error('Could not authenticate with Superset API.');
  }
}

// --- API Endpoint for Guest Token Generation ---
app.post('/api/get-superset-guest-token', authenticateRequestFromAngular, async (req, res) => {
  const { dashboardId, rls_rules = [], user_attributes = {} } = req.body; // Allow passing RLS and user attributes

  if (!dashboardId) {
    return res.status(400).json({ error: 'dashboardId is required in the request body.' });
  }

  // Use appUser from the middleware for guest token context
  const appUserInfo = req.appUser;

  try {
    const supersetAccessToken = await getSupersetAccessToken();

    // Construct the guest token payload
    const guestTokenPayload = {
      user: {
        // Use details from your app's authenticated user, or generate unique guest names
        username: user_attributes.username || \`guest_\${appUserInfo.username}_\${Date.now()}\`,
        first_name: user_attributes.first_name || 'Guest',
        last_name: user_attributes.last_name || appUserInfo.username,
        // You can add more attributes to `user` if your Superset setup uses them
      },
      resources: [{ type: 'dashboard', id: dashboardId }],
      rls_rules: rls_rules, // Pass RLS rules from request or define them based on appUser
    };

    console.log(\`Requesting guest token for dashboard: \${dashboardId}\`);
    console.log('Guest token payload:', JSON.stringify(guestTokenPayload, null, 2));

    const guestTokenResponse = await axios.post(
      \`\${SUPERSET_BASE_URL}/api/v1/security/guest_token/\`,
      guestTokenPayload,
      { headers: { Authorization: \`Bearer \${supersetAccessToken}\` } }
    );

    console.log('Successfully obtained guest token.');
    res.json({ token: guestTokenResponse.data.token });
  } catch (error) {
    console.error(
      'Error generating Superset guest token:',
      error.response ? \`\${error.response.status} \${JSON.stringify(error.response.data)}\` : error.message
    );
    res.status(500).json({ error: 'Failed to generate Superset guest token.' });
  }
});

// --- Server Initialization ---
app.listen(BACKEND_PORT, () => {
  console.log(\`Backend service for Superset token generation listening on port \${BACKEND_PORT}\`);
  console.log(\`Superset instance expected at: \${SUPERSET_BASE_URL}\`);
  if (!SUPERSET_BASE_URL || !SUPERSET_ADMIN_USERNAME || !SUPERSET_ADMIN_PASSWORD || !ANGULAR_APP_SECRET_KEY) {
    console.warn("WARN: One or more critical environment variables (SUPERSET_BASE_URL, SUPERSET_ADMIN_USERNAME, SUPERSET_ADMIN_PASSWORD, YOUR_ANGULAR_APP_SECRET_KEY) are not set. The backend may not function correctly.");
  }
});
