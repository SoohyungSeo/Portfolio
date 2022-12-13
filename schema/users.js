const mongoose = require('mongoose');

const { Schema } = mongoose;
const UsersSchema = new Schema({
  userId: { 
    type: String,
    required: true,
  },
  nickname: { 
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  provider: {
    type: String
  },
  email:{
    type: String
  },
  refresh_token: {
    type: String,
  },  
},
{
    timestamps:true
});

module.exports = mongoose.model('Users', UsersSchema);