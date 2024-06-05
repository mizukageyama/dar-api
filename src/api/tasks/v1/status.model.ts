import mongoose from 'mongoose';

const statusSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Status name is required!'],
    },
  },
  { collection: 'task_statuses' }
);

export default mongoose.model('Status', statusSchema);
