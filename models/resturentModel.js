const mongoose = require("mongoose");

const resturentModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "resturent tittel must required"],
    },
    imgUrl: {
      type: String,
    },
    food: {
      type: Array,
    },
    time: {
      type: String,
    },
    pickup: {
      type: Boolean,
      default: true,
    },
    delivery: {
      type: Boolean,
      default: true,
    },
    isOpne: {
      type: Boolean,
      default: true,
    },
    logoUrl: {
      type: String,
    },
    rating: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: String,
    },
    code: {
      type: String,
    },
    coords: {
      id: {
        type: String,
      },
      latitude: {
        type: Number,
      },
      latitudeDelta: {
        Type: Number,
      },
      longitude: {
        type: Number,
      },
      longitudeDelta: {
        type: Number,
      },
      address: {
        type: String,
      },
      title: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resturent", resturentModel);
