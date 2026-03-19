# Movie List API

<div align="center">
<img src="https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
<img src="https://img.shields.io/badge/-Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
<img src="https://img.shields.io/badge/-JWT-000000?style=for-the-badge&logo=jsonwebtoken&logoColor=white" alt="JWT" />
<img src="https://img.shields.io/badge/-Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
<img src="https://img.shields.io/badge/-PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
</div>

## 🚀 Live API
**Base URL:** [`https://movie-list-api-z4dh.onrender.com/api`](https://movie-list-api-z4dh.onrender.com/api)

## 📋 Endpoints

### 🔐 Auth
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Get JWT token
- `POST /api/auth/logout` - Clear session

### 🎬 Movies
- `GET /api/movies` - List all movies
  - 🔍 **Query params:** `?title=inception&year=2010&genre=action`
- `GET /api/movies/:id` - Get single movie
- `POST /api/movies` - Add movie (auth)
- `PUT /api/movies/:id` - Update movie (auth)
- `DELETE /api/movies/:id` - Delete movie (auth)

### 📺 Watchlist (All auth)
- `POST /api/watchlist` - Add movie to list
- `PUT /api/watchlist/:id` - Update status/rating
- `DELETE /api/watchlist/:id` - Remove from list

## 🛠️ Quick Setup

```bash
# Clone & install
git clone https://github.com/hlakokabelo/movie-list-api.git
cd movie-list-api
npm install

# Environment (.env)
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secret"
PORT=5001

# Database & start
npx prisma migrate dev
npm run dev
