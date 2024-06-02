import mongoose, { Schema } from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required!'],
    },
    firstName: {
      type: String,
      required: [true, 'First name is required!'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required!'],
    },
    profileUrl: {
      type: String,
      required: false,
      default: '',
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: 'Role',
      required: false,
      default: '1',
    },
  },
  { timestamps: true }
);

export default mongoose.model('users', userSchema);
