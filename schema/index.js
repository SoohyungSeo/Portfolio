const mongoose = require("mongoose");
require("dotenv").config();


const connect = () => {
  mongoose
    .connect(process.env.DB_HOST)
    .catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
});
mongoose.connection.on('disconnected', () => {
  console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도 합니다.');
  connect();
})

module.exports = connect;