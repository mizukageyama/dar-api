import { timeStamp } from 'console';
import mongoose, { Schema } from 'mongoose';

const roleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [false],
      default: 'General',
    },
    content: {
      type: String,
      required: [true, 'Content is required!'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User Id is required!'],
    },
  },
  { timestamps: true, collection: 'notes' }
);

export default mongoose.model('Note', roleSchema);
