const mongoose = require("mongoose");

const JobsSchema = mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "please provide a company name"],
      maxlength: 20,
    },
    position: {
      type: String,
      required: [true, "please provide a Position"],
      maxlength: 20,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["interview", "declined", "pending"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please Provide a user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobsSchema);
