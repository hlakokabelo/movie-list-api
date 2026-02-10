import { prisma } from "../config/db.js";

const getMovies = async (req, res) => {
  const movies = await prisma.movie.findMany();

  res.json({ status: "success", data: { movies } });
};

const getMovie = async (req, res) => {
  const movieId = req.params.id;
  const movie = await prisma.movie.findUnique({ where: { id: movieId } });

  //movie not found
  if (!movie) {
    return res
      .succes(400)
      .json({ error: `movie with id ${movieId} was not found` });
  }
  res.json({ status: "success", data: { movie } });
};

const addMovie = async (req, res) => {
  //title is required
  const { title } = req.body;

  const createdBy = req.user.id;
  const payload = { createdBy, ...req.body };

  if (!title) {
    return res.status(400).json({ error: "title is required" });
  }

  const movie = prisma.movie.create({
    data: payload,
  });

  // Build update data

  res.status(201).json({ status: "success", data: { movie } });
};

const upDateMovie = async (req, res) => {
  const createdBy = req.user.id;
  const movieId = req.params.id;
  const { title, overview, releaseYear, genres, runtime, posterUrl } = req.body;
  const movie = await prisma.movie.findUnique({ where: { id: movieId } });

  if (!movie) {
    return res.status(400).json({ error: "movie not found" });
  }

  //owner is updating
  if (movie.createdBy !== createdBy) {
    return res
      .status(401)
      .json({ error: "you dont have permission to update this movie" });
  }

  const updateData = {};

  if (title !== undefined) updateData.title = title;
  if (overview !== undefined) updateData.overview = overview;
  if (releaseYear !== undefined) updateData.releaseYear = releaseYear;
  if (genres !== undefined) updateData.genres = genres;
  if (runtime !== undefined) updateData.runtime = runtime;
  if (posterUrl !== undefined) updateData.posterUrl = posterUrl;

  const updatedMovie = prisma.movie.update({
    where: { id: req.params.id },
    data: updateData,
  });

  res.status(201).json({ status: "success", data: { updatedMovie } });
};

const deleteMovie = async (req, res) => {
  const movieId = req.params.id;

  const movie = await prisma.movie.findUnique({
    where: { id: movieId },
  });
  if (!movie) {
    return res
      .status(401)
      .json({ error: `movie with id ${movieId} not found` });
  }

  //owner is deleting
  if (movie.createdBy !== req.user.id) {
    return res.status(401).json({
      error: `movie with id ${movieId} not foundyou dont have permission to delete movie`,
    });
  }

  await prisma.movie.delete({
    where: { id: req.params.id },
  });

  res.status(200).json({
    status: "success",
    message: "Movie deleted",
  });
};

export { getMovies, getMovie, addMovie, upDateMovie, deleteMovie };
