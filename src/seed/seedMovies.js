import { prisma } from "../config/db.js";
import { moviesData } from "./seedData.js";

const seedMovies = () => {
  let count = 0;
  moviesData.forEach(async (movie) => {
    const { id: _, ...payload } = movie;
    const randomDate = new Date(new Date('2025-12-01').getTime() + Math.random() * (new Date() - new Date('2025-12-01'))).toISOString();
    movie.createdAt=randomDate
    try {
      const uploadedMovie = await prisma.movie.create({
        data: payload,
      });
      console.log(count++);
    } catch (err) {
      console.log(err);
    }
  });
};
seedMovies();
