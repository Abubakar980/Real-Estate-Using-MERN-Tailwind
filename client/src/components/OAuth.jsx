import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import {useNavigate} from 'react-router-dom'

const OAuth = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleGoogleClick = async () => {
    try {
      // 1️⃣ Google sign‑in
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const { user } = await signInWithPopup(auth, provider);

      // 2️⃣ Send user info to backend
      // 👉 change URL if your API runs on a different port / domain
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/google",
        {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        },
        { withCredentials: true }          // keeps cookies / session if you need them
      );

      // 3️⃣ Update Redux
      dispatch(signInSuccess(data));
      navigate("/")
    } catch (err) {
      console.error("Could not sign in with Google:", err);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
    >
      Continue with Google
    </button>
  );
};

export default OAuth;
 