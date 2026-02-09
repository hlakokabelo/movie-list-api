import { prisma } from "../config/db.js";

const addToWatchList = async (req, res) => {
  const { movieId, status, rating, notes, userId } = req.body;

  //movie exist?
  const exists = await prisma.movie.findUnique({
    where: { id: movieId },
  });

  if (!exists) {
    return res.status(404).json({ error: "movie not found" });
  }

  //check if movie already in list
  const existsInList = await prisma.watchlistItem.findUnique({
    where: { userId_movieId: { userId, movieId } },
  });

  if (existsInList) {
    return res.status(400).json({ error: "movie already added to watchlist" });
  }

  //add movie to watchlist
  const watchlistItem = await prisma.watchlistItem.create({
    data: {
      userId,
      movieId,
      rating,
      notes,
      status: status || "PLANNED",
    },
  });

  res.status(201).json({ status: "succes", data: { watchlistItem } });
};

export { addToWatchList };
