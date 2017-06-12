import mongoose = require('mongoose');

let ReminderSchema = new mongoose.Schema({
  name:{
    type: String,
    min: 6,
    max: 250
  },
  date: String,
  time: String,
  user_tag: String 
})

export default mongoose.model('Reminder', ReminderSchema);
