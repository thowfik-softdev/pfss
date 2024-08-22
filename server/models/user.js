const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true
    },
    password: String,
    registrationNumber: String,
    batch: String,
    designation: String,
    JoinDate: Date,
    phone: Number,
    phone1: Number,
    place: String,
    address: String,
    certified: { type: Boolean, default: false },
    exp: {
      type: Number,
      default: 0
    },
    status: { type: Boolean, default: false },
    techState: {
      html: { type: Boolean, default: false },
      css: { type: Boolean, default: false },
      javascript: { type: Boolean, default: false },
      bootstrap: { type: Boolean, default: false },
      react: { type: Boolean, default: false },
      redux: { type: Boolean, default: false },
      nodejs: { type: Boolean, default: false },
      mongodb: { type: Boolean, default: false },
      reactBootstrap: { type: Boolean, default: false },
      github: { type: Boolean, default: false },
      deployment: { type: Boolean, default: false },
      additional: { type: Boolean, default: false }
    },
    role: {
      type: String,
      enum: ["admin", "student", "faculty", "visitor", "intern"],
      default: "visitor",
      required: true
    },
    // attendance: [Attendance.schema],
    // assessment: [Assessment.schema],
    subjects: [
      {
        type: Schema.Types.ObjectId,
        ref: "subject"
      }
    ],
    avatar: {
      public_id: {
        type: String
      },
      url: {
        type: String
      }
    },
    token: {
      type: String
    },
    resetPasswordExpires: {
      type: Date
    },
    ACaccessToken: {
      type: String
    },
    ACaccessTokenExpiresAt: {
      type: Number
    },
    ACrefreshToken: {
      type: String
    },
    ACrefreshTokenExpiresAt: {
      type: Number
    },
    ipList: Array,
    ip: {
      type: String
    }
  },
  { timestamps: true }
);

// Create and export the User model
const UserModal = mongoose.model("User", UserSchema);
module.exports = UserModal;
