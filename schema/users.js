const mongoose = require('mongoose');

const { Schema } = mongoose;
const UsersSchema = new Schema({
  userId: { 
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  refresh_token: {
    type: String,
  },  
},
{
    timestamps:true
});

module.exports = mongoose.model('Users', UsersSchema);