const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    C_title: { type: String, required: true },

    C_description: String,

    C_categories: String,

    C_price: { type: Number, default: 0 },

    sections: [
      {
        title: String,
        videoUrl: String
      }
    ],

    enrolled: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
