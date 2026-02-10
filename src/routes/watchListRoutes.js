import express from "express";
import { addToWatchList, removeFromWatchlist, updateWatchlistItem } from "../controllers/watchListController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  addToListSchema,
  updateListSchema,
} from "../validators/watchlistvalidator.js";

const router = express.Router();

//middleware
router.use(authMiddleware);

router.post("/", validateRequest(addToListSchema), addToWatchList);

// {{baseUrl}}/watchlist/:id
router.put("/:id", validateRequest(updateListSchema), updateWatchlistItem);

// {{baseUrl}}/watchlist/:id
router.delete("/:id", removeFromWatchlist);

export default router;
