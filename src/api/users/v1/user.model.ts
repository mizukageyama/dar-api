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
      ref: 'UserRole',
      required: [true, 'User role is required!'],
    },
  },
  { timestamps: true, collection: 'users' }
);

export default mongoose.model('User', userSchema);
