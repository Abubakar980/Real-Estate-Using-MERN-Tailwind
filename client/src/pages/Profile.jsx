import { useSelector, useDispatch } from 'react-redux';
import { useRef, useState } from 'react';
import axios from 'axios';
import { signOut, updateProfile } from '../redux/user/userSlice';

const Profile = () => {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: ''
  });

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/auth/logout");
      dispatch(signOut());
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

    // Upload image to Cloudinary if new file is selected
    if (file) {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'your_upload_preset');

      const cloudRes = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
        method: "POST",
        body: data,
      });

      const cloudData = await cloudRes.json();
      imageUrl = cloudData.secure_url;
    }

    try {
      const res = await axios.put(`/api/auth/update/${currentUser._id}`, {
        ...formData,
        avatar: imageUrl,
      });

      // Update Redux & localStorage
      dispatch(updateProfile(res.data));
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input type="file" ref={fileRef} hidden accept='image/*' onChange={(e) => setFile(e.target.files[0])} />
        <img
          onClick={() => fileRef.current.click()}
          src={file ? URL.createObjectURL(file) : currentUser.avatar}
          alt="Profile"
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
        <input type="text" id='username' placeholder='Username' value={formData.username} onChange={handleChange} className='border p-3 rounded-lg' />
        <input type="email" id='email' placeholder='Email' value={formData.email} onChange={handleChange} className='border p-3 rounded-lg' />
        <input type="text" id='password' placeholder='Password' value={formData.password} onChange={handleChange} className='border p-3 rounded-lg' />
        <button type='submit' className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
          Update
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer' onClick={handleLogout}>Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
