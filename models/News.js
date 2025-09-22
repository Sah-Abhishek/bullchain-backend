import mongoose from "mongoose"

const sourceInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: { type: String },
  lang: { type: String },

}, { _id: false });

const newsSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  guide: { type: String, },
  published_on: { type: Number },
  image_url: { type: String },
  title: { type: String, required: true },
  url: { type: String, required: true },
  body: { type: String, },
  tags: { type: String },
  lang: { type: String },
  source_info: { type: sourceInfoSchema },
  source: { type: String },
  createdAt: { type: Date, default: Date.now }

});

const News = mongoose.model("News", newsSchema);

export default News;
