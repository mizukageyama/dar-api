import mongoose from 'mongoose';

const userRoleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Role name is required!'],
    },
  },
  { collection: 'user_roles' }
);

export default mongoose.model('UserRole', userRoleSchema);
