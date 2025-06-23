import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ListingItem from '../components/ListingItem';

export default function Search() {
  const { currentUser } = useSelector((state) => state.user);

  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'createdAt',
    order: 'desc',
  });

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:3000/api/listing/recent');
        setListings(Array.isArray(res.data) ? res.data : []);
        setShowMore(res.data.length > 8);
      } catch (err) {
        console.log(err);
        
        setError('Something went wrong while fetching listings.');
        setListings([]);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  useEffect(() => {
    let filtered = [...listings];

    if (filters.searchTerm) {
      filtered = filtered.filter((l) =>
        l.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    if (filters.type !== 'all') {
      filtered = filtered.filter((l) => l.type === filters.type);
    }

    if (filters.parking) {
      filtered = filtered.filter((l) => l.parking === true);
    }

    if (filters.furnished) {
      filtered = filtered.filter((l) => l.furnished === true);
    }

    if (filters.offer) {
      filtered = filtered.filter((l) => l.offer === true);
    }

    // 👇 Hide current user's own listings
    if (currentUser?._id) {
      filtered = filtered.filter((l) => l.userRef !== currentUser._id);
    }

    if (filters.sort) {
      filtered.sort((a, b) => {
        const fieldA = a[filters.sort];
        const fieldB = b[filters.sort];
        if (filters.order === 'asc') return fieldA > fieldB ? 1 : -1;
        else return fieldA < fieldB ? 1 : -1;
      });
    }

    setFilteredListings(filtered);
  }, [filters, listings, currentUser]);

  const handleChange = (e) => {
    const { id, value, checked, type } = e.target;
    if (id === 'sort_order') {
      const [sort, order] = value.split('_');
      setFilters((prev) => ({ ...prev, sort, order }));
    } else if (type === 'checkbox') {
      setFilters((prev) => ({ ...prev, [id]: checked }));
    } else {
      setFilters((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar filters */}
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="font-semibold whitespace-nowrap">Search Term:</label>
            <input
              type="text"
              id="searchTerm"
              className="border rounded-lg p-3 w-full"
              placeholder="Search..."
              value={filters.searchTerm}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <label className="font-semibold">Type:</label>
            {['all', 'rent', 'sale'].map((type) => (
              <div key={type} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={type}
                  checked={filters.type === type}
                  onChange={() => setFilters((prev) => ({ ...prev, type }))}
                />
                <span className="capitalize">{type}</span>
              </div>
            ))}
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                checked={filters.offer}
                onChange={handleChange}
              />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <label className="font-semibold">Amenities:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                checked={filters.parking}
                onChange={handleChange}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                checked={filters.furnished}
                onChange={handleChange}
              />
              <span>Furnished</span>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <label className="font-semibold">Sort:</label>
            <select
              id="sort_order"
              className="border rounded-lg p-3"
              onChange={handleChange}
              value={`${filters.sort}_${filters.order}`}
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>

          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>

      {/* Listings section */}
      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Listing results:
        </h1>

        <div className="p-7 flex flex-wrap gap-4">
          {loading && <p className="text-xl w-full text-center">Loading...</p>}
          {!loading && error && <p className="text-red-500">{error}</p>}
          {!loading && !error && filteredListings.length === 0 && (
            <p className="text-xl text-slate-700">No listings found.</p>
          )}
          {!loading &&
            filteredListings.map((listing) => (
              <ListingItem key={listing._id || listing.id} listing={listing} />
            ))}
          {showMore && (
            <button className="text-green-700 hover:underline p-7 text-center w-full">
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
