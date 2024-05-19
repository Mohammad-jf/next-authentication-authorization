import { models } from 'mongoose';
import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model('User', userSchema);
export default User;
