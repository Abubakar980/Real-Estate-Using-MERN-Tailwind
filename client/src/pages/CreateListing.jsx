import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateListing = () => {
  const [files, setFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [formError, setFormError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate()


  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: '',
    bedrooms: '',
    bathrooms: '',
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "mern_upload");

      fetch("https://api.cloudinary.com/v1_1/dsjztvv1o/image/upload", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.secure_url) {
            resolve(data.secure_url);
          } else {
            reject("Image upload failed");
          }
        })
        .catch((err) => reject(err));
    });
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    setUploadError('');
    setUploadSuccess('');
    setFormError('');
    setUploading(true);

    if (files.length === 0) {
      setUploadError("Please select at least one image.");
      setUploading(false);
      return;
    }

    if (files.length > 6) {
      setUploadError("You can upload a maximum of 6 images.");
      setUploading(false);
      return;
    }

    const promises = files.map((file) => storeImage(file));

    try {
      const urls = await Promise.all(promises);
      setImageUrls((prev) => [...prev, ...urls]);
      setUploadSuccess("Images uploaded successfully!");
    } catch (err) {
      setUploadError("Some images failed to upload. Please try again.");
      console.log(err);
    }

    setUploading(false);
  };

  const removeImage = (url) => {
    setImageUrls((prev) => prev.filter((img) => img !== url));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError('');

    if (imageUrls.length === 0) {
      setFormError("At least one image is required.");
      setSubmitting(false);
      return;
    }

    const payload = {
      ...formData,
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      regularPrice: Number(formData.regularPrice),
      discountPrice: Number(formData.discountPrice),
      imageUrls: imageUrls,
      useRef: "userid_placeholder", // replace with actual user ID
    };

    try {
      const res = await fetch("http://localhost:3000/api/listing/create", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      console.log("Listing Created:", data);
      navigate(`/listing/${data._id}`)
    } catch (err) {
      console.error("Error submitting form", err);
    }

    setSubmitting(false);
  };

  const handleChange = (e) => {
    const { id, value, checked } = e.target;

    if (id === 'sale' || id === 'rent') {
      setFormData((prev) => ({
        ...prev,
        type: id,
      }));
    } else if (id === 'parking' || id === 'furnished' || id === 'offer') {
      setFormData((prev) => ({
        ...prev,
        [id]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Create a Listing</h1>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input onChange={handleChange} value={formData.name} type="text" placeholder="Name" id="name" minLength="10" maxLength="62" required className="border border-gray-300 bg-white p-3 rounded-lg" />
          <textarea onChange={handleChange} value={formData.description} placeholder="Description" id="description" required className="border border-gray-300 bg-white p-3 rounded-lg" />
          <input onChange={handleChange} value={formData.address} type="text" placeholder="Address" id="address" required className="border border-gray-300 bg-white p-3 rounded-lg" />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2"><input onChange={handleChange} checked={formData.type === 'sale'} type="checkbox" id="sale" className="w-5" /><span>Sell</span></div>
            <div className="flex gap-2"><input onChange={handleChange} checked={formData.type === 'rent'} type="checkbox" id="rent" className="w-5" /><span>Rent</span></div>
            <div className="flex gap-2"><input onChange={handleChange} checked={formData.parking} type="checkbox" id="parking" className="w-5" /><span>Parking Spot</span></div>
            <div className="flex gap-2"><input onChange={handleChange} checked={formData.furnished} type="checkbox" id="furnished" className="w-5" /><span>Furnished</span></div>
            <div className="flex gap-2"><input onChange={handleChange} checked={formData.offer} type="checkbox" id="offer" className="w-5" /><span>Offer</span></div>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input onChange={handleChange} value={formData.bedrooms} type="number" id="bedrooms" min="1" max="10" required className="p-3 border border-gray-300 bg-white rounded-lg" />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input onChange={handleChange} value={formData.bathrooms} type="number" id="bathrooms" min="1" max="10" required className="p-3 border border-gray-300 bg-white rounded-lg" />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input onChange={handleChange} value={formData.regularPrice} type="number" id="regularPrice" min="50" max="10000000" required className="p-3 border border-gray-300 bg-white rounded-lg" />
              <div className="flex flex-col items-center"><p>Regular Price</p><span className="text-xs">$ / month</span></div>
            </div>
            <div className="flex items-center gap-2">
              <input onChange={handleChange} value={formData.discountPrice} type="number" id="discountPrice" min="0" max="10000000" required className="p-3 border border-gray-300 bg-white rounded-lg" />
              <div className="flex flex-col items-center"><p>Discounted Price</p><span className="text-xs">$ / month</span></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">Images: <span className="font-normal text-gray-600 ml-2">(max 6)</span></p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(Array.from(e.target.files))}
              type="file"
              id="images"
              accept="image/*"
              multiple
              className="p-3 border bg-white border-gray-300 rounded w-full"
              disabled={uploading}
            />
            <button
              type="button"
              onClick={handleImageSubmit}
              className={`p-3 text-white rounded uppercase hover:shadow-lg ${uploading ? 'bg-gray-400' : 'bg-green-700'}`}
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>

          {uploadError && <p className="text-red-600 text-sm">{uploadError}</p>}
          {uploadSuccess && <p className="text-green-600 text-sm">{uploadSuccess}</p>}

          <div className="flex flex-wrap gap-4">
            {imageUrls.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  alt={`uploaded-${index}`}
                  className="w-32 h-32 object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={() => removeImage(url)}
                  className="absolute top-0 right-0 bg-red-600 text-white text-xs px-2 py-1 rounded-bl hover:bg-red-700"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>

          {formError && <p className="text-red-600 text-sm">{formError}</p>}

          <button
            type="submit"
            className={`p-3 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 ${submitting ? 'bg-gray-500' : 'bg-slate-700'}`}
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Create Listing'}
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
