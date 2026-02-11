import express from "express";
import {
  getMovie,
  getMovies,
  addMovie,
  upDateMovie,
  deleteMovie,
} from "../controllers/moviesController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getMovies);
router.get("/:id", getMovie);

//protected routes
router.post("/", authMiddleware, addMovie);
router.put("/:id", authMiddleware, upDateMovie);
router.delete("/:id", authMiddleware, deleteMovie);

export default router;
