import { prisma } from "../config/db.js";

const addToWatchList = async (req, res) => {
  const { movieId, status, rating, notes } = req.body;
  const userId = req.user.id;

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

/**
 * Update watchlist item
 * Updates status, rating, or notes
 * Ensures only owner can update
 * Requires protect middleware
 */
const updateWatchlistItem = async (req, res) => {
  const { status, rating, notes } = req.body;

  // Find watchlist item and verify ownership
  const watchlistItem = await prisma.watchlistItem.findUnique({
    where: { id: req.params.id },
  });

  if (!watchlistItem) {
    return res.status(404).json({ error: "Watchlist item not found" });
  }

  // Ensure only owner can update
  if (watchlistItem.userId !== req.user.id) {
    return res
      .status(403)
      .json({ error: "Not allowed to update this watchlist item" });
  }

  // Build update data
  const updateData = {};
  if (status !== undefined) updateData.status = status.toUpperCase();
  if (rating !== undefined) updateData.rating = rating;
  if (notes !== undefined) updateData.notes = notes;

  // Update watchlist item
  const updatedItem = await prisma.watchlistItem.update({
    where: { id: req.params.id },
    data: updateData,
  });

  res.status(200).json({
    status: "success",
    data: {
      watchlistItem: updatedItem,
    },
  });
};

/**
 * Remove movie from watchlist
 * Deletes watchlist item
 * Ensures only owner can delete
 * Requires protect middleware
 */
const removeFromWatchlist = async (req, res) => {
  // Find watchlist item and verify ownership
  const watchlistItem = await prisma.watchlistItem.findUnique({
    where: { id: req.params.id },
  });

  if (!watchlistItem) {
    return res.status(404).json({ error: "Watchlist item not found" });
  }

  // Ensure only owner can delete
  if (watchlistItem.userId !== req.user.id) {
    return res
      .status(403)
      .json({ error: "Not allowed to update this watchlist item" });
  }

  await prisma.watchlistItem.delete({
    where: { id: req.params.id },
  });

  res.status(200).json({
    status: "success",
    message: "Movie removed from watchlist",
  });
};

export { addToWatchList, updateWatchlistItem, removeFromWatchlist };
