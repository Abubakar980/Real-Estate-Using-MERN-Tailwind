import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

console.log("errorHandler loaded:", errorHandler);
export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(errorHandler(500, "Failed to create listing"));
  }
};
