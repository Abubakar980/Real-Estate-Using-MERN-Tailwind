import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

const ListingItem = ({ listing }) => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition rounded-lg w-full sm:w-[330px] overflow-hidden">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            'https://via.placeholder.com/400x300?text=No+Image'
          }
          alt="Listing cover"
          className="h-[220px] w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="p-4 flex flex-col gap-2">
          <p className="text-lg font-semibold text-slate-700 truncate">
            {listing.name}
          </p>

          <div className="flex items-center gap-1 text-sm text-gray-600">
            <MdLocationOn className="text-green-600" />
            <p className="truncate">{listing.address}</p>
          </div>

          <p className="text-sm text-gray-500 line-clamp-2">
            {listing.description}
          </p>

          <p className="text-slate-800 font-semibold mt-1">
            ${listing.offer ? listing.discountPrice.toLocaleString() : listing.regularPrice.toLocaleString()}
            {listing.type === 'rent' && ' / month'}
          </p>

          <div className="flex justify-between text-xs text-slate-600 font-medium mt-2">
            <span>{listing.bedrooms} Bed{listing.bedrooms > 1 && 's'}</span>
            <span>{listing.bathrooms} Bath{listing.bathrooms > 1 && 's'}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingItem;
