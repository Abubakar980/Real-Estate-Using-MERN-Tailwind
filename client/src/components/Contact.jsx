import { useState } from 'react';
import axios from 'axios';

const Contact = ({ listing }) => {
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!msg.trim()) {
      alert('Please write a message before sending.');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        'http://localhost:3000/api/message/send-message',
        {
          receiver: listing.userRef,
          listingId: listing._id,
          message: msg,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (res.data.success) {
        setSent(true);
        setMsg('');
      } else {
        console.log('Message failed to send:', res.data.message);
      }
    } catch (err) {
      console.log('Error sending message:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 mt-4">
      <textarea
        rows="4"
        className="border p-2 rounded-md"
        placeholder="Write your message..."
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      ></textarea>
      <button
        onClick={handleSend}
        disabled={loading}
        className={`bg-gray-700 text-white px-4 py-2 rounded-md hover:opacity-90 ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>
      {sent && <p className="text-green-600 mt-2">Message sent successfully!</p>}
    </div>
  );
};

export default Contact;
