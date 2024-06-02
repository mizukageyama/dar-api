import mongoose, { Schema } from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required!'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User Id is required!'],
    },
    remarks: {
      type: String,
      required: false,
    },
    status: {
      type: Schema.Types.ObjectId,
      ref: 'Status',
      required: false,
      default: 1,
    },
  },
  { timestamps: true }
);

export default mongoose.model('tasks', taskSchema);
