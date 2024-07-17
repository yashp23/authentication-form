import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    verifyToken: { 
        type: String, 
        default: null 
    },
    verifyTokenExpiration: { 
        type: Date, 
        default: null 
    },
    forgotPasswordToken: { 
        type: String, 
        default: null 
    },
    forgotPasswordTokenExpiration: { 
        type: Date, 
        default: null 
    }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
