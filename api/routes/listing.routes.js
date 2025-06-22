import express from 'express'
import { createListing, deleteListing, getListingById, getUserListing, updateListing } from '../controllers/listing.controller.js'
import { verifyToken } from '../utils/verifyUser.js'

const listingRouter = express.Router()

listingRouter.post('/create',verifyToken , createListing)
// listingRouter.post('/create' , createListing)
listingRouter.get('/listings/:id', verifyToken, getUserListing)
listingRouter.get('/:id', verifyToken, getListingById)
listingRouter.delete("/delete/:id", verifyToken, deleteListing);
listingRouter.put('/update/:id', verifyToken, updateListing);


export default listingRouter