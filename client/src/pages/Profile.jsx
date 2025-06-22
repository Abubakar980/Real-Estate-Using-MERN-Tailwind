import { useSelector, useDispatch } from 'react-redux';
import { useRef, useState } from 'react';
import axios from 'axios';
import { signOut, updateProfile } from '../redux/user/userSlice';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

axios.defaults.withCredentials = true;

const Profile = () => {
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const [file, setFile] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [showListingError, setShowListingError] = useState(false);
  const [listings, setListings] = useState([]);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: ''
  });

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/auth/logout");
      dispatch(signOut());
      localStorage.removeItem("user");
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = currentUser.avatar;

    if (file) {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'mern_upload');

      const cloudRes = await fetch("https://api.cloudinary.com/v1_1/dsjztvv1o/image/upload", {
        method: "POST",
        body: data,
      });

      const cloudData = await cloudRes.json();
      imageUrl = cloudData.secure_url;
    }

    try {
      const payload = {
        username: formData.username,
        email: formData.email,
        avatar: imageUrl,
      };

      if (formData.password.trim() !== '') {
        payload.password = formData.password;
      }

      const res = await axios.put(`http://localhost:3000/api/auth/update/${currentUser._id}`, payload);
      dispatch(updateProfile(res.data));
      localStorage.setItem("user", JSON.stringify(res.data));
      setSuccessMsg("✅ User updated successfully!");
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/auth/delete/${currentUser._id}`);
      dispatch(signOut());
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

const handleShowListings = async () => {
  try {
    console.log("🧠 Logged-in user ID:", currentUser._id); // 👈 add this
    setShowListingError(false);
    const res = await axios.get(`http://localhost:3000/api/listing/listings/${currentUser._id}`);
    console.log("Fetched Listings:", res.data);
    setListings(res.data);
  } catch (error) {
    setShowListingError(true);
    console.error("Error fetching listings:", error.response?.data || error.message);
  }
};



  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      {successMsg && (
        <p className="text-green-600 text-center font-medium">{successMsg}</p>
      )}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          ref={fileRef}
          hidden
          accept='image/*'
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          onClick={() => fileRef.current.click()}
          src={file ? URL.createObjectURL(file) : currentUser.avatar}
          alt="Profile"
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
        <input
          type="text"
          id='username'
          placeholder='Username'
          value={formData.username}
          onChange={handleChange}
          className='border p-3 rounded-lg'
        />
        <input
          type="email"
          id='email'
          placeholder='Email'
          value={formData.email}
          onChange={handleChange}
          className='border p-3 rounded-lg'
        />
        <input
          type="text"
          id='password'
          placeholder='Password (leave blank to keep unchanged)'
          value={formData.password}
          onChange={handleChange}
          className='border p-3 rounded-lg'
        />
        <button
          type='submit'
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95'
        >
          Update
        </button>
        <Link
          to={"/create-listing"}
          className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95'
        >
          Create Listing
        </Link>
      </form>

      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer' onClick={handleDelete}>Delete Account</span>
        <span className='text-red-700 cursor-pointer' onClick={handleLogout}>Sign Out</span>
      </div>

      <button onClick={handleShowListings} className='text-green-700 w-full mt-4'>
        Show listings
      </button>

      {showListingError && (
        <p className='text-red-700 mt-5'>Error showing listings</p>
      )}

      {listings.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold text-lg">Your Listings:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
  {listings.length > 0 && (
  <div className="flex flex-col gap-4 mt-6">
    <h2 className="text-center text-2xl font-semibold mb-4">Your Listings</h2>
    {listings.map((listing) => (
      <div
        key={listing._id}
        className="border border-gray-400 rounded-lg p-3 w-[488px] flex justify-between items-center gap-4"
      >
        <Link to={`/listing/${listing._id}`}>
          <img
            src={listing.imageUrls[0]}
            alt={listing.name}
            className="h-16 w-16 object-contain"
          />
        </Link>
        <Link
          to={`/listing/${listing._id}`}
          className="text-slate-700 font-semibold hover:underline truncate flex-1"
        >
          {listing.name}
        </Link>
        <div className="flex flex-col items-center gap-1">
          <button
            className="text-red-700 uppercase"
            onClick={async (e) => {
              e.stopPropagation();
              if (confirm("Are you sure you want to delete this listing?")) {
                await axios.delete(
                  `http://localhost:3000/api/listing/delete/${listing._id}`
                );
                setListings((prev) =>
                  prev.filter((l) => l._id !== listing._id)
                );
              }
            }}
          >
            Delete
          </button>
          <Link to={`/update-listing/${listing._id}`}>
            <button className="text-green-700 uppercase">Edit</button>
          </Link>
        </div>
      </div>
    ))}
  </div>
)}


</div>

        </div>
      )}
    </div>
  );
};

export default Profile;
