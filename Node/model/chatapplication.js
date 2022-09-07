const mongoose = require('mongoose');

const chatapplicationSchema = new mongoose.Schema({
  username: { type: String, required: true },
  message: { type: String, required: true },
  selectedRoom: { type: String, required: true },
  createdTime: { type: Date, required: true },
});

module.exports = mongoose.model('chatapplication', chatapplicationSchema);
