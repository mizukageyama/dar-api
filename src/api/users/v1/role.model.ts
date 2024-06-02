import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Role name is required!'],
  },
});

export default mongoose.model('roles', roleSchema);
