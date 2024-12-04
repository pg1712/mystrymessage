import mongoose, { Schema, Document } from "mongoose";

export interface message extends Document {
    content: string;
    createdAt: Date;
}

const messageSchema: Schema<message> = new Schema({
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
    },
});

export interface User extends mongoose.Document {
    username: string;
    password: string;
    email: string;
    isVerified: boolean;
    isAcceptingMessages: boolean;
    verifyCode: string;
    verifyCodeExpiry: Date;
    messages: message[];
}
const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, "Please use a valid email address"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAcceptingMessages: {
        type: Boolean,
        default: true,
    },
    verifyCode: {
        type: String,
        required: true,
    },
    verifyCodeExpiry: {
        type: Date,
        required: true,
    },
    messages: [messageSchema],
});

const UserModel =
    (mongoose.models.User as mongoose.Model<User>) ||
    mongoose.model("User", UserSchema);

export default UserModel;
