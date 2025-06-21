import express, { type Request, Response, NextFunction } from "express";
import serverless from 'serverless-http';
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite"; // Assuming log is a generic logger
import dotenv from 'dotenv';

dotenv.config(); // Ensure environment variables are loaded

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging middleware (can be kept if useful for Netlify logs)
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    // Log API requests. For Netlify, these logs will appear in Function logs.
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${req.originalUrl} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        // Avoid logging sensitive data if necessary
        // logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      console.log(logLine); // Use console.log for Netlify Functions
    }
  });
  next();
});

// Register API routes
// The `registerRoutes` function should now just add routes to the `app`
// and not create/return an http.Server instance.
registerRoutes(app);

// Error handling middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  console.error("Error:", err.stack || err.message); // Log error details
  res.status(status).json({ message });
  // No need to throw err in serverless context, just respond
});

// Check if running in a local development environment (not Netlify)
if (process.env.NODE_ENV === 'development' && !process.env.NETLIFY) {
  // Local development server setup
  (async () => {
    const localApp = express(); // Create a separate app for local dev if needed, or reuse
    localApp.use(express.json());
    localApp.use(express.urlencoded({ extended: false }));

    // Setup Vite for local development, serving client-side assets
    // The vite setup might need to be adjusted if it also started its own server
    // For simplicity, we assume `setupVite` configures Vite middleware on the passed app.
    // It might be better to run Vite dev server separately and proxy /api requests to this server.
    const http = await import('http');
    const localServer = http.createServer(localApp);

    // Mount the main app (with API routes) onto a base path if needed, e.g. /.netlify/functions/index or /api
    // Or, more simply, ensure all routes in `app` are prefixed, e.g. in `registerRoutes`
    // For Netlify, paths are usually relative to the function name, e.g., /.netlify/functions/index/api/contact
    // If your function is named 'index', then /api/contact on your site maps to /api/contact in the function.
    localApp.use('/.netlify/functions/index', app); // Simulating Netlify's path for the function

    // If setupVite is for client dev server and includes its own server:
    // Consider running `vite` command separately for client development.
    // And run this Node server (e.g., `node server/index.js`) for the API.
    // Or integrate Vite as middleware if `setupVite` supports it without starting a new server.

    const port = process.env.PORT || 5000; // Use PORT from env or default to 5000 for local
    localServer.listen(port, () => {
      console.log(`Local development server running on http://localhost:${port}`);
      console.log(`API endpoints available at http://localhost:${port}/.netlify/functions/index/api/...`);
    });
  })();
}

// Export the handler for Netlify
export const handler = serverless(app);
