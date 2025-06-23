import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Contact from '../components/Contact'; // ✅ make sure this exists

const Listing = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/listing/${id}`, {
          withCredentials: true,
        });
        setListing(res.data);
      } catch (err) {
        setError('Failed to fetch listing.');
        console.error(err);
      }
    };
    fetchListing();
  }, [id]);

  if (error) return <p className="text-center my-7 text-red-600 text-lg">{error}</p>;
  if (!listing) return <p className="text-center my-7 text-lg">Loading...</p>;

  return (
    <main>
      <Swiper
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="w-full h-[550px]"
      >
        {listing.imageUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-[550px]"
              style={{
                background: `url(${url}) center no-repeat`,
                backgroundSize: 'cover',
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
      >
        <FaShare className="text-slate-500" />
      </div>
      {copied && (
        <p className="fixed top-[23%] right-[5%] z-10 bg-slate-100 px-3 py-1 rounded-md">
          Link copied!
        </p>
      )}

      <div className="flex flex-col max-w-4xl mx-auto p-4 my-7 gap-4">
        <h1 className="text-2xl font-semibold">
          {listing.name} - $
          {listing.offer
            ? listing.discountPrice.toLocaleString()
            : listing.regularPrice.toLocaleString()}
          {listing.type === 'rent' && ' / month'}
        </h1>

        <p className="flex items-center gap-2 text-slate-600 text-sm mt-2">
          <FaMapMarkerAlt className="text-green-700" />
          {listing.address}
        </p>

        <div className="flex gap-4">
          <p className="bg-red-900 text-white w-full max-w-[200px] text-center p-1 rounded-md">
            {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
          </p>
          {listing.offer && (
            <p className="bg-green-900 text-white w-full max-w-[200px] text-center p-1 rounded-md">
              ${+listing.regularPrice - +listing.discountPrice} OFF
            </p>
          )}
        </div>

        <p className="text-slate-800">
          <span className="font-semibold text-black">Description - </span>
          {listing.description}
        </p>

        <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
          <li className="flex items-center gap-1">
            <FaBed className="text-lg" />
            {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
          </li>
          <li className="flex items-center gap-1">
            <FaBath className="text-lg" />
            {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`}
          </li>
          <li className="flex items-center gap-1">
            <FaParking className="text-lg" />
            {listing.parking ? 'Parking Spot' : 'No Parking'}
          </li>
          <li className="flex items-center gap-1">
            <FaChair className="text-lg" />
            {listing.furnished ? 'Furnished' : 'Unfurnished'}
          </li>
        </ul>

        {/* ✅ Show contact button only if logged-in user is not the listing owner */}
        {currentUser && listing.userRef !== currentUser._id && !showContact && (
          <button
            onClick={() => setShowContact(true)}
            className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3 mt-4"
          >
            Contact landlord
          </button>
        )}

        {/* ✅ Contact form shown after button is clicked */}
        {showContact && <Contact listing={listing} />}
      </div>
    </main>
  );
};

export default Listing;
