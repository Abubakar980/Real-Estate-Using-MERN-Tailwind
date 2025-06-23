import { useEffect, useState } from 'react';
import axios from 'axios';

const MyMessages = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/message/my-messages', {
          withCredentials: true,
        });
        setMessages(res.data.data);
      } catch (err) {
        console.error(err);
        setError('You must be logged in to view messages.');
      }
    };
    fetchMessages();
  }, []);

  if (error) return <p className="text-red-600 text-center">{error}</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Messages</h2>
      {messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        messages.map((msg) => (
          <div key={msg._id} className="border p-3 rounded mb-3">
            <p><strong>From:</strong> {msg.sender.username}</p>
            <p><strong>To:</strong> {msg.receiver.username}</p>
            <p><strong>Listing:</strong> {msg.listing.name}</p>
            <p><strong>Message:</strong> {msg.message}</p>
            <p className="text-sm text-gray-500">{new Date(msg.createdAt).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyMessages;
