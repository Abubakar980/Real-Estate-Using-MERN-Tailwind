import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

console.log("errorHandler loaded:", errorHandler);
export const createListing = async (req, res, next) => {
  try {
    console.log("📦 Listing payload received:", req.body); // 👈 Add this line
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    console.error("❌ Listing creation error:", error); // 👈 Also add this
    next(errorHandler(500, "Failed to create listing"));
  }
};




export const getUserListing = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      console.log("📥 Listing find called with userRef:", req.params.id); // 👈 Add this
      const listings = await Listing.find({ userRef: req.params.id }); // 👈 Must be userRef (not useRef)
      console.log("📤 Listings found:", listings); // 👈 Add this too
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "You can only view your own listing!"));
  }
};





export const getListingById = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    res.status(200).json(listing);
  } catch (error) {
    next(errorHandler(500, "Something went wrong"));
  }
};





export const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }

    if (listing.userRef !== req.user.id) {
      return next(errorHandler(401, "You can delete only your own listings"));
    }

    await listing.deleteOne();

    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (err) {
    next(errorHandler(500, "Failed to delete listing"));
  }
};




// controllers/listing.controller.js

export const updateListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) return next(errorHandler(404, "Listing not found"));

    if (listing.userRef !== req.user.id)
      return next(errorHandler(403, "You can only update your own listings"));

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedListing);
  } catch (err) {
    next(err);
  }
};
