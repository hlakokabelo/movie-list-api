import express from "express";
import { getMovie, getMovies,addMovie, upDateMovie ,deleteMovie} from "../controllers/moviesController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware)

router.get("/", getMovies);
router.get("/:id", getMovie);

router.post("/", addMovie);

router.put("/:id", upDateMovie);

router.delete("/:id",deleteMovie);

export default router;
