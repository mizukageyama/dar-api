import mongoose from 'mongoose';

const statusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Status name is required!'],
  },
});

export default mongoose.model('status', statusSchema);
