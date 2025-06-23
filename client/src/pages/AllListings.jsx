import { useEffect, useState } from 'react';
import ListingItem from '../components/ListingItem';
import axios from 'axios';

const AllListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/listing/getall', {
          withCredentials: true, // ✅ send cookies (where token is stored)
        });
        setListings(res.data);
      } catch (err) {
        console.error('Error fetching listings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-slate-700">All Listings</h1>
      {loading ? (
        <p>Loading...</p>
      ) : listings.length === 0 ? (
        <p>No listings found.</p>
      ) : (
        <div className="flex flex-wrap gap-6">
          {listings.map((listing) => (
            <ListingItem key={listing._id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllListings;
