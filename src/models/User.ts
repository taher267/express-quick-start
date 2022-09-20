import mg from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';
export interface UserDocument extends mg.Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
const userSchema = new mg.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
userSchema.pre('save', async function (next) {
  next();
});
export default mg.model('User', userSchema);
