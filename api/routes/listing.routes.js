import express from 'express'
import { createListing, getUserListing } from '../controllers/listing.controller.js'
import { verifyToken } from '../utils/verifyUser.js'

const listingRouter = express.Router()

// listingRouter.post('/create',verifyToken , createListing)
listingRouter.post('/create' , createListing)
listingRouter.post('/listings/:id', verifyToken, getUserListing)

export default listingRouter