const chatapplicationSchema = require('../model/chatapplication');

exports.saveChatMessage = async (data) => {
  try {
    const saveMessage = await chatapplicationSchema.create(data);
  } catch (err) {
    console.log(err);
  }
};
