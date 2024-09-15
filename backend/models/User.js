import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Name must be of at least 3 Characters."],
    maxLength: [30, "Name cannot exceed 30 Characters."],
  },
  location: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Provide a valid email"],
  },
  password: {
    type: String,
    required: true,
    minLength: [3, "Password must be of at least 3 Characters."],
    maxLength: [1024, "Password cannot exceed 10 Characters."],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);

export default User; // Export default
