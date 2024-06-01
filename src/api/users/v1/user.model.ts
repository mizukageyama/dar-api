import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    profileUrl: {
      type: String,
      required: false,
      default: '',
    },
    role: {
      type: String,
      required: false,
      default: 'free',
    },
  },
  { timestamps: true }
);

export default mongoose.model('users', userSchema);
