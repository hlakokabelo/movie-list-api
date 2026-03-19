// apiDocs.js

import {
  authEndpoints,
  moviesEndpoints,
  watchlistEndpoints,
} from "./endPoints.js";

export const generateApiDocs = (req, res) => {
  // Combine all endpoints into main API docs

  const baseUrl = `${req.protocol}://${req.get("host")}/api`;

  const apiDocs = {
    api: "Movie List API",
    version: "1.0.0",
    description: "A RESTful API for managing movies and user watchlists",
    baseUrl: baseUrl,
    ...moviesEndpoints,

    ...authEndpoints,
    ...watchlistEndpoints,

    authentication: {
      type: "Bearer Token",
      location: "Authorization header",
      format: "Authorization: Bearer <your_jwt_token>",
      notes: [
        "Protected routes require a valid JWT token",
        "Users can only modify movies they created",
        "Users can only modify their own watchlist items",
        "Token is also set as HTTP-only cookie for convenience",
      ],
    },

    commonErrorResponses: {
      400: "Bad Request - Invalid parameters or validation failed",
      401: "Unauthorized - Missing or invalid token",
      403: "Forbidden - Insufficient permissions",
      404: "Not Found - Resource doesn't exist",
    },

    notes: [
      "All GET /api/movies endpoints are public",
      "All /api/auth endpoints are public except logout",
      "All /api/watchlist endpoints require authentication",
      "POST, PUT, DELETE /api/movies require authentication",
      "Title and genre searches are case-insensitive and support partial matching",
      "Multiple query parameters can be combined for filtering movies",
    ],

    timestamp: new Date().toISOString(),
  };

  res.json(apiDocs);
};
