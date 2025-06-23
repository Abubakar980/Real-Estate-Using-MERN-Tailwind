import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ListingItem from '../components/ListingItem';
import Footer from './Footer';

export default function Home() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchRecentListings = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/listing/recent');
        const data = await res.json();
        if (Array.isArray(data)) {
          const filtered = currentUser
            ? data.filter((listing) => listing.userRef !== currentUser._id)
            : data;
          setListings(filtered);
        } else {
          setError('No data found');
        }
      } catch (err) {
        setError('Failed to fetch listings.');
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentListings();
  }, [currentUser]);

  return (
    <div>
      {/* Hero section without search */}
      <div className="bg-slate-100 px-4 py-12 text-center">
        <h1 className="text-4xl font-bold text-slate-800">Find Your Dream Home</h1>
        <p className="text-slate-600 mt-2">Browse top listings for rent and sale.</p>
        <Link
          to="/search"
          className="inline-block mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Explore Listings
        </Link>
      </div>

      {/* Recent Listings */}
      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-slate-700 mb-4">Recent Listings</h2>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : listings.length === 0 ? (
          <p className="text-center">No listings found.</p>
        ) : (
          <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
            {listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
          </div>
        )}
      </div>

      <Footer/>

      {/* CTA */}
      {/* <div className="bg-slate-100 text-center py-10 mt-10">
        <h3 className="text-xl font-semibold text-slate-800 mb-2">
          Want to sell or rent your property?
        </h3>
        <Link
          to="/create-listing"
          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
        >
          List Your Property
        </Link>
      </div> */}
    </div>
  );
}
