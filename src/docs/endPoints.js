
  // Auth endpoints documentation
 export const authEndpoints = {
    auth: {
      description: "Authentication endpoints for user management",
      endpoints: {
        "POST /api/auth/register": {
          description: "Register a new user",
          auth: false,
          bodyParams: {
            name: "string (required) - User's full name",
            email: "string (required) - User's email address",
            password: "string (required) - User's password (min 6 characters)",
          },
          example: `/api/auth/register`,
          requestBody: {
            name: "John Doe",
            email: "john@example.com",
            password: "password123",
          },
          response: {
            status: "success",
            data: {
              user: { id: "uuid", name: "John Doe", email: "john@example.com" },
              token: "jwt_token_string",
            },
          },
        },
        "POST /api/auth/login": {
          description: "Login existing user",
          auth: false,
          bodyParams: {
            email: "string (required) - User's email address",
            password: "string (required) - User's password",
          },
          example: `/api/auth/login`,
          requestBody: {
            email: "john@example.com",
            password: "password123",
          },
          response: {
            status: "success",
            data: {
              user: { id: "uuid", email: "john@example.com" },
              token: "jwt_token_string",
            },
          },
        },
        "POST /api/auth/logout": {
          description: "Logout user and clear JWT cookie",
          auth: true,
          headers: {
            Authorization: "Bearer <your_jwt_token>",
          },
          example: `/api/auth/logout`,
          response: {
            status: "success",
            message: "Logged out successfully",
          },
        },
      },
      errorResponses: {
        "400": { error: "user already exists with this email" },
        "401": { error: "email or password incorrect" },
      },
    },
  };

  // Movies endpoints documentation
 export const moviesEndpoints = {
    movies: {
      description: "Movie management endpoints",
      endpoints: {
        "GET /api/movies": {
          description: "Get all movies with optional filtering",
          auth: false,
          queryParams: {
            title: "string (optional) - Filter by title (case-insensitive, partial match)",
            year: "number (optional) - Filter by release year",
            genre: "string (optional) - Filter by genre (case-insensitive, partial match)",
          },
          example: `/api/movies?genre=action&year=2008`,
          response: {
            moviesCount: "number",
            movies: "array of movie objects",
          },
        },
        "GET /api/movies/:id": {
          description: "Get a specific movie by ID",
          auth: false,
          pathParams: {
            id: "string (required) - Movie UUID",
          },
          example: `/api/movies/ae79034f-d55b-49b2-bd7b-dce1ccd4b0e3`,
          response: {
            movie: "movie object",
          },
        },
        "POST /api/movies": {
          description: "Create a new movie",
          auth: true,
          headers: {
            Authorization: "Bearer <your_jwt_token>",
          },
          bodyParams: {
            title: "string (required) - Movie title",
            overview: "string (optional) - Movie description",
            releaseYear: "number (optional) - Year of release",
            genres: "array (optional) - Array of genre strings",
            runtime: "number (optional) - Runtime in minutes",
            posterUrl: "string (optional) - URL to movie poster",
          },
          example: `/api/movies`,
          requestBody: {
            title: "Inception",
            overview: "A thief who steals corporate secrets through dream-sharing technology.",
            releaseYear: 2010,
            genres: ["Action", "Sci-Fi"],
            runtime: 148,
            posterUrl: "https://example.com/inception.jpg",
          },
          response: {
            status: "success",
            data: { movie: "movie object" },
          },
        },
        "PUT /api/movies/:id": {
          description: "Update an existing movie (must be creator)",
          auth: true,
          headers: {
            Authorization: "Bearer <your_jwt_token>",
          },
          pathParams: {
            id: "string (required) - Movie UUID",
          },
          bodyParams: {
            title: "string (optional) - Movie title",
            overview: "string (optional) - Movie description",
            releaseYear: "number (optional) - Year of release",
            genres: "array (optional) - Array of genre strings",
            runtime: "number (optional) - Runtime in minutes",
            posterUrl: "string (optional) - URL to movie poster",
          },
          example: `/api/movies/ae79034f-d55b-49b2-bd7b-dce1ccd4b0e3`,
          requestBody: {
            title: "Inception (Updated)",
            runtime: 150,
          },
          response: {
            status: "success",
            data: { updatedMovie: "movie object" },
          },
        },
        "DELETE /api/movies/:id": {
          description: "Delete a movie (must be creator)",
          auth: true,
          headers: {
            Authorization: "Bearer <your_jwt_token>",
          },
          pathParams: {
            id: "string (required) - Movie UUID",
          },
          example: `/api/movies/ae79034f-d55b-49b2-bd7b-dce1ccd4b0e3`,
          response: {
            status: "success",
            message: "Movie deleted",
          },
        },
      },
      movieObjectSchema: {
        id: "string (UUID)",
        title: "string",
        overview: "string (optional)",
        releaseYear: "number",
        genres: "array of strings",
        runtime: "number",
        posterUrl: "string",
        createdBy: "string (user ID)",
        createdAt: "datetime",
        updatedAt: "datetime",
      },
      errorResponses: {
        "400": [
          { error: "title is required" },
          { error: "movie with id 123 was not found" },
          { error: "release year must be a number, abc, is not a number" },
        ],
        "401": [
          { error: "you dont have permission to update this movie" },
          { error: "you dont have permission to delete movie with id 123" },
        ],
      },
    },
  };

  // Watchlist endpoints documentation
 export const watchlistEndpoints = {
    watchlist: {
      description: "Personal movie watchlist management (all endpoints require authentication)",
      baseEndpoint: "/api/watchlist",
      endpoints: {
        "POST /api/watchlist": {
          description: "Add a movie to user's watchlist",
          auth: true,
          headers: {
            Authorization: "Bearer <your_jwt_token>",
          },
          bodyParams: {
            movieId: "string (required) - UUID of the movie to add",
            status: "string (optional) - Watch status: PLANNED, WATCHING, COMPLETED, DROPPED (default: PLANNED)",
            rating: "number (optional) - User's rating (1-10)",
            notes: "string (optional) - Personal notes about the movie",
          },
          example: `/api/watchlist`,
          requestBody: {
            movieId: "ae79034f-d55b-49b2-bd7b-dce1ccd4b0e3",
            status: "PLANNED",
            rating: 8,
            notes: "Can't wait to watch this classic!",
          },
          response: {
            status: "success",
            data: {
              watchlistItem: {
                id: "watchlist_item_uuid",
                userId: "user_uuid",
                movieId: "movie_uuid",
                status: "PLANNED",
                rating: 8,
                notes: "Can't wait to watch this classic!",
                createdAt: "datetime",
                updatedAt: "datetime",
              },
            },
          },
        },
        "PUT /api/watchlist/:id": {
          description: "Update watchlist item status, rating, or notes (must be owner)",
          auth: true,
          headers: {
            Authorization: "Bearer <your_jwt_token>",
          },
          pathParams: {
            id: "string (required) - Watchlist item UUID",
          },
          bodyParams: {
            status: "string (optional) - PLANNED, WATCHING, COMPLETED, DROPPED",
            rating: "number (optional) - Rating 1-10",
            notes: "string (optional) - Personal notes",
          },
          example: `/api/watchlist/watchlist_item_uuid`,
          requestBody: {
            status: "COMPLETED",
            rating: 9,
            notes: "Absolutely masterpiece!",
          },
          response: {
            status: "success",
            data: {
              watchlistItem: {
                id: "watchlist_item_uuid",
                userId: "user_uuid",
                movieId: "movie_uuid",
                status: "COMPLETED",
                rating: 9,
                notes: "Absolutely masterpiece!",
                updatedAt: "datetime",
              },
            },
          },
        },
        "DELETE /api/watchlist/:id": {
          description: "Remove a movie from watchlist (must be owner)",
          auth: true,
          headers: {
            Authorization: "Bearer <your_jwt_token>",
          },
          pathParams: {
            id: "string (required) - Watchlist item UUID",
          },
          example: `/api/watchlist/watchlist_item_uuid`,
          response: {
            status: "success",
            message: "Movie removed from watchlist",
          },
        },
      },
      watchlistStatuses: {
        PLANNED: "User plans to watch this movie",
        WATCHING: "User is currently watching",
        COMPLETED: "User has finished watching",
        DROPPED: "User stopped watching",
      },
      watchlistItemSchema: {
        id: "string (UUID)",
        userId: "string (user UUID)",
        movieId: "string (movie UUID)",
        status: "enum: PLANNED, WATCHING, COMPLETED, DROPPED",
        rating: "number (1-10, nullable)",
        notes: "string (nullable)",
        createdAt: "datetime",
        updatedAt: "datetime",
      },
      errorResponses: {
        "404": [
          { error: "movie not found" },
          { error: "Watchlist item not found" },
        ],
        "400": { error: "movie already added to watchlist" },
        "403": { error: "Not allowed to update this watchlist item" },
      },
    },
  };