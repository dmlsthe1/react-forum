const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fName: { type: String, required: true },
  lName: { type: String, required: true },
  phone: { type: Number, required: false}
});

mongoose.model("User", UserSchema);