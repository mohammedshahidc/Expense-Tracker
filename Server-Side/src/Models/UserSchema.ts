import mongoose from "mongoose";

export interface UserType extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<UserType>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

export const User = mongoose.model<UserType>('User', userSchema);
