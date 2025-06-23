import Message from "../models/message.model.js";

export const createMessage = async (req, res, next) => {
  try {
    console.log('✅ Incoming request body:', req.body);

    const { receiver, listingId, message } = req.body;

    // Check for required fields
    if (!receiver || !listingId || !message) {
      return res.status(400).json({
        success: false,
        message: 'receiver, listingId, and message are required.',
      });
    }

    // Create new message
    const newMsg = new Message({
      sender: req.user.id,        // Automatically from verifyToken
      receiver,                   // From request
      listing: listingId,         // Correct field name in model
      message,
    });

    await newMsg.save();

    res.status(201).json({
      success: true,
      message: 'Message sent successfully.',
      data: newMsg,
    });

    console.log('✅ sender:', req.user.id);
console.log('✅ full body:', req.body);

  } catch (err) {
    console.error('❌ Error in createMessage:', err.message);
    next(err);
  }
};


export const getMyMessages = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .populate('sender', 'username email')
      .populate('receiver', 'username email')
      .populate('listing', 'name');

    res.status(200).json({ success: true, data: messages });
  } catch (err) {
    next(err);
  }
};
