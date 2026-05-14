const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type : String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type : String,
            required: true,
            minlength: 6,
        },

        role: {
            type: String,
            enum: [
                "super_admin",
                "college_admin",
                "faculty",
                "club_admin",
                "student",
            ],
            default: "student",
        },

        collegeId: {
            type: String,
            default: true,
        },

        clubId: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: [
                "pending",
                "approved",
                "rejected",
                "suspended",
            ],
            default: "pending",
        },

        avatar: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User",userSchema);

module.exports = User;