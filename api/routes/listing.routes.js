// import express from 'express'
// import { createListing, deleteListing, getAllListings, getListingById, getListingsWithFilters, getUserListing, updateListing } from '../controllers/listing.controller.js'
// import { verifyToken } from '../utils/verifyUser.js'

// const listingRouter = express.Router()

// listingRouter.post('/create',verifyToken , createListing)
// // listingRouter.post('/create' , createListing)
// listingRouter.get('/listings/:id', verifyToken, getUserListing)
// listingRouter.get('/:id', verifyToken, getListingById)
// listingRouter.delete("/delete/:id", verifyToken, deleteListing);
// listingRouter.put('/update/:id', verifyToken, updateListing);
// // listingRouter.get('/getall',verifyToken, getAllListings);
// listingRouter.get('/getall', getAllListings);
// listingRouter.get('/get', getListingsWithFilters);


// export default listingRouter





// import express from 'express';
// import {
//   createListing,
//   deleteListing,
//   getAllListings,
//   getListingById,
//   getListingsWithFilters,
//   getUserListing,
//   updateListing,
//   getRecentListings, // ✅ import recent listings controller
// } from '../controllers/listing.controller.js';
// import { verifyToken } from '../utils/verifyUser.js';

// const listingRouter = express.Router();

// // ✅ Create listing
// listingRouter.post('/create', verifyToken, createListing);

// // ✅ Get all listings by a user
// listingRouter.get('/listings/:id', verifyToken, getUserListing);

// // ✅ Get single listing by ID
// listingRouter.get('/:id', verifyToken, getListingById);

// // ✅ Delete listing
// listingRouter.delete('/delete/:id', verifyToken, deleteListing);

// // ✅ Update listing
// listingRouter.put('/update/:id', verifyToken, updateListing);

// // ✅ Get all listings (for admin or testing)
// listingRouter.get('/getall', getAllListings);

// // ✅ Get listings with filters (search)
// listingRouter.get('/get', getListingsWithFilters);

// // ✅ Get recent 6 listings (for home page)
// listingRouter.get('/recent', getRecentListings); // ✅ new route

// export default listingRouter;




import express from 'express';
import {
  createListing,
  deleteListing,
  getAllListings,
  getListingById,
  getListingsWithFilters,
  getUserListing,
  updateListing,
  getRecentListings, // ✅ import recent listings controller
} from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const listingRouter = express.Router();

// ✅ Create listing
listingRouter.post('/create', verifyToken, createListing);

// ✅ Get recent 6 listings (for home page)
listingRouter.get('/recent', getRecentListings); // ✅ new route

// ✅ Get all listings by a user
listingRouter.get('/listings/:id', verifyToken, getUserListing);

// ✅ Get single listing by ID
listingRouter.get('/:id', verifyToken, getListingById);

// ✅ Delete listing
listingRouter.delete('/delete/:id', verifyToken, deleteListing);

// ✅ Update listing
listingRouter.put('/update/:id', verifyToken, updateListing);

// ✅ Get all listings (for admin or testing)
listingRouter.get('/getall', getAllListings);

// ✅ Get listings with filters (search)z
listingRouter.get('/get', getListingsWithFilters);

export default listingRouter