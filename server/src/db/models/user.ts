import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  userName: string
}

const UserSchema: Schema = new Schema({
  userName: { type: String, required: true },
});

const User = mongoose.model<IUser>('Users', UserSchema);

export default User;