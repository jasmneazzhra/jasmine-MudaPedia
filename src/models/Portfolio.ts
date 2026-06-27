import mongoose, { Schema, model, models } from "mongoose";

const portfolioSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
      required: true,
    },

    technologies: [
      {
        type: String,
      },
    ],

    category: {
      type: String,
      required: true,
    },

    githubUrl: {
      type: String,
      default: "",
    },

    liveUrl: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Portfolio =
  models.Portfolio ||
  model("Portfolio", portfolioSchema);

export default Portfolio;